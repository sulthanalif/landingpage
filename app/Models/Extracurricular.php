<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Extracurricular extends Model
{
    protected $table = 'extracurriculars';

    protected $fillable = [
        'name',
        'description',
        'image',
        'status',
    ];
}
