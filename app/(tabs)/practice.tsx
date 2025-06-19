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

const practiceActivities = [
	{
		id: 1,
		title: "Flashcards",
		subtitle: "Review vocabulary cards",
		emoji: "🃏",
		difficulty: "Easy",
		duration: "5 min",
		xp: 20,
		color: "#4CAF50",
	},
	{
		id: 2,
		title: "Pronunciation",
		subtitle: "Practice speaking French",
		emoji: "🗣️",
		difficulty: "Medium",
		duration: "10 min",
		xp: 30,
		color: "#FF9800",
	},
	{
		id: 3,
		title: "Quick Quiz",
		subtitle: "Test your knowledge",
		emoji: "🧠",
		difficulty: "Medium",
		duration: "3 min",
		xp: 25,
		color: "#2196F3",
	},
	{
		id: 4,
		title: "Grammar Drills",
		subtitle: "Verb conjugation practice",
		emoji: "📝",
		difficulty: "Hard",
		duration: "15 min",
		xp: 40,
		color: "#9C27B0",
	},
	{
		id: 5,
		title: "Listening",
		subtitle: "Improve comprehension",
		emoji: "👂",
		difficulty: "Medium",
		duration: "8 min",
		xp: 35,
		color: "#FF5722",
	},
	{
		id: 6,
		title: "Speed Challenge",
		subtitle: "Race against time",
		emoji: "⚡",
		difficulty: "Hard",
		duration: "2 min",
		xp: 50,
		color: "#795548",
	},
];

