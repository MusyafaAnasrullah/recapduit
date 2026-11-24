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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('code', 50)->nullable();
            $table->string('name', 100);
            $table->enum('type', ['expense', 'income']);
            $table->string('icon', 50)->default('Utensils');
            $table->string('color', 20)->default('#0284c7');
            $table->text('keywords')->nullable();
            $table->boolean('is_default')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
