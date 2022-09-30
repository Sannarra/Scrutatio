<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;


class IndexController extends Controller
{
    public function index()
    {
        $data = ["jobs" => []];


        foreach (Advertisement::all() as $jobOffer) {
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

        return view('welcome')->with('data', json_encode($data));
    }
}
?>