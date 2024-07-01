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
        Schema::create('users', function (Blueprint $table) {
            $table->string('nip', 10);
            $table->primary('nip');
            $table->string('email', 100);
            $table->string('name', 255);
            $table->string('password', 255);
            $table->string('branch', 9);
            $table->string('profile_description', 150);
            $table->boolean('active');
            $table->boolean('solver');
            $table->bigInteger('code_om');
            $table->foreign('code_om')->references('code')
                ->on('oms')->onDelete('cascade')->onUpdate('cascade');
            $table->bigInteger('code_sector');
            $table->foreign('code_sector')->references('code')
                ->on('sectors')->onDelete('cascade')->onUpdate('cascade');
            $table->bigInteger('code_workshop')->nullable();
            $table->foreign('code_workshop')->references('code')
                ->on('workshops')->nullOnDelete()->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
