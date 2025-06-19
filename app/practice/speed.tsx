import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
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

// Speed challenge vocabulary
const speedChallengeWords = [
	{ french: "Bonjour", english: "Hello" },
	{ french: "Au revoir", english: "Goodbye" },
	{ french: "Merci", english: "Thank you" },
	{ french: "Oui", english: "Yes" },
	{ french: "Non", english: "No" },
	{ french: "Chat", english: "Cat" },
	{ french: "Chien", english: "Dog" },
	{ french: "Eau", english: "Water" },
	{ french: "Pain", english: "Bread" },
	{ french: "Lait", english: "Milk" },
	{ french: "Rouge", english: "Red" },
	{ french: "Bleu", english: "Blue" },
	{ french: "Vert", english: "Green" },
	{ french: "Un", english: "One" },
	{ french: "Deux", english: "Two" },
	{ french: "Trois", english: "Three" },
	{ french: "Maison", english: "House" },
	{ french: "École", english: "School" },
	{ french: "Voiture", english: "Car" },
	{ french: "Livre", english: "Book" },
];

export default function SpeedChallenge() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { addXP, updateStreak } = useProgressContext();

	const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
	const [currentWord, setCurrentWord] = useState(speedChallengeWords[0]);
	const [options, setOptions] = useState<string[]>([]);
	const [score, setScore] = useState(0);
	const [streak, setStreak] = useState(0);
	const [bestStreak, setBestStreak] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [usedWords, setUsedWords] = useState<number[]>([]);
	const [pulseAnimation] = useState(new Animated.Value(1));
	const [streakAnimation] = useState(new Animated.Value(1));
	useEffect(() => {
		let interval: any;
		if (isActive && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						// Time's up - complete the challenge
						setIsActive(false);
						setIsComplete(true);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isActive, timeLeft]);

	// Initialize first word
	useEffect(() => {
		const initializeWord = () => {
			const randomIndex = Math.floor(
				Math.random() * speedChallengeWords.length
			);
			const selectedWord = speedChallengeWords[randomIndex];
			setCurrentWord(selectedWord);

			const wrongAnswers = speedChallengeWords
				.filter((word) => word.english !== selectedWord.english)
				.sort(() => Math.random() - 0.5)
				.slice(0, 3)
				.map((word) => word.english);

			const allOptions = [...wrongAnswers, selectedWord.english].sort(
				() => Math.random() - 0.5
			);
			setOptions(allOptions);
		};
		initializeWord();
	}, []);

	const generateNewWord = useCallback(() => {
		// Get a random word that hasn't been used recently
		let availableWords = speedChallengeWords.filter(
			(_, index) => !usedWords.includes(index)
		);
		if (availableWords.length < 3) {
			// Reset used words if we're running low
			setUsedWords([]);
			availableWords = speedChallengeWords;
		}

		const randomIndex = Math.floor(Math.random() * availableWords.length);
		const selectedWord = availableWords[randomIndex];
		const wordIndex = speedChallengeWords.indexOf(selectedWord);

		setCurrentWord(selectedWord);
		setUsedWords((prev) => [...prev, wordIndex]);

		// Generate 3 wrong answers + 1 correct answer
		const wrongAnswers = speedChallengeWords
			.filter((word) => word.english !== selectedWord.english)
			.sort(() => Math.random() - 0.5)
			.slice(0, 3)
			.map((word) => word.english);

		const allOptions = [...wrongAnswers, selectedWord.english].sort(
			() => Math.random() - 0.5
		);
		setOptions(allOptions);
	}, [usedWords]);

	const restartChallenge = useCallback(() => {
		setTimeLeft(120);
		setScore(0);
		setStreak(0);
		setBestStreak(0);
		setIsActive(false);
		setIsComplete(false);
		setUsedWords([]);
		generateNewWord();
	}, [generateNewWord]);

	const completeChallenge = useCallback(async () => {
		if (!isComplete) return; // Prevent multiple calls

		const baseXP = score * 3;
		const streakBonus = bestStreak * 2;
		const timeBonus = timeLeft > 0 ? Math.floor(timeLeft / 10) : 0;
		const totalXP = baseXP + streakBonus + timeBonus;

		try {
			await addXP(totalXP);
			await updateStreak();
		} catch (error) {
			console.error("Error updating progress:", error);
		}

		Alert.alert(
			"Speed Challenge Complete! ⚡",
			`Time's up! Amazing speed!\n\nWords Translated: ${score}\nBest Streak: ${bestStreak}\nXP Earned: +${totalXP}`,
			[
				{ text: "Try Again", onPress: () => restartChallenge() },
				{ text: "Back to Practice Arena", onPress: () => router.back() },
			]
		);
	}, [
		isComplete,
		score,
		bestStreak,
		timeLeft,
		addXP,
		updateStreak,
		router,
		restartChallenge,
	]);

	// Handle completion when time runs out
	useEffect(() => {
		if (isComplete && !isActive) {
			completeChallenge();
		}
	}, [isComplete, isActive, completeChallenge]);

	const startChallenge = () => {
		setIsActive(true);
		setScore(0);
		setStreak(0);
		setBestStreak(0);
		setTimeLeft(120);
		setIsComplete(false);
		generateNewWord();
	};

	const handleAnswer = (selectedAnswer: string) => {
		if (!isActive) return;

		const isCorrect = selectedAnswer === currentWord.english;

		if (isCorrect) {
			setScore(score + 1);
			const newStreak = streak + 1;
			setStreak(newStreak);
			if (newStreak > bestStreak) {
				setBestStreak(newStreak);
				// Animate streak achievement
				Animated.sequence([
					Animated.timing(streakAnimation, {
						toValue: 1.3,
						duration: 150,
						useNativeDriver: true,
					}),
					Animated.timing(streakAnimation, {
						toValue: 1,
						duration: 150,
						useNativeDriver: true,
					}),
				]).start();
			}
			generateNewWord();
		} else {
			setStreak(0);
			// Pulse animation for wrong answer
			Animated.sequence([
				Animated.timing(pulseAnimation, {
					toValue: 0.8,
					duration: 100,
					useNativeDriver: true,
				}),
				Animated.timing(pulseAnimation, {
					toValue: 1,
					duration: 100,
					useNativeDriver: true,
				}),
			]).start();
		}
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};
	const getTimeColor = () => {
		if (timeLeft > 60) return colors.success;
		if (timeLeft > 30) return colors.warning;
		return colors.secondary; // Use secondary instead of error
	};

	if (isComplete) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.completionContainer}>
					<Text style={[styles.completionTitle, { color: colors.text }]}>
						Speed Challenge Complete! ⚡
					</Text>
					<Text style={[styles.completionScore, { color: colors.primary }]}>
						{score} Words
					</Text>
					<Text style={[styles.completionStreak, { color: colors.accent }]}>
						Best Streak: {bestStreak}
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
				<View style={styles.timerContainer}>
					<Text style={[styles.timerText, { color: getTimeColor() }]}>
						{formatTime(timeLeft)}
					</Text>
				</View>
			</View>

			{/* Stats */}
			<View style={styles.statsContainer}>
				<View style={[styles.statCard, { backgroundColor: colors.card }]}>
					<Text style={[styles.statValue, { color: colors.primary }]}>
						{score}
					</Text>
					<Text style={[styles.statLabel, { color: colors.icon }]}>Score</Text>
				</View>
				<Animated.View
					style={[
						styles.statCard,
						{ backgroundColor: colors.card },
						{ transform: [{ scale: streakAnimation }] },
					]}
				>
					<Text style={[styles.statValue, { color: colors.accent }]}>
						{streak}
					</Text>
					<Text style={[styles.statLabel, { color: colors.icon }]}>Streak</Text>
				</Animated.View>
				<View style={[styles.statCard, { backgroundColor: colors.card }]}>
					<Text style={[styles.statValue, { color: colors.success }]}>
						{bestStreak}
					</Text>
					<Text style={[styles.statLabel, { color: colors.icon }]}>Best</Text>
				</View>
			</View>

			{!isActive && !isComplete ? (
				// Start Screen
				<View style={styles.startContainer}>
					<Text style={[styles.startTitle, { color: colors.text }]}>
						Speed Challenge ⚡
					</Text>
					<Text style={[styles.startSubtitle, { color: colors.icon }]}>
						Translate as many French words as possible in 2 minutes!
					</Text>
					<TouchableOpacity
						style={[styles.startButton, { backgroundColor: colors.primary }]}
						onPress={startChallenge}
					>
						<Text style={styles.startButtonText}>Start Challenge</Text>
					</TouchableOpacity>
				</View>
			) : (
				// Game Screen
				<Animated.View
					style={[
						styles.gameContainer,
						{ transform: [{ scale: pulseAnimation }] },
					]}
				>
					{/* French Word */}
					<View style={[styles.wordCard, { backgroundColor: colors.primary }]}>
						<Text style={styles.frenchWord}>{currentWord.french}</Text>
						<Text style={styles.instructionText}>
							Select the English translation:
						</Text>
					</View>

					{/* Answer Options */}
					<View style={styles.optionsContainer}>
						{options.map((option, index) => (
							<TouchableOpacity
								key={index}
								style={[styles.optionButton, { backgroundColor: colors.card }]}
								onPress={() => handleAnswer(option)}
								activeOpacity={0.7}
							>
								<Text style={[styles.optionText, { color: colors.text }]}>
									{option}
								</Text>
							</TouchableOpacity>
						))}
					</View>
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
	timerContainer: {
		backgroundColor: "rgba(0,0,0,0.1)",
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderRadius: 20,
	},
	timerText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	statCard: {
		flex: 1,
		padding: 15,
		borderRadius: 12,
		alignItems: "center",
		marginHorizontal: 5,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	statValue: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 5,
	},
	statLabel: {
		fontSize: 12,
		textAlign: "center",
	},
	startContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	startTitle: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	startSubtitle: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 40,
		lineHeight: 24,
	},
	startButton: {
		paddingHorizontal: 40,
		paddingVertical: 18,
		borderRadius: 25,
	},
	startButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	gameContainer: {
		flex: 1,
		justifyContent: "center",
	},
	wordCard: {
		padding: 30,
		borderRadius: 20,
		alignItems: "center",
		marginBottom: 30,
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
	},
	frenchWord: {
		color: "white",
		fontSize: 36,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
	instructionText: {
		color: "white",
		fontSize: 16,
		opacity: 0.9,
	},
	optionsContainer: {
		gap: 12,
	},
	optionButton: {
		padding: 18,
		borderRadius: 15,
		alignItems: "center",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	optionText: {
		fontSize: 18,
		fontWeight: "600",
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
	completionStreak: {
		fontSize: 20,
		marginBottom: 30,
	},
});
