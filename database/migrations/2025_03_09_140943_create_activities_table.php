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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('label')->index();
            // $table->date('date');
            $table->string('description')->index();
            // $table->enum('category', ['foto', 'video']);
            $table->string('image');
            $table->boolean('status')->default(true);
            $table->timestamps();
        });

        Schema::create('sub_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')->index()->constrained('activities')->cascadeOnUpdate()->cascadeOnDelete();
            $table->date('date')->index();
            $table->string('title')->index();
            $table->string('description')->index();
            $table->string('image');
            $table->json('library')->nullable();
            $table->json('videos')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
        Schema::dropIfExists('sub_activities');
    }
};
