<?php

// phpcs:ignoreFile

use App\Http\Controllers\MaterialController;
use App\Http\Controllers\MaterialOsController;
use App\Http\Controllers\OmController;
use App\Http\Controllers\OsController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\SectorController;
use App\Http\Controllers\SolverOsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkshopController;
use App\Http\Middleware\AdminRoutes;
use App\Http\Middleware\EnsureAuthUser;
use App\Http\Middleware\InChargeRoutes;
use App\Http\Middleware\LocalAdminRoutes;
use App\Http\Middleware\SolverRoutes;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(EnsureAuthUser::class)->group(function () {
    Route::middleware(AdminRoutes::class)->group(function () {
        Route::resource('/om', OmController::class)->except('show');
    });

    Route::middleware(LocalAdminRoutes::class)->group(function () {
        Route::resource('/sector', SectorController::class)->except('show');
        Route::resource('/workshop', WorkshopController::class)->except('show');
        Route::resource('/user', UserController::class)->except('show');
    });

    Route::middleware(InChargeRoutes::class)->group(function () {
        Route::resource('/material', MaterialController::class)->except('show');
        Route::resource('/request', RequestController::class)->except(['show', 'create']);
    });

    Route::middleware(SolverRoutes::class)->group(function () {
        Route::resource('/os', OsController::class);
    });

    Route::group(['prefix' => '/os/manage'], function () {
        Route::put('/workshop/{id}', [OsController::class, 'changeWorkshop']);
        Route::put('/status/{id}', [OsController::class, 'changeStatus']);
        Route::put('/cancel/{id}', [OsController::class, 'cancelOs']);
        Route::put('/solve/{id}', [OsController::class, 'solve']);
        Route::put('/msg/{id}', [OsController::class, 'addMsg']);
        Route::post('/solvers/add/{id}', [SolverOsController::class, 'store']);
        Route::put('/solvers/remove/{id}', [SolverOsController::class, 'destroy']);
        Route::post('/material/add/{id}', [MaterialOsController::class, 'store']);
        Route::put('/material/use/{id}', [MaterialOsController::class, 'update']);
    });

    Route::get('/request/create', [RequestController::class, 'create']);
    Route::put('/request/close/{id}', [RequestController::class, 'close']);
    Route::get('/', [UserController::class, 'requests']);
    Route::get('/logout', [UserController::class, 'logout']);
    Route::get('/password', [UserController::class, 'password']);
    Route::put('/password', [UserController::class, 'reset']);
    Route::get('/report/os/{id}', [OsController::class, 'report']);
    Route::get('/report/request/{id}', [RequestController::class, 'report']);
    Route::get('/about', function () {
        return Inertia::render('About');
    });
});

Route::get('/login', [UserController::class, 'login']);
Route::post('/auth', [UserController::class, 'authenticate']);
