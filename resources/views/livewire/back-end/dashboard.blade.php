<?php

use App\Models\Post;
use App\Models\User;
use App\Models\MailBox;
use App\Models\Activity;
use App\Models\Category;
use App\Models\Question;
use Livewire\Volt\Component;
use Livewire\Attributes\Title;

new #[Title('Dashboard')] class extends Component {

 public function with(): array
 {
    return [
        'posts' => Post::where('status', true)->count(),
        'categories' => Category::where('status', true)->count(),
        'mails' => MailBox::count(),
        'activities' => Activity::where('status', true)->count(),
        'questions' => Question::where('status', true)->count(),
        'users' => User::where('status', true)->count(),
    ];
 }
}; ?>

<div>
    <!-- HEADER -->
    <x-header title="Dashboard" separator>
        {{-- <x-slot:middle class="!justify-end">
            <x-input placeholder="Search..." wire:model.live.debounce="search" clearable icon="o-magnifying-glass" />
        </x-slot:middle>
        <x-slot:actions>
            <x-button label="Filters" @click="$wire.drawer = true" responsive icon="o-funnel" />
        </x-slot:actions> --}}
    </x-header>

    <div class="py-4 rounded-b-xl grid md:grid-cols-4 gap-5">
            <x-stat title="Posts" value="{{ $posts }}" icon="o-paper-airplane" />
            <x-stat title="Categories" value="{{ $categories }}" icon="o-tag" />
            <x-stat title="Mails" value="{{ $mails }}" icon="o-envelope" />
            <x-stat title="Activities" value="{{ $activities }}" icon="o-camera" />
            <x-stat title="Questions" value="{{ $questions }}" icon="o-question-mark-circle" />
            <x-stat title="Enrollment" value="0" icon="o-user-plus" />
            <x-stat title="Users" value="{{ $users }}" icon="o-users" />
    </div>
    <x-card>
        <div class="text-center">
            <p class="mt-4">Selamat Datang</p>
            <p class="">{{ auth()->user()->name }}</p>
        </div>
    </x-card>
</div>
