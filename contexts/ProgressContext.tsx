import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import NotificationService from "../services/NotificationService";
import SoundService from "../services/SoundService";

export interface LessonProgress {
	lessonId: string;
	chapterId: string;
	completed: boolean;
	score?: number;
	timeSpent: number;
	completedAt?: Date;
	attempts: number;
}

export interface ChapterProgress {
	chapterId: string;
	lessonsCompleted: number;
	totalLessons: number;
	averageScore: number;
	totalTimeSpent: number;
	assessmentPassed: boolean;
	assessmentScore?: number;
	unlockedAt: Date;
	completedAt?: Date;
}

export interface UserProgress {
	level: number;
	totalXP: number;
	streak: number;
	lastActiveDate?: Date;
	lessonsProgress: Record<string, LessonProgress>;
	chaptersProgress: Record<string, ChapterProgress>;
	achievements: string[];
}

interface ProgressContextType {
	userProgress: UserProgress;
	updateLessonProgress: (lessonProgress: LessonProgress) => Promise<void>;
	updateChapterProgress: (chapterProgress: ChapterProgress) => Promise<void>;
	addXP: (amount: number) => Promise<void>;
	updateStreak: () => Promise<void>;
	getChapterProgress: (chapterId: string) => ChapterProgress | null;
	getLessonProgress: (lessonId: string) => LessonProgress | null;
	unlockChapter: (chapterId: string) => Promise<void>;
	saveProgress: () => Promise<void>;
	loadProgress: () => Promise<void>;
}

const defaultProgress: UserProgress = {
	level: 1,
	totalXP: 0,
	streak: 0,
	lessonsProgress: {},
	chaptersProgress: {
		chapter1: {
			chapterId: "chapter1",
			lessonsCompleted: 0,
			totalLessons: 4,
			averageScore: 0,
			totalTimeSpent: 0,
			assessmentPassed: false,
			unlockedAt: new Date(),
		},
	},
	achievements: [],
};

const ProgressContext = createContext<ProgressContextType | undefined>(
	undefined
);

