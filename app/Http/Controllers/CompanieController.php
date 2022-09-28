<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Companie;

class CompanieController extends Controller
{
    public function index()
    {
        return Companie::all();
    }

    public function show(Request $request, Companie $companie)
    {
        return $companie;
    }

    public function store(Request $request)
    {
        $companie = Companie::create($request->all());

        return response()->json($companie, 201);
    }

    public function update(Request $request, Companie $companie)
    {
        $companie->update($request->all());

        return response()->json($companie, 200);
    }

    public function delete(Companie $companie)
    {
        $companie->delete();

        return response()->json(null, 204);
    }
}