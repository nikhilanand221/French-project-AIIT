import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

export interface SoundSettings {
	enabled: boolean;
	volume: number; // 0.0 to 1.0
	buttonSounds: boolean;
	achievementSounds: boolean;
	lessonCompletionSounds: boolean;
	correctAnswerSounds: boolean;
	incorrectAnswerSounds: boolean;
	levelUpSounds: boolean;
}

export enum SoundType {
	BUTTON_CLICK = "button_click",
	CORRECT_ANSWER = "correct_answer",
	INCORRECT_ANSWER = "incorrect_answer",
	LESSON_COMPLETE = "lesson_complete",
	ACHIEVEMENT_UNLOCK = "achievement_unlock",
	LEVEL_UP = "level_up",
	XP_GAIN = "xp_gain",
	STREAK_MILESTONE = "streak_milestone",
	PERFECT_SCORE = "perfect_score",
	CHAPTER_COMPLETE = "chapter_complete",
	NOTIFICATION_SOUND = "notification_sound",
}

class SoundService {
	private static instance: SoundService;
	private soundObjects: Map<SoundType, Audio.Sound> = new Map();
	private settings: SoundSettings = {
		enabled: true,
		volume: 0.8,
		buttonSounds: true,
		achievementSounds: true,
		lessonCompletionSounds: true,
		correctAnswerSounds: true,
		incorrectAnswerSounds: true,
		levelUpSounds: true,
	};
	private isInitialized = false;

	public static getInstance(): SoundService {
		if (!SoundService.instance) {
			SoundService.instance = new SoundService();
		}
		return SoundService.instance;
	}

	private constructor() {
		this.initializeAudio();
	}

