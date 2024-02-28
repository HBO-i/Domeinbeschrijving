<?php

use App\Http\Controllers\PDFController;
use App\Http\Controllers\DescriptionController;
use App\Http\Controllers\FilterController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ProfessionalSkillsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('descriptions', [DescriptionController::class, 'index']);
Route::get('languages', [LanguageController::class, 'index']);
Route::get('filters', [FilterController::class, 'index']);
Route::get('pdflist', [PDFController::class, 'index']);
Route::get('professional-skills', [ProfessionalSkillsController::class, 'index']);