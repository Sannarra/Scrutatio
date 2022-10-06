<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;

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
}