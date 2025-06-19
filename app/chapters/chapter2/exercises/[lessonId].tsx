import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../constants/Colors";
import { chapter2Data } from "../../../../data/chapter2/content";
import { useColorScheme } from "../../../../hooks/useColorScheme";

export default function ExercisesLesson() {
	const { lessonId } = useLocalSearchParams();
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	// Get the lesson data based on lessonId - will be used for future expansion
	console.log("Exercise lesson for:", lessonId);

	const [currentExercise, setCurrentExercise] = useState(0);
	const [userAnswer, setUserAnswer] = useState("");
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [score, setScore] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [showFeedback, setShowFeedback] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	// Get exercises for this lesson
	const exercises = chapter2Data.exercises.slice(0, 4); // First 4 exercises for demo
	const exercise = exercises[currentExercise];
	const checkAnswer = () => {
		let correct = false;

		if (exercise.type === "multiple_choice") {
			correct = selectedOption === exercise.correct;
		} else if (exercise.type === "fill_blank") {
			const userAnswerLower = userAnswer.toLowerCase().trim();
			const correctAnswer = exercise.correct;
			if (typeof correctAnswer === "string") {
				const correctAnswerLower = correctAnswer.toLowerCase();
				correct = userAnswerLower === correctAnswerLower;
			}
		}

		setIsCorrect(correct);
		setShowFeedback(true);

		if (correct) {
			setScore(score + 1);
		}
	};

	const nextExercise = () => {
		if (currentExercise < exercises.length - 1) {
			setCurrentExercise(currentExercise + 1);
			setUserAnswer("");
			setSelectedOption(null);
			setShowFeedback(false);
		} else {
			setCompleted(true);
		}
	};

	const resetExercise = () => {
		setUserAnswer("");
		setSelectedOption(null);
		setShowFeedback(false);
	};

	const handleComplete = () => {
		const percentage = Math.round((score / exercises.length) * 100);
		Alert.alert(
			"Exercices Terminés!",
			`Votre score: ${score}/${exercises.length} (${percentage}%)`,
			[
				{
					text: "Continuer",
					onPress: () => router.back(),
				},
			]
		);
	};

	const renderExercise = () => {
		if (exercise.type === "multiple_choice") {
			return (
				<View style={styles.exerciseContainer}>
					<Text style={[styles.question, { color: colors.text }]}>
						{exercise.sentence}
					</Text>
					<View style={styles.optionsContainer}>
						{exercise.options?.map((option: string, index: number) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.option,
									{
										backgroundColor:
											selectedOption === index ? "#E91E63" : colors.card,
										borderColor: colors.border,
									},
								]}
								onPress={() => setSelectedOption(index)}
								disabled={showFeedback}
							>
								<Text
									style={[
										styles.optionText,
										{
											color: selectedOption === index ? "white" : colors.text,
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
		} else if (exercise.type === "fill_blank") {
			return (
				<View style={styles.exerciseContainer}>
					<Text style={[styles.question, { color: colors.text }]}>
						{exercise.sentence}
					</Text>
					<TextInput
						style={[
							styles.textInput,
							{
								backgroundColor: colors.card,
								borderColor: colors.border,
								color: colors.text,
							},
						]}
						value={userAnswer}
						onChangeText={setUserAnswer}
						placeholder="Votre réponse..."
						placeholderTextColor={colors.secondary}
						editable={!showFeedback}
					/>
				</View>
			);
		}
	};

	if (completed) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.completedContainer}>
					<Text style={[styles.completedTitle, { color: colors.text }]}>
						🎉 Félicitations !
					</Text>
					<Text style={[styles.completedScore, { color: colors.text }]}>
						Score Final: {score}/{exercises.length}
					</Text>
					<Text
						style={[styles.completedPercentage, { color: colors.secondary }]}
					>
						{Math.round((score / exercises.length) * 100)}% de réussite
					</Text>
					<TouchableOpacity
						style={[styles.completeButton, { backgroundColor: "#4CAF50" }]}
						onPress={handleComplete}
					>
						<Text style={styles.completeButtonText}>Terminer</Text>
					</TouchableOpacity>
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
					<Text style={[styles.lessonTitle, { color: colors.text }]}>
						Exercices - Chapitre 2
					</Text>
					<Text style={[styles.progress, { color: colors.secondary }]}>
						Exercice {currentExercise + 1} / {exercises.length}
					</Text>
					<Text style={[styles.score, { color: colors.secondary }]}>
						Score: {score} / {currentExercise + (showFeedback ? 1 : 0)}
					</Text>
				</View>

				{/* Exercise */}
				<View style={[styles.exerciseCard, { backgroundColor: colors.card }]}>
					<Text style={[styles.exerciseTitle, { color: colors.text }]}>
						{exercise.title}
					</Text>
					<Text style={[styles.instructions, { color: colors.secondary }]}>
						{exercise.instructions}
					</Text>

					{renderExercise()}

					{/* Feedback */}
					{showFeedback && (
						<View
							style={[
								styles.feedback,
								{ backgroundColor: isCorrect ? "#4CAF50" : "#F44336" },
							]}
						>
							<Text style={styles.feedbackText}>
								{isCorrect
									? "✓ Correct!"
									: `✗ Incorrect. La bonne réponse est: ${exercise.correct}`}
							</Text>
						</View>
					)}
				</View>

				{/* Action Buttons */}
				<View style={styles.actionContainer}>
					{!showFeedback ? (
						<TouchableOpacity
							style={[
								styles.checkButton,
								{
									backgroundColor: "#E91E63",
									opacity: (
										exercise.type === "multiple_choice"
											? selectedOption !== null
											: userAnswer.trim() !== ""
									)
										? 1
										: 0.5,
								},
							]}
							onPress={checkAnswer}
							disabled={
								exercise.type === "multiple_choice"
									? selectedOption === null
									: userAnswer.trim() === ""
							}
						>
							<Text style={styles.buttonText}>Vérifier</Text>
						</TouchableOpacity>
					) : (
						<View style={styles.feedbackActions}>
							<TouchableOpacity
								style={[
									styles.actionButton,
									{ backgroundColor: colors.secondary },
								]}
								onPress={resetExercise}
							>
								<Text style={styles.buttonText}>Réessayer</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
								onPress={nextExercise}
							>
								<Text style={styles.buttonText}>
									{currentExercise === exercises.length - 1
										? "Terminer"
										: "Suivant"}
								</Text>
							</TouchableOpacity>
						</View>
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
		padding: 16,
	},
	header: {
		alignItems: "center",
		marginBottom: 24,
	},
	lessonTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	progress: {
		fontSize: 16,
		marginBottom: 4,
	},
	score: {
		fontSize: 14,
	},
	exerciseCard: {
		padding: 20,
		borderRadius: 12,
		marginBottom: 24,
	},
	exerciseTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},
	instructions: {
		fontSize: 16,
		marginBottom: 20,
	},
	exerciseContainer: {
		marginBottom: 20,
	},
	question: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
		textAlign: "center",
	},
	optionsContainer: {
		gap: 12,
	},
	option: {
		padding: 16,
		borderRadius: 8,
		borderWidth: 2,
	},
	optionText: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "500",
	},
	textInput: {
		borderWidth: 2,
		borderRadius: 8,
		padding: 16,
		fontSize: 16,
		textAlign: "center",
	},
	feedback: {
		padding: 12,
		borderRadius: 8,
		marginTop: 16,
	},
	feedbackText: {
		color: "white",
		fontSize: 16,
		textAlign: "center",
		fontWeight: "bold",
	},
	actionContainer: {
		marginBottom: 24,
	},
	checkButton: {
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	feedbackActions: {
		flexDirection: "row",
		gap: 12,
	},
	actionButton: {
		flex: 1,
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	completedContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
	},
	completedTitle: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	completedScore: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	completedPercentage: {
		fontSize: 18,
		marginBottom: 32,
	},
	completeButton: {
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 8,
	},
	completeButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});
