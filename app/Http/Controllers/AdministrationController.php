<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\Company;

class AdministrationController extends Controller
{
    public function index()
    {
        return react_view("admin_panel");
    }

}