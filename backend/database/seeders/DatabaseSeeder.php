<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Membuat akun admin default
        User::updateOrCreate(
            ['email' => 'admin@theseventh.com'],
            [
                'name'     => 'Admin The Seventh',
                'password' => Hash::make('admin123'),
            ]
        );
    }
}