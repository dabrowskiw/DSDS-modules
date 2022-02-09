<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>1A Gesundheit Akademie Kurse</title>
  {{-- <script src="https://unpkg.com/tailwindcss-jit-cdn"></script> --}}
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
  <link
    rel="stylesheet"
    href="https://unpkg.com/98.css"
  >
  <link href="{{ asset('css/main.css') }}" rel="stylesheet">
  <link rel="shortcut icon" href="/assets/favicon.png" type="image/png">
</head>
<body class="w-screen h-screen">
  <div class="w-full h-full p-3">
    <div class="window w-full h-full">
      <div class="title-bar">
        <div class="title-bar-text">1A Gesundheit Akademie Kurse</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" onclick="window.location.href = '{{ route('index')  }}'"></button>
        </div>
      </div>
      <div class="window-body overflow-auto p-5">
        @yield('content')
      </div>
    </div>
  </div>
</body>
</html>
