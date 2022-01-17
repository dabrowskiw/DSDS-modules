@extends('layout')

@section('content')
    <h1 class="text-xl py-3">
        {{ $course_material->name }}
    </h1>

    <p class="py-3">
        Views: {{ $course_material->download_count }}
    </p>

    <p>Inhalt:</p>
    <iframe src="{{ route('course-materials.download', ["file" => $course_material->path]) }}" style="width:100%;min-height:300px;background:white;" frameborder="0"></iframe>

@endsection
