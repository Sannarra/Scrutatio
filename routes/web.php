<?php

use App\Http\Controllers\ApplicationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;

/* |-------------------------------------------------------------------------- | Web Routes |-------------------------------------------------------------------------- | | Here is where you can register web routes for your application. These | routes are loaded by the RouteServiceProvider within a group which | contains the "web" middleware group. Now create something great! | */

Route::get('/', 'App\Http\Controllers\IndexController@index');

// authentication
Route::get('login', [AuthController::class , 'loginView'])->name('login');
Route::post('login', [AuthController::class , 'login']);
Route::get('register', [AuthController::class , 'registerMemberView'])->name('register');
Route::post('register', [AuthController::class , 'registerMember']);
Route::get('signout', [AuthController::class , 'signOut']);


/// Authentified routes
Route::middleware("auth")->group(function () {
    // profile
    Route::get('profile', [ProfileController::class , 'viewCurrentProfile'])->name('profile');
    Route::get('profile/{profile}', [ProfileController::class , 'viewProfile']);
    Route::get('edit-profile', [ProfileController::class , 'currentProfileEditView'])->name('edit-profile');
    Route::get('edit-profile/{profile}', [ProfileController::class , 'profileEditView']);
    Route::get('edit-user/{user}', [ProfileController::class , 'userProfileEditView']);
    Route::get('edit-company/{company}', [ProfileController::class , 'companyProfileEditView']);
    Route::post('edit-profile', [ProfileController::class , 'doEditCurrentProfile']);
    Route::post('edit-profile/{profile}', [ProfileController::class , 'doEditProfile']);


    // Posts management
    Route::middleware('can:isCompany')->group(function () {
            Route::get('create-post', 'App\Http\Controllers\PostController@createPost');
            Route::post('create-post', 'App\Http\Controllers\PostController@doCreatePost');
            Route::get('edit-post/{post}', 'App\Http\Controllers\PostController@editPost');
            Route::post('edit-post/{post}', 'App\Http\Controllers\PostController@doEditPost');
            Route::get('manage-posts', 'App\Http\Controllers\PostController@managePosts');
        }
        );

        // Creating company
        Route::middleware("can:isMember")->group(function () {
            Route::get('register-company', [AuthController::class , 'registerCompanyView']);
            Route::post('register-company', [AuthController::class , 'registerCompany']);
        }
        );

        //admin
        Route::middleware('can:admin')->get('admin-panel', 'App\Http\Controllers\AdministrationController@index');

        //messsage
        Route::get('chat', [ApplicationController::class , 'chat']);
        Route::post('applications/{application}/send-message', 'App\Http\Controllers\ApplicationController@sendMessage');
    });