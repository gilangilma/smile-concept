(() => {
  'use strict';

  // Track CTA clicks (placeholder hook — wire to analytics later)
  document.addEventListener('click', (event) => {
    const cta = event.target.closest('[data-cta]');
    if (!cta) return;
    const id = cta.getAttribute('data-cta');
    // eslint-disable-next-line no-console
    console.log(`[smile-concept] cta:${id} clicked`);
  });

  // Floating-nav mobile toggle
  const nav = document.querySelector('.site-nav');
  const toggle = nav?.querySelector('.site-nav__toggle');
  const drawer = nav?.querySelector('.site-nav__mobile');

  if (nav && toggle && drawer) {
    const setOpen = (open) => {
      nav.dataset.menuOpen = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      drawer.hidden = !open;
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.dataset.menuOpen === 'true';
      setOpen(!isOpen);
    });

    drawer.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.dataset.menuOpen === 'true') setOpen(false);
    });
  }
  // ── Treatments carousel ──
  const treatmentItems = document.querySelectorAll('.treatments__item');
  const treatmentImgs  = document.querySelectorAll('.treatments__img');
  let activeIndex = 0;
  let autoTimer   = null;
  let isPaused    = false;

  const setActive = (index) => {
    activeIndex = index;

    treatmentItems.forEach((item, i) => {
      const on = i === index;
      item.classList.toggle('treatments__item--active', on);
      item.setAttribute('aria-pressed', String(on));
    });

    treatmentImgs.forEach((img) => {
      img.dataset.active = String(Number(img.dataset.treatment) === index);
    });
  };

  const advance = () => {
    setActive((activeIndex + 1) % treatmentItems.length);
  };

  const startTimer = () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (!isPaused) advance();
    }, 4000);
  };

  if (treatmentItems.length) {
    // Boot: show first image
    setActive(0);

    treatmentItems.forEach((item, i) => {
      // Click / keyboard select
      const select = () => {
        setActive(i);
        startTimer(); // reset timer on manual pick
      };
      item.addEventListener('click', select);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); }
      });

      // Hover pauses auto-advance
      item.addEventListener('mouseenter', () => { isPaused = true;  setActive(i); });
      item.addEventListener('mouseleave', () => { isPaused = false; });
    });

    // Pause when mouse is anywhere in the sidebar
    const sidebar = document.querySelector('.treatments__sidebar');
    if (sidebar) {
      sidebar.addEventListener('mouseleave', () => { isPaused = false; });
    }

    startTimer();
  }

  // ── Transformations carousel ──
  const transformations = document.querySelector('.transformations');
  const track = transformations?.querySelector('[data-transformations-track]');
  const cards = track ? Array.from(track.querySelectorAll('.transformations__card')) : [];
  const dotsWrap = transformations?.querySelector('[data-transformations-dots]');
  const prevBtn = transformations?.querySelector('[data-transformations-prev]');
  const nextBtn = transformations?.querySelector('[data-transformations-next]');

  if (transformations && track && cards.length && dotsWrap && prevBtn && nextBtn) {
    let page = 0;
    let pages = 1;
    let visibleCards = 1;

    const getVisibleCards = () => {
      if (window.matchMedia('(max-width: 767px)').matches) return 1;
      if (window.matchMedia('(max-width: 1023px)').matches) return 2;
      return 3;
    };

    const buildDots = () => {
      dotsWrap.innerHTML = '';
      for (let i = 0; i < pages; i += 1) {
        const dot = document.createElement('button');
        dot.className = 'transformations__dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.dataset.page = String(i);
        dotsWrap.appendChild(dot);
      }
    };

    const update = () => {
      visibleCards = getVisibleCards();
      pages = Math.max(1, cards.length - visibleCards + 1);
      page = Math.min(page, pages - 1);

      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = 20;
      track.style.transform = `translateX(${-page * (cardWidth + gap)}px)`;

      const dots = dotsWrap.querySelectorAll('.transformations__dot');
      if (dots.length !== pages) {
        buildDots();
      }

      dotsWrap.querySelectorAll('.transformations__dot').forEach((dot, i) => {
        dot.dataset.active = String(i === page);
      });

      prevBtn.disabled = false;
      nextBtn.disabled = false;
    };

    prevBtn.addEventListener('click', () => {
      page = (page - 1 + pages) % pages;
      update();
    });

    nextBtn.addEventListener('click', () => {
      page = (page + 1) % pages;
      update();
    });

    dotsWrap.addEventListener('click', (event) => {
      const dot = event.target.closest('.transformations__dot');
      if (!dot) return;
      const selected = Number(dot.dataset.page);
      if (Number.isNaN(selected)) return;
      page = selected;
      update();
    });

    window.addEventListener('resize', update);

    // ── Drag & swipe support (mouse + touch) ──
    const viewport = transformations.querySelector('[data-transformations-viewport]');
    let dragStartX = 0;
    let dragStartTranslate = 0;
    let isDragging = false;

    const getBaseTranslate = () => {
      const cardWidth = cards[0].getBoundingClientRect().width;
      return -page * (cardWidth + 20);
    };

    const startDrag = (clientX) => {
      isDragging = true;
      dragStartX = clientX;
      dragStartTranslate = getBaseTranslate();
      track.style.transition = 'none';
      viewport.classList.add('is-dragging');
    };

    const moveDrag = (clientX) => {
      if (!isDragging) return;
      track.style.transform = `translateX(${dragStartTranslate + (clientX - dragStartX)}px)`;
    };

    const endDrag = (clientX) => {
      if (!isDragging) return;
      isDragging = false;
      viewport.classList.remove('is-dragging');
      track.style.transition = '';
      const delta = clientX - dragStartX;
      if (delta < -40) page = (page + 1) % pages;
      else if (delta > 40) page = (page - 1 + pages) % pages;
      update();
    };

    // Mouse
    viewport.addEventListener('mousedown', (e) => startDrag(e.clientX));
    window.addEventListener('mousemove', (e) => { if (isDragging) moveDrag(e.clientX); });
    window.addEventListener('mouseup', (e) => endDrag(e.clientX));
    viewport.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch
    viewport.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX), { passive: true });
    viewport.addEventListener('touchmove', (e) => { if (isDragging) moveDrag(e.touches[0].clientX); }, { passive: true });
    viewport.addEventListener('touchend', (e) => endDrag(e.changedTouches[0].clientX), { passive: true });

    update();
  }

  // ── Facility carousel ──
  const facility = document.querySelector('.facility');
  const facilityTrack = facility?.querySelector('[data-facility-track]');
  const facilityCards = facilityTrack ? Array.from(facilityTrack.querySelectorAll('.facility__card')) : [];
  const facilityDotsWrap = facility?.querySelector('[data-facility-dots]');
  const facilityPrevBtn = facility?.querySelector('[data-facility-prev]');
  const facilityNextBtn = facility?.querySelector('[data-facility-next]');

  if (facility && facilityTrack && facilityCards.length && facilityDotsWrap && facilityPrevBtn && facilityNextBtn) {
    let page = 0;
    let pages = 1;

    const getVisibleCards = () => {
      if (window.matchMedia('(max-width: 767px)').matches) return 1;
      if (window.matchMedia('(max-width: 1023px)').matches) return 2;
      return 3;
    };

    const buildDots = () => {
      facilityDotsWrap.innerHTML = '';
      for (let i = 0; i < pages; i += 1) {
        const dot = document.createElement('button');
        dot.className = 'facility__dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.dataset.page = String(i);
        facilityDotsWrap.appendChild(dot);
      }
    };

    const update = () => {
      const visibleCards = getVisibleCards();
      pages = Math.max(1, facilityCards.length - visibleCards + 1);
      page = Math.min(page, pages - 1);

      const cardWidth = facilityCards[0].getBoundingClientRect().width;
      const gap = 12;
      facilityTrack.style.transform = `translateX(${-page * (cardWidth + gap)}px)`;

      const dots = facilityDotsWrap.querySelectorAll('.facility__dot');
      if (dots.length !== pages) {
        buildDots();
      }

      facilityDotsWrap.querySelectorAll('.facility__dot').forEach((dot, i) => {
        dot.dataset.active = String(i === page);
      });

      facilityPrevBtn.disabled = false;
      facilityNextBtn.disabled = false;
    };

    facilityPrevBtn.addEventListener('click', () => {
      page = (page - 1 + pages) % pages;
      update();
    });

    facilityNextBtn.addEventListener('click', () => {
      page = (page + 1) % pages;
      update();
    });

    facilityDotsWrap.addEventListener('click', (event) => {
      const dot = event.target.closest('.facility__dot');
      if (!dot) return;
      const selected = Number(dot.dataset.page);
      if (Number.isNaN(selected)) return;
      page = selected;
      update();
    });

    window.addEventListener('resize', update);

    // ── Drag & swipe support (mouse + touch) ──
    const facilityViewport = facility.querySelector('.facility__viewport');
    let facDragStartX = 0;
    let facDragStartTranslate = 0;
    let facIsDragging = false;

    const getFacBaseTranslate = () => {
      const cardWidth = facilityCards[0].getBoundingClientRect().width;
      return -page * (cardWidth + 12);
    };

    const facStartDrag = (clientX) => {
      facIsDragging = true;
      facDragStartX = clientX;
      facDragStartTranslate = getFacBaseTranslate();
      facilityTrack.style.transition = 'none';
      facilityViewport.classList.add('is-dragging');
    };

    const facMoveDrag = (clientX) => {
      if (!facIsDragging) return;
      facilityTrack.style.transform = `translateX(${facDragStartTranslate + (clientX - facDragStartX)}px)`;
    };

    const facEndDrag = (clientX) => {
      if (!facIsDragging) return;
      facIsDragging = false;
      facilityViewport.classList.remove('is-dragging');
      facilityTrack.style.transition = '';
      const delta = clientX - facDragStartX;
      if (delta < -40) page = (page + 1) % pages;
      else if (delta > 40) page = (page - 1 + pages) % pages;
      update();
    };

    // Mouse
    facilityViewport.addEventListener('mousedown', (e) => facStartDrag(e.clientX));
    window.addEventListener('mousemove', (e) => { if (facIsDragging) facMoveDrag(e.clientX); });
    window.addEventListener('mouseup', (e) => facEndDrag(e.clientX));
    facilityViewport.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch
    facilityViewport.addEventListener('touchstart', (e) => facStartDrag(e.touches[0].clientX), { passive: true });
    facilityViewport.addEventListener('touchmove', (e) => { if (facIsDragging) facMoveDrag(e.touches[0].clientX); }, { passive: true });
    facilityViewport.addEventListener('touchend', (e) => facEndDrag(e.changedTouches[0].clientX), { passive: true });

    update();
  }
})();
