## 2025-05-14 - Interactive Divs Accessibility Pattern
**Learning:** This application pervasively uses `div` elements with `onclick` handlers for critical menu interactions (Act/Chapter cards, navigation). This prevents keyboard navigation (no `tabindex`) and fails to communicate purpose to screen readers (no `role` or `aria-label`).
**Action:** Always add `role="button"`, `tabindex="0"`, and a descriptive `aria-label` when encountering interactive `div` elements. Additionally, implement a global keydown handler for "Enter" and "Space" to ensure these elements are actually usable by keyboard.
