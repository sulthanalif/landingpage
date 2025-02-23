<div class="table-responsive">
    <div class="d-flex justify-content-between items-center my-3">
        <div>
            <select class="form-control form-select" wire:model.live='perPage' aria-label="Default select example">
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
        </div>
        <div class="mr-2">
            <form
            class="navbar-search">
            <div class="input-group">
                <input type="text" class="form-control bg-light border-0 small" wire:model.live='search' placeholder="Search for..."
                    aria-label="Search" aria-describedby="basic-addon2">
            </div>
        </form>
        </div>
    </div>
    <table class="table table-bordered"  width="100%" cellspacing="0">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Created_at</th>
                <th></th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Created_at</th>
                <th></th>
            </tr>
        </tfoot>
        <tbody>
            @forelse ($users as $user)
                <tr>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->status ? 'Active' : 'Inactive' }}</td>
                    <td>{{ $user->created_at->format('d/m/Y') }}</td>
                    <td>
                        <a href="#" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></a>
                        <a href="#" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="text-center">No users found</td>
                </tr>
            @endforelse
        </tbody>
    </table>
    {{ $users->links() }}
</div>
