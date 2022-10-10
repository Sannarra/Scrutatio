<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;

class CompanyProfileController extends Controller
{
    public function index(Request $request)
    {
        $company = Company::all()->take(1)[0];
        // $company = Company::where("account_id", Auth::id())->take(1)->get()[0];

        return react_view("company_profile", [
            "company" => [
                "id" => $company->id,
                "name" => $company->name,
                "creation_date" => $company->creation_date,
                "size" => $company->size,
                "headquarter" => $company->headquarter,
                "website" => $company->website,
                "email" => $company->account->email,
            ]
        ]);
    }

    public function edit(Request $request)
    {
        $company = Company::all()->take(1)[0];
        // $company = Company::where("account_id", Auth::id())->take(1)->get()[0];

        return react_view("edit_company_profile", [
            "company" => [
                "id" => $company->id,
                "name" => $company->name,
                "creation_date" => $company->creation_date,
                "size" => $company->size,
                "headquarter" => $company->headquarter,
                "website" => $company->website,
                "email" => $company->account->email,
            ]
        ]);
    }
}
