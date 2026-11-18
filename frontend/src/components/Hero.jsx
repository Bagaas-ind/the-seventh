import { Link } from 'react-router-dom';

// PASTIKAN NAMA FILE DI BAWAH INI SAMA DENGAN YANG ADA DI FOLDER PUBLIC/IMAGES
const BG_IMG = '/images/hero.jpg'; 

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            <img
        src={BG_IMG}
        alt="The Seventh on stage"
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />
      {/* Overlay gradien kita tipiskan agar muka personil lebih kelihatan */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-ink-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(220,38,38,0.35),transparent_60%)]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="font-display text-blood-500 tracking-[0.6em] text-xs md:text-sm mb-6 uppercase">
          Alternative Rock · Est. 2014
        </p>
        <h1 className="font-display font-bold text-white uppercase leading-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide drop-shadow-[0_0_50px_rgba(220,38,38,0.4)]">
          THE SEVENTH
        </h1>
        <p className="mt-8 text-gray-300 max-w-xl mx-auto text-sm md:text-base">
          Darkness has a sound. Experience the loudest chapter of our story —
          raw riffs, heavy drums, and lyrics that cut deep.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/tour"
            className="bg-blood-600 hover:bg-blood-700 text-white font-display uppercase tracking-[0.25em] text-xs px-8 py-4 transition-all shadow-lg shadow-blood-900/40"
          >
            Upcoming Tour
          </Link>
          <Link
            to="/gallery"
            className="border border-gray-600 hover:border-blood-600 hover:text-blood-500 text-gray-200 font-display uppercase tracking-[0.25em] text-xs px-8 py-4 transition-all"
          >
            View Gallery
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}