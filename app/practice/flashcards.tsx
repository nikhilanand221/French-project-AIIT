import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Animated,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useProgress as useProgressContext } from "../../contexts/ProgressContext";
import { useColorScheme } from "../../hooks/useColorScheme";

// Sample flashcard data (you can later fetch this from chapter content)
const flashcardData = [
	{ id: 1, french: "Bonjour", english: "Hello", pronunciation: "bon-ZHOOR" },
	{
		id: 2,
		french: "Au revoir",
		english: "Goodbye",
		pronunciation: "oh ruh-VWAHR",
	},
	{ id: 3, french: "Merci", english: "Thank you", pronunciation: "mer-SEE" },
	{
		id: 4,
		french: "S'il vous plaît",
		english: "Please",
		pronunciation: "see voo PLAY",
	},
	{
		id: 5,
		french: "Excusez-moi",
		english: "Excuse me",
		pronunciation: "ex-kew-zay MWAH",
	},
	{
		id: 6,
		french: "Comment vous appelez-vous?",
		english: "What is your name?",
		pronunciation: "koh-mahn voo zah-play VOO",
	},
	{
		id: 7,
		french: "Je m'appelle",
		english: "My name is",
		pronunciation: "zhuh mah-PELL",
	},
	{
		id: 8,
		french: "Comment allez-vous?",
		english: "How are you?",
		pronunciation: "koh-mahn tah-lay VOO",
	},
	{
		id: 9,
		french: "Ça va bien",
		english: "I'm doing well",
		pronunciation: "sah vah bee-AHN",
	},
	{
		id: 10,
		french: "Parlez-vous anglais?",
		english: "Do you speak English?",
		pronunciation: "par-lay voo ahn-GLAY",
	},
];

