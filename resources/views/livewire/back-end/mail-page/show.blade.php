<?php

use App\Models\MailBox;
use Livewire\Attributes\Url;
use Livewire\Volt\Component;

new class extends Component {

    #[Url]
    public ?int $id = null;

    public string $name = '';
    public string $email = '';
    public string $subject = '';
    public string $message = '';
    public string $phone = '';
    public string $date = '';


    public function mount(): void
    {
        $mail = MailBox::find($this->id);
        $this->name = $mail->name;
        $this->email = $mail->email;
        $this->phone = $mail->phone;
        $this->subject = $mail->subject;
        $this->message = $mail->message;
        $this->date = \Carbon\Carbon::parse($mail->created_at)->locale('id')->translatedFormat('d F Y H:i');
    }

    public function back(): void
    {
        $this->redirect(route('mail'), navigate: true);
    }

}; ?>

<div>
    <!-- HEADER -->
    <x-header title="Mail Details" separator>
        <x-slot:actions>
            <x-button label="Back" @click="$wire.back" responsive icon="o-arrow-left" spinner="back" />
        </x-slot:actions>
    </x-header>

    <x-card title="{{ $this->subject }}" subtitle="{{ $this->name }} ({{ $this->email }})({{ $this->phone }})" shadow separator>
        <x-slot:menu>
            {{ $this->date }}
        </x-slot:menu>
        <div class="prose">
            {!! $this->message !!}
        </div>
    </x-card>
</div>
