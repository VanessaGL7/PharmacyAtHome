<?php

namespace App\Http\Controllers;

use App\Models\Doctors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Rule;
use Validator;

class DoctorsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $doctor=Doctors::all();
        return $doctor;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator= Validator::make($request->all(),[
            'doctor_name'=>'required|min:3',
            'professional_license'=>'required|min:3',
            'institution'=>'required|min:3',
            'doctor_address'=>'required|min:1',
            'phone'=>'required|min:1',
        ]);

        if($validator->fails()){
            return $validator->errors();
        }

        $doctor=new Doctors;
        $doctor->doctor_name= $request->doctor_name;
        $doctor->professional_license= $request->professional_license;
        $doctor->institution= $request->institution;
        $doctor->doctor_address= $request->doctor_address;
        $doctor->phone= $request->phone;
        $doctor->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Doctors  $doctor
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $doctor = Doctors::find($request->id);
        return $doctor;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Doctors  $doctor
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Doctors $doctor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @param  \App\Models\Doctors  $doctor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $doctor = Doctors::find($request->id);
        $doctor->doctor_name= $request->input('doctor_name');
        $doctor->professional_license= $request->input('professional_license');
        $doctor->institution= $request->input('institution');
        $doctor->doctor_address= $request->input('doctor_address');
        $doctor->phone= $request->input('phone');
        $doctor->save();

        return $doctor;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Doctors  $doctor
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Doctors::where("doctor_id", $id)->delete();
         $doctor=Doctors::all();
        return $doctor;
    }
}
