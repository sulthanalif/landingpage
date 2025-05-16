<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentRegisterDetail extends Model
{
    protected $table = 'payment_register_details';

    protected $fillable = [
        'payment_register_id', 'payment_method', 'amount',
    ];

    public function paymentRegister(): BelongsTo
    {
        return $this->belongsTo(PaymentRegister::class);
    }
}
