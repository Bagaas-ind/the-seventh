import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import Hero from '../components/Hero';
import NewsCard from '../components/NewsCard';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil berita terbaru, kita batasi hanya ambil 3 untuk Home
    api.get('/news')
      .then((res) => setNews(res.data.slice(0, 3)))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-ink-950 text-gray-200 overflow-hidden">
      <Hero />

      {/* ================= ABOUT SECTION ================= */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="max-w-7xl mx-auto px-5 md:px-8 py-24 grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ The Band</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 mb-6">LOUDER THAN LIFE.</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            The Seventh adalah entitas yang lahir dari kegelisahan. Berdiri sejak 2014, kami meramu distorsi, ritme yang berat, dan lirik yang jujur menjadi satu kesatuan yang brutal. 
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Kami tidak sekadar bermain musik; kami meneriakkan apa yang tidak bisa diucapkan. Bergabunglah dalam kekacauan yang indah ini.
          </p>
          <div className="flex gap-4 font-display text-sm tracking-widest text-white">
            <span className="border border-ink-800 px-4 py-2">#AlternativeRock</span>
            <span className="border border-ink-800 px-4 py-2">#PostGrunge</span>
          </div>
        </div>
        <div className="relative aspect-[4/3] bg-ink-900 border border-ink-800 grayscale hover:grayscale-0 transition-all duration-700">
          <img src="/images/gallery-2.jpg" alt="The Band" className="w-full h-full object-cover object-center" />
        </div>
      </motion.section>

      {/* ================= LATEST NEWS ================= */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="bg-ink-900/30 py-24 border-t border-ink-800"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ Latest</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">NEWS</h2>
            </div>
            <Link to="/news" className="font-display uppercase tracking-[0.2em] text-xs text-gray-400 hover:text-blood-500 transition-colors mb-2">View All →</Link>
          </div>

          {loading ? (
            <p className="text-gray-500">Memuat berita terbaru...</p>
          ) : news.length === 0 ? (
            <p className="text-gray-500">Belum ada berita. Silakan tambah dari halaman Admin.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {news.map((n) => (
                <NewsCard key={n.id} news={n} />
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* ================= MUSIC / YOUTUBE ================= */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="max-w-7xl mx-auto px-5 md:px-8 py-24"
      >
        <div className="mb-12 text-center">
          <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ Listen</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">OUR MUSIC</h2>
        </div>
        <a href="https://www.youtube.com/@the_sventh7" target="_blank" rel="noreferrer" className="relative block max-w-4xl mx-auto aspect-video group overflow-hidden border border-ink-800 hover:border-blood-600 transition-all duration-500">
          <img src="/images/gallery-1.jpg" alt="YouTube" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 grayscale" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-blood-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(220,38,38,0.6)] group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <h3 className="font-display text-2xl md:text-4xl font-bold text-white tracking-widest uppercase drop-shadow-lg">Watch Our Channel</h3>
            <p className="text-gray-300 font-display tracking-[0.3em] text-xs mt-3">@the_sventh7</p>
          </div>
        </a>
      </motion.section>

      <footer className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gray-500">© {new Date().getFullYear()} The Seventh. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://www.youtube.com/@the_sventh7" target="_blank" rel="noreferrer" className="font-display text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-blood-500 transition-colors">YouTube</a>
            <a href="https://www.instagram.com/the_sventh/" target="_blank" rel="noreferrer" className="font-display text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-blood-500 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}