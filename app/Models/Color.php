<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $table = 'colors';

    protected $fillable = [
        'name',
        'css',
        'code',
    ];

    public function calendars()
    {
        return $this->hasMany(Calendar::class);
    }
}
