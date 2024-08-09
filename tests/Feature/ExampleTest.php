<?php

namespace Tests\Feature;

use function Pest\Laravel\get;

it('returns a successful response', function () {
    $response = get('/');

    $response->assertStatus(302);
});
