/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["FuturaPTW02-Book", ...defaultTheme.fontFamily.sans],
			},
			borderWidth: {
				1: "1px",
			},
			colors: {
				"brand-gray-1": "#dadce0",
				"brand-gray-2": "#e8eaed",
				// "brand-gray-2": "#f8f9fa",
				"brand-gray-3": "#80868b",
				"brand-blue-1": "#1967d2",
				"brand-blue-2": "#4285f4",
				"brand-green-1": "#137333",

				primary: {
					50: "#eff6ff",
					100: "#dbeafe",
					200: "#bfdbfe",
					300: "#93c5fd",
					400: "#60a5fa",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
					800: "#1e40af",
					900: "#1e3a8a",
				},
			},
			boxShadow: {
				blue: "0 0 3px 3px #4285f4",
				gray: "0 1px 3px 0 rgba(60, 64, 67, .3)",
			},
			maxWidth: {
				gallery: "980px",
			},
			screens: {
				xs: "320px",
				sm: "576px",
				// => @media (min-width: 576px) { ... }

				md: "960px",
				// => @media (min-width: 960px) { ... }

				lg: "1440px",
				// => @media (min-width: 1440px) { ... }
			},
		},
	},
	variants: {
		extend: {
			margin: ["first"],
		},
	},
	plugins: [],
};
