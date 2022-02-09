@extends('layout')

@section('content')
    <h1 class="text-xl">
        Neuen Kurs hinzufügen
    </h1>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <!-- Validation Errors -->
    <x-auth-validation-errors class="mb-4" :errors="$errors" />

    <form method="POST" action="{{ route('courses.store') }}">
    @csrf

        <div>
            <x-label for="name" value="Name" />

            <x-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus />
        </div>

        <div>
            <x-label for="price" value="Preis" />

            <x-input id="price" class="block mt-1 w-full" type="text" name="price" :value="old('price')" required placeholder="0.00" />
        </div>

        <div>
            <x-label for="description" value="Beschreibung" />

            <x-input id="description" class="block mt-1 w-full" type="text" name="description" :value="old('description')" required />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-button class="ml-3">
                Kurs erstellen
            </x-button>
        </div>
    </form>
@endsection
