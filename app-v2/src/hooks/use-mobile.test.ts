import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook } from "@testing-library/react"
import { useIsMobile } from "./use-mobile"

describe("useIsMobile", () => {
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    vi.stubGlobal("innerWidth", 1024)
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
    vi.unstubAllGlobals()
  })

  it("should return false when screen is desktop width", () => {
    const addEventListener = vi.fn()
    const removeEventListener = vi.fn()
    
    vi.stubGlobal("matchMedia", vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener,
      removeEventListener,
      dispatchEvent: vi.fn(),
    })))

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it("should return true when screen is mobile width", () => {
    const addEventListener = vi.fn()
    const removeEventListener = vi.fn()
    
    vi.stubGlobal("innerWidth", 500)
    vi.stubGlobal("matchMedia", vi.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener,
      removeEventListener,
      dispatchEvent: vi.fn(),
    })))

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })
})
