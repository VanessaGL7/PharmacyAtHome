<?php

namespace App\Http\Controllers;

use App\Models\Medicines;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Rule;
use Validator;

class MedicinesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $medicine=Medicines::all();
        return $medicine;
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
            'tradename'=>'required|min:3',
            'active_ingredient'=>'required|min:3',
            'presentation'=>'required|min:3',
            'dose'=>'required|min:1',
            'original_amount'=>'required|min:1',
            'current_amount'=>'required|min:1',
            'route_of_administration'=>'required|min:3',
            'expiration'=>'required|min:1',
        ]);

        if($validator->fails()){
            return $validator->errors();
        }

        $medicines=MedicineType::find($request->type_id);

        if(is_null($medicines)){
            return 'Type id not found';
        }

        $medicine = new Medicine;
        $medicine->tradename = $request->tradename;
        $medicine->active_ingredient = $request->active_ingredient;
        $medicine->presentation = $request->presentation;
        $medicine->dose = $request->dose;
        $medicine->original_amount = $request->original_amount;
        $medicine->current_amount = $request->current_amount;
        $medicine->route_of_administration = $request->route_of_administration;
        $medicine->expiration = $request->expiration;
        $medicine->type_id = $request->type_id;
        $medicine->save();
   }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Medicines  $medicine
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $medicine = Medicines::find($request->id);
        return $medicine;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Medicines  $medicine
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Medicines $medicine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @param  \App\Models\Medicines  $medicine
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $medicine=Medicine::where('id',$request->id)->first();
        $medicine->tradename=$request->tradename;
        $medicine->save();

        $medicine = Medicine::find($request->id);
        $medicine->tradename= $request->input('tradename');
        $medicine->active_ingredient= $request->input('active_ingredient');
        $medicine->presentation= $request->input('presentation');
        $medicine->dose= $request->input('dose');
        $medicine->original_amount= $request->input('original_amount');
        $medicine->current_amount= $request->input('current_amount');
        $medicine->route_of_administration= $request->input('route_of_administration');
        $medicine->expiration= $request->input('expiration');
        $medicine->type_id= $request->input('type_id');
        $medicine->save();
        return $medicine;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Medicines  $medicine
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Medicines::where("medicine_id", $id)->delete();
        $medicine=Medicines::all();
        return $medicine;
    }
}
