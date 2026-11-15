import { useEffect, useState } from 'react';
import api from '../api/axios';

const EMPTY_NEWS = { title: '', excerpt: '', content: '', image_url: '' };

export default function Admin() {
  const [logged, setLogged] = useState(!!localStorage.getItem('token'));
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const [news, setNews] = useState([]);
  const [form, setForm] = useState(EMPTY_NEWS);
  const [editId, setEditId] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  /* -------- LOAD NEWS (Admin) -------- */
  const loadNews = async () => {
    setDataLoading(true);
    try {
      const res = await api.get('/news');
      setNews(res.data);
    } catch (e) {
      console.error(e);
      setErr('Gagal memuat berita.');
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (logged) loadNews();
  }, [logged]);

  /* -------- LOGIN -------- */
  const login = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await api.post('/login', creds);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setLogged(true);
    } catch (e) {
      if (e.response?.status === 422) {
        setErr(Object.values(e.response.data.errors || {}).flat().join(' '));
      } else if (e.response?.status === 401) {
        setErr('Email atau password salah.');
      } else {
        setErr('Login gagal. Cek koneksi ke backend.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      console.warn('Logout request failed:', e);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setLogged(false);
      setNews([]);
    }
  };

  /* -------- CRUD NEWS -------- */
  const resetForm = () => {
    setForm(EMPTY_NEWS);
    setEditId(null);
  };

  const submitNews = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      if (editId) {
        await api.put(`/news/${editId}`, form);
      } else {
        await api.post('/news', form);
      }
      resetForm();
      loadNews();
    } catch (e) {
      if (e.response?.status === 422) {
        setErr(Object.values(e.response.data.errors || {}).flat().join(' '));
      } else {
        setErr('Gagal menyimpan berita.');
      }
    }
  };

  const deleteNews = async (id) => {
    if (!window.confirm('Hapus berita ini?')) return;
    try {
      await api.delete(`/news/${id}`);
      loadNews();
    } catch (e) {
      setErr('Gagal menghapus berita.');
    }
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      excerpt: item.excerpt || '',
      content: item.content,
      image_url: item.image_url || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ============= LOGIN VIEW ============= */
  if (!logged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-950 px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm bg-ink-900 border border-ink-800 p-8"
        >
          <h1 className="font-display text-3xl font-bold text-white mb-1">ADMIN</h1>
          <p className="text-xs text-gray-500 tracking-widest uppercase mb-8">Restricted Area</p>

          {err && <p className="text-blood-500 text-sm mb-4">{err}</p>}

          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email</label>
          <input
            type="email"
            required
            value={creds.email}
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            className="w-full bg-ink-950 border border-ink-800 focus:border-blood-600 px-4 py-3 text-white mb-4 outline-none transition-colors"
          />

          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Password</label>
          <input
            type="password"
            required
            value={creds.password}
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            className="w-full bg-ink-950 border border-ink-800 focus:border-blood-600 px-4 py-3 text-white mb-6 outline-none transition-colors"
          />

          <button
            disabled={loading}
            className="w-full bg-blood-600 hover:bg-blood-700 disabled:opacity-50 text-white font-display uppercase tracking-[0.25em] text-xs py-3 transition-colors"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  /* ============= DASHBOARD VIEW ============= */
  return (
    <div className="min-h-screen bg-ink-950 pt-28 pb-16 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ Dashboard</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">News Manager</h1>
          </div>
          <button
            onClick={logout}
            className="text-xs font-display uppercase tracking-widest text-gray-400 hover:text-blood-500"
          >
            Logout →
          </button>
        </div>

        {err && (
          <div className="mb-6 px-4 py-3 bg-blood-900/40 border border-blood-700 text-blood-50 text-sm">
            {err}
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8">
          {/* FORM */}
          <form
            onSubmit={submitNews}
            className="lg:col-span-2 bg-ink-900 border border-ink-800 p-6 space-y-3 h-fit"
          >
            <h2 className="font-display text-lg font-bold text-white mb-2">
              {editId ? 'Edit Berita' : 'Tambah Berita'}
            </h2>

            <Field label="Title" required
              value={form.title}
              onChange={(v) => setForm({ ...form, title: v })} />

            <Field label="Excerpt"
              value={form.excerpt}
              onChange={(v) => setForm({ ...form, excerpt: v })} />

            <Field label="Image URL" type="url"
              value={form.image_url}
              onChange={(v) => setForm({ ...form, image_url: v })} />

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                Content <span className="text-blood-500">*</span>
              </label>
              <textarea
                rows={5}
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full bg-ink-950 border border-ink-800 focus:border-blood-600 px-3 py-2 text-sm text-white outline-none transition-colors resize-y"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 bg-blood-600 hover:bg-blood-700 text-white font-display uppercase tracking-widest text-xs py-3">
                {editId ? 'Update' : 'Simpan'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 border border-ink-800 text-gray-400 hover:text-white text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* TABLE */}
          <div className="lg:col-span-3 bg-ink-900 border border-ink-800 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-[10px] uppercase tracking-widest text-gray-500 border-b border-ink-800">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 w-32">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataLoading ? (
                  <tr><td colSpan="4" className="p-6 text-center text-gray-500">Memuat...</td></tr>
                ) : news.length === 0 ? (
                  <tr><td colSpan="4" className="p-6 text-center text-gray-500">Belum ada berita.</td></tr>
                ) : (
                  news.map((n) => (
                    <tr key={n.id} className="border-b border-ink-800/60 hover:bg-ink-950/60">
                      <td className="p-3 text-gray-500">{n.id}</td>
                      <td className="p-3 text-gray-200 max-w-[220px] truncate">{n.title}</td>
                      <td className="p-3 text-gray-400 text-xs">
                        {new Date(n.created_at).toLocaleDateString('id-ID')}
                      </td>
                      <td className="p-3">
                        <button onClick={() => startEdit(n)} className="text-xs text-blood-500 hover:underline mr-3">
                          Edit
                        </button>
                        <button onClick={() => deleteNews(n.id)} className="text-xs text-gray-400 hover:text-blood-500">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper sub-component */
function Field({ label, value, onChange, type = 'text', required = false }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">
        {label} {required && <span className="text-blood-500">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-ink-950 border border-ink-800 focus:border-blood-600 px-3 py-2 text-sm text-white outline-none transition-colors"
      />
    </div>
  );
}