# Smile Concept Type Scale

Typography system for Smile Concept dental clinic. Body text locked at 24px across all breakpoints.

## Font Stack

- **Display & Headlines**: Playfair (serif)
- **Sub-headlines & Buttons**: Familjen Grotesk
- **Body & UI**: Inclusive Sans

---

## Desktop Specifications
*Viewport ≥ 768px*

### H1 / Display
```
Font: Playfair Regular
Weight: 400
Size: 96px
Line-height: 1.05
Letter-spacing: -0.02em
```

### H2
```
Font: Playfair Regular
Weight: 400
Size: 60px
Line-height: 1.1
Letter-spacing: -0.015em
```

### H3 / Sub-headline
```
Font: Familjen Grotesk Medium
Weight: 500
Size: 36px
Line-height: 1.2
Letter-spacing: 0
```

### H4
```
Font: Familjen Grotesk Medium
Weight: 500
Size: 24px
Line-height: 1.3
Letter-spacing: 0
```

### Body
```
Font: Inclusive Sans Regular
Weight: 400
Size: 24px
Line-height: 1.5
Letter-spacing: 0.01em
```

### Caption
```
Font: Inclusive Sans Regular
Weight: 400
Size: 18px
Line-height: 1.4
Letter-spacing: 0.02em
```

### Button Large
```
Font: Familjen Grotesk Medium
Weight: 500
Size: 20px
Line-height: 1.2
Letter-spacing: 0.02em
Min-height: 52px
Padding: 32px horizontal
```

### Button Small
```
Font: Familjen Grotesk Medium
Weight: 500
Size: 18px
Line-height: 1.2
Letter-spacing: 0.02em
Min-height: 44px
Padding: 24px horizontal
```

---

## Mobile Specifications
*Viewport ≤ 767px*

### H1 / Display
```
Font: Playfair Regular
Weight: 400
Size: 64px
Line-height: 1.1
Letter-spacing: -0.015em
```

### H2
```
Font: Playfair Regular
Weight: 400
Size: 40px
Line-height: 1.15
Letter-spacing: -0.01em
```

### H3 / Sub-headline
```
Font: Familjen Grotesk Medium
Weight: 500
Size: 26px
Line-height: 1.25
Letter-spacing: 0
```

### H4
```
Font: Familjen Grotesk Medium
Weight: 500
Size: 24px
Line-height: 1.3
Letter-spacing: 0
```

### Body
```
Font: Inclusive Sans Regular
Weight: 400
Size: 24px
Line-height: 1.5
Letter-spacing: 0.01em
```

### Caption
```
Font: Inclusive Sans Regular
Weight: 400
Size: 18px
Line-height: 1.4
Letter-spacing: 0.02em
```

### Button Large
```
Font: Familjen Grotesk Medium
Weight: 500
Size: 20px
Line-height: 1.2
Letter-spacing: 0.02em
Min-height: 52px
Padding: 32px horizontal
```

### Button Small
```
Font: Familjen Grotesk Medium
Weight: 500
Size: 18px
Line-height: 1.2
Letter-spacing: 0.02em
Min-height: 44px
Padding: 24px horizontal
```

---

## CSS Implementation Example

```css
/* Desktop (≥768px) */
.h1-display {
  font-family: 'Playfair', serif;
  font-weight: 400;
  font-size: 96px;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.h2 {
  font-family: 'Playfair', serif;
  font-weight: 400;
  font-size: 60px;
  line-height: 1.1;
  letter-spacing: -0.015em;
}

.h3-subheadline {
  font-family: 'Familjen Grotesk', sans-serif;
  font-weight: 500;
  font-size: 36px;
  line-height: 1.2;
  letter-spacing: 0;
}

.body {
  font-family: 'Inclusive Sans', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.caption {
  font-family: 'Inclusive Sans', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.4;
  letter-spacing: 0.02em;
}

.button-large {
  font-family: 'Familjen Grotesk', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.2;
  letter-spacing: 0.02em;
  min-height: 52px;
  padding: 0 32px;
}

.button-small {
  font-family: 'Familjen Grotesk', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.2;
  letter-spacing: 0.02em;
  min-height: 44px;
  padding: 0 24px;
}

/* Mobile (≤767px) */
@media (max-width: 767px) {
  .h1-display {
    font-size: 64px;
    line-height: 1.1;
    letter-spacing: -0.015em;
  }

  .h2 {
    font-size: 40px;
    line-height: 1.15;
    letter-spacing: -0.01em;
  }

  .h3-subheadline {
    font-size: 26px;
    line-height: 1.25;
  }
  
  /* Body, caption, and buttons remain the same */
}
```

---

## Type Scale Ratios

- **H1 → H2**: 1.6× (96px → 60px desktop, 64px → 40px mobile)
- **H2 → H3**: 1.67× (60px → 36px desktop, 40px → 26px mobile)
- **H3 → Body**: 1.5× (36px → 24px desktop, 26px → 24px mobile)
- **Body → Caption**: 1.33× (24px → 18px both)

---

## Usage Notes

1. **Body text at 24px** is generous and prioritizes readability. All other sizes are built around this anchor.

2. **Playfair display sizes** use negative letter-spacing (-0.015em to -0.02em) to prevent the serifs from feeling too loose at large scales.

3. **H3 uses Familjen Grotesk Medium (500)** instead of Semibold to create visual hierarchy separation from the serif headlines while maintaining readability.

4. **Button text sizes remain constant** across breakpoints (20px large, 18px small) since they're UI controls, not content hierarchy.

5. **Caption uses +0.02em letter-spacing** for improved legibility at smaller sizes.

---

## Brand Reference

Developed by TumbuhSehat for Smile Concept Dental Clinic.

**Color palette integration**: Pair with main color #15384f, emphasize color #d1e7f6, and background texture #e2e1dd.
