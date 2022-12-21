const createSetFromNestedArray = (data: [], key: string) => {
	const arr: string[] = [];

	data.forEach((item) =>
		typeof item[key] === "string" ? arr.push(item[key]) : arr.push(...item[key])
	);
	const set = new Set<string[]>(arr);
	// console.log(set);
	return set;
};
export default createSetFromNestedArray;
