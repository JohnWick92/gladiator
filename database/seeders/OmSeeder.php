<?php

namespace Database\Seeders;

use App\Models\Om;
use Illuminate\Database\Seeder;

class OmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Om::factory(5)->create();
    }
}
