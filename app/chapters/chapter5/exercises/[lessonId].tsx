import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
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
	type: "fill-blank" | "translation" | "multiple-choice" | "matching";
	question: string;
	options?: string[];
	correct: string;
	explanation?: string;
}

const exercises: Exercise[] = [
	{
		id: "1",
		type: "fill-blank",
		question: "Le weekend, j'aime _____ au cinéma.",
		correct: "aller",
		explanation: "On utilise l'infinitif 'aller' après 'aimer'",
	},
	{
		id: "2",
		type: "multiple-choice",
		question: "Qu'est-ce que tu fais le samedi?",
		options: ["Je joue au football", "Je mange du pain", "Je dors toujours"],
		correct: "Je joue au football",
		explanation: "Une activité typique du weekend",
	},
	{
		id: "3",
		type: "translation",
		question: "Translate: I play video games on Sunday",
		correct: "Je joue aux jeux vidéo le dimanche",
		explanation: "On joue 'aux' jeux vidéo (masculine plural)",
	},
	{
		id: "4",
		type: "fill-blank",
		question: "Elle _____ de la musique tous les soirs.",
		correct: "écoute",
		explanation: "Verbe 'écouter' conjugué à la 3ème personne du singulier",
	},
	{
		id: "5",
		type: "multiple-choice",
		question: "Où va-t-on pour voir un film?",
		options: ["Au restaurant", "Au cinéma", "À la plage"],
		correct: "Au cinéma",
		explanation: "Le cinéma est l'endroit pour regarder des films",
	},
];

