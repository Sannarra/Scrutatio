<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /// Api
    public function index()
    {
        return User::all();
    }

    public function show(User $user)
    {
        return $user;
    }

    public function store(Request $request)
    {
        $request->validate([
            'firstname' => 'required|max:255',
            'lastname' => "required|max:255",
            'phone' => 'required|max:255',
            'city' => 'required|max:255',
            'account_id' => 'required|exists:accounts,id',
            'created_at' => 'date',
            'updated_at' => 'date',
        ]);
        $userData = $request->all();
        unset($userData["id"]);
        $user = User::create($userData);

        return response()->json($user, 201);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'firstname' => 'filled|max:255',
            'lastname' => "filled|max:255",
            'phone' => 'filled|max:255',
            'city' => 'filled|max:255',
            'account_id' => 'exists:accounts,id',
            'created_at' => 'date',
            'updated_at' => 'date',
        ]);
        $user->update($request->all());

        return response()->json($user, 200);
    }

    public function delete(User $user)
    {
        $user->delete();
        Account::where("id", $user->account_id)->delete();

        return response()->json(null, 204);
    }
}