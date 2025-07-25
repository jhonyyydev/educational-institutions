<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('institutions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('rut')->unique();
            $table->foreignId('commune_id')->constrained('communes')->onDelete('restrict');
            $table->text('address');
            $table->string('phone')->nullable();
            $table->date('start_date');
            $table->foreignId('responsible_id')->constrained('users')->onDelete('restrict');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('institutions');
    }
};