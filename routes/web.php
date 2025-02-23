<?php

use App\Http\Controllers\Auth\Logout;
use Livewire\Volt\Volt;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingpageController;

Route::get('/', [LandingpageController::class, 'index']);

Route::middleware(['guest'])->group(function () {
    Volt::route('login', 'login')->name('login');
});

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/logout', Logout::class)->name('logout');

    Volt::route('/dashboard', 'back-end.dashboard')->name('dashboard');

    Route::prefix('master')->middleware('can:master')->group(function () {
        Volt::route('/category', 'back-end.master.category')->middleware('can:category-page')->name('category');
        Volt::route('/user', 'back-end.user-page.index')->middleware('can:user-page')->name('user');
    });

});
