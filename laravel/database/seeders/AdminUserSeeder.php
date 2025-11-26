<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminExists = User::where('email', 'admin@email.com')->exists();
        if ($adminExists) {
            User::create([
                'name' => 'Administrador',
                'email' => 'admin@email.com',
                'password'=> Hash::make('Admin123'),
                'type' => 'admin',
            ]);
    }
}
}
