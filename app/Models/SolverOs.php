<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolverOs extends Model
{
    use HasFactory;

    protected $primaryKey = 'code';

    public function users()
    {
        return $this->hasOne(User::class, 'nip');
    }
}
