<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TestingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call(
            [
            OmSeeder::class,
            SectorSeeder::class,
            WorkshopSeeder::class,
            UserSeeder::class
        ]
        );
    }
}
