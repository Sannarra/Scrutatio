<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Search;
use App\Http\Controllers\SearchController;

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

/// Companie
Route::get('companies', 'App\Http\Controllers\CompanieController@index');
Route::get('companies/{companie}', 'App\Http\Controllers\CompanieController@show');
Route::post('companies', 'App\Http\Controllers\CompanieController@store');
Route::put('companies/{companie}', 'App\Http\Controllers\CompanieController@update');
Route::delete('companies/{companie}', 'App\Http\Controllers\CompanieController@delete');

// Search 
Route::get('advertisment', 'App\Http\Controllers\SearchController@index');
Route::get('advertisment/{id}', 'App\Http\Controllers\SearchController@show');
Route::post('advertisment', 'App\Http\Controllers\SearchController@store');
Route::put('advertisment/{id}', 'App\Http\Controllers\SearchController@update');
Route::delete('advertisment/{id}', 'App\Http\Controllers\SearchController@delete');
Route::get('advertisment/search/{id}', 'App\Http\Controllers\SearchController@show');