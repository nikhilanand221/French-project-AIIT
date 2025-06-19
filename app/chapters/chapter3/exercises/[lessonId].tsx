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
import { useColorScheme } from "../../../../hooks/useColorScheme";

interface Exercise {
	id: string;
	question: string;
	options: string[];
	correct: string;
	explanation?: string;
}

const exercises: Exercise[] = [
	{
		id: "partitive-1",
		question: "Je voudrais ___ pain, s'il vous plaît.",
		options: ["du", "de la", "des", "le"],
		correct: "du",
		explanation:
			"On utilise 'du' avec un nom masculin singulier (le pain → du pain)",
	},
	{
		id: "partitive-2",
		question: "Elle boit ___ eau minérale.",
		options: ["du", "de la", "des", "l'"],
		correct: "de la",
		explanation:
			"On utilise 'de la' avec un nom féminin singulier (la eau → de l'eau, mais ici c'est 'de la' eau minérale)",
	},
	{
		id: "food-vocab-1",
		question: "What is 'fromage' in English?",
		options: ["cheese", "bread", "meat", "fish"],
		correct: "cheese",
		explanation: "Le fromage = cheese",
	},
	{
		id: "restaurant-1",
		question: "Comment dit-on 'the menu' en français?",
		options: ["la carte", "le menu", "l'addition", "le serveur"],
		correct: "la carte",
		explanation:
			"En français, on dit 'la carte' pour 'the menu' dans un restaurant",
	},
	{
		id: "meals-1",
		question: "Quel est le repas du matin?",
		options: ["le déjeuner", "le dîner", "le petit-déjeuner", "le goûter"],
		correct: "le petit-déjeuner",
		explanation: "Le petit-déjeuner est le repas du matin (breakfast)",
	},
];

