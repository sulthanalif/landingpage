<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\LandingpageResponseController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/getDataHome', [LandingpageResponseController::class, 'getDataHome']);
Route::get('/activities', [LandingpageResponseController::class, 'activities']);
Route::get('/activities/{id}', [LandingpageResponseController::class, 'getSubActivity']);
Route::get('/teachers', [LandingpageResponseController::class, 'teachers']);
Route::get('/tuition-fees', [LandingpageResponseController::class, 'tableFees']);
Route::get('/calendars', [LandingpageResponseController::class, 'calendars']);
Route::get('/accreditations', [LandingpageResponseController::class, 'accreditations']);
Route::get('/posts', [LandingpageResponseController::class, 'posts']);
Route::get('/post/{slug}', [LandingpageResponseController::class, 'detailPost']);
Route::get('/extra', [LandingpageResponseController::class, 'extra']);
Route::get('/facilities', [LandingpageResponseController::class, 'facilities']);

Route::post('/send-mail', [ContactUsController::class, 'store']);

Route::get('/dataRegister', [RegisterController::class, 'getData']);
Route::get('/countFee', [RegisterController::class, 'countFee']);
Route::post('/register', [RegisterController::class, 'store']);

Route::get('/payment/getData/{key}', [PaymentController::class, 'getData']);
Route::post('/payment', [PaymentController::class, 'store']);

Route::get('/careers', [CareerController::class, 'getData']);
Route::post('/careers/{career}', [CareerController::class, 'store']);
