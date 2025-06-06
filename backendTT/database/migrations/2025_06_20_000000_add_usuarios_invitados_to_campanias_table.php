<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('campanias', function (Blueprint $table) {
            $table->json('usuarios_invitados')->nullable()->after('fecha_creacion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('campanias', function (Blueprint $table) {
            $table->dropColumn('usuarios_invitados');
        });
    }
};
