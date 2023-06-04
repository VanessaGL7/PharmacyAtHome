<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineType extends Model
{
    protected $primaryKey = 'type_id';
    use HasFactory;

    public function prescription(){
        return $this->hasMany(Prescription::class);
    }
    public function medicines(){
        return $this->belongsTo(Medicines::class);
    }
}
