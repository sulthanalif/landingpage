<?php

use Mary\Traits\Toast;
use App\Models\DynamicTable;
use Livewire\Volt\Component;
use App\Models\DynamicTableRow;
use App\Models\DynamicTableValue;
use App\Models\DynamicTableColumn;
use Illuminate\Support\Facades\DB;

new class extends Component {
    use Toast;

    public bool $modalAlertDelete = false;

    public string $name = '';
    public string $slug = '';
    public bool $status = true;

    public array $columns = [];
    public string $newColumnLabel = '';
    // public string $newColumnName = '';


    public array $rows = [];

    public function mount($slug = null)
    {
        if ($slug) {
            $table = DynamicTable::where('slug', $slug)
                ->with(['columns' => function ($q) {
                    $q->orderBy('order');
                }, 'rows.values'])
                ->firstOrFail();

            // Kolom: ['label' => ..., 'name' => ...]
            $this->columns = $table->columns->map(fn($col) => [
                'label' => $col->label,
                'name' => $col->name,
            ])->toArray();

            // Baris: [['r11', 'r12'], ['r21', 'r22']]
            $this->rows = $table->rows->map(function ($row) use ($table) {
                return $table->columns->map(function ($col) use ($row) {
                    return optional($row->values->firstWhere('column_id', $col->id))->value ?? '';
                })->toArray();
            })->toArray();


            $this->name = $table->name;
            $this->slug = $table->slug;
            $this->status = $table->status;
        } else {
            $this->newColumnLabel = 'Jenjang';
            // $this->newColumnName = 'level';
            $this->addColumn();
        }

        // dd($this->columns, $this->rows);
    }

    public function addColumn()
    {
        if (!$this->newColumnLabel) {
            $this->error('Column label are required!');
            return;
        }

        $this->columns[] = [
            'label' => $this->newColumnLabel,
            'name' => $this->newColumnLabel === 'Jenjang' ? 'level' : Str::slug($this->newColumnLabel, '_'),
        ];

        foreach ($this->rows as &$row) {
            $row[] = ''; // Tambah kolom kosong di semua baris
        }

        $this->newColumnLabel = '';
        // $this->newColumnName = '';
    }

    public function removeColumn($index)
    {
        unset($this->columns[$index]);
        $this->columns = array_values($this->columns);

        foreach ($this->rows as &$row) {
            unset($row[$index]);
            $row = array_values($row);
        }
    }

    public function addRow()
    {
        if (count($this->columns) === 0) {
            $this->error('Please add columns first!');
            return;
        }

        $this->rows[] = array_fill(0, count($this->columns), '');
    }

    public function removeRow($index)
    {
        unset($this->rows[$index]);
        $this->rows = array_values($this->rows);
    }

    public function save()
    {
        $this->validate([
            'name' => 'required',
        ]);

        // dd($this->columns, $this->rows);

        if (count($this->columns) === 0) return $this->error('Please add columns first!');

        if (count($this->rows) === 0) return $this->error('Please add rows first!');

        // Cek jika semua isi rows kosong (null, '', atau hanya whitespace)
        $allRowsEmpty = collect($this->rows)->every(function ($row) {
            return collect($row)->every(function ($cell) {
                return is_null($cell) || trim($cell) === '';
            });
        });

        if ($allRowsEmpty) {
            return $this->error('Rows cannot be empty!');
        }

        try {
            DB::beginTransaction();
            // 1. Simpan atau update tabel
            $table = $this->slug
                ? DynamicTable::where('slug', $this->slug)->firstOrFail()
                : DynamicTable::create([
                    'name' => $this->name,
                    'slug' => Str::slug($this->name),
                    'status' => $this->status,
                ]);

            if ($this->slug) {
                $table->update([
                    'name' => $this->name,
                    'status' => $this->status,
                ]);
            }

            // 2. Simpan atau update kolom
            $existingColumnIds = [];
            $columns = [];

            foreach ($this->columns as $order => $col) {
                $column = DynamicTableColumn::updateOrCreate(
                    ['table_id' => $table->id, 'name' => $col['name']],
                    ['label' => $col['label'], 'order' => $order]
                );
                $existingColumnIds[] = $column->id;
                $columns[] = $column;
            }

            // Hapus kolom yang tidak dipakai lagi
            DynamicTableColumn::where('table_id', $table->id)
                ->whereNotIn('id', $existingColumnIds)
                ->delete();

            // 3. Simpan atau update baris dan valuenya
            $existingRowIds = [];
            foreach ($this->rows as $rowIndex => $rowData) {
                // Coba ambil row berdasarkan urutan (atau bisa pakai id dari FE kalau ada)
                $row = $table->rows()->skip($rowIndex)->first();

                if (!$row) {
                    $row = DynamicTableRow::create(['table_id' => $table->id]);
                }

                $existingRowIds[] = $row->id;

                foreach ($columns as $index => $column) {
                    DynamicTableValue::updateOrCreate(
                        ['row_id' => $row->id, 'column_id' => $column->id],
                        ['value' => $rowData[$index] ?? '']
                    );
                }
            }

            // Hapus baris (dan valuenya) yang tidak terpakai
            $table->rows()
                ->whereNotIn('id', $existingRowIds)
                ->get()
                ->each(function ($row) {
                    $row->values()->delete();
                    $row->delete();
                });
            DB::commit();

            $this->success('Table created successfully', position: 'toast-bottom', redirectTo: route('tuition-fees'));
        } catch (\Exception $e) {
            DB::rollBack();
            Log::channel('debug')->error("message: '{$e->getMessage()}',  file: '{$e->getFile()}',  line: {$e->getLine()}");
            $this->error('Table creation failed!');
        }
    }

    public function delete()
    {
        try {
            DB::beginTransaction();
                $table = DynamicTable::where('slug', $this->slug)->firstOrFail();
                $table->delete();
            DB::commit();
            $this->success('Table deleted successfully', position: 'toast-bottom', redirectTo: route('tuition-fees'));
        } catch (\Exception $e) {
            DB::rollBack();
            Log::channel('debug')->error("message: '{$e->getMessage()}',  file: '{$e->getFile()}',  line: {$e->getLine()}");
            $this->error('Table deletion failed!');
        }
    }

    public function back()
    {
        $this->redirect(route('tuition-fees'), navigate: true);
    }

}; ?>

