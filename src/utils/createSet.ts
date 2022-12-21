const createSet = <T>(data: T[], key: T) => {
	const arr: [] = [];

	data.forEach((item) =>
		typeof item[key] === "string" ? arr.push(item[key]) : arr.push(...item[key])
	);
	const set = new Set<[]>(arr);
	// console.log(set);
	return set;
};
export default createSet;
