<?php

namespace Tests;

use Illuminate\Support\Facades\Artisan;

trait MigrateFresh
{
    protected static $setUpHasRunOnce = false;

    public function setUp(): void
    {
        parent::setUp();
        if (!static::$setUpHasRunOnce) {
            Artisan::call('migrate:fresh');
            static::$setUpHasRunOnce = true;
        }
    }
}
