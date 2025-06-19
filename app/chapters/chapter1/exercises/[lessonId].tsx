import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../constants/Colors";
import { chapter1Data } from "../../../../data/chapter1/content";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { useGameification } from "../../../../hooks/useGameification";
import { useProgress } from "../../../../hooks/useProgress";

export default function ExerciseScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const router = useRouter();
	const { lessonId } = useLocalSearchParams();
	const { updateChapterProgress } = useProgress();
	const { completeActivity } = useGameification();
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
	const [showResults, setShowResults] = useState(false);
	const [score, setScore] = useState(0);

	// Get the exercise data
	const exerciseIndex = parseInt(lessonId as string) - 1;
	const exercise = chapter1Data.exercises[exerciseIndex];

	useEffect(() => {
		if (!exercise) {
			Alert.alert("Error", "Exercise not found!", [
				{ text: "Go Back", onPress: () => router.back() },
			]);
		}
	}, [exercise, router]);
	const handleAnswer = (answer: string) => {
		if (!exercise) return;

		if (exercise.type === "flashcard_match") {
			// Handle flashcard matching
			const newAnswers = [...selectedAnswers];
			newAnswers[currentStep] = answer;
			setSelectedAnswers(newAnswers);
		} else if (exercise.type === "fill_blank") {
			// Handle fill in the blank
			const newAnswers = [...selectedAnswers];
			newAnswers[currentStep] = answer;
			setSelectedAnswers(newAnswers);
		} else if (exercise.type === "dialogue_complete") {
			// Handle dialogue completion
			const newAnswers = [...selectedAnswers];
			newAnswers[currentStep] = answer;
			setSelectedAnswers(newAnswers);
		}
	};
	const nextStep = () => {
		if (!exercise) return;

		if (
			exercise.type === "flashcard_match" &&
			exercise.items &&
			currentStep < exercise.items.length - 1
		) {
			setCurrentStep(currentStep + 1);
		} else if (
			exercise.type === "fill_blank" &&
			exercise.correct &&
			currentStep < exercise.correct.length - 1
		) {
			setCurrentStep(currentStep + 1);
		} else if (
			exercise.type === "dialogue_complete" &&
			exercise.dialogue &&
			currentStep <
				exercise.dialogue.filter((d) => d.speaker === "You").length - 1
		) {
			setCurrentStep(currentStep + 1);
		} else {
			// Exercise completed
			completeExercise();
		}
	};
	const completeExercise = async () => {
		if (!exercise) return;

		let correctAnswers = 0;
		let totalQuestions = 0;

		if (exercise.type === "flashcard_match" && exercise.items) {
			totalQuestions = exercise.items.length;
			exercise.items.forEach((item, index) => {
				if (selectedAnswers[index] === item.english) {
					correctAnswers++;
				}
			});
		} else if (exercise.type === "fill_blank" && exercise.correct) {
			totalQuestions = exercise.correct.length;
			exercise.correct.forEach((correct, index) => {
				if (selectedAnswers[index] === correct) {
					correctAnswers++;
				}
			});
		} else if (exercise.type === "dialogue_complete" && exercise.dialogue) {
			const youDialogues = exercise.dialogue.filter((d) => d.speaker === "You");
			totalQuestions = youDialogues.length;
			youDialogues.forEach((dialogue, index) => {
				if (
					dialogue.options &&
					selectedAnswers[index] === dialogue.options[0]
				) {
					correctAnswers++;
				}
			});
		}

		const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
		setScore(finalScore);
		setShowResults(true);
		// Update progress and gamification
		await updateChapterProgress(1, {
			lessonsCompleted: 1,
			progress: 20,
		});
		completeActivity("exercise", finalScore >= 70 ? 15 : 10);
	};

	const renderFlashcardExercise = () => {
		if (!exercise.items) return null;
		const currentItem = exercise.items[currentStep];

		return (
			<View style={styles.exerciseContent}>
				<Text style={[styles.instructionText, { color: colors.text }]}>
					{exercise.instructions}
				</Text>

				<View style={[styles.flashcard, { backgroundColor: colors.card }]}>
					<Text style={[styles.flashcardText, { color: colors.text }]}>
						{currentItem.french}
					</Text>
				</View>

				<Text style={[styles.questionText, { color: colors.text }]}>
					What does this mean in English?
				</Text>

				<View style={styles.optionsContainer}>
					{exercise.items.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={[
								styles.optionButton,
								{ backgroundColor: colors.card },
								selectedAnswers[currentStep] === item.english && {
									backgroundColor: colors.primary,
								},
							]}
							onPress={() => handleAnswer(item.english)}
						>
							<Text
								style={[
									styles.optionText,
									{ color: colors.text },
									selectedAnswers[currentStep] === item.english && {
										color: colors.background,
									},
								]}
							>
								{item.english}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		);
	};

	const renderFillBlankExercise = () => {
		return (
			<View style={styles.exerciseContent}>
				<Text style={[styles.instructionText, { color: colors.text }]}>
					{exercise.instructions}
				</Text>
				<View
					style={[styles.sentenceContainer, { backgroundColor: colors.card }]}
				>
					<Text style={[styles.sentenceText, { color: colors.text }]}>
						{exercise.sentence}
					</Text>
				</View>
				<Text style={[styles.questionText, { color: colors.text }]}>
					Fill in blank #{currentStep + 1}:
				</Text>
				<View style={styles.optionsContainer}>
					{exercise.options?.map((option, index) => (
						<TouchableOpacity
							key={index}
							style={[
								styles.optionButton,
								{ backgroundColor: colors.card },
								selectedAnswers[currentStep] === option && {
									backgroundColor: colors.primary,
								},
							]}
							onPress={() => handleAnswer(option)}
						>
							<Text
								style={[
									styles.optionText,
									{ color: colors.text },
									selectedAnswers[currentStep] === option && {
										color: colors.background,
									},
								]}
							>
								{option}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		);
	};
	const renderDialogueExercise = () => {
		if (!exercise.dialogue) return null;

		const youDialogues = exercise.dialogue.filter((d) => d.speaker === "You");
		const currentDialogue = youDialogues[currentStep];
		const dialogueIndex = exercise.dialogue.indexOf(currentDialogue);
		const officerDialogue = exercise.dialogue[dialogueIndex - 1];

		return (
			<View style={styles.exerciseContent}>
				<Text style={[styles.instructionText, { color: colors.text }]}>
					{exercise.instructions}
				</Text>

				<View style={[styles.scenarioBox, { backgroundColor: colors.card }]}>
					<Text style={[styles.scenarioText, { color: colors.text }]}>
						{exercise.scenario}
					</Text>
				</View>

				{officerDialogue && (
					<View
						style={[
							styles.dialogueBubble,
							styles.officerBubble,
							{ backgroundColor: colors.secondary },
						]}
					>
						<Text style={[styles.dialogueText, { color: colors.background }]}>
							{officerDialogue.text}
						</Text>
					</View>
				)}

				<Text style={[styles.questionText, { color: colors.text }]}>
					How do you respond?
				</Text>

				<View style={styles.optionsContainer}>
					{currentDialogue.options?.map((option, index) => (
						<TouchableOpacity
							key={index}
							style={[
								styles.optionButton,
								{ backgroundColor: colors.card },
								selectedAnswers[currentStep] === option && {
									backgroundColor: colors.primary,
								},
							]}
							onPress={() => handleAnswer(option)}
						>
							<Text
								style={[
									styles.optionText,
									{ color: colors.text },
									selectedAnswers[currentStep] === option && {
										color: colors.background,
									},
								]}
							>
								{option}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		);
	};

	const renderResults = () => {
		return (
			<View style={styles.resultsContainer}>
				<Text style={[styles.resultsTitle, { color: colors.text }]}>
					Exercise Completed!
				</Text>

				<View style={[styles.scoreContainer, { backgroundColor: colors.card }]}>
					<Text style={[styles.scoreText, { color: colors.text }]}>
						Your Score
					</Text>
					<Text style={[styles.scoreNumber, { color: colors.primary }]}>
						{score}%
					</Text>
				</View>

				<Text style={[styles.feedbackText, { color: colors.text }]}>
					{score >= 90
						? "Excellent work! 🎉"
						: score >= 70
						? "Great job! 👏"
						: score >= 50
						? "Good effort! Keep practicing 💪"
						: "Keep practicing! You'll get there 🌟"}
				</Text>

				<TouchableOpacity
					style={[styles.actionButton, { backgroundColor: colors.primary }]}
					onPress={() => router.back()}
				>
					<Text style={[styles.actionButtonText, { color: colors.background }]}>
						Back to Chapter
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	if (!exercise) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.errorContainer}>
					<Text style={[styles.errorText, { color: colors.text }]}>
						Exercise not found!
					</Text>
				</View>
			</SafeAreaView>
		);
	}

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

					<View style={styles.headerContent}>
						<Text style={[styles.title, { color: colors.text }]}>
							{exercise.title}
						</Text>
						{!showResults && (
							<Text style={[styles.progressText, { color: colors.icon }]}>
								Step {currentStep + 1} of{" "}
								{exercise.type === "flashcard_match"
									? exercise.items?.length
									: exercise.type === "fill_blank"
									? exercise.correct?.length
									: exercise.dialogue?.filter((d) => d.speaker === "You")
											.length}
							</Text>
						)}
					</View>
				</View>

				{/* Content */}
				{showResults ? (
					renderResults()
				) : (
					<>
						{exercise.type === "flashcard_match" && renderFlashcardExercise()}
						{exercise.type === "fill_blank" && renderFillBlankExercise()}
						{exercise.type === "dialogue_complete" && renderDialogueExercise()}

						{/* Next Button */}
						{selectedAnswers[currentStep] && (
							<TouchableOpacity
								style={[styles.nextButton, { backgroundColor: colors.primary }]}
								onPress={nextStep}
							>
								<Text
									style={[styles.nextButtonText, { color: colors.background }]}
								>
									{currentStep ===
									(exercise.type === "flashcard_match"
										? (exercise.items?.length || 1) - 1
										: exercise.type === "fill_blank"
										? (exercise.correct?.length || 1) - 1
										: (exercise.dialogue?.filter((d) => d.speaker === "You")
												.length || 1) - 1)
										? "Complete Exercise"
										: "Next"}
								</Text>
							</TouchableOpacity>
						)}
					</>
				)}
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
		padding: 16,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 24,
	},
	backButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
		marginRight: 16,
	},
	backButtonText: {
		fontSize: 16,
		fontWeight: "600",
	},
	headerContent: {
		flex: 1,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 4,
	},
	progressText: {
		fontSize: 14,
	},
	exerciseContent: {
		marginBottom: 24,
	},
	instructionText: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: "center",
	},
	flashcard: {
		padding: 24,
		borderRadius: 12,
		marginBottom: 20,
		alignItems: "center",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	flashcardText: {
		fontSize: 24,
		fontWeight: "bold",
	},
	sentenceContainer: {
		padding: 20,
		borderRadius: 12,
		marginBottom: 20,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	sentenceText: {
		fontSize: 18,
		textAlign: "center",
		lineHeight: 28,
	},
	scenarioBox: {
		padding: 16,
		borderRadius: 8,
		marginBottom: 20,
	},
	scenarioText: {
		fontSize: 14,
		fontStyle: "italic",
		textAlign: "center",
	},
	dialogueBubble: {
		padding: 16,
		borderRadius: 16,
		marginBottom: 16,
		maxWidth: "80%",
	},
	officerBubble: {
		alignSelf: "flex-start",
		borderBottomLeftRadius: 4,
	},
	dialogueText: {
		fontSize: 16,
	},
	questionText: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 16,
		textAlign: "center",
	},
	optionsContainer: {
		gap: 12,
	},
	optionButton: {
		padding: 16,
		borderRadius: 12,
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	optionText: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "500",
	},
	nextButton: {
		padding: 16,
		borderRadius: 12,
		marginTop: 24,
		marginBottom: 32,
	},
	nextButtonText: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	resultsContainer: {
		alignItems: "center",
		paddingVertical: 32,
	},
	resultsTitle: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 24,
		textAlign: "center",
	},
	scoreContainer: {
		padding: 24,
		borderRadius: 16,
		alignItems: "center",
		marginBottom: 24,
		minWidth: 200,
	},
	scoreText: {
		fontSize: 16,
		marginBottom: 8,
	},
	scoreNumber: {
		fontSize: 48,
		fontWeight: "bold",
	},
	feedbackText: {
		fontSize: 18,
		textAlign: "center",
		marginBottom: 32,
		paddingHorizontal: 24,
	},
	actionButton: {
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 12,
	},
	actionButtonText: {
		fontSize: 18,
		fontWeight: "bold",
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
