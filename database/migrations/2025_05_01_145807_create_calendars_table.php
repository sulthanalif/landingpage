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
            $table->string('name')->index();
            $table->string('css')->nullable();
            $table->string('code')->nullable();
            $table->timestamps();
        });

        Schema::create('calendars', function (Blueprint $table) {
            $table->id();
            $table->string('label')->index();
            $table->string('description')->index()->nullable();
            $table->foreignId('color_id')->index()->constrained('colors')->cascadeOnUpdate()->cascadeOnDelete();
            $table->date('start_date')->index();
            $table->date('end_date')->index();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('colors');
        Schema::dropIfExists('calendars');
    }
};
