<?php

namespace App\Http\Controllers;

use App\Models\Om;
use App\Models\Sector;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $oms = Om::all();
        $sectors = Sector::all();
        $user = new User;
        $user->profile_description = 'Administrador';
        return Inertia::render('Sector/Index', [
            'oms' => $oms, 'sectors' => $sectors, 'user' => $user
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
        return Inertia::render('Sector/New', [
            'oms' => $oms,
            'user' => $user
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $sector = new Sector;
        $sector->description = $request->description;
        $sector->acronym = $request->acronym;
        $sector->code_om = $request->codeOm;
        $sector->save();
        return redirect()->to('/sector');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Sector $sector)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sector $sector)
    {
        $oms = Om::all();
        $user = new User;
        $user->profile_description = 'Administrador';
        return Inertia::render('Sector/Edit', [
            'oms' => $oms,
            'sector' => $sector,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sector $sector)
    {
        $sector->description = $request->description;
        $sector->acronym = $request->acronym;
        $sector->code_om = $request->codeOm;
        $sector->update();
        return redirect()->to('/sector');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sector $sector)
    {
        $sector->delete();
        return redirect()->to('/sector');
    }
}
