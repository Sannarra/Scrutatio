<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = User::where("account_id", Auth::id())->take(1)->get()[0];

        return react_view("profile", [
            "user" => [
                "id" => $user->id,
                "firstname" => $user->firstname,
                "lastname" => $user->lastname,
                "phone" => $user->phone,
                "city" => $user->city,
                "email" => $user->account->email,
            ]
        ]);
    }

    public function edit(Request $request)
    {
        $user = User::where("account_id", Auth::id())->take(1)->get()[0];

        return react_view("edit_profile", [
            "user" => [
                "id" => $user->id,
                "firstname" => $user->firstname,
                "lastname" => $user->lastname,
                "phone" => $user->phone,
                "city" => $user->city,
                "email" => $user->account->email,
            ]
        ]);
    }
}
