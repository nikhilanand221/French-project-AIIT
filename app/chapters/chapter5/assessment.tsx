import { useRouter } from "expo-router";
import { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CelebrationModal } from "../../../components/CelebrationModal";
import { Colors } from "../../../constants/Colors";
import { useProgress } from "../../../contexts/ProgressContext";
import { useColorScheme } from "../../../hooks/useColorScheme";

interface AssessmentQuestion {
	id: string;
	type: "multiple-choice" | "fill-blank" | "translation" | "conversation";
	question: string;
	options?: string[];
	correct: string;
	points: number;
}

const assessmentQuestions: AssessmentQuestion[] = [
	{
		id: "1",
		type: "multiple-choice",
		question:
			"A journalist asks: 'Comment passez-vous vos soirées?' What's the best response?",
		options: [
			"Je travaille toujours le soir",
			"J'aime sortir avec mes amis en discothèque",
			"Je ne sors jamais",
		],
		correct: "J'aime sortir avec mes amis en discothèque",
		points: 5,
	},
	{
		id: "2",
		type: "multiple-choice",
		question:
			"How do you give a positive reply to 'Tu veux aller en boîte ce soir?'",
		options: [
			"Non, je déteste ça",
			"Oui, c'est une excellente idée!",
			"Je ne sais pas danser",
		],
		correct: "Oui, c'est une excellente idée!",
		points: 5,
	},
	{
		id: "3",
		type: "multiple-choice",
		question: "How do you give a negative reply to 'On va au café?'",
		options: [
			"Super! J'adore les cafés!",
			"Non merci, je préfère rester chez moi",
			"Quand est-ce qu'on y va?",
		],
		correct: "Non merci, je préfère rester chez moi",
		points: 5,
	},
	{
		id: "4",
		type: "multiple-choice",
		question:
			"Which question word would you use to ask WHERE someone wants to go?",
		options: ["Quand", "Où", "Pourquoi"],
		correct: "Où",
		points: 5,
	},
	{
		id: "5",
		type: "fill-blank",
		question:
			"Complete the question: '_____ est-ce que tu fais le soir?' (What do you do in the evening?)",
		correct: "Qu'est-ce que",
		points: 5,
	},
	{
		id: "6",
		type: "multiple-choice",
		question:
			"A journalist asks about your daily activities. What time expression fits: '_____, je prends l'apéritif avec mes amis.'",
		options: ["Le matin", "L'après-midi", "Le soir"],
		correct: "Le soir",
		points: 5,
	},
	{
		id: "7",
		type: "multiple-choice",
		question:
			"In a discussion about weekend plans, how do you ask when someone is free?",
		options: ["Où tu vas?", "Quand es-tu libre?", "Comment ça va?"],
		correct: "Quand es-tu libre?",
		points: 5,
	},
	{
		id: "8",
		type: "multiple-choice",
		question:
			"What's a typical evening activity mentioned in French nightlife culture?",
		options: ["Aller en discothèque", "Faire les devoirs", "Travailler tard"],
		correct: "Aller en discothèque",
		points: 5,
	},
	{
		id: "9",
		type: "conversation",
		question:
			"A journalist asks: 'Décrivez une soirée typique avec vos amis.' Give a complete response describing your evening activities.",
		correct:
			"Le soir, nous prenons l'apéritif, puis nous dînons au restaurant et après nous allons en discothèque pour danser",
		points: 15,
	},
	{
		id: "10",
		type: "conversation",
		question:
			"In a discussion with a friend planning weekend activities, respond positively to going to a bar and ask a follow-up question.",
		correct:
			"Oui, j'aimerais bien aller au bar! À quelle heure on se retrouve?",
		points: 15,
	},
];

