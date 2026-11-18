import { useEffect, useState } from 'react';
import api from '../api/axios';
import NewsCard from '../components/NewsCard';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/news')
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 pt-32 pb-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-b border-ink-800 pb-6">
          <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ Archive</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">ALL NEWS</h1>
        </div>

        {loading ? (
          <p className="text-gray-500">Memuat berita...</p>
        ) : news.length === 0 ? (
          <p className="text-gray-500">Belum ada berita. Silakan tambah via Admin.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((n) => <NewsCard key={n.id} news={n} />)}
          </div>
        )}
      </div>
    </div>
  );
}