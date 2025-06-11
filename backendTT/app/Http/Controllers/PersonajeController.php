<?php

namespace App\Http\Controllers;

use App\Models\Personaje;
use Illuminate\Http\Request;

class PersonajeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $personajes = Personaje::where('user_id', $user->id)->get();
        return response()->json($personajes);
    }

    public function show($id)
    {
        $personaje = Personaje::find($id);
        if (!$personaje) {
            return response()->json(['error' => 'Personaje no encontrado'], 404);
        }
        return response()->json($personaje);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'atributos' => 'required|string',
            'user_id' => 'required|integer|exists:users,id',
            'imagen' => 'nullable|string',
        ]);

        $atributos = json_decode($validated['atributos'], true);
        if ($atributos === null) {
            return response()->json(['error' => 'Formato JSON inválido para atributos'], 422);
        }

        $personaje = new Personaje();
        $personaje->nombre = $validated['nombre'];
        $personaje->atributos = json_encode($atributos);
        $personaje->user_id = $validated['user_id'];
        $personaje->imagen = $validated['imagen'];
        $personaje->save();

        return response()->json(['mensaje' => 'Personaje creado', 'personaje' => $personaje], 201);
    }

    public function update(Request $request, $id)
    {
        $personaje = Personaje::find($id);
        if (!$personaje) {
            return response()->json(['error' => 'Personaje no encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'atributos' => 'required|string',
            'imagen' => 'nullable|string',
        ]);

        // Authorization check: only allow owner to update
        if ($request->user()->id !== $personaje->user_id) {
            return response()->json(['error' => 'No autorizado para actualizar este personaje'], 403);
        }

        $atributos = json_decode($validated['atributos'], true);
        if ($atributos === null) {
            return response()->json(['error' => 'Formato JSON inválido para atributos'], 422);
        }

        $personaje->nombre = $validated['nombre'];
        $personaje->atributos = json_encode($atributos);
        $personaje->imagen = $validated['imagen'];
        $personaje->save();

        return response()->json(['mensaje' => 'Personaje actualizado', 'personaje' => $personaje]);
    }
}
