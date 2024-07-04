<?php

namespace Tests\Feature;

use App\Models\Om;
use App\Models\Sector;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SectorTest extends TestCase
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

    private function fakeSector(): void
    {
        $this->fakeOm();
        $sector = new Sector;
        $sector->description = 'fake';
        $sector->acronym = 'fake';
        $sector->code_om = Om::all()->first()->code;
        $sector->save();
    }

    public function test_sector_index(): void
    {
        $this->fakeUser();
        $response = $this->call('GET', '/sector');
        $response->assertOk();
    }


    public function test_sector_create(): void
    {
        $this->fakeUser();
        $response = $this->call('GET', '/sector/create');
        $response->assertOk();
    }


    public function test_sector_edit(): void
    {
        $this->fakeUser();
        $this->fakeSector();
        $response = $this->call('GET', '/sector/' . Sector::all()->first()->code . '/edit');
        $response->assertOk();
    }

    public function test_sector_store(): void
    {
        $this->fakeUser();
        $this->fakeOm();
        $this->call('POST', '/sector', [
            'description' => 'teste',
            'acronym' => 'teste',
            'codeOm' => Om::all()->first()->code,
        ]);
        $this->assertDatabaseCount('sectors', 1);
    }

    public function test_sector_update(): void
    {
        $this->fakeUser();
        $this->fakeSector();
        $sector = Sector::all()->first();
        $this->call('PUT', '/sector/' . $sector->code, [
            'description' => 'update',
            'acronym' => $sector->acronym,
            'codeOm' => $sector->code_om,
        ]);
        $this->assertEquals(Sector::find($sector->code)->description, 'update');
    }

    public function test_sector_destroy()
    {
        $this->fakeUser();
        $this->fakeOm();
        $this->fakeSector();
        $this->assertDatabaseCount('sectors', 1);
        $this->call('DELETE', '/sector/' . Sector::all()->first()->code);
        $this->assertDatabaseCount('sectors', 0);
    }
}
