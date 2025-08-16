<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Property;

class Rental extends Model
{
    use HasFactory;

    protected $fillable = [
        'orderId',
        'customerName',
        'item',
        'category',
        'startDate',
        'endDate',
        'status',
        'total',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
