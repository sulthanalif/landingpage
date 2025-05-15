<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="lofi">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ isset($title) ? $title . ' - ' . config('app.name') : config('app.name') }}</title>
    <link rel="shortcut icon" href="{{ asset('img/logo.png') }}" type="image/x-icon">

    @vite(['resources/css/app.css'])

    @livewireStyles

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

    {{-- TinyMCE --}}
    <script src="https://cdn.tiny.cloud/1/08d4t4shdvti5w4vrql0voaztnvps1jtngr9iy40lozsy4jz/tinymce/6/tinymce.min.js"
        referrerpolicy="origin"></script>


    {{-- Cropper.js --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css" />

    {{--  Currency  --}}
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/robsontenorio/mary@0.44.2/libs/currency/currency.js">
    </script>

    {{-- Flatpickr  --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

    {{-- MonthSelectPlugin  --}}
    <script src="https://unpkg.com/flatpickr/dist/plugins/monthSelect/index.js"></script>
    <link href="https://unpkg.com/flatpickr/dist/plugins/monthSelect/style.css" rel="stylesheet">

    {{-- It will not apply locale yet  --}}
    <script src="https://npmcdn.com/flatpickr/dist/l10n/id.js"></script>

    {{-- Chart.js  --}}
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

    {{-- Vanilla Calendar --}}
    <script src="https://cdn.jsdelivr.net/npm/vanilla-calendar-pro@2.9.6/build/vanilla-calendar.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/vanilla-calendar-pro@2.9.6/build/vanilla-calendar.min.css" rel="stylesheet">

    {{-- You need to set here the default locale or any global flatpickr settings --}}
    <script>
        flatpickr.localize(flatpickr.l10ns.id);
    </script>
</head>

<body class="min-h-screen font-sans antialiased bg-base-200/50">

    {{-- NAVBAR mobile only --}}
    <x-nav sticky class="lg:hidden">
        <x-slot:brand>
            <x-app-brand />
        </x-slot:brand>
        <x-slot:actions>
            <label for="main-drawer" class="lg:hidden me-3">
                <x-icon name="o-bars-3" class="cursor-pointer" />
            </label>
        </x-slot:actions>
    </x-nav>

    {{-- MAIN --}}
    <x-main full-width>
        {{-- SIDEBAR --}}
        <x-slot:sidebar drawer="main-drawer" collapsible class="bg-base-100 lg:bg-inherit">

            {{-- BRAND --}}
            <x-app-brand class="p-5 pt-3" />

            {{-- MENU --}}
            <x-menu activate-by-route>

                {{-- User --}}
                @if ($user = auth()->user())

                    <x-list-item :item="$user" value="name" sub-value="email" no-separator no-hover
                        class="bg-base-100 rounded px-5">
                        <x-slot:avatar>
                            @if (!$user->image)
                                <img src="{{ asset('img/user-avatar.png') }}" class="w-10 rounded-lg" />
                            @else
                                <img src="{{ asset('storage/' . $user->image) }}" class="w-10 rounded-lg" />
                            @endif
                        </x-slot:avatar>
                        <x-slot:actions>
                            <x-dropdown>
                                <x-slot:trigger>
                                    <x-icon name="o-ellipsis-vertical" class="cursor-pointer" />
                                </x-slot:trigger>

                                <x-menu-item title="Profile" icon="o-user-circle" link="{{ route('profile') }}"
                                    wire:navigate />
                                @can('log-viewer')
                                    <x-menu-item title="Log View" icon="o-bug-ant" link="{{ url('/log-viewer') }}" />
                                @endcan
                                <x-menu-item title="Logout" icon="o-power" no-wire-navigate
                                    link="{{ route('logout') }}" />
                            </x-dropdown>
                        </x-slot:actions>
                    </x-list-item>

                @endif

                @include('components.layouts.app-menu')
            </x-menu>
        </x-slot:sidebar>

        {{-- The `$slot` goes here --}}
        <x-slot:content>
            {{ $slot }}
        </x-slot:content>
    </x-main>

    {{--  TOAST area --}}
    <x-toast />

    @stack('scripts')
</body>

</html>
