<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicines extends Model
{
    protected $primaryKey='medicine_id';
    use HasFactory;

    public function prescription(){
        return $this->belongsTo(Prescription::class);
    }

    public function medicinetype(){
        return $this->belongsTo(MedicineType::class);
    }
}
