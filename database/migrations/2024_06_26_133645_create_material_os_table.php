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
        Schema::create('material_os', function (Blueprint $table) {
            $table->id('code');
            $table->integer('amount');
            $table->integer('quantity_used');
            $table->boolean('used');
            $table->timestamp('order_date');
            $table->string('code_material', 50);
            $table->foreign('code_material')->references('code')
                ->on('materials')->onDelete('cascade')->onUpdate('cascade');
            $table->bigInteger('code_os');
            $table->foreign('code_os')->references('code')
                ->on('os')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material_os');
    }
};
