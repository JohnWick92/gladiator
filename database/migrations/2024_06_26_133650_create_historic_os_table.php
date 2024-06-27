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
        Schema::create('historic_os', function (Blueprint $table) {
            $table->id('code');
            $table->string('operation', 60);
            $table->timestamp('change_date');
            $table->bigInteger('code_os');
            $table->foreign('code_os')->references('code')
                ->on('os')->onDelete('cascade')->onUpdate('cascade');
            $table->string('nip', 10);
            $table->foreign('nip')->references('nip')
                ->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historic_os');
    }
};
