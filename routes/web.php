<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\IndexController;


/* |-------------------------------------------------------------------------- | Web Routes |-------------------------------------------------------------------------- | | Here is where you can register web routes for your application. These | routes are loaded by the RouteServiceProvider within a group which | contains the "web" middleware group. Now create something great! | */

Route::get('/', 'App\Http\Controllers\IndexController@index');
Route::get('home', [IndexController::class , 'index'])->name('home')->middleware('auth');

Route::get('/create-post', 'App\Http\Controllers\PostController@createPost');
Route::get('/edit-post/{post}', 'App\Http\Controllers\PostController@editPost');
Route::get('/manage-posts', 'App\Http\Controllers\PostController@managePosts');

Route::get('login', [AuthController::class , 'index'])->name('login');
Route::post('custom-login', [AuthController::class , 'customLogin'])->name('login.custom');
Route::get('register', [AuthController::class , 'register'])->name('register-user');
Route::post('custom-register', [AuthController::class , 'customRegistration'])->name('register.custom');
Route::post('member-register', [AuthController::class , 'memberRegistration'])->name('register.member');
Route::get('signout', [AuthController::class , 'signOut'])->name('signout');