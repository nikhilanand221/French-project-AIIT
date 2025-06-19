import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { CelebrationModal } from "../../../components/CelebrationModal";
import { useProgress } from "../../../contexts/ProgressContext";

// Assessment data for Chapter 4: Job Interview Challenge
const assessmentData = {
	title: "Chapter 4 Assessment: Job Interview Challenge",
	description:
		"Test your knowledge of professions, nationalities, and verb conjugations",
	questions: [
		{
			id: 1,
			type: "multiple-choice",
			question: 'How do you say "I am a doctor" in French?',
			options: [
				"Je suis un médecin",
				"Tu es un médecin",
				"Il est un médecin",
				"Nous sommes des médecins",
			],
			correct: "Je suis un médecin",
			explanation:
				'Use "Je suis" (I am) + profession. Note that "médecin" can be used for both male and female doctors.',
		},
		{
			id: 2,
			type: "multiple-choice",
			question:
				'What is the correct conjugation of "travailler" (to work) for "nous"?',
			options: ["travaillons", "travaillez", "travaille", "travaillent"],
			correct: "travaillons",
			explanation:
				'For "nous" with -er verbs, remove -er and add -ons: nous travaillons.',
		},
		{
			id: 3,
			type: "multiple-choice",
			question: "Someone from Canada is called:",
			options: ["français(e)", "américain(e)", "canadien(ne)", "anglais(e)"],
			correct: "canadien(ne)",
			explanation:
				'A person from Canada is "canadien" (masculine) or "canadienne" (feminine).',
		},
		{
			id: 4,
			type: "fill-blank",
			question: 'Complete: "Elle _____ infirmière." (She is a nurse)',
			options: ["est", "es", "suis", "sont"],
			correct: "est",
			explanation:
				'Use "est" for the third person singular (il/elle) of the verb "être".',
		},
		{
			id: 5,
			type: "multiple-choice",
			question: 'How do you ask "What is your profession?" formally?',
			options: [
				"Quel est votre métier?",
				"Quel est ton métier?",
				"Comment vous appelez-vous?",
				"Où habitez-vous?",
			],
			correct: "Quel est votre métier?",
			explanation:
				'Use "votre" for formal situations and "métier" or "profession" to ask about someone\'s job.',
		},
		{
			id: 6,
			type: "multiple-choice",
			question: 'What is the feminine form of "avocat" (lawyer)?',
			options: ["avocate", "avocatie", "avocatesse", "avocature"],
			correct: "avocate",
			explanation:
				'The feminine form of "avocat" is "avocate". Many profession names add -e for feminine form.',
		},
		{
			id: 7,
			type: "multiple-choice",
			question: 'Conjugate "parler" (to speak) for "vous":',
			options: ["parle", "parles", "parlez", "parlent"],
			correct: "parlez",
			explanation:
				'For "vous" with -er verbs, remove -er and add -ez: vous parlez.',
		},
		{
			id: 8,
			type: "multiple-choice",
			question: "Someone from Germany is:",
			options: ["allemand(e)", "français(e)", "italien(ne)", "espagnol(e)"],
			correct: "allemand(e)",
			explanation:
				'A person from Germany (Allemagne) is "allemand" (masculine) or "allemande" (feminine).',
		},
		{
			id: 9,
			type: "fill-blank",
			question: 'Complete: "Ils _____ professeurs." (They are teachers)',
			options: ["sont", "est", "suis", "es"],
			correct: "sont",
			explanation:
				'Use "sont" for the third person plural (ils/elles) of the verb "être".',
		},
		{
			id: 10,
			type: "multiple-choice",
			question: 'How do you say "I work in a hospital" in French?',
			options: [
				"Je travaille dans un hôpital",
				"Tu travailles dans un hôpital",
				"Il travaille dans un hôpital",
				"Nous travaillons dans un hôpital",
			],
			correct: "Je travaille dans un hôpital",
			explanation:
				'Use "Je travaille" (I work) + "dans" (in) + location. Note the spelling of "hôpital".',
		},
	],
};

