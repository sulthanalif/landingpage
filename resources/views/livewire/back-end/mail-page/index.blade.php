<?php

use App\Models\MailBox;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use function Livewire\Volt\{state, with, uses, title, usesPagination};

usesPagination(theme: 'bootstrap');

uses([LivewireAlert::class]);

title('Mail Box');

state([
    'id' => '',
    'first_name' => '',
    'last_name' => '',
    'email' => '',
    'phone' => '',
    'subject' => '',
    'message' => '',
    'perPage' => 10,
    'search' => '',
]);

with(
    fn() => [
        'mails' => MailBox::query()
            ->where(function ($query) {
                $query->where('first_name', 'like', "%{$this->search}%")->orWhere('last_name', 'like', "%{$this->search}%");
            })
            ->orWhere('email', 'like', "%{$this->search}%")
            ->orWhere('phone', 'like', "%{$this->search}%")
            ->orWhere('subject', 'like', "%{$this->search}%")
            ->orderBy('created_at', 'desc')
            ->paginate($this->perPage),
    ],
);

$modalDelete = fn($id) => ($this->id = $id);

$delete = function () {
    try {
        DB::beginTransaction();
        MailBox::find($this->id)->delete();
        DB::commit();
        $this->reset('id');
        $this->alert('success', 'Mail berhasil dihapus');
        $this->dispatch('delete');
    } catch (\Exception $e) {
        DB::rollBack();
        $this->reset('id');
        $this->alert('error', 'Mail gagal dihapus');

        Log::channel('debug')->error('Error: ' . $e->getMessage(), [
            'exception' => $e,
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'code' => $e->getCode(),
            'trace' => $e->getTraceAsString(),
        ]);
    }
};

$show = function ($id) {
    $mail = MailBox::find($id);

    $this->first_name = $mail->first_name;
    $this->last_name = $mail->last_name;
    $this->email = $mail->email;
    $this->phone = $mail->phone;
    $this->subject = $mail->subject;
    $this->message = $mail->message;
};

?>
@script
    <script>
        Livewire.on('delete', () => {
            $('#modalDelete').modal('hide');
        });
    </script>
@endscript

<div>
    <div class="card shadow mb-4">
        <div class="card-header d-flex justify-content-between items-center py-3">
            <h3 class="m-0 font-weight-bold text-primary">Mail Box</h3>
            <div class="float-right">
                <!-- Button trigger modal -->

            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <div class="d-flex justify-content-between items-center my-3">
                    <div>
                        <select class="form-control form-select" wire:model.live='perPage'
                            aria-label="Default select example">
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="mr-2">
                        <form class="navbar-search">
                            <div class="input-group">
                                <input type="text" class="form-control bg-light border-0 small"
                                    wire:model.live='search' placeholder="Search for..." aria-label="Search"
                                    aria-describedby="basic-addon2">
                            </div>
                        </form>
                    </div>
                </div>
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Created_at</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Created_at</th>
                            <th></th>
                        </tr>
                    </tfoot>
                    <tbody>
                        @forelse ($mails as $mail)
                            <tr>
                                <td>{{ $mail->first_name }} {{ $mail->last_name }}</td>
                                <td>{{ $mail->email }}</td>
                                <td>{{ $mail->phone ?? '-' }}</td>
                                <td>{{ $mail->subject }}</td>
                                <td>{{ strlen($mail->message) > 25 ? substr($mail->message, 0, 25) . '...' : $mail->message }}
                                </td>
                                <td>{{ $mail->created_at->format('d/m/Y') }}</td>
                                <td style="width: 10%">
                                    @can('mail-show')
                                        <a href="#" class="btn btn-sm btn-primary"
                                            wire:click="show({{ $mail->id }})" data-toggle="modal"
                                            data-target="#exampleModal"><i class="fas fa-eye"></i></a>
                                    @endcan
                                    @can('mail-delete')
                                        <a href="#" class="btn btn-sm btn-danger"
                                            wire:click='modalDelete({{ $mail->id }})' data-toggle="modal"
                                            data-target="#modalDelete"><i class="fas fa-trash"></i></a>
                                    @endcan
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="7" class="text-center">No mail found</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
                {{ $mails->links(data: ['scrollTo' => false]) }}
            </div>
        </div>
    </div>
    @include('livewire.back-end.mail-page.show')
    @include('livewire.back-end.modals.delete')
</div>