export default function Practice() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"]; // Data hooks	const { loading: userLoading } = useUser();
	const { loading: progressLoading, refresh: refreshProgress } = useProgress();
	const { loading: gameLoading } = useGameification();
	const { userProgress, updateStreak, loadProgress } = useProgressContext();
	// State for real-time updates
	const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
	const [isRefreshing, setIsRefreshing] = useState(false);

	// Auto-refresh data periodically
	useEffect(() => {
		const refreshData = async () => {
			setIsRefreshing(true);
			try {
				await Promise.all([refreshProgress(), loadProgress(), updateStreak()]);
				setLastUpdateTime(new Date());
			} catch (error) {
				console.error("Error refreshing practice data:", error);
			} finally {
				setIsRefreshing(false);
			}
		};

		const interval = setInterval(async () => {
			await refreshData();
		}, 60000); // Refresh every minute for practice data

		return () => clearInterval(interval);
	}, [refreshProgress, loadProgress, updateStreak]);

	// Manual refresh function
	const manualRefresh = async () => {
		setIsRefreshing(true);
		try {
			await Promise.all([refreshProgress(), loadProgress(), updateStreak()]);
			setLastUpdateTime(new Date());
		} catch (error) {
			console.error("Error refreshing practice data:", error);
		} finally {
			setIsRefreshing(false);
		}
	}; // Get unified practice statistics
	const getPracticeStats = () => {
		// Get today's activities from lesson progress
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const todaysActivities = Object.values(userProgress.lessonsProgress).filter(
			(lesson) => {
				if (!lesson.completedAt) return false;
				const completedDate = new Date(lesson.completedAt);
				completedDate.setHours(0, 0, 0, 0);
				return completedDate.getTime() === today.getTime();
			}
		);

		// Calculate accuracy from lesson scores
		const lessonsWithScores = Object.values(
			userProgress.lessonsProgress
		).filter((lesson) => lesson.completed && lesson.score !== undefined);
		const totalScore = lessonsWithScores.reduce(
			(sum, lesson) => sum + (lesson.score || 0),
			0
		);
		const averageAccuracy =
			lessonsWithScores.length > 0
				? Math.round(totalScore / lessonsWithScores.length)
				: 0;

		// Get this week's activities for weekly goal
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		const weeklyActivities = Object.values(userProgress.lessonsProgress).filter(
			(lesson) => {
				if (!lesson.completedAt) return false;
				const completedDate = new Date(lesson.completedAt);
				return completedDate >= oneWeekAgo;
			}
		);

		return {
			activitiesCompleted: todaysActivities.length,
			accuracy: averageAccuracy,
			streak: userProgress.streak || 0,
			weeklyGoal: {
				completed: weeklyActivities.length,
				target: 5,
			},
			accuracyGoal: {
				current: averageAccuracy,
				target: 90,
			},
		};
	};

	// Handle activity selection
	const handleActivityPress = (activity: any) => {
		Alert.alert(
			`${activity.emoji} ${activity.title}`,
			`Ready to start ${activity.title.toLowerCase()}?\n\n⏱️ Duration: ${
				activity.duration
			}\n🎯 Difficulty: ${activity.difficulty}\n⭐ XP Reward: +${activity.xp}`,
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Start Practice",
					onPress: () => startActivity(activity),
				},
			]
		);
	}; // Start specific activity
	const startActivity = (activity: any) => {
		// Navigate to specific activity implementation
		switch (activity.id) {
			case 1: // Flashcards
				router.push("/practice/flashcards");
				break;
			case 2: // Pronunciation
				router.push("/practice/pronunciation");
				break;
			case 3: // Quick Quiz
				router.push("/practice/quiz");
				break;
			case 4: // Grammar Drills
				router.push("/practice/grammar");
				break;
			case 5: // Listening
				Alert.alert(
					"Coming Soon! 👂",
					"Listening practice is being developed. Check back soon!",
					[{ text: "OK", style: "default" }]
				);
				return;
			case 6: // Speed Challenge
				Alert.alert(
					"Coming Soon! ⚡",
					"Speed Challenge is being developed. Check back soon!",
					[{ text: "OK", style: "default" }]
				);
				return;
			default:
				Alert.alert(
					"Activity Started! 🎯",
					`Great choice! ${activity.title} will help improve your French skills.`,
					[{ text: "Let's Go! 🚀", style: "default" }]
				);
		}
	};

	// Handle daily challenge
	const handleDailyChallenge = () => {
		if (dailyChallengeProgress >= 3) {
			Alert.alert(
				"Daily Challenge Complete! 🏆",
				"Congratulations! You've completed today's challenge. Come back tomorrow for a new one!",
				[{ text: "Awesome! 🎉", style: "default" }]
			);
		} else {
			Alert.alert(
				"Daily Streak Challenge 🔥",
				`You're ${
					3 - dailyChallengeProgress
				} activities away from completing today's challenge!`,
				[
					{ text: "Later", style: "cancel" },
					{
						text: "Practice Now",
						onPress: () => {
							// Auto-select first available activity
							handleActivityPress(practiceActivities[0]);
						},
					},
				]
			);
		}
	};

	if (progressLoading || gameLoading) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.loadingContainer}>
					<Text style={[styles.loadingText, { color: colors.text }]}>
						Loading Practice Arena...
					</Text>
				</View>
			</SafeAreaView>
		);
	}
	const stats = getPracticeStats();
	const dailyChallengeProgress = Math.min(stats.activitiesCompleted, 3);

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
				{/* Header */}
				<View style={styles.header}>
					<Text style={[styles.title, { color: colors.text }]}>
						Practice Arena 🎮
					</Text>
					<Text style={[styles.subtitle, { color: colors.icon }]}>
						Sharpen your French skills with interactive mini-games
					</Text>
				</View>
				{/* Daily Challenge Banner */}
				<TouchableOpacity
					style={[styles.challengeBanner, { backgroundColor: colors.primary }]}
					onPress={handleDailyChallenge}
					activeOpacity={0.8}
				>
					<View style={styles.challengeContent}>
						<Text style={styles.challengeTitle}>🔥 Daily Streak Challenge</Text>
						<Text style={styles.challengeSubtitle}>
							Complete 3 activities to maintain your streak!
						</Text>
						<View style={styles.streakProgress}>
							{[1, 2, 3].map((dot) => (
								<View
									key={dot}
									style={[
										styles.streakDot,
										{ opacity: dot <= dailyChallengeProgress ? 1 : 0.3 },
									]}
								/>
							))}
						</View>
						<Text style={[styles.challengeStatus, { color: "white" }]}>
							{dailyChallengeProgress >= 3
								? "🎉 Completed!"
								: `${dailyChallengeProgress}/3 Complete`}
						</Text>
					</View>
					<Text style={styles.challengeEmoji}>
						{dailyChallengeProgress >= 3 ? "🏆" : "🎯"}
					</Text>
				</TouchableOpacity>
				{/* Practice Stats */}
				<View style={styles.statsContainer}>
					<TouchableOpacity
						style={[styles.statCard, { backgroundColor: colors.card }]}
						onPress={() =>
							Alert.alert(
								"Activities Today 📊",
								`You've completed ${stats.activitiesCompleted} practice activities today. Keep up the great work!`
							)
						}
						activeOpacity={0.7}
					>
						<Text style={[styles.statValue, { color: colors.success }]}>
							{stats.activitiesCompleted}
						</Text>
						<Text style={[styles.statLabel, { color: colors.icon }]}>
							Activities Today
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.statCard, { backgroundColor: colors.card }]}
						onPress={() =>
							Alert.alert(
								"Practice Accuracy 🎯",
								`Your current accuracy is ${stats.accuracy}%. ${
									stats.accuracy >= 90
										? "Excellent work!"
										: "Keep practicing to improve!"
								}`
							)
						}
						activeOpacity={0.7}
					>
						<Text style={[styles.statValue, { color: colors.accent }]}>
							{stats.accuracy}%
						</Text>
						<Text style={[styles.statLabel, { color: colors.icon }]}>
							Accuracy
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.statCard, { backgroundColor: colors.card }]}
						onPress={() =>
							Alert.alert(
								"Practice Streak 🔥",
								`You're on a ${stats.streak} day practice streak! Keep it going!`
							)
						}
						activeOpacity={0.7}
					>
						<Text style={[styles.statValue, { color: colors.secondary }]}>
							{stats.streak}
						</Text>
						<Text style={[styles.statLabel, { color: colors.icon }]}>
							Day Streak
						</Text>
					</TouchableOpacity>
				</View>{" "}
				{/* Quick Practice */}
				<View style={styles.quickPracticeSection}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Quick Practice
					</Text>
					<View style={styles.quickPracticeGrid}>
						{practiceActivities.slice(0, 4).map((activity) => (
							<TouchableOpacity
								key={activity.id}
								style={[
									styles.quickPracticeCard,
									{ backgroundColor: colors.card },
								]}
								onPress={() => handleActivityPress(activity)}
								activeOpacity={0.7}
							>
								<Text style={styles.quickPracticeEmoji}>{activity.emoji}</Text>
								<Text
									style={[styles.quickPracticeTitle, { color: colors.text }]}
								>
									{activity.title}
								</Text>
								<Text
									style={[styles.quickPracticeDuration, { color: colors.icon }]}
								>
									{activity.duration}
								</Text>
								<View
									style={[styles.xpBadge, { backgroundColor: colors.accent }]}
								>
									<Text style={[styles.xpText, { color: colors.primary }]}>
										+{activity.xp} XP
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
				</View>{" "}
				{/* All Activities */}
				<View style={styles.allActivitiesSection}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						All Practice Activities
					</Text>
					{practiceActivities.map((activity) => (
						<TouchableOpacity
							key={activity.id}
							style={[styles.activityCard, { backgroundColor: colors.card }]}
							onPress={() => handleActivityPress(activity)}
							activeOpacity={0.7}
						>
							<View style={styles.activityLeft}>
								<View
									style={[
										styles.activityIcon,
										{ backgroundColor: activity.color + "20" },
									]}
								>
									<Text style={styles.activityEmoji}>{activity.emoji}</Text>
								</View>
								<View style={styles.activityInfo}>
									<Text style={[styles.activityTitle, { color: colors.text }]}>
										{activity.title}
									</Text>
									<Text
										style={[styles.activitySubtitle, { color: colors.icon }]}
									>
										{activity.subtitle}
									</Text>
									<View style={styles.activityMeta}>
										<View
											style={[
												styles.difficultyBadge,
												{
													backgroundColor:
														activity.difficulty === "Easy"
															? colors.success
															: activity.difficulty === "Medium"
															? colors.warning
															: colors.secondary,
												},
											]}
										>
											<Text style={styles.difficultyText}>
												{activity.difficulty}
											</Text>
										</View>
										<Text
											style={[styles.activityDuration, { color: colors.icon }]}
										>
											{activity.duration}
										</Text>
									</View>
								</View>
							</View>
							<View style={styles.activityRight}>
								<View
									style={[styles.xpBadge, { backgroundColor: colors.accent }]}
								>
									<Text style={[styles.xpText, { color: colors.primary }]}>
										+{activity.xp}
									</Text>
								</View>
								<View
									style={[
										styles.playButton,
										{ backgroundColor: activity.color },
									]}
								>
									<Text style={styles.playButtonText}>▶</Text>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</View>{" "}
				{/* Achievement Section */}
				<View
					style={[styles.achievementSection, { backgroundColor: colors.card }]}
				>
					<Text style={[styles.achievementTitle, { color: colors.text }]}>
						🎯 Practice Goals
					</Text>
					<TouchableOpacity
						style={styles.goalItem}
						onPress={() =>
							Alert.alert(
								"Weekly Goal 📊",
								`Complete 5 activities this week to maintain your practice routine.\n\nProgress: ${stats.weeklyGoal.completed}/${stats.weeklyGoal.target} activities completed.`
							)
						}
						activeOpacity={0.7}
					>
						<Text style={[styles.goalText, { color: colors.icon }]}>
							Complete {stats.weeklyGoal.target} activities this week
						</Text>
						<Text
							style={[
								styles.goalProgress,
								{
									color:
										stats.weeklyGoal.completed >= stats.weeklyGoal.target
											? colors.success
											: colors.warning,
								},
							]}
						>
							{stats.weeklyGoal.completed}/{stats.weeklyGoal.target}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.goalItem}
						onPress={() =>
							Alert.alert(
								"Accuracy Goal 🎯",
								`Maintain ${stats.accuracyGoal.target}% accuracy across all practice activities.\n\nCurrent: ${stats.accuracyGoal.current}% accuracy.`
							)
						}
						activeOpacity={0.7}
					>
						<Text style={[styles.goalText, { color: colors.icon }]}>
							Maintain {stats.accuracyGoal.target}% accuracy
						</Text>
						<Text
							style={[
								styles.goalProgress,
								{
									color:
										stats.accuracyGoal.current >= stats.accuracyGoal.target
											? colors.success
											: colors.warning,
								},
							]}
						>
							{stats.accuracyGoal.current}%
						</Text>
					</TouchableOpacity>

					{/* Last Update Indicator */}
					{lastUpdateTime && (
						<Text style={[styles.lastUpdateText, { color: colors.icon }]}>
							Last updated: {lastUpdateTime.toLocaleTimeString()}
						</Text>
					)}
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
		marginBottom: 25,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
	},
	challengeBanner: {
		flexDirection: "row",
		alignItems: "center",
		padding: 20,
		borderRadius: 15,
		marginBottom: 25,
	},
	challengeContent: {
		flex: 1,
	},
	challengeTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	challengeSubtitle: {
		color: "white",
		fontSize: 14,
		marginBottom: 10,
	},
	challengeStatus: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
		marginTop: 5,
	},
	streakProgress: {
		flexDirection: "row",
		gap: 8,
	},
	streakDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: "white",
	},
	challengeEmoji: {
		fontSize: 32,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 25,
	},
	statCard: {
		flex: 1,
		padding: 15,
		borderRadius: 12,
		alignItems: "center",
		marginHorizontal: 3,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	statValue: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 5,
	},
	statLabel: {
		fontSize: 11,
		textAlign: "center",
	},
	quickPracticeSection: {
		marginBottom: 25,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
	},
	quickPracticeGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	quickPracticeCard: {
		width: "48%",
		padding: 15,
		borderRadius: 12,
		alignItems: "center",
		marginBottom: 10,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	quickPracticeEmoji: {
		fontSize: 24,
		marginBottom: 8,
	},
	quickPracticeTitle: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 4,
		textAlign: "center",
	},
	quickPracticeDuration: {
		fontSize: 12,
	},
	allActivitiesSection: {
		marginBottom: 25,
	},
	activityCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		borderRadius: 12,
		marginBottom: 10,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	activityLeft: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	activityIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	activityEmoji: {
		fontSize: 20,
	},
	activityInfo: {
		flex: 1,
	},
	activityTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 4,
	},
	activitySubtitle: {
		fontSize: 13,
		marginBottom: 6,
	},
	activityMeta: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	difficultyBadge: {
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 8,
	},
	difficultyText: {
		color: "white",
		fontSize: 10,
		fontWeight: "bold",
	},
	activityDuration: {
		fontSize: 12,
	},
	activityRight: {
		alignItems: "center",
		gap: 8,
	},
	xpBadge: {
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 8,
	},
	xpText: {
		fontSize: 10,
		fontWeight: "bold",
	},
	playButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	playButtonText: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
	},
	achievementSection: {
		padding: 20,
		borderRadius: 15,
		marginBottom: 20,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	achievementTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 15,
	},
	goalItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	goalText: {
		fontSize: 14,
	},
	goalProgress: {
		fontSize: 14,
		fontWeight: "bold",
	},
	lastUpdateText: {
		fontSize: 10,
		fontStyle: "italic",
		marginTop: 10,
		textAlign: "center",
	},
});
