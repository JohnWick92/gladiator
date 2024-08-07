<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nip' => '00.0000.00',
            'name' => 'a',
            'email' => 'a@gmail.com',
            'password' => Hash::make('a'),
            'branch' => 'a',
            'code_om' => 1,
            'code_sector' => 1,
            'profile_description' => 'Administrador',
            'solver' => false,
            'active' => true,
        ]);
    }
}
