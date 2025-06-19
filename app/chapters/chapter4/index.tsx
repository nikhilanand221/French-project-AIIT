import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	LessonCard,
	StatsCard,
	XPBadge,
} from "../../../components/LearningComponents";
import { Colors } from "../../../constants/Colors";
import { useProgress } from "../../../contexts/ProgressContext";
import { chapter4Data } from "../../../data/chapter4/content";
import { useColorScheme } from "../../../hooks/useColorScheme";

export default function Chapter4Screen() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { userProgress, getChapterProgress, getLessonProgress, unlockChapter } =
		useProgress();

	// Get chapter progress
	const chapterProgress = getChapterProgress("chapter4");

	// Calculate completion stats
	const totalLessons = 4; // vocabulary, exercises, games, assessment
	const completedLessons = chapterProgress
		? chapterProgress.lessonsCompleted
		: 0;
	const progressPercentage = completedLessons / totalLessons;

	// Unlock chapter 4 if not already unlocked
	React.useEffect(() => {
		if (!chapterProgress) {
			unlockChapter("chapter4");
		}
	}, [chapterProgress, unlockChapter]);

	const handleLessonPress = (type: string, lessonId?: string) => {
		const path = lessonId ? `${type}/${lessonId}` : type;
		router.push(`/chapters/chapter4/${path}` as any);
	};

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				{/* Header */}
				<View style={styles.header}>
					<Text style={[styles.title, { color: colors.text }]}>
						{chapter4Data.title}
					</Text>
					<Text style={[styles.subtitle, { color: colors.tabIconDefault }]}>
						{chapter4Data.description}
					</Text>
				</View>

				{/* XP Badge */}
				<XPBadge xp={userProgress.totalXP} level={userProgress.level} />

				{/* Stats Cards */}
				<View style={styles.statsContainer}>
					<StatsCard
						title="Progression"
						value={`${Math.round(progressPercentage * 100)}%`}
						icon="analytics-outline"
						color="#4CAF50"
					/>
					<StatsCard
						title="Leçons"
						value={`${completedLessons}/${totalLessons}`}
						icon="book-outline"
						color="#2196F3"
					/>
					<StatsCard
						title="Série"
						value={userProgress.streak}
						icon="flame-outline"
						color="#FF9800"
					/>
					<StatsCard
						title="Niveau"
						value={userProgress.level}
						icon="trophy-outline"
						color="#9C27B0"
					/>
				</View>

				{/* Learning Objectives */}
				<View style={styles.section}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Objectifs d&apos;apprentissage
					</Text>
					<View
						style={[
							styles.objectivesContainer,
							{ backgroundColor: colors.card, borderColor: colors.border },
						]}
					>
						{chapter4Data.objectives.map((objective, index) => (
							<View key={index} style={styles.objectiveItem}>
								<Text
									style={[styles.objectiveBullet, { color: colors.primary }]}
								>
									•
								</Text>
								<Text style={[styles.objectiveText, { color: colors.text }]}>
									{objective}
								</Text>
							</View>
						))}
					</View>
				</View>

				{/* Lessons */}
				<View style={styles.section}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Leçons
					</Text>

					<LessonCard
						title="Vocabulaire Professionnel"
						subtitle="Apprenez les métiers et nationalités"
						type="vocabulary"
						completed={
							getLessonProgress("vocabulary-professions")?.completed || false
						}
						progress={getLessonProgress("vocabulary-professions")?.score || 0}
						onPress={() => handleLessonPress("vocabulary", "professions")}
					/>

					<LessonCard
						title="Conjugaison des Verbes"
						subtitle="Maîtrisez les verbes -er, être, avoir"
						type="grammar"
						completed={
							getLessonProgress("vocabulary-verbs")?.completed || false
						}
						progress={getLessonProgress("vocabulary-verbs")?.score || 0}
						onPress={() => handleLessonPress("vocabulary", "verbs")}
					/>

					<LessonCard
						title="Exercices de Grammaire"
						subtitle="Pratiquez la conjugaison et les nationalités"
						type="exercises"
						completed={
							getLessonProgress("exercises-grammar")?.completed || false
						}
						progress={getLessonProgress("exercises-grammar")?.score || 0}
						onPress={() => handleLessonPress("exercises", "grammar")}
					/>

					<LessonCard
						title="Simulation d'Entretien"
						subtitle="Préparez-vous à l'entretien d'embauche"
						type="games"
						completed={getLessonProgress("games-interview")?.completed || false}
						progress={getLessonProgress("games-interview")?.score || 0}
						onPress={() => handleLessonPress("games", "interview")}
					/>

					<LessonCard
						title="Évaluation Professionnelle"
						subtitle="Testez vos compétences professionnelles"
						type="assessment"
						completed={getLessonProgress("assessment")?.completed || false}
						progress={getLessonProgress("assessment")?.score || 0}
						onPress={() => handleLessonPress("assessment")}
					/>
				</View>

				{/* Story Section */}
				<View style={styles.section}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Votre défi professionnel
					</Text>
					<View
						style={[
							styles.storyContainer,
							{ backgroundColor: colors.card, borderColor: colors.border },
						]}
					>
						<Text style={[styles.storyText, { color: colors.text }]}>
							{chapter4Data.story.intro}
						</Text>
						<Text
							style={[styles.storyLocation, { color: colors.tabIconDefault }]}
						>
							📍 {chapter4Data.story.setting}
						</Text>
					</View>
				</View>

				{/* Cultural Notes */}
				<View style={styles.section}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Culture professionnelle française
					</Text>
					<View
						style={[
							styles.culturalContainer,
							{ backgroundColor: colors.card, borderColor: colors.border },
						]}
					>
						{chapter4Data.culturalNotes.map((note, index) => (
							<View key={index} style={styles.culturalNote}>
								<Text style={[styles.culturalTitle, { color: colors.text }]}>
									{note.title}
								</Text>
								<Text
									style={[
										styles.culturalText,
										{ color: colors.tabIconDefault },
									]}
								>
									{note.content}
								</Text>
							</View>
						))}
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
		paddingHorizontal: 20,
	},
	header: {
		paddingVertical: 20,
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		lineHeight: 24,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 24,
		gap: 8,
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 12,
	},
	objectivesContainer: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 16,
	},
	objectiveItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 8,
	},
	objectiveBullet: {
		fontSize: 16,
		fontWeight: "bold",
		marginRight: 8,
		marginTop: 2,
	},
	objectiveText: {
		fontSize: 14,
		lineHeight: 20,
		flex: 1,
	},
	storyContainer: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 16,
	},
	storyText: {
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 12,
	},
	storyLocation: {
		fontSize: 12,
		fontStyle: "italic",
	},
	culturalContainer: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 16,
	},
	culturalNote: {
		marginBottom: 16,
	},
	culturalTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	culturalText: {
		fontSize: 14,
		lineHeight: 20,
	},
});
