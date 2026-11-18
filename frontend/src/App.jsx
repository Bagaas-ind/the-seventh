import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import News from './pages/News';
import Gallery from './pages/Gallery';
// import Tour from './pages/Tour'; <-- HAPUS ATAU JADIKAN KOMENTAR

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          {/* <Route path="/tour" element={<Tour />} /> */} {/* <-- HAPUS ATAU JADIKAN KOMENTAR */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}