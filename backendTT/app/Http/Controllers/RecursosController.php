<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RecursosController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string',
            'tipo' => 'required|in:documento,imagen,audio,texto',
            'archivo' => 'required|file',
            'partida_id' => 'required|exists:partidas,id',
        ]);

        $path = $request->file('archivo')->store('recursos', 'public');

        $recurso = Recurso::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'tipo' => $request->tipo,
            'ruta' => $path,
            'visible' => false,
            'partida_id' => $request->partida_id,
        ]);

        return response()->json($recurso, 201);
    }

}
