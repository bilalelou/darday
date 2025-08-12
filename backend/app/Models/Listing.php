<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'rooms',
        'phone_number',
        'city',
        'address',
        'is_furnished',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ListingImage::class);
    }

    public function wishlist()
    {
        return $this->belongsToMany(User::class, 'user_wishlist');
    }
}
