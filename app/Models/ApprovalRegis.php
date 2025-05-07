<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApprovalRegis extends Model
{
    protected $fillable = [
        'register_id',
        'user_id',
        'status',
        'is_reject',
        'note',
    ];

    public function register()
    {
        return $this->belongsTo(Register::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
