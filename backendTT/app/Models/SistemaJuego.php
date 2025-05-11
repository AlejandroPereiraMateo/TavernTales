<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SistemaJuego extends Model
{
    use HasFactory;

    protected $table = 'sistema_juego';
    protected $primaryKey = 'id_sistema';

    protected $fillable = [
        'nombre',
        'descripcion',
    ];
}
