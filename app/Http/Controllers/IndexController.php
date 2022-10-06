<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use App\Models\Company;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function getJobCardsData($order, $searchWords, $minSalary, $maxSalary, $minHours, $maxHours, $location, $pageSize, $currentPage, $query = null)
    {
        $advertisements = AdvertisementController::search($order,
            $searchWords,
            $minSalary,
            $maxSalary,
            $minHours,
            $maxHours,
            $location,
            $query);

        $pageCount = 1 + intdiv(($advertisements->count() - 1), $pageSize);
        $data = ["jobs" => [], "page" => ["count" => $pageCount, "current" => $currentPage]];


        for ($i = 0; $i <= $pageSize && ($i + ($pageSize * ($currentPage - 1)) < $advertisements->count()); $i++)
            array_push($data['jobs'], $advertisements[$i + ($pageSize * ($currentPage - 1))]->toJobCard());
        return $data;
    }

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

    public function createPost(Request $request)
    {
        $company = Company::all()->find(1);

        return react_view("create_post", ["post" => [],
            "company" => [
                "company_name" => $company->name,
                "sectors" => $company->sectors->pluck('sector.name'),
            ]]);
    }

    public function editPost(Request $request, Advertisement $advertisement)
    {
        return react_view("edit_post", [
            "post" => [
                "job_title" => $advertisement->title,
                "city" => $advertisement->city,
                "contract_type" => $advertisement->contract_type,
                "short_brief" => $advertisement->short_brief,
                "description" => $advertisement->description,
                "salary" => $advertisement->salary,
                "working_time" => $advertisement->working_time,
                "publication_date" => $advertisement->publication_date,
                "company_icon" => $advertisement->icon_src,
                "id" => $advertisement->id
            ],
            "company" => [
                "company_name" => $advertisement->company->name,
                "sectors" => $advertisement->company->sectors->pluck('sector.name'),
            ]]);
    }

    public function managePosts(Request $request)
    {
        return react_view("manage_posts", AdvertisementController::getJobCardsData($request->query('order'),
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