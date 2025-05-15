<?php

namespace App\Models;

use App\Models\DynamicTableRow;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TuitionFee extends DynamicTableRow
{
    protected $table = 'dynamic_table_rows';

    /**
     * Relasi ke tabel dynamic_tables
     */
    public function table(): BelongsTo
    {
        return $this->belongsTo(DynamicTable::class, 'table_id');
    }

    /**
     * Relasi ke values (cell) milik row ini
     */
    public function values(): HasMany
    {
        return $this->hasMany(DynamicTableValue::class, 'row_id')->with('column');
    }

    /**
     * Ambil semua kolom dari tabel dinamis
     */
    public function getColumnsAttribute()
    {
        return $this->table->columns()->orderBy('order')->get();
    }

    /**
     * Mengubah value menjadi array: [column_name => value]
     */
    public function getFormattedValuesAttribute()
    {
        return $this->values->mapWithKeys(function ($value) {
            $columnName = $value->column->name ?? 'col_' . $value->column_id;
            return [$columnName => $value->value];
        })->toArray();
    }

    /**
     * Helper static untuk mengambil semua Tuition Fee berdasarkan slug tabel
     */
    public static function fromTableSlug(string $slug)
    {
        $table = DynamicTable::where('slug', $slug)->firstOrFail();

        return self::where('table_id', $table->id)
            ->with(['values.column', 'table.columns'])
            ->get();
    }

    public static function getAllTable()
    {
        $tables = DynamicTable::with(['columns'])->get();

        return $tables->map(function ($table) {
            $rows = self::where('table_id', $table->id)
                ->with(['values.column'])
                ->get()
                ->map(function ($row) {
                    return $row->formatted_values;
                });

            return [
                'table' => $table->only(['id', 'name', 'slug']),
                'columns' => $table->columns->map(fn ($col) => $col->only(['id', 'label', 'order'])),
                'rows' => $rows,
            ];
        });
    }

}
