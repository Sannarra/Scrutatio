<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\Builder;

class PostController extends Controller
{
    /// CRUD api
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

    /// Web api
    static public function search($sortField, $sortOrder, $searchWords, $minSalary, $maxSalary, $minHours, $maxHours, $location, $contractTypes, $field, $includeNull, $query = null)
    {
        if ($query == null)
            $query = (new Post)->newQuery();
        $result = $query;

        $addWhereOrNull = function ($key, $operand, $value) use ($includeNull, $result) {
            if ($value == null)
                return;
            $result = $result->where($key, $operand, $value);
            if ($includeNull)
                $result = $result->orWhereNull($key);
        };


        if ($searchWords != null)
            $result = $result->where('title', 'like', "%$searchWords%")
                ->orWhere('description', 'like', "%$searchWords%")
                ->orWhere('short_brief', 'like', "%$searchWords%")
                ->orWhereRelation('company', 'name', 'like', "%$searchWords%");
        $addWhereOrNull('salary', '>', $minSalary);
        $addWhereOrNull('salary', '<', $maxSalary);
        $addWhereOrNull('working_time', '>', $minHours);
        $addWhereOrNull('working_time', '<', $maxHours);
        if ($location != null)
            $result = $result->where('city', 'like', "%$location%");
        if ($contractTypes != null)
            for ($i = 0; $i < count($contractTypes); $i++)
                $result = $result->where('contract_type', 'like', "%" . $contractTypes[$i] . "%", ($i == 0) ? 'and' : 'or');
        if ($field != null)
            $result = $result->whereHas('company', function (Builder $query) use ($field) {
                return $query->whereHas('sectors', function (Builder $query) use ($field) {
                        return $query->whereRelation('sector', 'name', 'like', "%$field%");
                    }
                    );
                });
        if ($sortField != null && $sortOrder != null)
            $result = $result->orderBy($sortField, $sortOrder);

        $result = $result->get();
        return $result;
    }

    static public function getJobCardsData($sortField, $sortOrder, $searchWords, $minSalary, $maxSalary, $minHours, $maxHours, $location, $contractTypes, $field, $includeNull, $pageSize, $currentPage, $query = null)
    {
        $posts = PostController::search($sortField,
            $sortOrder,
            $searchWords,
            $minSalary,
            $maxSalary,
            $minHours,
            $maxHours,
            $location,
            $contractTypes,
            $field,
            $includeNull,
            $query);

        if ($currentPage < 1)
            $currentPage = 1;
        $data = ["jobs" => [], "page" => ["count" => $posts->count(), "current" => $currentPage, "size" => $pageSize]];


        for ($i = 0; $i <= $pageSize && ($i + ($pageSize * ($currentPage - 1)) < $posts->count()); $i++)
            array_push($data['jobs'], $posts[$i + ($pageSize * ($currentPage - 1))]->toJobCard());
        return $data;
    }

    public function searchRoute(Request $request)
    {
        return response()->json(PostController::search(
            $request->query('sortField'),
            $request->query('sortOrder'),
            $request->query('searchWords'),
            $request->query('minSalary'),
            $request->query('maxSalary'),
            $request->query('minHours'),
            $request->query('maxHours'),
            $request->query('location'),
            explode(",", $request->query('contractTypes')),
            $request->query('field'),
            $request->query("includeNull")), 200);
    }

    public function createPost(Request $request)
    {
        $company = Auth::user()->company;

        if ($company == null)
            $company = Company::all()->find(1);

        return react_view("create_post", ["post" => [],
            "company" => [
                "company_name" => $company->name,
                "sectors" => $company->sectors->pluck('sector.name'),
            ]]);
    }

    public function editPost(Request $request, Post $post)
    {
        Gate::authorize('edit-post', [$post]);
        return react_view("edit_post", [
            "post" => [
                "title" => $post->title,
                "city" => $post->city,
                "contract_type" => $post->contract_type,
                "short_brief" => $post->short_brief,
                "description" => $post->description,
                "salary" => $post->salary,
                "working_time" => $post->working_time,
                "publication_date" => $post->publication_date,
                "company_icon" => $post->icon_src,
                "id" => $post->id
            ],
            "company" => [
                "company_name" => $post->company->name,
                "sectors" => $post->company->sectors->pluck('sector.name'),
            ]]);
    }

    public function managePosts(Request $request)
    {
        $query = (new Post)->newQuery();

        if (!Gate::check('admin', [Auth::user()]))
            $query = $query->where("company_id", "=", Auth::user()->company->id);

        return react_view("manage_posts", PostController::getJobCardsData(
            $request->query('sortField'),
            $request->query('sortOrder'),
            $request->query('searchWords'),
            $request->query('minSalary'),
            $request->query('maxSalary'),
            $request->query('minHours'),
            $request->query('maxHours'),
            $request->query('location'),
            explode(',', $request->query('contractTypes')),
            $request->query('field'),
            $request->query("includeNull"),
            intval($request->query('pageSize', 10)),
            intval($request->query('page', 1)),
            $query));
    }

    public function doCreatePost(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:255',
            'city' => 'required',
            'short_brief' => 'required',
            'description' => 'required',
            'contract_type' => 'required',
            'salary' => 'required',
            'working_time' => 'required'

        ]);
        $data = $request->all();
        $data['company_id'] = Auth::user()->company->id;

        Post::create($data);
        return redirect("manage-posts");
    }

    public function doEditPost(Request $request, Post $post)
    {
        $this->validate($request, [
            'title' => 'required|max:255',
            'city' => 'required',
            'short_brief' => 'required',
            'description' => 'required',
            'contract_type' => 'required'
        ]);

        $post->update($request->all());
        return redirect("manage-posts");
    }
}