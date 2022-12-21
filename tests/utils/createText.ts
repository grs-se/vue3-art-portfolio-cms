import type { Text } from "@/api/types";

export const createText = (text: Partial<Text> = {}): Text => ({
	id: "1",
	heading: "Essay",
	categories: ["Essay", "Fiction"],
	content: ["Lorem ipsum"],
	slug: "essay",
	...text,
});
