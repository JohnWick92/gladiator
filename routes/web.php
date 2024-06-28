<?php

use App\Http\Controllers\OmController;
use App\Http\Controllers\SectorController;
use App\Http\Controllers\WorkshopController;
use Illuminate\Support\Facades\Route;

Route::resource('/om', OmController::class)->except('show');
Route::resource('/sector', SectorController::class)->except('show');
Route::resource('/workshop', WorkshopController::class)->except('show');
