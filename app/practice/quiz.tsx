import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useProgress as useProgressContext } from "../../contexts/ProgressContext";
import { useColorScheme } from "../../hooks/useColorScheme";

// Quiz question data
const quizQuestions = [
	{
		id: 1,
		question: "What does 'Bonjour' mean in English?",
		options: ["Good evening", "Hello", "Goodbye", "Thank you"],
		correct: 1,
		explanation:
			"'Bonjour' is the standard French greeting meaning 'Hello' or 'Good day'.",
	},
	{
		id: 2,
		question: "How do you say 'Thank you' in French?",
		options: ["Merci", "Pardon", "Salut", "Bonsoir"],
		correct: 0,
		explanation: "'Merci' is the French word for 'Thank you'.",
	},
	{
		id: 3,
		question: "What does 'Au revoir' mean?",
		options: ["Hello", "Please", "Goodbye", "Excuse me"],
		correct: 2,
		explanation:
			"'Au revoir' means 'Goodbye' - literally 'until we see each other again'.",
	},
	{
		id: 4,
		question: "How do you ask 'What is your name?' in French?",
		options: [
			"Comment allez-vous?",
			"Comment vous appelez-vous?",
			"Où habitez-vous?",
			"Quel âge avez-vous?",
		],
		correct: 1,
		explanation:
			"'Comment vous appelez-vous?' is the formal way to ask someone's name.",
	},
	{
		id: 5,
		question: "What does 'S'il vous plaît' mean?",
		options: ["Excuse me", "Please", "Sorry", "You're welcome"],
		correct: 1,
		explanation:
			"'S'il vous plaît' is the polite way to say 'Please' in French.",
	},
	{
		id: 6,
		question: "How do you say 'I don't understand' in French?",
		options: [
			"Je ne sais pas",
			"Je ne comprends pas",
			"Je ne parle pas",
			"Je ne veux pas",
		],
		correct: 1,
		explanation: "'Je ne comprends pas' means 'I don't understand'.",
	},
	{
		id: 7,
		question: "What is the French word for 'water'?",
		options: ["Lait", "Eau", "Jus", "Café"],
		correct: 1,
		explanation: "'Eau' is the French word for water.",
	},
	{
		id: 8,
		question: "How do you say 'How are you?' formally in French?",
		options: ["Ça va?", "Comment allez-vous?", "Tu vas bien?", "Quoi de neuf?"],
		correct: 1,
		explanation:
			"'Comment allez-vous?' is the formal way to ask 'How are you?'",
	},
];

