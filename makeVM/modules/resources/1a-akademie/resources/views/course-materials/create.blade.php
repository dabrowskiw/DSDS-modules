@extends('layout')

@section('content')
    <h1 class="text-xl">
        Neues Material hinzufügen
    </h1>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <!-- Validation Errors -->
    <x-auth-validation-errors class="mb-4" :errors="$errors" />

    <form method="POST" action="{{ route('course-materials.store') }}" enctype="multipart/form-data">
    @csrf

        <div>
            <x-label for="name" value="Name" />

            <x-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus />
        </div>

        <div>
            <x-label for="file" value="Datei" />

            <x-input id="file" class="block mt-1 w-full" type="file" name="file" :value="old('file')" required />
        </div>

        <x-input id="course" type="hidden" name="course" :value="$course" />

        <div class="flex items-center justify-end mt-4">
            <x-button class="ml-3">
                Material erstellen
            </x-button>
        </div>
    </form>
@endsection
