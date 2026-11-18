import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

export default function NewsDetail() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/news/${slug}`)
      .then((res) => setNews(res.data))
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-ink-950 pt-32 text-center text-gray-500">Memuat artikel...</div>;
  if (error || !news) return <div className="min-h-screen bg-ink-950 pt-32 text-center text-blood-500">Berita tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-ink-950 pt-32 pb-24 px-5 md:px-8">
      <article className="max-w-3xl mx-auto">
        <Link to="/news" className="font-display text-xs text-gray-500 hover:text-blood-500 uppercase tracking-widest mb-8 inline-block">
          ← Back to News
        </Link>
        
        <p className="font-display text-blood-500 uppercase tracking-[0.3em] text-xs mb-4">
          {new Date(news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
          {news.title}
        </h1>

        {news.image_url && (
          <img src={news.image_url} alt={news.title} className="w-full aspect-video object-cover border border-ink-800 mb-10 grayscale hover:grayscale-0 transition-all duration-700" />
        )}

        <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
          {/* Render konten berita. Jika isinya HTML, gunakan dangerouslySetInnerHTML */}
          <p className="whitespace-pre-wrap">{news.content}</p>
        </div>
      </article>
    </div>
  );
}