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
        Schema::create('payment_registers', function (Blueprint $table) {
            $table->id();
            $table->string('key', 20)->unique();
            $table->foreignId('register_id')->constrained()->onDelete('cascade');
            $table->decimal('discount_biduk', 4, 2);
            $table->decimal('discount_lscs', 4, 2);
            $table->decimal('amount', 10, 2);
            $table->decimal('total', 10, 2);
            $table->boolean('status')->default(false);
            $table->timestamps();
        });

        Schema::create('payment_register_details', function (Blueprint $table) {
           $table->id();
           $table->foreignId('payment_register_id')->constrained()->onDelete('cascade');
           $table->enum('payment_method', ['cash', 'bca', 'bni', 'bri', 'mandiri', 'other'])->nullable();
           $table->decimal('amount', 10, 2);
           $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_registers');
        Schema::dropIfExists('payment_register_details');
    }
};