export default function QuickQuiz() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { addXP, updateStreak } = useProgressContext();

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showResult, setShowResult] = useState(false);
	const [score, setScore] = useState({ correct: 0, total: 0 });
	const [sessionQuestions, setSessionQuestions] = useState(
		quizQuestions.slice(0, 5)
	);
	const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question
	const [isComplete, setIsComplete] = useState(false);
	const [resultAnimation] = useState(new Animated.Value(0));

	const currentQuestion = sessionQuestions[currentQuestionIndex];

	useEffect(() => {
		// Shuffle questions for each session
		const shuffled = [...quizQuestions]
			.sort(() => Math.random() - 0.5)
			.slice(0, 5);
		setSessionQuestions(shuffled);
	}, []);
	useEffect(() => {
		// Timer countdown
		if (timeLeft > 0 && !showResult && !isComplete) {
			const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
			return () => clearTimeout(timer);
		} else if (timeLeft === 0 && !showResult) {
			// Time's up, auto-select wrong answer
			setSelectedAnswer(-1);
			setShowResult(true);
			setScore((prev) => ({ correct: prev.correct, total: prev.total + 1 }));

			// Auto-advance after timeout
			setTimeout(() => {
				if (currentQuestionIndex < sessionQuestions.length - 1) {
					setCurrentQuestionIndex((prev) => prev + 1);
					setSelectedAnswer(null);
					setShowResult(false);
					setTimeLeft(15);
					resultAnimation.setValue(0);
				} else {
					setIsComplete(true);
				}
			}, 2000);
		}
	}, [
		timeLeft,
		showResult,
		isComplete,
		currentQuestionIndex,
		sessionQuestions.length,
		resultAnimation,
	]);

	const handleAnswer = (answerIndex: number) => {
		setSelectedAnswer(answerIndex);
		setShowResult(true);

		const isCorrect = answerIndex === currentQuestion.correct;
		const newScore = {
			correct: isCorrect ? score.correct + 1 : score.correct,
			total: score.total + 1,
		};
		setScore(newScore);

		// Animate result
		Animated.timing(resultAnimation, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();

		// Auto-advance after showing result
		setTimeout(() => {
			if (currentQuestionIndex < sessionQuestions.length - 1) {
				nextQuestion();
			} else {
				completeQuiz(newScore);
			}
		}, 2000);
	};

	const nextQuestion = () => {
		setCurrentQuestionIndex(currentQuestionIndex + 1);
		setSelectedAnswer(null);
		setShowResult(false);
		setTimeLeft(15);
		resultAnimation.setValue(0);
	};

	const completeQuiz = async (finalScore: {
		correct: number;
		total: number;
	}) => {
		setIsComplete(true);
		const accuracy = (finalScore.correct / finalScore.total) * 100;
		const xpEarned = Math.round(25 + (accuracy / 100) * 25); // 25-50 XP based on accuracy

		try {
			await addXP(xpEarned);
			await updateStreak();
		} catch (error) {
			console.error("Error updating progress:", error);
		}

		Alert.alert(
			"Quiz Complete! 🧠",
			`Great job! You scored ${finalScore.correct} out of ${
				finalScore.total
			}.\n\nAccuracy: ${accuracy.toFixed(1)}%\nXP Earned: +${xpEarned}`,
			[
				{ text: "Try Again", onPress: () => restartQuiz() },
				{ text: "Back to Practice Arena", onPress: () => router.back() },
			]
		);
	};

	const restartQuiz = () => {
		const shuffled = [...quizQuestions]
			.sort(() => Math.random() - 0.5)
			.slice(0, 5);
		setSessionQuestions(shuffled);
		setCurrentQuestionIndex(0);
		setSelectedAnswer(null);
		setShowResult(false);
		setScore({ correct: 0, total: 0 });
		setTimeLeft(15);
		setIsComplete(false);
		resultAnimation.setValue(0);
	};

	const getTimerColor = () => {
		if (timeLeft > 10) return colors.success;
		if (timeLeft > 5) return colors.warning;
		return colors.secondary;
	};

	if (isComplete) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.completionContainer}>
					<Text style={[styles.completionTitle, { color: colors.text }]}>
						Quiz Complete! 🧠
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
						{currentQuestionIndex + 1} / {sessionQuestions.length}
					</Text>
					<Text style={[styles.scoreText, { color: colors.primary }]}>
						Score: {score.correct}/{score.total}
					</Text>
				</View>
			</View>

			{/* Timer */}
			<View style={styles.timerContainer}>
				<View style={[styles.timerCircle, { borderColor: getTimerColor() }]}>
					<Text style={[styles.timerText, { color: getTimerColor() }]}>
						{timeLeft}
					</Text>
				</View>
				<Text style={[styles.timerLabel, { color: colors.icon }]}>
					seconds left
				</Text>
			</View>

			{/* Question */}
			<View
				style={[styles.questionContainer, { backgroundColor: colors.card }]}
			>
				<Text style={[styles.questionText, { color: colors.text }]}>
					{currentQuestion?.question}
				</Text>
			</View>

			{/* Answer Options */}
			<View style={styles.optionsContainer}>
				{currentQuestion?.options.map((option, index) => {
					let buttonStyle = [
						styles.optionButton,
						{ backgroundColor: colors.card },
					];
					let textStyle = [styles.optionText, { color: colors.text }];

					if (showResult) {
						if (index === currentQuestion.correct) {
							buttonStyle.push(styles.correctOption);
							textStyle.push(styles.correctOptionText);
						} else if (index === selectedAnswer) {
							buttonStyle.push(styles.incorrectOption);
							textStyle.push(styles.incorrectOptionText);
						}
					}

					return (
						<TouchableOpacity
							key={index}
							style={buttonStyle}
							onPress={() => !showResult && handleAnswer(index)}
							disabled={showResult}
							activeOpacity={0.7}
						>
							<View style={styles.optionContent}>
								<Text style={styles.optionLetter}>
									{String.fromCharCode(65 + index)}
								</Text>
								<Text style={textStyle}>{option}</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>

			{/* Result Explanation */}
			{showResult && (
				<Animated.View
					style={[
						styles.explanationContainer,
						{ backgroundColor: colors.primary, opacity: resultAnimation },
					]}
				>
					<Text style={styles.explanationTitle}>
						{selectedAnswer === currentQuestion.correct
							? "✅ Correct!"
							: "❌ Incorrect"}
					</Text>
					<Text style={styles.explanationText}>
						{currentQuestion.explanation}
					</Text>
				</Animated.View>
			)}
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
	timerContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	timerCircle: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 4,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	timerText: {
		fontSize: 24,
		fontWeight: "bold",
	},
	timerLabel: {
		fontSize: 12,
	},
	questionContainer: {
		padding: 20,
		borderRadius: 15,
		marginBottom: 30,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	questionText: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		lineHeight: 24,
	},
	optionsContainer: {
		flex: 1,
	},
	optionButton: {
		marginBottom: 15,
		padding: 15,
		borderRadius: 12,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	optionContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	optionLetter: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: "#f0f0f0",
		textAlign: "center",
		lineHeight: 30,
		fontSize: 16,
		fontWeight: "bold",
		marginRight: 15,
		color: "#666",
	},
	optionText: {
		fontSize: 16,
		flex: 1,
	},
	correctOption: {
		backgroundColor: "#4CAF50",
	},
	incorrectOption: {
		backgroundColor: "#f44336",
	},
	correctOptionText: {
		color: "white",
	},
	incorrectOptionText: {
		color: "white",
	},
	explanationContainer: {
		position: "absolute",
		bottom: 100,
		left: 20,
		right: 20,
		padding: 20,
		borderRadius: 15,
		elevation: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
	},
	explanationTitle: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
		textAlign: "center",
	},
	explanationText: {
		color: "white",
		fontSize: 14,
		textAlign: "center",
		lineHeight: 20,
	},
	completionContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	completionTitle: {
		fontSize: 32,
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
