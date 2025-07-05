<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $fillable = [
        'label',
        'description',
        'color_id',
        'start_date',
        'end_date',
        'status'
    ];

    public function color()
    {
        return $this->belongsTo(Color::class);
    }
}
