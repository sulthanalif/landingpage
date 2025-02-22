<?php

use function Livewire\Volt\{state, title, layout, action};
use Illuminate\Support\Facades\Auth;

    title('Login');

    layout('components.layouts.guest');

    state([
        'email' => '',
        'password' => '',
        'error' => '',
    ]);

    $login = function () {

        $this->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6',
        ]);

        $credentials = [
            'email' => $this->email,
            'password' => $this->password,
        ];

        if (Auth::attempt($credentials)) {
            return redirect(route('dashboard'));
        } else {
            dd('salah');
        }
    };

?>

<div>
    <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
            <div class="row d-flex justify-content-center items-center">
                <div class="col-lg-6">
                    <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form class="user" wire:submit="login">
                            <div class="form-group">
                                <input type="email" class="form-control form-control-user"
                                    wire:model="email"
                                    placeholder="Enter email...">
                                @error('email') <span class="text-danger text-sm">{{ $message }}</span> @enderror
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control form-control-user"
                                    wire:model="password"
                                    placeholder="Password">
                                @error('password') <span class="text-danger text-sm">{{ $message }}</span> @enderror
                            </div>
                            <div class="form-group">
                                <div class="custom-control custom-checkbox small">
                                    <input type="checkbox" class="custom-control-input" id="customCheck">
                                    <label class="custom-control-label" for="customCheck">Remember Me</label>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary btn-user btn-block">
                                Login
                            </button>
                        </form>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
