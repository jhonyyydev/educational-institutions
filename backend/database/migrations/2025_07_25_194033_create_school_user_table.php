<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_user', function (Blueprint $table) {
            $table->id('school_user_id');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('school_id')->constrained('schools')->onDelete('cascade');
            $table->date('assignment_date');
            $table->date('unassignment_date')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
            
            $table->unique(['user_id', 'school_id', 'active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_user');
    }
};