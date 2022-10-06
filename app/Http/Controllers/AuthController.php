<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use App\Models\Account;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }

    public function customLogin(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('home')
                ->withSuccess('Signed in');
        }

        return redirect("login")->withSuccess('Login details are not valid');
    }

    public function registration()
    {
        return view('auth.registration');
    }

    public function customRegistration(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:accounts',
            'password' => 'required|min:6',
        ]);

        $data = $request->all();
        $check = $this->create($data);

        $request->session()->regenerate();

        return redirect("home")->withSuccess('You have signed-in');
    }

    public function memberRegistration(Request $request)
    {
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'phone' => 'required',
            'city' => 'required',
            'email' => 'required|email|unique:accounts',
            'password' => 'required|min:6',
        ]);

        $data = $request->all();
        $account = $this->create($data);
        $member = $this->createUser($data, $account);

        $request->session()->regenerate();

        return redirect("home")->withSuccess('You have signed-in');
    }

    public function createUser(array $data, Account $account)
    {
        return User::create([
            'firstname' => $data['firstname'],
            'lastname' => $data["lastname"],
            'phone' => $data["phone"],
            'city' => $data["city"],
            'status' => 0,
            'account_id' => $account->id
        ]);
    }

    public function create(array $data)
    {
        return Account::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);
    }

    public function signOut()
    {
        Session::flush();
        Auth::logout();

        return Redirect('login');
    }
}