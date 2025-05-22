<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentRegister extends Model
{
    protected $table = 'payment_registers';

    protected $fillable = [
        'key',
        'register_id',
        'discount_biduk',
        'discount_lscs',
        'amount',
        'total',
        'status',
    ];

    public function register(): BelongsTo
    {
        return $this->belongsTo(Register::class);
    }

    public function detail(): HasMany
    {
        return $this->hasMany(PaymentRegisterDetail::class);
    }

    public function vouchers(): HasMany
    {
        return $this->hasMany(PaymentRegisterVoucher::class);
    }
}
