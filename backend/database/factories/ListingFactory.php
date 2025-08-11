<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 500, 5000),
            'rooms' => $this->faker->numberBetween(1, 10),
            'phone_number' => $this->faker->phoneNumber(),
            'city' => $this->faker->city(),
            'address' => $this->faker->streetAddress(),
            'is_furnished' => $this->faker->boolean(),
        ];
    }
}
