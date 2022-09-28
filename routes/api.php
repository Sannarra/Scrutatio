<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Sector;
use App\Http\Controllers\SectorsController;

/* |-------------------------------------------------------------------------- | API Routes |-------------------------------------------------------------------------- | | Here is where you can register API routes for your application. These | routes are loaded by the RouteServiceProvider within a group which | is assigned the "api" middleware group. Enjoy building your API! | */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('sectors', 'App\Http\Controllers\SectorsController@index');


Route::get('sectors/{sector}', 'App\Http\Controllers\SectorsController@show');


Route::post('sectors', 'App\Http\Controllers\SectorsController@store');


Route::put('sectors/{sector}', 'App\Http\Controllers\SectorsController@update');


Route::delete('sectors/{sector}', 'App\Http\Controllers\SectorsController@delete');