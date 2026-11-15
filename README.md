<div align="center">
  <img src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80" alt="The Seventh Banner" width="100%" style="border-radius: 10px;" />
  
  <br/>
  <br/>

  <h1>🤘 THE SEVENTH 🤘</h1>
  <p><strong>Alternative Rock · Est. 2014</strong></p>
  <p>Website profil band profesional dengan arsitektur Decoupled (Backend & Frontend terpisah). Mengusung desain <b>Dark, Edgy, dan Modern</b>.</p>

  <!-- Badges -->
  [![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
</div>

---

## 📖 Tentang Proyek
Proyek ini adalah website profil resmi untuk band fiksi bernama **The Seventh**. Dibangun untuk memberikan pengalaman visual yang kuat dan gelap (Dark Mode) sesuai dengan genre musik band (Rock/Metal Alternatif). 

Aplikasi ini menggunakan **arsitektur Decoupled (Headless)**, di mana Backend (Laravel) bertindak murni sebagai penyedia REST API, dan Frontend (React) mengonsumsi API tersebut.

## ✨ Fitur Utama
- 🎨 **UI/UX Modern:** Desain *dark-mode* dengan aksen merah darah.
- 🔐 **Autentikasi Admin:** Sistem login aman menggunakan Token (Laravel Sanctum).
- 📰 **Manajemen Konten (CRUD):** Dashboard admin untuk mengelola Berita, Jadwal Tur, Musik, dan Galeri.
- 🎵 **Integrasi Streaming:** Embed pemutar Spotify langsung di halaman utama.
- 🎟️ **Sistem Tiket:** Menampilkan jadwal tur mendatang dengan tautan pembelian tiket.

## 🚀 Cara Menjalankan Secara Lokal
### 1. Backend (Laravel)
```bash
cd the-seventh-api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
