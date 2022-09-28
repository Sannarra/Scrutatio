<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companie_sectors', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('sector_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('companie_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companie_sectors');
    }
};