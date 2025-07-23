<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentRegisterVoucher extends Model
{
    protected $table = 'payment_register_vouchers';

    protected $fillable = [
        'payment_register_id',
        'voucher_id',
    ];

    public function paymentRegister(): BelongsTo
    {
        return $this->belongsTo(PaymentRegister::class);
    }

    public function voucher(): BelongsTo
    {
        return $this->belongsTo(Voucher::class);
    }
}
