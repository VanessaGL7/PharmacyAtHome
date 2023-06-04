<?php

namespace App\Http\Controllers;

use App\Models\MedicineType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Rule;
use Validator;

class MedicineTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $type=MedicineType::all();
        return $type;
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
            'type_name'=>'required|min:3',
        ]);

        if($validator->fails()){
            return $validator->errors();
        }

        $type=new MedicineType;
        $type->type_name= $request->type_name;
        $type->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MedicineType  $type
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $type = MedicineType::find($request->id);
        return $type;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MedicineType  $type
     * @return \Illuminate\Http\Response
     */
    public function edit(MedicineType $type)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MedicineType  $type
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $type=MedicineType::find($request->id);
        $type->type_name=$request->input('type_name');
        $type->save();
        return $type;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MedicineType  $type
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        MedicineType::where("type_id", $id)->delete();
        $type=MedicineType::all();
        return $type;
    }
}
