<?php

use Mary\Traits\Toast;
use App\Models\Register;
use Livewire\Volt\Component;
use App\Models\ApprovalRegis;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

new class extends Component {
    use Toast;

    public Register $register;

    public string $selectedTab = 'student-tab';

    public bool $modalAlertAction = false;
    public bool $openNote = false;


    //var
    public string $status = '';
    public string $note = '';
    public array $varAction = ['status', 'note'];


    public function mount(Register $register)
    {
        $this->register = $register;
    }

    public function saveAction(): void
    {
        $this->validate([
            'status' => 'required|string',
            'note' => 'nullable|string|max:500',
        ]);

        try {
            $checkApproval = $this->register->approvalRegis()->first();
            // dd($checkApproval);
            DB::beginTransaction();
            if ($checkApproval) {
                $checkApproval->update([
                    'user_id' => auth()->user()->id,
                    'status' => $this->status == 'approved' ? true : false,
                    'is_reject' => $this->status == 'rejected' ? true : false,
                    'note' => $this->note,
                ]);
            } else {
                ApprovalRegis::create([
                    'user_id' => auth()->user()->id,
                    'register_id' => $this->register->id,
                    'status' => $this->status == 'approved' ? true : false,
                    'is_reject' => $this->status == 'rejected' ? true : false,
                    'note' => $this->note,
                ]);
            }

            //notif
            Notification::route('mail', $this->register->email)
                ->notify(new \App\Notifications\ActionRegisNotification($this->register));
            Notification::route('mail', $this->register->email_parent)
                ->notify(new \App\Notifications\ActionRegisNotification($this->register));

            DB::commit();
            $this->modalAlertAction = false;
            $this->reset($this->varAction);
            $this->success('Data berhasil disimpan', position: 'toast-bottom');
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error('Data gagal disimpan', position: 'toast-bottom');
            Log::channel('debug')->error("message: '{$e->getMessage()}',  file: '{$e->getFile()}',  line: {$e->getLine()}");
        }
    }

}; ?>

@script
    <script>
        $js('action', () => {
            $wire.modalAlertAction = true
        })
        // Livewire.on('statusChanged', value => {
        //     $js.openNote(value)
        // })
        $js('openNote', (value) => {
            // console.log(value);

            if(value == 'rejected') {
                $wire.openNote = true;
            } else {
                $wire.openNote = false;
            }

            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Detail Student" separator>
        <x-slot:actions>
                {{-- <x-button label="Action" class="btn-primary" responsive  @click="$js.action" /> --}}
                <x-button label="Back" responsive icon="o-arrow-left" link="{{ route('enrollment') }}" />
        </x-slot:actions>
    </x-header>

    <x-card>
        <x-tabs wire:model="selectedTab" >
            <x-tab name="student-tab" label="Student Personal Data">
                <div class="p-4">
                    <table class="table-auto w-full [&>tbody>tr>td]:py-2">
                        <tbody>
                            <tr class="border-b">
                                <td class="font-bold">Program</td>
                                <td>{{ $register->program_name }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Level</td>
                                <td>{{ $register->level }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Name</td>
                                <td>{{ $register->name }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Gender</td>
                                <td>{{ $register->gender }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Religion</td>
                                <td>{{ $register->religion }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Place of Birth</td>
                                <td>{{ $register->place_of_birth }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Date of Birth</td>
                                <td>{{ $register->date_of_birth }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Phone</td>
                                <td>{{ $register->phone }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Email</td>
                                <td>{{ $register->email }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Previous School</td>
                                <td>{{ $register->previous_school }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Hobbies</td>
                                <td>{{ $register->hobbi }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Achievement</td>
                                <td>{{ $register->achievement }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </x-tab>
            <x-tab name="parent-tab" label="Student Parent Data" >
                <div class="p-4">
                    <table class="table-auto w-full [&>tbody>tr>td]:py-2">
                        <tbody>
                            <tr class="border-b">
                                <td class="font-bold">Father Name</td>
                                <td>{{ $register->father_name }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Place of Birth Father</td>
                                <td>{{ $register->place_of_birth_father }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Date of Birth Father</td>
                                <td>{{ $register->date_of_birth_father }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Mother Name</td>
                                <td>{{ $register->mother_name }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Place of Birth Mother</td>
                                <td>{{ $register->place_of_birth_mother }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Date of Birth Mother</td>
                                <td>{{ $register->date_of_birth_mother }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Number of Siblings</td>
                                <td>{{ $register->number_of_siblings }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Phone Parent</td>
                                <td>{{ $register->phone_parent }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Email Parent</td>
                                <td>{{ $register->email_parent }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </x-tab>
            <x-tab name="address-tab" label="Student Address Data" >
                <div class="p-4">
                    <table class="table-auto w-full [&>tbody>tr>td]:py-2">
                        <tbody>
                            <tr class="border-b">
                                <td class="font-bold">Father Address</td>
                                <td>{{ $register->father_address }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Mother Address</td>
                                <td>{{ $register->mother_address }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Student Residence Status</td>
                                <td>{{ $register->student_residence_status }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </x-tab>
            <x-tab name="payment" label="Student Payment Data" >
                <div class="p-4">
                    <table class="table-auto w-full [&>tbody>tr>td]:py-2">
                        <tbody>
                            <tr class="border-b">
                                <td class="font-bold">Amount</td>
                                <td>Rp.{{ number_format($register->paymentRegister->amount ?? 0, 0, ',', '.') }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Discount Biduk ({{ number_format($register->paymentRegister->discount_biduk ?? 0, 0, ',', '.') }}%)</td>
                                <td>Rp.{{ number_format(($register->paymentRegister->amount * $register->paymentRegister->discount_biduk) / 100, 0, ',', '.') }} </td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Discount LSCS ({{ number_format($register->paymentRegister->discount_lscs ?? 0, 0, ',', '.') }}%)</td>
                                <td>Rp.{{ number_format(($register->paymentRegister->amount * $register->paymentRegister->discount_lscs) / 100, 0, ',', '.') }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Discount Feeder ({{ number_format($register->paymentRegister->discount_feeder ?? 0, 0, ',', '.') }}%)</td>
                                <td>Rp.{{ number_format(($register->paymentRegister->amount * $register->paymentRegister->discount_feeder) / 100, 0, ',', '.') }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Voucher {{ $register->paymentRegister?->vouchers()->exists() ? $register->paymentRegister->vouchers->first()->voucher->campaign->name.'-'.$register->paymentRegister->vouchers->first()->voucher->code.'('.number_format($register->paymentRegister->vouchers->first()->voucher->percentage, 0, ',', '.').'%)' : '' }}</td>
                                <td>{{ $register->paymentRegister?->vouchers()->exists() ? 'Rp.'.  number_format(($register->paymentRegister->vouchers->first()->voucher->percentage * $register->paymentRegister->amount) / 100, 0, ',', '.') : '-' }}</td>
                            </tr>
                            <tr class="border-b">
                                <td class="font-bold">Total Payment</td>
                                <td>Rp.{{ number_format($register->paymentRegister->total, 0, ',', '.') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </x-tab>
        </x-tabs>
    </x-card>

    @include('livewire.alerts.alert-action')
</div>
