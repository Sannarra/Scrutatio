<?php

namespace App\Http\Controllers;


class IndexController extends Controller
{
    public function index()
    {
        $data = ["jobs" => [[
                    "jobTitle" => "Shampooer",
                    "companyName" => "Wolf PLC",
                    "city" => "Boyletown",
                    "publication" => "29 sept 2022",
                    "sectors" => ["Public service"],
                    "contract_type" => "CDI",
                    "salary" => 1542,
                    "working_time" => 35,
                    "company_icon" => "https://cdn.discordapp.com/icons/768816677491965973/89de8e72c08e16e921810da2a0fc5f19.webp"]]];

        return view('welcome')->with('data', json_encode($data));
    }
}
?>