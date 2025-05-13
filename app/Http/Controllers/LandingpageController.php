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
use Illuminate\Http\Request;
use App\Models\Accreditation;

class LandingpageController extends Controller
{
    public function index()
    {
        $posts = Post::with(['category', 'user'])->where('status', true)->latest()->paginate(5);
        $activities = Activity::latest()->where('status', true)->paginate(5);
        $faqs = Question::where('status', true)->get();
        $wcus = WhyChooseUs::where('status', true)->get();

        return Inertia::render('Home', [
            'title' => 'Home',
            'posts' => $posts,
            'activities' => $activities,
            'faqs' => $faqs,
            'wcus' => $wcus
        ]);
    }

    public function about()
    {
        return Inertia::render('About');
    }

    public function story()
    {
        $activities = Activity::where('status', true)->get();

        return Inertia::render('Story', [
            'activities' => $activities
        ]);
    }

    public function teacher()
    {
        $teachers = Teacher::where('status', true)->get();
        return Inertia::render('Teacher', [
            'teachers' => $teachers
        ]);
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
        $calendars = Calendar::where('status', true)->get();

        return Inertia::render('CalendarAcademic', [
            'calendars' => $calendars
        ]);
    }

    public function accreditation()
    {
        $accreditations = Accreditation::where('status', true)->get();

        return Inertia::render('Accreditation', [
            'accreditations' => $accreditations
        ]);
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }

    public function register()
    {
        return Inertia::render('Register');
    }

    public function payment()
    {
        return Inertia::render('Payment');
    }

    public function allNews()
    {
        $posts = Post::with(['category', 'user'])->where('status', true)->latest()->get();

        return Inertia::render('AllNews', [
            'posts' => $posts
        ]);
    }

    public function detailNews($slug)
    {
        $latest = Post::with(['category', 'user'])->where('status', true)->latest()->limit(3)->get();
        $post = Post::with(['category', 'user'])->where('status', true)->where('slug', $slug)->first();

        return Inertia::render('DetailNews', [
            'latest' => $latest,
            'post' => $post
        ]);
    }

    public function allActivities()
    {
        $activities = Activity::where('status', true)->latest()->get();

        return Inertia::render('AllActivity', [
            'activities' => $activities
        ]);
    }
}
