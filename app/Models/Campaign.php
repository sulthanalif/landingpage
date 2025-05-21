<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $table = 'campaigns';

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'status',
    ];

    public function vouchers()
    {
        return $this->hasMany(Voucher::class);
    }
}
