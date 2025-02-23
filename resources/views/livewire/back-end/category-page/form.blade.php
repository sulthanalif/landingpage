<!-- Modal -->
<div wire:ignore.self class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ $id ? 'Update' : 'Create' }} Category</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <form wire:submit='save'>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Name<span class="text-danger">*</span> </label>
                <input type="text" class="form-control @error('name') is-invalid @enderror" wire:model='name'>
                @error('name')
                    <span class="text-danger text-sm">{{ $message }}</span>
                @enderror
            </div>
            <div class="form-group">
                <label for="description" class="col-form-label">Description<span class="text-danger">*</span></label>
                <textarea class="form-control @error('description') is-invalid @enderror" wire:model='description' rows="3"></textarea>
                @error('description')
                    <span class="text-danger text-sm">{{ $message }}</span>
                @enderror
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Status<span class="text-danger">*</span></label>
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
