<?php

namespace Tests\Feature;

use App\Models\Om;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase as BaseTestCase;

class OmTest extends BaseTestCase
{
    use RefreshDatabase;

    private function fakeOm(): void
    {
        $om = new Om;
        $om->acronym = 'teste';
        $om->description = 'teste';
        $om->save();
    }

    private function fakeUser(): void
    {
        $user = new User;
        $user->profile_description = 'Administrador';
        auth()->setUser($user);
    }

    public function test_om_store(): void
    {
        $this->fakeUser();
        $this->call('POST', '/om', [
            'acronym' => 'teste',
            'description' => 'teste'
        ]);
        $this->assertDatabaseCount('oms', 1);
    }

    public function test_om_update(): void
    {
        $this->fakeUser();
        $this->fakeOm();
        $this->call('PUT', '/om/' . Om::all()->first()->code, [
            'acronym' => 'update',
            'description' => 'teste'
        ]);
        $this->assertEquals(Om::all()->first()->acronym, 'update');
    }

    public function test_om_destroy(): void
    {
        $this->fakeUser();
        $this->fakeOm();
        $this->assertDatabaseCount('oms', 1);
        $this->call('DELETE', '/om/' . Om::all()->first()->code);
        $this->assertDatabaseCount('oms', 0);
    }
}
