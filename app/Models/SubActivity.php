<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\AsCollection;

class SubActivity extends Model
{
    protected $table = 'sub_activities';

    protected $fillable = [
        'activity_id',
        'title',
        'date',
        'description',
        'image',
        'library',
        'videos',
        'status',
    ];

    protected $casts = [
        'library' => AsCollection::class,
        'videos' => AsCollection::class,
    ];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
