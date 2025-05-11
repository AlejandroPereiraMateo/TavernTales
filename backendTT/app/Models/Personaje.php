<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personaje extends Model
{
    use HasFactory;

    protected $table = 'personajes';
    protected $primaryKey = 'id_personaje';

    protected $fillable = [
        'nombre',
        'atributos',
        'sistema_id',
        'usuario',
        'campania_id',
    ];
}
