<?php

use App\Http\Controllers\DishController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RestaurantController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
        return to_route('restaurants.index');
    });

    Route::get('/dashboard', function () {
        return to_route('restaurants.index');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    Route::post('/restaurants/filter',[RestaurantController::class,"filter"])->name("restaurants.filter");

Route::post('/dishes/filter',[RestaurantController::class,"filterDishes"])->name("dishes.filter");

Route::get('/restaurants/order/{field}/{dir}',[RestaurantController::class,"order"])->name("restaurants.order");

    Route::resource('restaurants', RestaurantController::class);
    Route::resource('dishes', DishController::class);
    Route::resource('experiences', ExperienceController::class);
    Route::get('dishes/create/{id}', [DishController::class,'create'])->name('dishes.create');



    require __DIR__.'/auth.php';
