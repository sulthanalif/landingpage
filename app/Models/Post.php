<?php

namespace App\Models;

use App\LogsModelChanges;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use LogsModelChanges, SoftDeletes;

    protected $table = 'posts';

    protected $fillable = [
        'title',
        'sub_title',
        'slug',
        'body',
        'image',
        'category_id',
        'user_id',
        'status',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
