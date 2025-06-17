<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    protected $table = 'careers';

    protected $fillable = [
        'slug',
        'title',
        'description',
        'requirement',
        'level',
        'employment_type',
        'location',
        'salary_min',
        'salary_max',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    protected $appends = [
        'is_active',
    ];

    public function getIsActiveAttribute(): bool
    {
        return $this->start_date <= now() && $this->end_date >= now();
    }

    public function carrerRegisters()
    {
        return $this->hasMany(CarrerRegister::class);
    }
}
