<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Medicines;
use App\Models\MedicineType;
use App\Models\Doctors;
use App\Models\Prescription;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        //$this->call(ProgramSeeder::class);
        //Program::factory(10)->create();
        MedicineType::Factory(4)->create();
        Doctors::Factory(2)->create();
        Medicines::Factory(10)->create();
        Prescription::Factory(2)->create();
        /*$program = new Program();
        $program->name='LAE';
        $program->description='carrera';
        $program->key='LAE';
        $program->save();*/
    }
}
