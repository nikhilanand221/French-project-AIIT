import { useRouter } from "expo-router";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useProgress } from "../../contexts/ProgressContext";
import { useColorScheme } from "../../hooks/useColorScheme";

const chapters = [
	{
		id: 1,
		title: "Bonjour France!",
		subtitle: "Your first day in France",
		emoji: "🇫🇷",
		progress: 100,
		unlocked: true,
		xp: 150,
	},
	{
		id: 2,
		title: "Race Against Time",
		subtitle: "A rendez-vous",
		emoji: "⏰",
		progress: 0,
		unlocked: true,
		xp: 0,
	},
	{
		id: 3,
		title: "Meet & Greet",
		subtitle: "People, Places, and Family",
		emoji: "👥",
		progress: 0,
		unlocked: true,
		xp: 0,
	},
	{
		id: 4,
		title: "Job Interview Challenge",
		subtitle: "Défi d'Entretien d'Embauche",
		emoji: "💼",
		progress: 0,
		unlocked: false,
		xp: 0,
	},
	{
		id: 5,
		title: "Weekend Fun",
		subtitle: "Amusement de Week-end",
		emoji: "�",
		progress: 0,
		unlocked: false,
		xp: 0,
	},
];

export default function Chapters() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const router = useRouter();
	const { userProgress } = useProgress();
	// Calculate real progress data
	const unlockedChapters = Object.keys(userProgress.chaptersProgress).length;
	const totalXP = userProgress.totalXP; // Create chapters with real progress data
	const chaptersWithProgress = chapters.map((chapter) => {
		const chapterProgress =
			userProgress.chaptersProgress[`chapter${chapter.id}`];

		// Chapter unlocking logic
		let isUnlocked = false;
		if (chapter.id === 1) {
			// Chapter 1 is always unlocked
			isUnlocked = true;
		} else {
			// Check if the current chapter has progress (meaning it was unlocked)
			if (chapterProgress !== undefined) {
				isUnlocked = true;
			} else {
				// Check if previous chapter assessment was completed
				const previousAssessmentKey = Object.keys(
					userProgress.lessonsProgress
				).find(
					(key) =>
						userProgress.lessonsProgress[key].lessonId === "assessment" &&
						userProgress.lessonsProgress[key].chapterId ===
							`chapter${chapter.id - 1}` &&
						userProgress.lessonsProgress[key].completed
				);
				if (previousAssessmentKey) {
					isUnlocked = true;
				}
			}
		}

		let progress = 0;
		let earnedXP = 0;

		// Calculate progress based on actual lesson completions
		const chapterLessons = Object.values(userProgress.lessonsProgress).filter(
			(lesson) =>
				lesson.chapterId === `chapter${chapter.id}` && lesson.completed
		);

		const totalLessons = chapterProgress?.totalLessons || 4; // Each chapter typically has 4 lessons
		const completedLessons = chapterLessons.length;

		progress = Math.round((completedLessons / totalLessons) * 100);

		// Calculate XP based on actual lesson scores
		earnedXP = chapterLessons.reduce((total, lesson) => {
			return total + (lesson.score || 0) * 0.5; // 0.5 XP per score point
		}, 0);

		// Debug logging
		console.log(`Chapter ${chapter.id} Progress:`, {
			chapterLessons: chapterLessons.length,
			totalLessons,
			progress,
			earnedXP,
		});

		return {
			...chapter,
			progress,
			unlocked: isUnlocked,
			xp: Math.round(earnedXP),
		};
	});

	const handleChapterPress = (chapterId: number) => {
		switch (chapterId) {
			case 1:
				router.push("/chapters/chapter1" as any);
				break;
			case 2:
				router.push("/chapters/chapter2" as any);
				break;
			case 3:
				router.push("/chapters/chapter3" as any);
				break;
			case 4:
				router.push("/chapters/chapter4" as any);
				break;
			case 5:
				router.push("/chapters/chapter5" as any);
				break;
			default:
				console.log("Unknown chapter");
		}
	};

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView style={styles.scrollView}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={[styles.title, { color: colors.text }]}>
						Your French Adventure 📖
					</Text>
					<Text style={[styles.subtitle, { color: colors.icon }]}>
						Progress through the story chapters
					</Text>
				</View>{" "}
				{/* Progress Overview */}
				<View style={[styles.overviewCard, { backgroundColor: colors.card }]}>
					<Text style={[styles.overviewTitle, { color: colors.text }]}>
						Overall Progress
					</Text>
					<View style={styles.overviewStats}>
						<View style={styles.overviewStat}>
							<Text style={[styles.overviewValue, { color: colors.primary }]}>
								{unlockedChapters}/5
							</Text>
							<Text style={[styles.overviewLabel, { color: colors.icon }]}>
								Chapters Unlocked
							</Text>
						</View>
						<View style={styles.overviewStat}>
							<Text style={[styles.overviewValue, { color: colors.accent }]}>
								{totalXP}
							</Text>
							<Text style={[styles.overviewLabel, { color: colors.icon }]}>
								Total XP
							</Text>
						</View>
					</View>
				</View>{" "}
				{/* Chapters List */}
				<View style={styles.chaptersContainer}>
					{chaptersWithProgress.map((chapter, index) => (
						<TouchableOpacity
							key={chapter.id}
							style={[
								styles.chapterCard,
								{
									backgroundColor: chapter.unlocked
										? colors.card
										: colors.background,
									opacity: chapter.unlocked ? 1 : 0.6,
									borderColor: colors.border,
								},
							]}
							disabled={!chapter.unlocked}
						>
							{/* Chapter Number & Emoji */}
							<View style={styles.chapterHeader}>
								<View
									style={[
										styles.chapterNumber,
										{ backgroundColor: colors.primary },
									]}
								>
									<Text style={styles.chapterNumberText}>{chapter.id}</Text>
								</View>
								<Text style={styles.chapterEmoji}>{chapter.emoji}</Text>
								{!chapter.unlocked && (
									<View style={styles.lockIcon}>
										<Text style={{ color: colors.icon }}>🔒</Text>
									</View>
								)}
							</View>
							{/* Chapter Info */}
							<View style={styles.chapterInfo}>
								<Text style={[styles.chapterTitle, { color: colors.text }]}>
									Chapter {chapter.id}: {chapter.title}
								</Text>
								<Text style={[styles.chapterSubtitle, { color: colors.icon }]}>
									{chapter.subtitle}
								</Text>

								{/* Progress Bar */}
								{chapter.unlocked && (
									<View style={styles.progressContainer}>
										<View
											style={[
												styles.progressBar,
												{ backgroundColor: colors.border },
											]}
										>
											<View
												style={[
													styles.progressFill,
													{
														backgroundColor:
															chapter.progress === 100
																? colors.success
																: colors.primary,
														width: `${chapter.progress}%`,
													},
												]}
											/>
										</View>
										<Text style={[styles.progressText, { color: colors.icon }]}>
											{chapter.progress}%
										</Text>
									</View>
								)}

								{/* XP Badge */}
								{chapter.unlocked && (
									<View
										style={[styles.xpBadge, { backgroundColor: colors.accent }]}
									>
										<Text style={[styles.xpText, { color: colors.primary }]}>
											+{chapter.xp} XP
										</Text>
									</View>
								)}
							</View>{" "}
							{/* Action Button */}
							{chapter.unlocked && (
								<TouchableOpacity
									style={[
										styles.actionButton,
										{
											backgroundColor:
												chapter.progress > 0 ? colors.success : colors.primary,
										},
									]}
									onPress={() => handleChapterPress(chapter.id)}
								>
									<Text style={styles.actionButtonText}>
										{chapter.progress === 0
											? "Start"
											: chapter.progress === 100
											? "Review"
											: "Continue"}
									</Text>
								</TouchableOpacity>
							)}
						</TouchableOpacity>
					))}
				</View>
				{/* Achievement Section */}
				<View
					style={[styles.achievementCard, { backgroundColor: colors.card }]}
				>
					<Text style={[styles.achievementTitle, { color: colors.text }]}>
						🏆 Recent Achievement
					</Text>{" "}
					<Text style={[styles.achievementText, { color: colors.icon }]}>
						First Steps - Completed your first French lesson!
					</Text>
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
	overviewCard: {
		padding: 20,
		borderRadius: 15,
		marginBottom: 25,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	overviewTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
	},
	overviewStats: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	overviewStat: {
		alignItems: "center",
	},
	overviewValue: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 5,
	},
	overviewLabel: {
		fontSize: 12,
		textAlign: "center",
	},
	chaptersContainer: {
		gap: 15,
		marginBottom: 25,
	},
	chapterCard: {
		padding: 20,
		borderRadius: 15,
		borderWidth: 1,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	chapterHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	chapterNumber: {
		width: 30,
		height: 30,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},
	chapterNumberText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 14,
	},
	chapterEmoji: {
		fontSize: 24,
		marginRight: 10,
	},
	lockIcon: {
		marginLeft: "auto",
	},
	chapterInfo: {
		marginBottom: 15,
	},
	chapterTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	chapterSubtitle: {
		fontSize: 14,
		marginBottom: 10,
	},
	progressContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	progressBar: {
		flex: 1,
		height: 8,
		borderRadius: 4,
		overflow: "hidden",
		marginRight: 10,
	},
	progressFill: {
		height: "100%",
		borderRadius: 4,
	},
	progressText: {
		fontSize: 12,
		fontWeight: "bold",
		minWidth: 35,
	},
	xpBadge: {
		alignSelf: "flex-start",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 10,
	},
	xpText: {
		fontSize: 12,
		fontWeight: "bold",
	},
	actionButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		alignSelf: "flex-end",
	},
	actionButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 14,
	},
	achievementCard: {
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
		marginBottom: 8,
	},
	achievementText: {
		fontSize: 14,
	},
});
