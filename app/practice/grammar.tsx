import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
import { Colors } from "../../constants/Colors";
import { useProgress as useProgressContext } from "../../contexts/ProgressContext";
import { useColorScheme } from "../../hooks/useColorScheme";
import { useGameification } from "../../hooks/useGameification";

// Grammar drill data with different exercise types
const grammarExercises = [
	{
		id: 1,
		type: "conjugation",
		verb: "être",
		english: "to be",
		pronoun: "Je",
		correctAnswer: "suis",
		options: ["suis", "es", "est", "sommes"],
		explanation:
			'Je suis = I am. The verb "être" (to be) conjugated with "Je" becomes "suis".',
	},
	{
		id: 2,
		type: "conjugation",
		verb: "avoir",
		english: "to have",
		pronoun: "Tu",
		correctAnswer: "as",
		options: ["ai", "as", "a", "avons"],
		explanation:
			'Tu as = You have. The verb "avoir" (to have) conjugated with "Tu" becomes "as".',
	},
	{
		id: 3,
		type: "conjugation",
		verb: "aller",
		english: "to go",
		pronoun: "Il/Elle",
		correctAnswer: "va",
		options: ["vais", "vas", "va", "allons"],
		explanation:
			'Il/Elle va = He/She goes. The verb "aller" (to go) conjugated with "Il/Elle" becomes "va".',
	},
	{
		id: 4,
		type: "sentence",
		question: 'Complete: "Comment ___-vous?" (How are you?)',
		correctAnswer: "allez",
		options: ["aller", "allez", "va", "vais"],
		explanation:
			'Comment allez-vous? uses the formal "vous" form of "aller" which is "allez".',
	},
	{
		id: 5,
		type: "sentence",
		question: 'Complete: "Je ___ français." (I speak French)',
		correctAnswer: "parle",
		options: ["parler", "parle", "parles", "parlons"],
		explanation:
			'Je parle = I speak. First person singular of "parler" is "parle".',
	},
	{
		id: 6,
		type: "fill",
		sentence: "Bonjour, je ___ Marie.",
		english: "Hello, I am Marie.",
		correctAnswer: "suis",
		explanation: 'Je suis = I am. Using the verb "être" conjugated for "je".',
	},
	{
		id: 7,
		type: "fill",
		sentence: "Nous ___ à Paris.",
		english: "We are in Paris.",
		correctAnswer: "sommes",
		explanation:
			'Nous sommes = We are. Using the verb "être" conjugated for "nous".',
	},
	{
		id: 8,
		type: "conjugation",
		verb: "faire",
		english: "to do/make",
		pronoun: "Vous",
		correctAnswer: "faites",
		options: ["fais", "fait", "faites", "font"],
		explanation:
			'Vous faites = You do/make. The verb "faire" conjugated with "vous" becomes "faites".',
	},
];

