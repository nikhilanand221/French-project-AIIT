import { useEffect, useState } from "react";
import SoundService, {
	SoundSettings,
	SoundType,
} from "../services/SoundService";

export const useSounds = () => {
	const [soundSettings, setSoundSettings] = useState<SoundSettings>(
		SoundService.getSettings()
	);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		// Initialize sound service
		const initializeSounds = async () => {
			try {
				// SoundService initializes automatically
				setIsInitialized(true);
				setSoundSettings(SoundService.getSettings());
			} catch (error) {
				console.error("Error initializing sounds:", error);
			}
		};

		initializeSounds();

		// Cleanup on unmount
		return () => {
			// SoundService cleanup is handled by the service itself
		};
	}, []);

	const updateSoundSettings = async (newSettings: Partial<SoundSettings>) => {
		try {
			await SoundService.updateSettings(newSettings);
			setSoundSettings(SoundService.getSettings());
		} catch (error) {
			console.error("Error updating sound settings:", error);
		}
	};

	const playSound = async (soundType: SoundType) => {
		try {
			await SoundService.playSound(soundType);
		} catch (error) {
			console.error(`Error playing sound ${soundType}:`, error);
		}
	};

	// Convenience methods
	const playButtonClick = () => playSound(SoundType.BUTTON_CLICK);
	const playCorrectAnswer = () => playSound(SoundType.CORRECT_ANSWER);
	const playIncorrectAnswer = () => playSound(SoundType.INCORRECT_ANSWER);
	const playLessonComplete = () => playSound(SoundType.LESSON_COMPLETE);
	const playAchievementUnlock = () => playSound(SoundType.ACHIEVEMENT_UNLOCK);
	const playLevelUp = () => playSound(SoundType.LEVEL_UP);
	const playXPGain = () => playSound(SoundType.XP_GAIN);
	const playPerfectScore = () => playSound(SoundType.PERFECT_SCORE);
	const playChapterComplete = () => playSound(SoundType.CHAPTER_COMPLETE);
	const playStreakMilestone = () => playSound(SoundType.STREAK_MILESTONE);

	return {
		soundSettings,
		isInitialized,
		updateSoundSettings,
		playSound,
		playButtonClick,
		playCorrectAnswer,
		playIncorrectAnswer,
		playLessonComplete,
		playAchievementUnlock,
		playLevelUp,
		playXPGain,
		playPerfectScore,
		playChapterComplete,
		playStreakMilestone,
	};
};
