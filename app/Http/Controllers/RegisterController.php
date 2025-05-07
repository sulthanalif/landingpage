<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Register;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
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
