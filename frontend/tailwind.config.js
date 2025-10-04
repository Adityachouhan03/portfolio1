/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	darkMode: ["class", "[data-theme='dark']"],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "#7c4dff",
					soft: "#b39ddb",
				},
			},
		},
	},
	plugins: [],
};


