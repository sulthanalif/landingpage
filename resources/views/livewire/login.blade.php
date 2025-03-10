<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\RateLimiter;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use function Livewire\Volt\{state, title, layout, action, uses};

uses([LivewireAlert::class]);

title('Login');

layout('components.layouts.guest');

state([
    'email' => '',
    'password' => '',
    'remember' => false,
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

    $this->ensureIsNotRateLimited();

    if (Auth::attempt($credentials, $this->remember)) {
        RateLimiter::clear($this->throttleKey());
        Session::regenerate();
        Log::channel('auth')->info('User logged in', [
            'user' => Auth::user(),
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'url' => request()->url(),
        ]);

        $this->redirectIntended(default: route('dashboard', absolute: false), navigate: true);
    } else {
        RateLimiter::hit($this->throttleKey());
        $this->alert('error', 'Password salah');
        Log::channel('auth')->error('Login failed', [
            'email' => $this->email,
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'url' => request()->url(),
        ]);
    }
};

/**
 * Get the authentication rate limiting throttle key.
 */
$throttleKey = function ()
{
    return Str::transliterate(Str::lower($this->email).'|'.request()->ip());
};

/**
 * Ensure the authentication request is not rate limited.
 */
$ensureIsNotRateLimited = function ()
{
    if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
        return;
    }

    event(new Lockout(request()));

    $seconds = RateLimiter::availableIn($this->throttleKey());

    throw ValidationException::withMessages([
        'email' => __('auth.throttle', [
            'seconds' => $seconds,
            'minutes' => ceil($seconds / 60),
        ]),
    ]);
};

?>

<div>
    <div class="card o-hidden border-0 shadow-lg my-5 mx-auto col-lg-5">
        <div class="card-body p-0">
            <div class="row d-flex justify-content-center items-center">
                <div class="col-lg-12">
                    <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">Login</h1>
                        </div>
                        <form class="user" wire:submit="login">
                            <div class="form-group">
                                <input type="email" class="form-control form-control-user" wire:model="email"
                                    placeholder="Enter email...">
                                @error('email')
                                    <span class="text-danger text-sm">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control form-control-user" wire:model="password"
                                    placeholder="Password">
                                @error('password')
                                    <span class="text-danger text-sm">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="form-group">
                                <div class="custom-control custom-checkbox small">
                                    <input type="checkbox" class="custom-control-input" wire:model="remember" id="customCheck">
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
