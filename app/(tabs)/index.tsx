import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	Alert,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useProgress as useProgressContext } from "../../contexts/ProgressContext";
import { useColorScheme } from "../../hooks/useColorScheme";
import { useGameification } from "../../hooks/useGameification";
import { useProgress } from "../../hooks/useProgress";
import { useUser } from "../../hooks/useUser";

export default function Index() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { user, loading: userLoading } = useUser();
	const {
		progress,
		loading: progressLoading,
		refresh: refreshProgress,
	} = useProgress();
	const { challenges, loading: gameLoading } = useGameification();
	const { userProgress, getChapterProgress, updateStreak, loadProgress } =
		useProgressContext();

	// State for real-time updates
	const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
	const [isRefreshing, setIsRefreshing] = useState(false); // Auto-refresh data periodically
	useEffect(() => {
		const refreshData = async () => {
			setIsRefreshing(true);
			try {
				await Promise.all([refreshProgress(), loadProgress(), updateStreak()]);
				setLastUpdateTime(new Date());
			} catch (error) {
				console.error("Error refreshing data:", error);
			} finally {
				setIsRefreshing(false);
			}
		};

		const interval = setInterval(async () => {
			await refreshData();
		}, 30000); // Refresh every 30 seconds

		return () => clearInterval(interval);
	}, [refreshProgress, loadProgress, updateStreak]);

	// Manual refresh function
	const manualRefresh = async () => {
		setIsRefreshing(true);
		try {
			await Promise.all([refreshProgress(), loadProgress(), updateStreak()]);
			setLastUpdateTime(new Date());
		} catch (error) {
			console.error("Error refreshing data:", error);
		} finally {
			setIsRefreshing(false);
		}
	};

	// Get unified progress data
	const getUnifiedChapterProgress = (chapterNum: number) => {
		// Try progress context first, then fall back to hooks
		const contextProgress = getChapterProgress(`chapter${chapterNum}`);
		const hookProgress = progress?.chapterProgress?.find(
			(ch) => ch.chapterId === chapterNum
		);

		return contextProgress || hookProgress || null;
	};

	// Navigation handlers
	const navigateToCurrentChapter = () => {
		const currentChapterNum = progress?.currentChapter || 1;
		router.push(`/chapters/chapter${currentChapterNum}` as any);
	};

	const navigateToChapters = () => {
		router.push("/(tabs)/chapters");
	};

	const navigateToPractice = () => {
		router.push("/(tabs)/practice");
	};

	const navigateToProfile = () => {
		router.push("/(tabs)/profile");
	};

	// Challenge handlers
	const startDailyChallenge = async () => {
		if (challenges.length > 0 && !challenges[0].completed) {
			// For now, simulate completing the challenge
			Alert.alert(
				"Daily Challenge Started! 🎯",
				"Practice 10 new vocabulary words to complete today's challenge.",
				[
					{ text: "Start Practice", onPress: navigateToPractice },
					{ text: "Later", style: "cancel" },
				]
			);
		} else if (challenges.length > 0 && challenges[0].completed) {
			Alert.alert(
				"Challenge Completed! 🎉",
				"Come back tomorrow for a new challenge!"
			);
		}
	};

	// Quick action handlers
	const startFlashcards = () => {
		Alert.alert(
			"Flashcards Practice 📚",
			"Practice vocabulary from your current chapter with interactive flashcards!",
			[
				{ text: "Start Practice", onPress: navigateToPractice },
				{ text: "Cancel", style: "cancel" },
			]
		);
	};

	const startPronunciation = () => {
		Alert.alert(
			"Pronunciation Practice 🗣️",
			"Practice French pronunciation with speech recognition!",
			[
				{ text: "Start Practice", onPress: navigateToPractice },
				{ text: "Cancel", style: "cancel" },
			]
		);
	}; // Get current chapter data with real progress
	const getCurrentChapterInfo = () => {
		const currentChapterNum =
			progress?.currentChapter || userProgress?.level || 1;
		const chapterTitles = [
			"Bonjour France!", // Chapter 1
			"Numbers & Time", // Chapter 2
			"Family & Places", // Chapter 3
			"Job Interview Challenge", // Chapter 4
			"Weekend Fun", // Chapter 5
		];

		// Calculate progress based on actual lesson completions
		const chapterProgress = getUnifiedChapterProgress(currentChapterNum);

		// Count completed lessons for this chapter from lesson progress
		const chapterLessons = Object.values(userProgress.lessonsProgress).filter(
			(lesson) =>
				lesson.chapterId === `chapter${currentChapterNum}` && lesson.completed
		);

		// Each chapter typically has 4 lessons (vocabulary, exercises, games, assessment)
		const totalLessons = chapterProgress?.totalLessons || 4;
		const completedLessons = chapterLessons.length;
		const progressPercentage = Math.round(
			(completedLessons / totalLessons) * 100
		);

		return {
			number: currentChapterNum,
			title: chapterTitles[currentChapterNum - 1] || "Bonjour France!",
			emoji: ["🇫🇷", "🔢", "👨‍👩‍👧‍👦", "💼", "🎉"][currentChapterNum - 1] || "🇫🇷",
			progress: progressPercentage,
		};
	}; // Enhanced user stats with unified data
	const getUnifiedUserStats = () => {
		const totalXP = userProgress?.totalXP || user?.totalXP || 0;

		// Level calculation: Level 1 = 0-199 XP, Level 2 = 200-399 XP, etc.
		const level = Math.floor(totalXP / 200) + 1;

		// Current level progress (XP within current level)
		const currentLevelXP = totalXP % 200; // For display: prioritize userProgress data over user hook data
		const displayLevel = userProgress?.level || level;

		// Debug logging
		console.log("Debug User Stats:", {
			totalXP,
			level,
			displayLevel,
			currentLevelXP,
			userLevel: user?.level,
			userProgressLevel: userProgress?.level,
			userTotalXP: user?.totalXP,
			userProgressTotalXP: userProgress?.totalXP,
		});

		return {
			level: displayLevel,
			totalXP,
			streak: userProgress?.streak || user?.streak || 0,
			currentXP: currentLevelXP,
			xpToNextLevel: 200, // Total XP needed for next level
			completedChapters: Object.keys(userProgress?.chaptersProgress || {})
				.length, // Count chapters that have been unlocked/started
		};
	};
	// Get user achievements and milestones
	const getUserAchievements = (
		userStats: ReturnType<typeof getUnifiedUserStats>
	) => {
		const achievements = [];

		// Streak achievements
		if (userStats.streak >= 7) {
			achievements.push({
				icon: "🔥",
				title: "Week Warrior",
				description: `${userStats.streak} day streak!`,
				completed: true,
			});
		} else if (userStats.streak >= 3) {
			achievements.push({
				icon: "⚡",
				title: "Streak Starter",
				description: `${userStats.streak} day streak!`,
				completed: true,
			});
		}

		// XP achievements
		if (userStats.totalXP >= 1000) {
			achievements.push({
				icon: "🌟",
				title: "XP Master",
				description: `${userStats.totalXP} XP earned!`,
				completed: true,
			});
		} else if (userStats.totalXP >= 500) {
			achievements.push({
				icon: "⭐",
				title: "Rising Star",
				description: `${userStats.totalXP} XP earned!`,
				completed: true,
			});
		}

		// Chapter achievements
		if (userStats.completedChapters >= 3) {
			achievements.push({
				icon: "📚",
				title: "Chapter Champion",
				description: `${userStats.completedChapters} chapters completed!`,
				completed: true,
			});
		} else if (userStats.completedChapters >= 1) {
			achievements.push({
				icon: "📖",
				title: "First Steps",
				description: `${userStats.completedChapters} chapter completed!`,
				completed: true,
			});
		}

		// Add next milestone (only show one incomplete achievement)
		if (
			userStats.streak < 7 &&
			achievements.every((a) => a.title !== "Week Warrior")
		) {
			achievements.push({
				icon: "🎯",
				title: "Week Warrior",
				description: `${7 - userStats.streak} more days to go!`,
				completed: false,
			});
		} else if (
			userStats.totalXP < 500 &&
			achievements.every((a) => a.title !== "Rising Star")
		) {
			achievements.push({
				icon: "🎯",
				title: "Rising Star",
				description: `${500 - userStats.totalXP} more XP needed!`,
				completed: false,
			});
		}

		return achievements;
	};

	if (userLoading || progressLoading || gameLoading) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.loadingContainer}>
					<Text style={[styles.loadingText, { color: colors.text }]}>
						Loading your French adventure...
					</Text>
				</View>
			</SafeAreaView>
		);
	} // Get unified data after loading is complete
	const stats = getUnifiedUserStats();
	const completedChapters = stats.completedChapters;
	const achievements = getUserAchievements(stats);

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView
				style={styles.scrollView}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={manualRefresh}
						colors={[colors.primary]}
						tintColor={colors.primary}
					/>
				}
			>
				{" "}
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.headerTop}>
						<Text style={[styles.title, { color: colors.text }]}>
							Bonjour, {user?.name || "French Learner"}! 🇫🇷
						</Text>
						{lastUpdateTime && (
							<Text style={[styles.updateIndicator, { color: colors.icon }]}>
								Updated {lastUpdateTime.toLocaleTimeString()}
							</Text>
						)}
					</View>
					<Text style={[styles.subtitle, { color: colors.icon }]}>
						{stats.streak > 0
							? `${stats.streak} day streak! Keep learning!`
							: "Ready for your French adventure?"}
					</Text>
				</View>
				{/* Stats Cards */}
				<View style={styles.statsContainer}>
					<TouchableOpacity
						style={[styles.statCard, { backgroundColor: colors.card }]}
						onPress={() =>
							Alert.alert(
								"Daily Streak! 🔥",
								`You're on a ${stats.streak} day learning streak! Keep it up!`
							)
						}
						activeOpacity={0.7}
					>
						<Text style={[styles.statValue, { color: colors.primary }]}>
							{stats.streak}
						</Text>
						<Text style={[styles.statLabel, { color: colors.icon }]}>
							Day Streak
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.statCard, { backgroundColor: colors.card }]}
						onPress={navigateToProfile}
						activeOpacity={0.7}
					>
						<Text style={[styles.statValue, { color: colors.accent }]}>
							{stats.totalXP}
						</Text>
						<Text style={[styles.statLabel, { color: colors.icon }]}>
							XP Points
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.statCard, { backgroundColor: colors.card }]}
						onPress={navigateToChapters}
						activeOpacity={0.7}
					>
						<Text style={[styles.statValue, { color: colors.success }]}>
							{completedChapters}/5
						</Text>
						<Text style={[styles.statLabel, { color: colors.icon }]}>
							Chapters
						</Text>
					</TouchableOpacity>
				</View>
				{/* Daily Challenge */}
				{challenges.length > 0 && (
					<View
						style={[styles.challengeCard, { backgroundColor: colors.primary }]}
					>
						<Text style={[styles.challengeTitle, { color: "white" }]}>
							Daily Challenge 🎯
						</Text>
						<Text style={[styles.challengeText, { color: "white" }]}>
							{challenges[0].description}
						</Text>
						<View style={styles.challengeProgress}>
							<View
								style={[
									styles.progressBar,
									{ backgroundColor: "rgba(255,255,255,0.3)" },
								]}
							>
								<View
									style={[
										styles.progressFill,
										{
											backgroundColor: colors.accent,
											width: `${
												(challenges[0].progress / challenges[0].maxProgress) *
												100
											}%`,
										},
									]}
								/>
							</View>
							<Text style={[styles.progressText, { color: "white" }]}>
								{challenges[0].progress}/{challenges[0].maxProgress}
							</Text>
						</View>{" "}
						<TouchableOpacity
							style={[
								styles.challengeButton,
								{ backgroundColor: colors.accent },
							]}
							onPress={startDailyChallenge}
							activeOpacity={0.8}
						>
							<Text
								style={[styles.challengeButtonText, { color: colors.primary }]}
							>
								{challenges[0].completed ? "Completed! 🎉" : "Start Challenge"}
							</Text>{" "}
						</TouchableOpacity>
					</View>
				)}
				{/* Continue Learning */}
				<View style={styles.continueSection}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Continue Your Adventure
					</Text>
					<TouchableOpacity
						style={[styles.continueCard, { backgroundColor: colors.card }]}
						onPress={navigateToCurrentChapter}
						activeOpacity={0.7}
					>
						<Text style={[styles.continueTitle, { color: colors.text }]}>
							Chapter {getCurrentChapterInfo().number}:{" "}
							{getCurrentChapterInfo().title} {getCurrentChapterInfo().emoji}
						</Text>
						<Text style={[styles.continueProgress, { color: colors.icon }]}>
							Progress: {getCurrentChapterInfo().progress}% complete
						</Text>
						<View style={styles.progressBarContainer}>
							<View
								style={[styles.progressBar, { backgroundColor: colors.border }]}
							>
								<View
									style={[
										styles.progressFill,
										{
											backgroundColor: colors.success,
											width: `${getCurrentChapterInfo().progress}%`,
										},
									]}
								/>
							</View>
							<Text style={[styles.progressPercentage, { color: colors.icon }]}>
								{getCurrentChapterInfo().progress}%
							</Text>
						</View>
						<Text
							style={[styles.continueButtonText, { color: colors.primary }]}
						>
							{getCurrentChapterInfo().progress === 100
								? "Review Chapter →"
								: "Continue Learning →"}
						</Text>
						{lastUpdateTime && (
							<Text style={[styles.lastUpdateText, { color: colors.icon }]}>
								Last updated: {lastUpdateTime.toLocaleTimeString()}
							</Text>
						)}
					</TouchableOpacity>
				</View>{" "}
				{/* Quick Actions */}
				<View style={styles.quickActions}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Quick Practice
					</Text>
					<View style={styles.actionButtons}>
						<TouchableOpacity
							style={[
								styles.actionButton,
								{ backgroundColor: colors.secondary },
							]}
							onPress={startFlashcards}
							activeOpacity={0.8}
						>
							<Text style={styles.actionButtonText}>📚 Flashcards</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.actionButton, { backgroundColor: colors.primary }]}
							onPress={startPronunciation}
							activeOpacity={0.8}
						>
							<Text style={styles.actionButtonText}>🗣️ Pronunciation</Text>
						</TouchableOpacity>
					</View>
				</View>{" "}
				{/* Level Progress */}
				<TouchableOpacity
					style={[styles.levelCard, { backgroundColor: colors.card }]}
					onPress={navigateToProfile}
					activeOpacity={0.7}
				>
					<Text style={[styles.levelTitle, { color: colors.text }]}>
						Level {stats.level} Progress
					</Text>
					<View style={styles.levelProgressContainer}>
						<View
							style={[styles.progressBar, { backgroundColor: colors.border }]}
						>
							<View
								style={[
									styles.progressFill,
									{
										backgroundColor: colors.primary,
										width: `${(stats.currentXP / stats.xpToNextLevel) * 100}%`,
									},
								]}
							/>
						</View>
						<Text style={[styles.xpText, { color: colors.icon }]}>
							{stats.currentXP} / {stats.xpToNextLevel} XP
						</Text>
					</View>
					<Text style={[styles.continueButtonText, { color: colors.primary }]}>
						Tap to view profile →
					</Text>
				</TouchableOpacity>
				{/* Achievements & Milestones */}
				<View style={styles.achievementsSection}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Achievements & Milestones
					</Text>{" "}
					<View style={styles.achievementsContainer}>
						{achievements.map((achievement, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.achievementCard,
									{
										backgroundColor: achievement.completed
											? colors.card
											: colors.background,
										borderColor: achievement.completed
											? colors.success
											: colors.border,
										borderWidth: 1,
									},
								]}
								onPress={() =>
									Alert.alert(achievement.title, achievement.description, [
										{ text: "Keep Going! 💪", style: "default" },
									])
								}
								activeOpacity={0.8}
							>
								<Text style={styles.achievementIcon}>{achievement.icon}</Text>
								<Text
									style={[
										styles.achievementTitle,
										{
											color: achievement.completed ? colors.text : colors.icon,
										},
									]}
								>
									{achievement.title}
								</Text>
								<Text
									style={[
										styles.achievementDescription,
										{
											color: achievement.completed
												? colors.icon
												: colors.tabIconDefault,
										},
									]}
								>
									{achievement.description}
								</Text>
							</TouchableOpacity>
						))}{" "}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
		padding: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	header: {
		marginBottom: 30,
	},
	headerTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 8,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		flex: 1,
	},
	updateIndicator: {
		fontSize: 10,
		fontStyle: "italic",
		marginLeft: 10,
	},
	subtitle: {
		fontSize: 16,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	statCard: {
		flex: 1,
		padding: 20,
		borderRadius: 15,
		alignItems: "center",
		marginHorizontal: 5,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	statValue: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 5,
	},
	statLabel: {
		fontSize: 12,
		textAlign: "center",
	},
	challengeCard: {
		padding: 20,
		borderRadius: 15,
		marginBottom: 30,
	},
	challengeTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	challengeText: {
		fontSize: 14,
		marginBottom: 15,
	},
	challengeProgress: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	challengeButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		alignSelf: "flex-start",
	},
	challengeButtonText: {
		fontWeight: "bold",
		fontSize: 14,
	},
	continueSection: {
		marginBottom: 30,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
	},
	continueCard: {
		padding: 20,
		borderRadius: 15,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	continueTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	continueProgress: {
		fontSize: 14,
		marginBottom: 10,
	},
	progressBarContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	progressBar: {
		height: 8,
		backgroundColor: "#E0E0E0",
		borderRadius: 4,
		overflow: "hidden",
		flex: 1,
		marginRight: 10,
	},
	progressFill: {
		height: "100%",
		borderRadius: 4,
	},
	progressPercentage: {
		fontSize: 12,
		fontWeight: "bold",
		minWidth: 35,
	},
	progressText: {
		fontSize: 12,
		fontWeight: "bold",
		minWidth: 35,
	},
	quickActions: {
		marginBottom: 30,
	},
	actionButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	actionButton: {
		flex: 1,
		padding: 15,
		borderRadius: 15,
		alignItems: "center",
		marginHorizontal: 5,
	},
	actionButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 14,
	},
	levelCard: {
		padding: 20,
		borderRadius: 15,
		marginBottom: 30,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	levelTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 15,
	},
	levelProgressContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	xpText: {
		fontSize: 12,
		fontWeight: "bold",
		minWidth: 80,
	},
	continueButtonText: {
		fontSize: 14,
		fontWeight: "600",
		marginTop: 10,
		textAlign: "center",
	},
	lastUpdateText: {
		fontSize: 10,
		fontStyle: "italic",
		marginTop: 5,
		textAlign: "center",
	},
	achievementsSection: {
		marginBottom: 30,
	},
	achievementsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
	achievementCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		borderRadius: 10,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		flex: 1,
		margin: 5,
	},
	achievementIcon: {
		fontSize: 24,
		marginRight: 10,
	},
	achievementDetails: {
		flex: 1,
	},
	achievementTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	achievementDescription: {
		fontSize: 14,
		color: "#666",
	},
	noAchievements: {
		fontSize: 14,
		textAlign: "center",
		color: "#999",
		flex: 1,
	},
});
