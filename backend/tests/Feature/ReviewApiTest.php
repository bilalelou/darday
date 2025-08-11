<?php

namespace Tests\Feature;

use App\Models\Listing;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReviewApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_listing_with_reviews_and_average_rating()
    {
        $listing = Listing::factory()->create();
        Review::factory()->count(3)->create(['listing_id' => $listing->id, 'rating' => 4]);
        Review::factory()->count(2)->create(['listing_id' => $listing->id, 'rating' => 5]);

        $response = $this->getJson('/api/listings/' . $listing->id);

        $response->assertStatus(200)
                 ->assertJsonCount(5, 'reviews')
                 ->assertJson([
                     'average_rating' => 4.4
                 ]);
    }

    public function test_can_submit_a_review()
    {
        $user = User::factory()->create();
        $listing = Listing::factory()->create();

        $reviewData = [
            'rating' => 5,
            'comment' => 'This is a great place!',
        ];

        $response = $this->actingAs($user)->postJson('/api/listings/' . $listing->id . '/reviews', $reviewData);

        $response->assertStatus(201)
                 ->assertJsonFragment($reviewData);

        $this->assertDatabaseHas('reviews', [
            'listing_id' => $listing->id,
            'user_id' => $user->id,
            'rating' => 5,
        ]);
    }

    public function test_cannot_submit_a_review_twice_for_the_same_listing()
    {
        $user = User::factory()->create();
        $listing = Listing::factory()->create();

        Review::factory()->create([
            'user_id' => $user->id,
            'listing_id' => $listing->id,
        ]);

        $reviewData = [
            'rating' => 4,
            'comment' => 'Trying to review again.',
        ];

        $response = $this->actingAs($user)->postJson('/api/listings/' . $listing->id . '/reviews', $reviewData);

        $response->assertStatus(422)
                 ->assertJson([
                     'message' => 'You have already reviewed this listing'
                 ]);
    }

    public function test_unauthenticated_user_cannot_submit_a_review()
    {
        $listing = Listing::factory()->create();

        $reviewData = [
            'rating' => 5,
            'comment' => 'This should fail.',
        ];

        $response = $this->postJson('/api/listings/' . $listing->id . '/reviews', $reviewData);

        $response->assertStatus(401);
    }
}
