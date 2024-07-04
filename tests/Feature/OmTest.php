<?php

namespace Tests\Feature;

use App\Models\Om;
use App\Models\User;
use Tests\MigrateFresh;
use Tests\TestCase as BaseTestCase;

class OmTest extends BaseTestCase
{
    use MigrateFresh;
    public function test_om_store(): void
    {
        $user = new User;
        $user->profile_description = 'Administrador';
        auth()->setUser($user);
        $this->call('POST', '/om', [
            'acronym' => 'teste',
            'description' => 'teste'
        ]);
        $this->assertDatabaseCount('oms', 1);
    }

    public function test_om_update(): void
    {
        $user = new User;
        $user->profile_description = 'Administrador';
        auth()->setUser($user);
        $this->call('PUT', '/om/' . Om::all()->first()->code, [
            'acronym' => 'update',
            'description' => 'teste'
        ]);
        $this->assertEquals(Om::all()->first()->acronym, 'update');
    }

    public function test_om_destroy(): void
    {

        $user = new User;
        $user->profile_description = 'Administrador';
        auth()->setUser($user);
        $this->call('DELETE', '/om/' . Om::all()->first()->code);
        $this->assertDatabaseCount('oms', 0);
    }
}
