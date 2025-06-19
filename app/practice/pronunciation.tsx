import { useRouter } from "expo-router";
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
import { Colors } from "../../constants/Colors";
import { useProgress as useProgressContext } from "../../contexts/ProgressContext";
import { useColorScheme } from "../../hooks/useColorScheme";
import { useGameification } from "../../hooks/useGameification";

// Pronunciation practice data
const pronunciationWords = [
	{
		id: 1,
		french: "Bonjour",
		english: "Hello",
		pronunciation: "bon-ZHOOR",
		audioTip: "The 'j' sounds like 's' in 'measure'",
	},
	{
		id: 2,
		french: "Au revoir",
		english: "Goodbye",
		pronunciation: "oh ruh-VWAHR",
		audioTip: "Silent 'r' at the end of 'revoir'",
	},
	{
		id: 3,
		french: "Comment",
		english: "How",
		pronunciation: "koh-MAHN",
		audioTip: "The 'ent' ending is silent",
	},
	{
		id: 4,
		french: "Très bien",
		english: "Very good",
		pronunciation: "tray bee-AHN",
		audioTip: "Roll the 'r' lightly in 'très'",
	},
	{
		id: 5,
		french: "Excusez-moi",
		english: "Excuse me",
		pronunciation: "ex-kew-zay MWAH",
		audioTip: "The 'x' sounds like 'gz'",
	},
	{
		id: 6,
		french: "S'il vous plaît",
		english: "Please",
		pronunciation: "see voo PLAY",
		audioTip: "Contract 'Si il' to 'S'il'",
	},
	{
		id: 7,
		french: "Pardon",
		english: "Sorry",
		pronunciation: "par-DOHN",
		audioTip: "Nasal 'on' sound at the end",
	},
	{
		id: 8,
		french: "Oui",
		english: "Yes",
		pronunciation: "WEE",
		audioTip: "Sounds like 'we' in English",
	},
];

