<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Voucher;
use App\Models\Discount;
use App\Models\Register;
use App\Models\TuitionFee;
use Illuminate\Support\Str;
use App\Models\VoucherClaim;
use Illuminate\Http\Request;
use App\Models\ApprovalRegis;
use App\Models\PaymentRegister;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{

    public function index()
    {
        return Inertia::render('Register');
    }

    public function getData()
    {
        try {
            $types = TuitionFee::getAllTable();

            $discounts = Discount::where('status', true)->get();

            return $this->successResponse(data: compact('types', 'discounts'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function countFee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'level' => 'required|string',
            'table_id' => 'required|integer',
            'voucher_code' => 'nullable|string',
            'is_biduk' => 'nullable|boolean',
            'cildren' => 'nullable|integer',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        try {
            $table_id = $request->input('table_id');
            $jenjang_value = $request->input('level');
            $is_biduk = $request->input('is_biduk');
            $voucher_code = $request->input('voucher_code');
            $cildren = $request->input('cildren');
            $feeder = $request->input('feeder');

            $table = TuitionFee::getAllTable()
                ->firstWhere('table.id', (int) $table_id);

            if (!$table) {
                return response()->json(['message' => 'Table not found'], 404);
            }

            // Cari kolom yang order-nya === 0 (biasanya label, seperti 'Jenjang')
            $labelColumn = collect($table['columns'])
                ->firstWhere('order', 0);

            if (!$labelColumn) {
                return response()->json(['message' => 'Label column not found'], 404);
            }

            $jenjangKey = $labelColumn['name'];

            // Cari row berdasarkan value jenjang
            $targetRow = collect($table['rows'])
                ->firstWhere($jenjangKey, $jenjang_value);

            if (!$targetRow) {
                return response()->json(['message' => 'Row not found for jenjang ' . $jenjang_value], 404);
            }

            // Ambil semua kolom numerik (order !== 0)
            $numericColumns = collect($table['columns'])
                ->filter(fn ($col) => $col['order'] !== 0)
                ->pluck('label')
                ->map(fn ($label) => Str::slug($label, '_'))
                ->toArray();

            $total = 0;
            foreach ($numericColumns as $key) {
                if (isset($targetRow[$key]) && is_numeric($targetRow[$key])) {
                    $total += $targetRow[$key];
                }
            }

            $discount_biduk = 0;
            $discount_cildren = 0;
            $discount_feeder = 0;
            $discount_voucher = null;
            if ($is_biduk) {
                $discount_biduk = Discount::where('name', 'Biduk')->where('status', true)->first()->percentage;

                if (!$discount_biduk) return response()->json(['message' => 'Discount Biduk not found'], 404);
            }

            if ($cildren > 0) {
                $discount_cildren = Discount::where('name', 'Sibling')->where('status', true)->first()->percentage;

                if (!$discount_cildren) return response()->json(['message' => 'Discount LSCS not found'], 404);
            }
            if ($feeder > 0) {
                $discount_feeder = Discount::where('name', 'Feeder')->where('status', true)->first()->percentage;

                if (!$discount_feeder) return response()->json(['message' => 'Discount Feeder not found'], 404);
            }


            if ($voucher_code) {
                $discount_voucher = Voucher::with('campaign')
                    ->whereHas('campaign', function ($query) {
                        $query->where('status', true)
                            ->where('start_date', '<=', now())
                            ->where('end_date', '>=', now());
                    })
                    ->where('code', $voucher_code)
                    ->where('status', true)
                    ->where('is_claimed', false)
                    ->first();
                if (!$discount_voucher) return response()->json(['message' => 'Voucher not found'], 404);
            }

            $a = ($total * ($discount_biduk / 100));
            $b = ($total * ($discount_cildren / 100));
            $c = $voucher_code ? ($total * ($discount_voucher->percentage / 100)) : 0;
            $d = ($total * ($discount_feeder / 100));

            $total_discount = $total - $a - $b - $c - $d;

            return $this->successResponse(data: [
                'program' => $table['table']['name'],
                'level' => $jenjang_value,
                'amount' => $total,
                'discount' => [
                    'biduk' => $discount_biduk ?? 0,
                    'lscs' => $discount_cildren ?? 0,
                    'feeder' => $discount_feeder ?? 0,
                    'voucher' => $voucher_code ? [
                        'code' => $discount_voucher?->code,
                        'campaign_name' => $discount_voucher?->campaign->name,
                        'percentage' => $discount_voucher?->percentage
                    ] : null
                ],
                'total' => $total_discount
            ]);
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function getLevel()
    {
        try {
            $table = TuitionFee::getAllTable()->map(fn ($table) => $table['rows'])->firstWhere('order', 0)->pluck();

            if (!$table) {
                return response()->json(['message' => 'Table not found'], 404);
            }

            // $labelColumn = collect($table['columns'])
            //     ->firstWhere('order', 0);
            return $this->successResponse(data: compact('table'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function store(Request $request)
    {
        //testing
        // return response()->json($request->vouchers);

        $validate = $request->validate([
            'table_id' => 'required',
            'level' => 'required',
            'name' => 'required|string|max:50',
            'gender' => 'required|in:Male,Female',
            'religion' => 'required|string|max:20',
            'place_of_birth' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'phone' => 'required|numeric',
            'email' => 'required|email',
            'previous_school' => 'required|string|max:255',
            'hobbi' => 'required|string|max:255',
            'achievement' => 'required|string|max:255',
            'father_name' => 'required|string|max:255',
            'place_of_birth_father' => 'required|string|max:255',
            'date_of_birth_father' => 'required|date',
            'mother_name' => 'required|string|max:255',
            'place_of_birth_mother' => 'required|string|max:255',
            'date_of_birth_mother' => 'required|date',
            'number_of_siblings' => 'required|numeric',
            'phone_parent' => 'required|numeric',
            'email_parent' => 'required|email',
            'father_address' => 'required|string|max:255',
            'mother_address' => 'required|string|max:255',
            'student_residence_status' => 'required',
            'referral_by' => 'nullable|string|max:255',

            'amount' => 'required|numeric',
            'total' => 'required|numeric',
            'discount_biduk' => 'nullable|numeric',
            'discount_lscs' => 'nullable|numeric',
            'discount_feeder' => 'nullable|numeric',
            'vouchers' => 'nullable|array'
        ]);

        try {
            DB::beginTransaction();
            $register = Register::create($validate);

            do {
                $key = Str::random(20);
            } while (PaymentRegister::where('key', $key)->exists());

            $paymentRegister = $register->paymentRegister()->create([
                'key' => $key,
                'amount' => $request->amount,
                'discount_biduk' => $request->discount_biduk,
                'discount_lscs' => $request->discount_lscs,
                'discount_feeder' => $request->discount_feeder,
                'total' => $request->total
            ]);

            ApprovalRegis::create([
                'user_id' => 1,
                'register_id' => $register->id,
                'status' => true,
                'is_reject' => false,
                'note' => '$this->note',
            ]);

            if ($request->vouchers) {
                $voucher = $request->vouchers;
                // foreach ($request->vouchers as  $voucher) {
                    // return response()->json($voucher['code']);
                    $idVoucher = Voucher::where('code', $voucher['code'])->first();
                    if (!$idVoucher) return response()->json(['message' => 'Voucher not found'], 404);

                    if ($idVoucher->is_claimed) return response()->json(['message' => 'Voucher already claimed'], 400);

                    $success = $paymentRegister->vouchers()->create([
                        'voucher_id' => $idVoucher->id,
                    ]);

                    if (!$success) return response()->json(['message' => 'Voucher already claimed'], 400);

                    $idVoucher->is_claimed = true;
                    $idVoucher->save();

                    $register->voucherClaim()->create([
                        'voucher_id' => $idVoucher->id
                    ]);
                // }
            }

            DB::commit();
            return $this->successResponse(data: $register , message: 'Data berhasil disimpan');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::channel('debug')->error('Error: ' . $e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTrace(),
                'line' => $e->getLine(),
            ]);
            return $this->errorResponse($e);
        }
    }

}
