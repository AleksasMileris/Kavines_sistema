<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Builder;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'city',
        'adress',
        'workingHours'
    ];
    public function dishes(){
        return $this->hasMany(Dish::class);
    }

    public function experiences(){
        return $this->hasMany(Experience::class,'id','restaurant_id');
    }

        public function scopeFilter(Builder $query,$filter){
            if ($filter->name !=null){
            $query->where('name','like',"%$filter->name%");
            }
        }

    public function scopeOrder(Builder $query,$order){
        if ($order->field !=null){
            if ($order->dir !=null){
                $query->orderBy($order->field,$order->dir);
            }else{
                $order->orderBy($order->field);
            }

        }
    }
}
