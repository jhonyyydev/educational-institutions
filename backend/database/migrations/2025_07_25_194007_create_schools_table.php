<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('rut')->unique();
            $table->foreignId('commune_id')->constrained('communes')->onDelete('restrict');
            $table->text('address');
            $table->string('phone')->nullable();
            $table->foreignId('institution_id')->constrained('institutions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};