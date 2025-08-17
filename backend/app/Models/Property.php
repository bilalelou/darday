<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'address',
        'city',
        'description',
        'amenities',
        'type',
        'status',
        'pricePerNight',
        'imageUrl',
        'bedrooms',
        'bathrooms',
        'area',
    ];
    public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }

    /**
     * Get the favorites for this property.
     */
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
