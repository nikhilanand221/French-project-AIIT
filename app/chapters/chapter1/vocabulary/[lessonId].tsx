import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Alert,
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
import { chapter1Data } from "../../../../data/chapter1/content";
import { useColorScheme } from "../../../../hooks/useColorScheme";

// Define lesson categories and their vocabulary
const vocabularyLessons = [
	{
		id: 1,
		title: "Greetings & Farewells",
		category: "greetings",
		description: "Learn essential French greetings and how to say goodbye",
	},
	{
		id: 2,
		title: "Personal Information",
		category: "personal",
		description: "Introduce yourself and share basic personal details",
	},
	{
		id: 3,
		title: "Polite Expressions",
		category: "polite",
		description: "Master essential polite phrases in French",
	},
];

export default function VocabularyLesson() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const router = useRouter();
	const { lessonId } = useLocalSearchParams();
	const { updateLessonProgress, addXP } = useProgress();

	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [showTranslation, setShowTranslation] = useState(false);
	const [completedWords, setCompletedWords] = useState<Set<number>>(new Set());
	const [showCelebration, setShowCelebration] = useState(false);
	const [lessonCompleted, setLessonCompleted] = useState(false);

	// Get the lesson data
	const lessonIndex = parseInt(lessonId as string) - 1;
	const lesson = vocabularyLessons[lessonIndex];

	// Filter vocabulary words by category
	const lessonWords = chapter1Data.vocabulary.filter(
		(word) => word.category === lesson?.category
	);

	const startTime = React.useRef(Date.now());

	useEffect(() => {
		if (!lesson) {
			Alert.alert("Error", "Lesson not found!", [
				{ text: "Go Back", onPress: () => router.back() },
			]);
		}
	}, [lesson, router]);

	const handleLessonComplete = async () => {
		if (!lessonCompleted) {
			setLessonCompleted(true);

			// Update lesson progress
			await updateLessonProgress({
				lessonId: `chapter1-vocabulary-${lessonId}`,
				chapterId: "chapter1",
				completed: true,
				score: 100, // Full score for completing vocabulary
				timeSpent: Date.now() - startTime.current,
				completedAt: new Date(),
				attempts: 1,
			});

			// Award XP
			await addXP(50);

			// Show celebration
			setShowCelebration(true);
		}
	};

	if (!lesson || lessonWords.length === 0) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.errorContainer}>
					<Text style={[styles.errorText, { color: colors.text }]}>
						Lesson not found!
					</Text>
				</View>
			</SafeAreaView>
		);
	}

	const currentWord = lessonWords[currentWordIndex];

	const handleNext = () => {
		if (currentWordIndex < lessonWords.length - 1) {
			setCurrentWordIndex(currentWordIndex + 1);
			setShowTranslation(false);
		} else {
			// Lesson completed
			handleLessonComplete();
		}
	};

	const handlePrevious = () => {
		if (currentWordIndex > 0) {
			setCurrentWordIndex(currentWordIndex - 1);
			setShowTranslation(false);
		}
	};

	const handleMarkAsLearned = () => {
		const newCompletedWords = new Set(completedWords);
		newCompletedWords.add(currentWordIndex);
		setCompletedWords(newCompletedWords);

		if (newCompletedWords.size === lessonWords.length) {
			handleLessonComplete();
		}
	};

	const progress = ((currentWordIndex + 1) / lessonWords.length) * 100;

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
							← Back
						</Text>
					</TouchableOpacity>

					<View style={styles.headerInfo}>
						{" "}
						<Text style={[styles.lessonTitle, { color: colors.text }]}>
							{lesson.title}
						</Text>
						<Text style={[styles.lessonSubtitle, { color: colors.icon }]}>
							Vocabulary • {currentWordIndex + 1} of {lessonWords.length}
						</Text>
					</View>
				</View>
				{/* Progress Bar */}
				<View
					style={[styles.progressContainer, { backgroundColor: colors.border }]}
				>
					<View
						style={[
							styles.progressFill,
							{ backgroundColor: colors.primary, width: `${progress}%` },
						]}
					/>
				</View>
				{/* Word Card */}
				<View style={[styles.wordCard, { backgroundColor: colors.card }]}>
					<View style={styles.wordHeader}>
						<Text style={[styles.wordFrench, { color: colors.text }]}>
							{currentWord.french}
						</Text>
						<Text style={[styles.wordPronunciation, { color: colors.icon }]}>
							[{currentWord.pronunciation}]
						</Text>
					</View>

					{showTranslation && (
						<View style={styles.translationContainer}>
							<Text style={[styles.wordEnglish, { color: colors.accent }]}>
								{currentWord.english}
							</Text>{" "}
							{/* Note: No examples in current data structure, but could be added */}
							{/* {currentWord.example && (
                <View style={styles.exampleContainer}>
                  <Text style={[styles.exampleLabel, { color: colors.icon }]}>Example:</Text>
                  <Text style={[styles.exampleText, { color: colors.text }]}>
                    {currentWord.example}
                  </Text>
                </View>
              )} */}
						</View>
					)}

					<TouchableOpacity
						style={[styles.revealButton, { backgroundColor: colors.primary }]}
						onPress={() => setShowTranslation(!showTranslation)}
					>
						<Text style={styles.revealButtonText}>
							{showTranslation ? "Hide Translation" : "Show Translation"}
						</Text>
					</TouchableOpacity>
				</View>
				{/* Action Buttons */}
				<View style={styles.actionButtons}>
					<TouchableOpacity
						style={[
							styles.actionButton,
							styles.previousButton,
							{
								backgroundColor: colors.card,
								opacity: currentWordIndex === 0 ? 0.5 : 1,
							},
						]}
						onPress={handlePrevious}
						disabled={currentWordIndex === 0}
					>
						<Text style={[styles.actionButtonText, { color: colors.text }]}>
							Previous
						</Text>
					</TouchableOpacity>

					{showTranslation && !completedWords.has(currentWordIndex) && (
						<TouchableOpacity
							style={[
								styles.actionButton,
								styles.learnedButton,
								{ backgroundColor: colors.success },
							]}
							onPress={handleMarkAsLearned}
						>
							<Text style={styles.actionButtonText}>Mark as Learned</Text>
						</TouchableOpacity>
					)}

					<TouchableOpacity
						style={[
							styles.actionButton,
							styles.nextButton,
							{ backgroundColor: colors.primary },
						]}
						onPress={handleNext}
					>
						{" "}
						<Text style={styles.actionButtonText}>
							{currentWordIndex === lessonWords.length - 1
								? "Complete"
								: "Next"}
						</Text>
					</TouchableOpacity>
				</View>{" "}
				{/* Completion Status */}
				<View style={styles.completionContainer}>
					{" "}
					<Text style={[styles.completionText, { color: colors.icon }]}>
						Words learned: {completedWords.size} / {lessonWords.length}
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
				type="lesson_complete"
				title="Félicitations !"
				message={`Vous avez terminé la leçon "${lesson.title}" avec succès !`}
				xpEarned={50}
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
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontSize: 18,
		textAlign: "center",
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
	progressFill: {
		height: "100%",
		borderRadius: 4,
	},
	wordCard: {
		padding: 25,
		borderRadius: 15,
		marginBottom: 25,
		alignItems: "center",
	},
	wordHeader: {
		alignItems: "center",
		marginBottom: 20,
	},
	wordFrench: {
		fontSize: 36,
		fontWeight: "bold",
		marginBottom: 8,
		textAlign: "center",
	},
	wordPronunciation: {
		fontSize: 18,
		fontStyle: "italic",
	},
	translationContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	wordEnglish: {
		fontSize: 24,
		fontWeight: "600",
		marginBottom: 15,
		textAlign: "center",
	},
	exampleContainer: {
		alignItems: "center",
	},
	exampleLabel: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 5,
	},
	exampleText: {
		fontSize: 16,
		textAlign: "center",
		fontStyle: "italic",
	},
	revealButton: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 8,
	},
	revealButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	actionButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	actionButton: {
		flex: 1,
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: "center",
		marginHorizontal: 5,
	},
	previousButton: {
		borderWidth: 1,
		borderColor: "#ddd",
	},
	nextButton: {},
	learnedButton: {
		flex: 0.8,
	},
	actionButtonText: {
		fontSize: 16,
		fontWeight: "600",
		color: "white",
	},
	completionContainer: {
		alignItems: "center",
		marginTop: 10,
	},
	completionText: {
		fontSize: 16,
	},
});
