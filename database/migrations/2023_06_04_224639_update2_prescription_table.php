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
        Schema::table('prescription', function (Blueprint $table) {
            $table->unsignedBigInteger('medicine_id');
            $table->foreign('medicine_id')
            ->references('medicine_id')->on('medicines')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('prescription', function (Blueprint $table) {
            $table->dropForeign('prescription_medicine_id_foreign');
            $table->dropColumn('medicine_id');
        });
    }
};
