<div>
    <h1>Pedido finalizado</h1>
    <br>
    <p>Prezado(a), {{ $request->users->name }}, informo que seu pedido N° {{ $request->code }}, registrado na OS de N° {{ $os->code }} foi marcado como solucionado na data {{ date('d-m-Y H:i:s') }}.
    </p>
</div>
