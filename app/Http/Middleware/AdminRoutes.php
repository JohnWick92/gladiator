<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminRoutes
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  Closure(): void  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $profile = auth()->user()->profile_description;
        if ($profile !== 'Administrador') {
            return redirect('/')->with('unauthorized', 'Apenas o administradores gerais tem acesso');
        }

        return $next($request);
    }
}
