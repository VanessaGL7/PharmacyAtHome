<?php

namespace App\Http\Controllers;

use App\Models\warehouse_manager;
use Illuminate\Http\Request;

class WarehouseManagerController extends Controller
{
    public function index()
    {
        $warehouse_manager=warehouse_manager::all();
        return $warehouse_manager;
    }
    public function create()
    {
     }
    public function store(Request $request)
    {
        $warehouse_manager=new warehouse_manager;
        $warehouse_manager->manager_name= $request->manager_name;
        $warehouse_manager->manager_phone= $request->manager_phone;
        $warehouse_manager->manager_mail= $request->manager_mail;
        $warehouse_manager->manager_address= $request->manager_address;
        $warehouse_manager->save();
    }
    public function show(Request $request)
    {
        $warehouse_manager = warehouse_manager::find($request->id);
        return $warehouse_manager;
    }

    public function edit(warehouse_manager $warehouse_manager)
    {
    }
    public function update(Request $request, $id)
    {
        $warehouse_manager = warehouse_manager::find($request->id);
        $warehouse_manager->manager_name= $request->input('manager_name');
        $warehouse_manager->manager_phone= $request->input('manager_phone');
        $warehouse_manager->manager_mail= $request->input('manager_mail');
        $warehouse_manager->manager_address= $request->input('manager_address');
        $warehouse_manager->save();

        return $warehouse_manager;
    }
    public function destroy($id)
    {
        warehouse_manager::where("id", $id)->delete();
         $warehouse_manager=warehouse_manager::all();
        return $warehouse_manager;
    }
}
