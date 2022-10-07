<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use App\Models\Company;

class AdvertisementController extends Controller
{
    public function index()
    {
        return Advertisement::all();
    }

    public function show(Request $request, Advertisement $advertisements)
    {
        return $advertisements;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:sectors|max:255'
        ]);

        $advertisements = Advertisement::create($request->all());

        return response()->json($advertisements, 201);
    }

    public function update(Request $request, Advertisement $advertisements)
    {
        $advertisements->update($request->all());

        return response()->json($advertisements, 200);
    }

    public function delete(Advertisement $advertisement)
    {
        $advertisement->delete();

        return response()->json(null, 204);
    }

    static public function search($order, $searchWords, $minSalary, $maxSalary, $minHours, $maxHours, $location, $query = null)
    {
        if ($query == null)
            $query = (new Advertisement)->newQuery();
        $result = $query;


        if ($searchWords != null)
            $result = $result->where('title', 'like', "%$searchWords%")->orWhere('description', 'like', "%$searchWords%")->orWhere('short_brief', 'like', "%$searchWords%");
        if ($minSalary != null)
            $result = $result->where('salary', '>', $minSalary);
        if ($maxSalary != null)
            $result = $result->where('salary', '<', $maxSalary);
        if ($minHours != null)
            $result = $result->where('working_time', '>', $minHours);
        if ($maxHours != null)
            $result = $result->where('working_time', '<', $maxHours);
        if ($location != null)
            $result = $result->where('city', 'like', "%$location%");
        if ($order != null)
            $result = $result->orderBy("created_at", $order);

        $result = $result->get();
        return $result;
    }

    static public function getJobCardsData($order, $searchWords, $minSalary, $maxSalary, $minHours, $maxHours, $location, $pageSize, $currentPage, $query = null)
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

    public function searchRoute(Request $request)
    {
        return response()->json(AdvertisementController::search(
            $request->query('order'),
            $request->query('searchWords'),
            $request->query('minSalary'),
            $request->query('maxSalary'),
            $request->query('minHours'),
            $request->query('maxHours'),
            $request->query('location')), 200);
    }

    public function createPost(Request $request)
    {
        /// To Change
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