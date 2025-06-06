<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUsuariosInvitadosToCampaniasTable extends Migration
{
    public function up()
    {
        Schema::table('campanias', function (Blueprint $table) {
            $table->json('usuarios_invitados')->nullable()->after('fecha_creacion');
        });
    }

    public function down()
    {
        Schema::table('campanias', function (Blueprint $table) {
            $table->dropColumn('usuarios_invitados');
        });
    }
}
