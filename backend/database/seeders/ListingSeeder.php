<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Models\ListingImage;
use App\Models\User;
use Illuminate\Database\Seeder;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $users = User::factory(5)->create();
        }

        Listing::factory(20)
            ->recycle($users)
            ->create()
            ->each(function ($listing) {
                ListingImage::factory(rand(3, 5))->create([
                    'listing_id' => $listing->id,
                    'image_path' => 'images/placeholder.jpg',
                ]);
            });
    }
}
