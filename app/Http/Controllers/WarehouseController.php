<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use App\Models\warehouse_manager;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $warehouse=Warehouse::all();
        return $warehouse;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $warehouse=new Warehouse;
        $warehouse->warehouse_name= $request->warehouse_name;
        $warehouse->warehouse_description= $request->warehouse_description;
        $warehouse->warehouse_adress= $request->warehouse_adress;
        $warehouse->id_manager= $request->id_manager;
        $warehouse->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Warehouse  $warehouse
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $warehouse = Warehouse::find($request->id);
        return $warehouse;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Warehouse  $warehouse
     * @return \Illuminate\Http\Response
     */
    public function edit(Warehouse $warehouse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Warehouse  $warehouse
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $warehouse = Warehouse::find($request->id);
        $warehouse->warehouse_name= $request->input('warehouse_name');
        $warehouse->warehouse_description= $request->input('warehouse_description');
        $warehouse->warehouse_adress= $request->input('warehouse_adress');
        $warehouse->id_manager= $request->input('id_manager');
        $warehouse->save();

        return $warehouse;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Warehouse  $warehouse
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Warehouse::where("warehouse_id", $id)->delete();
        $warehouse=Warehouse::all();
       return $warehouse;
    }
}
