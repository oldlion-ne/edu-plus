import { describe, expect, it, vi } from 'vitest';

import { scrollElementToTop } from './ScrollToTop';

describe('scrollElementToTop', () => {
  it('does not throw when the environment does not implement scrollTo', () => {
    expect(() => scrollElementToTop(document.createElement('div'))).not.toThrow();
  });

  it('uses the requested behavior when scrollTo is available', () => {
    const scrollTo = vi.fn();
    const element = Object.assign(document.createElement('div'), { scrollTo });

    scrollElementToTop(element, 'smooth');

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
