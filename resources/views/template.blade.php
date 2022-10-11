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
    pageName='{{$pageName}}';
    pageData=@json($data);
    csrf_token="{{csrf_token()}}"
    errors=@json($errors->all())
</script>

</html>