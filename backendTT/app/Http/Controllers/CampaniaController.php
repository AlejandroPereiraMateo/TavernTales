<?php

namespace App\Http\Controllers;

use App\Models\Campania;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CampaniaController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $email = $user->email;

        $campanias = Campania::with('master')
            ->where('master_id', $user->id)
            ->orWhereJsonContains('usuarios_invitados', $email)
            ->get()
            ->map(function ($campania) {
                return [
                    'id_campania' => $campania->id_campania,
                    'nombre' => $campania->nombre,
                    'descripcion' => $campania->descripcion,
                    'usuarios_invitados' => json_decode($campania->usuarios_invitados, true) ?: [],
                    'masterNombre' => $campania->master ? $campania->master->name : null,
                    'fecha_creacion' => $campania->fecha_creacion,
                    'created_at' => $campania->created_at,
                    'updated_at' => $campania->updated_at,
                    'numeroSesiones' => 0, // No sessions model, so 0 for now
                ];
            });
        return response()->json($campanias);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'master_id' => 'required|integer|exists:users,id',
            'usuariosInvitados' => 'array',
            'usuariosInvitados.*' => 'email|exists:users,email',
        ]);

        DB::beginTransaction();

        try {
            $usuariosInvitados = $request->input('usuariosInvitados', []);

            $campania = Campania::create([
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
                'master_id' => $request->master_id,
                'fecha_creacion' => now(),
                'usuarios_invitados' => json_encode($usuariosInvitados),
            ]);

            DB::commit();

            return response()->json(['message' => 'Campaña creada correctamente', 'campania' => $campania], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al crear la campaña', 'details' => $e->getMessage()], 500);
        }
    }
}
