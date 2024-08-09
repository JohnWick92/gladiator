<?php

namespace Database\Factories;

use App\Models\Sector;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sector = Sector::factory()->create();

        return [
            'nip' => '00.0000.00',
            'name' => 'root',
            'email' => 'root',
            'password' => Hash::make('root'),
            'branch' => 'root',
            'profile_description' => 'Administrador',
            'solver' => false,
            'active' => true,
            'code_sector' => $sector->code,
            'code_om' => $sector->code_om,
        ];
    }
}
