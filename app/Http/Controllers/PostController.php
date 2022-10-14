<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    /// Api
    public function index()
    {
        return Post::all();
    }

    public function show(Post $post)
    {
        return $post;
    }

    public function store(Request $request)
    {
        $request->validate([
            'created_at' => 'date',
            'updated_at' => 'date',
            'title' => 'required|max:255',
            'description' => "required",
            'salary' => 'numeric|min:0|nullable',
            'working_time' => 'numeric|min:0|nullable',
            'city' => 'required|max:255',
            'short_brief' => "required",
            'company_id' => 'required|exists:companies,id',
        ]);
        $postData = $request->all();
        unset($postData["id"]);
        $post = Post::create($postData);

        return response()->json($post, 201);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'created_at' => 'date',
            'updated_at' => 'date',
            'title' => 'filled|max:255',
            'description' => "filled",
            'salary' => 'numeric|min:0|nullable',
            'working_time' => 'numeric|min:0|nullable',
            'city' => 'filled|max:255',
            'short_brief' => "filled",
            'company_id' => 'exists:companies,id',
        ]);
        $post->update($request->all());

        return response()->json($post, 200);
    }

    public function delete(Post $post)
    {
        $post->delete();

        return response()->json(null, 204);
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
            $request->query("includeNull")), 200);
    }

    /// Web api
    /// Search posts corresponding with filter based on a query or on all posts
    /// Each filter is optionnal (set to null if not used)
    static public function search($sortField, $sortOrder, $searchWords, $minSalary, $maxSalary, $minHours, $maxHours, $location, $contractTypes, $includeNull, $query = null)
    {
        /// If no query is set we filter on all the posts
        if ($query == null)
            $query = (new Post)->newQuery();
        $result = $query;

        /// Add a where clause of the following form: WHERE {condition} OR IS NULL
        /// The OR IS NULL part is only set when $includeNull is True
        $addWhereOrNull = function ($key, $operand, $value) use ($includeNull, $result) {
            if ($value == null)
                return;

            /// If include Null
            if (filter_var($includeNull, FILTER_VALIDATE_BOOLEAN)) {
                $result = $result->where(function ($query) use ($key, $operand, $value) {
                            $query->where($key, $operand, $value)
                                ->orWhereNull($key);
                        }
                        );
                    }
                    /// If not include null
                    else
                        $result = $result->where($key, $operand, $value);
                };


        /// Filter using searchwords in post title, description, short brief or company name
        if ($searchWords != null)
            $result = $result->where(function ($query) use ($searchWords) {
                $query->where('title', 'like', "%$searchWords%")
                    ->orWhere('description', 'like', "%$searchWords%")
                    ->orWhere('short_brief', 'like', "%$searchWords%")
                    ->orWhereRelation('company', 'name', 'like', "%$searchWords%");
            });
        /// Filter salary/worktime in a given range, or null
        $addWhereOrNull('salary', '>=', $minSalary);
        $addWhereOrNull('salary', '<=', $maxSalary);
        $addWhereOrNull('working_time', '>=', $minHours);
        $addWhereOrNull('working_time', '<=', $maxHours);
        if ($location != null)
            $result = $result->where('city', 'like', "%$location%");
        if ($contractTypes != null)
            for ($i = 0; $i < count($contractTypes); $i++)
                $result = $result->where('contract_type', 'like', "%" . $contractTypes[$i] . "%", ($i == 0) ? 'and' : 'or');
        /// Sort on a specified field/order
        if ($sortField != null && $sortOrder != null)
            $result = $result->orderBy($sortField, $sortOrder);

        $result = $result->get();
        return $result;
    }

    /// Search posts and keep informations required by the front JobCard React component
    /// It includes pagination and apply rights
    static public function getJobCardsData($sortField, $sortOrder, $searchWords, $minSalary, $maxSalary, $minHours, $maxHours, $location, $contractTypes, $includeNull, $pageSize, $currentPage, $query = null)
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
            $includeNull,
            $query);

        if ($currentPage < 1)
            $currentPage = 1;
        $data = ["hasApply" => Auth::user() == null || Auth::user()->company == null, "jobs" => [], "page" => ["count" => $posts->count(), "current" => $currentPage, "size" => $pageSize]];


        for ($i = 0; $i <= $pageSize && ($i + ($pageSize * ($currentPage - 1)) < $posts->count()); $i++)
            array_push($data['jobs'], $posts[$i + ($pageSize * ($currentPage - 1))]->toJobCard());
        return $data;
    }

    public function createPost()
    {
        $company = Auth::user()->company;

        if ($company == null)
            $company = Company::all()->find(1);

        return react_view("create_post", ["post" => [],
            "company" => [
                "company_name" => $company->name,
            ]]);
    }

    public function editPost(Post $post)
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
                "id" => $post->id
            ],
            "company" => [
                "company_name" => $post->company->name,
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
            $request->query("includeNull"),
            intval($request->query('pageSize', 10)),
            intval($request->query('page', 1)),
            $query));
    }

    /// Effectively create a new post in the database (POST request)
    public function doCreatePost(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'description' => "required",
            'salary' => 'numeric|min:0|nullable',
            'working_time' => 'numeric|min:0|nullable',
            'city' => 'required|max:255',
            'short_brief' => "required",
        ]);
        $data = $request->all();
        $data['company_id'] = Auth::user()->company->id;

        Post::create($data);
        return redirect("manage-posts");
    }

    /// Effectively edit a new post in the database (POST request due to html forms not supporting PUT)
    public function doEditPost(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'filled|max:255',
            'description' => "filled",
            'salary' => 'numeric|min:0|nullable',
            'working_time' => 'numeric|min:0|nullable',
            'city' => 'filled|max:255',
            'short_brief' => "filled",
        ]);

        $post->update($request->all());
        return redirect("manage-posts");
    }
}