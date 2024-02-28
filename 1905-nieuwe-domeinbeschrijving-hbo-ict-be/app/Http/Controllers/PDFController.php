<?php

namespace App\Http\Controllers;

use App\Http\Services\PDFService;

class PDFController extends Controller
{
    private PDFService $pdfService;

    public function __construct()
    {
        $this->pdfService = new PDFService();
    }
}
