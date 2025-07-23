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
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title')->index();
            $table->text('description');
            $table->text('requirement');
            $table->enum('level', ['fresh_graduate', 'experienced'])->index();
            $table->enum('employment_type', ['full_time', 'part_time', 'contract', 'freelance', 'internship'])->index();
            $table->string('location')->index();
            $table->decimal('salary_min', 10, 2)->index()->nullable();
            $table->decimal('salary_max', 10, 2)->index()->nullable();
            $table->date('start_date')->index();
            $table->date('end_date')->index()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('careers');
    }
};