export default function AssessmentScreen() {
	const { updateLessonProgress, addXP } = useProgress();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<{
		[key: number]: string;
	}>({});
	const [showResults, setShowResults] = useState(false);
	const [score, setScore] = useState(0);
	const [showCelebration, setShowCelebration] = useState(false);
	const [timeSpent, setTimeSpent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeSpent((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleAnswerSelect = (answer: string) => {
		setSelectedAnswers((prev) => ({
			...prev,
			[currentQuestion]: answer,
		}));
	};

	const handleNext = () => {
		if (currentQuestion < assessmentData.questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			handleSubmitAssessment();
		}
	};

	const handlePrevious = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1);
		}
	};

	const handleSubmitAssessment = async () => {
		let correctCount = 0;

		assessmentData.questions.forEach((question, index) => {
			if (selectedAnswers[index] === question.correct) {
				correctCount++;
			}
		});

		const percentage = (correctCount / assessmentData.questions.length) * 100;
		setScore(percentage);
		setShowResults(true); // Update progress
		const xpGained = Math.round(percentage / 5); // 1 XP per 5% score

		await updateLessonProgress({
			chapterId: "chapter4",
			lessonId: "assessment",
			score: percentage,
			completed: percentage >= 70,
			timeSpent,
			attempts: 1,
		});

		await addXP(xpGained);

		if (percentage >= 70) {
			setShowCelebration(true);
		}
	};

	const resetAssessment = () => {
		setCurrentQuestion(0);
		setSelectedAnswers({});
		setShowResults(false);
		setScore(0);
		setTimeSpent(0);
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	if (showResults) {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.resultsContainer}>
					<Ionicons
						name={score >= 70 ? "trophy" : "ribbon"}
						size={80}
						color={score >= 70 ? "#FFD700" : "#FF9800"}
					/>
					<Text style={styles.resultsTitle}>Assessment Complete!</Text>
					<Text style={styles.scoreText}>
						Score: {score.toFixed(1)}% (
						{Math.round((score * assessmentData.questions.length) / 100)}/
						{assessmentData.questions.length})
					</Text>
					<Text style={styles.timeText}>Time: {formatTime(timeSpent)}</Text>

					<View style={styles.performanceContainer}>
						<Text style={styles.performanceTitle}>Performance Analysis</Text>
						{score >= 90 && (
							<Text style={styles.performanceText}>
								🏆 Excellent! You&apos;ve mastered the chapter concepts.
							</Text>
						)}
						{score >= 70 && score < 90 && (
							<Text style={styles.performanceText}>
								✅ Good work! You understand most of the material.
							</Text>
						)}
						{score >= 50 && score < 70 && (
							<Text style={styles.performanceText}>
								📚 Keep practicing! Review the lessons and try again.
							</Text>
						)}
						{score < 50 && (
							<Text style={styles.performanceText}>
								💪 Don&apos;t give up! Review the chapter carefully and practice
								more.
							</Text>
						)}
					</View>

					<View style={styles.detailedResults}>
						<Text style={styles.detailedTitle}>Detailed Results</Text>
						{assessmentData.questions.map((question, index) => {
							const userAnswer = selectedAnswers[index];
							const isCorrect = userAnswer === question.correct;

							return (
								<View key={question.id} style={styles.resultItem}>
									<View style={styles.questionHeader}>
										<Text style={styles.questionNumber}>Q{index + 1}</Text>
										<Ionicons
											name={isCorrect ? "checkmark-circle" : "close-circle"}
											size={24}
											color={isCorrect ? "#4CAF50" : "#f44336"}
										/>
									</View>
									<Text style={styles.questionText}>{question.question}</Text>
									<Text
										style={[
											styles.answerText,
											isCorrect ? styles.correctAnswer : styles.incorrectAnswer,
										]}
									>
										Your answer: {userAnswer || "Not answered"}
									</Text>
									{!isCorrect && (
										<Text style={styles.correctAnswerText}>
											Correct answer: {question.correct}
										</Text>
									)}
									<Text style={styles.explanationText}>
										{question.explanation}
									</Text>
								</View>
							);
						})}
					</View>

					<View style={styles.actionButtons}>
						<TouchableOpacity
							style={styles.retryButton}
							onPress={resetAssessment}
						>
							<Text style={styles.retryButtonText}>Try Again</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.continueButton}
							onPress={() => router.back()}
						>
							<Text style={styles.continueButtonText}>Continue</Text>
						</TouchableOpacity>
					</View>
				</View>{" "}
				<CelebrationModal
					visible={showCelebration}
					onClose={() => setShowCelebration(false)}
					type="lesson_complete"
					title="Chapter 4 Complete!"
					message={`Congratulations! You scored ${score.toFixed(
						1
					)}% on the assessment!`}
				/>
			</ScrollView>
		);
	}

	const currentQuestionData = assessmentData.questions[currentQuestion];

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => router.back()}
					style={styles.backButton}
				>
					<Ionicons name="arrow-back" size={24} color="#003366" />
				</TouchableOpacity>
				<Text style={styles.title}>Chapter 4 Assessment</Text>
				<Text style={styles.timer}>{formatTime(timeSpent)}</Text>
			</View>

			<View style={styles.progressContainer}>
				<View style={styles.progressBar}>
					<View
						style={[
							styles.progressFill,
							{
								width: `${
									((currentQuestion + 1) / assessmentData.questions.length) *
									100
								}%`,
							},
						]}
					/>
				</View>
				<Text style={styles.progressText}>
					Question {currentQuestion + 1} of {assessmentData.questions.length}
				</Text>
			</View>

			<ScrollView style={styles.content}>
				<View style={styles.questionContainer}>
					<Text style={styles.questionTitle}>
						Question {currentQuestion + 1}
					</Text>
					<Text style={styles.question}>{currentQuestionData.question}</Text>

					<View style={styles.optionsContainer}>
						{currentQuestionData.options.map((option, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.option,
									selectedAnswers[currentQuestion] === option &&
										styles.selectedOption,
								]}
								onPress={() => handleAnswerSelect(option)}
							>
								<View style={styles.optionContent}>
									<Text
										style={[
											styles.optionText,
											selectedAnswers[currentQuestion] === option &&
												styles.selectedOptionText,
										]}
									>
										{option}
									</Text>
									{selectedAnswers[currentQuestion] === option && (
										<Ionicons
											name="checkmark-circle"
											size={20}
											color="#003366"
										/>
									)}
								</View>
							</TouchableOpacity>
						))}
					</View>

					{currentQuestionData.type === "fill-blank" && (
						<View style={styles.hintContainer}>
							<Ionicons name="bulb" size={16} color="#FF9800" />
							<Text style={styles.hintText}>
								Fill in the blank with the correct word from the options above.
							</Text>
						</View>
					)}
				</View>
			</ScrollView>

			<View style={styles.navigationButtons}>
				<TouchableOpacity
					style={[
						styles.navButton,
						currentQuestion === 0 && styles.navButtonDisabled,
					]}
					onPress={handlePrevious}
					disabled={currentQuestion === 0}
				>
					<Ionicons
						name="chevron-back"
						size={20}
						color={currentQuestion === 0 ? "#ccc" : "#003366"}
					/>
					<Text
						style={[
							styles.navButtonText,
							currentQuestion === 0 && styles.navButtonTextDisabled,
						]}
					>
						Previous
					</Text>
				</TouchableOpacity>

				<View style={styles.answerStatus}>
					<Text style={styles.answerStatusText}>
						{Object.keys(selectedAnswers).length}/
						{assessmentData.questions.length} answered
					</Text>
				</View>

				<TouchableOpacity
					style={[
						styles.navButton,
						styles.nextButton,
						!selectedAnswers[currentQuestion] && styles.navButtonDisabled,
					]}
					onPress={handleNext}
					disabled={!selectedAnswers[currentQuestion]}
				>
					<Text
						style={[
							styles.navButtonText,
							styles.nextButtonText,
							!selectedAnswers[currentQuestion] && styles.navButtonTextDisabled,
						]}
					>
						{currentQuestion === assessmentData.questions.length - 1
							? "Submit"
							: "Next"}
					</Text>
					<Ionicons
						name={
							currentQuestion === assessmentData.questions.length - 1
								? "checkmark"
								: "chevron-forward"
						}
						size={20}
						color={!selectedAnswers[currentQuestion] ? "#ccc" : "#fff"}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	backButton: {
		padding: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#003366",
		flex: 1,
		textAlign: "center",
		marginHorizontal: 16,
	},
	timer: {
		fontSize: 16,
		fontWeight: "600",
		color: "#FF9800",
		backgroundColor: "#fff3e0",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
	},
	progressContainer: {
		padding: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	progressBar: {
		height: 8,
		backgroundColor: "#e0e0e0",
		borderRadius: 4,
		marginBottom: 8,
	},
	progressFill: {
		height: "100%",
		backgroundColor: "#4CAF50",
		borderRadius: 4,
	},
	progressText: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
	},
	content: {
		flex: 1,
		padding: 16,
	},
	questionContainer: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	questionTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#003366",
		marginBottom: 8,
	},
	question: {
		fontSize: 18,
		fontWeight: "600",
		color: "#333",
		marginBottom: 24,
		lineHeight: 26,
	},
	optionsContainer: {
		gap: 12,
	},
	option: {
		padding: 16,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#e0e0e0",
		backgroundColor: "#f9f9f9",
	},
	selectedOption: {
		borderColor: "#003366",
		backgroundColor: "#e3f2fd",
	},
	optionContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	optionText: {
		fontSize: 16,
		color: "#333",
		flex: 1,
	},
	selectedOptionText: {
		color: "#003366",
		fontWeight: "500",
	},
	hintContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 16,
		padding: 12,
		backgroundColor: "#fff8e1",
		borderRadius: 8,
		gap: 8,
	},
	hintText: {
		fontSize: 14,
		color: "#F57C00",
		flex: 1,
	},
	navigationButtons: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#e0e0e0",
	},
	navButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#003366",
		gap: 8,
		minWidth: 100,
	},
	nextButton: {
		backgroundColor: "#003366",
	},
	navButtonDisabled: {
		borderColor: "#ccc",
		backgroundColor: "#f5f5f5",
	},
	navButtonText: {
		fontSize: 14,
		color: "#003366",
		fontWeight: "500",
	},
	nextButtonText: {
		color: "#fff",
	},
	navButtonTextDisabled: {
		color: "#ccc",
	},
	answerStatus: {
		alignItems: "center",
	},
	answerStatusText: {
		fontSize: 12,
		color: "#666",
	},
	resultsContainer: {
		padding: 16,
		alignItems: "center",
	},
	resultsTitle: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#003366",
		marginTop: 16,
		marginBottom: 8,
	},
	scoreText: {
		fontSize: 24,
		fontWeight: "600",
		color: "#4CAF50",
		marginBottom: 8,
	},
	timeText: {
		fontSize: 16,
		color: "#666",
		marginBottom: 24,
	},
	performanceContainer: {
		backgroundColor: "#f0f7ff",
		padding: 16,
		borderRadius: 12,
		marginBottom: 24,
		width: "100%",
	},
	performanceTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#003366",
		marginBottom: 8,
		textAlign: "center",
	},
	performanceText: {
		fontSize: 16,
		color: "#333",
		textAlign: "center",
		lineHeight: 22,
	},
	detailedResults: {
		width: "100%",
		marginBottom: 24,
	},
	detailedTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#003366",
		marginBottom: 16,
		textAlign: "center",
	},
	resultItem: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 12,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	questionHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	questionNumber: {
		fontSize: 14,
		fontWeight: "600",
		color: "#003366",
	},
	questionText: {
		fontSize: 16,
		fontWeight: "500",
		color: "#333",
		marginBottom: 8,
	},
	answerText: {
		fontSize: 14,
		marginBottom: 4,
	},
	correctAnswer: {
		color: "#4CAF50",
	},
	incorrectAnswer: {
		color: "#f44336",
	},
	correctAnswerText: {
		fontSize: 14,
		color: "#4CAF50",
		fontWeight: "500",
		marginBottom: 8,
	},
	explanationText: {
		fontSize: 14,
		color: "#666",
		fontStyle: "italic",
		lineHeight: 20,
	},
	actionButtons: {
		flexDirection: "row",
		gap: 12,
		width: "100%",
	},
	retryButton: {
		flex: 1,
		padding: 16,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#003366",
		alignItems: "center",
	},
	retryButtonText: {
		fontSize: 16,
		color: "#003366",
		fontWeight: "600",
	},
	continueButton: {
		flex: 1,
		padding: 16,
		borderRadius: 8,
		backgroundColor: "#003366",
		alignItems: "center",
	},
	continueButtonText: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "600",
	},
});
