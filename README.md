<div align="center"> <h1>🤘 THE SEVENTH 🤘</h1> <p><strong>Official Website for The Seventh - Alternative Rock Band</strong></p> <p>Sebuah website profil band profesional dengan arsitektur Decoupled (Backend & Frontend terpisah), mengusung desain <i>Dark, Edgy, dan Modern</i>.</p> <!-- Badges -->
https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white
https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E

</div>
📸 Preview
(Tambahkan screenshot website Anda di sini nanti)

Ganti teks ini dengan gambar hasil screenshot halaman Home, Admin Dashboard, dll.

Contoh cara memasukkan gambar:
![Home Page](link_gambar_disini)

📖 Tentang Proyek Ini
Proyek ini adalah website profil resmi untuk band fiksi bernama The Seventh. Dibangun untuk memberikan pengalaman visual yang kuat dan gelap (Dark Mode) sesuai dengan genre musik band (Rock/Metal Alternatif).

Aplikasi ini menggunakan arsitektur Decoupled (Headless), di mana Backend (Laravel) bertindak murni sebagai penyedia REST API, dan Frontend (React) mengonsumsi API tersebut untuk menampilkan antarmuka pengguna.

✨ Fitur Utama
🎨 UI/UX Modern & Responsif: Desain dark-mode dengan aksen merah darah, menggunakan font Oswald & Inter.

🔐 Autentikasi Admin: Sistem login aman menggunakan Token (Laravel Sanctum).

📰 Manajemen Konten (CRUD): Dashboard admin untuk mengelola Berita (News), Jadwal Tur, Musik, dan Galeri.

🎵 Integrasi Streaming: Embed pemutar Spotify langsung di halaman utama.

🎟️ Sistem Tiket: Menampilkan jadwal tur mendatang dengan tautan pembelian tiket.

🔄 Axios Interceptors: Penanganan token otomatis dan error handling pada frontend.

🛠️ Teknologi yang Digunakan
Backend (API):

Framework: Laravel 11

Database: MySQL

Autentikasi: Laravel Sanctum

Bahasa: PHP 8.3+

Frontend (Client):

Framework: React.js (via Vite)

Styling: Tailwind CSS v3

Routing: React Router DOM v6

HTTP Client: Axios

📂 Struktur Folder
Proyek ini menggunakan struktur Monorepo (satu repository untuk kedua sisi):

text
the-seventh/
├── the-seventh-api/     # Backend Laravel (REST API)
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
├── the-seventh-web/     # Frontend React (Vite)
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── ...
└── .gitignore
🚀 Cara Menjalankan Secara Lokal
📋 Prasyarat
Pastikan Anda sudah menginstal:

PHP (minimal versi 8.2)

Composer

Node.js & npm

MySQL (XAMPP / Laragon / MySQL Server)

1️⃣ Clone Repository
bash
git clone https://github.com/Bagaas-ind/the-seventh.git
cd the-seventh
2️⃣ Setup Backend (Laravel)
bash
# Masuk ke folder backend
cd the-seventh-api

# Install dependensi
composer install

# Copy file environment
cp .env.example .env

# Generate key aplikasi
php artisan key:generate

# (Buka .env dan atur koneksi DB_DATABASE=the_seventh, DB_USERNAME, DB_PASSWORD)

# Buat database baru bernama 'the_seventh' di MySQL/phpMyAdmin, lalu jalankan:
php artisan migrate
php artisan db:seed

# Jalankan server backend
php artisan serve
Backend akan berjalan di http://127.0.0.1:8000

3️⃣ Setup Frontend (React)
Buka terminal baru (biarkan terminal backend tetap berjalan):

bash
# Masuk ke folder frontend
cd the-seventh-web

# Install dependensi
npm install

# Jalankan server frontend
npm run dev
Frontend akan berjalan di http://localhost:5173

🔑 Akun Admin Default
URL: http://localhost:5173/admin

Email: admin@theseventh.com

Password: admin123

🔗 API Endpoints
Berikut adalah daftar endpoint utama yang tersedia di Backend Laravel:

Method	Endpoint	Akses	Deskripsi
POST	/api/login	Publik	Login admin & mendapatkan Token Sanctum
POST	/api/logout	Admin	Menghapus token aktif
GET	/api/news	Publik	Mengambil semua berita (urut terbaru)
GET	/api/news/{slug}	Publik	Mengambil detail berita
GET	/api/tours	Publik	Mengambil jadwal tur mendatang
GET	/api/music	Publik	Mengambil data diskografi/musik
GET	/api/galleries	Publik	Mengambil data galeri foto
POST	/api/news	Admin	Menambah berita baru
PUT	/api/news/{id}	Admin	Memperbarui berita
DELETE	/api/news/{id}	Admin	Menghapus berita
(Catatan: Endpoint POST, PUT, DELETE untuk Tours, Music, dan Galleries memiliki pola yang sama dengan News dan memerlukan Bearer Token).

👤 Author
Bagaas Ind

GitHub: @Bagaas-ind

Kampus: Universitas Insan Pembangunan Indonesia

<div align="center"> <i>"Darkness has a sound. Experience the loudest chapter of our story."</i> <br> <b>Keep Rocking! 🤘</b> </div>
Langkah Terakhir:
Setelah Anda paste kode di atas (yang tidak ada ```markdown-nya),

Scroll ke bawah halaman GitHub.

Klik tombol hijau Commit changes...

Di popup yang muncul, langsung klik Commit changes lagi.

Sekarang, halaman depan repo Anda akan berubah menjadi sangat cantik dengan logo Laravel, React, dan Tailwind berjejer rapi! 🚀

