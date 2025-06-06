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
        'usuarios_invitados',
    ];

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'campania_user', 'campania_id', 'user_id');
    }

    public function master()
    {
        return $this->belongsTo(User::class, 'master_id', 'id');
    }

}
