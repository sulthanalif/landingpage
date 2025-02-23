<?php

namespace App\Models;

use App\LogsModelChanges;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use LogsModelChanges, SoftDeletes;

    protected $table = 'categories';

    protected $fillable = [
        'name',
        'description',
        'status'
    ];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
