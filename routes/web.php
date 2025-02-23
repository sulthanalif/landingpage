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
        Route::prefix('options')->middleware('can:options')->group(function () {
            Volt::route('/role', 'back-end.options.role-page.index')->middleware('can:role-page')->name('role');
            Volt::route('/permission', 'back-end.options.permission-page.index')->middleware('can:permission-page')->name('permission');
        });
    });

});
