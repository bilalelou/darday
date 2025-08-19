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
        'city_id',
        'description',
        'property_type_id',
        'status',
        'pricePerNight',
    'imageUrl',
    'phone_number',
        'bedrooms',
        'bathrooms',
        'area',
    ];
    public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function propertyType()
    {
        return $this->belongsTo(PropertyType::class);
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'amenity_property');
    }

    /**
     * Get the favorites for this property.
     */
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
