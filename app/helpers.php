<?php

if (!function_exists("react_view")) {
    function react_view($pageName, $data = null)
    {
        return view('template')->with('data', $data)->with('pageName', $pageName);
    }
}

?>