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
        Schema::create('dynamic_tables', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name')->index();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });

        Schema::create('dynamic_table_columns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_id')->constrained('dynamic_tables')->onDelete('cascade');
            $table->string('name')->index();
            $table->string('label')->index();
            $table->string('type')->index()->default('text');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('dynamic_table_rows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_id')->constrained('dynamic_tables')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('dynamic_table_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('row_id')->constrained('dynamic_table_rows')->onDelete('cascade');
            $table->foreignId('column_id')->constrained('dynamic_table_columns')->onDelete('cascade');
            $table->text('value')->nullable();
            $table->timestamps();
        });

        Schema::create('titles', function (Blueprint $table) {
            $table->id();
            $table->string('value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dynamic_table_values');
        Schema::dropIfExists('dynamic_table_rows');
        Schema::dropIfExists('dynamic_table_columns');
        Schema::dropIfExists('dynamic_tables');
    }
};
