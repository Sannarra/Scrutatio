<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use App\Models\Search;

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

    public function delete(Advertisement $sector)
    {
        $sector->delete();

        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $name = $request->query('name');
        $minSalary = $request->query('minSalary');
        $maxSalary = $request->query('maxSalary');
        $minHours = $request->query('minHours');
        $maxHours = $request->query('maxHours');
        $location = $request->query('location');
        
        $result = Advertisement::where('title', 'like', "%$name%")
                                ->where('salary', '>', $minSalary)
                                ->where('salary', '<', $maxSalary)
                                ->where('working_time', '>', $minHours)
                                ->where('working_time', '<', $maxHours)
                                ->where('city', 'like', "%$location%")
                                ->get();

        return response()->json($result, 200);
    }
}