export default function ExerciseScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const router = useRouter();
	const { lessonId } = useLocalSearchParams();
	const { updateLessonProgress, addXP } = useProgress();

	const [currentExercise, setCurrentExercise] = useState(0);
	const [userAnswer, setUserAnswer] = useState("");
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [showExplanation, setShowExplanation] = useState(false);
	const [exerciseCompleted, setExerciseCompleted] = useState(false);
	const [score, setScore] = useState(0);
	const [showCelebration, setShowCelebration] = useState(false);

	const exercise = exercises[currentExercise];
	const progress = ((currentExercise + 1) / exercises.length) * 100;

	useEffect(() => {
		// Reset state when exercise changes
		setUserAnswer("");
		setSelectedOption(null);
		setShowExplanation(false);
	}, [currentExercise]);

	const handleSubmitAnswer = async () => {
		let isCorrect = false;

		if (exercise.type === "multiple-choice") {
			isCorrect = selectedOption === exercise.correct;
		} else {
			isCorrect =
				userAnswer.toLowerCase().trim() ===
				exercise.correct.toLowerCase().trim();
		}

		if (isCorrect) {
			setScore(score + 1);
		}

		setShowExplanation(true);

		// Auto-advance after showing explanation
		setTimeout(() => {
			if (currentExercise < exercises.length - 1) {
				setCurrentExercise(currentExercise + 1);
			} else {
				handleExerciseComplete();
			}
		}, 2500);
	};

	const handleExerciseComplete = async () => {
		const finalScore = Math.round((score / exercises.length) * 100);
		const xpEarned = finalScore >= 80 ? 40 : finalScore >= 60 ? 30 : 20;

		// Update lesson progress
		await updateLessonProgress({
			lessonId: `exercises-${lessonId}`,
			chapterId: "chapter5",
			completed: true,
			score: finalScore,
			timeSpent: 0,
			attempts: 1,
		});

		// Add XP
		await addXP(xpEarned);

		setExerciseCompleted(true);
		setShowCelebration(true);
	};

	const resetExercise = () => {
		setCurrentExercise(0);
		setUserAnswer("");
		setSelectedOption(null);
		setShowExplanation(false);
		setExerciseCompleted(false);
		setScore(0);
		setShowCelebration(false);
	};

	if (exerciseCompleted) {
		const percentage = Math.round((score / exercises.length) * 100);
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.completionContainer}>
					<Text style={[styles.completionTitle, { color: colors.text }]}>
						🎉 Exercices Terminés!
					</Text>
					<Text style={[styles.completionScore, { color: colors.text }]}>
						Score: {score}/{exercises.length} ({percentage}%)
					</Text>
					<Text style={[styles.completionMessage, { color: colors.text }]}>
						{percentage >= 80
							? "Excellent travail! Vous maîtrisez bien les activités du weekend."
							: percentage >= 60
							? "Bon travail! Continuez à pratiquer."
							: "Continuez à étudier et réessayez!"}
					</Text>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.primaryButton]}
							onPress={resetExercise}
						>
							<Text style={styles.buttonText}>Recommencer</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.secondaryButton]}
							onPress={() => router.back()}
						>
							<Text style={[styles.buttonText, { color: colors.text }]}>
								Retour
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<CelebrationModal
					visible={showCelebration}
					onClose={() => setShowCelebration(false)}
					title="Exercices Terminés!"
					message={`Vous avez réussi ${score} exercices sur ${exercises.length}!`}
					type="lesson_complete"
				/>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView style={styles.content}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={[styles.title, { color: colors.text }]}>
						Exercices - Chapitre 5
					</Text>
					<Text style={[styles.subtitle, { color: colors.text }]}>
						Weekend Fun Activities
					</Text>
				</View>

				{/* Progress */}
				<View style={styles.progressContainer}>
					<Text style={[styles.progressText, { color: colors.text }]}>
						Exercice {currentExercise + 1} sur {exercises.length}
					</Text>
					<View style={styles.progressBar}>
						<View style={[styles.progressFill, { width: `${progress}%` }]} />
					</View>
				</View>

				{/* Exercise */}
				<View
					style={[styles.exerciseContainer, { backgroundColor: colors.card }]}
				>
					<Text style={[styles.exerciseType, { color: colors.text }]}>
						{exercise.type === "fill-blank" && "Complétez la phrase"}
						{exercise.type === "translation" && "Traduction"}
						{exercise.type === "multiple-choice" && "Choix multiple"}
					</Text>

					<Text style={[styles.questionText, { color: colors.text }]}>
						{exercise.question}
					</Text>

					{/* Answer Input */}
					{exercise.type !== "multiple-choice" && (
						<TextInput
							style={[
								styles.textInput,
								{
									backgroundColor: colors.background,
									color: colors.text,
									borderColor: colors.text + "30",
								},
							]}
							value={userAnswer}
							onChangeText={setUserAnswer}
							placeholder="Votre réponse..."
							placeholderTextColor={colors.text + "60"}
							multiline={exercise.type === "translation"}
							numberOfLines={exercise.type === "translation" ? 3 : 1}
						/>
					)}

					{/* Multiple Choice Options */}
					{exercise.type === "multiple-choice" && exercise.options && (
						<View style={styles.optionsContainer}>
							{exercise.options.map((option, index) => (
								<TouchableOpacity
									key={index}
									style={[
										styles.optionButton,
										{ backgroundColor: colors.background },
										selectedOption === option && styles.selectedOption,
									]}
									onPress={() => setSelectedOption(option)}
								>
									<Text
										style={[
											styles.optionText,
											{ color: colors.text },
											selectedOption === option && styles.selectedOptionText,
										]}
									>
										{option}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					)}

					{/* Submit Button */}
					<TouchableOpacity
						style={[
							styles.submitButton,
							!userAnswer && !selectedOption && styles.disabledButton,
						]}
						onPress={handleSubmitAnswer}
						disabled={!userAnswer && !selectedOption}
					>
						<Text style={styles.submitButtonText}>Vérifier</Text>
					</TouchableOpacity>

					{/* Explanation */}
					{showExplanation && (
						<View
							style={[
								styles.explanationContainer,
								{ backgroundColor: colors.background },
							]}
						>
							<Text style={[styles.explanationTitle, { color: colors.text }]}>
								{(exercise.type === "multiple-choice"
									? selectedOption
									: userAnswer.toLowerCase().trim()) ===
								exercise.correct.toLowerCase().trim()
									? "✅ Correct!"
									: "❌ Incorrect"}
							</Text>
							<Text style={[styles.correctAnswer, { color: colors.text }]}>
								Réponse correcte: {exercise.correct}
							</Text>
							{exercise.explanation && (
								<Text style={[styles.explanation, { color: colors.text }]}>
									{exercise.explanation}
								</Text>
							)}
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
	content: {
		flex: 1,
		padding: 20,
	},
	header: {
		marginBottom: 20,
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
		opacity: 0.7,
	},
	progressContainer: {
		marginBottom: 20,
	},
	progressText: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		textAlign: "center",
	},
	progressBar: {
		height: 8,
		backgroundColor: "#e0e0e0",
		borderRadius: 4,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		backgroundColor: "#007AFF",
		borderRadius: 4,
	},
	exerciseContainer: {
		padding: 20,
		borderRadius: 12,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	exerciseType: {
		fontSize: 14,
		fontWeight: "600",
		opacity: 0.7,
		marginBottom: 12,
		textAlign: "center",
	},
	questionText: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 20,
		textAlign: "center",
	},
	textInput: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 15,
		fontSize: 16,
		marginBottom: 20,
		minHeight: 50,
		textAlignVertical: "top",
	},
	optionsContainer: {
		marginBottom: 20,
	},
	optionButton: {
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	selectedOption: {
		backgroundColor: "#007AFF",
		borderColor: "#007AFF",
	},
	optionText: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "500",
	},
	selectedOptionText: {
		color: "white",
	},
	submitButton: {
		backgroundColor: "#007AFF",
		paddingVertical: 15,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 20,
	},
	disabledButton: {
		backgroundColor: "#ccc",
	},
	submitButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	explanationContainer: {
		padding: 15,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	explanationTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	correctAnswer: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
	},
	explanation: {
		fontSize: 14,
		opacity: 0.8,
	},
	completionContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	completionTitle: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	completionScore: {
		fontSize: 24,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 10,
	},
	completionMessage: {
		fontSize: 18,
		textAlign: "center",
		marginBottom: 40,
		opacity: 0.8,
	},
	buttonContainer: {
		flexDirection: "row",
		gap: 15,
	},
	button: {
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 12,
		minWidth: 120,
		alignItems: "center",
	},
	primaryButton: {
		backgroundColor: "#007AFF",
	},
	secondaryButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#007AFF",
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "600",
		color: "white",
	},
});
