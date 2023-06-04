<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\WarehouseManagerController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\PassportAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->group(function(){
    //MANAGER
    Route::delete('/delete_manager/{id}', [WarehouseManagerController::class,'destroy']);
    Route::post('/create_manager', [WarehouseManagerController::class, 'store']);
    Route::post('/update_manager/{id}', [WarehouseManagerController::class, 'update']);
    //WAREHOUSES
    Route::post('/create_warehouse', [WarehouseController::class, 'store']);
    Route::delete('/delete_warehouse/{id}', [WarehouseController::class,'destroy']);
    Route::post('/update_warehouse/{id}', [WarehouseController::class, 'update']);
    //AREAS
    Route::post('/create_area', [AreaController::class, 'store']);
    Route::delete('/delete_area/{id}', [AreaController::class,'destroy']);
    Route::post('/update_area/{id}', [AreaController::class, 'update']);
    //PRODUCTS
    Route::post('/create_product', [ProductsController::class, 'store']);
    Route::delete('/delete_product/{id}', [ProductsController::class,'destroy']);
    Route::post('/update_product/{id}', [ProductsController::class, 'update']);
});

//AUTH
Route::post('/register', [PassportAuthController::class, 'register']);
Route::post('/login', [PassportAuthController::class, 'login']);
//MANAGERS
Route::get('/getwarehousemanager', [WarehouseManagerController::class, 'index']);
Route::get('/show_manager/{id}', [WarehouseManagerController::class,'show']);
//WAREHOUSES
Route::get('/get_warehouses', [WarehouseController::class, 'index']);
Route::get('/show_warehouse/{id}', [WarehouseController::class,'show']);
//AREAS
Route::get('/get_areas', [AreaController::class, 'index']);
Route::get('/show_area/{id}', [AreaController::class,'show']);
//PRODUCTS
Route::get('/get_products', [ProductsController::class, 'index']);
Route::get('/show_product/{id}', [ProductsController::class,'show']);


/*Route::post('/show_test', [StudentController::class, 'show_test']);
Route::get('/show_student', [StudentController::class, 'show']);*/