export default function ExercisesScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const router = useRouter();
	const { lessonId } = useLocalSearchParams();
	const { updateLessonProgress, addXP } = useProgress();

	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [showExplanation, setShowExplanation] = useState(false);
	const [score, setScore] = useState(0);
	const [answers, setAnswers] = useState<string[]>([]);
	const [showCelebration, setShowCelebration] = useState(false);

	const currentExercise = exercises[currentExerciseIndex];
	const progress = ((currentExerciseIndex + 1) / exercises.length) * 100;

	const handleAnswerSelect = (answer: string) => {
		if (showExplanation) return;
		setSelectedAnswer(answer);
	};

	const handleSubmit = () => {
		if (!selectedAnswer) return;

		const isCorrect = selectedAnswer === currentExercise.correct;
		if (isCorrect) {
			setScore(score + 1);
		}

		const newAnswers = [...answers, selectedAnswer];
		setAnswers(newAnswers);
		setShowExplanation(true);

		// Auto-advance after showing explanation
		setTimeout(() => {
			if (currentExerciseIndex < exercises.length - 1) {
				setCurrentExerciseIndex(currentExerciseIndex + 1);
				setSelectedAnswer(null);
				setShowExplanation(false);
			} else {
				handleExercisesComplete();
			}
		}, 2500);
	};

	const handleExercisesComplete = async () => {
		const finalScore = Math.round((score / exercises.length) * 100);
		const xpAmount = finalScore >= 80 ? 50 : finalScore >= 60 ? 40 : 30;

		// Update lesson progress
		await updateLessonProgress({
			lessonId: `exercises-${lessonId}`,
			chapterId: "chapter3",
			completed: true,
			score: finalScore,
			timeSpent: 0,
			attempts: 1,
		});

		// Add XP
		await addXP(xpAmount);

		// Show celebration
		setShowCelebration(true);
	};

	const isCorrectAnswer = (option: string) => {
		return showExplanation && option === currentExercise.correct;
	};

	const isWrongAnswer = (option: string) => {
		return (
			showExplanation &&
			selectedAnswer === option &&
			option !== currentExercise.correct
		);
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
						<Text style={[styles.title, { color: colors.text }]}>
							Exercices: Nourriture
						</Text>
						<Text style={[styles.subtitle, { color: colors.tabIconDefault }]}>
							Question {currentExerciseIndex + 1} / {exercises.length}
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

				{/* Exercise Card */}
				<View
					style={[
						styles.exerciseCard,
						{ backgroundColor: colors.card, borderColor: colors.border },
					]}
				>
					<Text style={[styles.questionText, { color: colors.text }]}>
						{currentExercise.question}
					</Text>

					<View style={styles.optionsContainer}>
						{currentExercise.options.map((option, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.optionButton,
									{
										backgroundColor:
											selectedAnswer === option
												? colors.primary
												: colors.background,
										borderColor: isCorrectAnswer(option)
											? "#4CAF50"
											: isWrongAnswer(option)
											? "#F44336"
											: selectedAnswer === option
											? colors.primary
											: colors.border,
										borderWidth: 2,
									},
								]}
								onPress={() => handleAnswerSelect(option)}
								disabled={showExplanation}
							>
								<Text
									style={[
										styles.optionText,
										{
											color: isCorrectAnswer(option)
												? "#4CAF50"
												: isWrongAnswer(option)
												? "#F44336"
												: selectedAnswer === option
												? "white"
												: colors.text,
											fontWeight:
												isCorrectAnswer(option) || isWrongAnswer(option)
													? "bold"
													: "normal",
										},
									]}
								>
									{option}
									{isCorrectAnswer(option) && " ✓"}
									{isWrongAnswer(option) && " ✗"}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					{/* Explanation */}
					{showExplanation && currentExercise.explanation && (
						<View
							style={[
								styles.explanationContainer,
								{
									backgroundColor: colors.background,
									borderColor: colors.border,
								},
							]}
						>
							<Text style={[styles.explanationTitle, { color: colors.text }]}>
								{selectedAnswer === currentExercise.correct
									? "Correct! 🎉"
									: "Pas tout à fait..."}
							</Text>
							<Text
								style={[
									styles.explanationText,
									{ color: colors.tabIconDefault },
								]}
							>
								{currentExercise.explanation}
							</Text>
						</View>
					)}
				</View>

				{/* Submit Button */}
				{!showExplanation && (
					<TouchableOpacity
						style={[
							styles.submitButton,
							{
								backgroundColor: selectedAnswer
									? colors.primary
									: colors.border,
								opacity: selectedAnswer ? 1 : 0.5,
							},
						]}
						onPress={handleSubmit}
						disabled={!selectedAnswer}
					>
						<Text style={styles.submitButtonText}>
							{currentExerciseIndex === exercises.length - 1
								? "Terminer"
								: "Valider"}
						</Text>
					</TouchableOpacity>
				)}

				{/* Score Display */}
				<View style={styles.scoreContainer}>
					<Text style={[styles.scoreText, { color: colors.text }]}>
						Score: {score} / {exercises.length}
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
				title="Exercices Terminés! 💪"
				message={`Score Final: ${Math.round(
					(score / exercises.length) * 100
				)}%`}
				type={score === exercises.length ? "perfect_score" : "lesson_complete"}
				xpEarned={score >= 4 ? 50 : score >= 3 ? 40 : 30}
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
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 4,
	},
	subtitle: {
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
	exerciseCard: {
		borderRadius: 16,
		borderWidth: 1,
		padding: 20,
		marginBottom: 20,
	},
	questionText: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 20,
		textAlign: "center",
		lineHeight: 28,
	},
	optionsContainer: {
		marginTop: 10,
	},
	optionButton: {
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
		borderWidth: 2,
	},
	optionText: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "500",
	},
	explanationContainer: {
		marginTop: 20,
		padding: 15,
		borderRadius: 10,
		borderWidth: 1,
	},
	explanationTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
	},
	explanationText: {
		fontSize: 14,
		lineHeight: 20,
	},
	submitButton: {
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: "center",
		marginBottom: 20,
	},
	submitButtonText: {
		fontSize: 18,
		fontWeight: "600",
		color: "white",
	},
	scoreContainer: {
		alignItems: "center",
	},
	scoreText: {
		fontSize: 18,
		fontWeight: "600",
	},
});
