<?php

namespace App\Http\Controllers;

use App\Models\Om;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $oms = Om::all();

        return Inertia::render('Om/Index', ['oms' => $oms]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Om/New');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $om = new Om;
        $om->description = $request->description;
        $om->acronym = $request->acronym;
        $om->save();

        return redirect('/om');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Om $om)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Om $om): Response
    {
        return Inertia::render('Om/Edit', ['om' => $om]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Om $om): RedirectResponse
    {
        $om->description = $request->description;
        $om->acronym = $request->acronym;
        $om->update();

        return redirect('/om');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Om $om): RedirectResponse
    {
        $om->delete();

        return redirect('/om');
    }
}
