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
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->string('level')->index();
            $table->string('name')->index();
            $table->string('gender')->index();
            $table->string('religion')->index();
            $table->string('place_of_birth')->index();
            $table->date('date_of_birth')->index();
            $table->integer('phone')->index();
            $table->string('email')->index();
            $table->string('previous_school')->index();
            $table->string('hobbi')->index();
            $table->string('achievement')->index();
            $table->string('father_name')->index();
            $table->string('place_of_birth_father')->index();
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
        Schema::dropIfExists('enrollments');
    }
};
