<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Discount;
use App\Models\Register;
use App\Models\TuitionFee;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
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

            return $this->successResponse(data: compact('types'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function countFee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'jenjang' => 'required|string',
            'table_id' => 'required|integer',
            'discount_id' => 'required|integer',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        try {
            $table_id = $request->input('table_id');
            $jenjang_value = $request->input('jenjang');
            $discount_id = $request->input('discount_id');

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

            $jenjangKey = Str::slug($labelColumn['label'], '_');

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

            $discount = Discount::find($discount_id);

            if (!$discount) return response()->json(['message' => 'Discount not found'], 404);

            if($discount) $total_discount = $total - ($total * ($discount->percentage / 100));

            return $this->successResponse(data: [
                'jenjang' => $jenjang_value,
                'amount' => $total,
                'discount' => $discount?->percentage,
                'total' => $total_discount
            ]);
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function store(Request $request)
    {
        //testing
        // return response()->json($request->all());

        $validate = $request->validate([
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
            'student_residence_status' => 'required'
        ]);

        try {
            DB::beginTransaction();
            Register::create($validate);
            DB::commit();
            return Inertia::render('Register')->with('success', 'Data berhasil disimpan');
        } catch (\Exception $e) {
            DB::rollBack();
            return Inertia::render('Register')->with('error', 'Data gagal disimpan, '.$e->getMessage());
            Log::channel('debug')->error('Error: ' . $e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTrace(),
                'line' => $e->getLine(),
            ]);
        }
    }
}
