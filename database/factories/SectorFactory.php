<?php

namespace Database\Factories;

use App\Models\Om;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sector>
 */
class SectorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $om = Om::factory()->create();

        return [
            'description' => fake()->text(20),
            'acronym' => fake()->text(20),
            'code_om' => $om->code,
        ];
    }
}
