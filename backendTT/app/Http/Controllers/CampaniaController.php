<?php

namespace App\Http\Controllers;

use App\Models\Campania;
use Illuminate\Http\Request;

class CampaniaController extends Controller
{
    public function index()
    {
        return response()->json(Campania::all());
    }
}
