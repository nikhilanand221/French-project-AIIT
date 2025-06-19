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

const menuMatchingGame: GameQuestion[] = [
	{
		question: "What would you order for 'le petit-déjeuner'?",
		options: ["Pain et café", "Poisson et légumes", "Vin et fromage"],
		correct: "Pain et café",
	},
	{
		question: "Que boit-on généralement avec le fromage?",
		options: ["Le café", "Le vin", "Le jus"],
		correct: "Le vin",
	},
	{
		question: "Quel est l'ingrédient principal d'une salade?",
		options: ["La viande", "Les légumes", "Le pain"],
		correct: "Les légumes",
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

	const totalRounds = menuMatchingGame.length;
	const progress = (currentRound / totalRounds) * 100;
	const currentQuestion = menuMatchingGame[currentRound - 1];

	const handleAnswerSelect = (answer: string) => {
		setSelectedAnswer(answer);
	};

	const handleSubmitAnswer = () => {
		if (!selectedAnswer) return;

		// Check if answer is correct
		const isCorrect = selectedAnswer === currentQuestion.correct;
		if (isCorrect) {
			setScore(score + 1);
		}

		if (currentRound < totalRounds) {
			setTimeout(() => {
				setCurrentRound(currentRound + 1);
				setSelectedAnswer(null);
			}, 1000);
		} else {
			handleGameComplete();
		}
	};

	const handleGameComplete = async () => {
		setGameCompleted(true);
		const finalScore = Math.round((score / totalRounds) * 100);
		const isPerfect = score === totalRounds;

		// Calculate XP based on performance
		const xpAmount = isPerfect ? 50 : finalScore >= 70 ? 40 : 30;

		// Update lesson progress
		await updateLessonProgress({
			lessonId: `games-${lessonId}`,
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

	if (!currentQuestion) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.errorContainer}>
					<Text style={[styles.errorText, { color: colors.text }]}>
						Jeu non trouvé!
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
							← Retour
						</Text>
					</TouchableOpacity>

					<View style={styles.headerInfo}>
						<Text style={[styles.gameTitle, { color: colors.text }]}>
							Jeu du Menu
						</Text>
						<Text
							style={[styles.gameSubtitle, { color: colors.tabIconDefault }]}
						>
							Jeu • Manche {currentRound} sur {totalRounds}
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

				{/* Game Question */}
				<View
					style={[
						styles.questionCard,
						{ backgroundColor: colors.card, borderColor: colors.border },
					]}
				>
					<Text style={[styles.questionText, { color: colors.text }]}>
						{currentQuestion.question}
					</Text>

					<View style={styles.optionsContainer}>
						{currentQuestion.options.map((option, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.optionButton,
									{
										backgroundColor:
											selectedAnswer === option
												? colors.primary
												: colors.background,
										borderColor:
											selectedAnswer === option
												? colors.primary
												: colors.border,
									},
								]}
								onPress={() => handleAnswerSelect(option)}
								disabled={gameCompleted}
							>
								<Text
									style={[
										styles.optionText,
										{
											color: selectedAnswer === option ? "white" : colors.text,
										},
									]}
								>
									{option}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				{/* Submit Button */}
				<TouchableOpacity
					style={[
						styles.submitButton,
						{
							backgroundColor: selectedAnswer ? colors.primary : colors.border,
							opacity: selectedAnswer ? 1 : 0.5,
						},
					]}
					onPress={handleSubmitAnswer}
					disabled={!selectedAnswer || gameCompleted}
				>
					<Text style={styles.submitButtonText}>
						{currentRound === totalRounds ? "Terminer le Jeu" : "Valider"}
					</Text>
				</TouchableOpacity>

				{/* Game Progress */}
				<View style={styles.progressInfo}>
					<Text style={[styles.progressText, { color: colors.tabIconDefault }]}>
						Score: {score} / {totalRounds} • Progression: {currentRound}/
						{totalRounds}
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
				title="Jeu Terminé! 🎮"
				message={`Score Final: ${Math.round((score / totalRounds) * 100)}%`}
				type="lesson_complete"
				xpEarned={score === totalRounds ? 50 : 40}
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
		paddingHorizontal: 20,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		paddingTop: 20,
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
	gameTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 4,
	},
	gameSubtitle: {
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
	questionCard: {
		borderRadius: 16,
		borderWidth: 1,
		padding: 24,
		marginBottom: 25,
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
	progressInfo: {
		alignItems: "center",
	},
	progressText: {
		fontSize: 16,
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
