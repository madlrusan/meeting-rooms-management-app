export const LoginRoom = async ({ email, password }: { string; string }) => {
	const response = await fetch(`${BASE_URL_API}${login}`, {});
};