<div>
    <x-header title="{{ $slug != null ? 'Edit' : 'Create' }} Dynamic Table" separator>
        <x-slot:actions>
            <x-button label="Back" @click="$wire.back" icon="o-arrow-left" />
        </x-slot:actions>
    </x-header>

    <x-form wire:submit="save">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <x-card title="Tabel">
                    <x-input label="Name" wire:model="name" />

                    <div class="mt-5">
                        <x-toggle label="Status" hint="if checked, this table will be active" wire:model="status"  />
                    </div>
                </x-card>

                <x-card title="Columns">
                    <x-input label="Column Label" wire:model="newColumnLabel" />

                    {{-- <div class="mt-3">
                        <x-input label="Column Name" wire:model="newColumnName"  />
                    </div> --}}

                    <x-button label="Add Column" wire:click="addColumn" class="mt-3" />

                    <ul class="mt-4 space-y-1">
                        @foreach($columns as $i => $col)
                            <li class="flex justify-between items-center border p-2 rounded">
                                <span>{{ $col['label'] }} ({{ $col['name'] }})</span>
                                @if ($col['name'] != 'level')
                                    <x-button icon="o-trash" class="btn-sm btn-error text-white" wire:click="removeColumn({{ $i }})"  />
                                @else
                                    <p class="text-xs text-green-500">Primary Key</p>
                                @endif
                            </li>
                        @endforeach
                    </ul>
                </x-card>
            </div>

            <x-card title="Rows">
                <x-button label="Add Row" wire:click="addRow" class="mb-3" />
                <div class="overflow-auto max-h-96 border rounded">
                    <table class="w-full table-auto text-sm">
                        <thead class="bg-gray-100">
                            @if (count($columns) > 0)
                            <tr>
                                @foreach($columns as $col)
                                <th class="border px-2 py-1">{{ $col['label'] }}</th>
                                @endforeach
                                <th class="border px-2 py-1 w-10">Action</th>
                            </tr>
                            @else
                            <tr>
                                <td class="border px-2 py-1 text-center" colspan="{{ count($columns) + 1 }}">No columns added</td>
                            </tr>
                            @endif
                        </thead>
                        <tbody>
                            @foreach($rows as $rowIndex => $row)
                                <tr>
                                    @foreach($columns as $colIndex => $col)
                                        <td class="border p-1">
                                            <input type="text" wire:model="rows.{{ $rowIndex }}.{{ $colIndex }}" class="w-full border rounded px-1 py-2 ">
                                        </td>
                                    @endforeach
                                    <td class="border text-center">
                                        <x-button icon="o-trash" class="btn-error btn-sm text-white" wire:click="removeRow({{ $rowIndex }})" />
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </x-card>
        </div>

        <x-slot:actions>
            @if ($this->slug != null)
                <x-button label="Delete" icon="o-trash" class="btn-error" wire:click="modalAlertDelete = true" spinner wire:loading.attr="disabled" />
            @endif
            <x-button label="{{ $slug != null ? 'Update' : 'Create' }} Tabel" type="submit" icon="o-check" class="btn-primary" spinner="save" />
        </x-slot:actions>
    </x-form>

    @include('livewire.alerts.alert-delete')
</div>

