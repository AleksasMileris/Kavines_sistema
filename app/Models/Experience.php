<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'rating',
        'restaurant_id',
        'dish_id',

    ];
    public function dishes(){
        return $this->hasMany(Dish::class);
    }
    public function restaurant(){
        return $this->belongsTo(Restaurant::class,'restaurant_id','id');
    }
}
