<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="{{ route('dashboard') }}">
        <div class="sidebar-brand-icon">
            <img src="{{ asset('sbadmin/img/logo.png') }}" alt="" style="width: auto; height: 50px;">
        </div>
        <div class="sidebar-brand-text mx-3">SMPK Lia Stephanie</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item {{ request()->is('admin/dashboard') ? 'active' : '' }}">
        <a class="nav-link" href="{{ route('dashboard') }}">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    @can('master')
        <!-- Heading -->
        <div class="sidebar-heading">
            Master
        </div>

        @can('category-page')
            <li class="nav-item {{ request()->is('admin/master/category*') ? 'active' : '' }}">
                <a class="nav-link" href="{{ route('category') }}">
                    <i class="fas fa-fw fa-tags"></i>
                    <span>Categories</span></a>
            </li>
        @endcan

        @can('post-page')
            <li class="nav-item {{ request()->is('admin/master/post*') ? 'active' : '' }}">
                <a class="nav-link" href="{{ route('post') }}">
                    <i class="fas fa-fw fa-paper-plane"></i>
                    <span>Posts</span></a>
            </li>
        @endcan

        @can('mail-page')
            <li class="nav-item {{ request()->is('admin/master/mail*') ? 'active' : '' }}">
                <a class="nav-link" href="{{ route('mail') }}">
                    <i class="fas fa-fw fa-envelope"></i>
                    <span>Mail Box</span></a>
            </li>
        @endcan

        @can('activity-page')
            <li class="nav-item {{ request()->is('admin/master/activity*') ? 'active' : '' }}">
                <a class="nav-link" href="{{ route('activity') }}">
                    <i class="fas fa-fw fa-camera"></i>
                    <span>Activities</span></a>
            </li>
        @endcan

        @can('user-page')
            <li class="nav-item {{ request()->is('admin/master/user*') ? 'active' : '' }}">
                <a class="nav-link" href="{{ route('user') }}">
                    <i class="fas fa-fw fa-users"></i>
                    <span>Users</span></a>
            </li>
        @endcan


        @can('options')
            <li class="nav-item {{ request()->is('admin/master/options*') ? 'active' : '' }}">
                <a class="nav-link {{ request()->is('admin/master/options*') ? '' : 'collapsed' }}" href="#"
                    data-toggle="collapse" data-target="#collapseOptions" aria-expanded="true" aria-controls="collapseOptions">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>Options</span>
                </a>
                <div id="collapseOptions" class="collapse {{ request()->is('admin/master/options*') ? 'show' : '' }}"
                    aria-labelledby="headingOptions" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        @can('role-page')
                            <a class="collapse-item {{ request()->is('admin/master/options/role*') ? 'active' : '' }}"
                                href="{{ route('role') }}">Role</a>
                        @endcan
                        @can('permission-page')
                            <a class="collapse-item {{ request()->is('admin/master/options/permission*') ? 'active' : '' }}"
                                href="{{ route('permission') }}">Permission</a>
                        @endcan
                    </div>
                </div>
            </li>
        @endcan
    @endcan

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

</ul>
