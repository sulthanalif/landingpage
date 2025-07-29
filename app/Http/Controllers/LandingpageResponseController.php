<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Career;
use App\Models\Teacher;
use App\Models\Activity;
use App\Models\Calendar;
use App\Models\Category;
use App\Models\Facility;
use App\Models\Question;
use App\Models\TuitionFee;
use App\Models\SubActivity;
use App\Models\WhyChooseUs;
use Illuminate\Http\Request;
use App\Models\Accreditation;
use App\Models\Extracurricular;
use App\Models\TitleTuitionFee;

class LandingpageResponseController extends Controller
{
    public function getDataHome()
    {
        try {
            $posts = Post::with(['category:id,name', 'user:name'])->where('status', true)->latest()->paginate(5);
            $activities = Activity::where('status', true)->latest()->limit(10)->get();
            $faqs = Question::where('status', true)->get();
            $wcus = WhyChooseUs::where('status', true)->get();

            return $this->successResponse(data: compact('posts', 'activities', 'faqs', 'wcus'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function activities()
    {
        try {
            $activities = Activity::with(['subActivities' => function($query) {
                $query->where('status', true);
            }])
            ->where('status', true)
            ->get();

            return $this->successResponse(data: compact('activities'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function detailActivity($id)
    {
        try {
            $activity = SubActivity::where('id', $id)
            ->where('status', true)
            ->first();

            return $this->successResponse(data: compact('activity'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function teachers()
    {
        try {
            $teachers = Teacher::where('status', true)->orderBy('order', 'asc')->get();

            return $this->successResponse(data: compact('teachers'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function tableFees()
    {
        try {
            $tuitionFees = TuitionFee::getAllTableActive()->map(function ($item) {
                // Ubah semua nilai angka dalam setiap baris menjadi format Rupiah
                $item['rows'] = collect($item['rows'])->map(function ($row) {
                    foreach ($row as $key => $value) {
                        if (is_numeric($value) && $key !== 'level') {
                            $row[$key] = 'Rp. ' . number_format((int) $value, 0, ',', '.');
                        }
                    }
                    return $row;
                });
                return $item;
            });

            $title = TitleTuitionFee::first()->value;

            return $this->successResponse(data: compact('tuitionFees', 'title'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function calendars()
    {
        try {
            $calendars = Calendar::where('status', true)->get()->map(function ($calendar) {
                return [
                    'id' => $calendar->id,
                    'description' => $calendar->description,
                    'css' => $calendar->color->css,
                    'code' => $calendar->color->code,
                    'category' => $calendar->color->name,
                    'start_date' => $calendar->start_date,
                    'end_date' => $calendar->end_date,
                ];
            });

            return $this->successResponse(data: compact('calendars'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function accreditations()
    {
        try {
            $accreditations = Accreditation::where('status', true)->orderBy('order', 'asc')->get();

            return $this->successResponse(data: compact('accreditations'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function posts()
    {
        try {
            $categories = Category::where('status', true)->get();
            $posts = Post::with(['category:id,name', 'user:name'])->where('status', true)->latest()->get();

            return $this->successResponse(data: compact('posts', 'categories'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function detailPost($slug)
    {
        try {
            $upcomings = Post::with(['category:id,name', 'user:name'])->where('status', true)->where('published_at', '>', date('Y-m-d'))->get();
            $latest = Post::with(['category:id,name', 'user:name'])->where('status', true)->latest()->limit(3)->get();
            $post = Post::with(['category:id,name', 'user:name'])->where('status', true)->where('slug', $slug)->first();
            $categories = Category::withCount('posts')->where('status', true)->get();

            return $this->successResponse(data: compact('latest', 'post', 'categories', 'upcomings'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function extra()
    {
        try {
            $extracurriculars = Extracurricular::where('status', true)->latest()->get();

            return $this->successResponse(data: compact('extracurriculars'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function facilities()
    {
        try {
            $facilities = Facility::where('status', true)->latest()->get();

            return $this->successResponse(data: compact('facilities'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }
}
