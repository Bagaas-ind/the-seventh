import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/galleries')
      .then((res) => setImages(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 pt-32 pb-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-b border-ink-800 pb-6">
          <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ Visuals</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">GALLERY</h1>
        </div>

        {loading ? (
          <p className="text-gray-500">Memuat galeri...</p>
        ) : images.length === 0 ? (
          <p className="text-gray-500">Belum ada foto. Silakan tambah via Admin.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img.id} className="group relative aspect-square overflow-hidden bg-ink-900 border border-ink-800">
                <img src={img.image_url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="font-display text-lg text-white tracking-widest uppercase">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}