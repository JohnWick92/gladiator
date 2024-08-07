<?php

namespace App\Http\Controllers;

use App\Models\MaterialOs;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class MaterialOsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): void
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, int $id): RedirectResponse
    {
        $history = new HistoricOsController;
        $materialOs = new MaterialOs;
        $materialOs->amount = $request->amount;
        $materialOs->used = false;
        $materialOs->code_os = $id;
        $materialOs->code_material = $request->code_material;
        $materialOs->quantity_used = 0;
        $materialOs->order_date = now();
        $materialOs->save();
        $history->saveHistory($request->nip, 'Adicionar material', $id);

        return back()->with('success', 'Material adicionado com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(MaterialOs $materialOs): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MaterialOs $materialOs): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $history = new HistoricOsController;
        $materialOs = MaterialOs::where('code_os', $id)->where('code', $request->code)->first();
        $materialOs->quantity_used = $materialOs->quantity_used + $request->quantity_used;
        $materialOs->update();
        $history->saveHistory($request->nip, 'Registrar uso material', $id);

        return back()->with('success', 'Uso registrado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MaterialOs $materialOs): void
    {
        //
    }
}
