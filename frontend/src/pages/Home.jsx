import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

// ==========================================
// DATA DUMMY (DITULIS LANGSUNG DI SINI)
// ==========================================
const DUMMY_NEWS = [
  {
    id: 1,
    title: "The Seventh Rilis Single Terbaru 'Darkness'",
    excerpt: "Single yang terinspirasi dari kerasnya kehidupan kota, direkam 100% di studio independen.",
    image_url: "/images/gallery-1.jpg",
    date: "12 Nov 2026"
  },
  {
    id: 2,
    title: "Behind The Scene: Studio Session",
    excerpt: "Proses kreatif di balik layar pembuatan album pertama kami. Penuh tawa dan air mata.",
    image_url: "/images/gallery-2.jpg",
    date: "05 Nov 2026"
  },
  {
    id: 3,
    title: "The Seventh Guncang Panggung Lokal",
    excerpt: "Terima kasih untuk ribuan kepala yang bergoyang malam itu. Sampai jumpa di kota berikutnya!",
    image_url: "/images/hero.jpg",
    date: "28 Okt 2026"
  }
];

const DUMMY_TOURS = [
  { id: 1, date: "2026-12-15", city: "Jakarta", venue: "Tennis Indoor Senayan", link: "#" },
  { id: 2, date: "2026-12-20", city: "Bandung", venue: "Sabuga ITB", link: "#" },
  { id: 3, date: "2027-01-10", city: "Surabaya", venue: "Grand City Hall", link: "#" },
];

export default function Home() {
  return (
    <div className="bg-ink-950 text-gray-200">
      <Hero />

      {/* ================= ABOUT SECTION (BARU) ================= */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24 grid md:grid-cols-2 gap-12 items-center">
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
      </section>

      {/* ================= LATEST NEWS ================= */}
      <section className="bg-ink-900/30 py-24 border-t border-ink-800">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ Latest</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">NEWS</h2>
            </div>
            <Link to="/news" className="font-display uppercase tracking-[0.2em] text-xs text-gray-400 hover:text-blood-500 transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DUMMY_NEWS.map((n) => (
              <article key={n.id} className="group bg-ink-950 border border-ink-800 hover:border-blood-600 transition-all duration-300 overflow-hidden">
                <div className="aspect-video overflow-hidden bg-ink-800">
                  <img src={n.image_url} alt={n.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                </div>
                <div className="p-6">
                  <p className="text-[11px] text-blood-500 font-display tracking-[0.25em] uppercase mb-3">{n.date}</p>
                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-blood-500 transition-colors leading-tight mb-3">{n.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{n.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MUSIC / YOUTUBE ================= */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
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
      </section>

      {/* ================= TOUR ================= */}
      <section className="bg-ink-900/30 py-24 border-y border-ink-800">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="mb-12 text-center">
            <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ Live</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">TOUR DATES</h2>
          </div>

          <div className="border-t border-ink-800">
            {DUMMY_TOURS.map((t) => {
              const d = new Date(t.date);
              return (
                <div key={t.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-ink-800 hover:bg-ink-950/50 transition-colors group px-4">
                  <div className="flex items-center gap-6">
                    <div className="text-center min-w-[70px]">
                      <p className="font-display text-3xl font-bold text-white leading-none">{String(d.getDate()).padStart(2, '0')}</p>
                      <p className="font-display text-[10px] uppercase tracking-[0.25em] text-blood-500 mt-1">{d.toLocaleDateString('id-ID', { month: 'short' })} {d.getFullYear()}</p>
                    </div>
                    <div>
                      <p className="font-display text-xl font-semibold text-white group-hover:text-blood-500 transition-colors">{t.city}</p>
                      <p className="text-sm text-gray-400">{t.venue}</p>
                    </div>
                  </div>
                  <button className="self-start md:self-auto bg-blood-600 hover:bg-blood-700 text-white font-display uppercase tracking-[0.25em] text-xs px-6 py-3 transition-colors">
                    Buy Tickets
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gray-500">
            © {new Date().getFullYear()} The Seventh. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://www.youtube.com/@the_sventh7" target="_blank" rel="noreferrer" className="font-display text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-blood-500">YouTube</a>
            <a href="https://www.instagram.com/the_sventh/" target="_blank" rel="noreferrer" className="font-display text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-blood-500">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}