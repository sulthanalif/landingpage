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
        Schema::create('colors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('css')->nullable();
            $table->string('code')->nullable();
            $table->timestamps();
        });

        Schema::create('calendars', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('description')->nullable();
            $table->foreignId('color_id')->constrained('colors')->cascadeOnUpdate()->cascadeOnDelete();
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calendars');
    }
};
