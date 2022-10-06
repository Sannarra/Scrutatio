<?php

use Illuminate\Support\Facades\Route;

/* |-------------------------------------------------------------------------- | Web Routes |-------------------------------------------------------------------------- | | Here is where you can register web routes for your application. These | routes are loaded by the RouteServiceProvider within a group which | contains the "web" middleware group. Now create something great! | */

Route::get('/', 'App\Http\Controllers\IndexController@index');

Route::get('/create-post', 'App\Http\Controllers\IndexController@createPost');
Route::get('/edit-post/{advertisement}', 'App\Http\Controllers\IndexController@editPost');
Route::get('/manage-posts', 'App\Http\Controllers\IndexController@managePosts');