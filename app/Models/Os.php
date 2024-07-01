<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Os extends Model
{
    use HasFactory;
    protected $primaryKey = 'code';

    public function oms()
    {
        return $this->belongsTo(Om::class, 'code_om');
    }

    public function workshops()
    {
        return $this->belongsTo(Workshop::class, 'code_workshop');
    }

    public function requests()
    {
        return $this->belongsTo(ModelRequest::class, 'code_request');
    }

    public function materials_os()
    {
        return $this->hasMany(MaterialOs::class, 'code_os');
    }

    public function solver_os()
    {
        return $this->hasMany(SolverOs::class, 'code_os');
    }
}
