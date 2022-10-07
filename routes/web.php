<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\ProfileController;


/* |-------------------------------------------------------------------------- | Web Routes |-------------------------------------------------------------------------- | | Here is where you can register web routes for your application. These | routes are loaded by the RouteServiceProvider within a group which | contains the "web" middleware group. Now create something great! | */

Route::get('/', 'App\Http\Controllers\IndexController@index');
Route::get('home', [IndexController::class , 'index'])->name('home')->middleware('auth');
Route::get('profile', [ProfileController::class , 'index'])->name('profile')->middleware('auth');
Route::get('create-post', 'App\Http\Controllers\PostController@createPost');
Route::post('create-post', 'App\Http\Controllers\PostController@doCreatePost');
Route::get('edit-post/{post}', 'App\Http\Controllers\PostController@editPost');
Route::post('edit-post/{post}', 'App\Http\Controllers\PostController@doEditPost');
Route::get('manage-posts', 'App\Http\Controllers\PostController@managePosts')->name("manage.posts");


Route::get('login', [AuthController::class , 'index'])->name('login');
Route::post('custom-login', [AuthController::class , 'customLogin'])->name('login.custom');
Route::get('register', [AuthController::class , 'register'])->name('register-user');
Route::get('register-company', [AuthController::class , 'registerCompany'])->name('register-company');
Route::post('custom-register', [AuthController::class , 'customRegistration'])->name('register.custom');
Route::post('member-register', [AuthController::class , 'memberRegistration'])->name('register.member');
Route::post('company-register', [AuthController::class , 'companyRegistration'])->name('register.company');
Route::get('signout', [AuthController::class , 'signOut'])->name('signout');

