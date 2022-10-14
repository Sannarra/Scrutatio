<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;

class AccountController extends Controller
{
    /// Api routes
    public function index()
    {
        return Account::all();
    }

    public function show(Account $account)
    {
        return $account;
    }

    public function store(Request $request)
    {
        $request->validate([
            'created_at' => 'date',
            'updated_at' => 'date',
            'email' => 'required|email|unique:accounts',
            'password' => 'required|min:6',
            'is_admin' => 'required|boolean',
        ]);
        $accountData = $request->all();
        unset($accountData["id"]);
        $account = Account::create($accountData);

        return response()->json($account, 201);
    }

    public function update(Request $request, Account $account)
    {
        $request->validate([
            'created_at' => 'date',
            'updated_at' => 'date',
            'email' => 'filled|email|unique:accounts',
            'password' => 'min:6',
            'is_admin' => 'boolean',
        ]);
        $account->update($request->all());

        return response()->json($account, 200);
    }

    public function delete(Account $account)
    {
        $account->delete();

        return response()->json(null, 204);
    }
}