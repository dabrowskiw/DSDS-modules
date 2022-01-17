<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('landing');
})->name('index');

Route::resource('courses', Controllers\CourseController::class)->middleware('auth');
Route::resource('course-registrations', Controllers\CourseRegistrationController::class)->middleware('auth');
Route::get('course-materials/download', [Controllers\CourseMaterialController::class, 'download'])->middleware('auth')->name('course-materials.download');
Route::resource('course-materials', Controllers\CourseMaterialController::class)->middleware('auth');
Route::resource('payment-data', Controllers\PaymentDataController::class)->middleware('auth');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
