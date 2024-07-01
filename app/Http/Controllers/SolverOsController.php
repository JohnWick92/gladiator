<?php

namespace App\Http\Controllers;

use App\Models\SolverOs;
use Illuminate\Http\Request;

class SolverOsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     //
    // }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        $solverOs = new SolverOs;
        $history = new HistoricOsController;
        $solverOs->code_os = $id;
        $solverOs->nip = $request->solver_nip;
        $solverOs->save();
        $history->saveHistory($request->nip, 'Adicionar solucionador', $id);
        return back()->with('success', 'Solucionador adicionado');
    }

    /**
     * Display the specified resource.
     */
    // public function show(SolverOs $solverOs)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(SolverOs $solverOs)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, SolverOs $solverOs)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $history = new HistoricOsController;
        $solverOs = SolverOs::find($id);
        $solverOs->delete();
        $history->saveHistory($request->nip, 'Remover solucionador', $id);
        return back()->with('success', 'Solucionador removido');
    }
}
