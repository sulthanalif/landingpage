<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CareerRegister extends Model
{
    protected $table = 'career_registers';

    protected $fillable = [
        'career_id',
        'name',
        'email',
        'location',
        'birth_date',
        'description',
        'cv',
        'phone_number'
    ];

    public function career()
    {
        return $this->belongsTo(Career::class);
    }
}
