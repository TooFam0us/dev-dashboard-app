import { render, screen, waitFor, cleanup } from '@testing-library/react';
import NewsWidget from '../components/NewsWidget';

beforeAll(() => {
  // Mock global.fetch
  global.fetch = jest.fn(
    (input: RequestInfo, init?: RequestInit) => {
      // Normalize input to string
      let url: string;

      if (typeof input === 'string') {
        url = input;
      } else if (input instanceof Request) {
        url = input.url;
      } else {
        throw new Error('Unknown input type');
      }

      if (url.includes('topstories.json')) {
        return Promise.resolve({
          json: () => Promise.resolve([101, 102, 103]),
        } as unknown as Response);
      }

      if (url.includes('item/')) {
        const id = url.match(/item\/(\d+)\.json/)?.[1] ?? '0';
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              id: Number(id),
              title: `Test Story ${id}`,
              url: `https://example.com/news/${id}`,
            }),
        } as unknown as Response);
      }

      return Promise.reject(new Error('Unknown URL'));
    }
  ) as jest.MockedFunction<typeof fetch>;
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  jest.clearAllMocks();
  jest.clearAllTimers();

  (global as any).fetch = undefined;
});

test('renders news widget with mock data', async () => {
  render(<NewsWidget />);

  // Wait for all mocked articles to render
  await waitFor(() => {
    expect(screen.getByText('Test Story 101')).toBeInTheDocument();
    expect(screen.getByText('Test Story 102')).toBeInTheDocument();
    expect(screen.getByText('Test Story 103')).toBeInTheDocument();
  });

  // Check that links point to the correct URLs
  expect(screen.getByText('Test Story 101').closest('a')).toHaveAttribute(
    'href',
    'https://example.com/news/101'
  );
});