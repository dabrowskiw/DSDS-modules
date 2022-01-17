@extends('layout')

@section('content')
    <h1 class="text-xl">
        Kurs anmelden
    </h1>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <!-- Validation Errors -->
    <x-auth-validation-errors class="mb-4" :errors="$errors" />

    <p>
        Wollen Sie sich bei diesem Kurs wirklich anmelden? Ihre angegebene Zahlungsmethode wird hierdurch belastet.
    </p>

    <form method="POST" action="{{ route('course-registrations.store') }}">
        @csrf

        <x-input id="course" type="hidden" name="course" :value="$course" />

        <div class="flex items-center justify-end mt-4">
            <x-button class="ml-3">
                Jetzt zahlungspflichtig anmelden
            </x-button>
        </div>
    </form>
@endsection
