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
        try {
            DB::beginTransaction();
            $mailBox = new MailBox();
            $mailBox->first_name = $request->first_name;
            $mailBox->last_name = $request->last_name;
            $mailBox->email = $request->email;
            $mailBox->phone = $request->phone;
            $mailBox->subject = $request->subject;
            $mailBox->message = $request->message;
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
