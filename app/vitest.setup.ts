import '@testing-library/jest-dom';

const mockIntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});
