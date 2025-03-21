import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./vendor/robsontenorio/mary/src/View/Components/**/*.php",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require("daisyui")],

    daisyui: {
        themes: [
            "black",
            "business",
            "dim",
            {
                lofi: {
                    "color-scheme": "light",
                    "base-100": "oklch(100% 0 0)",
                    "base-200": "oklch(97% 0 0)",
                    "base-300": "oklch(94% 0 0)",
                    "base-content": "oklch(0% 0 0)",
                    primary: "oklch(15.906% 0 0)",
                    "primary-content": "oklch(100% 0 0)",
                    secondary: "oklch(21.455% 0.001 17.278)",
                    "secondary-content": "oklch(100% 0 0)",
                    accent: "oklch(26.861% 0 0)",
                    "accent-content": "oklch(100% 0 0)",
                    neutral: "oklch(0% 0 0)",
                    "neutral-content": "oklch(100% 0 0)",
                    info: "oklch(79.54% 0.103 205.9)",
                    "info-content": "oklch(15.908% 0.02 205.9)",
                    success: "oklch(90.13% 0.153 164.14)",
                    "success-content": "oklch(18.026% 0.03 164.14)",
                    warning: "oklch(88.37% 0.135 79.94)",
                    "warning-content": "oklch(17.674% 0.027 79.94)",
                    error: "oklch(78.66% 0.15 28.47)",
                    "error-content": "oklch(15.732% 0.03 28.47)",
                    "radius-selector": "2rem",
                    "radius-field": "0.5rem",
                    "radius-box": "1rem",
                    "size-selector": "0.25rem",
                    "size-field": "0.25rem",
                    border: "1px",
                    depth: "0",
                    noise: "0",
                },
            },
        ],
    },

    darkMode: "class",
};
