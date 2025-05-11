<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campania extends Model
{
    use HasFactory;

    protected $table = 'campanias';
    protected $primaryKey = 'id_campania';

    protected $fillable = [
        'nombre',
        'descripcion',
        'sistema_id',
        'master_id',
        'fecha_creacion',
    ];
}
