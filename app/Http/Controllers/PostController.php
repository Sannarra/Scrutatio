<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::all();
    }

    public function show(Request $request, Post $posts)
    {
        return $posts;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:sectors|max:255'
        ]);

        $posts = Post::create($request->all());

        return response()->json($posts, 201);
    }

    public function update(Request $request, Post $posts)
    {
        $posts->update($request->all());

        return response()->json($posts, 200);
    }

    public function delete(Post $post)
    {
        $post->delete();

        return response()->json(null, 204);
    }

    static public function search($order, $searchWords, $minSalary, $maxSalary, $minHours, $maxHours, $location, $query = null)
    {
        if ($query == null)
            $query = (new Post)->newQuery();
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
        $posts = PostController::search($order,
            $searchWords,
            $minSalary,
            $maxSalary,
            $minHours,
            $maxHours,
            $location,
            $query);

        $pageCount = 1 + intdiv(($posts->count() - 1), $pageSize);
        $data = ["jobs" => [], "page" => ["count" => $pageCount, "current" => $currentPage]];


        for ($i = 0; $i <= $pageSize && ($i + ($pageSize * ($currentPage - 1)) < $posts->count()); $i++)
            array_push($data['jobs'], $posts[$i + ($pageSize * ($currentPage - 1))]->toJobCard());
        return $data;
    }

    public function searchRoute(Request $request)
    {
        return response()->json(PostController::search(
            $request->query('order'),
            $request->query('searchWords'),
            $request->query('minSalary'),
            $request->query('maxSalary'),
            $request->query('minHours'),
            $request->query('maxHours'),
            $request->query('location')), 200);
    }
}