<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class LandingpageController extends Controller
{
    public function index()
    {
        return inertia('Home', [
            'title' => 'Home',
            'users' => User::all(),
        ]);
    }
}
