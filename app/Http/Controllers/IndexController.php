<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        return react_view("home", PostController::getJobCardsData(
            $request->query('sortField'),
            $request->query('sortOrder'),
            $request->query('searchWords'),
            $request->query('minSalary'),
            $request->query('maxSalary'),
            $request->query('minHours'),
            $request->query('maxHours'),
            $request->query('location'),
            explode(",", $request->query('contractTypes')),
            $request->query("includeNull"),
            intval($request->query('pageSize', 10)),
            intval($request->query('page', 1))));
    }
}
?>