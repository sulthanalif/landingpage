<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Career;
use Illuminate\Http\Request;
use App\Models\CareerRegister;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;

class CareerController extends Controller
{
    public function page()
    {
        return Inertia::render('Career');
    }

    public function getData()
    {
        try {
            // $now = now();

            $careers = Career::latest()
                ->get()
                ->filter(function($career) {
                    return $career->is_active;
                })->values();

            return $this->successResponse(data: compact('careers'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function store(Request $request, Career $career)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'location' => 'required|string',
            'birth_date' => 'required|date',
            'description' => 'required|string',
            'cv' => 'required|file|mimes:pdf|max:2048',
            'phone_number' => 'required|string',
        ]);

        if ($validator->fails()) return $this->errorResponse($validator->errors());


        try {
            DB::beginTransaction();

            $cvPath = null;

            if ($request->hasFile('cv')) {
                $cvPath = $request->file('cv')->store('cv', 'public');
            }

            $careerRegister = CareerRegister::create([
                'career_id'     => $career->id,
                'name'          => $request->input('name'),
                'email'         => $request->input('email'),
                'location'      => $request->input('location'),
                'birth_date'    => $request->input('birth_date'),
                'description'   => $request->input('description'),
                'cv'            => $cvPath,
                'phone_number'  => $request->input('phone_number'),
            ]);

            DB::commit();

            Notification::route('mail', 'hrd@lscs.sch.id')->notify(new \App\Notifications\CareerNotification($careerRegister->toArray(), $career->toArray()));
            return $this->successResponse(data: compact('careerRegister'));
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e);
        }
    }
}
