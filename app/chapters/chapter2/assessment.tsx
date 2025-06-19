import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Colors";
import { useProgress } from "../../../contexts/ProgressContext";
import { chapter2Data } from "../../../data/chapter2/content";
import { useColorScheme } from "../../../hooks/useColorScheme";

export default function Chapter2Assessment() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { updateLessonProgress, addXP, unlockChapter } = useProgress();

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<{ [key: number]: string | number }>(
		{}
	);
	const [userTextAnswer, setUserTextAnswer] = useState("");
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
	const [assessmentStarted, setAssessmentStarted] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const [score, setScore] = useState(0);
	const assessment = chapter2Data.assessment;
	const questions = assessment.questions;
	const currentQ = questions[currentQuestion];

	const handleSubmitAssessment = React.useCallback(() => {
		// Calculate score
		let correctAnswers = 0;
		let totalScore = 0;

		questions.forEach((question) => {
			const userAnswer = answers[question.id];
			let isCorrect = false;

			if (question.type === "multiple_choice") {
				isCorrect = userAnswer === question.correct;
			} else if (
				question.type === "translation" ||
				question.type === "fill_blank"
			) {
				const correctAnswer = question.correct;
				if (
					typeof userAnswer === "string" &&
					typeof correctAnswer === "string"
				) {
					isCorrect =
						userAnswer.toLowerCase().trim() ===
						correctAnswer.toLowerCase().trim();
				}
			}

			if (isCorrect) {
				correctAnswers++;
			}
		});
		totalScore = Math.round((correctAnswers / questions.length) * 100);
		setScore(totalScore);
		setShowResults(true);

		// Update progress system
		const passed = totalScore >= 70;
		const isPerfect = totalScore === 100;
		const xpAmount = isPerfect ? 60 : passed ? 50 : 30;

		// Update lesson progress
		updateLessonProgress({
			lessonId: "assessment",
			chapterId: "chapter2",
			completed: passed,
			score: totalScore,
			timeSpent: 600 - timeLeft, // Time spent in seconds
			attempts: 1,
		});

		// Add XP
		addXP(xpAmount);

		// Unlock next chapter if assessment passed
		if (passed) {
			unlockChapter("chapter3");
		}
	}, [
		answers,
		questions,
		timeLeft,
		updateLessonProgress,
		addXP,
		unlockChapter,
	]);

	// Timer effect
	React.useEffect(() => {
		if (assessmentStarted && timeLeft > 0 && !showResults) {
			const timer = setTimeout(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
			return () => clearTimeout(timer);
		} else if (timeLeft === 0) {
			handleSubmitAssessment();
		}
	}, [assessmentStarted, timeLeft, showResults, handleSubmitAssessment]);

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	const startAssessment = () => {
		setAssessmentStarted(true);
		setTimeLeft(assessment.timeLimit ? assessment.timeLimit * 60 : 600);
	};

	const handleAnswer = (questionId: number, answer: string | number) => {
		setAnswers({
			...answers,
			[questionId]: answer,
		});
	};

	const nextQuestion = () => {
		// Save current answer
		if (currentQ.type === "multiple_choice") {
			if (selectedOption !== null) {
				handleAnswer(currentQ.id, selectedOption);
			}
		} else if (
			currentQ.type === "translation" ||
			currentQ.type === "fill_blank"
		) {
			if (userTextAnswer.trim()) {
				handleAnswer(currentQ.id, userTextAnswer.trim());
			}
		}

		// Move to next question or finish
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			setSelectedOption(null);
			setUserTextAnswer("");
		} else {
			handleSubmitAssessment();
		}
	};

	const previousQuestion = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1);
			// Load previous answers
			const prevAnswer = answers[questions[currentQuestion - 1].id];
			if (typeof prevAnswer === "number") {
				setSelectedOption(prevAnswer);
				setUserTextAnswer("");
			} else if (typeof prevAnswer === "string") {
				setUserTextAnswer(prevAnswer);
				setSelectedOption(null);
			}
		}
	};

	const handleFinish = () => {
		const passed = score >= assessment.passingScore;
		Alert.alert(
			passed ? "Félicitations!" : "Continuez vos efforts!",
			`Score: ${score}%\n${
				passed
					? "Vous avez réussi l'évaluation!"
					: "Score minimum requis: " + assessment.passingScore + "%"
			}`,
			[
				{
					text: passed ? "Continuer" : "Réessayer",
					onPress: () => {
						if (passed) {
							router.back();
						} else {
							// Reset assessment
							setCurrentQuestion(0);
							setAnswers({});
							setUserTextAnswer("");
							setSelectedOption(null);
							setAssessmentStarted(false);
							setShowResults(false);
							setScore(0);
						}
					},
				},
			]
		);
	};

	if (!assessmentStarted) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<ScrollView style={styles.scrollView}>
					<View style={styles.introContainer}>
						<Text style={[styles.title, { color: colors.text }]}>
							🎯 Évaluation Chapitre 2
						</Text>{" "}
						<Text style={[styles.subtitle, { color: colors.secondary }]}>
							Race Against Time
						</Text>
						<View style={[styles.infoCard, { backgroundColor: colors.card }]}>
							<Text style={[styles.infoTitle, { color: colors.text }]}>
								📋 Informations sur l&apos;évaluation
							</Text>
							<View style={styles.infoRow}>
								<Text style={[styles.infoLabel, { color: colors.secondary }]}>
									Nombre de questions:
								</Text>
								<Text style={[styles.infoValue, { color: colors.text }]}>
									{questions.length}
								</Text>
							</View>
							<View style={styles.infoRow}>
								<Text style={[styles.infoLabel, { color: colors.secondary }]}>
									Temps limite:
								</Text>
								<Text style={[styles.infoValue, { color: colors.text }]}>
									{assessment.timeLimit} minutes
								</Text>
							</View>
							<View style={styles.infoRow}>
								<Text style={[styles.infoLabel, { color: colors.secondary }]}>
									Score minimum:
								</Text>
								<Text style={[styles.infoValue, { color: colors.text }]}>
									{assessment.passingScore}%
								</Text>
							</View>
						</View>
						<View style={styles.instructionsContainer}>
							<Text style={[styles.instructionsTitle, { color: colors.text }]}>
								📝 Instructions
							</Text>
							<Text
								style={[styles.instructionText, { color: colors.secondary }]}
							>
								• Lisez chaque question attentivement
							</Text>
							<Text
								style={[styles.instructionText, { color: colors.secondary }]}
							>
								• Vous pouvez naviguer entre les questions
							</Text>
							<Text
								style={[styles.instructionText, { color: colors.secondary }]}
							>
								• Attention au temps limite!
							</Text>
							<Text
								style={[styles.instructionText, { color: colors.secondary }]}
							>
								• Cliquez sur &quot;Terminer&quot; quand vous avez fini
							</Text>
						</View>
						<TouchableOpacity
							style={[styles.startButton, { backgroundColor: "#E91E63" }]}
							onPress={startAssessment}
						>
							<Text style={styles.startButtonText}>
								🚀 Commencer l&apos;Évaluation
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

	if (showResults) {
		const passed = score >= assessment.passingScore;
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.resultsContainer}>
					<Text style={[styles.resultsTitle, { color: colors.text }]}>
						{passed ? "🎉 Félicitations!" : "📚 Continuez vos efforts!"}
					</Text>
					<Text style={[styles.finalScore, { color: colors.text }]}>
						Score Final: {score}%
					</Text>
					<Text
						style={[
							styles.scoreStatus,
							{ color: passed ? "#4CAF50" : "#F44336" },
						]}
					>
						{passed
							? "✅ Évaluation réussie!"
							: `❌ Score minimum requis: ${assessment.passingScore}%`}
					</Text>

					<TouchableOpacity
						style={[
							styles.finishButton,
							{ backgroundColor: passed ? "#4CAF50" : "#E91E63" },
						]}
						onPress={handleFinish}
					>
						<Text style={styles.finishButtonText}>
							{passed ? "Continuer" : "Réessayer"}
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.assessmentContainer}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={[styles.questionCounter, { color: colors.text }]}>
						Question {currentQuestion + 1} / {questions.length}
					</Text>
					<Text
						style={[
							styles.timer,
							{ color: timeLeft < 60 ? "#F44336" : colors.secondary },
						]}
					>
						⏰ {formatTime(timeLeft)}
					</Text>
				</View>

				{/* Progress Bar */}
				<View style={[styles.progressBar, { backgroundColor: colors.card }]}>
					<View
						style={[
							styles.progress,
							{
								width: `${((currentQuestion + 1) / questions.length) * 100}%`,
								backgroundColor: "#E91E63",
							},
						]}
					/>
				</View>

				{/* Question */}
				<ScrollView style={styles.questionContainer}>
					<Text style={[styles.question, { color: colors.text }]}>
						{currentQ.question}
					</Text>

					{currentQ.type === "multiple_choice" && (
						<View style={styles.optionsContainer}>
							{currentQ.options?.map((option: string, index: number) => (
								<TouchableOpacity
									key={index}
									style={[
										styles.option,
										{
											backgroundColor:
												selectedOption === index ? "#E91E63" : colors.card,
											borderColor: colors.border,
										},
									]}
									onPress={() => setSelectedOption(index)}
								>
									<Text
										style={[
											styles.optionText,
											{
												color: selectedOption === index ? "white" : colors.text,
											},
										]}
									>
										{option}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					)}

					{(currentQ.type === "translation" ||
						currentQ.type === "fill_blank") && (
						<TextInput
							style={[
								styles.textInput,
								{
									backgroundColor: colors.card,
									borderColor: colors.border,
									color: colors.text,
								},
							]}
							value={userTextAnswer}
							onChangeText={setUserTextAnswer}
							placeholder="Votre réponse..."
							placeholderTextColor={colors.secondary}
							multiline={currentQ.type === "translation"}
							numberOfLines={currentQ.type === "translation" ? 3 : 1}
						/>
					)}
				</ScrollView>

				{/* Navigation */}
				<View style={styles.navigation}>
					<TouchableOpacity
						style={[
							styles.navButton,
							{
								backgroundColor:
									currentQuestion === 0 ? colors.secondary : colors.card,
								opacity: currentQuestion === 0 ? 0.5 : 1,
							},
						]}
						onPress={previousQuestion}
						disabled={currentQuestion === 0}
					>
						<Text style={[styles.navButtonText, { color: colors.text }]}>
							← Précédent
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.navButton, { backgroundColor: "#E91E63" }]}
						onPress={nextQuestion}
					>
						<Text style={styles.navButtonText}>
							{currentQuestion === questions.length - 1
								? "Terminer"
								: "Suivant →"}
						</Text>
					</TouchableOpacity>
				</View>
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
	introContainer: {
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 8,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 18,
		marginBottom: 24,
		textAlign: "center",
	},
	infoCard: {
		width: "100%",
		padding: 20,
		borderRadius: 12,
		marginBottom: 24,
	},
	infoTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 16,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	infoLabel: {
		fontSize: 14,
	},
	infoValue: {
		fontSize: 14,
		fontWeight: "bold",
	},
	instructionsContainer: {
		width: "100%",
		marginBottom: 32,
	},
	instructionsTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 12,
	},
	instructionText: {
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
	assessmentContainer: {
		flex: 1,
		padding: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	questionCounter: {
		fontSize: 16,
		fontWeight: "bold",
	},
	timer: {
		fontSize: 16,
		fontWeight: "bold",
	},
	progressBar: {
		height: 4,
		borderRadius: 2,
		marginBottom: 24,
	},
	progress: {
		height: "100%",
		borderRadius: 2,
	},
	questionContainer: {
		flex: 1,
		marginBottom: 24,
	},
	question: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 24,
	},
	optionsContainer: {
		gap: 12,
	},
	option: {
		padding: 16,
		borderRadius: 8,
		borderWidth: 2,
	},
	optionText: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "500",
	},
	textInput: {
		borderWidth: 2,
		borderRadius: 8,
		padding: 16,
		fontSize: 16,
		textAlignVertical: "top",
	},
	navigation: {
		flexDirection: "row",
		gap: 12,
	},
	navButton: {
		flex: 1,
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	navButtonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
	},
	resultsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
	},
	resultsTitle: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	finalScore: {
		fontSize: 48,
		fontWeight: "bold",
		marginBottom: 16,
	},
	scoreStatus: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 32,
	},
	finishButton: {
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 8,
	},
	finishButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});