export default function Grammar() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { addXP, updateStreak } = useProgressContext();
	const { challenges, updateChallengeProgress } = useGameification();

	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string>("");
	const [userInput, setUserInput] = useState("");
	const [score, setScore] = useState({ correct: 0, total: 0 });
	const [sessionExercises, setSessionExercises] = useState(
		grammarExercises.slice(0, 5)
	);
	const [showExplanation, setShowExplanation] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [isComplete, setIsComplete] = useState(false);

	const currentExercise = sessionExercises[currentExerciseIndex];

	useEffect(() => {
		// Shuffle exercises for each session
		const shuffled = [...grammarExercises]
			.sort(() => Math.random() - 0.5)
			.slice(0, 5);
		setSessionExercises(shuffled);
	}, []);

	const checkAnswer = () => {
		const userAnswer =
			currentExercise.type === "fill"
				? userInput.trim().toLowerCase()
				: selectedAnswer;
		const correctAnswer = currentExercise.correctAnswer.toLowerCase();
		const correct = userAnswer === correctAnswer;

		setIsCorrect(correct);
		setShowExplanation(true);

		const newScore = {
			correct: correct ? score.correct + 1 : score.correct,
			total: score.total + 1,
		};
		setScore(newScore);
	};

	const nextExercise = () => {
		if (currentExerciseIndex < sessionExercises.length - 1) {
			setCurrentExerciseIndex(currentExerciseIndex + 1);
			setSelectedAnswer("");
			setUserInput("");
			setShowExplanation(false);
			setIsCorrect(false);
		} else {
			completeSession(score);
		}
	};
	const completeSession = async (finalScore: {
		correct: number;
		total: number;
	}) => {
		setIsComplete(true);
		const accuracy = (finalScore.correct / finalScore.total) * 100;
		const xpEarned = Math.round(40 + (accuracy / 100) * 35); // 40-75 XP based on accuracy

		try {
			await addXP(xpEarned);
			await updateStreak();

			// Update daily challenge progress (assuming the daily challenge is about completing practice activities)
			if (challenges.length > 0 && !challenges[0].completed) {
				await updateChallengeProgress(challenges[0].id, 1);
			}
		} catch (error) {
			console.error("Error updating progress:", error);
		}

		Alert.alert(
			"Grammar Drills Complete! 📝",
			`Excellent work! You got ${finalScore.correct} out of ${
				finalScore.total
			} correct.\n\nAccuracy: ${accuracy.toFixed(1)}%\nXP Earned: +${xpEarned}${
				challenges.length > 0 && !challenges[0].completed
					? "\n🎯 Daily Challenge Progress Updated!"
					: ""
			}`,
			[
				{ text: "Practice Again", onPress: () => restartSession() },
				{ text: "Back to Practice Arena", onPress: () => router.back() },
			]
		);
	};

	const restartSession = () => {
		const shuffled = [...grammarExercises]
			.sort(() => Math.random() - 0.5)
			.slice(0, 5);
		setSessionExercises(shuffled);
		setCurrentExerciseIndex(0);
		setSelectedAnswer("");
		setUserInput("");
		setScore({ correct: 0, total: 0 });
		setShowExplanation(false);
		setIsCorrect(false);
		setIsComplete(false);
	};

	const renderExercise = () => {
		if (!currentExercise) return null;

		switch (currentExercise.type) {
			case "conjugation":
				return (
					<View style={styles.exerciseContainer}>
						<Text style={[styles.exerciseTitle, { color: colors.text }]}>
							Verb Conjugation
						</Text>
						<View style={[styles.verbCard, { backgroundColor: colors.card }]}>
							<Text style={[styles.verbText, { color: colors.primary }]}>
								{currentExercise.verb}
							</Text>
							<Text style={[styles.verbEnglish, { color: colors.icon }]}>
								({currentExercise.english})
							</Text>
						</View>
						<Text style={[styles.questionText, { color: colors.text }]}>
							Conjugate with:{" "}
							<Text style={{ fontWeight: "bold" }}>
								{currentExercise.pronoun}
							</Text>
						</Text>
						<View style={styles.optionsContainer}>
							{currentExercise.options?.map((option) => (
								<TouchableOpacity
									key={option}
									style={[
										styles.optionButton,
										{
											backgroundColor:
												selectedAnswer === option
													? colors.primary
													: colors.card,
											borderColor: colors.border,
										},
									]}
									onPress={() => setSelectedAnswer(option)}
									disabled={showExplanation}
								>
									<Text
										style={[
											styles.optionText,
											{
												color:
													selectedAnswer === option ? "white" : colors.text,
											},
										]}
									>
										{currentExercise.pronoun} {option}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
				);

			case "sentence":
				return (
					<View style={styles.exerciseContainer}>
						<Text style={[styles.exerciseTitle, { color: colors.text }]}>
							Complete the Sentence
						</Text>
						<Text style={[styles.questionText, { color: colors.text }]}>
							{currentExercise.question}
						</Text>
						<View style={styles.optionsContainer}>
							{currentExercise.options?.map((option) => (
								<TouchableOpacity
									key={option}
									style={[
										styles.optionButton,
										{
											backgroundColor:
												selectedAnswer === option
													? colors.primary
													: colors.card,
											borderColor: colors.border,
										},
									]}
									onPress={() => setSelectedAnswer(option)}
									disabled={showExplanation}
								>
									<Text
										style={[
											styles.optionText,
											{
												color:
													selectedAnswer === option ? "white" : colors.text,
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

			case "fill":
				return (
					<View style={styles.exerciseContainer}>
						<Text style={[styles.exerciseTitle, { color: colors.text }]}>
							Fill in the Blank
						</Text>
						<Text style={[styles.sentenceText, { color: colors.text }]}>
							{currentExercise.sentence}
						</Text>
						<Text style={[styles.englishTranslation, { color: colors.icon }]}>
							{currentExercise.english}
						</Text>
						<TextInput
							style={[
								styles.fillInput,
								{
									backgroundColor: colors.card,
									color: colors.text,
									borderColor: colors.border,
								},
							]}
							value={userInput}
							onChangeText={setUserInput}
							placeholder="Enter your answer..."
							placeholderTextColor={colors.icon}
							editable={!showExplanation}
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>
				);

			default:
				return null;
		}
	};

	if (isComplete) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.completionContainer}>
					<Text style={[styles.completionTitle, { color: colors.text }]}>
						Grammar Mastery! 📝
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
					<View style={styles.progressContainer}>
						<Text style={[styles.progressText, { color: colors.text }]}>
							{currentExerciseIndex + 1} / {sessionExercises.length}
						</Text>
						<Text style={[styles.scoreText, { color: colors.primary }]}>
							Score: {score.correct}/{score.total}
						</Text>
					</View>
				</View>
				{/* Exercise Content */}
				{renderExercise()} {/* Explanation */}
				{showExplanation && (
					<View
						style={[
							styles.explanationContainer,
							{
								backgroundColor: isCorrect
									? colors.success + "20"
									: colors.secondary + "20",
							},
						]}
					>
						<Text
							style={[
								styles.explanationTitle,
								{ color: isCorrect ? colors.success : colors.secondary },
							]}
						>
							{isCorrect ? "✅ Correct!" : "❌ Incorrect"}
						</Text>
						<Text style={[styles.explanationText, { color: colors.text }]}>
							{currentExercise.explanation}
						</Text>
						<Text style={[styles.correctAnswerText, { color: colors.primary }]}>
							Correct answer: {currentExercise.correctAnswer}
						</Text>
					</View>
				)}
				{/* Action Button */}
				<View style={styles.actionContainer}>
					{!showExplanation ? (
						<TouchableOpacity
							style={[
								styles.checkButton,
								{
									backgroundColor:
										selectedAnswer || userInput.trim()
											? colors.primary
											: colors.border,
									opacity: selectedAnswer || userInput.trim() ? 1 : 0.5,
								},
							]}
							onPress={checkAnswer}
							disabled={!(selectedAnswer || userInput.trim())}
						>
							<Text style={styles.checkButtonText}>Check Answer</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={[styles.nextButton, { backgroundColor: colors.accent }]}
							onPress={nextExercise}
						>
							<Text style={styles.nextButtonText}>
								{currentExerciseIndex < sessionExercises.length - 1
									? "Next Exercise"
									: "Complete Session"}
							</Text>
						</TouchableOpacity>
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
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 30,
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
	exerciseContainer: {
		marginBottom: 30,
	},
	exerciseTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	verbCard: {
		padding: 20,
		borderRadius: 15,
		alignItems: "center",
		marginBottom: 20,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	verbText: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 5,
	},
	verbEnglish: {
		fontSize: 16,
		fontStyle: "italic",
	},
	questionText: {
		fontSize: 18,
		marginBottom: 20,
		textAlign: "center",
	},
	sentenceText: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	englishTranslation: {
		fontSize: 16,
		fontStyle: "italic",
		textAlign: "center",
		marginBottom: 20,
	},
	optionsContainer: {
		gap: 10,
	},
	optionButton: {
		padding: 15,
		borderRadius: 10,
		borderWidth: 1,
		alignItems: "center",
	},
	optionText: {
		fontSize: 16,
		fontWeight: "500",
	},
	fillInput: {
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		fontSize: 18,
		textAlign: "center",
		marginBottom: 20,
	},
	explanationContainer: {
		padding: 20,
		borderRadius: 15,
		marginBottom: 20,
	},
	explanationTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	explanationText: {
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 10,
	},
	correctAnswerText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	actionContainer: {
		marginTop: 20,
		marginBottom: 30,
	},
	checkButton: {
		paddingVertical: 15,
		borderRadius: 25,
		alignItems: "center",
	},
	checkButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	nextButton: {
		paddingVertical: 15,
		borderRadius: 25,
		alignItems: "center",
	},
	nextButtonText: {
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
