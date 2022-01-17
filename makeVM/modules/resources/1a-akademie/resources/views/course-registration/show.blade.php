@extends('layout')

@section('content')
    <h1 class="text-xl py-3">
        Kurs-Belegung
    </h1>

    <p>
        Belegung des Kurses "{{ $registration->course->name }}".
    </p>

    <button
        onclick="window.location.href = '{{ route('course-materials.index', ['course' => $registration->course->id])  }}'"
        class="mt-3"
    >
        Liste aller Materialien anzeigen
    </button>

    <br />
    <button
        onclick="window.location.href = '{{ route('courses.show', ['course' => $registration->course])  }}'"
        class="mt-1"
    >
        Kurs in der Liste anzeigen
    </button>
@endsection
