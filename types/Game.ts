// Game-related types for the French learning app

export interface User {
	id: string;
	name: string;
	email?: string;
	avatar?: string;
	level: number;
	totalXP: number;
	currentXP: number;
	xpToNextLevel: number;
	streak: number;
	longestStreak: number;
	badges: Badge[];
	achievements: Achievement[];
	createdAt: Date;
	lastLogin: Date;
}

export interface Badge {
	id: string;
	name: string;
	description: string;
	emoji: string;
	xp: number;
	earned: boolean;
	earnedAt?: Date;
}

export interface Achievement {
	id: string;
	title: string;
	description: string;
	progress: number;
	maxProgress: number;
	completed: boolean;
	completedAt?: Date;
	xpReward: number;
}

export interface GameStats {
	lessonsCompleted: number;
	perfectScores: number;
	totalTimeStudied: number; // in minutes
	averageAccuracy: number;
	activitiesCompleted: number;
	chaptersCompleted: number;
}

export interface DailyChallenge {
	id: string;
	title: string;
	description: string;
	type: ChallengeType;
	progress: number;
	maxProgress: number;
	xpReward: number;
	completed: boolean;
	expiresAt: Date;
}

export type ChallengeType =
	| "complete_lessons"
	| "practice_pronunciation"
	| "flashcard_streak"
	| "perfect_quiz"
	| "study_time";

export interface UserProgress {
	chapterProgress: ChapterProgress[];
	currentChapter: number;
	overallProgress: number; // 0-100%
	skillLevels: SkillLevel[];
	weeklyGoals: WeeklyGoal[];
}

export interface ChapterProgress {
	chapterId: number;
	completed: boolean;
	progress: number; // 0-100%
	lessonsCompleted: number;
	totalLessons: number;
	xpEarned: number;
	badges: string[];
	lastAccessed: Date;
	bestScore: number;
}

export interface SkillLevel {
	skill: SkillType;
	level: number;
	xp: number;
	xpToNext: number;
}

export type SkillType =
	| "vocabulary"
	| "grammar"
	| "pronunciation"
	| "listening"
	| "conversation";

export interface WeeklyGoal {
	id: string;
	title: string;
	description: string;
	progress: number;
	target: number;
	completed: boolean;
	xpReward: number;
}
