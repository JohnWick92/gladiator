<?php

namespace App\Http\Controllers;

use App\Models\Om;
use App\Models\ModelRequest;
use App\Models\Os;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $requests = null;
        $oms = Om::all();
        $workshops = Workshop::all();
        switch (auth()->user()->profile_description) {
            case "Administrador":
                $requests = ModelRequest::with('users')->get();
                break;
            case "Chefe do apoio":
                $requests = ModelRequest::where('code_om', auth()->user()->code_om);
                break;
            case "Enc. Oficina":
                $requests = ModelRequest::where('code_om', auth()->user()->code_om);
                break;
            default:
                return redirect()->to('/');
        }
        return Inertia::render('Request/Index', ['requests' => $requests, 'oms' => $oms, 'workshops' => $workshops]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Request/New');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $modelRequest = new ModelRequest;
        $modelRequest->location = $request->location;
        $modelRequest->nip = $request->nip;
        $modelRequest->request_date = now();
        $modelRequest->description = $request->description;
        $modelRequest->priority = $request->priority;
        $modelRequest->save();
        return redirect()->to('/');
    }

    public function report($id)
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
    public function edit(ModelRequest $request)
    {
        return Inertia::render('Request/Edit', ['request' => $request]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ModelRequest $modelRequest)
    {
        $modelRequest = $modelRequest->find($request->code);
        $modelRequest->description = $request->description;
        $modelRequest->priority = $request->priority;
        $modelRequest->location = $request->location;
        $modelRequest->update();
        return redirect()->to('/');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($code)
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
            return redirect()->to('/')->with('success', 'Removida com sucesso');
        }
    }

    public function close(Request $request, $id)
    {
        $modelRequest = ModelRequest::find($id);
        $os = Os::where('code_request', $id)->first();
        $modelRequest->closed = true;
        $os->complaint = $request->complaint;
        $os->satisfaction = $request->satisfaction;
        $os->closed = true;
        $os->update();
        $modelRequest->update();
        return redirect()->to('/');
    }
}
