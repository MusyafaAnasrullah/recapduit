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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('wallet_id')->nullable()->constrained('wallets')->onDelete('set null');
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->string('category_name', 100);
            $table->decimal('amount', 15, 2);
            $table->enum('type', ['expense', 'income']);
            $table->text('note')->nullable();
            $table->date('transaction_date');
            $table->bigInteger('timestamp')->nullable();
            $table->enum('source', ['whatsapp', 'manual', 'telegram'])->default('whatsapp');
            $table->json('tags')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
