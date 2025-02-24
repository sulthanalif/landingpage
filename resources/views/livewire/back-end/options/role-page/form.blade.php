<!-- Modal -->
<div wire:ignore.self class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="exampleModalLabel">{{ $id ? 'Update' : 'Create' }} Role</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form wire:submit='save'>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Name<span class="text-danger">*</span>
                        </label>
                        <input type="text" class="form-control @error('name') is-invalid @enderror"
                            wire:model='name'>
                        @error('name')
                            <span class="text-danger text-sm">{{ $message }}</span>
                        @enderror
                    </div>


                    <div class="form-group">
                        <div style="display: flex; flex-wrap: wrap; margin-left: 1px;">
                            <input type="checkbox" wire:click="toggleSelectAll"
                                {{ count($selected ?? []) == count($permissions ?? []) ? 'checked' : '' }}>

                            <div class="ml-3 text-bold">all</div>
                        </div>
                        <div style="display: flex; flex-wrap: wrap;">
                            @forelse (array_chunk($permissions->toArray(), 10) as $chunk)
                                <div style="width: calc(100% / {{ ceil(count($permissions) / 10) }})">
                                    <table style="width: 100%">
                                        <tbody>
                                            @foreach ($chunk as $permission)
                                                <tr>
                                                    <td>
                                                        <input type="checkbox" wire:model.live='selected'
                                                            value="{{ $permission['id'] }}">
                                                    </td>
                                                    <td>
                                                        {{ $permission['name'] }}
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            @empty
                                <tr>
                                    <td colspan="5" class="text-center">No permissions found</td>
                                </tr>
                            @endforelse
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
