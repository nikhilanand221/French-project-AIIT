import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CelebrationModal } from "../../../components/CelebrationModal";
import { Colors } from "../../../constants/Colors";
import { useProgress } from "../../../contexts/ProgressContext";
import { useColorScheme } from "../../../hooks/useColorScheme";

const assessmentQuestions = [
	{
		question: "What is the formal greeting in French?",
		options: ["Salut", "Bonjour", "Bonsoir", "Coucou"],
		correct: "Bonjour",
	},
	{
		question: "How do you say 'Thank you' in French?",
		options: ["De rien", "S'il vous plaît", "Merci", "Excusez-moi"],
		correct: "Merci",
	},
	{
		question: "What does 'Je m'appelle' mean?",
		options: ["I am", "My name is", "I live", "I come from"],
		correct: "My name is",
	},
	{
		question: "How do you ask 'How are you?' formally?",
		options: [
			"Ça va?",
			"Comment allez-vous?",
			"Comment tu vas?",
			"Quoi de neuf?",
		],
		correct: "Comment allez-vous?",
	},
	{
		question: "What is the polite way to say 'Please' formally?",
		options: ["S'il te plaît", "S'il vous plaît", "Merci", "De rien"],
		correct: "S'il vous plaît",
	},
];

export default function AssessmentScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const router = useRouter();
	const { updateLessonProgress, addXP, unlockChapter } = useProgress();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [answers, setAnswers] = useState<string[]>([]);
	const [assessmentComplete, setAssessmentComplete] = useState(false);
	const [showCelebration, setShowCelebration] = useState(false);
	const [finalScore, setFinalScore] = useState(0);
	const [xpEarned, setXpEarned] = useState(0);

	const currentQuestion = assessmentQuestions[currentQuestionIndex];
	const progress =
		((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;

	const handleAnswerSelect = (answer: string) => {
		setSelectedAnswer(answer);
	};

	const handleNext = () => {
		if (!selectedAnswer) {
			Alert.alert(
				"Please select an answer",
				"Choose one of the options before continuing."
			);
			return;
		}

		// Store the answer
		const newAnswers = [...answers, selectedAnswer];
		setAnswers(newAnswers);

		if (currentQuestionIndex < assessmentQuestions.length - 1) {
			// Move to next question
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setSelectedAnswer(null);
		} else {
			// Assessment complete
			handleAssessmentComplete(newAnswers);
		}
	};
	const handleAssessmentComplete = async (finalAnswers: string[]) => {
		setAssessmentComplete(true);

		// Calculate score
		let correctCount = 0;
		assessmentQuestions.forEach((question, index) => {
			if (finalAnswers[index] === question.correct) {
				correctCount++;
			}
		});

		const score = Math.round((correctCount / assessmentQuestions.length) * 100);
		const isPerfect = score === 100;
		const passed = score >= 70;

		// Calculate XP based on performance
		const xpAmount = isPerfect ? 60 : passed ? 50 : 30;

		// Set state for celebration modal
		setFinalScore(score);
		setXpEarned(xpAmount);

		// Update lesson progress
		await updateLessonProgress({
			lessonId: "assessment",
			chapterId: "chapter1",
			completed: passed,
			score: score,
			timeSpent: 0, // Could track actual time spent
			attempts: 1,
		});
		// Add XP
		await addXP(xpAmount);

		// Unlock next chapter if assessment passed
		if (passed) {
			await unlockChapter("chapter2");
		}

		// Show celebration
		setShowCelebration(true);
	};

	if (assessmentComplete) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<ScrollView style={styles.scrollView}>
					<View style={styles.header}>
						<Text style={[styles.title, { color: colors.text }]}>
							Assessment Results
						</Text>
						<TouchableOpacity
							style={[styles.backButton, { backgroundColor: colors.primary }]}
							onPress={() => router.back()}
						>
							<Text style={styles.backButtonText}>Back to Chapter</Text>
						</TouchableOpacity>
					</View>

					{/* Results would go here - detailed breakdown */}
					<Text style={[styles.comingSoon, { color: colors.icon }]}>
						Detailed results view coming soon!
					</Text>
				</ScrollView>
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

					<View style={styles.headerInfo}>
						<Text style={[styles.title, { color: colors.text }]}>
							Chapter 1 Assessment
						</Text>
						<Text style={[styles.subtitle, { color: colors.icon }]}>
							Question {currentQuestionIndex + 1} of{" "}
							{assessmentQuestions.length}
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
				{/* Question Card */}
				<View style={[styles.questionCard, { backgroundColor: colors.card }]}>
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
				{/* Continue Button */}
				<TouchableOpacity
					style={[
						styles.continueButton,
						{
							backgroundColor: selectedAnswer ? colors.primary : colors.border,
							opacity: selectedAnswer ? 1 : 0.5,
						},
					]}
					onPress={handleNext}
					disabled={!selectedAnswer || assessmentComplete}
				>
					<Text style={styles.continueButtonText}>
						{currentQuestionIndex === assessmentQuestions.length - 1
							? "Finish Assessment"
							: "Next Question"}
					</Text>
				</TouchableOpacity>{" "}
				{/* Progress Info */}
				<View style={styles.progressInfo}>
					<Text style={[styles.progressText, { color: colors.icon }]}>
						Progress: {currentQuestionIndex + 1} / {assessmentQuestions.length}{" "}
						questions
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
				title="Évaluation Terminée! 📝"
				message={`Score Final: ${finalScore}%`}
				type={finalScore === 100 ? "perfect_score" : "lesson_complete"}
				xpEarned={xpEarned}
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
		color: "white",
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
	progressFill: {
		height: "100%",
		borderRadius: 4,
	},
	questionCard: {
		padding: 25,
		borderRadius: 15,
		marginBottom: 25,
	},
	questionText: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 25,
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
	continueButton: {
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: "center",
		marginBottom: 20,
	},
	continueButtonText: {
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
	comingSoon: {
		fontSize: 18,
		textAlign: "center",
		marginTop: 50,
		fontStyle: "italic",
	},
});
