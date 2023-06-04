<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctors extends Model
{
    protected $primaryKey='doctor_id';
    use HasFactory;

    public function prescription(){
        return $this->belongsTo(Prescription::class);
    }
}
