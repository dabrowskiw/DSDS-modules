<?php

namespace App\Http\Controllers;

use App\Models\CourseMaterial;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseMaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!$request->input('course')) {
            return "Bitte Kurs angeben";
        }

        return view('course-materials.index', ["course_materials" => CourseMaterial::where('course_id', $request->input('course'))->get() ]);
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

        return view('course-materials.create', [ 'course' => $request->input('course') ]);
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
            'name' => 'required|max:255',
            'course' => 'required|numeric',
            'file' => 'required'
        ]);

        if (!$request->hasFile('file')) {
            return "Keine Datei gefunden";
        }

        $path = $request->file('file')->store("public/{$request->course}");

        $courseMaterial = new CourseMaterial();
        $courseMaterial->course_id = $request->input('course');
        $courseMaterial->name = $request->input('name');
        $courseMaterial->path = $path;
        $courseMaterial->download_count = 0;
        $courseMaterial->save();

        return redirect()->route('course-materials.show', [ 'course_material' => $courseMaterial ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CourseMaterial  $courseMaterial
     * @return \Illuminate\Http\Response
     */
    public function show(CourseMaterial $courseMaterial)
    {
        $courseMaterial->download_count++;
        $courseMaterial->save();

        return view('course-materials.show', [ 'course_material' => $courseMaterial ]);
    }

    /**
     * Let the user download the file
     */
    public function download(Request $request)
    {
        $this->validate($request, [
            'file' => 'required',
        ]);

        $filePath = realpath(storage_path() . '/app/' . $request->input('file'));
        if (!file_exists($filePath)) {
            return "Datei des Materials nicht gefunden";
        }

        return response(file_get_contents($filePath))->header('Content-Type', mime_content_type($filePath));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CourseMaterial  $courseMaterial
     * @return \Illuminate\Http\Response
     */
    public function edit(CourseMaterial $courseMaterial)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CourseMaterial  $courseMaterial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CourseMaterial $courseMaterial)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CourseMaterial  $courseMaterial
     * @return \Illuminate\Http\Response
     */
    public function destroy(CourseMaterial $courseMaterial)
    {
        //
    }
}
