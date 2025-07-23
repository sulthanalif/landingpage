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
        Schema::create('career_registers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('career_id')->index()->constrained()->onDelete('cascade');
            $table->string('name')->index();
            $table->string('email')->index();
            $table->string('location')->index();
            $table->date('birth_date')->index();
            $table->text('description');
            $table->string('cv');
            $table->string('phone_number')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carrer_registers');
    }
};
