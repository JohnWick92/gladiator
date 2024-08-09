<?php

namespace Tests\Feature;

use App\Models\Sector;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseCount;

test('sector index', function () {
    $user = User::factory()->create();
    $response = actingAs($user)->get('/sector');
    $response->assertOk();
});

test('sector create', function () {
    $user = User::factory()->create();
    $response = actingAs($user)->get('/sector/create');
    $response->assertOk();
});

test('sector edit', function () {
    $user = User::factory()->create();
    $sector = Sector::factory()->create();
    $response = actingAs($user)->get('/sector/'.$sector->code.'/edit');
    $response->assertOk();
});

test('sector store', function () {
    $user = User::factory()->create();
    actingAs($user)->post('/sector', [
        'description' => 'teste',
        'acronym' => 'teste',
        'codeOm' => $user->code_om,
    ]);
    assertDatabaseCount('sectors', 2);
});

test('sector update', function () {
    $user = User::factory()->create();
    $sector = Sector::factory()->create();
    actingAs($user)->put('/sector/'.$sector->code, [
        'description' => 'update',
        'acronym' => $sector->acronym,
        'codeOm' => $sector->code_om,
    ]);
    expect('update')->toEqual(Sector::query()->find($sector->code)->description);
});

test('sector destroy', function () {
    $user = User::factory()->create();
    $sector = Sector::factory()->create();
    assertDatabaseCount('sectors', 2);
    actingAs($user)->delete('/sector/'.$sector->code);
    assertDatabaseCount('sectors', 1);
});
