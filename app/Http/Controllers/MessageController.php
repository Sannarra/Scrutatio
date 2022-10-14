<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    /// Api
    public function index()
    {
        return Message::all();
    }

    public function show(Message $message)
    {
        return $message;
    }

    public function store(Request $request)
    {
        $request->validate([
            'created_at' => 'date',
            'updated_at' => 'date',
            'application_id' => 'required|exists:applications,id',
            'sender_account_id' => 'required|exists:accounts,id',
            'content' => "required",
        ]);
        $messageData = $request->all();
        unset($messageData["id"]);
        $message = Message::create($messageData);

        return response()->json($message, 201);
    }

    public function update(Request $request, Message $message)
    {
        $request->validate([
            'created_at' => 'date',
            'updated_at' => 'date',
            'application_id' => 'exists:applications,id',
            'sender_account_id' => 'exists:accounts,id',
            'content' => "filled",
        ]);
        $message->update($request->all());

        return response()->json($message, 200);
    }


    public function delete(Message $message)
    {
        $message->delete();
    }
}