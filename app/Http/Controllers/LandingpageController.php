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
        $tables = DynamicTable::with([
            'columns' => fn ($q) => $q->orderBy('order'),
            'rows.values'
        ])->where('status', true)->get()->map(function ($table) {
            $columns = $table->columns->map(function ($col) {
                return [
                    'label' => $col->label,
                    'name' => $col->name,
                ];
            });

            $rows = $table->rows->map(function ($row) use ($table) {
                $orderedValues = $table->columns->map(function ($column) use ($row) {
                    return optional(
                        $row->values->firstWhere('column_id', $column->id)
                    )->value ?? null;
                });

                return $orderedValues->toArray();
            });

            return [
                'name' => $table->name,
                'slug' => $table->slug,
                'columns' => $columns,
                'rows' => $rows,
            ];
        });

        //output
        // [
        //     'name' => 'Tuition Fees',
        //     'slug' => 'tuition-fees',
        //     'columns' => [
        //         ['label' => 'C1', 'name' => 'c1'],
        //         ['label' => 'C2', 'name' => 'c2'],
        //     ],
        //     'rows' => [
        //         ['r11', 'r12'],
        //         ['r21', 'r22'],
        //     ]
        // ]

        return Inertia::render('Admission', [
            'tables' => $tables,
        ]);
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
