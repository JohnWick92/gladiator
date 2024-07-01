<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $materials = Material::all();
        return Inertia::render('Material/Index', ['materials' => $materials]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Material/New');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $material = new Material;
        $material->description = $request->description;
        $material->code = $request->code;
        $material->unit = $request->unit;
        $material->value = $request->value;
        $material->active = $request->active;
        $material->save();
        return redirect()->to('/material');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Material $material)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Material $material)
    {
        return Inertia::render('Material/Edit', ['material' => $material]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Material $material)
    {
        $material->description = $request->description;
        $material->code = $request->code;
        $material->unit = $request->unit;
        $material->value = $request->value;
        $material->active = $request->active;
        $material->update();
        return redirect()->to('/material');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        $material->delete();
        return redirect()->to('/material');
    }
}
