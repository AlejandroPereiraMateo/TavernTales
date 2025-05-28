<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
use Illuminate\Http\Request;

class NoticiaController extends Controller
{
    //Obtener Noticias
    public function index()
    {
        return Noticia::orderBy('fecha', 'desc')->get();
    }

    //Guardar Noticias
    public function store(Request $request)
    {
         $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
            'fecha' => 'required|date',
        ]);

        return Noticia::create($request->all());
    }

    //Borrar noticia
    public function destroy($id) 
    {
        $noticia = Noticia::findOrFail($id);
        $noticia->delete();
        return response()->json(['message' => 'Noticia eliminada']);
    }
}