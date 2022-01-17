@extends('layout')

@section('content')
    <h1 class="text-xl py-3">
        Alle KursMaterialien
    </h1>

    <p>
        Unsere Akademie bietet Ihnen alle diese schönen Materialien an:
    </p>

    @foreach($course_materials as $course_material)

        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">{{ $course_material->name }}</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body p-2">
                <p>{{ $course_material->name }}</p>
                
                <br />
                <button
                    onclick="window.location.href = '{{ route('course-materials.show', ['course_material' => $course_material])  }}'"
                    class="mt-1"
                >
                    Material anzeigen
                </button>
            </div>
        </div>

    @endforeach

@endsection
