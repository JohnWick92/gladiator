<?php

use App\Http\Controllers\OmController;
use Illuminate\Support\Facades\Route;

Route::resource('/om', OmController::class)->except('show');
