<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function index()
    {
        $account = Auth::user(); /// Model::Account
        $user = $account->user; /// Model::User
        $applications = $user->applications;
        $applications_id = $applications->pluck('id');
        $applications_title = $applications->pluck('post.title');

        $result = [];

        foreach ($applications_id as $i => $id) {
            $result[] = [
                "id" => $id,
                "title" => $applications_title[$i]
            ];
        }

        return response()->json($result, 200);
    }

    public function show(Request $request, $applicationId)
    {
        return response()->json(Message::where('application_id', $applicationId)->get(), 200);
    }

    public function store(Request $request, $applicationId)
    {

        return response()->json(Message::create([
            'content' => $request->message,
            'sender_user_id' => Auth::user()->user->id,
            'created_at' => now(),
            'application_id' => $applicationId
        ]), 201);
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

    public function chat(Request $request)
    {
        // $account = Auth::user(); /// Model::Account
        // $user = $account->user; /// Model::User
        // $applications = $user->applications;
        // $applications_id = $applications->pluck('id');
        // $applications_title = $applications->pluck('post.title');
        // echo $applications_id, $applications_title;


        //send data to react then fecth 
        return react_view("message", ["post" => []]);
    }
}