export default function Flashcards() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { addXP, updateStreak } = useProgressContext();

	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const [score, setScore] = useState({ correct: 0, total: 0 });
	const [sessionCards, setSessionCards] = useState(flashcardData.slice(0, 5)); // Practice with 5 cards
	const [flipAnimation] = useState(new Animated.Value(0));
	const [isComplete, setIsComplete] = useState(false);

	const currentCard = sessionCards[currentCardIndex];

	useEffect(() => {
		// Shuffle cards for each session
		const shuffled = [...flashcardData]
			.sort(() => Math.random() - 0.5)
			.slice(0, 5);
		setSessionCards(shuffled);
	}, []);

	const flipCard = () => {
		Animated.timing(flipAnimation, {
			toValue: isFlipped ? 0 : 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
		setIsFlipped(!isFlipped);
	};

	const handleAnswer = (isCorrect: boolean) => {
		const newScore = {
			correct: isCorrect ? score.correct + 1 : score.correct,
			total: score.total + 1,
		};
		setScore(newScore);

		// Move to next card or complete session
		if (currentCardIndex < sessionCards.length - 1) {
			setCurrentCardIndex(currentCardIndex + 1);
			setIsFlipped(false);
			flipAnimation.setValue(0);
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
		const xpEarned = Math.round(20 + (accuracy / 100) * 30); // 20-50 XP based on accuracy

		try {
			await addXP(xpEarned);
			await updateStreak();
		} catch (error) {
			console.error("Error updating progress:", error);
		}

		Alert.alert(
			"Flashcards Complete! 🎉",
			`Great job! You got ${finalScore.correct} out of ${
				finalScore.total
			} correct.\n\nAccuracy: ${accuracy.toFixed(1)}%\nXP Earned: +${xpEarned}`,
			[
				{ text: "Practice Again", onPress: () => restartSession() },
				{ text: "Back to Practice Arena", onPress: () => router.back() },
			]
		);
	};

	const restartSession = () => {
		const shuffled = [...flashcardData]
			.sort(() => Math.random() - 0.5)
			.slice(0, 5);
		setSessionCards(shuffled);
		setCurrentCardIndex(0);
		setIsFlipped(false);
		setScore({ correct: 0, total: 0 });
		setIsComplete(false);
		flipAnimation.setValue(0);
	};

	const frontInterpolate = flipAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "180deg"],
	});

	const backInterpolate = flipAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ["180deg", "360deg"],
	});

	const frontAnimatedStyle = {
		transform: [{ rotateY: frontInterpolate }],
	};

	const backAnimatedStyle = {
		transform: [{ rotateY: backInterpolate }],
	};

	if (isComplete) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.completionContainer}>
					<Text style={[styles.completionTitle, { color: colors.text }]}>
						Session Complete! 🎉
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
						{currentCardIndex + 1} / {sessionCards.length}
					</Text>
					<Text style={[styles.scoreText, { color: colors.primary }]}>
						Score: {score.correct}/{score.total}
					</Text>
				</View>
			</View>

			{/* Flashcard */}
			<View style={styles.cardContainer}>
				<TouchableOpacity onPress={flipCard} activeOpacity={0.8}>
					<View style={styles.cardWrapper}>
						{/* Front of card (French) */}
						<Animated.View
							style={[
								styles.card,
								{ backgroundColor: colors.primary },
								frontAnimatedStyle,
								isFlipped && styles.cardHidden,
							]}
						>
							<Text style={styles.cardLanguageLabel}>French</Text>
							<Text style={styles.cardMainText}>{currentCard?.french}</Text>
							<Text style={styles.cardPronunciation}>
								[{currentCard?.pronunciation}]
							</Text>
							<Text style={styles.flipHint}>Tap to reveal translation</Text>
						</Animated.View>

						{/* Back of card (English) */}
						<Animated.View
							style={[
								styles.card,
								styles.cardBack,
								{ backgroundColor: colors.accent },
								backAnimatedStyle,
								!isFlipped && styles.cardHidden,
							]}
						>
							<Text style={styles.cardLanguageLabel}>English</Text>
							<Text style={styles.cardMainText}>{currentCard?.english}</Text>
							<Text style={styles.flipHint}>Did you know this word?</Text>
						</Animated.View>
					</View>
				</TouchableOpacity>
			</View>

			{/* Answer Buttons */}
			{isFlipped && (
				<View style={styles.answerContainer}>
					<TouchableOpacity
						style={[styles.answerButton, styles.incorrectButton]}
						onPress={() => handleAnswer(false)}
						activeOpacity={0.8}
					>
						<Text style={styles.answerButtonText}>❌ Didn&apos;t Know</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.answerButton, styles.correctButton]}
						onPress={() => handleAnswer(true)}
						activeOpacity={0.8}
					>
						<Text style={styles.answerButtonText}>✅ Knew It!</Text>
					</TouchableOpacity>
				</View>
			)}

			{/* Instructions */}
			{!isFlipped && (
				<View style={styles.instructionsContainer}>
					<Text style={[styles.instructionsText, { color: colors.icon }]}>
						📚 Study the French word and pronunciation
					</Text>
					<Text style={[styles.instructionsText, { color: colors.icon }]}>
						👆 Tap the card to see the English translation
					</Text>
					<Text style={[styles.instructionsText, { color: colors.icon }]}>
						✅ Then rate your knowledge honestly
					</Text>
				</View>
			)}
		</SafeAreaView>
	);
}

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
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
	cardContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cardWrapper: {
		width: screenWidth - 40,
		height: 300,
	},
	card: {
		position: "absolute",
		width: "100%",
		height: "100%",
		borderRadius: 20,
		padding: 30,
		justifyContent: "center",
		alignItems: "center",
		elevation: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		backfaceVisibility: "hidden",
	},
	cardBack: {
		position: "absolute",
	},
	cardHidden: {
		opacity: 0,
	},
	cardLanguageLabel: {
		position: "absolute",
		top: 20,
		right: 20,
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
		opacity: 0.8,
	},
	cardMainText: {
		color: "white",
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	cardPronunciation: {
		color: "white",
		fontSize: 16,
		fontStyle: "italic",
		opacity: 0.9,
		marginBottom: 20,
	},
	flipHint: {
		position: "absolute",
		bottom: 20,
		color: "white",
		fontSize: 14,
		opacity: 0.7,
		textAlign: "center",
	},
	answerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 30,
		marginBottom: 20,
	},
	answerButton: {
		flex: 1,
		paddingVertical: 15,
		borderRadius: 25,
		marginHorizontal: 10,
		alignItems: "center",
	},
	correctButton: {
		backgroundColor: "#4CAF50",
	},
	incorrectButton: {
		backgroundColor: "#f44336",
	},
	answerButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	instructionsContainer: {
		marginTop: 30,
		marginBottom: 20,
	},
	instructionsText: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 8,
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
