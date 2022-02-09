@extends('layout')

@section('content')
    <h1 class="text-xl py-3">
        Alle Kurse
    </h1>

    <p>
        Unsere Akademie bietet Ihnen alle diese schönen Kurse an:
    </p>

    @foreach($courses as $course)

        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">{{ $course->name }}</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body p-2">
                <p>{{ $course->description }}</p>
                <p>{{ $course->price }}</p>

                <br />
                <button
                    onclick="window.location.href = '{{ route('courses.show', ['course' => $course])  }}'"
                    class="mt-1"
                >
                    Kurs anzeigen oder belegen
                </button>
            </div>
        </div>

    @endforeach

@endsection