	private async initializeAudio(): Promise<void> {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				playsInSilentModeIOS: true,
				staysActiveInBackground: false,
				shouldDuckAndroid: true,
			});

			await this.loadSettings();
			await this.preloadSounds();
			this.isInitialized = true;
		} catch (error) {
			console.error("Error initializing audio:", error);
		}
	}

	private async preloadSounds(): Promise<void> {
		// For now, we'll use system sounds and create placeholders
		// In a real app, you would load actual audio files
		const soundFiles = {
			[SoundType.BUTTON_CLICK]: null, // Will use haptic feedback
			[SoundType.CORRECT_ANSWER]: null, // Will use system success sound
			[SoundType.INCORRECT_ANSWER]: null, // Will use system error sound
			[SoundType.LESSON_COMPLETE]: null,
			[SoundType.ACHIEVEMENT_UNLOCK]: null,
			[SoundType.LEVEL_UP]: null,
			[SoundType.XP_GAIN]: null,
			[SoundType.STREAK_MILESTONE]: null,
			[SoundType.PERFECT_SCORE]: null,
			[SoundType.CHAPTER_COMPLETE]: null,
			[SoundType.NOTIFICATION_SOUND]: null,
		};

		// Preload actual sound files (placeholder implementation)
		for (const [soundType, file] of Object.entries(soundFiles)) {
			try {
				if (file) {
					const { sound } = await Audio.Sound.createAsync(file);
					await sound.setVolumeAsync(this.settings.volume);
					this.soundObjects.set(soundType as SoundType, sound);
				}
			} catch (error) {
				console.warn(`Could not load sound: ${soundType}`, error);
			}
		}
	}

	public async playSound(soundType: SoundType): Promise<void> {
		if (!this.settings.enabled || !this.isInitialized) {
			return;
		}

		// Check specific sound type settings
		if (!this.shouldPlaySound(soundType)) {
			return;
		}

		try {
			const sound = this.soundObjects.get(soundType);
			if (sound) {
				await sound.replayAsync();
			} else {
				// Fallback to system feedback
				await this.playSystemFeedback(soundType);
			}
		} catch (error) {
			console.warn(`Error playing sound ${soundType}:`, error);
		}
	}

	private shouldPlaySound(soundType: SoundType): boolean {
		switch (soundType) {
			case SoundType.BUTTON_CLICK:
				return this.settings.buttonSounds;
			case SoundType.CORRECT_ANSWER:
			case SoundType.INCORRECT_ANSWER:
				return (
					this.settings.correctAnswerSounds ||
					this.settings.incorrectAnswerSounds
				);
			case SoundType.LESSON_COMPLETE:
			case SoundType.CHAPTER_COMPLETE:
				return this.settings.lessonCompletionSounds;
			case SoundType.ACHIEVEMENT_UNLOCK:
			case SoundType.LEVEL_UP:
			case SoundType.STREAK_MILESTONE:
			case SoundType.PERFECT_SCORE:
				return this.settings.achievementSounds;
			default:
				return true;
		}
	}
	private async playSystemFeedback(soundType: SoundType): Promise<void> {
		// Use Expo's haptic feedback and system sounds as fallback
		const Haptics = await import("expo-haptics");

		switch (soundType) {
			case SoundType.BUTTON_CLICK:
				await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				break;
			case SoundType.CORRECT_ANSWER:
			case SoundType.LESSON_COMPLETE:
			case SoundType.ACHIEVEMENT_UNLOCK:
			case SoundType.LEVEL_UP:
			case SoundType.PERFECT_SCORE:
			case SoundType.CHAPTER_COMPLETE:
				await Haptics.notificationAsync(
					Haptics.NotificationFeedbackType.Success
				);
				break;
			case SoundType.INCORRECT_ANSWER:
				await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
				break;
			case SoundType.XP_GAIN:
			case SoundType.STREAK_MILESTONE:
				await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
				break;
			default:
				await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		}
	}

	public async updateSettings(
		newSettings: Partial<SoundSettings>
	): Promise<void> {
		this.settings = { ...this.settings, ...newSettings };
		await this.saveSettings();

		// Update volume for all loaded sounds
		if (newSettings.volume !== undefined) {
			for (const sound of this.soundObjects.values()) {
				try {
					await sound.setVolumeAsync(this.settings.volume);
				} catch (error) {
					console.warn("Error updating sound volume:", error);
				}
			}
		}
	}

	public getSettings(): SoundSettings {
		return { ...this.settings };
	}

	private async loadSettings(): Promise<void> {
		try {
			const savedSettings = await AsyncStorage.getItem("soundSettings");
			if (savedSettings) {
				this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
			}
		} catch (error) {
			console.error("Error loading sound settings:", error);
		}
	}

	private async saveSettings(): Promise<void> {
		try {
			await AsyncStorage.setItem(
				"soundSettings",
				JSON.stringify(this.settings)
			);
		} catch (error) {
			console.error("Error saving sound settings:", error);
		}
	}

	public async cleanup(): Promise<void> {
		for (const sound of this.soundObjects.values()) {
			try {
				await sound.unloadAsync();
			} catch (error) {
				console.warn("Error unloading sound:", error);
			}
		}
		this.soundObjects.clear();
	}

	// Convenience methods for common sound events
	public async playButtonClick(): Promise<void> {
		await this.playSound(SoundType.BUTTON_CLICK);
	}

	public async playCorrectAnswer(): Promise<void> {
		await this.playSound(SoundType.CORRECT_ANSWER);
	}

	public async playIncorrectAnswer(): Promise<void> {
		await this.playSound(SoundType.INCORRECT_ANSWER);
	}

	public async playLessonComplete(): Promise<void> {
		await this.playSound(SoundType.LESSON_COMPLETE);
	}

	public async playAchievementUnlock(): Promise<void> {
		await this.playSound(SoundType.ACHIEVEMENT_UNLOCK);
	}

	public async playLevelUp(): Promise<void> {
		await this.playSound(SoundType.LEVEL_UP);
	}

	public async playXPGain(): Promise<void> {
		await this.playSound(SoundType.XP_GAIN);
	}

	public async playPerfectScore(): Promise<void> {
		await this.playSound(SoundType.PERFECT_SCORE);
	}

	public async playChapterComplete(): Promise<void> {
		await this.playSound(SoundType.CHAPTER_COMPLETE);
	}

	public async playStreakMilestone(): Promise<void> {
		await this.playSound(SoundType.STREAK_MILESTONE);
	}
}

export default SoundService.getInstance();
