<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use App\Models\Doctors;
use App\Models\Medicines;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Rule;
use Validator;


class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $prescription=Prescription::all();
        return $prescription;
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
            'frequency'=>'required|min:1',
            'duration'=>'required|min:3',
            'indications'=>'required|min:3',
        ]);

        if($validator->fails()){
            return $validator->errors();
        }

        $prescriptions=Doctors::find($request->doctor_id);
        $prescriptionss=Medicines::find($request->medicine_id);

        if(is_null($prescriptions)){
            return 'Doctor id not found';
        }
        
        if(is_null($prescriptionss)){
            return 'Medicine id not found';
        }

        $prescription=new Prescription;
        $prescription->frequency= $request->frequency;
        $prescription->duration= $request->duration;
        $prescription->indications= $request->indications;
        $prescription->doctor_id= $request->doctor_id;
        $prescription->medicine_id= $request->medicine_id;
        $prescription->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $prescription = Prescription::find($request->id);
        return $prescription;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function edit(Prescription $prescription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $prescription = Prescription::find($request->id);
        $prescription->frequency= $request->input('frequency');
        $prescription->duration= $request->input('duration');
        $prescription->indications= $request->input('indications');
        $prescription->doctor_id= $request->input('doctor_id');
        $prescription->medicine_id= $request->input('medicine_id');
        $prescription->save();

        return $prescription;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Prescription::where("prescription_id", $id)->delete();
        $prescription=Prescription::all();
       return $prescription;
    }
}
