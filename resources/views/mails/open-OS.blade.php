<div>
    <h1>Abertura de OS</h1>
    <br>
    <p>Prezado(a), {{ $request->users->name }}, informo que seu pedido N° {{ $request->code }} foi registrado na OS de N° {{ $os->code }} na data {{ date('d-m-Y H:i:s') }}.
    </p>
</div>
