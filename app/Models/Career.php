<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    protected $table = 'careers';

    protected $fillable = [
        'slug',
        'title',
        'description',
        'requirement',
        'level',
        'employment_type',
        'location',
        'salary_min',
        'salary_max',
        'start_date',
        'end_date',
    ];
}
