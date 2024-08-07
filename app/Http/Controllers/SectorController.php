<?php

namespace App\Http\Controllers;

use App\Models\Om;
use App\Models\Sector;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SectorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $sectors = Sector::with('oms')->get();

        return Inertia::render('Sector/Index', [
            'sectors' => $sectors,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $oms = Om::all();

        return Inertia::render('Sector/New', [
            'oms' => $oms,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $sector = new Sector;
        $sector->description = $request->description;
        $sector->acronym = $request->acronym;
        $sector->code_om = $request->codeOm;
        $sector->save();

        return redirect('/sector');
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
    public function edit(Sector $sector): Response
    {
        $oms = Om::all();

        return Inertia::render('Sector/Edit', [
            'oms' => $oms,
            'sector' => $sector,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sector $sector): RedirectResponse
    {
        $sector->description = $request->description;
        $sector->acronym = $request->acronym;
        $sector->code_om = $request->codeOm;
        $sector->update();

        return redirect('/sector');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sector $sector): RedirectResponse
    {
        $sector->delete();

        return redirect('/sector');
    }
}
