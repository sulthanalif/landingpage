<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accreditation extends Model
{
    protected $table = 'accreditations';

    protected $fillable = [
        'title',
        'description',
        'file',
        'status',
    ];
}
