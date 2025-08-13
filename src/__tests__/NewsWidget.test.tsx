import { render, screen, waitFor, cleanup } from '@testing-library/react';
import NewsWidget from '../components/NewsWidget';

type FetchInput = string | URL | Request;

beforeAll(() => {
  global.fetch = jest.fn((input: FetchInput): Promise<Response> => {
    let url: string;

    if (typeof input === 'string') {
      url = input;
    } else if (input instanceof URL) {
      url = input.toString();
    } else {
      // input is a Request
      url = input.url;
    }

    if (url.includes('topstories.json')) {
      return Promise.resolve({
        json: async () => [101, 102, 103],
      } as unknown as Response);
    }

    if (url.includes('item/')) {
      const id = url.match(/item\/(\d+)\.json/)?.[1] ?? '0';
      return Promise.resolve({
        json: async () => ({
          id: Number(id),
          title: `Test Story ${id}`,
          url: `https://example.com/news/${id}`,
        }),
      } as unknown as Response);
    }

    return Promise.reject(new Error('Unknown URL'));
  }) as unknown as typeof fetch;
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

test('renders news widget with mock data', async () => {
  render(<NewsWidget />);

  // Wait for all mocked articles to render
  await waitFor(() => {
    expect(screen.getByText('Test Story 101')).toBeInTheDocument();
    expect(screen.getByText('Test Story 102')).toBeInTheDocument();
    expect(screen.getByText('Test Story 103')).toBeInTheDocument();
  });
});
