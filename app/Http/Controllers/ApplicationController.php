<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Account;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Session;


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

    public function messages(Request $request, Application $application)
    {
        if (!$request->has("include_sender_name"))
            return $application->messages;

        $result = $application->messages->all();
        foreach ($result as $application) {
            $sender_account = Account::find($application->sender_account_id);
            $application["sender_name"] = $sender_account->user ? $sender_account->user->firstname[0] . ". " . $sender_account->user->lastname : $sender_account->company->name;
        }
        return response()->json($result);
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

    public function getApplications()
    {
        $applications = null;
        if (Auth::user()->user != null)
            $applications = Auth::user()->user->applications;
        else
            $applications = Application::whereHas('post', function (Builder $query) {
                return $query->whereHas('company', function (Builder $query) {
                        return $query->whereRelation('account', 'id', Auth::id());
                    }
                    );
                })->get();

        $applications = $applications->sortByDesc('created_at');
        $applications_id = $applications->pluck('id');
        $posts_title = $applications->pluck('post.title');
        $posts_id = $applications->pluck('post.id');

        $conversations = [];
        foreach ($applications_id as $i => $id)
            array_push($conversations, [
                "id" => $id,
                "title" => $posts_title[$i],
                "post_id" => $posts_id[$i]
            ]);
        return $conversations;
    }


    public function chat()
    {
        $conversations = $this->getApplications();
        $conversationId = Session::get("conversationId");
        if ($conversationId == null)
            $conversationId = 0;
        else
            foreach ($conversations as $i => $conv)
                if ($conv['id'] == $conversationId) {
                    $conversationId = $i;
                    break;
                }

        return react_view("message", ["conversations" => $conversations, "conversationId" => $conversationId, "account_id" => Auth::id()]);
    }

    public function getApplyMessage(Post $post, User $user)
    {
        return "Hello,
Your {$post->title} job offer interests me.

{$user->firstname} {$user->lastname}
{$user->account->email}
{$user->phone}";
    }

    public function apply(Post $post)
    {
        $conversation = Application::where('user_id', Auth::user()->user->id)->where('post_id', $post->id)->get();
        if ($conversation->count() > 0)
            return redirect('/chat')->with("conversationId", $conversation->first()->id);
        $conversations = $this->getApplications();

        array_unshift($conversations, ["title" => $post->title, "new" => true, "post_id" => $post->id]);
        return react_view("message", [
            "user" => Auth::user()->user->id,
            "conversations" => $conversations,
            "icebreaker" => $this->getApplyMessage($post, Auth::user()->user),
            "account_id" => Auth::id()]);
    }
}