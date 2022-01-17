@extends('layout')

@section('content')
    <div class="flex justify-center w-full">
        <img src="{{ asset('assets/logo_main.png') }}" style="width: 50vw;" alt="">
    </div>

    <h1 class="text-xl">
        Willkommen zum Kurswahlsystem der 1A Gesundheit Akademie!
    </h1>

    @auth

        Hallo, {{ Auth::user()->name }}.

        <br />

        <button
            onclick="window.location.href = '{{ route('courses.index')  }}'"
            class="mt-3"
        >
            Liste aller Kurse anzeigen
        </button>

        <br />
        <button
            onclick="window.location.href = '{{ route('course-registrations.index')  }}'"
            class="mt-3"
        >
            Belegte Kurse anzeigen
        </button>

        <br />
        <button
            onclick="window.location.href = '{{ route('payment-data.index')  }}'"
            class="mt-3"
        >
            Meine Zahlungsmethoden anzeigen
        </button>

        @if(Auth::user()->id === 1)
            <p class="mt-3">
                Du besitzt die User ID 1 und bist damit Administrator.
            </p>
            <br />
            <button
                onclick="window.location.href = '{{ route('courses.create')  }}'"
            >
                ADMIN: Neuen Kurs erstellen
            </button>
        @endif

        <form method="POST" action="{{ route('logout') }}">
            @csrf

            <button type="submit" class="mt-5">
                Abmelden
            </button>
        </form>

    @endauth
    @guest

        Melden Sie sich jetzt an, um auf Ihre Inhalte zuzugreifen!

        <br />

        <button
            onclick="window.location.href = '{{ route('login')  }}'"
        >
            Anmelden
        </button>

    @endguest
@endsection
