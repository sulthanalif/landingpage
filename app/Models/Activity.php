<?php

namespace App\Models;

use App\LogsModelChanges;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use LogsModelChanges;

    protected $table = 'activities';

    protected $fillable = [
        'title',
        'date',
        'description',
        'category',
        'file',
        'status',
    ];
}
