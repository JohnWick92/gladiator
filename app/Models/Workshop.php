<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    use HasFactory;

    protected $primaryKey = 'code';

    public function oms()
    {
        return $this->belongsTo(Om::class, 'code_om');
    }
}
