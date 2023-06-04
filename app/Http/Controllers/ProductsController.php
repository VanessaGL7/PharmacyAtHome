<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products_controller=Products::all();
        return $products_controller;
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
        $product=new Products;
        $product->product_key= $request->product_key;
        $product->product_description= $request->product_description;
        $product->product_price= $request->product_price;
        $product->product_stock= $request->product_stock;
        $product->product_location= $request->product_location;
        $product->product_image= $request->product_image;
        $product->id_warehouse= $request->id_warehouse;
        $product->id_area= $request->id_area;
        $product->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $product = Products::find($request->id);
        return $product;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function edit(Products $products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $products = Products::find($request->id);
        $products->product_key= $request->input('product_key');
        $products->product_description= $request->input('product_description');
        $products->product_price= $request->input('product_price');
        $products->product_stock= $request->input('product_stock');
        $products->product_location= $request->input('product_location');
        $products->product_image= $request->input('product_image');
        $products->id_warehouse= $request->input('id_warehouse');
        $products->id_area= $request->input('id_area');
        $products->save();

        return $products;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Products::where("product_id", $id)->delete();
        $products=Products::all();
       return $products;
    }
}
