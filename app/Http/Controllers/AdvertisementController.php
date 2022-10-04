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
    public function search(Advertisement $sector)
    {
      //search

        return response()->json(null, 204);
    }
}