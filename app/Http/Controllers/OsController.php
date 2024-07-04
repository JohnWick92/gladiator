<?php

namespace App\Http\Controllers;

use App\Mail\CancelOSMail;
use App\Mail\MailRequest;
use App\Mail\OpenOSMail;
use App\Mail\SolveOSMail;
use App\Models\Material;
use App\Models\ModelRequest;
use App\Models\Os;
use App\Models\SolverOs;
use App\Models\User;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class OsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $canceledOs = Os::with('oms')->where('canceled', true)->get();
        $toCancel = Os::with('oms')->where('canceled', false)->where('req_canceled', true)->get();
        $os = Os::with('oms')->with('requests')->where('canceled', false)->where('req_canceled', false)->where('os.solved', false)->get();
        return Inertia::render('Os/Index', [
            'osList' => $os,
            'canceledOs' => $canceledOs,
            'osListToCancel' => $toCancel
        ]);
    }

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
    public function store(Request $request)
    {
        $os = new Os;
        $history = new HistoricOsController;
        $os->code_request = $request->code_request;
        $os->code_om = $request->code_om;
        $os->code_workshop = $request->code_workshop;
        $os->priority = $request->priority;
        $code_os = $os->save();
        $history->saveHistory($request->nip, 'Abrir OS', $code_os);
        $requestOpened = ModelRequest::find($request->code_request);
        $requestOpened->accepted = true;
        $requestOpened->update();
        $mailRequest = ModelRequest::find($requestOpened->code);
        $mailOS = Os::find($code_os);
        Mail::to(User::find($requestOpened->nip))->send(new OpenOSMail($mailOS, $mailRequest));
        return redirect()->to('/request');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $workshops = Workshop::where('active', true)->get();
        $materials = Material::where('active', true)->get();
        $os = Os::with('oms')->with('workshops')->with('requests')->with('materials_os')->with('solver_os')->find($id);
        $solvers = User::where('solver', true)->where('code_om', $os->code_om)->get();
        return Inertia::render('Os/Show', [
            'os' => $os,
            'solvers' => $solvers,
            'workshops' => $workshops,
            'materials' => $materials,
        ]);
    }

    public function report($id)
    {
        $os = Os::with('oms')->with('workshops')->with('requests')->with('materials_os')->find($id);
        $solvers = SolverOs::with('users.name')->where('code_os', $id)->get();
        $owner = User::with('sectors')->find($os->requests->nip);
        return Inertia::render('Reports/Os', ['owner' => $owner, 'os' => $os, 'solvers' => $solvers]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Os $os)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Os $os)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Os $os)
    // {
    //     //
    // }

    public function addMsg(Request $request, $id)
    {
        $history = new HistoricOsController;
        $os = Os::find($id);
        if ($request->profile === "Aux. Oficina") {
            $os->observation_solver = $request->message;
        } else {
            $os->observation_in_charge = $request->message;
        }
        $os->update();
        $history->saveHistory($request->nip, 'Alteração de mensagem', $os->code);
        return back()->with('success', 'Mensagens atualizadas com sucesso');
    }

    public function changeWorkshop(Request $request, $id)
    {
        $history = new HistoricOsController;
        $os = Os::find($id);
        $os->code_workshop = $request->code_workshop;
        SolverOs::where('code_os', $id)->delete();
        $os->update();
        $history->saveHistory($request->nip, 'Alteração de oficina', $os->code);
        return back()->with('success', 'Oficina alterada com sucesso');
    }

    public function changeStatus(Request $request, $id)
    {
        $history = new HistoricOsController;
        $os = Os::find($id);
        $os->status = $request->status;
        $os->update();
        $history->saveHistory($request->nip, 'Alteração de status', $os->code);
        return back()->with('success', 'Status atualizado com sucesso');
    }

    public function cancelOs(Request $request, $id)
    {
        $history = new HistoricOsController;
        $os = Os::find($id);
        $os->canceled = true;
        $os->solved = true;
        $os->completion_date = now();
        $os->closed = true;
        $os->update();
        $ModelRequest = ModelRequest::find($os->code_request);
        $ModelRequest->closed = true;
        $ModelRequest->resolution = 'Cancelado';
        $ModelRequest->update();
        $history->saveHistory($request->nip, 'OS cancelada', $os->code);
        $mailRequest = ModelRequest::find($ModelRequest->code);
        $mailOS = Os::find($id);
        Mail::to(User::find($ModelRequest->nip))->send(new CancelOSMail($mailOS, $mailRequest));
        return redirect('/os')->with('success', 'Cancelamento efetuado com sucesso');
    }

    public function solve(Request $request, $id)
    {
        $history = new HistoricOsController;
        $os = Os::find($id);
        $os->solved = true;
        $modelRequest = ModelRequest::find($os->code_request);
        $modelRequest->resolution = $request->resolution;
        $os->update();
        $modelRequest->update();
        $history->saveHistory($request->nip, 'OS resolvida', $os->code);
        $mailRequest = ModelRequest::find($modelRequest->code);
        $mailOS = Os::find($id);
        Mail::to(User::find($modelRequest->nip))->send(new SolveOSMail($mailOS, $mailRequest));
        return redirect('/os')->with('success', 'OS marcada como solucionada');
    }
}
