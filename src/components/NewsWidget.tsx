import { useEffect, useState } from 'react';

interface NewsArticle {
  id: number;
  title: string;
  url: string;
}

export default function NewsWidget() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    async function fetchTopNews() {
      const topIds = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(
        (res) => res.json()
      );
      const top10 = topIds.slice(0, 5);
      const articleData = await Promise.all(
        top10.map((id: number) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) => res.json())
        )
      );
      setArticles(articleData);
    }

    fetchTopNews();
  }, []);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Top Hacker News</h2>
      <ul className="space-y-2">
        {articles.map((article) => (
          <li key={article.id ?? article.url}>
            <a
              href={article.url}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
