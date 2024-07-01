<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            OmSeeder::class,
            SectorSeeder::class,
            WorkshopSeeder::class,
            UserSeeder::class,
            RequestSeeder::class,
            OsSeeder::class
        ]);
    }
}
