<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    /// Api
    public function index()
    {
        return Application::all();
    }

    public function show(Request $request, Application $application)
    {
        return $application;
    }

    public function store(Request $request)
    {
        $application = Application::create($request->all());

        return response()->json($application, 201);
    }

    public function update(Request $request, Application $application)
    {
        $application->update($request->all());

        return response()->json($application, 200);
    }

    public function delete(Application $application)
    {
        $application->delete();

        return response()->json(null, 204);
    }

    public function messages(Application $application)
    {
        return $application->messages;
    }

    /// Web
    public function sendMessage(Request $request, Application $application)
    {
        return response()->json(Message::create([
            'content' => $request->message,
            'sender_account_id' => Auth::id(),
            'application_id' => $application->id
        ]), 201);
    }

    public function chat()
    {
        $applications = Auth::user()->user->applications;
        $applications_id = $applications->pluck('id');
        $applications_title = $applications->pluck('post.title');

        $conversations = [];
        foreach ($applications_id as $i => $id)
            array_push($conversations, [
                "id" => $id,
                "title" => $applications_title[$i]
            ]);

        return react_view("message", ["conversations" => $conversations]);
    }
}