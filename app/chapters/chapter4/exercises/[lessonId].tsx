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
import { useProgress } from "../../../../contexts/ProgressContext";
import { useColorScheme } from "../../../../hooks/useColorScheme";

export default function ExercisesLesson() {
	const { lessonId } = useLocalSearchParams();
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { addXP } = useProgress();

	const [currentExercise, setCurrentExercise] = useState(0);
	const [userAnswer, setUserAnswer] = useState("");
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [score, setScore] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [showFeedback, setShowFeedback] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	console.log("Exercise lesson for chapter 4:", lessonId);

	// Exercise data for Chapter 4
	const exerciseQuestions = [
		{
			id: "professions-vocab",
			type: "multiple_choice" as const,
			question: "What does 'le médecin' mean in English?",
			options: ["teacher", "doctor", "engineer", "lawyer"],
			correct: 1, // doctor
		},
		{
			id: "verb-conjugation",
			type: "fill_blank" as const,
			question: "Complete: Je _____ médecin. (I am a doctor)",
			correct: "suis",
		},
		{
			id: "nationalities",
			type: "multiple_choice" as const,
			question: "How do you say 'I am French' (feminine)?",
			options: [
				"Je suis français",
				"Je suis française",
				"Je suis francais",
				"Je suis france",
			],
			correct: 1, // française
		},
		{
			id: "reflexive-verbs",
			type: "fill_blank" as const,
			question: "Complete: Je _____ présente. (I introduce myself)",
			correct: "me",
		},
		{
			id: "celebrity-interview",
			type: "multiple_choice" as const,
			question:
				"A journalist asks 'Quelle est votre profession?' How do you respond if you're a teacher?",
			options: [
				"Je suis médecin",
				"Je suis professeur",
				"Je suis étudiant",
				"Je suis avocat",
			],
			correct: 1, // professeur
		},
	];

	const currentQuestion = exerciseQuestions[currentExercise];
	const checkAnswer = () => {
		let correct = false;

		if (currentQuestion.type === "multiple_choice") {
			correct = selectedOption === currentQuestion.correct;
		} else if (currentQuestion.type === "fill_blank") {
			const userAnswerLower = userAnswer.toLowerCase().trim();
			const correctAnswer = currentQuestion.correct as string;
			correct = userAnswerLower === correctAnswer.toLowerCase();
		}

		setIsCorrect(correct);
		setShowFeedback(true);

		if (correct) {
			setScore(score + 1);
			addXP(10);
		}

		// Auto-advance after 2 seconds
		setTimeout(() => {
			handleNext();
		}, 2000);
	};

	const handleNext = () => {
		if (currentExercise < exerciseQuestions.length - 1) {
			setCurrentExercise(currentExercise + 1);
			setUserAnswer("");
			setSelectedOption(null);
			setShowFeedback(false);
		} else {
			setCompleted(true);
			const finalScore = (score / exerciseQuestions.length) * 100;

			Alert.alert(
				"Exercises Complete!",
				`You scored ${score}/${exerciseQuestions.length} (${Math.round(
					finalScore
				)}%)`,
				[
					{
						text: "Continue",
						onPress: () => router.back(),
					},
				]
			);
		}
	};

	const handleOptionSelect = (optionIndex: number) => {
		setSelectedOption(optionIndex);
	};

	if (completed) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.completedContainer}>
					<Text style={[styles.completedTitle, { color: colors.text }]}>
						Exercises Completed! 🎉
					</Text>
					<Text style={[styles.completedScore, { color: colors.primary }]}>
						Final Score: {score}/{exerciseQuestions.length}
					</Text>
					<TouchableOpacity
						style={[styles.backButton, { backgroundColor: colors.primary }]}
						onPress={() => router.back()}
					>
						<Text style={styles.backButtonText}>Return to Chapter</Text>
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
					<Text style={[styles.title, { color: colors.text }]}>
						Professional French Exercises
					</Text>
					<Text style={[styles.progress, { color: colors.icon }]}>
						Question {currentExercise + 1} of {exerciseQuestions.length}
					</Text>
				</View>

				{/* Question */}
				<View style={[styles.questionCard, { backgroundColor: colors.card }]}>
					<Text style={[styles.question, { color: colors.text }]}>
						{currentQuestion.question}
					</Text>

					{/* Answer Options */}
					{currentQuestion.type === "multiple_choice" && (
						<View style={styles.optionsContainer}>
							{currentQuestion.options.map((option, index) => (
								<TouchableOpacity
									key={index}
									style={[
										styles.optionButton,
										{
											backgroundColor:
												selectedOption === index
													? colors.primary
													: colors.background,
											borderColor: colors.border,
										},
									]}
									onPress={() => handleOptionSelect(index)}
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
					)}

					{/* Fill in the blank */}
					{currentQuestion.type === "fill_blank" && (
						<View style={styles.inputContainer}>
							<TextInput
								style={[
									styles.textInput,
									{
										backgroundColor: colors.background,
										borderColor: colors.border,
										color: colors.text,
									},
								]}
								value={userAnswer}
								onChangeText={setUserAnswer}
								placeholder="Type your answer here..."
								placeholderTextColor={colors.icon}
								editable={!showFeedback}
							/>
						</View>
					)}

					{/* Feedback */}
					{showFeedback && (
						<View
							style={[
								styles.feedback,
								{ backgroundColor: isCorrect ? "#d4edda" : "#f8d7da" },
							]}
						>
							<Text
								style={[
									styles.feedbackText,
									{ color: isCorrect ? "#155724" : "#721c24" },
								]}
							>
								{isCorrect
									? "Correct! Well done! 🎉"
									: "Not quite right. Keep practicing! 💪"}
							</Text>
						</View>
					)}

					{/* Submit Button */}
					{!showFeedback && (
						<TouchableOpacity
							style={[
								styles.submitButton,
								{
									backgroundColor:
										(currentQuestion.type === "multiple_choice" &&
											selectedOption !== null) ||
										(currentQuestion.type === "fill_blank" &&
											userAnswer.trim() !== "")
											? colors.primary
											: colors.border,
								},
							]}
							onPress={checkAnswer}
							disabled={
								(currentQuestion.type === "multiple_choice" &&
									selectedOption === null) ||
								(currentQuestion.type === "fill_blank" &&
									userAnswer.trim() === "")
							}
						>
							<Text style={styles.submitButtonText}>Submit Answer</Text>
						</TouchableOpacity>
					)}
				</View>

				{/* Score */}
				<View style={styles.scoreContainer}>
					<Text style={[styles.scoreText, { color: colors.text }]}>
						Score: {score}/{exerciseQuestions.length}
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
		marginBottom: 30,
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
		textAlign: "center",
	},
	progress: {
		fontSize: 16,
		textAlign: "center",
	},
	questionCard: {
		padding: 20,
		borderRadius: 12,
		marginBottom: 20,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	question: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 20,
		textAlign: "center",
	},
	optionsContainer: {
		gap: 12,
	},
	optionButton: {
		padding: 15,
		borderRadius: 8,
		borderWidth: 1,
	},
	optionText: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "500",
	},
	inputContainer: {
		marginVertical: 10,
	},
	textInput: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 15,
		fontSize: 16,
		textAlign: "center",
	},
	feedback: {
		padding: 15,
		borderRadius: 8,
		marginTop: 15,
	},
	feedbackText: {
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
	},
	submitButton: {
		padding: 15,
		borderRadius: 8,
		marginTop: 20,
	},
	submitButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	scoreContainer: {
		alignItems: "center",
		marginTop: 20,
	},
	scoreText: {
		fontSize: 18,
		fontWeight: "600",
	},
	completedContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	completedTitle: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	completedScore: {
		fontSize: 22,
		fontWeight: "600",
		marginBottom: 30,
	},
	backButton: {
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 25,
	},
	backButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});
