<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $city = $this->faker->randomElement(['الدار البيضاء', 'مراكش', 'الرباط', 'فاس', 'طنجة']);
        return [
            'title' => $this->faker->randomElement(['شقة فاخرة بإطلالة على البحر', 'فيلا حديثة مع مسبح خاص', 'استوديو عصري في قلب المدينة', 'شقة هادئة بالقرب من المركز']),
            'address' => $this->faker->streetAddress() . ', ' . $this->faker->randomElement(['الدار البيضاء', 'مراكش', 'الرباط', 'فاس']),
            'city' => $city,
            'type' => $this->faker->randomElement(['شقة', 'فيلا', 'استوديو']),
            'status' => $this->faker->randomElement(['متاح', 'مؤجر', 'صيانة']),
            'pricePerNight' => $this->faker->numberBetween(500, 3000),
            'imageUrl' => 'https://placehold.co/100x60/E2E8F0/4A5568?text=Property',
            'bedrooms' => $this->faker->numberBetween(1, 5),
            'bathrooms' => $this->faker->numberBetween(1, 3),
            'area' => $this->faker->numberBetween(50, 300),
        ];
    }
}