export default function Pronunciation() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { addXP, updateStreak } = useProgressContext();
	const { challenges, updateChallengeProgress } = useGameification();

	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [score, setScore] = useState({ practiced: 0, total: 0 });
	const [sessionWords, setSessionWords] = useState(
		pronunciationWords.slice(0, 6)
	);
	const [isComplete, setIsComplete] = useState(false);
	const [showPronunciation, setShowPronunciation] = useState(false);

	const currentWord = sessionWords[currentWordIndex];

	useEffect(() => {
		// Shuffle words for each session
		const shuffled = [...pronunciationWords]
			.sort(() => Math.random() - 0.5)
			.slice(0, 6);
		setSessionWords(shuffled);
	}, []);

	const markAsPracticed = () => {
		const newScore = {
			practiced: score.practiced + 1,
			total: score.total + 1,
		};
		setScore(newScore);

		if (currentWordIndex < sessionWords.length - 1) {
			setCurrentWordIndex(currentWordIndex + 1);
			setShowPronunciation(false);
		} else {
			completeSession(newScore);
		}
	};

	const skipWord = () => {
		const newScore = {
			practiced: score.practiced,
			total: score.total + 1,
		};
		setScore(newScore);

		if (currentWordIndex < sessionWords.length - 1) {
			setCurrentWordIndex(currentWordIndex + 1);
			setShowPronunciation(false);
		} else {
			completeSession(newScore);
		}
	};
	const completeSession = async (finalScore: {
		practiced: number;
		total: number;
	}) => {
		setIsComplete(true);
		const completionRate = (finalScore.practiced / finalScore.total) * 100;
		const xpEarned = Math.round(30 + (completionRate / 100) * 20); // 30-50 XP based on completion

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
			"Pronunciation Practice Complete! 🗣️",
			`Well done! You practiced ${finalScore.practiced} out of ${
				finalScore.total
			} words.\n\nCompletion Rate: ${completionRate.toFixed(
				1
			)}%\nXP Earned: +${xpEarned}${
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
		const shuffled = [...pronunciationWords]
			.sort(() => Math.random() - 0.5)
			.slice(0, 6);
		setSessionWords(shuffled);
		setCurrentWordIndex(0);
		setScore({ practiced: 0, total: 0 });
		setIsComplete(false);
		setShowPronunciation(false);
	};

	const simulateAudioPlayback = () => {
		// In a real app, this would play actual audio
		Alert.alert(
			"🔊 Audio Playback",
			`Playing pronunciation for "${currentWord.french}"\n\nPronunciation: ${currentWord.pronunciation}`,
			[{ text: "Got it!", style: "default" }]
		);
	};

	if (isComplete) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.completionContainer}>
					<Text style={[styles.completionTitle, { color: colors.text }]}>
						Great Practice! 🗣️
					</Text>
					<Text style={[styles.completionScore, { color: colors.primary }]}>
						{score.practiced}/{score.total} Words Practiced
					</Text>
					<Text style={[styles.completionRate, { color: colors.icon }]}>
						{((score.practiced / score.total) * 100).toFixed(1)}% Completion
						Rate
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
							{currentWordIndex + 1} / {sessionWords.length}
						</Text>
						<Text style={[styles.scoreText, { color: colors.primary }]}>
							Practiced: {score.practiced}/{score.total}
						</Text>
					</View>
				</View>

				{/* Word Card */}
				<View style={[styles.wordCard, { backgroundColor: colors.card }]}>
					<Text style={[styles.frenchText, { color: colors.primary }]}>
						{currentWord?.french}
					</Text>
					<Text style={[styles.englishText, { color: colors.icon }]}>
						{currentWord?.english}
					</Text>

					{/* Audio Button */}
					<TouchableOpacity
						style={[styles.audioButton, { backgroundColor: colors.accent }]}
						onPress={simulateAudioPlayback}
					>
						<Text style={styles.audioButtonText}>🔊 Play Audio</Text>
					</TouchableOpacity>
				</View>

				{/* Pronunciation Guide */}
				<TouchableOpacity
					style={[
						styles.pronunciationCard,
						{ backgroundColor: colors.background, borderColor: colors.border },
					]}
					onPress={() => setShowPronunciation(!showPronunciation)}
				>
					<Text style={[styles.pronunciationTitle, { color: colors.text }]}>
						📖 Pronunciation Guide {showPronunciation ? "▲" : "▼"}
					</Text>

					{showPronunciation && (
						<View style={styles.pronunciationContent}>
							<Text
								style={[styles.pronunciationText, { color: colors.primary }]}
							>
								{currentWord?.pronunciation}
							</Text>
							<Text style={[styles.audioTip, { color: colors.icon }]}>
								💡 Tip: {currentWord?.audioTip}
							</Text>
						</View>
					)}
				</TouchableOpacity>

				{/* Instructions */}
				<View
					style={[styles.instructionsCard, { backgroundColor: colors.card }]}
				>
					<Text style={[styles.instructionsTitle, { color: colors.text }]}>
						🎯 How to Practice
					</Text>
					<Text style={[styles.instructionText, { color: colors.icon }]}>
						1. Listen to the audio pronunciation
					</Text>
					<Text style={[styles.instructionText, { color: colors.icon }]}>
						2. Practice saying the word out loud
					</Text>
					<Text style={[styles.instructionText, { color: colors.icon }]}>
						3. Use the pronunciation guide for help
					</Text>
					<Text style={[styles.instructionText, { color: colors.icon }]}>
						4. Mark as practiced when you feel confident
					</Text>
				</View>

				{/* Action Buttons */}
				<View style={styles.actionContainer}>
					<TouchableOpacity
						style={[styles.skipButton, { backgroundColor: colors.border }]}
						onPress={skipWord}
					>
						<Text style={[styles.skipButtonText, { color: colors.text }]}>
							Skip for Now
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.practicedButton,
							{ backgroundColor: colors.success },
						]}
						onPress={markAsPracticed}
					>
						<Text style={styles.practicedButtonText}>✅ Practiced!</Text>
					</TouchableOpacity>
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
	wordCard: {
		padding: 30,
		borderRadius: 20,
		alignItems: "center",
		marginBottom: 20,
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
	},
	frenchText: {
		fontSize: 36,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	englishText: {
		fontSize: 20,
		marginBottom: 20,
		textAlign: "center",
	},
	audioButton: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 25,
	},
	audioButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	pronunciationCard: {
		padding: 20,
		borderRadius: 15,
		borderWidth: 1,
		marginBottom: 20,
	},
	pronunciationTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	pronunciationContent: {
		marginTop: 10,
	},
	pronunciationText: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	audioTip: {
		fontSize: 16,
		fontStyle: "italic",
		textAlign: "center",
	},
	instructionsCard: {
		padding: 20,
		borderRadius: 15,
		marginBottom: 30,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	instructionsTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
	},
	instructionText: {
		fontSize: 16,
		marginBottom: 8,
		lineHeight: 24,
	},
	actionContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	skipButton: {
		flex: 1,
		paddingVertical: 15,
		borderRadius: 25,
		marginRight: 10,
		alignItems: "center",
	},
	skipButtonText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	practicedButton: {
		flex: 1,
		paddingVertical: 15,
		borderRadius: 25,
		marginLeft: 10,
		alignItems: "center",
	},
	practicedButtonText: {
		color: "white",
		fontSize: 16,
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
	completionRate: {
		fontSize: 20,
		marginBottom: 30,
	},
});
