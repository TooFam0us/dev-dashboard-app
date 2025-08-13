import { render, screen, waitFor } from '@testing-library/react';
import NewsWidget from '../components/NewsWidget';

beforeAll(() => {
  global.fetch = jest.fn((url) => {
    if (url.toString().includes('topstories.json')) {
      return Promise.resolve({
        json: () => Promise.resolve([1, 2, 3]), // Top story IDs
      }) as any;
    }

    if (url.toString().includes('item/')) {
      const idFromUrl = Number(url.toString().match(/item\/(\d+)/)?.[1]) || 0;
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            id: idFromUrl,
            title: `Test Story ${idFromUrl}`,
            url: `https://example.com/news/${idFromUrl}`,
          }),
      }) as any;
    }

    return Promise.reject(new Error('Unknown URL'));
  }) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

test('renders news widget with mock data', async () => {
  render(<NewsWidget />);

  // Wait for all mock articles to appear
  await waitFor(() => {
    expect(screen.getByText('Test Story 1')).toBeInTheDocument();
    expect(screen.getByText('Test Story 2')).toBeInTheDocument();
    expect(screen.getByText('Test Story 3')).toBeInTheDocument();
  });
});