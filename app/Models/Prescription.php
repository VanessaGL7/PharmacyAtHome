<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    protected $primaryKey='id';
    use HasFactory;

    public function doctors(){
        return $this->belongsTo(Doctors::class);
    }

    public function medicines(){
        return $this->hasMany(Medicines::class);
    }

    public function medicinetype(){
        return $this->hasMany(MedicineType::class);
    }
}
