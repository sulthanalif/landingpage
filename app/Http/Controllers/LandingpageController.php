<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingpageController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'title' => 'Home',
        ]);
    }

    public function about()
    {
        return Inertia::render('About');
    }

    public function story()
    {
        return Inertia::render('Story');
    }

    public function admission()
    {
        return Inertia::render('Admission');
    }

    public function curriculum()
    {
        return Inertia::render('Curriculum');
    }

    public function apply()
    {
        return Inertia::render('Apply');
    }

    public function calendarAcademic()
    {
        return Inertia::render('CalendarAcademic');
    }

    public function accreditation()
    {
        return Inertia::render('Accreditation');
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }
}
