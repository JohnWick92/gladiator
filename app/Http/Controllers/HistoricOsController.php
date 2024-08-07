<?php

namespace App\Http\Controllers;

use App\Models\HistoricOs;
use Illuminate\Http\Request;

class HistoricOsController extends Controller
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
    public function store(Request $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(HistoricOs $historicOs): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HistoricOs $historicOs): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HistoricOs $historicOs): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HistoricOs $historicOs): void
    {
        //
    }

    public function saveHistory(string $nip, string $operation, int $code_os): void
    {
        $history = new HistoricOs;
        $history->nip = $nip;
        $history->operation = $operation;
        $history->code_os = $code_os;
        $history->change_date = now();
        $history->save();
    }
}