export default function AssessmentScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const router = useRouter();
	const { updateLessonProgress, addXP, unlockChapter } = useProgress();

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<{ [key: string]: string }>({});
	const [assessmentCompleted, setAssessmentCompleted] = useState(false);
	const [showCelebration, setShowCelebration] = useState(false);
	const [score, setScore] = useState(0);
	const [results, setResults] = useState<{ [key: string]: boolean }>({});

	const question = assessmentQuestions[currentQuestion];
	const totalQuestions = assessmentQuestions.length;
	const progress = ((currentQuestion + 1) / totalQuestions) * 100;

	const handleAnswerChange = (questionId: string, answer: string) => {
		setAnswers((prev) => ({ ...prev, [questionId]: answer }));
	};

	const handleNext = () => {
		if (currentQuestion < totalQuestions - 1) {
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
		let totalScore = 0;
		let totalPoints = 0;
		const questionResults: { [key: string]: boolean } = {};

		// Calculate score
		assessmentQuestions.forEach((q) => {
			const userAnswer = answers[q.id]?.toLowerCase().trim();
			const correctAnswer = q.correct.toLowerCase().trim();
			const isCorrect = userAnswer === correctAnswer;

			if (isCorrect) {
				totalScore += q.points;
			}
			totalPoints += q.points;
			questionResults[q.id] = isCorrect;
		});

		const percentage = Math.round((totalScore / totalPoints) * 100);
		setScore(percentage);
		setResults(questionResults);

		// Determine XP and unlock next chapter
		let xpEarned = 0;
		if (percentage >= 90) {
			xpEarned = 100;
		} else if (percentage >= 80) {
			xpEarned = 80;
		} else if (percentage >= 70) {
			xpEarned = 60;
		} else if (percentage >= 60) {
			xpEarned = 40;
		} else {
			xpEarned = 20;
		}

		// Update progress
		await updateLessonProgress({
			lessonId: "assessment-chapter5",
			chapterId: "chapter5",
			completed: true,
			score: percentage,
			timeSpent: 0,
			attempts: 1,
		});

		// Add XP
		await addXP(xpEarned);

		// Unlock next chapter if score is high enough
		if (percentage >= 70) {
			await unlockChapter("chapter6");
		}

		setAssessmentCompleted(true);
		setShowCelebration(true);
	};

	const restartAssessment = () => {
		setCurrentQuestion(0);
		setAnswers({});
		setAssessmentCompleted(false);
		setShowCelebration(false);
		setScore(0);
		setResults({});
	};

	if (assessmentCompleted) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<ScrollView style={styles.content}>
					<View style={styles.completionContainer}>
						<Text style={[styles.completionTitle, { color: colors.text }]}>
							🎯 Évaluation Terminée!
						</Text>
						<Text style={[styles.completionScore, { color: colors.text }]}>
							Score Final: {score}%
						</Text>

						<View
							style={[styles.resultsSummary, { backgroundColor: colors.card }]}
						>
							<Text style={[styles.resultsTitle, { color: colors.text }]}>
								Résultats Détaillés
							</Text>
							{assessmentQuestions.map((q, index) => (
								<View key={q.id} style={styles.resultItem}>
									<Text
										style={[
											styles.resultText,
											{ color: colors.text },
											results[q.id]
												? styles.correctResult
												: styles.incorrectResult,
										]}
									>
										Question {index + 1}: {results[q.id] ? "✅" : "❌"} (
										{q.points} pts)
									</Text>
								</View>
							))}
						</View>

						<Text style={[styles.completionMessage, { color: colors.text }]}>
							{score >= 90
								? "🌟 Parfait! Vous maîtrisez parfaitement les activités du weekend en français!"
								: score >= 80
								? "🎉 Excellent travail! Vous avez une très bonne compréhension du chapitre."
								: score >= 70
								? "👏 Bon travail! Vous avez réussi l'évaluation. Continuez à pratiquer!"
								: score >= 60
								? "📚 Pas mal! Révisez les points difficiles et réessayez."
								: "💪 Continuez à étudier! Révisez le chapitre et recommencez l'évaluation."}
						</Text>

						{score >= 70 && (
							<Text style={[styles.unlockMessage, { color: colors.text }]}>
								🎊 Félicitations! Vous avez débloqué le Chapitre 6!
							</Text>
						)}

						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={[styles.button, styles.primaryButton]}
								onPress={restartAssessment}
							>
								<Text style={styles.buttonText}>Recommencer</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.secondaryButton]}
								onPress={() => router.push("/")}
							>
								<Text style={[styles.buttonText, { color: colors.text }]}>
									Accueil
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>

				<CelebrationModal
					visible={showCelebration}
					onClose={() => setShowCelebration(false)}
					title="Évaluation Terminée!"
					message={`Vous avez obtenu ${score}% !`}
					type={score >= 90 ? "perfect_score" : "lesson_complete"}
				/>
			</SafeAreaView>
		);
	}

	const currentAnswer = answers[question.id] || "";

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView style={styles.content}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={[styles.title, { color: colors.text }]}>
						Évaluation - Chapitre 5
					</Text>
					<Text style={[styles.subtitle, { color: colors.text }]}>
						Weekend Fun Activities
					</Text>
				</View>

				{/* Progress */}
				<View style={styles.progressContainer}>
					<Text style={[styles.progressText, { color: colors.text }]}>
						Question {currentQuestion + 1} sur {totalQuestions}
					</Text>
					<View style={styles.progressBar}>
						<View style={[styles.progressFill, { width: `${progress}%` }]} />
					</View>
				</View>

				{/* Question */}
				<View
					style={[styles.questionContainer, { backgroundColor: colors.card }]}
				>
					<Text style={[styles.questionType, { color: colors.text }]}>
						{question.type === "multiple-choice" && "Choix Multiple"}
						{question.type === "fill-blank" && "Complétez"}
						{question.type === "translation" && "Traduction"}
						{question.type === "conversation" && "Expression"}
					</Text>
					<Text style={[styles.questionText, { color: colors.text }]}>
						{question.question}
					</Text>
					<Text style={[styles.pointsText, { color: colors.text }]}>
						{question.points} points
					</Text>

					{/* Answer Input */}
					{question.type !== "multiple-choice" && (
						<TextInput
							style={[
								styles.textInput,
								{
									backgroundColor: colors.background,
									color: colors.text,
									borderColor: colors.text + "30",
								},
							]}
							value={currentAnswer}
							onChangeText={(text) => handleAnswerChange(question.id, text)}
							placeholder="Votre réponse..."
							placeholderTextColor={colors.text + "60"}
							multiline={
								question.type === "translation" ||
								question.type === "conversation"
							}
							numberOfLines={
								question.type === "translation" ||
								question.type === "conversation"
									? 3
									: 1
							}
						/>
					)}

					{/* Multiple Choice Options */}
					{question.type === "multiple-choice" && question.options && (
						<View style={styles.optionsContainer}>
							{question.options.map((option, index) => (
								<TouchableOpacity
									key={index}
									style={[
										styles.optionButton,
										{ backgroundColor: colors.background },
										currentAnswer === option && styles.selectedOption,
									]}
									onPress={() => handleAnswerChange(question.id, option)}
								>
									<Text
										style={[
											styles.optionText,
											{ color: colors.text },
											currentAnswer === option && styles.selectedOptionText,
										]}
									>
										{option}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					)}
				</View>

				{/* Navigation */}
				<View style={styles.navigationContainer}>
					<TouchableOpacity
						style={[
							styles.navButton,
							styles.secondaryButton,
							currentQuestion === 0 && styles.disabledButton,
						]}
						onPress={handlePrevious}
						disabled={currentQuestion === 0}
					>
						<Text style={[styles.navButtonText, { color: colors.text }]}>
							Précédent
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.navButton,
							styles.primaryButton,
							!currentAnswer && styles.disabledButton,
						]}
						onPress={handleNext}
						disabled={!currentAnswer}
					>
						<Text style={styles.navButtonText}>
							{currentQuestion === totalQuestions - 1 ? "Terminer" : "Suivant"}
						</Text>
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
	progressContainer: {
		marginBottom: 20,
	},
	progressText: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		textAlign: "center",
	},
	progressBar: {
		height: 8,
		backgroundColor: "#e0e0e0",
		borderRadius: 4,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		backgroundColor: "#007AFF",
		borderRadius: 4,
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
	questionType: {
		fontSize: 14,
		fontWeight: "600",
		opacity: 0.7,
		marginBottom: 8,
		textAlign: "center",
	},
	questionText: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 8,
		textAlign: "center",
	},
	pointsText: {
		fontSize: 14,
		fontWeight: "500",
		opacity: 0.6,
		textAlign: "center",
		marginBottom: 15,
	},
	textInput: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 15,
		fontSize: 16,
		minHeight: 50,
		textAlignVertical: "top",
	},
	optionsContainer: {
		gap: 10,
	},
	optionButton: {
		padding: 15,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	selectedOption: {
		backgroundColor: "#007AFF",
		borderColor: "#007AFF",
	},
	optionText: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "500",
	},
	selectedOptionText: {
		color: "white",
	},
	navigationContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 15,
	},
	navButton: {
		flex: 1,
		paddingVertical: 15,
		borderRadius: 8,
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
	disabledButton: {
		backgroundColor: "#ccc",
		borderColor: "#ccc",
	},
	navButtonText: {
		fontSize: 16,
		fontWeight: "600",
		color: "white",
	},
	completionContainer: {
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
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
		color: "#007AFF",
	},
	resultsSummary: {
		width: "100%",
		padding: 20,
		borderRadius: 12,
		marginBottom: 20,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	resultsTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
	resultItem: {
		marginBottom: 8,
	},
	resultText: {
		fontSize: 14,
		fontWeight: "500",
	},
	correctResult: {
		color: "#28a745",
	},
	incorrectResult: {
		color: "#dc3545",
	},
	completionMessage: {
		fontSize: 18,
		textAlign: "center",
		marginBottom: 20,
		opacity: 0.8,
		lineHeight: 24,
	},
	unlockMessage: {
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 20,
		color: "#28a745",
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
	buttonText: {
		fontSize: 16,
		fontWeight: "600",
		color: "white",
	},
});
