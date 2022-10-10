<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show(Request $request, User $user)
    {
        return $user;
    }

    public function store(Request $request)
    {
        $user = User::create($request->all());

        return response()->json($user, 201);
    }

    public function update(Request $request, User $user)
    {

        $user = User::where("account_id", Auth::id())->take(1)->get()[0];
        
        $userData = [];

        $userData["firstname"] = $request->firstname !== null ? $request->firstname : $user->firstname;
        $userData["lastname"] = $request->lastname !== null ? $request->lastname : $user->lastname;
        $userData["phone"] = $request->phone !== null ? $request->phone : $user->phone;
        $userData["city"] = $request->city !== null ? $request->city : $user->city;
        
        $user->update($userData);
        
        $account = Account::where("id", Auth::id())->take(1)->get()[0];

        $accountData = [];
        $accountData["email"] = $request->email !== null ? $request->email : $account->email;
        $accountData["password"] = $request->password !== null ? Hash::make($request->password) : $account->password;
        
        $account->update($accountData);
        
        return response()->json(null, 204);
    }

    public function delete(User $user)
    {
        Account::where("id", $user->account_id)->delete();
        $user->delete();

        return response()->json(null, 204);
    }
}