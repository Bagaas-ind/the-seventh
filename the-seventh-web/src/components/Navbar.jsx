import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/news',    label: 'News' },
  { to: '/tour',    label: 'Tour' },
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
        <Link
          to="/"
          className="font-display text-xl md:text-2xl font-bold tracking-[0.25em] text-white"
        >
          THE <span className="text-blood-500">SEVENTH</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
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
        </ul>
      )}
    </header>
  );
}