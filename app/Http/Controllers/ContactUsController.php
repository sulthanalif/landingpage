<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\MailBox;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

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
            'to' => 'required|in:hrd,marketing,information'
        ]);

        DB::beginTransaction();
        try {
            $mailBox = new MailBox($validated);
            $mailBox->save();
            DB::commit();

            if ($validated['to'] == 'hrd') {
                Notification::route('mail', 'hrd@lscs.sch.id')->notify(new \App\Notifications\ContactNotification($validated));
            } elseif ($validated['to'] == 'marketing') {
                Notification::route('mail', 'marketing@lscs.sch.id')->notify(new \App\Notifications\ContactNotification($validated));
            } elseif ($validated['to'] == 'information') {
                Notification::route('mail', 'info@lscs.sch.id')->notify(new \App\Notifications\ContactNotification($validated));
            }

            return $this->successResponse(data: $validated, message: 'Pesan berhasil dikirim');
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
