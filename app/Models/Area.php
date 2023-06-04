<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $primaryKey = 'area_id';
    use HasFactory;

    public function warehouses(){
        return $this->belongsTo(Warehouse::class);
    }
    public function products(){
        return $this->hasMany(Products::class);
    }
}
