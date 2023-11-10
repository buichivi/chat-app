/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            flex: {
                2: "2 2 0%",
            },
            spacing: {
                'chats': "calc(100% - 64px - 36px)",
            },
            colors: {
                current: 'currentColor',
            }
        },
    },
    plugins: [],
};
