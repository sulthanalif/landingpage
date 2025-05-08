<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta content="" name="keywords" />
    <meta content="" name="description" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>{{ env('APP_NAME', 'Laravel') }}</title>

    <!-- Favicon -->
    {{-- <link href="{{ asset('landing/img/favicon.ico') }}" rel="icon"> --}}


    <link rel="stylesheet" type="text/css" href="{{ asset('landing/styles/bootstrap4/bootstrap.min.css') }}">
    <link href="{{ asset('landing/plugins/font-awesome-4.7.0/css/font-awesome.min.css') }}" rel="stylesheet"
        type="text/css">
    <link rel="stylesheet" type="text/css" href="{{ asset('landing/plugins/OwlCarousel2-2.2.1/owl.carousel.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('landing/plugins/OwlCarousel2-2.2.1/owl.theme.default.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('landing/plugins/OwlCarousel2-2.2.1/animate.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('landing/styles/main_styles.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('landing/styles/responsive.css') }}">

    <style>
        /* Sembunyikan Google Translate UI */
        .goog-logo-link,
        .goog-te-gadget,
        .goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        .goog-te-menu-frame,
        .skiptranslate {
        display: none !important;
        }

        body {
        top: 0px !important;
        }
    </style>


    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>

<body>
    <!-- Google Translate DIV (bisa disembunyikan) -->
    <div id="google_translate_element" style="display: none;"></div>

    <!-- Google Translate Script -->
    <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement(
            {
                pageLanguage: 'en',
                includedLanguages: 'en,id',
                autoDisplay: false
            },
            'google_translate_element'
            );
        }

        // Fungsi global untuk ubah bahasa
        window.changeLanguage = function(lang) {
            // Hapus banner jika muncul
            const iframe = document.querySelector('iframe.goog-te-banner-frame');
            if (iframe) iframe.remove();

            // Hapus div yang mungkin bikin offset layout
            const container = document.querySelector('.goog-te-banner-frame');
            if (container) container.remove();

            // Ubah value combo
            const select = document.querySelector('.goog-te-combo');
            if (select) {
                select.value = lang;
                select.dispatchEvent(new Event('change'));
            }
        };
    </script>
    <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

    @inertia

    <!-- JavaScript Libraries -->
    <script src="{{ asset('landing/js/jquery-3.2.1.min.js') }}"></script>
    <script src="{{ asset('landing/styles/bootstrap4/popper.js') }}"></script>
    <script src="{{ asset('landing/styles/bootstrap4/bootstrap.min.js') }}"></script>
    <script src="{{ asset('landing/plugins/greensock/TweenMax.min.js') }}"></script>
    <script src="{{ asset('landing/plugins/greensock/TimelineMax.min.js') }}"></script>
    <script src="{{ asset('landing/plugins/scrollmagic/ScrollMagic.min.js') }}"></script>
    <script src="{{ asset('landing/plugins/greensock/animation.gsap.min.js') }}"></script>
    <script src="{{ asset('landing/plugins/greensock/ScrollToPlugin.min.js') }}"></script>
    <script src="{{ asset('landing/plugins/OwlCarousel2-2.2.1/owl.carousel.js') }}"></script>
    <script src="{{ asset('landing/plugins/easing/easing.js') }}"></script>
    <script src="{{ asset('landing/plugins/parallax-js-master/parallax.min.js') }}"></script>
    <script src="{{ asset('landing/js/custom.js') }}"></script>
</body>

</html>
