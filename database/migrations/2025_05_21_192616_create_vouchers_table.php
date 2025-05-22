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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained()->onDelete('cascade');
            $table->decimal('percentage', 4, 2);
            $table->string('code', 50)->unique();
            $table->boolean('status')->default(true);
            $table->boolean('is_claimed')->default(false);
            $table->timestamps();
        });

        Schema::create('payment_register_vouchers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_register_id')->constrained()->onDelete('cascade');
            $table->foreignId('voucher_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
