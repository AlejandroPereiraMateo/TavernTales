<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCampaniaUserTable extends Migration
{
    public function up()
    {
        Schema::create('campania_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('campania_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('campania_id')->references('id_campania')->on('campanias')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unique(['campania_id', 'user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('campania_user');
    }
}
