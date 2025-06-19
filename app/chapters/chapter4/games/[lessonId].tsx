import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
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

interface GameQuestion {
	question: string;
	options: string[];
	correct: string;
}

const professionMatchingGame: GameQuestion[] = [
	{
		question: "Qui travaille dans un hôpital?",
		options: ["Le médecin", "Le comptable", "L'artiste"],
		correct: "Le médecin",
	},
	{
		question: "Qui enseigne aux étudiants?",
		options: ["Le chef", "Le professeur", "Le vendeur"],
		correct: "Le professeur",
	},
	{
		question: "Qui prepare la nourriture dans un restaurant?",
		options: ["L'avocat", "Le chef", "Le journaliste"],
		correct: "Le chef",
	},
	{
		question: "Qui défend les clients au tribunal?",
		options: ["L'avocat", "L'ingénieur", "Le comptable"],
		correct: "L'avocat",
	},
	{
		question: "Qui écrit pour les journaux?",
		options: ["Le médecin", "Le journaliste", "Le vendeur"],
		correct: "Le journaliste",
	},
];

const nationalityGame: GameQuestion[] = [
	{
		question: "Je viens de France. Je suis...",
		options: ["français", "anglais", "allemand"],
		correct: "français",
	},
	{
		question: "Elle habite au Canada. Elle est...",
		options: ["américaine", "canadienne", "espagnole"],
		correct: "canadienne",
	},
	{
		question: "Il vient d'Allemagne. Il est...",
		options: ["italien", "français", "allemand"],
		correct: "allemand",
	},
	{
		question: "Nous habitons en Espagne. Nous sommes...",
		options: ["espagnols", "anglais", "américains"],
		correct: "espagnols",
	},
];

const verbConjugationGame: GameQuestion[] = [
	{
		question: "Je _____ français tous les jours.",
		options: ["parle", "parles", "parlons"],
		correct: "parle",
	},
	{
		question: "Tu _____ dans un bureau.",
		options: ["travaille", "travailles", "travaillent"],
		correct: "travailles",
	},
	{
		question: "Nous _____ des livres.",
		options: ["lisons", "lis", "lit"],
		correct: "lisons",
	},
	{
		question: "Elle _____ médecin.",
		options: ["est", "es", "sommes"],
		correct: "est",
	},
	{
		question: "Ils _____ une grande maison.",
		options: ["as", "ont", "avons"],
		correct: "ont",
	},
];

