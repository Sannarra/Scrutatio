<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;

/* |-------------------------------------------------------------------------- | Web Routes |-------------------------------------------------------------------------- | | Here is where you can register web routes for your application. These | routes are loaded by the RouteServiceProvider within a group which | contains the "web" middleware group. Now create something great! | */

Route::get('/','App\Http\Controllers\IndexController@index')->name('index');
Route::get('home', [IndexController::class , 'index'])->name('home')->middleware('auth');


//user
Route::get('profile', [ProfileController::class , 'index'])->name('profile')->middleware('auth');
Route::get('edit-profile', [ProfileController::class , 'edit'])->name('edit-profile')->middleware('auth');
Route::post('edit-member', [UserController::class , 'update'])->name('edit-member')->middleware('auth');

//company
Route::get('company-profile', [CompanyProfileController::class , 'index'])->name('company-profile');
Route::get('edit-company', [CompanyProfileController::class , 'edit'])->name('edit-company');
Route::post('edit-company', [CompanyController::class , 'update'])->name('edit-compamy');

//post
Route::get('create-post', 'App\Http\Controllers\PostController@createPost');
Route::post('create-post', 'App\Http\Controllers\PostController@doCreatePost');
Route::get('edit-post/{post}', 'App\Http\Controllers\PostController@editPost');
Route::post('edit-post/{post}', 'App\Http\Controllers\PostController@doEditPost');
Route::get('manage-posts', 'App\Http\Controllers\PostController@managePosts')->name("manage.posts");

//connexion
Route::get('login', [AuthController::class , 'index'])->name('login');
Route::post('custom-login', [AuthController::class , 'customLogin'])->name('login.custom');
Route::get('register', [AuthController::class , 'register'])->name('register-user');
Route::get('register-company', [AuthController::class , 'registerCompany'])->name('register-company');
Route::post('custom-register', [AuthController::class , 'customRegistration'])->name('register.custom');
Route::post('member-register', [AuthController::class , 'memberRegistration'])->name('register.member');
Route::post('company-register', [AuthController::class , 'companyRegistration'])->name('register.company');
Route::get('signout', [AuthController::class , 'signOut'])->name('signout');

//admin
Route::get('admin-panel', 'App\Http\Controllers\AdministrationController@index');

//messsage
Route::get('message', [MessageController::class , 'chat'])->name('message');
