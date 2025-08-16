<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rental>
 */
class RentalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // قائمة بأسماء عقارات واقعية
        $items = [
            'شقة بغرفتي نوم في وسط المدينة',
            'فيلا فاخرة مع مسبح خاص',
            'استوديو عصري بإطلالة على البحر',
            'شقة عائلية بالقرب من المرافق',
            'رياض تقليدي في المدينة القديمة',
            'منزل هادئ في ضواحي المدينة',
        ];

        // قائمة بالمدن المغربية
        $categories = [
            'الدار البيضاء',
            'الرباط',
            'مراكش',
            'فاس',
            'طنجة',
            'أكادير',
        ];

        return [
            'user_id' => \App\Models\User::factory(),
            'property_id' => \App\Models\Property::factory(),
            'orderId' => 'R' . $this->faker->unique()->numberBetween(100, 999),
            'customerName' => $this->faker->name(),
            'item' => $this->faker->randomElement($items),
            'category' => $this->faker->randomElement($categories),
            'startDate' => $this->faker->dateTimeBetween('-1 month', '+1 week')->format('Y-m-d'),
            'endDate' => $this->faker->dateTimeBetween('+2 days', '+2 months')->format('Y-m-d'),
            'status' => $this->faker->randomElement(['نشط', 'مكتمل', 'قيد الانتظار', 'متأخر']),
            'total' => $this->faker->randomFloat(2, 500, 4500), // أسعار أكثر واقعية للكراء
        ];
    }
}
