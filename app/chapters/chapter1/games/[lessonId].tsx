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
import { CelebrationModal } from "../../../../components/CelebrationModal";
import { Colors } from "../../../../constants/Colors";
import { useProgress } from "../../../../contexts/ProgressContext";
import { chapter1Data } from "../../../../data/chapter1/content";
import { useColorScheme } from "../../../../hooks/useColorScheme";

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

	// Get the game data
	const gameIndex = parseInt(lessonId as string) - 1;
	const game = chapter1Data.games[gameIndex];

	useEffect(() => {
		if (!game) {
			Alert.alert("Error", "Game not found!", [
				{ text: "Go Back", onPress: () => router.back() },
			]);
		}
	}, [game, router]);

	if (!game) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.errorContainer}>
					<Text style={[styles.errorText, { color: colors.text }]}>
						Game not found!
					</Text>
				</View>
			</SafeAreaView>
		);
	}

	const totalRounds = 3;
	const progress = (currentRound / totalRounds) * 100;

	const handleAnswerSelect = (answer: string) => {
		setSelectedAnswer(answer);
	};

	const handleSubmitAnswer = () => {
		if (!selectedAnswer) {
			Alert.alert(
				"Please select an answer",
				"Choose one of the options before continuing."
			);
			return;
		}

		// Simple scoring logic - all answers are correct for now
		setScore(score + 10);

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
		const finalScore = score + 10; // Add points for last answer
		const isPerfect = finalScore === 30;

		// Calculate XP based on performance
		const xpAmount = isPerfect ? 50 : 40;

		// Update lesson progress
		await updateLessonProgress({
			lessonId: `games-${lessonId}`,
			chapterId: "chapter1",
			completed: true,
			score: finalScore,
			timeSpent: 0, // Could track actual time spent
			attempts: 1,
		});

		// Add XP
		await addXP(xpAmount);

		// Show celebration
		setShowCelebration(true);
	};

	const getCurrentScenario = () => {
		const scenarios = [
			{
				question: "What's the appropriate greeting for morning?",
				options: ["Bonjour", "Bonsoir", "Salut"],
			},
			{
				question: "How do you say 'Thank you' in French?",
				options: ["Merci", "S'il vous plaît", "De rien"],
			},
			{
				question: "What's a polite way to say 'Excuse me'?",
				options: ["Excusez-moi", "Salut", "Au revoir"],
			},
		];
		return scenarios[currentRound - 1];
	};

	const currentScenario = getCurrentScenario();

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

					<View style={styles.headerInfo}>
						<Text style={[styles.gameTitle, { color: colors.text }]}>
							{game.title}
						</Text>
						<Text style={[styles.gameSubtitle, { color: colors.icon }]}>
							Game • Round {currentRound} of {totalRounds}
						</Text>
					</View>
				</View>
				{/* Progress Bar */}
				<View
					style={[styles.progressContainer, { backgroundColor: colors.border }]}
				>
					<View
						style={[
							styles.progressFill,
							{ backgroundColor: colors.primary, width: `${progress}%` },
						]}
					/>
				</View>
				{/* Score Display */}
				<View style={[styles.scoreCard, { backgroundColor: colors.card }]}>
					<Text style={[styles.scoreLabel, { color: colors.icon }]}>
						Current Score
					</Text>
					<Text style={[styles.scoreValue, { color: colors.primary }]}>
						{score} points
					</Text>
				</View>
				{/* Game Description */}
				<Text style={[styles.description, { color: colors.icon }]}>
					{game.description}
				</Text>
				{/* Game Content */}
				<View style={[styles.gameCard, { backgroundColor: colors.card }]}>
					<Text style={[styles.questionText, { color: colors.text }]}>
						{currentScenario.question}
					</Text>

					<View style={styles.optionsContainer}>
						{currentScenario.options.map((option, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.optionButton,
									{
										backgroundColor:
											selectedAnswer === option
												? colors.accent
												: colors.background,
										borderColor: colors.border,
									},
								]}
								onPress={() => handleAnswerSelect(option)}
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
						{currentRound === totalRounds ? "Finish Game" : "Submit Answer"}
					</Text>
				</TouchableOpacity>{" "}
				{/* Game Progress */}
				<View style={styles.progressInfo}>
					<Text style={[styles.progressText, { color: colors.icon }]}>
						Progress: {currentRound}/{totalRounds} rounds completed
					</Text>
				</View>
			</ScrollView>{" "}
			{/* Celebration Modal */}
			<CelebrationModal
				visible={showCelebration}
				onClose={() => {
					setShowCelebration(false);
					router.back();
				}}
				title="Jeu Terminé! 🎮"
				message={`Score Final: ${score + 10}/30 points!`}
				type="lesson_complete"
				xpEarned={score === 20 ? 50 : 40}
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
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontSize: 18,
		textAlign: "center",
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
		marginBottom: 20,
	},
	progressFill: {
		height: "100%",
		borderRadius: 4,
	},
	scoreCard: {
		padding: 20,
		borderRadius: 15,
		marginBottom: 20,
		alignItems: "center",
	},
	scoreLabel: {
		fontSize: 16,
		marginBottom: 5,
	},
	scoreValue: {
		fontSize: 28,
		fontWeight: "bold",
	},
	description: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: "center",
		lineHeight: 24,
	},
	gameCard: {
		padding: 25,
		borderRadius: 15,
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
});
