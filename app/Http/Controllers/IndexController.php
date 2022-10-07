<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Company;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function getJobCardsData($order, $searchWords, $minSalary, $maxSalary, $minHours, $maxHours, $location, $pageSize, $currentPage, $query = null)
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

    public function index(Request $request)
    {
        return react_view("home", PostController::getJobCardsData($request->query('order'),
            $request->query('searchWords'),
            $request->query('minSalary'),
            $request->query('maxSalary'),
            $request->query('minHours'),
            $request->query('maxHours'),
            $request->query('location'),
            intval($request->query('pageSize', 10)),
            intval($request->query('page', 1))));
    }

    public function createPost(Request $request)
    {
        $company = Company::all()->find(1);

        return react_view("create_post", ["post" => [],
            "company" => [
                "company_name" => $company->name,
                "sectors" => $company->sectors->pluck('sector.name'),
            ]]);
    }

    public function editPost(Request $request, Post $post)
    {
        return react_view("edit_post", [
            "post" => [
                "job_title" => $post->title,
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
        return react_view("manage_posts", PostController::getJobCardsData($request->query('order'),
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
?>