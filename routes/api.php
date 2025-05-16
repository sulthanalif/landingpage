<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LandingpageResponseController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/getDataHome', [LandingpageResponseController::class, 'getDataHome']);
Route::get('/activities', [LandingpageResponseController::class, 'activities']);
Route::get('/teachers', [LandingpageResponseController::class, 'teachers']);
Route::get('/tuition-fees', [LandingpageResponseController::class, 'tableFees']);
Route::get('/calendars', [LandingpageResponseController::class, 'calendars']);
Route::get('/accreditations', [LandingpageResponseController::class, 'accreditations']);
Route::get('/posts', [LandingpageResponseController::class, 'posts']);
Route::get('/post/{slug}', [LandingpageResponseController::class, 'detailPost']);

Route::get('/dataRegister', [RegisterController::class, 'getData']);
Route::get('/countFee', [RegisterController::class, 'countFee']);

Route::get('/payment/getData/{key}', [PaymentController::class, 'getData']);
Route::post('/payment', [PaymentController::class, 'store']);
