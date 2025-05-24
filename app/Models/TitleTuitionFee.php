<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TitleTuitionFee extends Model
{
    protected $table ='titles';

    protected $fillable = [
        'value',
    ];
}
