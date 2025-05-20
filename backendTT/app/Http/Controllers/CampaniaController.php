<?php

namespace App\Http\Controllers;

use App\Models\Campania;
use Illuminate\Http\Request;

class CampaniaController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $campanias = Campania::where('user_id', $user->id)->get();
        return response()->json($campanias);
    }
}
