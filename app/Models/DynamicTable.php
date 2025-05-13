<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DynamicTable extends Model
{
    protected $fillable = ['slug', 'name', 'status'];

    public function columns(): HasMany {
        return $this->hasMany(DynamicTableColumn::class, 'table_id');
    }

    public function rows(): HasMany {
        return $this->hasMany(DynamicTableRow::class, 'table_id');
    }
}
