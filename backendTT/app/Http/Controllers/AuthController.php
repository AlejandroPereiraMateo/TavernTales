<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // Registrar nuevo usuario
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'rol' => 'required|string|in:maestro,master,jugador',
            'imagen' => 'sometimes|string|nullable',
        ]);

        Log::info('Registering user with role: ' . $request->rol);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->rol = $request->rol;

        if ($request->has('imagen')) {
            $imageData = $request->input('imagen'); // base64 data

            // extraer la cadena base64 eliminando el prefijo 'data:image/jpeg;base64,' si existe
            if (strpos($imageData, ';base64,') !== false) {
                list($type, $imageData) = explode(';', $imageData);
                list(, $imageData)      = explode(',', $imageData);
            }

            $imageData = base64_decode($imageData);

            // definir un nombre único para el archivo
            $imageName = time() . '.png'; // o usa la extensión adecuada

            // guardar archivo
            file_put_contents(public_path('storage/profile_photos/' . $imageName), $imageData);

            // guardar en DB
            $user->imagen = $imageName;
        }

        $user->save();

        return response()->json(['message' => 'Usuario registrado correctamente'], 201);
    }

    // Crear token para inicio de sesión
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales proporcionadas son incorrectas.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Cerrar Sesión
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Sesión Cerrada']);
    }

    // Autenticación
    public function user(Request $request)
    {
        $user = $request->user();
        return response()->json($user);
    }

    // Actualizar perfil de usuario
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'imagen' => 'sometimes|string|nullable',
        ]);

        if ($request->has('name')) {
            $user->name = $request->name;
        }

        if ($request->has('email')) {
            $user->email = $request->email;
        }

        if ($request->has('imagen')) {
            $imageData = $request->input('imagen'); // base64 data URL

            // extraer la cadena base64 eliminando el prefijo 'data:image/jpeg;base64,'
            list($type, $imageData) = explode(';', $imageData);
            list(, $imageData)      = explode(',', $imageData);

            $imageData = base64_decode($imageData);

            // definir un nombre único para el archivo
            $imageName = time() . '.png'; // o usa la extensión adecuada

            // guardar archivo
            file_put_contents(public_path('storage/profile_photos/' . $imageName), $imageData);

            // guardar en DB
            $user->imagen = $imageName;
        }


        $user->save();

        return response()->json($user);
    }
}
