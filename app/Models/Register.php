<?php

namespace App\Models;

use App\Models\DynamicTable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Register extends Model
{
    use Notifiable;

    protected $table = 'registers';

    protected $fillable = [
        'table_id',
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

    protected $appends = [
        'program_name'
    ];

    public function table(): BelongsTo
    {
        return $this->belongsTo(DynamicTable::class, 'table_id', 'id');
    }

    public function getProgramNameAttribute()
    {
        return DynamicTable::find($this->table_id)->name ?? '';
    }

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
