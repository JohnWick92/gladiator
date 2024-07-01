<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelRequest extends Model
{
    use HasFactory;
    protected $table = 'requests';
    protected $primaryKey = 'code';

    public function users()
    {
        return $this->belongsTo(User::class, 'nip');
    }
}
