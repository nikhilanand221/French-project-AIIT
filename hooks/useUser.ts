import { useEffect, useState } from "react";
import { UserService } from "../services/userService";
import { User } from "../types/Game";

export function useUser() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadUser();
	}, []);

	const loadUser = async () => {
		try {
			const userData = await UserService.getUser();
			setUser(userData);
			// Update streak when app loads
			await UserService.updateStreak();
		} catch (error) {
			console.error("Error loading user:", error);
		} finally {
			setLoading(false);
		}
	};

	const addXP = async (amount: number) => {
		try {
			const updatedUser = await UserService.addXP(amount);
			setUser(updatedUser);
			return updatedUser;
		} catch (error) {
			console.error("Error adding XP:", error);
			return user;
		}
	};

	const updateName = async (name: string) => {
		try {
			await UserService.updateUserName(name);
			if (user) {
				setUser({ ...user, name });
			}
		} catch (error) {
			console.error("Error updating name:", error);
		}
	};

	return {
		user,
		loading,
		addXP,
		updateName,
		refresh: loadUser,
	};
}
