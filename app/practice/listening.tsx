import { useRouter } from "expo-router";
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
import { Colors } from "../../constants/Colors";
import { useProgress as useProgressContext } from "../../contexts/ProgressContext";
import { useColorScheme } from "../../hooks/useColorScheme";

// Sample listening exercises
const listeningExercises = [
	{
		id: 1,
		audioText: "Bonjour, comment allez-vous?",
		question: "What is the person asking?",
		options: [
			"What is your name?",
			"How are you?",
			"Where are you from?",
			"What time is it?",
		],
		correctAnswer: 1,
		translation: "Hello, how are you?",
	},
	{
		id: 2,
		audioText: "Je voudrais un café, s'il vous plaît.",
		question: "What does the person want?",
		options: ["A tea", "A coffee", "A sandwich", "Water"],
		correctAnswer: 1,
		translation: "I would like a coffee, please.",
	},
	{
		id: 3,
		audioText: "Où est la gare, s'il vous plaît?",
		question: "What is the person looking for?",
		options: [
			"The hospital",
			"The restaurant",
			"The train station",
			"The museum",
		],
		correctAnswer: 2,
		translation: "Where is the train station, please?",
	},
	{
		id: 4,
		audioText: "Il est trois heures et demie.",
		question: "What time is it?",
		options: ["2:30", "3:30", "4:30", "3:00"],
		correctAnswer: 1,
		translation: "It is three thirty (3:30).",
	},
	{
		id: 5,
		audioText: "Ma famille habite à Paris.",
		question: "Where does the family live?",
		options: ["London", "Madrid", "Paris", "Rome"],
		correctAnswer: 2,
		translation: "My family lives in Paris.",
	},
];

