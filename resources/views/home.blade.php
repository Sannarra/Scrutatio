<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Scrutatio</title>

    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>

<body>
    <div id="app"></div>
</body>

<script>
    pageName="post_creation";
    pageData=@json($data);
</script>

</html>