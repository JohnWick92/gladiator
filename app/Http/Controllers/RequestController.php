<?php

// phpcs:ignoreFile

namespace App\Http\Controllers;

use App\Mail\RejectOsMail;
use App\Models\Om;
use App\Models\ModelRequest;
use App\Models\Os;
use App\Models\Workshop;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): RedirectResponse|Response
    {
        $requests = null;
        $oms = Om::all();
        $workshops = Workshop::all();
        switch (auth()->guard()->user()->profile_description) {
            case "Administrador":
                $requests = ModelRequest::with('users')->where('closed', false)->where('resolution', null)->orWhere('resolution', "")->get();
                break;
            case "Chefe do apoio":
                $requests = ModelRequest::with('users')->where('closed', false)->where('resolution', null)->orWhere('resolution', "")
                    ->whereRelation('users', 'code_om', auth()->guard()->user()->code_om)->get();
                break;
            case "Enc. Oficina":
                $requests = ModelRequest::with('users')->where('closed', false)->where('resolution', null)->orWhere('resolution', "")
                    ->whereRelation('users', 'code_om', auth()->guard()->user()->code_om)->get();
                break;
            default:
                return redirect('/');
        }
        return Inertia::render('Request/Index', ['requests' => $requests, 'oms' => $oms, 'workshops' => $workshops]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Request/New');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $modelRequest = new ModelRequest();
        $modelRequest->location = $request->location;
        $modelRequest->nip = $request->nip;
        $modelRequest->request_date = now();
        $modelRequest->description = $request->description;
        $modelRequest->priority = $request->priority;
        $modelRequest->save();
        return redirect('/');
    }

    public function report($id): Response
    {
        $modelRequest = ModelRequest::find($id);
        return Inertia::render('Reports/Request', ['request' => $modelRequest]);
    }

    /**
     * Display the specified resource.
     */
    // public function show(Request $request)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($request): Response
    {
        $toUpdate = ModelRequest::find(intval($request));
        return Inertia::render('Request/Edit', ['request' => $toUpdate]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ModelRequest $modelRequest): RedirectResponse
    {
        $modelRequest = $modelRequest->find($request->code);
        $modelRequest->description = $request->description;
        $modelRequest->priority = $request->priority;
        $modelRequest->location = $request->location;
        $modelRequest->update();
        return redirect('/');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($code): RedirectResponse
    {
        $request = ModelRequest::find(intval($code));
        if ($request->accepted) {
            $request->canceled = true;
            $os = Os::where('code_request', $code)->first();
            $os->req_canceled = true;
            $os->update();
            $request->update();
            return redirect('/')->with('success', 'Como seu pedido já foi atrelado a uma OS, solicitamos o cancelamento do seu pedido.
               Assim que confirmado nós confirmaremos por email ;)');
        } else {
            $request->delete();
            return redirect('/')->with('success', 'Removida com sucesso');
        }
    }

    public function close(Request $request, $id): RedirectResponse
    {
        $modelRequest = ModelRequest::find($id);
        $os = Os::where('code_request', $id)->first();
        $modelRequest->closed = true;
        $os->complaint = $request->complaint;
        $os->satisfaction = $request->satisfaction;
        $os->closed = true;
        $os->update();
        $modelRequest->update();
        return redirect('/');
    }

    public function rejectRequest($id)
    {
        $modelrequest = ModelRequest::find($id);
        $modelrequest->closed = true;
        $modelrequest->resolution = 'Rejeitado';
        $modelrequest->update();
        Mail::to(auth()->guard()->user::find($modelrequest->nip))->send(new RejectOsMail($modelrequest));
        return redirect('/os')->with('success', 'Rejeição efetuada com sucesso');
    }
}
