import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Hero from '../components/Hero';
import NewsCard from '../components/NewsCard';

export default function Home() {
  const [news, setNews]   = useState([]);
  const [tours, setTours] = useState([]);
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [newsRes, toursRes, musicRes] = await Promise.all([
          api.get('/news'),
          api.get('/tours'),
          api.get('/music'),
        ]);
        setNews(newsRes.data.slice(0, 3));
        setTours(toursRes.data.slice(0, 3));
        setMusic(musicRes.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Gagal memuat data. Pastikan backend Laravel sudah berjalan.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="bg-ink-950 text-gray-200">
      <Hero />

      {/* ===== LATEST NEWS ===== */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ Latest</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">NEWS</h2>
          </div>
          <Link
            to="/news"
            className="font-display uppercase tracking-[0.2em] text-xs text-gray-400 hover:text-blood-500 transition-colors"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Memuat berita...</p>
        ) : error ? (
          <p className="text-blood-500">{error}</p>
        ) : news.length === 0 ? (
          <p className="text-gray-500">Belum ada berita.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((n) => <NewsCard key={n.id} news={n} />)}
          </div>
        )}
      </section>

      {/* ===== MUSIC ===== */}
      <section className="bg-ink-900/40 py-24 border-y border-ink-800">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-12">
            <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ Listen</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">OUR MUSIC</h2>
          </div>

          {music.length === 0 ? (
            <p className="text-gray-500">Music coming soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {music.map((m) => (
                <div
                  key={m.id}
                  className="bg-ink-950 border border-ink-800 p-4 hover:border-blood-900 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[11px] font-display uppercase tracking-[0.25em] text-blood-500">
                        {m.type}
                      </p>
                      <h3 className="font-display text-lg font-semibold text-white">{m.title}</h3>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-blood-500 animate-pulse" />
                  </div>
                  <iframe
                    src={m.embed_url}
                    title={m.title}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== TOUR ===== */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <div className="mb-12">
          <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ Live</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">TOUR DATES</h2>
        </div>

        {tours.length === 0 ? (
          <p className="text-gray-500">Tidak ada jadwal mendatang.</p>
        ) : (
          <div className="border-y border-ink-800 divide-y divide-ink-800">
            {tours.map((t) => {
              const d = new Date(t.date);
              return (
                <div
                  key={t.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 md:px-4 py-6 hover:bg-ink-900/70 transition-colors group"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-center min-w-[70px]">
                      <p className="font-display text-3xl md:text-4xl font-bold text-white leading-none">
                        {String(d.getDate()).padStart(2, '0')}
                      </p>
                      <p className="font-display text-[10px] uppercase tracking-[0.25em] text-blood-500 mt-1">
                        {d.toLocaleDateString('id-ID', { month: 'short' })} {d.getFullYear()}
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-xl md:text-2xl font-semibold text-white group-hover:text-blood-500 transition-colors">
                        {t.city}
                      </p>
                      <p className="text-sm text-gray-400">{t.venue}</p>
                    </div>
                  </div>
                  {t.ticket_link && (
                    <a
                      href={t.ticket_link}
                      target="_blank"
                      rel="noreferrer"
                      className="self-start md:self-auto bg-blood-600 hover:bg-blood-700 text-white font-display uppercase tracking-[0.25em] text-xs px-6 py-3 transition-colors"
                    >
                      Buy Tickets
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <footer className="border-t border-ink-800 py-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gray-500">
            © {new Date().getFullYear()} The Seventh
          </p>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gray-600">
            Booking: <span className="text-blood-500">booking@theseventh.com</span>
          </p>
        </div>
      </footer>
    </div>
  );
}