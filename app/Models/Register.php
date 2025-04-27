<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Register extends Model
{
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
}
