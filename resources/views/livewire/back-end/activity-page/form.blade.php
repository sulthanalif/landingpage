<!-- Modal -->
<div wire:ignore.self class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="exampleModalLabel">{{ $id ? 'Update' : 'Create' }} Activity</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form wire:submit='save'>
                    <div class="form-group">
                        <label for="title" class="col-form-label">Title<span class="text-danger">*</span>
                        </label>
                        <input type="text" class="form-control @error('title') is-invalid @enderror"
                            wire:model='title'>
                        @error('title')
                            <span class="text-danger text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label for="date" class="col-form-label">Date<span class="text-danger">*</span></label>
                        <input type="date" class="form-control @error('date') is-invalid @enderror"
                            wire:model='date'>
                        @error('date')
                            <span class="text-danger text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label for="image" class="col-form-label">Image<span class="text-danger">*</span></label>
                        <input type="file" class="form-control @error('image') is-invalid @enderror"
                            wire:model='image' accept="image/*">
                        @if ($image)
                            <div class="d-flex justify-content-center mt-3">
                                <img src="{{ $image->temporaryUrl() }}" style='width: 400px'>
                            </div>
                        @endif
                        @error('image')
                            <span class="text-danger text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label for="status" class="col-form-label">Status<span class="text-danger">*</span></label>
                        <select class="form-control @error('status') is-invalid @enderror" wire:model='status'>
                            <option value="" disabled selected>Select...</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                        @error('status')
                            <span class="text-danger text-sm">{{ $message }}</span>
                        @enderror
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
