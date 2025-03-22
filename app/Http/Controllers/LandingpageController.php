<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingpageController extends Controller
{
    public function index()
    {
        $posts = Post::with(['category', 'user'])->latest()->paginate(5);
        $activities = Activity::latest()->paginate(5);

        return Inertia::render('Home', [
            'title' => 'Home',
            'posts' => $posts,
            'activities' => $activities
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

    public function register()
    {
        return Inertia::render('Register');
    }

    public function allNews()
    {
        $posts = Post::with(['category', 'user'])->latest()->get();

        return Inertia::render('AllNews', [
            'posts' => $posts
        ]);
    }

    public function detailNews($slug)
    {
        $latest = Post::with(['category', 'user'])->latest()->limit(3)->get();
        $post = Post::with(['category', 'user'])->where('slug', $slug)->first();

        return Inertia::render('DetailNews', [
            'latest' => $latest,
            'post' => $post
        ]);
    }

    public function allActivities()
    {
        $activities = Activity::latest()->get();

        return Inertia::render('AllActivity', [
            'activities' => $activities
        ]);
    }
}
