<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->string('product_key');
            $table->string('product_description');
            $table->integer('product_price');
            $table->integer('product_stock');
            $table->string('product_location');
            $table->string('product_image');
            $table->foreignId('id_warehouse')->references('warehouse_id')->on('warehouses')->onDelete('cascade');
            $table->foreignId('id_area')->references('area_id')->on('areas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
