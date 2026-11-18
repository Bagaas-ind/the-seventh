import { Link } from 'react-router-dom';

export default function NewsCard({ news }) {
  // Format tanggal
  const date = new Date(news.created_at).toLocaleDateString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <Link to={`/news/${news.slug}`} className="group block bg-ink-950 border border-ink-800 hover:border-blood-600 transition-all duration-300 overflow-hidden">
      <div className="aspect-video overflow-hidden bg-ink-800">
        {news.image_url ? (
          <img src={news.image_url} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-ink-800 to-black" />
        )}
      </div>
      <div className="p-6">
        <p className="text-[11px] text-blood-500 font-display tracking-[0.25em] uppercase mb-3">{date}</p>
        <h3 className="font-display text-xl font-semibold text-white group-hover:text-blood-500 transition-colors leading-tight mb-3 line-clamp-2">{news.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{news.excerpt}</p>
      </div>
    </Link>
  );
}