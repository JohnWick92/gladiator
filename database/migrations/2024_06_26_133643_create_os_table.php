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
        Schema::create('os', function (Blueprint $table) {
            $table->id('code');
            $table->string('status', 100)->default('Aberta');
            $table->timestamp('completion_date')->nullable();
            $table->text('observation_solver')->default('')->nullable();
            $table->text('observation_in_charge')->default('')->nullable();
            $table->string('priority', 100);
            $table->text('complaint')->default('')->nullable();
            $table->string('satisfaction', 25)->default('')->nullable();
            $table->boolean('closed')->default(false);
            $table->boolean('canceled')->default(false);
            $table->boolean('req_canceled')->default(false);
            $table->boolean('solved')->default(false);
            $table->bigInteger('code_om');
            $table->foreign('code_om')->references('code')
                ->on('oms')->onDelete('cascade')->onUpdate('cascade');
            $table->bigInteger('code_request');
            $table->foreign('code_request')->references('code')
                ->on('requests')->onDelete('cascade')->onUpdate('cascade');
            $table->bigInteger('code_workshop');
            $table->foreign('code_workshop')->references('code')
                ->on('workshops')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('os');
    }
};
