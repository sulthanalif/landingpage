<?php

namespace App\Models;

use App\LogsModelChanges;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MailBox extends Model
{
    use LogsModelChanges, SoftDeletes;

    protected $table = 'mail_boxes';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'to',
    ];
}
