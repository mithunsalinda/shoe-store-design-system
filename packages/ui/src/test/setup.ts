import "@testing-library/jest-dom/vitest";

if (typeof window.PointerEvent === "undefined") {
  window.PointerEvent = MouseEvent as typeof PointerEvent;
}
