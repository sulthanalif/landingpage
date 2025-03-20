@can('dashboard')
    <x-menu-separator />
    <x-menu-item title="Dashboard" icon="o-home" link="{{ route('dashboard') }}" />
@endcan
@can('master')
    <x-menu-separator title='master' />
    {{-- <x-menu-sub title="Master Data" icon="o-circle-stack">
    </x-menu-sub> --}}
    @can('category-page')
        <x-menu-item title="Categories" icon="o-tag" link="{{ route('category') }}" />
    @endcan
    @can('post-page')
        <x-menu-item title="Posts" icon="o-paper-airplane" link="{{ route('post') }}" />
    @endcan
    @can('mail-page')
        <x-menu-item title="Mail Box" icon="o-envelope" link="{{ route('mail') }}" />
    @endcan
    @can('activity-page')
        <x-menu-item title="Activities" icon="o-camera" link="{{ route('activity') }}" />
    @endcan
    @can('user-page')
        <x-menu-item title="Users" icon="o-users" link="{{ route('user') }}" />
    @endcan
@endcan
