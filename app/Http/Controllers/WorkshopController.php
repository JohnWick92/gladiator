<?php

namespace App\Http\Controllers;

use App\Models\Om;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkshopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $workshops = Workshop::with('oms')->get();
        return Inertia::render(
            'Workshop/Index',
            ['workshops' => $workshops,]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $oms = Om::all();
        return Inertia::render('Workshop/New', [
            'oms' => $oms,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $workshop = new Workshop();
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
    public function edit(Workshop $workshop): Response
    {
        $oms = Om::all();
        return Inertia::render('Workshop/Edit', [
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
