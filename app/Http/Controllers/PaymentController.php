<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function page($key)
    {
        return Inertia::render('Payment', ['key' => $key]);
    }

    public function getData($key)
    {
        try {
            $paymentRegister = PaymentRegister::with('register')->where('key', $key)->first();

            if (!$paymentRegister) return response()->json(['message' => 'Data not found'], 404);

            return $this->successResponse(data: compact('paymentRegister'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'key' => 'required|string',
            'payment_method' => 'required|enum:cash,bca,bni,bri,mandiri,other',
            'amount' => 'required|numeric',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        DB::beginTransaction();

        try {
            $paymentRegister = PaymentRegister::where('key', $request->input('key'))->first();

            if (!$paymentRegister) return response()->json(['message' => 'Data not found'], 404);

            if ($request->input('amount') <= 0) return response()->json(['message' => 'Invalid payment amount'], 422);


            $paymentRegister->detail()->create([
                'payment_method' => $request->input('payment_method'),
                'amount' => $request->input('amount'),
            ]);

            $totalPaid = $paymentRegister->detail()->sum('amount');
            $remaining = max(0, $paymentRegister->total - $totalPaid);

            if ($paymentRegister->total === $totalPaid) $paymentRegister->update(['status' => true]);

            DB::commit();

            return $this->successResponse(data: [
                'paymentRegister' => $paymentRegister,
                'remaining' => $remaining,
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->errorResponse($th);
        }
    }
}
