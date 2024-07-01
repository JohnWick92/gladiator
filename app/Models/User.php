<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;
    protected $primaryKey = 'nip';
    public $incrementing = false;
    public $keyType = 'string';

    public function sectors()
    {
        return $this->belongsTo(Sector::class, 'code_sector');
    }
}
