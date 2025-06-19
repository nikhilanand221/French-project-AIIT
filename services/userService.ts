import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
	id: string;
	name: string;
	email: string;
	totalXP: number;
	level: number;
	streak: number;
	lastActiveDate: Date;
	preferences: {
		notifications: boolean;
		sounds: boolean;
		language: string;
	};
}

export interface Progress {
	userId: string;
	currentChapter: number;
	totalXP: number;
	streak: number;
	chaptersCompleted: number;
	lessonsCompleted: number;
	lastActiveDate: Date;
	chapterProgress: ChapterProgress[];
}

export interface ChapterProgress {
	chapterId: number;
	completed: boolean;
	score: number;
	timeSpent: number;
	unlockedAt: Date;
	completedAt?: Date;
}

export interface Challenge {
	id: string;
	title: string;
	description: string;
	type: "daily" | "weekly" | "special";
	progress: number;
	maxProgress: number;
	xpReward: number;
	completed: boolean;
	completedAt?: Date;
	expiresAt: Date;
}

export class UserService {
	private static readonly STORAGE_KEYS = {
		USER: "user_data",
		PROGRESS: "user_progress",
		CHALLENGES: "user_challenges",
	};

	// User Management
	static async getUser(): Promise<User | null> {
		try {
			const userData = await AsyncStorage.getItem(this.STORAGE_KEYS.USER);
			if (userData) {
				const user = JSON.parse(userData);
				return {
					...user,
					lastActiveDate: new Date(user.lastActiveDate),
				};
			}
			return null;
		} catch (error) {
			console.error("Error getting user:", error);
			return null;
		}
	}

	static async createUser(userData: Omit<User, "id">): Promise<User> {
		try {
			const user: User = {
				id: Date.now().toString(),
				...userData,
				lastActiveDate: new Date(),
			};
			await AsyncStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));
			return user;
		} catch (error) {
			console.error("Error creating user:", error);
			throw error;
		}
	}

	static async updateUser(
		userId: string,
		updates: Partial<User>
	): Promise<User> {
		try {
			const currentUser = await this.getUser();
			if (!currentUser || currentUser.id !== userId) {
				throw new Error("User not found");
			}

			const updatedUser: User = {
				...currentUser,
				...updates,
				lastActiveDate: new Date(),
			};

			await AsyncStorage.setItem(
				this.STORAGE_KEYS.USER,
				JSON.stringify(updatedUser)
			);
			return updatedUser;
		} catch (error) {
			console.error("Error updating user:", error);
			throw error;
		}
	}

	// Progress Management
	static async getProgress(): Promise<Progress | null> {
		try {
			const progressData = await AsyncStorage.getItem(
				this.STORAGE_KEYS.PROGRESS
			);
			if (progressData) {
				const progress = JSON.parse(progressData);
				return {
					...progress,
					lastActiveDate: new Date(progress.lastActiveDate),
					chapterProgress: progress.chapterProgress.map((cp: any) => ({
						...cp,
						unlockedAt: new Date(cp.unlockedAt),
						completedAt: cp.completedAt ? new Date(cp.completedAt) : undefined,
					})),
				};
			}
			return null;
		} catch (error) {
			console.error("Error getting progress:", error);
			return null;
		}
	}

	static async updateProgress(
		userId: string,
		updates: Partial<Progress>
	): Promise<Progress> {
		try {
			const currentProgress = await this.getProgress();
			const updatedProgress: Progress = {
				userId,
				currentChapter: 1,
				totalXP: 0,
				streak: 0,
				chaptersCompleted: 0,
				lessonsCompleted: 0,
				lastActiveDate: new Date(),
				chapterProgress: [],
				...currentProgress,
				...updates,
			};

			await AsyncStorage.setItem(
				this.STORAGE_KEYS.PROGRESS,
				JSON.stringify(updatedProgress)
			);
			return updatedProgress;
		} catch (error) {
			console.error("Error updating progress:", error);
			throw error;
		}
	}

	// Challenge Management
	static async getChallenges(): Promise<Challenge[]> {
		try {
			const challengesData = await AsyncStorage.getItem(
				this.STORAGE_KEYS.CHALLENGES
			);
			if (challengesData) {
				const challenges = JSON.parse(challengesData);
				return challenges.map((challenge: any) => ({
					...challenge,
					completedAt: challenge.completedAt
						? new Date(challenge.completedAt)
						: undefined,
					expiresAt: new Date(challenge.expiresAt),
				}));
			}
			return this.generateDailyChallenges();
		} catch (error) {
			console.error("Error getting challenges:", error);
			return [];
		}
	}

	static async updateChallengeProgress(
		challengeId: string,
		progress: number
	): Promise<Challenge[]> {
		try {
			const challenges = await this.getChallenges();
			const updatedChallenges = challenges.map((challenge) => {
				if (challenge.id === challengeId) {
					const newProgress = Math.min(
						challenge.progress + progress,
						challenge.maxProgress
					);
					return {
						...challenge,
						progress: newProgress,
						completed: newProgress >= challenge.maxProgress,
						completedAt:
							newProgress >= challenge.maxProgress ? new Date() : undefined,
					};
				}
				return challenge;
			});

			await AsyncStorage.setItem(
				this.STORAGE_KEYS.CHALLENGES,
				JSON.stringify(updatedChallenges)
			);
			return updatedChallenges;
		} catch (error) {
			console.error("Error updating challenge progress:", error);
			throw error;
		}
	}

	static async generateDailyChallenges(): Promise<Challenge[]> {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);
		tomorrow.setHours(0, 0, 0, 0);

		const dailyChallenges: Challenge[] = [
			{
				id: `daily-${today.toDateString()}`,
				title: "Daily Practice",
				description: "Complete 3 practice activities",
				type: "daily",
				progress: 0,
				maxProgress: 3,
				xpReward: 50,
				completed: false,
				expiresAt: tomorrow,
			},
		];

		try {
			await AsyncStorage.setItem(
				this.STORAGE_KEYS.CHALLENGES,
				JSON.stringify(dailyChallenges)
			);
		} catch (error) {
			console.error("Error saving daily challenges:", error);
		}

		return dailyChallenges;
	}

	// Utility Methods
	static async clearAllData(): Promise<void> {
		try {
			await AsyncStorage.multiRemove([
				this.STORAGE_KEYS.USER,
				this.STORAGE_KEYS.PROGRESS,
				this.STORAGE_KEYS.CHALLENGES,
			]);
		} catch (error) {
			console.error("Error clearing data:", error);
			throw error;
		}
	}

	static async initializeDefaultData(): Promise<void> {
		try {
			const user = await this.getUser();
			if (!user) {
				await this.createUser({
					name: "French Learner",
					email: "",
					totalXP: 0,
					level: 1,
					streak: 0,
					lastActiveDate: new Date(),
					preferences: {
						notifications: true,
						sounds: true,
						language: "en",
					},
				});
			}

			const progress = await this.getProgress();
			if (!progress) {
				await this.updateProgress("default", {
					currentChapter: 1,
					totalXP: 0,
					streak: 0,
					chaptersCompleted: 0,
					lessonsCompleted: 0,
					chapterProgress: [
						{
							chapterId: 1,
							completed: false,
							score: 0,
							timeSpent: 0,
							unlockedAt: new Date(),
						},
					],
				});
			}
		} catch (error) {
			console.error("Error initializing default data:", error);
			throw error;
		}
	}
}
