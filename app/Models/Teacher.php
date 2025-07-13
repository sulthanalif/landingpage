<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'reson_id',
    ];

    public function reason(): BelongsTo
    {
        return $this->belongsTo(Reason::class, 'reason_id', 'id');
    }
}
