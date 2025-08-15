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
    ];
    public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }

}