export const useProgress = () => {
	const context = useContext(ProgressContext);
	if (!context) {
		throw new Error("useProgress must be used within a ProgressProvider");
	}
	return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [userProgress, setUserProgress] =
		useState<UserProgress>(defaultProgress);

	useEffect(() => {
		loadProgress();
	}, []);

	const saveProgress = async () => {
		try {
			await AsyncStorage.setItem("userProgress", JSON.stringify(userProgress));
		} catch (error) {
			console.error("Error saving progress:", error);
		}
	};

	const loadProgress = async () => {
		try {
			const savedProgress = await AsyncStorage.getItem("userProgress");
			if (savedProgress) {
				const parsed = JSON.parse(savedProgress);
				// Ensure we have all default properties
				setUserProgress({ ...defaultProgress, ...parsed });
			}
		} catch (error) {
			console.error("Error loading progress:", error);
		}
	};
	const updateLessonProgress = async (lessonProgress: LessonProgress) => {
		const previousLesson =
			userProgress.lessonsProgress[lessonProgress.lessonId];
		const updatedProgress = {
			...userProgress,
			lessonsProgress: {
				...userProgress.lessonsProgress,
				[lessonProgress.lessonId]: lessonProgress,
			},
		};
		setUserProgress(updatedProgress);
		// Send notification for first-time lesson completion
		if (
			lessonProgress.completed &&
			(!previousLesson || !previousLesson.completed)
		) {
			try {
				await NotificationService.sendAchievementNotification(
					"Lesson Completed!",
					`Great job! You've completed a lesson and earned ${
						lessonProgress.score || 0
					} points!`
				);
				// Play lesson completion sound
				await SoundService.playLessonComplete();
			} catch (error) {
				console.error("Error sending lesson completion notification:", error);
			}
		}

		// Send notification for perfect score
		if (
			lessonProgress.score === 100 &&
			(!previousLesson || previousLesson.score !== 100)
		) {
			try {
				await NotificationService.sendAchievementNotification(
					"Perfect Score!",
					"Excellent! You achieved a perfect score of 100%!"
				);
				// Play perfect score sound
				await SoundService.playPerfectScore();
			} catch (error) {
				console.error("Error sending perfect score notification:", error);
			}
		}
	};
	const updateChapterProgress = async (chapterProgress: ChapterProgress) => {
		const previousChapter =
			userProgress.chaptersProgress[chapterProgress.chapterId];
		const updatedProgress = {
			...userProgress,
			chaptersProgress: {
				...userProgress.chaptersProgress,
				[chapterProgress.chapterId]: chapterProgress,
			},
		};
		setUserProgress(updatedProgress);
		// Send notification for chapter completion
		if (
			chapterProgress.completedAt &&
			(!previousChapter || !previousChapter.completedAt)
		) {
			try {
				await NotificationService.sendAchievementNotification(
					"Chapter Completed!",
					`Congratulations! You've completed Chapter ${chapterProgress.chapterId}!`
				);
				// Play chapter completion sound
				await SoundService.playChapterComplete();
			} catch (error) {
				console.error("Error sending chapter completion notification:", error);
			}
		}

		// Send notification for assessment pass
		if (
			chapterProgress.assessmentPassed &&
			(!previousChapter || !previousChapter.assessmentPassed)
		) {
			try {
				await NotificationService.sendAchievementNotification(
					"Assessment Passed!",
					`Well done! You passed the chapter assessment with ${
						chapterProgress.assessmentScore || 0
					}%!`
				);
				// Play achievement sound
				await SoundService.playAchievementUnlock();
			} catch (error) {
				console.error("Error sending assessment notification:", error);
			}
		}
	};
	const addXP = async (amount: number) => {
		const previousXP = userProgress.totalXP;
		const newXP = userProgress.totalXP + amount;
		const previousLevel = Math.floor(previousXP / 1000) + 1;
		const newLevel = Math.floor(newXP / 1000) + 1; // 1000 XP per level

		setUserProgress((prev) => ({
			...prev,
			totalXP: newXP,
			level: newLevel,
		}));
		// Send level up notification
		if (newLevel > previousLevel) {
			try {
				await NotificationService.sendAchievementNotification(
					`Level ${newLevel} Reached!`,
					`Congratulations! You've reached level ${newLevel} in your French learning journey!`
				);
				// Play level up sound
				await SoundService.playLevelUp();
			} catch (error) {
				console.error("Error sending level up notification:", error);
			}
		}

		// Send XP milestone notifications
		const milestones = [100, 250, 500, 1000, 2000, 5000];
		for (const milestone of milestones) {
			if (previousXP < milestone && newXP >= milestone) {
				try {
					await NotificationService.sendAchievementNotification(
						`${milestone} XP Milestone!`,
						`Amazing! You've earned ${milestone} XP in your French studies!`
					);
					// Play achievement sound
					await SoundService.playAchievementUnlock();
				} catch (error) {
					console.error("Error sending XP milestone notification:", error);
				}
				break; // Only send one milestone notification at a time
			}
		}

		// Play XP gain sound for any XP increase
		if (amount > 0) {
			try {
				await SoundService.playXPGain();
			} catch (error) {
				console.error("Error playing XP gain sound:", error);
			}
		}
	};

	const updateStreak = async () => {
		const today = new Date();
		const lastActive = userProgress.lastActiveDate
			? new Date(userProgress.lastActiveDate)
			: null;

		let newStreak = userProgress.streak;

		if (lastActive) {
			const daysDiff = Math.floor(
				(today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
			);
			if (daysDiff === 1) {
				// Consecutive day
				newStreak += 1;
			} else if (daysDiff > 1) {
				// Streak broken
				newStreak = 1;
			}
			// If same day, don't change streak
		} else {
			newStreak = 1;
		}
		const previousStreak = userProgress.streak;

		setUserProgress((prev) => ({
			...prev,
			streak: newStreak,
			lastActiveDate: today,
		}));
		// Send streak milestone notifications
		const streakMilestones = [3, 7, 14, 30, 50, 100];
		for (const milestone of streakMilestones) {
			if (previousStreak < milestone && newStreak >= milestone) {
				try {
					await NotificationService.sendAchievementNotification(
						`${milestone}-Day Streak!`,
						`Fantastic! You've maintained a ${milestone}-day study streak! Keep it up!`
					);
					// Play streak milestone sound
					await SoundService.playStreakMilestone();
				} catch (error) {
					console.error("Error sending streak notification:", error);
				}
				break; // Only send one milestone notification at a time
			}
		}
	};

	const getChapterProgress = (chapterId: string): ChapterProgress | null => {
		return userProgress.chaptersProgress[chapterId] || null;
	};

	const getLessonProgress = (lessonId: string): LessonProgress | null => {
		return userProgress.lessonsProgress[lessonId] || null;
	};

	const unlockChapter = async (chapterId: string) => {
		if (!userProgress.chaptersProgress[chapterId]) {
			const newChapterProgress: ChapterProgress = {
				chapterId,
				lessonsCompleted: 0,
				totalLessons: 4, // Default, can be updated based on actual chapter data
				averageScore: 0,
				totalTimeSpent: 0,
				assessmentPassed: false,
				unlockedAt: new Date(),
			};

			await updateChapterProgress(newChapterProgress);
		}
	};
	// Auto-save progress when it changes
	useEffect(() => {
		const save = async () => {
			try {
				await AsyncStorage.setItem(
					"userProgress",
					JSON.stringify(userProgress)
				);
			} catch (error) {
				console.error("Error saving progress:", error);
			}
		};
		save();
	}, [userProgress]);

	const value: ProgressContextType = {
		userProgress,
		updateLessonProgress,
		updateChapterProgress,
		addXP,
		updateStreak,
		getChapterProgress,
		getLessonProgress,
		unlockChapter,
		saveProgress,
		loadProgress,
	};

	return (
		<ProgressContext.Provider value={value}>
			{children}
		</ProgressContext.Provider>
	);
};
