<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Register extends Model
{
    use Notifiable;

    protected $table = 'registers';

    protected $fillable = [
        'level',
        'name',
        'gender',
        'religion',
        'place_of_birth',
        'date_of_birth',
        'phone',
        'email',
        'previous_school',
        'hobbi',
        'achievement',
        'father_name',
        'place_of_birth_father',
        'date_of_birth_father',
        'mother_name',
        'place_of_birth_mother',
        'date_of_birth_mother',
        'number_of_siblings',
        'phone_parent',
        'email_parent',
        'father_address',
        'mother_address',
        'student_residence_status'
    ];

    public function approvalRegis(): HasOne
    {
        return $this->hasOne(ApprovalRegis::class);
    }

    public function paymentRegister(): HasOne
    {
        return $this->hasOne(PaymentRegister::class);
    }

    public function voucherClaim(): HasOne
    {
        return $this->hasOne(VoucherClaim::class);
    }
}
