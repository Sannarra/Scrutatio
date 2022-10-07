<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use App\Models\Company;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        return react_view("home", AdvertisementController::getJobCardsData($request->query('order'),
            $request->query('searchWords'),
            $request->query('minSalary'),
            $request->query('maxSalary'),
            $request->query('minHours'),
            $request->query('maxHours'),
            $request->query('location'),
            intval($request->query('pageSize', 10)),
            intval($request->query('page', 1))));
    }
}
?>