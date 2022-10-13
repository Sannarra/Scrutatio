<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use App\Models\Account;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    private function createAccount(array $data)
    {
        return Account::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);
    }

    public function loginView()
    {
        if (Auth::user() != null)
            return redirect("/profile");
        return react_view("login");
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials, filter_var($request->query("remember", "false"), FILTER_VALIDATE_BOOLEAN))) {
            $request->session()->regenerate();

            return redirect()->intended();
        }

        return redirect("login")->withErrors('Login details are not valid');
    }

    private function register(Request $request, bool $isMember)
    {
        /// Validate request
        if ($isMember)
            $request->validate([
                'firstname' => 'required',
                'lastname' => 'required',
                'phone' => 'required',
                'city' => 'required',
                'email' => 'required|email|unique:accounts',
                'password' => 'required|min:6',
            ]);
        else
            $request->validate([
                'name' => 'required',
                'creation_date' => 'required',
                'size' => 'required',
                'headquarter' => 'required',
                'website' => 'required',
                'email' => 'required|email|unique:accounts',
                'password' => 'required|min:6',
            ]);
        $data = $request->all();

        /// Create account
        $account = $this->createAccount($data);
        if ($isMember)
            User::create([
                'firstname' => $data['firstname'],
                'lastname' => $data["lastname"],
                'phone' => $data["phone"],
                'city' => $data["city"],
                'account_id' => $account->id
            ]);
        else
            Company::create([
                'name' => $data['name'],
                'creation_date' => $data['creation_date'],
                'size' => $data["size"],
                'headquarter' => $data["headquarter"],
                'description' => $data["description"],
                'website' => $data["website"],
                'account_id' => $account->id
            ]);

        /// Log to newly created account
        Auth::login($account, filter_var($request->query("remember", "false"), FILTER_VALIDATE_BOOLEAN));
        $request->session()->regenerate();
        return redirect()->intended();
    }

    public function registerMemberView()
    {
        if (Auth::user() != null)
            return redirect("/profile");
        return react_view("register");
    }

    public function registerMember(Request $request)
    {
        return $this->register($request, true);
    }

    public function registerCompanyView()
    {
        return react_view("register_company");
    }

    public function registerCompany(Request $request)
    {
        return $this->register($request, false);
    }

    public function signOut()
    {
        Session::flush();
        Auth::logout();

        return Redirect('/');
    }
}