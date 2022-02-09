@extends('layout')

@section('content')
    <h1 class="text-xl py-3">
        Deine belegten Kurse
    </h1>

    <p>
        Diese Kurse hast du derzeit belegt:
    </p>

    @foreach($registrations as $registration)

        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">{{ $registration->course->name }}</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body p-2">
                <p>{{ $registration->course->description }}</p>

                <br />
                <button
                    onclick="window.location.href = '{{ route('course-registrations.show', ['course_registration' => $registration])  }}'"
                    class="mt-1"
                >
                    Details anzeigen
                </button>
            </div>
        </div>

    @endforeach

@endsection
