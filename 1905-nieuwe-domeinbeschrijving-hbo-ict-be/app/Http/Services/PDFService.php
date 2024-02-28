<?php

namespace App\Http\Services;

class PDFService {
    private string $basePath;

    public function __construct()
    {
        $this->basePath = storage_path().'/app/public/pdf/';
    }

    /**
     * Creates a new PDF and saves it to the storage.
     */
    public function generatePDF() : void
    {
        //
    }
}