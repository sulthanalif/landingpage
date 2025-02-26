<?php

namespace App\Http\Controllers;

use App\Models\MailBox;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactUsController extends Controller
{
    public function index()
    {
        return inertia('#', [
            'mailTo' => 'sekolah@mail.com'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|numeric',
            'subject' => 'required|string|max:100',
            'message' => 'required|string|max:500',
        ]);

        try {
            DB::beginTransaction();
            $mailBox = new MailBox($validated);
            $mailBox->save();

            DB::commit();

            //function send email belum ada

            return response()->json([
                'status' => 'success',
                'message' => 'Pesan berhasil dikirim'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::channel('debug')->error('Error: ' . $e->getMessage(), [
                'exception' => $e,
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'code' => $e->getCode(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Pesan gagal dikirim'
            ]);
        }
    }
}
