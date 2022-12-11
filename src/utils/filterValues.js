const filterValues = (data, key) => {
	const arr = [];

	data.forEach((object) =>
		typeof object[key] === "string"
			? arr.push(object[key])
			: arr.push(...object[key])
	);
	const set = [...new Set(arr)];
	return set;
};
export default filterValues;
