<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Scrutatio</title>

    @viteReactRefresh
    @vite('resources/js/register.jsx')
</head>

<body>
    <div id="app" csrf_token="{{csrf_token()}}"></div>
</body>