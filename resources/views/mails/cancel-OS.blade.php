
<div>
    <h1>Cancelamento de pedido</h1>
    <br>
    <p>Prezado(a), {{ $request->users->name }}, informo que seu pedido N° {{ $request->code }}, registrado na OS de N° {{ $os->code }} teve seu cancelamento deferido na data {{ date('d-m-Y H:i:s') }}.
    </p>
</div>

