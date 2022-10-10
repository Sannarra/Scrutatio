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
        $company = Company::create($request->all());

        return response()->json($company, 201);
    }

    public function update(Request $request, Company $company)
    {
        $company = Company::all()->find(1);
        // $company = Company::where("account_id", Auth::id())->take(1)->get()[0];

        $companyData = [];
        //FIX ME
        $companyData["name"] = $request->name !== null ? $request->name : $company->name;
        $companyData["creation_date"] = $request->creation_date !== null ? $request->creation_date : $company->creation_date;
        $companyData["size"] = $request->size !== null ? $request->size : $company->size;
        $companyData["headquarter"] = $request->headquarter !== null ? $request->headquarter : $company->headquarter;
        $companyData["website"] = $request->website !== null ? $request->website : $company->website;

        $company->update($companyData);

        $account = Account::where("id", Auth::id())->take(1)->get()[0];

        $accountData = [];
        $accountData["email"] = $request->email !== null ? $request->email : $account->email;
        $accountData["password"] = $request->password !== null ? Hash::make($request->password) : $account->password;

        $account->update($accountData);

        return redirect("company-profile")->withSuccess("Successfully edited your company profile");
    }

    public function delete(Company $company)
    {
        Account::where("id", $company->account_id)->delete();
        $company->delete();

        return redirect("index")->withSuccess("Successfully edited your company profile");
    }
}
