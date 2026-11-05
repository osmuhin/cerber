export const serverToClientUser = (user: App.Server.User): App.User => {
	return {
		id: user.id,
		firstName: user.first_name,
		lastName: user.last_name,
		email: user.email,
		timezone: user.timezone,
		timezoneOffset: user.timezone_offset,
		isAdmin: user.is_admin,
		createdAt: new Date(user.created_at * 1000),
		deletedAt: user.deleted_at === null ? null : new Date(user.deleted_at * 1000)
	}
}
