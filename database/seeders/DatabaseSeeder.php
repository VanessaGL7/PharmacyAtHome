<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Program;
use App\Models\Student;


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
        Student::factory(10)->create();
        /*$program = new Program();
        $program->name='LAE';
        $program->description='carrera';
        $program->key='LAE';
        $program->save();*/
    }
}
