<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\Activity;
use App\Models\Calendar;
use App\Models\Question;
use App\Models\WhyChooseUs;
use App\Models\DynamicTable;
use Illuminate\Http\Request;
use App\Models\Accreditation;

class LandingpageController extends Controller
{
    public function index()
    {
        return Inertia::render('Home');
    }

    public function about()
    {
        return Inertia::render('About');
    }

    public function story()
    {
        return Inertia::render('Story');
    }

    public function detailStory()
    {
        return Inertia::render('DetailStory');
    }

    public function teacher()
    {
        return Inertia::render('Teacher');
    }

    public function admission()
    {
        return Inertia::render('Admission');
    }

    public function curriculum()
    {
        return Inertia::render('Curriculum');
    }

    public function extracurricular()
    {
        return Inertia::render('Extracurricular');
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

    public function payment()
    {
        return Inertia::render('Payment');
    }

    public function allNews()
    {
        return Inertia::render('AllNews');
    }

    public function detailNews($slug)
    {
        return Inertia::render('DetailNews', ['slug' => $slug]);
    }

    public function allActivities()
    {
        return Inertia::render('AllActivity');
    }
}
