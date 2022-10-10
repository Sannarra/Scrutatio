<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;

/* |-------------------------------------------------------------------------- | Web Routes |-------------------------------------------------------------------------- | | Here is where you can register web routes for your application. These | routes are loaded by the RouteServiceProvider within a group which | contains the "web" middleware group. Now create something great! | */

Route::get('/', 'App\Http\Controllers\IndexController@index')->name('index');


// profile
Route::get('profile', [ProfileController::class , 'index'])->name('profile')->middleware('auth');
Route::get('edit-profile', [ProfileController::class , 'edit'])->name('edit-profile')->middleware('auth');
Route::post('edit-profile', [ProfileController::class , 'doEdit'])->middleware('auth');


//post
Route::get('create-post', 'App\Http\Controllers\PostController@createPost');
Route::post('create-post', 'App\Http\Controllers\PostController@doCreatePost');
Route::get('edit-post/{post}', 'App\Http\Controllers\PostController@editPost');
Route::post('edit-post/{post}', 'App\Http\Controllers\PostController@doEditPost');
Route::get('manage-posts', 'App\Http\Controllers\PostController@managePosts')->name("manage.posts");

// authentication
Route::get('login', [AuthController::class , 'loginView'])->name('login');
Route::post('login', [AuthController::class , 'login']);
Route::get('register', [AuthController::class , 'registerMemberView'])->name('register');
Route::post('register', [AuthController::class , 'registerMember']);
Route::get('register-company', [AuthController::class , 'registerCompanyView'])->name('register-company');
Route::post('register-company', [AuthController::class , 'registerCompany']);
Route::get('signout', [AuthController::class , 'signOut'])->name('signout');

//admin
Route::get('admin-panel', 'App\Http\Controllers\AdministrationController@index');