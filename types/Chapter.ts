// Chapter and learning content types

export interface Chapter {
	id: number;
	title: string;
	subtitle: string;
	emoji: string;
	description: string;
	story: ChapterStory;
	objectives: string[];
	vocabulary: VocabularyItem[];
	grammar: GrammarPoint[];
	exercises: Exercise[];
	games: MiniGame[];
	culture: CulturalInsight[];
	assessment: Assessment;
	rewards: ChapterRewards;
	unlocked: boolean;
	prerequisite?: number; // previous chapter ID
}

export interface ChapterStory {
	intro: string;
	setting: string;
	character: string;
}

export interface VocabularyItem {
	french: string;
	english: string;
	pronunciation: string;
	category: VocabularyCategory;
	audio?: string;
	image?: string;
}

export type VocabularyCategory =
	| "greetings"
	| "introductions"
	| "personal"
	| "polite"
	| "numbers"
	| "time"
	| "family"
	| "professions"
	| "places"
	| "activities";

export interface GrammarPoint {
	title: string;
	explanation: string;
	examples?: GrammarExample[];
	tips?: string[];
}

export interface GrammarExample {
	formal?: string;
	informal?: string;
	french?: string;
	english?: string;
}

export interface Exercise {
	id: number;
	type: ExerciseType;
	title: string;
	instructions: string;
	items?: any[]; // Flexible for different exercise types
	sentence?: string;
	options?: string[];
	correct?: string[] | number | string;
	words?: PronunciationWord[];
	scenario?: string;
	dialogue?: DialogueLine[];
}

export type ExerciseType =
	| "flashcard_match"
	| "fill_blank"
	| "pronunciation"
	| "dialogue_complete"
	| "multiple_choice"
	| "drag_drop"
	| "audio_recognition";

export interface PronunciationWord {
	french: string;
	pronunciation: string;
	audio?: string;
}

export interface DialogueLine {
	speaker: string;
	text?: string;
	options?: string[];
}

export interface MiniGame {
	id: number;
	type: GameType;
	title: string;
	description: string;
	scenarios?: GameScenario[];
	components?: string[];
	difficulty: Difficulty;
	estimatedTime: number; // in minutes
	xpReward: number;
}

export type GameType =
	| "greeting_simulator"
	| "introduction_builder"
	| "conversation_practice"
	| "pronunciation_challenge"
	| "speed_vocabulary"
	| "grammar_battle";

export interface GameScenario {
	setting: string;
	timeOfDay: TimeOfDay;
	formality: Formality;
	characters?: string[];
}

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";
export type Formality = "formal" | "casual" | "professional";
export type Difficulty = "easy" | "medium" | "hard";

export interface CulturalInsight {
	title: string;
	content: string;
	image?: string;
	category?: CultureCategory;
}

export type CultureCategory =
	| "etiquette"
	| "traditions"
	| "food"
	| "geography"
	| "history"
	| "language_facts";

export interface Assessment {
	passingScore: number;
	questions: AssessmentQuestion[];
	timeLimit?: number; // in minutes
}

export interface AssessmentQuestion {
	id: number;
	type: QuestionType;
	question: string;
	options?: string[];
	correct: number | string;
	audio?: string;
	image?: string;
	explanation?: string;
}

export type QuestionType =
	| "multiple_choice"
	| "audio_recognition"
	| "translation"
	| "fill_blank"
	| "true_false"
	| "speaking_assessment";

export interface ChapterRewards {
	totalXP: number;
	badges: ChapterBadge[];
	unlocks?: string[]; // What gets unlocked after completing this chapter
}

export interface ChapterBadge {
	id: string;
	name: string;
	description: string;
	xp: number;
	condition?: string; // Optional condition to earn the badge
}

// Practice and activity types
export interface PracticeActivity {
	id: number;
	title: string;
	subtitle: string;
	emoji: string;
	difficulty: Difficulty;
	duration: string;
	xp: number;
	color: string;
	type: ActivityType;
	requirements?: string[];
}

export type ActivityType =
	| "flashcards"
	| "pronunciation"
	| "quiz"
	| "grammar_drill"
	| "listening"
	| "speed_challenge"
	| "conversation"
	| "writing";

// User interaction types
export interface UserAnswer {
	questionId: number;
	answer: string | number | string[];
	isCorrect: boolean;
	timeSpent: number; // in seconds
	attempts: number;
}

export interface SessionResult {
	activityId: number;
	activityType: ActivityType;
	score: number;
	maxScore: number;
	accuracy: number;
	timeSpent: number;
	xpEarned: number;
	badgesEarned: string[];
	answers: UserAnswer[];
	completedAt: Date;
}
