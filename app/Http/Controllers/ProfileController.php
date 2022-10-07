<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use App\Models\Company;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        
        return react_view("profile");
    }

}        /// To Change
// $company = Company::all()->find(1);

// return react_view("create_post", ["post" => [],
//     "company" => [
//         "company_name" => $company->name,
//         "sectors" => $company->sectors->pluck('sector.name'),
//     ]]);
?>