<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Sector;
use App\Http\Controllers\SectorsController;

/* |-------------------------------------------------------------------------- | API Routes |-------------------------------------------------------------------------- | | Here is where you can register API routes for your application. These | routes are loaded by the RouteServiceProvider within a group which | is assigned the "api" middleware group. Enjoy building your API! | */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/// Sector
Route::get('sectors', 'App\Http\Controllers\SectorsController@index');
Route::get('sectors/{sector}', 'App\Http\Controllers\SectorsController@show');
Route::post('sectors', 'App\Http\Controllers\SectorsController@store');
Route::put('sectors/{sector}', 'App\Http\Controllers\SectorsController@update');
Route::delete('sectors/{sector}', 'App\Http\Controllers\SectorsController@delete');

/// User
Route::get('users', 'App\Http\Controllers\UserController@index');
Route::get('users/{user}', 'App\Http\Controllers\UserController@show');
Route::post('users', 'App\Http\Controllers\UserController@store');
Route::put('users/{user}', 'App\Http\Controllers\UserController@update');
Route::delete('users/{user}', 'App\Http\Controllers\UserController@delete');

/// Company
Route::get('companies', 'App\Http\Controllers\CompanyController@index');
Route::get('companies/{company}', 'App\Http\Controllers\CompanyController@show');
Route::post('companies', 'App\Http\Controllers\CompanyController@store');
Route::put('companies/{company}', 'App\Http\Controllers\CompanyController@update');
Route::delete('companies/{company}', 'App\Http\Controllers\CompanyController@delete');