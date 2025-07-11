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
    @can('facility-page')
        <x-menu-item title="Facilities" icon="o-cube" link="{{ route('facility') }}" />
    @endcan
    @can('extra-page')
        <x-menu-item title="Extracurricular" icon="o-paint-brush" link="{{ route('extra') }}" />
    @endcan
    @can('wcu-page')
        <x-menu-item title="WCU" icon="o-question-mark-circle" link="{{ route('wcu') }}" />
    @endcan
    @can('question-page')
        <x-menu-item title="Questions" icon="o-question-mark-circle" link="{{ route('question') }}" />
    @endcan
    @can('calendar-page')
        <x-menu-item title="Calendar" icon="o-calendar" link="{{ route('calendar') }}" />
    @endcan
    @can('enrollment-page')
        <x-menu-item title="Student Registration" icon="o-user-plus" link="{{ route('enrollment') }}" />
    @endcan
    @can('accreditation-page')
        <x-menu-item title="Accreditation" icon="o-clipboard-document-check" link="{{ route('accreditation') }}" />
    @endcan
    @can('tuition-fees-page')
        <x-menu-item title="Tuition Fees" icon="o-document-currency-dollar" link="{{ route('tuition-fees') }}" />
    @endcan
    @can('discount-page')
        <x-menu-item title="Discounts" icon="o-percent-badge" link="{{ route('discount') }}" />
    @endcan
    @can('campaign-page')
        <x-menu-item title="Campaigns" icon="o-megaphone" link="{{ route('campaign') }}" />
    @endcan
    @can('career-page')
        <x-menu-item title="Careers" icon="o-briefcase" link="{{ route('career') }}" />
    @endcan
    @can('teacher-page')
        <x-menu-item title="Teachers" icon="o-users" link="{{ route('teacher') }}" />
    @endcan
    @can('user-page')
        <x-menu-item title="Users" icon="o-users" link="{{ route('user') }}" />
    @endcan
@endcan
