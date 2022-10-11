<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function index()
    {
        return Message::all();
    }

    public function show(Request $request, Message $message)
    {
        return $message;
    }

    public function store(Request $request)
    {
        $message = Message::create($request->all());

        return response()->json($message, 201);
    }

    public function update(Request $request, Message $message)
    {
        $message->update($request->all());

        return response()->json($message, 200);
    }


    public function delete(Message $message)
    {
        $message->delete();
    }

    public function chat (Request $request)
    {
        $account = Auth::user(); /// Model::Account
        $user = $account->user; /// Model::User
        $applications = $user->applications;
        $applications_id = $applications->pluck('id');
        $applications_title = $applications->pluck('post.title');
        echo $applications_id, $applications_title;
        //send data to react then fecth 
        return react_view("message", ["post" => [],
    ]);
    }
}
