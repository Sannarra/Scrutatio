<?php

if (!function_exists("react_view")) {

    /// Helper to return a react view through the blade
    function react_view($pageName, $data = null)
    {
        return view('template')->with('data', $data)->with('pageName', $pageName);
    }
}

?>