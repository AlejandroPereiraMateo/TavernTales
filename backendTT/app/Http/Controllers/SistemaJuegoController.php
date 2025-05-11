<?php

namespace App\Http\Controllers;

use App\Models\SistemaJuego;
use Illuminate\Http\Request;

class SistemaJuegoController extends Controller
{
    public function index()
    {
        return response()->json(SistemaJuego::all());
    }
}
