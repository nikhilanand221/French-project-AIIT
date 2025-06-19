import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
	Alert,
	Modal,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { LessonProgress, useProgress } from "../../contexts/ProgressContext";
import { useColorScheme } from "../../hooks/useColorScheme";
import { useNotifications } from "../../hooks/useNotifications";
import { useSounds } from "../../hooks/useSounds";
import NotificationService from "../../services/NotificationService";

// User Settings Interface
interface UserSettings {
	notifications: boolean;
	soundEffects: boolean;
	userName: string;
	avatar: string;
}

const achievementsList = [
	{
		id: "first_steps",
		title: "First Steps",
		description: "Completed first lesson",
		emoji: "👶",
		condition: (progress: any) =>
			Object.keys(progress.lessonsProgress).length > 0,
	},
	{
		id: "speed_demon",
		title: "Speed Demon",
		description: "Earned 100+ XP in one day",
		emoji: "⚡",
		condition: (progress: any) => progress.totalXP >= 100,
	},
	{
		id: "pronunciation_pro",
		title: "Pronunciation Pro",
		description: "Perfect pronunciation score",
		emoji: "🗣️",
		condition: (progress: any) => progress.totalXP >= 200,
	},
	{
		id: "grammar_guru",
		title: "Grammar Guru",
		description: "Master 10 grammar topics",
		emoji: "📚",
		condition: (progress: any) => progress.totalXP >= 300,
	},
	{
		id: "streak_master",
		title: "Streak Master",
		description: "Maintain 7-day streak",
		emoji: "🔥",
		condition: (progress: any) => progress.streak >= 7,
	},
	{
		id: "vocabulary_virtuoso",
		title: "Vocabulary Virtuoso",
		description: "Learn 100+ words",
		emoji: "🎯",
		condition: (progress: any) => progress.totalXP >= 500,
	},
	{
		id: "listening_legend",
		title: "Listening Legend",
		description: "Perfect listening comprehension",
		emoji: "👂",
		condition: (progress: any) => progress.totalXP >= 400,
	},
	{
		id: "quiz_champion",
		title: "Quiz Champion",
		description: "Score 100% in 5 quizzes",
		emoji: "🏆",
		condition: (progress: any) => progress.totalXP >= 600,
	},
	{
		id: "french_explorer",
		title: "French Explorer",
		description: "Finish all 5 chapters",
		emoji: "🗺️",
		condition: (progress: any) =>
			Object.keys(progress.chaptersProgress).length >= 5,
	},
];

const defaultSettings: UserSettings = {
	notifications: true,
	soundEffects: true,
	userName: "Alex Dubois",
	avatar: "👤",
};

