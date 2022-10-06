<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        $advertisements = Advertisement::all();

        $pageSize = 15;
        $page = $request->query('page');
        if ($page === null || !is_numeric($page))
            $page = 1;
        else
            $page = intval($page);
        $pageCount = 1;
        if ($advertisements->count() > 0)
            $pageCount = 1 + intdiv(($advertisements->count() - 1), $pageSize);
        $data = ["jobs" => [], "page" => ["count" => $pageCount, "current" => $page]];


        foreach ($advertisements->skip(($page - 1) * $pageSize)->take($pageSize) as $jobOffer) {
            $sectors = [];

            foreach ($jobOffer->companie->sectors as $sector)
                array_push($sectors, $sector->sector->name);

            array_push($data['jobs'], [
                "job_title" => $jobOffer->title,
                "company_name" => $jobOffer->companie->name,
                "city" => $jobOffer->city,
                "publication_date" => date('m-d H:i', strtotime($jobOffer->created_at)),
                "sectors" => $sectors,
                "contract_type" => $jobOffer->contract_type,
                "salary" => $jobOffer->salary,
                "working_time" => $jobOffer->working_time,
                "company_icon" => $jobOffer->icon_src,
                "description" => $jobOffer->description,
                "short_brief" => $jobOffer->short_brief
            ]);
        }
        return react_view("home", $data);
    }

    public function createPost(Request $request)
    {
        return react_view("create_post");
    }

    public function editPost(Request $request, Advertisement $advertisement)
    {
        return react_view("edit_post", [
            "post" => [
                "job_title" => $advertisement->title,
                "city" => $advertisement->city,
                "contract_type" => $advertisement->contract_type,
                "short_brief" => $advertisement->short_brief,
                "description" => $advertisement->description,
                "salary" => $advertisement->salary,
                "working_time" => $advertisement->working_time,
                "publication_date" => $advertisement->publication_date,
                "company_icon" => $advertisement->icon_src,
            ],
            "company" => [
                "company_name" => $advertisement->companie->name,
                "sectors" => $advertisement->companie->sectors->pluck('sector.name'),
            ]]);
    }
}
?>