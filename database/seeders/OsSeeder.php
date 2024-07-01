<?php

namespace Database\Seeders;

use App\Models\Os;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Os::create([
            'status' => 'Aberta',
            'priority' => 'Alta',
            'code_om' => 1,
            'code_workshop' => 1,
            'code_request' => 1
        ]);
    }
}
