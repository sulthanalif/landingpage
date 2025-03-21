<?php

namespace App\Models;

use App\LogsModelChanges;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use LogsModelChanges;

    protected $table = 'questions';

    protected $fillable = [
        'question',
        'answer',
        'status'
    ];
}
