<?php

use Mary\Traits\Toast;
use App\Models\Register;
use Livewire\Volt\Component;

new class extends Component {
    use Toast;

    public Register $register;

    public string $selectedTab = 'student-tab';


    public function mount(Register $register)
    {
        $this->register = $register;
    }
}; ?>

<div>
    <!-- HEADER -->
    <x-header title="Detail Enrollment" separator>
        <x-slot:actions>
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
        </x-tabs>
    </x-card>
</div>
