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
