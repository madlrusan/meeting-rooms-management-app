export const getInitials = (name: string) => {
	const names = name.split(" ");
	let initials = "";
	for(name in names) {
		initials += (names[name].substring(0,1).toUpperCase());
	}
	return initials;
};

export const getRandomBgColor = (string: string) =>{
	let hash = 13;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return {
		sx: {
			bgcolor: color,
		}
	};
};