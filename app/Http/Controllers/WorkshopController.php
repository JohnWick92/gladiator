<?php

namespace App\Http\Controllers;

use App\Models\Om;
use App\Models\User;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkshopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workshops = Workshop::all();
        $oms = Om::all();
        $user = new User;
        $user->profile_description = 'Administrador';
        return Inertia::render('Workshop/Index', [
            'oms' => $oms,
            'workshops' => $workshops,
            'user' => $user
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $oms = Om::all();
        $user = new User;
        $user->profile_description = 'Administrador';
        return Inertia::render('Workshop/New', [
            'oms' => $oms,
            'user' => $user
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $workshop = new Workshop;
        $workshop->description = $request->description;
        $workshop->active = $request->active;
        $workshop->code_om = $request->codeOm;
        $workshop->save();
        return redirect()->to('/workshop');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Workshop $workshop)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Workshop $workshop)
    {
        $oms = Om::all();
        $user = new User;
        $user->profile_description = 'Administrador';
        return Inertia::render('Workshop/Edit', [
            'user' => $user,
            'oms' => $oms,
            'workshop' => $workshop,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Workshop $workshop)
    {
        $workshop->description = $request->description;
        $workshop->active = $request->active;
        $workshop->code_om = $request->codeOm;
        $workshop->update();
        return redirect()->to('/workshop');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workshop $workshop)
    {
        $workshop->delete();
        return redirect()->to('/workshop');
    }
}
