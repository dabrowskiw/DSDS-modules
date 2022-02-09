@extends('layout')

@section('content')
    <h1 class="text-xl py-3">
        {{ $course->name }}
    </h1>

    <p class="py-3">
        {{ $course->description }}
    </p>

    <p class="py-3">
        ...und das für nur <b>{{ $course->price }}€</b>!
    </p>

    @if(Auth::user()->id === 1)
        <p class="mt-3">
            Du besitzt die User ID 1 und bist damit Administrator.
        </p>
        <br />
        <button
            onclick="window.location.href = '{{ route('course-materials.create', ['course' => $course->id])  }}'"
        >
            ADMIN: Kursdaten hochladen
        </button>
    @endif

    

    <button
            onclick="window.location.href = '{{ route('course-materials.index', ['course' => $course->id])  }}'"
            class="mt-3"
        >
            Liste aller Materialien anzeigen
        </button>

    <br />
    <button
        onclick="window.location.href = '{{ route('course-registrations.create', ['course' => $course->id])  }}'"
        class="mt-1"
    >
        Jetzt belegen
    </button>
@endsection
