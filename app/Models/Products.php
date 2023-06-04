<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $primaryKey = 'product_id';
    use HasFactory;
    
    public function warehouse(){
        return $this->belongsTo(Warehouse::class);
    }
    public function area(){
        return $this->belongsTo(Area::class);
    }
}
