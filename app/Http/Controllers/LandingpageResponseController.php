<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Career;
use App\Models\Teacher;
use App\Models\Activity;
use App\Models\Calendar;
use App\Models\Question;
use App\Models\TuitionFee;
use App\Models\WhyChooseUs;
use Illuminate\Http\Request;
use App\Models\Accreditation;
use App\Models\Extracurricular;

class LandingpageResponseController extends Controller
{
    public function getDataHome()
    {
        try {
            $posts = Post::with(['category:id,name', 'user:name'])->where('status', true)->paginate(5);
            $activities = Activity::latest()->where('status', true)->paginate(5);
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
            $activities = Activity::where('status', true)->get();

            return $this->successResponse(data: compact('activities'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function teachers()
    {
        try {
            $teachers = Teacher::where('status', true)->get();

            return $this->successResponse(data: compact('teachers'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function tableFees()
    {
        try {
            $tuitionFees = TuitionFee::getAllTable();

            return $this->successResponse(data: compact('tuitionFees'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function calendars()
    {
        try {
            $calendars = Calendar::where('status', true)->get();

            return $this->successResponse(data: compact('calendars'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function accreditations()
    {
        try {
            $accreditations = Accreditation::where('status', true)->get();

            return $this->successResponse(data: compact('accreditations'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function posts()
    {
        try {
            $posts = Post::with(['category:id,name', 'user:name'])->where('status', true)->latest()->get();

            return $this->successResponse(data: compact('posts'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function detailPost($slug)
    {
        try {
            $latest = Post::with(['category:id,name', 'user:name'])->where('status', true)->latest()->limit(3)->get();
            $post = Post::with(['category:id,name', 'user:name'])->where('status', true)->where('slug', $slug)->first();

            return $this->successResponse(data: compact('latest', 'post'));
        } catch (\Throwable $th) {
            return $this->errorResponse($th);
        }
    }

    public function careers()
    {
        try {
            $now = now();

            $careers = Career::where('start_date', '<=', $now)
                ->where('end_date', '>=', $now)
                ->latest()
                ->get();

            return $this->successResponse(data: compact('careers'));
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
}
