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
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title', 191);
            $table->decimal('amount', 15, 2)->nullable();
            $table->string('time', 10);
            $table->text('days')->nullable();
            $table->enum('channel', ['whatsapp', 'telegram'])->default('whatsapp');
            $table->enum('type', ['tagihan', 'catat_harian', 'laporan'])->default('catat_harian');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reminders');
    }
};
