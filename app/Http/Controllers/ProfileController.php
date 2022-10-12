<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Account;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Gate;


class ProfileController extends Controller
{
    static public function profileView(Account $account, bool $include_id = true)
    {
        $user = $account->user;
        $company = $account->company;

        if ($company !== null) {
            return react_view("company_profile", [
                "company" => [
                    "id" => $company->id,
                    "name" => $company->name,
                    "creation_date" => $company->creation_date,
                    "size" => $company->size,
                    "headquarter" => $company->headquarter,
                    "website" => $company->website,
                    "description" => $company->description,
                    "email" => $account->email,
                    "account_id" => $include_id ? $account->id : null
                ],
                "isAdmin" => $account->is_admin,
                "canEdit" => Gate::allows('edit-profile', [$account]),
                "isCurrentProfile" => $account->id == Auth::id()
            ]);
        }
        if ($user !== null) {
            return react_view("profile", [
                "user" => [
                    "id" => $user->id,
                    "firstname" => $user->firstname,
                    "lastname" => $user->lastname,
                    "phone" => $user->phone,
                    "city" => $user->city,
                    "email" => $user->account->email,
                    "account_id" => $include_id ? $account->id : null
                ],
                "isAdmin" => $account->is_admin,
                "canEdit" => Gate::allows('edit-profile', [$account]),
                "isCurrentProfile" => $account->id == Auth::id()
            ]);
        }
    }

    public function viewCurrentProfile()
    {
        return ProfileController::profileView(Auth::user(), false);
    }

    public function viewProfile(Account $profile)
    {
        return ProfileController::profileView($profile);
    }

    static public function editProfileView(Account $account)
    {
        $user = $account->user;
        $company = $account->company;

        if ($company !== null) {
            return react_view("edit_company_profile", [
                "company" => [
                    "id" => $company->id,
                    "name" => $company->name,
                    "creation_date" => $company->creation_date,
                    "size" => $company->size,
                    "headquarter" => $company->headquarter,
                    "website" => $company->website,
                    "description" => $company->description,
                    "email" => $account->email,
                    "account_id" => $account->id,
                ],
            ]);
        }

        if ($user !== null) {
            return react_view("edit_profile", [
                "user" => [
                    "id" => $user->id,
                    "firstname" => $user->firstname,
                    "lastname" => $user->lastname,
                    "phone" => $user->phone,
                    "city" => $user->city,
                    "email" => $user->account->email,
                    "account_id" => $account->id
                ],
            ]);
        }
    }

    public function currentProfileEditView()
    {
        return ProfileController::editProfileView(Auth::user());
    }

    public function profileEditView(Account $profile)
    {
        Gate::authorize('edit-profile', [$profile]);
        return ProfileController::editProfileView($profile);
    }

    public function userProfileEditView(User $user)
    {
        return redirect("edit-profile/" . $user->account_id);
    }

    public function companyProfileEditView(Company $company)
    {
        return redirect("edit-profile/" . $company->account_id);
    }

    static public function editProfile(Request $request, Account $account)
    {
        $user = $account->user;
        $company = $account->company;

        $addIfSet = function ($array, $key) use ($request) {
            $val = $request->input($key);
            if ($val != null && $val != "")
                $array[$key] = $val;
            return $array;
        };

        /// If profile is a user profile
        if ($user !== null) {
            $userData = [];
            $userData = $addIfSet($userData, "firstname");
            $userData = $addIfSet($userData, "lastname");
            $userData = $addIfSet($userData, "phone");
            $userData = $addIfSet($userData, "city");

            $user->update($userData);
        }

        /// If profile is a company profile
        if ($company !== null) {
            $companyData = [];
            $companyData = $addIfSet($companyData, "name");
            $companyData = $addIfSet($companyData, "creation_date");
            $companyData = $addIfSet($companyData, "size");
            $companyData = $addIfSet($companyData, "headquarter");
            $companyData = $addIfSet($companyData, "website");
            $companyData = $addIfSet($companyData, "description");

            $company->update($companyData);
        }


        /// If account was modified
        $accountData = [];
        $accountData = $addIfSet($accountData, "email");
        $newPwd = $request->input("password");
        if ($newPwd != null)
            $accountData["password"] = $newPwd;
        $account->update($accountData);
    }

    public function doEditCurrentProfile(Request $request)
    {
        ProfileController::editProfile($request, Auth::user());

        return redirect()->intended('profile');
    }

    public function doEditProfile(Request $request, Account $profile)
    {
        Gate::authorize('edit-profile', [$profile]);
        ProfileController::editProfile($request, $profile);

        if ($profile->id != Auth::id())
            return redirect("/profile/$profile->id");
        return redirect()->intended('profile');
    }
}