export default function GameScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const router = useRouter();
	const { lessonId } = useLocalSearchParams();
	const { updateLessonProgress, addXP } = useProgress();

	const [currentRound, setCurrentRound] = useState(1);
	const [score, setScore] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [gameCompleted, setGameCompleted] = useState(false);
	const [showCelebration, setShowCelebration] = useState(false);
	const [gameType, setGameType] = useState<
		"professions" | "nationalities" | "verbs"
	>("professions");

	const getCurrentGame = () => {
		switch (gameType) {
			case "professions":
				return professionMatchingGame;
			case "nationalities":
				return nationalityGame;
			case "verbs":
				return verbConjugationGame;
			default:
				return professionMatchingGame;
		}
	};

	const currentGame = getCurrentGame();
	const currentQuestion = currentGame[currentRound - 1];
	const maxRounds = currentGame.length;

	const handleAnswerPress = (answer: string) => {
		setSelectedAnswer(answer);
	};

	const handleNextRound = async () => {
		if (!selectedAnswer) return;

		const isCorrect = selectedAnswer === currentQuestion.correct;
		if (isCorrect) {
			setScore(score + 1);
		}

		if (currentRound < maxRounds) {
			setCurrentRound(currentRound + 1);
			setSelectedAnswer(null);
		} else {
			// Game completed
			const finalScore = score + (isCorrect ? 1 : 0);
			const scorePercentage = Math.round((finalScore / maxRounds) * 100);
			const xpEarned =
				scorePercentage >= 80 ? 50 : scorePercentage >= 60 ? 40 : 30;

			// Update lesson progress
			await updateLessonProgress({
				lessonId: `games-${lessonId}`,
				chapterId: "chapter4",
				completed: true,
				score: scorePercentage,
				timeSpent: 0,
				attempts: 1,
			});

			// Add XP
			await addXP(xpEarned);

			setGameCompleted(true);
			setShowCelebration(true);
		}
	};

	const restartGame = () => {
		setCurrentRound(1);
		setScore(0);
		setSelectedAnswer(null);
		setGameCompleted(false);
		setShowCelebration(false);
	};

	const switchGameType = (type: "professions" | "nationalities" | "verbs") => {
		setGameType(type);
		restartGame();
	};

	const getGameTitle = () => {
		switch (gameType) {
			case "professions":
				return "Jeu des Professions";
			case "nationalities":
				return "Jeu des Nationalités";
			case "verbs":
				return "Conjugaison des Verbes";
			default:
				return "Jeu des Professions";
		}
	};

	const getGameDescription = () => {
		switch (gameType) {
			case "professions":
				return "Associez les professions aux bonnes descriptions";
			case "nationalities":
				return "Complétez avec la bonne nationalité";
			case "verbs":
				return "Conjuguez les verbes correctement";
			default:
				return "Associez les professions aux bonnes descriptions";
		}
	};

	if (gameCompleted) {
		const percentage = Math.round((score / maxRounds) * 100);
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.completionContainer}>
					<Text style={[styles.completionTitle, { color: colors.text }]}>
						🎉 Jeu Terminé!
					</Text>
					<Text style={[styles.completionScore, { color: colors.text }]}>
						Score: {score}/{maxRounds} ({percentage}%)
					</Text>
					<Text style={[styles.completionMessage, { color: colors.text }]}>
						{percentage >= 80
							? "Excellent travail! Vous maîtrisez bien ce chapitre."
							: percentage >= 60
							? "Bon travail! Continuez à pratiquer."
							: "Continuez à étudier et réessayez!"}
					</Text>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.primaryButton]}
							onPress={restartGame}
						>
							<Text style={styles.buttonText}>Rejouer</Text>
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
					title="Jeu Terminé!"
					message={`Vous avez obtenu ${score}/${maxRounds} bonnes réponses!`}
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
						{getGameTitle()}
					</Text>
					<Text style={[styles.subtitle, { color: colors.text }]}>
						{getGameDescription()}
					</Text>
				</View>

				{/* Game Type Selector */}
				<View style={styles.gameTypeSelector}>
					<TouchableOpacity
						style={[
							styles.gameTypeButton,
							gameType === "professions" && styles.activeGameType,
						]}
						onPress={() => switchGameType("professions")}
					>
						<Text
							style={[
								styles.gameTypeText,
								gameType === "professions" && styles.activeGameTypeText,
							]}
						>
							Professions
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.gameTypeButton,
							gameType === "nationalities" && styles.activeGameType,
						]}
						onPress={() => switchGameType("nationalities")}
					>
						<Text
							style={[
								styles.gameTypeText,
								gameType === "nationalities" && styles.activeGameTypeText,
							]}
						>
							Nationalités
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.gameTypeButton,
							gameType === "verbs" && styles.activeGameType,
						]}
						onPress={() => switchGameType("verbs")}
					>
						<Text
							style={[
								styles.gameTypeText,
								gameType === "verbs" && styles.activeGameTypeText,
							]}
						>
							Verbes
						</Text>
					</TouchableOpacity>
				</View>

				{/* Progress */}
				<View style={styles.progressContainer}>
					<Text style={[styles.progressText, { color: colors.text }]}>
						Question {currentRound} sur {maxRounds}
					</Text>
					<Text style={[styles.scoreText, { color: colors.text }]}>
						Score: {score}/{currentRound - 1}
					</Text>
				</View>

				{/* Question */}
				<View
					style={[styles.questionContainer, { backgroundColor: colors.card }]}
				>
					<Text style={[styles.questionText, { color: colors.text }]}>
						{currentQuestion.question}
					</Text>
				</View>

				{/* Answer Options */}
				<View style={styles.optionsContainer}>
					{currentQuestion.options.map((option, index) => (
						<TouchableOpacity
							key={index}
							style={[
								styles.optionButton,
								{ backgroundColor: colors.card },
								selectedAnswer === option && styles.selectedOption,
							]}
							onPress={() => handleAnswerPress(option)}
						>
							<Text
								style={[
									styles.optionText,
									{ color: colors.text },
									selectedAnswer === option && styles.selectedOptionText,
								]}
							>
								{option}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				{/* Next Button */}
				<TouchableOpacity
					style={[styles.nextButton, !selectedAnswer && styles.disabledButton]}
					onPress={handleNextRound}
					disabled={!selectedAnswer}
				>
					<Text style={styles.nextButtonText}>
						{currentRound < maxRounds ? "Suivant" : "Terminer"}
					</Text>
				</TouchableOpacity>
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
	gameTypeSelector: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 20,
		backgroundColor: "#f0f0f0",
		borderRadius: 20,
		padding: 4,
	},
	gameTypeButton: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 16,
		alignItems: "center",
	},
	activeGameType: {
		backgroundColor: "#007AFF",
	},
	gameTypeText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#666",
	},
	activeGameTypeText: {
		color: "white",
	},
	progressContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	progressText: {
		fontSize: 16,
		fontWeight: "600",
	},
	scoreText: {
		fontSize: 16,
		fontWeight: "600",
	},
	questionContainer: {
		padding: 20,
		borderRadius: 12,
		marginBottom: 20,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	questionText: {
		fontSize: 18,
		fontWeight: "600",
		textAlign: "center",
	},
	optionsContainer: {
		marginBottom: 30,
	},
	optionButton: {
		padding: 15,
		borderRadius: 12,
		marginBottom: 12,
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	selectedOption: {
		backgroundColor: "#007AFF",
	},
	optionText: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "500",
	},
	selectedOptionText: {
		color: "white",
	},
	nextButton: {
		backgroundColor: "#007AFF",
		paddingVertical: 15,
		borderRadius: 12,
		alignItems: "center",
		marginBottom: 20,
	},
	disabledButton: {
		backgroundColor: "#ccc",
	},
	nextButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "600",
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
