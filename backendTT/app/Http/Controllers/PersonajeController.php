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
}