export default function Profile() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { userProgress } = useProgress();
	// Initialize notifications
	const {
		hasPermissions,
		isInitializing,
		requestPermissions,
		updateNotificationSettings,
	} = useNotifications();
	// Initialize sounds
	const { updateSoundSettings, playButtonClick } = useSounds();

	// State for user settings and UI
	const [userSettings, setUserSettings] =
		useState<UserSettings>(defaultSettings);
	const [editProfileModal, setEditProfileModal] = useState(false);
	const [newUserName, setNewUserName] = useState(defaultSettings.userName);
	const [newAvatar, setNewAvatar] = useState(defaultSettings.avatar);

	// Load user settings on component mount
	useEffect(() => {
		loadUserSettings();
	}, []);

	// Monitor progress changes for achievement notifications
	const [previousProgress, setPreviousProgress] = useState(userProgress);
	useEffect(() => {
		if (previousProgress !== userProgress) {
			checkForNewAchievements(previousProgress, userProgress);
			setPreviousProgress(userProgress);
		}
	}, [userProgress, previousProgress]);

	// Save user settings to AsyncStorage
	const saveUserSettings = async (settings: UserSettings) => {
		try {
			await AsyncStorage.setItem("userSettings", JSON.stringify(settings));
		} catch (error) {
			console.error("Error saving settings:", error);
		}
	};

	// Load user settings from AsyncStorage
	const loadUserSettings = async () => {
		try {
			const savedSettings = await AsyncStorage.getItem("userSettings");
			if (savedSettings) {
				const settings = JSON.parse(savedSettings);
				setUserSettings(settings);
				setNewUserName(settings.userName);
				setNewAvatar(settings.avatar);
			}
		} catch (error) {
			console.error("Error loading settings:", error);
		}
	};

	// Calculate dynamic stats from user progress
	const calculateStats = () => {
		const lessonsCompleted = Object.values(userProgress.lessonsProgress).filter(
			(lesson: LessonProgress) => lesson.completed
		).length;

		const perfectScores = Object.values(userProgress.lessonsProgress).filter(
			(lesson: LessonProgress) => lesson.score === 100
		).length;
		const totalTimeSpent = Object.values(userProgress.lessonsProgress).reduce(
			(total, lesson: LessonProgress) => total + lesson.timeSpent,
			0
		);

		// Convert from milliseconds to minutes
		const totalMinutes = Math.floor(totalTimeSpent / (1000 * 60));

		// Debug logging - remove in production
		console.log("Debug Time Calculation:", {
			totalTimeSpent,
			totalMinutes,
			lessonsCount: Object.values(userProgress.lessonsProgress).length,
		});

		const timeInHours = Math.floor(totalMinutes / 60);
		const timeInMinutes = totalMinutes % 60;

		return {
			lessonsCompleted,
			perfectScores,
			totalTimeSpent: totalMinutes,
			timeDisplay:
				timeInHours > 0
					? `${timeInHours}h ${timeInMinutes}m`
					: `${timeInMinutes}m`,
		};
	};

	// Calculate level based on XP
	const calculateLevel = () => {
		const xp = userProgress.totalXP;
		const level = Math.floor(xp / 100) + 1;
		const currentLevelXP = xp % 100;
		const nextLevelXP = 100;
		const progress = (currentLevelXP / nextLevelXP) * 100;

		return {
			level,
			progress,
			currentXP: currentLevelXP,
			nextLevelXP,
		};
	};

	// Get earned achievements
	const getEarnedAchievements = () => {
		return achievementsList.map((achievement) => ({
			...achievement,
			earned: achievement.condition(userProgress),
		}));
	};
	// Calculate weekly goals
	const calculateWeeklyGoals = () => {
		const lessonsCompleted = Object.values(userProgress.lessonsProgress).filter(
			(lesson: LessonProgress) => lesson.completed
		).length;
		const totalTimeSpent = Object.values(userProgress.lessonsProgress).reduce(
			(total, lesson: LessonProgress) => total + lesson.timeSpent,
			0
		);

		// Convert from milliseconds to minutes
		const totalMinutes = Math.floor(totalTimeSpent / (1000 * 60));
		const dailyTimeGoal = 60; // 60 minutes = 1 hour
		const weeklyLessonGoal = 5;

		// Get today's study time (simplified - using total modulo for demo)
		const todayMinutes = totalMinutes % dailyTimeGoal;

		return {
			lessons: {
				completed: lessonsCompleted % 7, // Reset weekly (simplified)
				goal: weeklyLessonGoal,
				progress: Math.min(
					((lessonsCompleted % 7) / weeklyLessonGoal) * 100,
					100
				),
			},
			time: {
				completed: todayMinutes,
				goal: dailyTimeGoal,
				progress: Math.min((todayMinutes / dailyTimeGoal) * 100, 100),
			},
		};
	};

	const getStreakCalendar = () => {
		const today = new Date();
		const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
		const currentDay = today.getDay();

		return weekDays.map((day, index) => {
			const dayIndex = currentDay === 0 ? 6 : currentDay - 1; // Adjust for Monday start
			const isActive = index <= dayIndex && index < userProgress.streak;
			return { day, isActive };
		});
	};

	// Handle setting toggles with notification integration
	const toggleSetting = async (setting: keyof UserSettings) => {
		const newSettings = {
			...userSettings,
			[setting]: !userSettings[setting],
		};

		console.log(
			"Settings Toggle:",
			setting,
			"New Value:",
			newSettings[setting]
		);

		setUserSettings(newSettings);
		await saveUserSettings(newSettings);

		// Handle notification-specific settings
		if (setting === "notifications") {
			if (newSettings.notifications) {
				// Request permissions if enabling notifications
				if (!hasPermissions) {
					const granted = await requestPermissions();
					if (!granted) {
						Alert.alert(
							"Permission Required",
							"Please enable notifications in your device settings to receive study reminders.",
							[
								{ text: "Cancel", style: "cancel" },
								{
									text: "Settings",
									onPress: () => {
										// Navigate to app settings - this would require expo-linking
									},
								},
							]
						);
						// Revert the setting if permission was denied
						const revertedSettings = { ...newSettings, notifications: false };
						setUserSettings(revertedSettings);
						await saveUserSettings(revertedSettings);
						return;
					}
				}

				// Enable all notification types
				await updateNotificationSettings({
					enabled: true,
					dailyReminder: true,
					studyReminders: true,
					streakReminder: true,
					achievementNotifications: true,
				});
			} else {
				// Disable all notifications
				await updateNotificationSettings({
					enabled: false,
				});
			}
		}

		// Handle sound effects settings
		if (setting === "soundEffects") {
			await updateSoundSettings({
				enabled: newSettings.soundEffects,
			});

			// Play a test sound if enabling
			if (newSettings.soundEffects) {
				await playButtonClick();
			}
		}

		// Play button click sound for all toggles (if sound is enabled)
		if (setting !== "soundEffects") {
			await playButtonClick();
		}
		// Show feedback to user
		const settingDisplayNames = {
			notifications: "Notifications",
			soundEffects: "Sound Effects",
			userName: "User Name",
			avatar: "Avatar",
		};

		Alert.alert(
			"Settings Updated",
			`${settingDisplayNames[setting]} has been ${
				newSettings[setting] ? "enabled" : "disabled"
			}`
		);
	};

	// Handle profile edit
	const handleProfileEdit = async () => {
		const newSettings = {
			...userSettings,
			userName: newUserName,
			avatar: newAvatar,
		};
		setUserSettings(newSettings);
		await saveUserSettings(newSettings);
		setEditProfileModal(false);
		Alert.alert(
			"Profile Updated",
			"Your profile has been updated successfully!"
		);
	};

	// Check for newly unlocked achievements and send notifications
	const checkForNewAchievements = async (
		previousProgress: any,
		currentProgress: any
	) => {
		const previousAchievements = achievementsList.filter((achievement) =>
			achievement.condition(previousProgress)
		);
		const currentAchievements = achievementsList.filter((achievement) =>
			achievement.condition(currentProgress)
		);

		// Find newly unlocked achievements
		const newAchievements = currentAchievements.filter(
			(current) => !previousAchievements.find((prev) => prev.id === current.id)
		);
		// Send notifications for new achievements
		for (const achievement of newAchievements) {
			try {
				await NotificationService.sendAchievementNotification(
					achievement.title,
					achievement.description
				);
			} catch (error) {
				console.error("Error sending achievement notification:", error);
			}
		}
	};

	// Get calculated values
	const stats = calculateStats();
	const levelData = calculateLevel();
	const earnedAchievements = getEarnedAchievements();
	const earnedCount = earnedAchievements.filter((a) => a.earned).length;
	const streakCalendar = getStreakCalendar();
	const weeklyGoals = calculateWeeklyGoals();

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView style={styles.scrollView}>
				{/* Profile Header */}
				<View
					style={[styles.profileHeader, { backgroundColor: colors.primary }]}
				>
					<View style={styles.avatarContainer}>
						<View style={[styles.avatar, { backgroundColor: colors.accent }]}>
							<Text style={styles.avatarText}>{userSettings.avatar}</Text>
						</View>
						<TouchableOpacity
							style={styles.editButton}
							onPress={() => setEditProfileModal(true)}
						>
							<Text style={styles.editButtonText}>✏️</Text>
						</TouchableOpacity>
					</View>
					<Text style={styles.userName}>{userSettings.userName}</Text>
					<Text style={styles.userLevel}>Level {levelData.level}</Text>
				</View>

				{/* XP Progress */}
				<View style={[styles.xpSection, { backgroundColor: colors.card }]}>
					<View style={styles.xpHeader}>
						<Text style={[styles.xpText, { color: colors.text }]}>
							{levelData.currentXP}/{levelData.nextLevelXP} XP
						</Text>
						<Text style={[styles.totalXP, { color: colors.text }]}>
							Total: {userProgress.totalXP} XP
						</Text>
					</View>
					<View
						style={[styles.progressBar, { backgroundColor: colors.border }]}
					>
						<View
							style={[
								styles.progressFill,
								{
									backgroundColor: colors.primary,
									width: `${levelData.progress}%`,
								},
							]}
						/>
					</View>
				</View>

				{/* Stats Grid */}
				<View style={styles.statsGrid}>
					<View style={[styles.statCard, { backgroundColor: colors.card }]}>
						<Text style={[styles.statNumber, { color: colors.primary }]}>
							{userProgress.streak}
						</Text>
						<Text style={[styles.statLabel, { color: colors.text }]}>
							Day Streak
						</Text>
					</View>
					<View style={[styles.statCard, { backgroundColor: colors.card }]}>
						<Text style={[styles.statNumber, { color: colors.primary }]}>
							{stats.lessonsCompleted}
						</Text>
						<Text style={[styles.statLabel, { color: colors.text }]}>
							Lessons Done
						</Text>
					</View>
					<View style={[styles.statCard, { backgroundColor: colors.card }]}>
						<Text style={[styles.statNumber, { color: colors.primary }]}>
							{stats.timeDisplay}
						</Text>
						<Text style={[styles.statLabel, { color: colors.text }]}>
							Time Studied
						</Text>
					</View>
					<View style={[styles.statCard, { backgroundColor: colors.card }]}>
						<Text style={[styles.statNumber, { color: colors.primary }]}>
							{earnedCount}
						</Text>
						<Text style={[styles.statLabel, { color: colors.text }]}>
							Achievements
						</Text>
					</View>
				</View>

				{/* Streak Calendar */}
				<View style={[styles.streakSection, { backgroundColor: colors.card }]}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Week Streak
					</Text>
					<View style={styles.streakCalendar}>
						{streakCalendar.map((day, i) => (
							<View
								key={i}
								style={[
									styles.streakDay,
									{
										backgroundColor: day.isActive
											? colors.primary
											: colors.border,
									},
								]}
							>
								<Text
									style={[
										styles.streakDayText,
										{ color: day.isActive ? "white" : colors.text },
									]}
								>
									{day.day}
								</Text>
							</View>
						))}
					</View>
				</View>

				{/* Achievements */}
				<View style={styles.achievementsSection}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Achievements ({earnedCount}/{achievementsList.length})
					</Text>
					<View style={styles.achievementsGrid}>
						{earnedAchievements.map((achievement, index) => (
							<View
								key={achievement.id}
								style={[
									styles.achievementCard,
									{ backgroundColor: colors.card },
									!achievement.earned && styles.achievementLocked,
								]}
							>
								<Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
								<Text
									style={[
										styles.achievementTitle,
										{ color: achievement.earned ? colors.text : colors.icon },
									]}
								>
									{achievement.title}
								</Text>
								<Text
									style={[
										styles.achievementDesc,
										{ color: achievement.earned ? colors.text : colors.icon },
									]}
								>
									{achievement.description}
								</Text>
								{achievement.earned && (
									<View style={styles.achievementBadge}>
										<Text style={styles.achievementBadgeText}>✓</Text>
									</View>
								)}
							</View>
						))}
					</View>
				</View>

				{/* Weekly Goals */}
				<View style={[styles.goalsSection, { backgroundColor: colors.card }]}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Weekly Goals
					</Text>
					<View style={styles.goalItem}>
						<View style={styles.goalHeader}>
							<Text style={[styles.goalText, { color: colors.text }]}>
								📚 Lessons: {weeklyGoals.lessons.completed}/
								{weeklyGoals.lessons.goal}
							</Text>
							<Text style={[styles.goalPercentage, { color: colors.primary }]}>
								{Math.round(weeklyGoals.lessons.progress)}%
							</Text>
						</View>
						<View
							style={[styles.progressBar, { backgroundColor: colors.border }]}
						>
							<View
								style={[
									styles.progressFill,
									{
										backgroundColor: colors.primary,
										width: `${weeklyGoals.lessons.progress}%`,
									},
								]}
							/>
						</View>
					</View>
					<View style={styles.goalItem}>
						<View style={styles.goalHeader}>
							<Text style={[styles.goalText, { color: colors.text }]}>
								⏱️ Time: {weeklyGoals.time.completed}/{weeklyGoals.time.goal}min
							</Text>
							<Text style={[styles.goalPercentage, { color: colors.primary }]}>
								{Math.round(weeklyGoals.time.progress)}%
							</Text>
						</View>
						<View
							style={[styles.progressBar, { backgroundColor: colors.border }]}
						>
							<View
								style={[
									styles.progressFill,
									{
										backgroundColor: colors.primary,
										width: `${weeklyGoals.time.progress}%`,
									},
								]}
							/>
						</View>
					</View>
				</View>

				{/* Settings */}
				<View style={styles.settingsSection}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Settings
					</Text>
					<TouchableOpacity
						style={[styles.settingItem, { backgroundColor: colors.card }]}
						onPress={() => toggleSetting("notifications")}
					>
						<View style={styles.settingContent}>
							<Text style={[styles.settingText, { color: colors.text }]}>
								🔔 Notifications
							</Text>
							{isInitializing && (
								<Text style={[styles.settingSubtext, { color: colors.icon }]}>
									Setting up...
								</Text>
							)}
							{!hasPermissions && userSettings.notifications && (
								<Text style={[styles.settingSubtext, { color: "orange" }]}>
									Permission required
								</Text>
							)}
						</View>
						<Switch
							value={userSettings.notifications}
							onValueChange={() => toggleSetting("notifications")}
							trackColor={{ false: colors.border, true: colors.primary }}
							thumbColor={
								userSettings.notifications ? colors.accent : colors.icon
							}
							disabled={isInitializing}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.settingItem, { backgroundColor: colors.card }]}
						onPress={() => toggleSetting("soundEffects")}
					>
						<Text style={[styles.settingText, { color: colors.text }]}>
							🎵 Sound Effects
						</Text>
						<Switch
							value={userSettings.soundEffects}
							onValueChange={() => toggleSetting("soundEffects")}
							trackColor={{ false: colors.border, true: colors.primary }}
							thumbColor={
								userSettings.soundEffects ? colors.accent : colors.icon
							}
						/>
					</TouchableOpacity>
				</View>
			</ScrollView>

			{/* Edit Profile Modal */}
			<Modal
				visible={editProfileModal}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setEditProfileModal(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={[styles.modalContent, { backgroundColor: colors.card }]}>
						<Text style={[styles.modalTitle, { color: colors.text }]}>
							Edit Profile
						</Text>

						<View style={styles.inputGroup}>
							<Text style={[styles.inputLabel, { color: colors.text }]}>
								Name
							</Text>
							<TextInput
								style={[
									styles.textInput,
									{
										backgroundColor: colors.background,
										color: colors.text,
										borderColor: colors.border,
									},
								]}
								value={newUserName}
								onChangeText={setNewUserName}
								placeholder="Enter your name"
								placeholderTextColor={colors.icon}
							/>
						</View>

						<View style={styles.inputGroup}>
							<Text style={[styles.inputLabel, { color: colors.text }]}>
								Avatar
							</Text>
							<View style={styles.avatarSelector}>
								{["👤", "👨", "👩", "🧑", "👨‍🎓", "👩‍🎓", "🥷", "🦸‍♂️", "🦸‍♀️"].map(
									(emoji, index) => (
										<TouchableOpacity
											key={index}
											style={[
												styles.avatarOption,
												{
													backgroundColor:
														newAvatar === emoji
															? colors.primary
															: colors.border,
												},
											]}
											onPress={() => setNewAvatar(emoji)}
										>
											<Text style={styles.avatarOptionText}>{emoji}</Text>
										</TouchableOpacity>
									)
								)}
							</View>
						</View>

						<View style={styles.modalButtons}>
							<TouchableOpacity
								style={[styles.modalButton, { backgroundColor: colors.border }]}
								onPress={() => setEditProfileModal(false)}
							>
								<Text style={[styles.modalButtonText, { color: colors.text }]}>
									Cancel
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.modalButton,
									{ backgroundColor: colors.primary },
								]}
								onPress={handleProfileEdit}
							>
								<Text style={styles.modalButtonText}>Save</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	profileHeader: {
		padding: 20,
		alignItems: "center",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	avatarContainer: {
		position: "relative",
		marginBottom: 15,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 3,
		borderColor: "white",
	},
	avatarText: {
		fontSize: 32,
	},
	editButton: {
		position: "absolute",
		bottom: 0,
		right: 0,
		backgroundColor: "white",
		borderRadius: 15,
		padding: 5,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	editButtonText: {
		fontSize: 12,
	},
	userName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		marginBottom: 5,
	},
	userLevel: {
		fontSize: 16,
		color: "rgba(255,255,255,0.8)",
	},
	xpSection: {
		margin: 15,
		padding: 15,
		borderRadius: 15,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	xpHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	xpText: {
		fontSize: 16,
		fontWeight: "600",
	},
	totalXP: {
		fontSize: 12,
		opacity: 0.7,
	},
	progressBar: {
		height: 8,
		borderRadius: 4,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		borderRadius: 4,
	},
	statsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		paddingHorizontal: 15,
		marginBottom: 15,
	},
	statCard: {
		width: "48%",
		padding: 15,
		borderRadius: 15,
		alignItems: "center",
		marginBottom: 10,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	statNumber: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 5,
	},
	statLabel: {
		fontSize: 12,
		textAlign: "center",
	},
	streakSection: {
		margin: 15,
		padding: 15,
		borderRadius: 15,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
	},
	streakCalendar: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	streakDay: {
		width: 35,
		height: 35,
		borderRadius: 17.5,
		justifyContent: "center",
		alignItems: "center",
	},
	streakDayText: {
		fontSize: 12,
		fontWeight: "600",
	},
	achievementsSection: {
		paddingHorizontal: 15,
		marginBottom: 15,
	},
	achievementsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	achievementCard: {
		width: "48%",
		padding: 15,
		borderRadius: 15,
		alignItems: "center",
		marginBottom: 10,
		position: "relative",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	achievementLocked: {
		opacity: 0.5,
	},
	achievementEmoji: {
		fontSize: 24,
		marginBottom: 8,
	},
	achievementTitle: {
		fontSize: 12,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 4,
	},
	achievementDesc: {
		fontSize: 10,
		textAlign: "center",
		lineHeight: 14,
	},
	achievementBadge: {
		position: "absolute",
		top: 5,
		right: 5,
		backgroundColor: "#4CAF50",
		borderRadius: 10,
		width: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	achievementBadgeText: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
	},
	goalsSection: {
		margin: 15,
		padding: 15,
		borderRadius: 15,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	goalItem: {
		marginBottom: 15,
	},
	goalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	goalText: {
		fontSize: 14,
		fontWeight: "500",
	},
	goalPercentage: {
		fontSize: 12,
		fontWeight: "600",
	},
	settingsSection: {
		paddingHorizontal: 15,
		marginBottom: 20,
	},
	settingItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 15,
		borderRadius: 15,
		marginBottom: 10,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	settingContent: {
		flex: 1,
	},
	settingText: {
		fontSize: 16,
		fontWeight: "500",
	},
	settingSubtext: {
		fontSize: 12,
		marginTop: 2,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		width: "85%",
		padding: 20,
		borderRadius: 20,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	inputGroup: {
		marginBottom: 15,
	},
	inputLabel: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 8,
	},
	textInput: {
		padding: 12,
		borderRadius: 10,
		borderWidth: 1,
		fontSize: 16,
	},
	avatarSelector: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	avatarOption: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		margin: 2,
	},
	avatarOptionText: {
		fontSize: 20,
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
	},
	modalButton: {
		flex: 1,
		padding: 12,
		borderRadius: 10,
		alignItems: "center",
		marginHorizontal: 5,
	},
	modalButtonText: {
		fontSize: 16,
		fontWeight: "600",
		color: "white",
	},
});