export default function Listening() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { addXP, updateStreak } = useProgressContext();

	const [currentExercise, setCurrentExercise] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showTranslation, setShowTranslation] = useState(false);
	const [score, setScore] = useState({ correct: 0, total: 0 });
	const [sessionExercises, setSessionExercises] = useState(listeningExercises);
	const [isComplete, setIsComplete] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const currentEx = sessionExercises[currentExercise];

	useEffect(() => {
		// Shuffle exercises for each session
		const shuffled = [...listeningExercises].sort(() => Math.random() - 0.5);
		setSessionExercises(shuffled);
	}, []);

	const playAudio = () => {
		// In a real implementation, this would use expo-av or similar to play audio
		setIsPlaying(true);

		// Simulate audio playback
		Alert.alert(
			"🔊 Audio Playing",
			`Listen carefully:\n\n"${currentEx.audioText}"\n\n(In a real app, this would be actual French audio)`,
			[{ text: "Got it!", onPress: () => setIsPlaying(false) }]
		);
	};

	const handleAnswerSelect = (answerIndex: number) => {
		setSelectedAnswer(answerIndex);
	};

	const submitAnswer = () => {
		if (selectedAnswer === null) {
			Alert.alert(
				"Please select an answer",
				"Choose one of the options before submitting."
			);
			return;
		}

		const isCorrect = selectedAnswer === currentEx.correctAnswer;
		const newScore = {
			correct: isCorrect ? score.correct + 1 : score.correct,
			total: score.total + 1,
		};
		setScore(newScore);

		// Show result
		Alert.alert(
			isCorrect ? "Correct! 🎉" : "Not quite... 📚",
			isCorrect
				? `Great listening skills! The correct answer was "${
						currentEx.options[currentEx.correctAnswer]
				  }".`
				: `The correct answer was "${
						currentEx.options[currentEx.correctAnswer]
				  }". Keep practicing!`,
			[{ text: "Continue", onPress: () => nextExercise(newScore) }]
		);
	};

	const nextExercise = (newScore: { correct: number; total: number }) => {
		if (currentExercise < sessionExercises.length - 1) {
			setCurrentExercise(currentExercise + 1);
			setSelectedAnswer(null);
			setShowTranslation(false);
		} else {
			completeSession(newScore);
		}
	};

	const completeSession = async (finalScore: {
		correct: number;
		total: number;
	}) => {
		setIsComplete(true);
		const accuracy = (finalScore.correct / finalScore.total) * 100;
		const xpEarned = Math.round(35 + (accuracy / 100) * 25); // 35-60 XP based on accuracy

		try {
			await addXP(xpEarned);
			await updateStreak();
		} catch (error) {
			console.error("Error updating progress:", error);
		}

		Alert.alert(
			"Listening Practice Complete! 🎧",
			`Excellent work! You got ${finalScore.correct} out of ${
				finalScore.total
			} correct.\n\nAccuracy: ${accuracy.toFixed(1)}%\nXP Earned: +${xpEarned}`,
			[
				{ text: "Practice Again", onPress: () => restartSession() },
				{ text: "Back to Practice Arena", onPress: () => router.back() },
			]
		);
	};

	const restartSession = () => {
		const shuffled = [...listeningExercises].sort(() => Math.random() - 0.5);
		setSessionExercises(shuffled);
		setCurrentExercise(0);
		setSelectedAnswer(null);
		setShowTranslation(false);
		setScore({ correct: 0, total: 0 });
		setIsComplete(false);
	};

	if (isComplete) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.completionContainer}>
					<Text style={[styles.completionTitle, { color: colors.text }]}>
						Listening Practice Complete! 🎧
					</Text>
					<Text style={[styles.completionScore, { color: colors.primary }]}>
						{score.correct}/{score.total} Correct
					</Text>
					<Text style={[styles.completionAccuracy, { color: colors.icon }]}>
						{((score.correct / score.total) * 100).toFixed(1)}% Accuracy
					</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
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
				<View style={styles.progressContainer}>
					<Text style={[styles.progressText, { color: colors.text }]}>
						{currentExercise + 1} / {sessionExercises.length}
					</Text>
					<Text style={[styles.scoreText, { color: colors.primary }]}>
						Score: {score.correct}/{score.total}
					</Text>
				</View>
			</View>

			<ScrollView style={styles.content}>
				{/* Audio Section */}
				<View style={[styles.audioSection, { backgroundColor: colors.card }]}>
					<Text style={[styles.instructionText, { color: colors.text }]}>
						🎧 Listen to the French audio and answer the question
					</Text>

					<TouchableOpacity
						style={[styles.playButton, { backgroundColor: colors.primary }]}
						onPress={playAudio}
						disabled={isPlaying}
					>
						<Text style={styles.playButtonText}>
							{isPlaying ? "🔊 Playing..." : "🔊 Play Audio"}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.translationButton,
							{ backgroundColor: colors.secondary },
						]}
						onPress={() => setShowTranslation(!showTranslation)}
					>
						<Text style={styles.translationButtonText}>
							{showTranslation ? "Hide Translation" : "Show Translation"}
						</Text>
					</TouchableOpacity>

					{showTranslation && (
						<View
							style={[
								styles.translationBox,
								{ backgroundColor: colors.background },
							]}
						>
							<Text style={[styles.translationText, { color: colors.icon }]}>
								Translation: {currentEx.translation}
							</Text>
						</View>
					)}
				</View>

				{/* Question Section */}
				<View style={styles.questionSection}>
					<Text style={[styles.questionText, { color: colors.text }]}>
						{currentEx.question}
					</Text>

					{/* Answer Options */}
					<View style={styles.optionsContainer}>
						{currentEx.options.map((option, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.optionButton,
									{
										backgroundColor:
											selectedAnswer === index ? colors.primary : colors.card,
										borderColor:
											selectedAnswer === index ? colors.primary : colors.border,
									},
								]}
								onPress={() => handleAnswerSelect(index)}
							>
								<Text
									style={[
										styles.optionText,
										{ color: selectedAnswer === index ? "white" : colors.text },
									]}
								>
									{String.fromCharCode(65 + index)}. {option}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					{/* Submit Button */}
					<TouchableOpacity
						style={[
							styles.submitButton,
							{
								backgroundColor:
									selectedAnswer !== null ? colors.accent : colors.border,
								opacity: selectedAnswer !== null ? 1 : 0.5,
							},
						]}
						onPress={submitAnswer}
						disabled={selectedAnswer === null}
					>
						<Text style={styles.submitButtonText}>Submit Answer</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	backButton: {
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderRadius: 20,
	},
	backButtonText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	progressContainer: {
		alignItems: "flex-end",
	},
	progressText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	scoreText: {
		fontSize: 14,
		marginTop: 2,
	},
	content: {
		flex: 1,
	},
	audioSection: {
		padding: 20,
		borderRadius: 15,
		marginBottom: 20,
		alignItems: "center",
	},
	instructionText: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	playButton: {
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 25,
		marginBottom: 15,
	},
	playButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	translationButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		marginBottom: 10,
	},
	translationButtonText: {
		color: "white",
		fontSize: 14,
		fontWeight: "bold",
	},
	translationBox: {
		padding: 15,
		borderRadius: 10,
		marginTop: 10,
		width: "100%",
	},
	translationText: {
		fontSize: 14,
		fontStyle: "italic",
		textAlign: "center",
	},
	questionSection: {
		flex: 1,
	},
	questionText: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	optionsContainer: {
		marginBottom: 30,
	},
	optionButton: {
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
		borderWidth: 2,
	},
	optionText: {
		fontSize: 16,
		fontWeight: "500",
	},
	submitButton: {
		paddingVertical: 18,
		borderRadius: 25,
		alignItems: "center",
		marginTop: 10,
	},
	submitButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	completionContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	completionTitle: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	completionScore: {
		fontSize: 48,
		fontWeight: "bold",
		marginBottom: 10,
	},
	completionAccuracy: {
		fontSize: 20,
		marginBottom: 30,
	},
});
