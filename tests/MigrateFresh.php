<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabaseState;
use Illuminate\Support\Facades\Artisan;

trait MigrateFresh
{
    public function setUp(): void
    {
        parent::setUp();
        if (! RefreshDatabaseState::$migrated) {
            Artisan::call('migrate:fresh');
            RefreshDatabaseState::$migrated = true;
        }
    }
}
