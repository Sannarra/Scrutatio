<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Search;

class SearchController extends Controller
{
    public function index()
    {
        return Search::all();
    }

    public function show(Request $request, Search $searched)
    {
        return $searched;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:sectors|max:255'
        ]);

        $searched = Search::create($request->all());

        return response()->json($searched, 201);
    }

    public function update(Request $request, Search $searched)
    {
        $searched->update($request->all());

        return response()->json($searched, 200);
    }

    public function delete(Search $sector)
    {
        $sector->delete();

        return response()->json(null, 204);
    }
}