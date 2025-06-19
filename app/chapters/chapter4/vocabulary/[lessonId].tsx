import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CelebrationModal } from "../../../../components/CelebrationModal";
import { Colors } from "../../../../constants/Colors";
import { useProgress } from "../../../../contexts/ProgressContext";
import { chapter4Data } from "../../../../data/chapter4/content";
import { useColorScheme } from "../../../../hooks/useColorScheme";

export default function VocabularyLesson() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const router = useRouter();
	const { lessonId } = useLocalSearchParams();
	const { updateLessonProgress, addXP } = useProgress();

	const [currentIndex, setCurrentIndex] = useState(0);
	const [showTranslation, setShowTranslation] = useState(false);
	const [completedWords, setCompletedWords] = useState(new Set<number>());
	const [showCelebration, setShowCelebration] = useState(false);

	// Filter vocabulary based on lesson
	const getVocabularyForLesson = () => {
		if (lessonId === "professions") {
			return chapter4Data.vocabulary.filter(
				(word) =>
					word.category === "professions" ||
					word.category === "nationalities" ||
					word.category === "general"
			);
		}
		if (lessonId === "verbs") {
			return chapter4Data.vocabulary.filter(
				(word) =>
					word.category === "verbs" ||
					word.category === "reflexive_verbs" ||
					word.category === "interview"
			);
		}
		return chapter4Data.vocabulary;
	};

	const vocabularyList = getVocabularyForLesson();
	const currentWord = vocabularyList[currentIndex];

	const handleNext = () => {
		if (currentIndex < vocabularyList.length - 1) {
			setCurrentIndex(currentIndex + 1);
			setShowTranslation(false);
		}
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
			setShowTranslation(false);
		}
	};

	const handleWordCompleted = () => {
		const newCompletedWords = new Set(completedWords);
		newCompletedWords.add(currentIndex);
		setCompletedWords(newCompletedWords);

		// Check if all words are completed
		if (newCompletedWords.size === vocabularyList.length) {
			handleLessonComplete();
		}
	};

	const handleLessonComplete = async () => {
		const score = Math.round(
			(completedWords.size / vocabularyList.length) * 100
		);
		const xpAmount =
			score === 100 ? 45 : Math.max(25, Math.round(score * 0.35));

		// Update lesson progress
		await updateLessonProgress({
			lessonId: `vocabulary-${lessonId}`,
			chapterId: "chapter4",
			completed: true,
			score: score,
			timeSpent: 0,
			attempts: 1,
		});

		// Add XP
		await addXP(xpAmount);

		// Show celebration
		setShowCelebration(true);
	};

	const progress = ((currentIndex + 1) / vocabularyList.length) * 100;

	if (!currentWord) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.errorContainer}>
					<Text style={[styles.errorText, { color: colors.text }]}>
						Vocabulary not found for this lesson!
					</Text>
				</View>
			</SafeAreaView>
		);
	}

	const getLessonTitle = () => {
		if (lessonId === "professions") return "Métiers et Nationalités";
		if (lessonId === "verbs") return "Verbes Professionnels";
		return "Vocabulaire";
	};

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView style={styles.scrollView}>
				{/* Header */}
				<View style={styles.header}>
					<TouchableOpacity
						style={[styles.backButton, { backgroundColor: colors.card }]}
						onPress={() => router.back()}
					>
						<Text style={[styles.backButtonText, { color: colors.text }]}>
							← Retour
						</Text>
					</TouchableOpacity>

					<View style={styles.headerInfo}>
						<Text style={[styles.lessonTitle, { color: colors.text }]}>
							{getLessonTitle()}
						</Text>
						<Text
							style={[styles.lessonSubtitle, { color: colors.tabIconDefault }]}
						>
							{currentIndex + 1} / {vocabularyList.length}
						</Text>
					</View>
				</View>

				{/* Progress Bar */}
				<View
					style={[styles.progressContainer, { backgroundColor: colors.border }]}
				>
					<View
						style={[
							styles.progressBar,
							{ width: `${progress}%`, backgroundColor: colors.primary },
						]}
					/>
				</View>

				{/* Word Card */}
				<View
					style={[
						styles.wordCard,
						{ backgroundColor: colors.card, borderColor: colors.border },
					]}
				>
					<Text style={[styles.frenchWord, { color: colors.text }]}>
						{currentWord.french}
					</Text>

					<Text
						style={[styles.pronunciation, { color: colors.tabIconDefault }]}
					>
						[{currentWord.pronunciation}]
					</Text>

					<Text style={[styles.category, { color: colors.primary }]}>
						{currentWord.category.replace(/_/g, " ")}
					</Text>

					<TouchableOpacity
						style={[styles.revealButton, { backgroundColor: colors.primary }]}
						onPress={() => setShowTranslation(!showTranslation)}
					>
						<Text style={styles.revealButtonText}>
							{showTranslation ? "Cacher" : "Révéler"} la traduction
						</Text>
					</TouchableOpacity>

					{showTranslation && (
						<View style={styles.translationContainer}>
							<Text style={[styles.englishWord, { color: colors.text }]}>
								{currentWord.english}
							</Text>

							{/* Show example if it's a verb */}
							{(currentWord.category === "verbs" ||
								currentWord.category === "reflexive_verbs") && (
								<View style={styles.exampleContainer}>
									<Text
										style={[
											styles.exampleLabel,
											{ color: colors.tabIconDefault },
										]}
									>
										Exemple:
									</Text>
									<Text style={[styles.exampleText, { color: colors.text }]}>
										{currentWord.category === "verbs"
											? `Je ${currentWord.french.replace("r", "")}`
											: `Je ${currentWord.french}`}
									</Text>
								</View>
							)}
						</View>
					)}
				</View>

				{/* Action Buttons */}
				<View style={styles.actionButtons}>
					{showTranslation && !completedWords.has(currentIndex) && (
						<TouchableOpacity
							style={[styles.actionButton, { backgroundColor: colors.primary }]}
							onPress={handleWordCompleted}
						>
							<Text style={styles.actionButtonText}>
								J&apos;ai appris ce mot ✓
							</Text>
						</TouchableOpacity>
					)}

					{completedWords.has(currentIndex) && (
						<View
							style={[
								styles.completedBadge,
								{ backgroundColor: colors.card, borderColor: colors.primary },
							]}
						>
							<Text style={[styles.completedText, { color: colors.primary }]}>
								✓ Mot appris
							</Text>
						</View>
					)}
				</View>

				{/* Navigation */}
				<View style={styles.navigation}>
					<TouchableOpacity
						style={[
							styles.navButton,
							{
								backgroundColor:
									currentIndex > 0 ? colors.primary : colors.border,
								opacity: currentIndex > 0 ? 1 : 0.5,
							},
						]}
						onPress={handlePrevious}
						disabled={currentIndex === 0}
					>
						<Text style={styles.navButtonText}>← Précédent</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.navButton,
							{
								backgroundColor:
									currentIndex < vocabularyList.length - 1
										? colors.primary
										: colors.border,
								opacity: currentIndex < vocabularyList.length - 1 ? 1 : 0.5,
							},
						]}
						onPress={handleNext}
						disabled={currentIndex === vocabularyList.length - 1}
					>
						<Text style={styles.navButtonText}>Suivant →</Text>
					</TouchableOpacity>
				</View>

				{/* Progress Summary */}
				<View style={styles.progressSummary}>
					<Text style={[styles.progressText, { color: colors.text }]}>
						Progression: {completedWords.size} / {vocabularyList.length} mots
						appris
					</Text>
				</View>
			</ScrollView>

			{/* Celebration Modal */}
			<CelebrationModal
				visible={showCelebration}
				onClose={() => {
					setShowCelebration(false);
					router.back();
				}}
				title="Vocabulaire Professionnel Terminé! 💼"
				message={`Vous maîtrisez maintenant ${vocabularyList.length} termes professionnels!`}
				type="lesson_complete"
				xpEarned={completedWords.size === vocabularyList.length ? 45 : 25}
			/>
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
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	backButton: {
		padding: 10,
		borderRadius: 8,
		marginRight: 15,
	},
	backButtonText: {
		fontSize: 16,
	},
	headerInfo: {
		flex: 1,
	},
	lessonTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 4,
	},
	lessonSubtitle: {
		fontSize: 16,
	},
	progressContainer: {
		height: 8,
		borderRadius: 4,
		marginBottom: 30,
	},
	progressBar: {
		height: "100%",
		borderRadius: 4,
	},
	wordCard: {
		borderRadius: 16,
		borderWidth: 1,
		padding: 24,
		alignItems: "center",
		marginBottom: 24,
	},
	frenchWord: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 8,
		textAlign: "center",
	},
	pronunciation: {
		fontSize: 18,
		marginBottom: 8,
		fontStyle: "italic",
	},
	category: {
		fontSize: 14,
		textTransform: "capitalize",
		marginBottom: 20,
		fontWeight: "600",
	},
	revealButton: {
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 25,
		marginBottom: 20,
	},
	revealButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	translationContainer: {
		alignItems: "center",
	},
	englishWord: {
		fontSize: 24,
		fontWeight: "600",
		marginBottom: 12,
	},
	exampleContainer: {
		marginTop: 8,
		alignItems: "center",
	},
	exampleLabel: {
		fontSize: 12,
		marginBottom: 4,
	},
	exampleText: {
		fontSize: 16,
		fontStyle: "italic",
	},
	actionButtons: {
		marginBottom: 24,
	},
	actionButton: {
		paddingVertical: 15,
		borderRadius: 12,
		alignItems: "center",
	},
	actionButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "600",
	},
	completedBadge: {
		paddingVertical: 15,
		borderRadius: 12,
		borderWidth: 2,
		alignItems: "center",
	},
	completedText: {
		fontSize: 18,
		fontWeight: "600",
	},
	navigation: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 24,
		gap: 12,
	},
	navButton: {
		flex: 1,
		paddingVertical: 15,
		borderRadius: 12,
		alignItems: "center",
	},
	navButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	progressSummary: {
		alignItems: "center",
	},
	progressText: {
		fontSize: 16,
		textAlign: "center",
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontSize: 18,
		textAlign: "center",
	},
});
