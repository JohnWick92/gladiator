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
        Schema::create('requests', function (Blueprint $table) {
            $table->id('code');
            $table->text('description');
            $table->timestamp('request_date');
            $table->boolean('accepted')->default(false);
            $table->string('nip', 10);
            $table->foreign('nip')->references('nip')->on('users')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->string('location', 255);
            $table->boolean('closed')->default(false);
            $table->text('resolution')->default("");
            $table->boolean('canceled')->default(false);
            $table->string('priority', 25);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
