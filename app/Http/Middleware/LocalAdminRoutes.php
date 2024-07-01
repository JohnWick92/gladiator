<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LocalAdminRoutes
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $profile = auth()->user()->profile_description;
        if ($profile !== 'Administrador' && $profile !== "Chefe do apoio")
            return redirect('/')->with('unauthorized', 'Apenas os administradores gerais e locais tem acesso');
        return $next($request);
    }
}
