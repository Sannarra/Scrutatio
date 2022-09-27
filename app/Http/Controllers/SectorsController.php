<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sector;

class SectorsController extends Controller
{
    public function index()
    {
        return Sector::all();
    }

    public function show(Request $request, Sector $sector)
    {
        $this->validate($request, [
            'name' => 'required|unique:sectors|max:255'
        ]);
        return $sector;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:sectors|max:255'
        ]);

        $sector = Sector::create($request->all());

        return response()->json($sector, 201);
    }

    public function update(Request $request, Sector $sector)
    {
        $sector->update($request->all());

        return response()->json($sector, 200);
    }

    public function delete(Sector $sector)
    {
        $sector->delete();

        return response()->json(null, 204);
    }
}