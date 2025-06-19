import AsyncStorage from "@react-native-async-storage/async-storage";
import { DailyChallenge, GameStats, User, UserProgress } from "../types/Game";

const USER_STORAGE_KEY = "french_app_user";
const PROGRESS_STORAGE_KEY = "french_app_progress";
const STATS_STORAGE_KEY = "french_app_stats";
const CHALLENGES_STORAGE_KEY = "french_app_challenges";

// Default user data
const createDefaultUser = (): User => ({
	id: Date.now().toString(),
	name: "French Learner",
	level: 1,
	totalXP: 0,
	currentXP: 0,
	xpToNextLevel: 100,
	streak: 0,
	longestStreak: 0,
	badges: [],
	achievements: [],
	createdAt: new Date(),
	lastLogin: new Date(),
});

const createDefaultProgress = (): UserProgress => ({
	chapterProgress: Array.from({ length: 5 }, (_, i) => ({
		chapterId: i + 1,
		completed: false,
		progress: 0,
		lessonsCompleted: 0,
		totalLessons: 5, // Default lessons per chapter
		xpEarned: 0,
		badges: [],
		lastAccessed: new Date(),
		bestScore: 0,
	})),
	currentChapter: 1,
	overallProgress: 0,
	skillLevels: [
		{ skill: "vocabulary", level: 1, xp: 0, xpToNext: 50 },
		{ skill: "grammar", level: 1, xp: 0, xpToNext: 50 },
		{ skill: "pronunciation", level: 1, xp: 0, xpToNext: 50 },
		{ skill: "listening", level: 1, xp: 0, xpToNext: 50 },
		{ skill: "conversation", level: 1, xp: 0, xpToNext: 50 },
	],
	weeklyGoals: [
		{
			id: "weekly_lessons",
			title: "Complete 5 lessons",
			description: "Finish 5 lessons this week",
			progress: 0,
			target: 5,
			completed: false,
			xpReward: 50,
		},
		{
			id: "weekly_time",
			title: "Study 1 hour daily",
			description: "Maintain daily study habit",
			progress: 0,
			target: 7,
			completed: false,
			xpReward: 30,
		},
	],
});

const createDefaultStats = (): GameStats => ({
	lessonsCompleted: 0,
	perfectScores: 0,
	totalTimeStudied: 0,
	averageAccuracy: 0,
	activitiesCompleted: 0,
	chaptersCompleted: 0,
});

export class UserService {
	// User management
	static async getUser(): Promise<User> {
		try {
			const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
			if (userData) {
				const user = JSON.parse(userData);
				// Update last login
				user.lastLogin = new Date();
				await this.saveUser(user);
				return user;
			}
			return createDefaultUser();
		} catch (error) {
			console.error("Error getting user:", error);
			return createDefaultUser();
		}
	}

	static async saveUser(user: User): Promise<void> {
		try {
			await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
		} catch (error) {
			console.error("Error saving user:", error);
		}
	}

	static async updateUserName(name: string): Promise<void> {
		const user = await this.getUser();
		user.name = name;
		await this.saveUser(user);
	}

	// XP and level management
	static async addXP(amount: number): Promise<User> {
		const user = await this.getUser();
		user.totalXP += amount;
		user.currentXP += amount;

		// Check for level up
		while (user.currentXP >= user.xpToNextLevel) {
			user.currentXP -= user.xpToNextLevel;
			user.level++;
			user.xpToNextLevel = this.calculateXPForNextLevel(user.level);
		}

		await this.saveUser(user);
		return user;
	}

	static calculateXPForNextLevel(level: number): number {
		// XP required increases with each level
		return Math.floor(100 * Math.pow(1.2, level - 1));
	}

	// Progress management
	static async getProgress(): Promise<UserProgress> {
		try {
			const progressData = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
			if (progressData) {
				return JSON.parse(progressData);
			}
			return createDefaultProgress();
		} catch (error) {
			console.error("Error getting progress:", error);
			return createDefaultProgress();
		}
	}

	static async saveProgress(progress: UserProgress): Promise<void> {
		try {
			await AsyncStorage.setItem(
				PROGRESS_STORAGE_KEY,
				JSON.stringify(progress)
			);
		} catch (error) {
			console.error("Error saving progress:", error);
		}
	}

