<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $table = 'teachers';

    protected $fillable = [
        'code_id',
        'name',
        'email',
        'category',
        'position',
        'order',
        'logo',
        'image',
        'description',
        'status',
    ];
}
