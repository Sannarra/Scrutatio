<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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

/// Post 
Route::get('posts', 'App\Http\Controllers\PostController@index');
Route::get('posts/{post}', 'App\Http\Controllers\PostController@show');
Route::get('posts/search', 'App\Http\Controllers\PostController@searchRoute');
Route::post('posts', 'App\Http\Controllers\PostController@store');
Route::put('posts/{post}', 'App\Http\Controllers\PostController@update');
Route::delete('posts/{post}', 'App\Http\Controllers\PostController@delete');

/// Account
Route::get('accounts', 'App\Http\Controllers\AccountController@index');
Route::get('accounts/{account}', 'App\Http\Controllers\AccountController@show');
Route::post('accounts', 'App\Http\Controllers\AccountController@store');
Route::put('accounts/{account}', 'App\Http\Controllers\AccountController@update');
Route::delete('accounts/{account}', 'App\Http\Controllers\AccountController@delete');

/// Message
Route::get('messages', 'App\Http\Controllers\MessageController@index');
Route::get('messages/{message}', 'App\Http\Controllers\MessageController@show');
Route::post('messages', 'App\Http\Controllers\MessageController@store');
Route::put('messages/{message}', 'App\Http\Controllers\MessageController@update');
Route::delete('messages/{message}', 'App\Http\Controllers\MessageController@delete');

/// Application
Route::get('applications', 'App\Http\Controllers\ApplicationController@index');
Route::get('applications/{application}', 'App\Http\Controllers\ApplicationController@show');
Route::get('applications/{application}/messages', 'App\Http\Controllers\ApplicationController@messages');
Route::post('applications', 'App\Http\Controllers\ApplicationController@store');
Route::put('applications/{application}', 'App\Http\Controllers\ApplicationController@update');
Route::delete('applications/{application}', 'App\Http\Controllers\ApplicationController@delete');