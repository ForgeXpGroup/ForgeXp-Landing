/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        colors: {
            black: {
                0: "#252422",
            },
            white: {
                0: "#E0E1DD",
                1: "#ffffff",
            },
            blue: {
                0: "#457B9D",
                1: "#437390",
            },
            red: {
                0: "#EF233C",
            },
            green: {
                0: "#5bcd5d",
            },
        },
        fontFamily: {
            gabarito: ["Gabarito", "sans-serif"],
        },
        extend: {
            maskImage: {
                "custom-gradient": "linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent)",
            },
            animation: {
                "spin-slow": "spin 20s linear infinite",
                "spin-slow-2": "spin 20s linear infinite reverse",
                "bounce-slow": "bounce2 5s infinite",
                "bounce-slow-2": "bounce2 7s infinite",
                "slide-card": "slide 3s ease-in-out infinite",
                decService: "decService 10s ease-in-out infinite",
            },
            keyframes: {
                bounce2: {
                    "0%, 100%": { transform: "translateY(-3%);" },
                    "50%": { transform: "translateY(2%)" },
                },
                slide: {
                    "0%": { transform: "translateX(-100%)", opacity: 0 },
                    "10%": { transform: "translateX(0%)", opacity: 1 },
                    "90%": { transform: "translateX(0%)", opacity: 1 },
                    "100%": { transform: "translateX(100%)", opacity: 0 },
                },
                decService: {
                    "0%, 100%": { transform: "translateY(-3%) rotate(4deg)" },
                    "50%": { transform: "translateY(2%) rotate(-5deg)" },
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                ".mask-image-custom": {
                    "mask-image": "linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent)",
                },
            });
        },
    ],
};
