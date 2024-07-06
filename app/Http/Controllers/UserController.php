<?php

namespace App\Http\Controllers;

use App\Models\Om;
use App\Models\ModelRequest;
use App\Models\Sector;
use App\Models\User;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function password()
    {
        return Inertia::render('Password');
    }

    public function reset(Request $request)
    {
        $user = User::find($request->nip);
        $user->password = Hash::make($request->new_password);
        $user->update();
        if ($user->nip == auth()->user()->nip) {
            auth()->logout();
            return redirect()->to('/login');
        }
        return back();
    }

    public function logout()
    {
        auth()->logout();
        return redirect()->to('/login');
    }

    public function login()
    {
        return Inertia::render('Auth/Login');
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'nip' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/');
        }

        return back()->with('loginError', 'Credenciais erradas e/ou inválidas');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        $oms = Om::all();
        $sectors = Sector::all();
        $workshops = Workshop::all();
        return Inertia::render('User/Index',  [
            'oms' => $oms,
            'sectors' => $sectors,
            'workshops' => $workshops,
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $oms = Om::all();
        $sectors = Sector::all();
        $workshops = Workshop::all();
        return Inertia::render('User/New',  [
            'oms' => $oms,
            'sectors' => $sectors,
            'workshops' => $workshops,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = new User;
        $user->name = $request->name;
        $user->profile_description = $request->profile;
        $user->email = $request->email;
        $user->nip = $request->nip;
        $user->password = Hash::make($request->password);
        $user->active = $request->active;
        $user->solver = $request->solver;
        $user->branch = $request->branch;
        $user->code_om = $request->codeOm;
        $user->code_workshop = $request->codeWorkshop;
        $user->code_sector = $request->codeSector;
        $user->save();
        return redirect()->to('/user');
    }

    /**
     * Display the specified resource.
     */
    // public function show(User $user)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $oms = Om::all();
        $sectors = Sector::all();
        $workshops = Workshop::all();
        return Inertia::render('User/Edit',  [
            'oms' => $oms,
            'sectors' => $sectors,
            'workshops' => $workshops,
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $user->name = $request->name;
        $user->profile_description = $request->profile;
        $user->email = $request->email;
        $user->nip = $request->nip;
        $user->active = $request->active;
        $user->solver = $request->solver;
        $user->branch = $request->branch;
        $user->code_om = $request->codeOm;
        $user->code_sector = $request->codeWorkshop;
        $user->code_sector = $request->codeSector;
        $user->update();
        return redirect()->to('/user');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->to('/user');
    }

    public function requests()
    {
        $solvedReq = ModelRequest::with('users')->whereNot('resolution', "")->where('closed', false)->where('nip', auth()->user()->nip)->get();
        $openReq = ModelRequest::with('users')->where('resolution', "")->where('closed', false)->where('nip', auth()->user()->nip)->get();
        return  Inertia::render('Home', ['solvedRequests' => $solvedReq, 'openRequests' => $openReq]);
    }
}
