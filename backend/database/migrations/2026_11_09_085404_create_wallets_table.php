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
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('code', 50)->nullable();
            $table->string('name', 100);
            $table->enum('type', ['cash', 'bank', 'ewallet'])->default('cash');
            $table->decimal('balance', 15, 2)->default(0);
            $table->string('account_number', 100)->nullable();
            $table->string('color', 20)->default('#0284c7');
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
