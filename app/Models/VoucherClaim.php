<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VoucherClaim extends Model
{
    protected $table = 'voucher_claims';

    protected $fillable = [
        'register_id',
        'voucher_id',
    ];

    public function voucher()
    {
        return $this->belongsTo(Voucher::class);
    }

    public function register()
    {
        return $this->belongsTo(Register::class);
    }
}
