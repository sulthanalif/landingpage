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
        Schema::create('registers', function (Blueprint $table) {
            $table->id();
            $table->string('level');
            $table->string('name');
            $table->string('gender');
            $table->string('religion');
            $table->string('place_of_birth');
            $table->date('date_of_birth');
            $table->integer('phone');
            $table->string('email');
            $table->string('previous_school');
            $table->string('hobbi');
            $table->string('achievement');
            $table->string('father_name');
            $table->string('place_of_birth_father');
            $table->date('date_of_birth_father');
            $table->string('mother_name');
            $table->string('place_of_birth_mother');
            $table->date('date_of_birth_mother');
            $table->integer('number_of_siblings');
            $table->integer('phone_parent');
            $table->string('email_parent');
            $table->string('father_address');
            $table->string('mother_address');
            $table->string('student_residence_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registers');
    }
};
