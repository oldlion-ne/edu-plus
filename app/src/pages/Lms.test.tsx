import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import LmsHub from './LmsHub';
import LmsTrackDetail from './LmsTrackDetail';
import LmsLessonPlayer from './LmsLessonPlayer';
import LmsQuiz from './LmsQuiz';
import { LmsProgressProvider } from '../lib/lmsProgressContext';
import { AuthProvider } from '../lib/AuthContext';

// Mock shuffleArray to be deterministic for tests
vi.mock('../lib/algorithms/shuffle_array', () => ({
  shuffleArray: <T,>(arr: T[]) => arr,
}));

// Mock ResizeObserver for JSDOM
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).ResizeObserver = ResizeObserverMock;

// Mock matchMedia for JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('LMS Learning Management System', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders LMS Hub with curriculum tracks and telemetry cards', () => {
    render(
      <MemoryRouter initialEntries={['/lms']}>
        <AuthProvider>
          <LmsProgressProvider>
            <LmsHub />
          </LmsProgressProvider>
        </AuthProvider>
      </MemoryRouter>,
    );

    // Check header and titles
    expect(screen.getByText('Welcome back, Learner.')).toBeInTheDocument();
    expect(screen.getAllByText('FuturePath Navigator')[0]).toBeInTheDocument();
    expect(screen.getByText('LifeSkills Lab')).toBeInTheDocument();
  });

  it('renders categorized sections for curriculum tracks', () => {
    render(
      <MemoryRouter initialEntries={['/lms']}>
        <AuthProvider>
          <LmsProgressProvider>
            <LmsHub />
          </LmsProgressProvider>
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Human Capabilities')).toBeInTheDocument();
    expect(screen.getByText('Industry Mentorship')).toBeInTheDocument();
    expect(screen.getByText('Global Admissions')).toBeInTheDocument();
  });

  it('renders Track Detail page with modules and learning outcomes', () => {
    render(
      <MemoryRouter initialEntries={['/lms/tracks/futurepath-navigator']}>
        <AuthProvider>
          <LmsProgressProvider>
            <Routes>
              <Route path="/lms/tracks/:trackId" element={<LmsTrackDetail />} />
            </Routes>
          </LmsProgressProvider>
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(screen.getAllByText('FuturePath Navigator')[0]).toBeInTheDocument();
    expect(screen.getByText(/Scientific Psychometrics & Cognitive Profiling/i)).toBeInTheDocument();
    expect(screen.getByText(/Verified Learning Outcomes/i)).toBeInTheDocument();
  });

  it('renders interactive Lesson Player and allows toggling lesson completion', async () => {
    render(
      <MemoryRouter initialEntries={['/lms/learn/futurepath-navigator/fp-les-101']}>
        <AuthProvider>
          <LmsProgressProvider>
            <Routes>
              <Route path="/lms/learn/:trackId/:lessonId" element={<LmsLessonPlayer />} />
            </Routes>
          </LmsProgressProvider>
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/Foundations of Aptitude: Beyond Classroom Grades/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Key Takeaways & Synthesis/i)).toBeInTheDocument();

    // Toggle complete
    const markBtn = screen.getByRole('button', { name: /Mark as Done/i });
    fireEvent.click(markBtn);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Completed/i })).toBeInTheDocument();
    });
  });

  it('renders module Quiz assessment, handles option selection and shows explanation', async () => {
    render(
      <MemoryRouter initialEntries={['/lms/quiz/futurepath-navigator/fp-mod-1']}>
        <AuthProvider>
          <LmsProgressProvider>
            <Routes>
              <Route path="/lms/quiz/:trackId/:moduleId" element={<LmsQuiz />} />
            </Routes>
          </LmsProgressProvider>
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/QUESTION 1 OF/i)).toBeInTheDocument();

    // Pick an option
    const optionBtn = screen.getByText(/They decode innate cognitive aptitudes/i);
    fireEvent.click(optionBtn);

    // Click confirm answer
    const confirmBtn = screen.getByRole('button', { name: /Confirm Answer/i });
    fireEvent.click(confirmBtn);

    // Explanation should appear
    await waitFor(() => {
      expect(screen.getByText(/CORRECT ANALYSIS/i)).toBeInTheDocument();
    });
  });
});
