<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $code }} - {{ $title }}</title>
    <style>
        body {
            background-color: #f8f9fc;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            overflow: hidden;
        }

        .error-container {
            text-align: center;
            animation: fadeIn 1.5s ease-out;
        }

        .error-code {
            font-size: 100px;
            font-weight: bold;
            color: #4e73df;
            margin: 0;
            animation: slideDown 1s ease-out;
        }

        .error-message {
            font-size: 24px;
            color: #858796;
            margin: 10px 0;
            animation: slideUp 1s ease-out;
        }

        .btn-home {
            padding: 10px 20px;
            font-size: 18px;
            color: white;
            background-color: #4e73df;
            margin-top: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .btn-home:hover {
            background-color: #2e59d9;
        }

        @keyframes fadeIn {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        @keyframes slideDown {
            0% {
                transform: translateY(-50px);
                opacity: 0;
            }

            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @keyframes slideUp {
            0% {
                transform: translateY(50px);
                opacity: 0;
            }

            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
    </style>
</head>

<body>
    <div class="error-container">
        <h1 class="error-code">{{ $code }}</h1>
        <p class="error-message">Oops! {{ $message }}</p>
        <div class="realtime" id="realtime"></div>
        @if ($button)
            <button class="btn-home" onclick="window.location.href='/'">Go to Home</button>
        @endif
    </div>
    <script>
        const date = new Date();
        const realtime = document.getElementById('realtime');

        function renderTime() {
            const time = date.toLocaleTimeString();
            realtime.textContent = time;
        }

        renderTime();
        setInterval(renderTime, 1000);
    </script>
</body>

</html>
