<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Company;
use App\Models\Account;


class ProfileController extends Controller
{
    public static function getAuthentifiedProfile(int $account_id)
    {
        $res = ["user" => null, "company" => null];


        $query = User::where("account_id", $account_id);
        if ($query->count() != 0)
            $res["user"] = $query->get()[0];

        $query = Company::where("account_id", $account_id);
        if ($query->count() != 0)
            $res["company"] = $query->get()[0];
        return $res;
    }

    public function index()
    {
        $profile = ProfileController::getAuthentifiedProfile(Auth::id());

        if ($profile["company"] != null) {
            $company = $profile["company"];

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
        if ($profile["user"] != null) {
            $user = $profile["user"];

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
    }

    public function edit()
    {
        $profile = ProfileController::getAuthentifiedProfile(Auth::id());

        if ($profile["company"] != null) {
            $company = $profile["company"];

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

        if ($profile["user"] != null) {
            $user = $profile["user"];

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

    public function doEdit(Request $request)
    {
        $profile = ProfileController::getAuthentifiedProfile(Auth::id());
        $user = $profile["user"];
        $company = $profile["company"];

        /// If profile is a user profile
        if ($user !== null) {
            $userData = [];
            $userData["firstname"] = $request->input('firstname', $user->firstname);
            $userData["lastname"] = $request->input('lastname', $user->lastname);
            $userData["phone"] = $request->input('phone', $user->phone);
            $userData["city"] = $request->input('city', $user->city);

            $user->update($userData);
        }

        /// If profile is a company profile
        if ($company !== null) {
            $companyData = [];
            $companyData["name"] = $request->input('name', $company->name);
            $companyData["creation_date"] = $request->input('creation_date', $company->creation_date);
            $companyData["size"] = $request->input('size', $company->size);
            $companyData["headquarter"] = $request->input('headquarter', $company->headquarter);
            $companyData["website"] = $request->input('website', $company->website);

            $company->update($companyData);
        }


        /// If account was modified
        $account = Account::where("id", Auth::id())->get()[0];
        $accountData = [];
        $accountData["email"] = $request->input('email', $account->email);
        $accountData["password"] = $request->password !== null ?Hash::make($request->password) : $account->password;

        $account->update($accountData);

        return redirect()->intended('profile');
    }
}