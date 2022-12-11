const createSet = (data, key) => {
	const arr = [];

	data.forEach((object) =>
		typeof object[key] === "string"
			? arr.push(object[key])
			: arr.push(...object[key])
	);
	const set = new Set(arr);
	// console.log(set);
	return set;
};
export default createSet;
