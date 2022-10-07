<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
     $user = User::all()->find(1);

     return react_view("profile", [
         "user" => [
             "firstname" => $user->firstname,
             "lastname" => $user->lastname,
             "phone" => $user->phone,
             "city" => $user->city,
             "email" => $user->account->email,
         ]]);
    }


    
}
   
?>