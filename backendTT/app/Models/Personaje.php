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
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
