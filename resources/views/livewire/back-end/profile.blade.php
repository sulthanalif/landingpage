<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use function Livewire\Volt\{state, title, uses};

title('Profile');

uses([LivewireAlert::class]);

state([
    'name' => auth()->user()->name,
    'email' => auth()->user()->email,
    'password' => '',
]);

$updateProfile = function () {
    $this->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users,email,' . auth()->user()->id,
        'password' => 'nullable',
    ]);

    try {
        DB::beginTransaction();
        auth()
            ->user()
            ->update([
                'name' => $this->name,
                'email' => $this->email,
            ]);

        if ($this->password) {
            auth()
                ->user()
                ->update(['password' => Hash::make($this->password)]);
        }

        DB::commit();
        $this->alert('success', 'Profile berhasil diupdate');
    } catch (\Throwable $th) {
        DB::rollBack();
        $this->alert('error', 'Profile gagal diupdate');
        Log::channel('debug')->error('Error: ' . $th->getMessage(), [
            'exception' => $th,
            'file' => $th->getFile(),
            'line' => $th->getLine(),
            'code' => $th->getCode(),
            'trace' => $th->getTraceAsString(),
        ]);
    }
};

?>

<div>
    <div class="card shadow mb-4">
        <div class="card-header d-flex justify-content-between items-center py-3">
            <h3 class="m-0 font-weight-bold text-primary"><i class="fas fa-fw fa-user"></i> Profile</h3>
            <div class="float-right">
                <!-- Button trigger modal -->

            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" wire:model="name">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" wire:model="email">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="password">Password <span class="text-muted">(Isi jika ingin diubah)</span></label>
                        <input type="password" class="form-control" id="password" wire:model="password">
                    </div>
                </div>
            </div>

            <div class="modal-footer w-full">
                <button type="buttom" class="btn btn-primary" wire:click='updateProfile'>Save</button>
            </div>

        </div>
    </div>
</div>
