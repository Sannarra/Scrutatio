<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use Mockery\Undefined;
use PhpParser\Node\Stmt\For_;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        $advertisements = AdvertisementController::search($request->query('name'),
        $request->query('minSalary'),
        $request->query('maxSalary'),
        $request->query('minHours'),
        $request->query('maxHours'),
        $request->query('location'));

        $pageSize = 3;
        $page = $request->query('page');
        if ($page === null || !is_numeric($page))
            $page = 1;
        else
            $page = intval($page);
        $pageCount = 1;
        if ($advertisements->count() > 0)
            $pageCount = 1 + intdiv(($advertisements->count() - 1), $pageSize);
        $data = ["jobs" => [], "page" => ["count" => $pageCount, "current" => $page]];


        
        foreach ($advertisements/*->skip(($page - 1) * $pageSize)->take($pageSize)*/ as $jobOffer) {

            for ($i = ($page-1); $i <= $pageSize; $i++) {
          
            }
            $sectors = [];

            foreach ($jobOffer->companie->sectors as $sector)
                array_push($sectors, $sector->sector->name);

            array_push($data['jobs'], [
                "jobTitle" => $jobOffer->title,
                "companyName" => $jobOffer->companie->name,
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

        return view('home')->with('data', json_encode($data));
    }
}
?>