	static async updateChapterProgress(
		chapterId: number,
		progressUpdate: Partial<UserProgress["chapterProgress"][0]>
	): Promise<void> {
		const progress = await this.getProgress();
		const chapterIndex = progress.chapterProgress.findIndex(
			(c) => c.chapterId === chapterId
		);

		if (chapterIndex !== -1) {
			progress.chapterProgress[chapterIndex] = {
				...progress.chapterProgress[chapterIndex],
				...progressUpdate,
				lastAccessed: new Date(),
			};

			// Update overall progress
			const totalProgress = progress.chapterProgress.reduce(
				(sum, ch) => sum + ch.progress,
				0
			);
			progress.overallProgress = Math.floor(
				totalProgress / progress.chapterProgress.length
			);

			await this.saveProgress(progress);
		}
	}

	// Stats management
	static async getStats(): Promise<GameStats> {
		try {
			const statsData = await AsyncStorage.getItem(STATS_STORAGE_KEY);
			if (statsData) {
				return JSON.parse(statsData);
			}
			return createDefaultStats();
		} catch (error) {
			console.error("Error getting stats:", error);
			return createDefaultStats();
		}
	}

	static async updateStats(statsUpdate: Partial<GameStats>): Promise<void> {
		try {
			const stats = await this.getStats();
			const updatedStats = { ...stats, ...statsUpdate };
			await AsyncStorage.setItem(
				STATS_STORAGE_KEY,
				JSON.stringify(updatedStats)
			);
		} catch (error) {
			console.error("Error updating stats:", error);
		}
	}

	// Streak management
	static async updateStreak(): Promise<void> {
		const user = await this.getUser();
		const today = new Date().toDateString();
		const lastLogin = new Date(user.lastLogin).toDateString();

		if (today !== lastLogin) {
			const yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);

			if (yesterday.toDateString() === lastLogin) {
				// Consecutive day
				user.streak++;
				if (user.streak > user.longestStreak) {
					user.longestStreak = user.streak;
				}
			} else {
				// Streak broken
				user.streak = 1;
			}

			await this.saveUser(user);
		}
	}

	// Daily challenges
	static async getDailyChallenges(): Promise<DailyChallenge[]> {
		try {
			const challengesData = await AsyncStorage.getItem(CHALLENGES_STORAGE_KEY);
			if (challengesData) {
				const challenges = JSON.parse(challengesData);
				// Filter out expired challenges
				const validChallenges = challenges.filter(
					(c: DailyChallenge) => new Date(c.expiresAt) > new Date()
				);
				return validChallenges;
			}
			return this.generateDailyChallenges();
		} catch (error) {
			console.error("Error getting daily challenges:", error);
			return [];
		}
	}

	static generateDailyChallenges(): DailyChallenge[] {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		tomorrow.setHours(0, 0, 0, 0);

		const challenges: DailyChallenge[] = [
			{
				id: "daily_lesson",
				title: "Complete a lesson",
				description: "Finish any lesson today",
				type: "complete_lessons",
				progress: 0,
				maxProgress: 1,
				xpReward: 25,
				completed: false,
				expiresAt: tomorrow,
			},
			{
				id: "daily_practice",
				title: "Practice pronunciation",
				description: "Complete 3 pronunciation exercises",
				type: "practice_pronunciation",
				progress: 0,
				maxProgress: 3,
				xpReward: 20,
				completed: false,
				expiresAt: tomorrow,
			},
			{
				id: "daily_flashcards",
				title: "Flashcard streak",
				description: "Review 10 flashcards",
				type: "flashcard_streak",
				progress: 0,
				maxProgress: 10,
				xpReward: 15,
				completed: false,
				expiresAt: tomorrow,
			},
		];

		AsyncStorage.setItem(CHALLENGES_STORAGE_KEY, JSON.stringify(challenges));
		return challenges;
	}

	static async updateChallengeProgress(
		challengeId: string,
		progressIncrement: number = 1
	): Promise<void> {
		const challenges = await this.getDailyChallenges();
		const challenge = challenges.find((c) => c.id === challengeId);

		if (challenge && !challenge.completed) {
			challenge.progress = Math.min(
				challenge.progress + progressIncrement,
				challenge.maxProgress
			);

			if (challenge.progress >= challenge.maxProgress) {
				challenge.completed = true;
				// Award XP
				await this.addXP(challenge.xpReward);
			}

			await AsyncStorage.setItem(
				CHALLENGES_STORAGE_KEY,
				JSON.stringify(challenges)
			);
		}
	}

	// Reset data (for development/testing)
	static async resetAllData(): Promise<void> {
		try {
			await AsyncStorage.multiRemove([
				USER_STORAGE_KEY,
				PROGRESS_STORAGE_KEY,
				STATS_STORAGE_KEY,
				CHALLENGES_STORAGE_KEY,
			]);
		} catch (error) {
			console.error("Error resetting data:", error);
		}
	}
}
