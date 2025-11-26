<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Seeder do admin
        $this->call([
            AdminUserSeeder::class,
    ]);

        User::factory()->create([
            'name'  => 'Usuário Comum',
            'email' => 'user@email.com',
            'password' => Hash::make('user123'),
            'type'  => 'user',
        ]);
    }
}
