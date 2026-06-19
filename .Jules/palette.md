## 2025-05-14 - Keyboard Parity for Custom Interactive Elements
**Learning:** In vanilla JS applications, interactive elements are often built using `<div>` or `<span>` tags with `onclick` handlers for layout flexibility. However, these lack intrinsic keyboard support, focus states, and screen reader roles.
**Action:** Always pair `onclick` handlers with `role="button"` and `tabindex="0"`. Implement a global `keydown` listener for 'Enter' and 'Space' to provide parity with native `<button>` behavior, and use `:focus-visible` for high-contrast themed outlines.
