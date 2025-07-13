<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reason extends Model
{
    protected $table = 'reasons';

    protected $fillable = [
        'reason',
        'css',
        'code',
    ];

    public function teachers(): HasMany
    {
        return $this->hasMany(Teacher::class, 'reason_id', 'id');
    }
}
