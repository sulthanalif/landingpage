<?php

use Livewire\Volt\Volt;
use App\Models\TuitionFee;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\Logout;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\LandingpageController;
use App\Http\Controllers\LandingpageResponseController;

Route::get('/', [LandingpageController::class, 'index'])->name('homepage');
Route::get('/about', [LandingpageController::class, 'about']);
Route::get('/story', [LandingpageController::class, 'story']);
Route::get('/story/{id}', [LandingpageController::class, 'detailStory']);
Route::get('/teacher', [LandingpageController::class, 'teacher']);
Route::get('/admission', [LandingpageController::class, 'admission']);
Route::get('/curriculum', [LandingpageController::class, 'curriculum']);
Route::get('/extracurricular', [LandingpageController::class, 'extracurricular']);
Route::get('/calendar-academic', [LandingpageController::class, 'calendarAcademic']);
Route::get('/accreditation', [LandingpageController::class, 'accreditation']);
Route::get('/career', [CareerController::class, 'page']);
Route::get('/contact', [LandingpageController::class, 'contact']);
Route::get('/register', [RegisterController::class, 'index']);
Route::get('/payment/{key}', [PaymentController::class, 'page'])->name('payment');

Route::get('/news', [LandingpageController::class, 'allNews']);
Route::get('/news/{slug}', [LandingpageController::class, 'detailNews']);
Route::get('/activities', [LandingpageController::class, 'allActivities']);






// Route::get('/tuition-fees', function () {
//     $fees = TuitionFee::fromTableSlug('national-program-edexcel')->map->formatted_values;

//     return response()->json($fees);
// });

Route::middleware(['guest'])->group(function () {
    Volt::route('login', 'login')->name('login');
});

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/logout', Logout::class)->name('logout');

    Volt::route('/dashboard', 'back-end.dashboard')->name('dashboard');
    Volt::route('/profile', 'back-end.profile')->name('profile');



    Route::prefix('master')->middleware('can:master')->group(function () {
        Volt::route('/category', 'back-end.category-page.index')->middleware('can:category-page')->name('category');
        Volt::route('/facility', 'back-end.facilities-page.index')->middleware('can:facility-page')->name('facility');
        Volt::route('/post', 'back-end.post-page.index')->middleware('can:post-page')->name('post');
        Volt::route('/post/form', 'back-end.post-page.create')->name('post.form');
        Volt::route('/mail', 'back-end.mail-page.index')->middleware('can:mail-page')->name('mail');
        Volt::route('/mail/show', 'back-end.mail-page.show')->middleware('can:mail-page')->name('mail.show');
        Volt::route('/activity', 'back-end.activity-page.index')->middleware('can:activity-page')->name('activity');
        Volt::route('/activity/{activity}/show', 'back-end.activity-page.show-activity')->middleware('can:activity-page')->name('activity.show');
        Volt::route('/activity/{activity}/form-sub', 'back-end.activity-page.form-sub')->middleware('can:activity-page')->name('activity.form-sub');

        Volt::route('/question', 'back-end.question-page.index')->middleware('can:question-page')->name('question');
        Volt::route('/enrollment', 'back-end.enrollment-page.index')->middleware('can:enrollment-page')->name('enrollment');
        VOlt::route('/enrollment/{register}/detail', 'back-end.enrollment-page.detail')->middleware('can:enrollment-page')->name('enrollment.detail');
        Volt::route('/calendar', 'back-end.calendar-page.index')->middleware('can:calendar-page')->name('calendar');
        Volt::route('/teacher', 'back-end.teacher-page.index')->middleware('can:teacher-page')->name('teacher');
        Volt::route('/wcu', 'back-end.wcu-page.index')->middleware('can:wcu-page')->name('wcu');
        Volt::route('/accreditation', 'back-end.accreditation-page.index')->middleware('can:accreditation-page')->name('accreditation');
        Volt::route('/tuition-fees', 'back-end.tuition-fees-page.index')->middleware('can:tuition-fees-page')->name('tuition-fees');
        Volt::route('/tuition-fees/form', 'back-end.tuition-fees-page.create')->name('tuition-fees.form');
        Volt::route('/tuition-fees/{slug}/detail', 'back-end.tuition-fees-page.create')->name('tuition-fees.detail');
        Volt::route('/discount', 'back-end.discount-page.index')->middleware('can:discount-page')->name('discount');
        Volt::route('/career', 'back-end.career-page.index')->middleware('can:career-page')->name('career');
        Volt::route('/career/form', 'back-end.career-page.form')->name('career.form');
        Volt::route('/campaign', 'back-end.campaign-page.index')->middleware('can:campaign-page')->name('campaign');
        Volt::route('/campaign/form', 'back-end.campaign-page.form')->name('campaign.form');
        Volt::route('/voucher-claims', 'back-end.campaign-page.voucherclaims')->middleware('can:campaign-page')->name('voucher-claims');
        Volt::route('/extracurricular', 'back-end.extra-page.index')->middleware('can:extra-page')->name('extra');
        Volt::route('/career/register', 'back-end.career-page.register')->middleware('can:career-page')->name('career.register');

        Volt::route('/user', 'back-end.user-page.index')->middleware('can:user-page')->name('user');
        Route::prefix('options')->middleware('can:options')->group(function () {
            Volt::route('/role', 'back-end.options.role-page.index')->middleware('can:role-page')->name('role');
            Volt::route('/permission', 'back-end.options.permission-page.index')->middleware('can:permission-page')->name('permission');
        });
    });

    Volt::route('/career/register', 'back-end.career-page.register')->middleware('can:career-page')->name('career.register.superadmin');
});
