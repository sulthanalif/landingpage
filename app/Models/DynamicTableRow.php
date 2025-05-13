<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DynamicTableRow extends Model
{
    protected $fillable = ['table_id'];

    public function table(): BelongsTo {
        return $this->belongsTo(DynamicTable::class, 'table_id');
    }

    public function values(): HasMany {
        return $this->hasMany(DynamicTableValue::class, 'row_id');
    }
}
