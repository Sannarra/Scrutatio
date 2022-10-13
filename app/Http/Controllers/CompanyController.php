<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Account;

class CompanyController extends Controller
{
    public function index()
    {
        return Company::all();
    }

    public function show(Request $request, Company $company)
    {
        return $company;
    }

    public function store(Request $request)
    {
        $request->validate([
            'created_at' => 'date',
            'updated_at' => 'date',
            'name' => 'required|max:255',
            'creation_date' => "required|date",
            'size' => "required|numeric|min:0",
            'headquarter' => 'required|max:255',
            'description' => 'required',
            'account_id' => 'required|exists:accounts,id',
            'website' => 'required|url',
        ]);
        $companyData = $request->all();
        unset($companyData["id"]);
        $company = Company::create($companyData);

        return response()->json($company, 201);
    }

    public function update(Request $request, Company $company)
    {
        $request->validate([
            'created_at' => 'date',
            'updated_at' => 'date',
            'name' => 'filled|max:255',
            'creation_date' => "filled|date",
            'size' => "filled|numeric|min:0",
            'headquarter' => 'filled|max:255',
            'description' => 'filled',
            'account_id' => 'filled|exists:accounts,id',
            'website' => 'filled|url',
        ]);
        $company->update($request->all());

        return response()->json($company, 200);
    }

    public function delete(Company $company)
    {
        $company->delete();
        Account::where("id", $company->account_id)->delete();

        return response()->json(null, 204);
    }
}