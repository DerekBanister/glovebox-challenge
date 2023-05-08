/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "darkblue": "#1A2634",
                "blue": "#3E4F6A",
                "grey": "#D9D9D9",
            },
        },
    },
    plugins: [],
}

// colors: {
//     "primary": {
//         "blue": "#1a202c",
//         "gray": "#718096",
//         "white": "#e2e8f0",
//     },
//     "secondary": "#718096",
//     "tertiary": "#e2e8f0",
// }