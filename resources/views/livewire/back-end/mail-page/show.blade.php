<!-- Modal -->
<div wire:ignore.self class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="exampleModalLabel">Mail</h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-4">
                <div class="form-group mt-3">
                    <label for="name" class="fw-bold">Name:</label>
                    <p class="border rounded p-2 bg-light">{{ $this->name }}</p>
                </div>
                <div class="form-group mt-3">
                    <label for="email" class="fw-bold">Email:</label>
                    <p class="border rounded p-2 bg-light">{{ $this->email }}</p>
                </div>
                <div class="form-group mt-3">
                    <label for="phone" class="fw-bold">Phone:</label>
                    <p class="border rounded p-2 bg-light">{{ $this->phone ?? '-' }}</p>
                </div>
                <div class="form-group mt-3">
                    <label for="subject" class="fw-bold">Subject:</label>
                    <p class="border rounded p-2 bg-light">{{ $this->subject }}</p>
                </div>
                <div class="form-group mt-3">
                    <label for="message" class="fw-bold">Message:</label>
                    <p class="border rounded p-2 bg-light">{{ $this->message }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
