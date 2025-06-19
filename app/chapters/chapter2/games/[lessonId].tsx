import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../constants/Colors";
import { chapter2Data } from "../../../../data/chapter2/content";
import { useColorScheme } from "../../../../hooks/useColorScheme";

export default function GamesLesson() {
	const { lessonId } = useLocalSearchParams();
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	// Get the lesson data based on lessonId - will be used for future expansion
	console.log("Game lesson for:", lessonId);

	const [score, setScore] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [showResult, setShowResult] = useState(false);
	const [timeLeft, setTimeLeft] = useState(60);
	// Sample game data for family matching
	const matchingPairs = React.useMemo(
		() => [
			{ french: "la mère", english: "mother" },
			{ french: "le père", english: "father" },
			{ french: "la sœur", english: "sister" },
			{ french: "le frère", english: "brother" },
			{ french: "la tante", english: "aunt" },
			{ french: "l'oncle", english: "uncle" },
		],
		[]
	);

	const [currentPair, setCurrentPair] = useState(0);
	const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

	React.useEffect(() => {
		if (gameStarted && currentPair < matchingPairs.length) {
			// Create shuffled options for current pair
			const correctAnswer = matchingPairs[currentPair].english;
			const otherOptions = matchingPairs
				.filter((_, index) => index !== currentPair)
				.map((pair) => pair.english)
				.slice(0, 3);

			const allOptions = [correctAnswer, ...otherOptions];
			setShuffledOptions(allOptions.sort(() => Math.random() - 0.5));
		}
	}, [gameStarted, currentPair, matchingPairs]);
	// Timer effect
	React.useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		if (gameStarted && timeLeft > 0 && currentPair < matchingPairs.length) {
			interval = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						setGameStarted(false);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [gameStarted, timeLeft, currentPair, matchingPairs.length]);

	const startGame = () => {
		setGameStarted(true);
		setScore(0);
		setCurrentPair(0);
		setSelectedAnswer(null);
		setTimeLeft(60);
		setShowResult(false);
		setTimeLeft(60);
	};

	const handleAnswer = (answer: string) => {
		setSelectedAnswer(answer);
		const isCorrect = answer === matchingPairs[currentPair].english;

		if (isCorrect) {
			setScore(score + 1);
		}

		setShowResult(true);

		// Auto-advance after 2 seconds
		setTimeout(() => {
			if (currentPair < matchingPairs.length - 1) {
				setCurrentPair(currentPair + 1);
				setSelectedAnswer(null);
				setShowResult(false);
			} else {
				finishGame();
			}
		}, 2000);
	};

	const finishGame = () => {
		const percentage = Math.round((score / matchingPairs.length) * 100);
		Alert.alert(
			"Jeu Terminé!",
			`Votre score: ${score}/${
				matchingPairs.length
			} (${percentage}%)\n\nXP gagné: ${score * 5}`,
			[
				{
					text: "Rejouer",
					onPress: startGame,
				},
				{
					text: "Continuer",
					onPress: () => router.back(),
				},
			]
		);
	};

	const games = chapter2Data.games;
	const game = games[0]; // Family Tree Builder

	if (!gameStarted) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<ScrollView style={styles.scrollView}>
					<View style={styles.gameIntro}>
						<Text style={[styles.gameTitle, { color: colors.text }]}>
							🎮 {game.title}
						</Text>
						<Text style={[styles.gameDescription, { color: colors.secondary }]}>
							{game.description}
						</Text>

						<View style={[styles.gameStats, { backgroundColor: colors.card }]}>
							<View style={styles.statItem}>
								<Text style={[styles.statValue, { color: "#E91E63" }]}>
									{game.estimatedTime} min
								</Text>
								<Text style={[styles.statLabel, { color: colors.secondary }]}>
									Durée
								</Text>
							</View>
							<View style={styles.statItem}>
								<Text style={[styles.statValue, { color: "#4CAF50" }]}>
									{game.xpReward} XP
								</Text>
								<Text style={[styles.statLabel, { color: colors.secondary }]}>
									Récompense
								</Text>
							</View>
							<View style={styles.statItem}>
								<Text style={[styles.statValue, { color: "#FF9800" }]}>
									{game.difficulty}
								</Text>
								<Text style={[styles.statLabel, { color: colors.secondary }]}>
									Difficulté
								</Text>
							</View>
						</View>

						<View style={styles.gameRules}>
							<Text style={[styles.rulesTitle, { color: colors.text }]}>
								📋 Comment jouer:
							</Text>
							<Text style={[styles.ruleText, { color: colors.secondary }]}>
								• Associez les mots français avec leur traduction anglaise
							</Text>
							<Text style={[styles.ruleText, { color: colors.secondary }]}>
								• Répondez rapidement pour gagner plus de points
							</Text>
							<Text style={[styles.ruleText, { color: colors.secondary }]}>
								• Complétez toutes les paires pour terminer le jeu
							</Text>
						</View>

						<TouchableOpacity
							style={[styles.startButton, { backgroundColor: "#E91E63" }]}
							onPress={startGame}
						>
							<Text style={styles.startButtonText}>🚀 Commencer le Jeu</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.gameContainer}>
				{/* Game Header */}
				<View style={styles.gameHeader}>
					<Text style={[styles.gameProgress, { color: colors.text }]}>
						{currentPair + 1} / {matchingPairs.length}
					</Text>
					<Text style={[styles.gameScore, { color: colors.secondary }]}>
						Score: {score}
					</Text>
				</View>

				{/* Current Word */}
				<View style={[styles.wordCard, { backgroundColor: colors.card }]}>
					<Text style={[styles.frenchWord, { color: colors.text }]}>
						{matchingPairs[currentPair].french}
					</Text>
					<Text style={[styles.instruction, { color: colors.secondary }]}>
						Choisissez la traduction correcte:
					</Text>
				</View>

				{/* Answer Options */}
				<View style={styles.optionsContainer}>
					{shuffledOptions.map((option, index) => {
						let optionStyle = styles.option;
						let optionTextStyle = styles.optionText;
						let backgroundColor = colors.card;
						let textColor = colors.text;

						if (showResult && selectedAnswer === option) {
							if (option === matchingPairs[currentPair].english) {
								backgroundColor = "#4CAF50";
								textColor = "white";
							} else {
								backgroundColor = "#F44336";
								textColor = "white";
							}
						}

						return (
							<TouchableOpacity
								key={index}
								style={[
									optionStyle,
									{
										backgroundColor,
										borderColor: colors.border,
									},
								]}
								onPress={() => handleAnswer(option)}
								disabled={showResult}
							>
								<Text style={[optionTextStyle, { color: textColor }]}>
									{option}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				{/* Result Feedback */}
				{showResult && (
					<View
						style={[
							styles.resultContainer,
							{
								backgroundColor:
									selectedAnswer === matchingPairs[currentPair].english
										? "#4CAF50"
										: "#F44336",
							},
						]}
					>
						<Text style={styles.resultText}>
							{selectedAnswer === matchingPairs[currentPair].english
								? "✅ Correct!"
								: `❌ Incorrect. La bonne réponse est: ${matchingPairs[currentPair].english}`}
						</Text>
					</View>
				)}
			</View>
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
	gameIntro: {
		alignItems: "center",
	},
	gameTitle: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	gameDescription: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 24,
		lineHeight: 22,
	},
	gameStats: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		padding: 20,
		borderRadius: 12,
		marginBottom: 24,
	},
	statItem: {
		alignItems: "center",
	},
	statValue: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 12,
		textAlign: "center",
	},
	gameRules: {
		width: "100%",
		marginBottom: 32,
	},
	rulesTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 12,
	},
	ruleText: {
		fontSize: 14,
		marginBottom: 8,
		lineHeight: 20,
	},
	startButton: {
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 8,
	},
	startButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	gameContainer: {
		flex: 1,
		padding: 16,
	},
	gameHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 24,
	},
	gameProgress: {
		fontSize: 18,
		fontWeight: "bold",
	},
	gameScore: {
		fontSize: 16,
	},
	wordCard: {
		padding: 24,
		borderRadius: 12,
		alignItems: "center",
		marginBottom: 32,
	},
	frenchWord: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 8,
	},
	instruction: {
		fontSize: 16,
	},
	optionsContainer: {
		gap: 12,
		marginBottom: 24,
	},
	option: {
		padding: 16,
		borderRadius: 8,
		borderWidth: 2,
		alignItems: "center",
	},
	optionText: {
		fontSize: 18,
		fontWeight: "500",
	},
	resultContainer: {
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	resultText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
});
