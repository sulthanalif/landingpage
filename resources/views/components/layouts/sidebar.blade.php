<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item {{ request()->is('admin/dashboard') ? 'active' : '' }}">
        <a class="nav-link" href="{{ route('dashboard') }}" >
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
            <a class="nav-link" href="{{ route('category') }}" >
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Categories</span></a>
        </li>
    @endcan

    @can('post-page')
        <li class="nav-item {{ request()->is('admin/master/post*') ? 'active' : '' }}">
            <a class="nav-link" href="{{ route('post') }}" >
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Posts</span></a>
        </li>
    @endcan

    @can('user-page')
        <li class="nav-item {{ request()->is('admin/master/user*') ? 'active' : '' }}">
            <a class="nav-link" href="{{ route('user') }}" >
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Users</span></a>
        </li>
    @endcan


    @can('options')
        <li class="nav-item {{ request()->is('admin/master/options*') ? 'active' : '' }}">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-fw fa-cog"></i>
                <span>Options</span>
            </a>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    @can('role-page')
                    <a class="collapse-item" href="{{ route('role') }}" >Role</a>
                    @endcan
                    @can('permission-page')
                    <a class="collapse-item" href="{{ route('permission') }}" >Permission</a>
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
