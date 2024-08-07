<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialOs extends Model
{
    use HasFactory;

    protected $primaryKey = 'code';

    public static function where(string $string, mixed $id) {}
}
