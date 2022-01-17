@extends('layout')

@section('content')
    <h1 class="text-xl">
        Neue Karte hinzufügen
    </h1>

    <p>
        Wir akzeptieren derzeit nur VISA-Karten, danke bitte.
    </p>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <!-- Validation Errors -->
    <x-auth-validation-errors class="mb-4" :errors="$errors" />

    <form method="POST" action="{{ route('payment-data.store') }}">
    @csrf

        <div>
            <x-label for="name" value="Name auf der Karte" />

            <x-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus placeholder="Max Mustermann" />
        </div>

        <div>
            <x-label for="number" value="Kartennummer" />

            <x-input id="number" class="block mt-1 w-full" type="text" name="number" :value="old('number')" required placeholder="0000-0000-0000-0000" />
        </div>

        <div>
            <x-label for="cvc" value="Kontrollnummer" />

            <x-input id="cvc" class="block mt-1 w-full" type="text" name="cvc" :value="old('cvc')" required placeholder="123" />
        </div>

        <div>
            <x-label for="expiration" value="Expiration Datum" />

            <x-input id="expiration" class="block mt-1 w-full" type="text" name="expiration" :value="old('expiration')" required placeholder="01/23" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-button class="ml-3">
                Karte hinzufügen
            </x-button>
        </div>
    </form>
@endsection
