@extends('layout')

@section('content')
    <h1 class="text-xl py-3">
        Bezahlmethoden
    </h1>

    <p>
        Sie haben folgende Bezahlmethoden, um bei uns zu bezahlen:<br />
        Wir halten Ihre Kartendetails ganz bestimmt sicher, machen Sie sich da keine Sorgen!
    </p>

    @foreach($paymentData as $paymentMethod)

        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">{{ $paymentMethod->card_name }}</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body p-2">
                <p>Karte, welche {{ $paymentMethod->expiration_date }} ausläuft.</p>
            </div>
        </div>

    @endforeach

    <button
        onclick="window.location.href = '{{ route('payment-data.create')  }}'"
    >
        Neue Karte hinzufügen
    </button>

@endsection
