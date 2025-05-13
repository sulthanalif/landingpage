<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DynamicTableColumn extends Model
{
    protected $fillable = ['table_id', 'name', 'label', 'type', 'order'];

    public function table(): BelongsTo {
        return $this->belongsTo(DynamicTable::class, 'table_id');
    }
}
