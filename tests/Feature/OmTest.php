<?php

namespace Tests\Feature;

use App\Models\Om;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseCount;

test('om index', function () {
    $user = User::factory()->create();
    $response = actingAs($user)->get('/om');
    $response->assertOk();
});

test('om create', function () {
    $user = User::factory()->create();
    $response = actingAs($user)->get('/om/create');
    $response->assertOk();
});

test('om edit', function () {
    $user = User::factory()->create();
    $om = Om::factory()->create();
    $response = actingAs($user)->get('/om/'.$om->code.'/edit');
    $response->assertOk();
});

test('om store', function () {
    $user = User::factory()->create();
    actingAs($user)->post('/om', [
        'acronym' => 'test',
        'description' => 'test',
    ]);
    assertDatabaseCount('oms', 2);
});

test('om update', function () {
    $user = User::factory()->create();
    $om = Om::factory()->create();
    actingAs($user)->put('/om/'.$om->code, [
        'acronym' => 'update',
        'description' => $om->description,
    ]);
    expect('update')->toEqual(Om::query()->find($om->code)->acronym);
});

test('om destroy', function () {
    $user = User::factory()->create();
    $om = Om::factory()->create();
    assertDatabaseCount('oms', 2);
    actingAs($user)->delete('/om/'.$om->code);
    assertDatabaseCount('oms', 1);
});
