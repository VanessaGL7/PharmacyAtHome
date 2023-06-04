<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $primaryKey = 'warehouse_id';
    use HasFactory;

    public function warehouse_manager(){
        return $this->belongsTo(warehouse_manager::class);
    }
    public function area(){
        return $this->hasMany(Area::class);
    }
    public function products(){
        return $this->hasMany(products::class);
    }
}
