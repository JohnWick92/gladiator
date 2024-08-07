<?php

namespace Database\Seeders;

use App\Models\ModelRequest;
use Illuminate\Database\Seeder;

class RequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ModelRequest::create([
            'description' => 'teste',
            'accepted' => false,
            'closed' => false,
            'nip' => '00.0000.00',
            'location' => 'teste',
            'canceled' => false,
            'request_date' => now(),
            'priority' => 'Alta',
        ]);
        ModelRequest::create([
            'description' => 'teste',
            'accepted' => true,
            'closed' => true,
            'nip' => '00.0000.00',
            'location' => 'teste',
            'canceled' => false,
            'priority' => 'Alta',
            'request_date' => now(),
            'resolution' => 'seeding',
        ]);
    }
}
