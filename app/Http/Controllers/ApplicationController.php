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

    public function show(Application $application)
    {
        return $application;
    }

    public function store(Request $request)
    {
        $request->validate([
            'created_at' => 'date',
            'updated_at' => 'date',
            'post_id' => 'required|exists:posts,id',
            'user_id' => 'required|exists:users,id',
        ]);
        $applicationData = $request->all();
        unset($applicationData["id"]);
        $application = Application::create($applicationData);

        return response()->json($application, 201);
    }

    public function update(Request $request, Application $application)
    {
        $request->validate([
            'created_at' => 'date',
            'updated_at' => 'date',
            'post_id' => 'exists:posts,id',
            'user_id' => 'exists:users,id',
        ]);
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

    /// Get the applications informations needed by the front related to the authentified user
    public function getApplications()
    {
        $applications = null;
        /// If user is private we get their applications
        if (Auth::user()->user != null)
            $applications = Auth::user()->user->applications;
        /// If user is company we get the applications to their posts
        else
            $applications = Application::whereHas('post', function (Builder $query) {
                return $query->whereHas('company', function (Builder $query) {
                        return $query->whereRelation('account', 'id', Auth::id());
                    }
                    );
                })->get();

        /// Retreive front needed informations
        $applications = $applications->sortByDesc('created_at');
        $applications_id = $applications->pluck('id');
        $posts_title = $applications->pluck('post.title');
        $posts_id = $applications->pluck('post.id');
        $applicants = $applications->pluck('user.lastname');

        $conversations = [];
        foreach ($applications_id as $i => $id)
            array_push($conversations, [
                "id" => $id,
                "title" => $posts_title[$i],
                "post_id" => $posts_id[$i],
                "applicant" => $applicants[$i],
                /// Contact id is either the company offering the job or the applicant (depending on the authentified user)
                "contact_id" => (Auth::user()->user != null) ?Post::find($posts_id[$i])->company->account->id : $applications[$i]->user->account->id
            ]);
        return $conversations;
    }


    public function chat()
    {
        $conversations = $this->getApplications();

        /// Conversation Id is the conversation index (in the $conversations array, not the id database field) to open when loading the page
        /// If not set it open the first existing conversation
        $conversationId = Session::get("conversationId");
        if ($conversationId == null)
            $conversationId = 0;
        else
            foreach ($conversations as $i => $conv)
                if ($conv['id'] == $conversationId) {
                    $conversationId = $i;
                    break;
                }

        return react_view("message", ["conversations" => $conversations,
            "conversationId" => $conversationId,
            "account_id" => Auth::id(),
            "isCompany" => Auth::user()->company != null]);
    }

    public function getApplyMessage(Post $post, User $user)
    {
        return "Hello,
Your {$post->title} job offer interests me.

{$user->firstname} {$user->lastname}
{$user->account->email}
{$user->phone}";
    }

    /// Open the chat when applying to a specific post
    /// The chat open on a new conversation which will be created in database on the first sent message and redirect to the regular chat
    /// Other conversations works as the regular chat page
    public function apply(Post $post)
    {
        /// Test if the user has already applied to the offer, if true it redirect to the regular chat and open on the post conversation
        $conversation = Application::where('user_id', Auth::user()->user->id)->where('post_id', $post->id)->get();
        if ($conversation->count() > 0)
            return redirect('/chat')->with("conversationId", $conversation->first()->id);

        /// Retreive regular chat applications
        $conversations = $this->getApplications();
        /// Add the new conversation (not stored in database until the first message is sent)
        array_unshift($conversations, ["title" => $post->title, "new" => true, "post_id" => $post->id, "company_id" => $post->company->id]);
        return react_view("message", [
            "user" => Auth::user()->user->id,
            "conversations" => $conversations,
            "icebreaker" => $this->getApplyMessage($post, Auth::user()->user),
            "account_id" => Auth::id()]);
    }
}