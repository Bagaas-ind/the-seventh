import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/news',    label: 'News' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/admin',   label: 'Admin' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-950/95 backdrop-blur-md border-b border-blood-900/50 py-3 shadow-lg shadow-black/50'
          : 'bg-gradient-to-b from-black/70 to-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl md:text-2xl font-bold tracking-[0.25em] text-white"
        >
          THE <span className="text-blood-500">SEVENTH</span>
        </Link>

        {/* Desktop Menu & Socials */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => {
              const active = location.pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`font-display text-xs uppercase tracking-[0.2em] transition-colors ${
                      active ? 'text-blood-500' : 'text-gray-300 hover:text-blood-500'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Ikon Sosial Media Desktop */}
          <div className="flex items-center gap-5 border-l border-gray-700 pl-8">
            <a href="https://www.youtube.com/@the_sventh7" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blood-500 transition-colors" title="YouTube">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://www.instagram.com/the_sventh/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blood-500 transition-colors" title="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {open && (
        <ul className="md:hidden bg-ink-950/98 backdrop-blur-md border-t border-blood-900/50 px-6 py-5 space-y-4">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="block font-display text-sm uppercase tracking-[0.2em] text-gray-200 hover:text-blood-500 transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-4 border-t border-gray-800 flex gap-6">
            <a href="https://www.youtube.com/@the_sventh7" target="_blank" rel="noreferrer" className="font-display text-sm uppercase tracking-[0.2em] text-gray-400 hover:text-blood-500">YouTube</a>
            <a href="https://www.instagram.com/the_sventh/" target="_blank" rel="noreferrer" className="font-display text-sm uppercase tracking-[0.2em] text-gray-400 hover:text-blood-500">Instagram</a>
          </li>
        </ul>
      )}
    </header>
  );
}