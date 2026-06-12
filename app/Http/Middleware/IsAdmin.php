<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        // Si l'utilisateur est connecté ET qu'il est bien admin, on le laisse passer
        if (Auth::check() && Auth::user()->role === 'admin') {
            return $next($request);
        }

        // Sinon, on le renvoie vers le catalogue avec une interdiction
        return redirect()->route('catalog')->with('error', 'Accès refusé. Vous devez être administrateur.');
    }
}
