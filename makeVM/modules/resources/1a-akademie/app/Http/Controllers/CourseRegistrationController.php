<?php

namespace App\Http\Controllers;

use App\Models\CourseRegistration;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseRegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('course-registration.index', ["registrations" => Auth::user()->registrations]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if (!$request->input('course')) {
            return "Bitte Kurs angeben";
        }
        return view('course-registration.create', [ "course" => $request->input('course') ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'course' => 'required|integer',
        ]);

        // Pretend that we are charging your payment card here...
        // This is just for hacking so don't expect us to set up a complete payment platform, duh

        $registration = new CourseRegistration();
        $registration->user_id = Auth::user()->id;
        $registration->course_id = $request->input('course');
        $registration->save();

        return redirect()->route('course-registrations.show', [ 'course_registration' => $registration ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CourseRegistration  $courseRegistration
     * @return \Illuminate\Http\Response
     */
    public function show(CourseRegistration $courseRegistration)
    {
        if ($courseRegistration->user->id !== Auth::user()->id) {
            return "Darf ich nicht anzeigen";
        }
        return view('course-registration.show', ["registration" => $courseRegistration]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CourseRegistration  $courseRegistration
     * @return \Illuminate\Http\Response
     */
    public function edit(CourseRegistration $courseRegistration)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CourseRegistration  $courseRegistration
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CourseRegistration $courseRegistration)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CourseRegistration  $courseRegistration
     * @return \Illuminate\Http\Response
     */
    public function destroy(CourseRegistration $courseRegistration)
    {
        //
    }
}
