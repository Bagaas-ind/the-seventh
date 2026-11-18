import { useEffect, useState } from 'react';
import api from '../api/axios';

const TABS = ['news', 'music', 'galleries'];

const EMPTY = {
  news: { title: '', excerpt: '', content: '', image_url: '' },
  music: { title: '', type: 'Single', embed_url: '' },
  galleries: { image_url: '', caption: '' },
};

export default function Admin() {
  const [logged, setLogged] = useState(!!localStorage.getItem('token'));
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [tab, setTab] = useState('news');
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY.news);
  const [editId, setEditId] = useState(null);

  const loadData = async (t = tab) => {
    try {
      const r = await api.get(`/${t}`);
      setItems(r.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (logged) loadData(tab);
  }, [logged, tab]);

  const login = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const r = await api.post('/login', creds);
      localStorage.setItem('token', r.data.token);
      setLogged(true);
    } catch (error) {
      setErr('Email atau password salah, atau server backend mati.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLogged(false);
    setItems([]);
  };

  const resetForm = () => {
    setForm(EMPTY[tab]);
    setEditId(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await api.put(`/${tab}/${editId}`, form);
      else await api.post(`/${tab}`, form);
      resetForm();
      loadData();
    } catch (error) {
      alert('Gagal menyimpan. Cek kembali isian form Anda.');
    }
  };

  const remove = async (id) => {
    if (!confirm('Hapus item ini?')) return;
    await api.delete(`/${tab}/${id}`);
    loadData();
  };

  const startEdit = (item) => {
    setEditId(item.id);
    const { id, created_at, updated_at, ...rest } = item;
    if (tab === 'tours' && rest.date) rest.date = rest.date.split('T')[0]; // Format tanggal untuk input
    setForm(rest);
  };

  if (!logged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-950 px-4 pt-20">
        <form onSubmit={login} className="w-full max-w-sm bg-ink-900 border border-ink-800 p-8">
          <h1 className="font-display text-3xl font-bold text-white mb-1">ADMIN</h1>
          <p className="text-xs text-gray-500 tracking-widest uppercase mb-8">Restricted Area</p>
          {err && <p className="text-blood-500 text-sm mb-4">{err}</p>}
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email</label>
          <input type="email" required value={creds.email} onChange={(e) => setCreds({ ...creds, email: e.target.value })} className="w-full bg-ink-950 border border-ink-800 focus:border-blood-600 px-4 py-3 text-white mb-4 outline-none" />
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Password</label>
          <input type="password" required value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })} className="w-full bg-ink-950 border border-ink-800 focus:border-blood-600 px-4 py-3 text-white mb-6 outline-none" />
          <button className="w-full bg-blood-600 hover:bg-blood-700 text-white font-display uppercase tracking-[0.25em] text-xs py-3">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 pt-28 pb-16 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-display text-blood-500 uppercase tracking-[0.4em] text-xs">/ Dashboard</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white capitalize">{tab} Manager</h1>
          </div>
          <button onClick={logout} className="text-xs font-display uppercase tracking-widest text-gray-400 hover:text-blood-500">Logout →</button>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {TABS.map((t) => (
            <button key={t} onClick={() => { setTab(t); setForm(EMPTY[t]); setEditId(null); }} className={`font-display uppercase tracking-widest text-xs px-5 py-2 border transition-colors whitespace-nowrap ${tab === t ? 'bg-blood-600 border-blood-600 text-white' : 'border-ink-800 text-gray-400 hover:border-blood-600 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* FORM INPUT */}
          <form onSubmit={submit} className="lg:col-span-2 bg-ink-900 border border-ink-800 p-6 space-y-3 h-fit">
            <h2 className="font-display text-lg font-bold text-white mb-2">{editId ? 'Edit' : 'Tambah'} {tab}</h2>
            {Object.keys(EMPTY[tab]).map((k) => (
              <div key={k}>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">{k}</label>
                <input
                  type={k === 'date' ? 'date' : 'text'}
                  value={form[k] || ''}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  className="w-full bg-ink-950 border border-ink-800 focus:border-blood-600 px-3 py-2 text-sm text-white outline-none"
                  required={['title', 'embed_url', 'image_url', 'city', 'date', 'venue'].includes(k)}
                />
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 bg-blood-600 hover:bg-blood-700 text-white font-display uppercase tracking-widest text-xs py-3">{editId ? 'Update' : 'Simpan'}</button>
              {editId && <button type="button" onClick={resetForm} className="px-4 border border-ink-800 text-gray-400 hover:text-white text-xs uppercase tracking-widest">Cancel</button>}
            </div>
          </form>

          {/* TABLE DATA */}
          <div className="lg:col-span-3 bg-ink-900 border border-ink-800 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-[10px] uppercase tracking-widest text-gray-500 border-b border-ink-800">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Data Utama</th>
                  <th className="p-3 w-32">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-b border-ink-800/60 hover:bg-ink-950/60">
                    <td className="p-3 text-gray-500">{it.id}</td>
                    <td className="p-3 text-gray-200">{it.title || it.city || it.caption || it.type}</td>
                    <td className="p-3">
                      <button onClick={() => startEdit(it)} className="text-xs text-blood-500 hover:underline mr-3">Edit</button>
                      <button onClick={() => remove(it.id)} className="text-xs text-gray-400 hover:text-blood-500">Hapus</button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan="3" className="p-6 text-center text-gray-500">Belum ada data.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}