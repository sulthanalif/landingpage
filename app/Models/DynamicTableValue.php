<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DynamicTableValue extends Model
{
    protected $fillable = ['row_id', 'column_id', 'value'];

    public function row(): BelongsTo {
        return $this->belongsTo(DynamicTableRow::class, 'row_id');
    }

    public function column(): BelongsTo {
        return $this->belongsTo(DynamicTableColumn::class, 'column_id');
    }
}
