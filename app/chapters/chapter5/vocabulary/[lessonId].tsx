import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { CelebrationModal } from "../../../../components/CelebrationModal";
import { useProgress } from "../../../../contexts/ProgressContext";
import { chapter5Data } from "../../../../data/chapter5/content";

const lessonMappings = {
	"social-venues": {
		title: "Social Venues & Nightlife",
		categories: ["social_venues"],
	},
	"preferences-opinions": {
		title: "Preferences & Opinions",
		categories: ["preferences", "positive_opinions", "negative_opinions"],
	},
	"questions-conversation": {
		title: "Questions & Conversation",
		categories: ["question_words"],
	},
	"daily-activities": {
		title: "Daily Activities",
		categories: ["social_activities", "time_expressions"], // Activities and time expressions
	},
};

export default function VocabularyScreen() {
	const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
	const { updateLessonProgress, addXP } = useProgress();
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
	const [showCelebration, setShowCelebration] = useState(false);
	const lessonMapping = lessonMappings[lessonId as keyof typeof lessonMappings];
	const vocabularyWords = chapter5Data.vocabulary.filter((word) =>
		lessonMapping?.categories.includes(word.category)
	);

	useEffect(() => {
		if (!lessonMapping) {
			Alert.alert("Error", "Lesson not found", [
				{
					text: "Go Back",
					onPress: () => router.back(),
				},
			]);
		}
	}, [lessonMapping]);

	// Don't render if lesson is not found
	if (!lessonMapping || vocabularyWords.length === 0) {
		return null;
	}

	const handleCardFlip = () => {
		setIsFlipped(!isFlipped);
		if (!isFlipped) {
			setStudiedCards((prev) => new Set([...prev, currentCardIndex]));
		}
	};

	const handleNextCard = () => {
		if (currentCardIndex < vocabularyWords.length - 1) {
			setCurrentCardIndex(currentCardIndex + 1);
			setIsFlipped(false);
		} else {
			handleCompleteLesson();
		}
	};

	const handlePreviousCard = () => {
		if (currentCardIndex > 0) {
			setCurrentCardIndex(currentCardIndex - 1);
			setIsFlipped(false);
		}
	};

	const handleCompleteLesson = async () => {
		const completionRate = (studiedCards.size / vocabularyWords.length) * 100;
		const xpGained = Math.round(completionRate / 10) * 2; // 2 XP per 10% completion

		await updateLessonProgress({
			chapterId: "chapter5",
			lessonId: `vocabulary_${lessonId}`,
			completed: completionRate >= 80,
			score: completionRate,
			timeSpent: 0,
			attempts: 1,
		});

		await addXP(xpGained);

		if (completionRate >= 80) {
			setShowCelebration(true);
		} else {
			Alert.alert(
				"Keep Practicing!",
				`You've studied ${studiedCards.size}/${vocabularyWords.length} words. Try to review more cards to complete the lesson.`,
				[
					{ text: "Continue Studying", style: "default" },
					{ text: "Back to Chapter", onPress: () => router.back() },
				]
			);
		}
	};

	if (!lessonMapping || vocabularyWords.length === 0) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>
					No vocabulary available for this lesson.
				</Text>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => router.back()}
				>
					<Text style={styles.backButtonText}>Go Back</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const currentWord = vocabularyWords[currentCardIndex];
	const progress = ((currentCardIndex + 1) / vocabularyWords.length) * 100;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => router.back()}
					style={styles.backIconButton}
				>
					<Ionicons name="arrow-back" size={24} color="#003366" />
				</TouchableOpacity>
				<Text style={styles.title}>{lessonMapping.title}</Text>
				<Text style={styles.cardCounter}>
					{currentCardIndex + 1}/{vocabularyWords.length}
				</Text>
			</View>

			<View style={styles.progressContainer}>
				<View style={styles.progressBar}>
					<View style={[styles.progressFill, { width: `${progress}%` }]} />
				</View>
				<Text style={styles.progressText}>
					Studied: {studiedCards.size}/{vocabularyWords.length} words
				</Text>
			</View>

			<ScrollView
				style={styles.content}
				contentContainerStyle={styles.contentContainer}
			>
				<TouchableOpacity style={styles.flashcard} onPress={handleCardFlip}>
					<View style={styles.cardContent}>
						{!isFlipped ? (
							<View style={styles.cardFront}>
								<Text style={styles.frenchWord}>{currentWord.french}</Text>
								<Text style={styles.pronunciation}>
									[{currentWord.pronunciation}]
								</Text>
								<Text style={styles.category}>
									{currentWord.category.replace("_", " ")}
								</Text>
								<Text style={styles.tapHint}>Tap to reveal meaning</Text>
							</View>
						) : (
							<View style={styles.cardBack}>
								<Text style={styles.englishWord}>{currentWord.english}</Text>
								<Text style={styles.frenchWordSmall}>{currentWord.french}</Text>
								<Text style={styles.pronunciationSmall}>
									[{currentWord.pronunciation}]
								</Text>
								{studiedCards.has(currentCardIndex) && (
									<View style={styles.studiedBadge}>
										<Ionicons
											name="checkmark-circle"
											size={20}
											color="#4CAF50"
										/>
										<Text style={styles.studiedText}>Studied</Text>
									</View>
								)}
							</View>
						)}
					</View>
				</TouchableOpacity>

				{/* Example usage or cultural context */}
				{isFlipped && (
					<View style={styles.contextSection}>
						<Text style={styles.contextTitle}>💡 Usage Context</Text>
						<Text style={styles.contextText}>
							{getUsageExample(currentWord.french, currentWord.category)}
						</Text>
					</View>
				)}
			</ScrollView>

			<View style={styles.navigationButtons}>
				<TouchableOpacity
					style={[
						styles.navButton,
						currentCardIndex === 0 && styles.navButtonDisabled,
					]}
					onPress={handlePreviousCard}
					disabled={currentCardIndex === 0}
				>
					<Ionicons
						name="chevron-back"
						size={20}
						color={currentCardIndex === 0 ? "#ccc" : "#003366"}
					/>
					<Text
						style={[
							styles.navButtonText,
							currentCardIndex === 0 && styles.navButtonTextDisabled,
						]}
					>
						Previous
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.flipButton} onPress={handleCardFlip}>
					<Ionicons name="refresh" size={20} color="#2196F3" />
					<Text style={styles.flipButtonText}>Flip Card</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.navButton, styles.nextButton]}
					onPress={handleNextCard}
				>
					<Text style={[styles.navButtonText, styles.nextButtonText]}>
						{currentCardIndex === vocabularyWords.length - 1
							? "Complete"
							: "Next"}
					</Text>
					<Ionicons
						name={
							currentCardIndex === vocabularyWords.length - 1
								? "checkmark"
								: "chevron-forward"
						}
						size={20}
						color="#fff"
					/>
				</TouchableOpacity>
			</View>

			<CelebrationModal
				visible={showCelebration}
				onClose={() => setShowCelebration(false)}
				type="lesson_complete"
				title="Vocabulary Mastered!"
				message={`Great job! You've learned ${studiedCards.size} new French words!`}
			/>
		</View>
	);
}

function getUsageExample(word: string, category: string): string {
	const examples: { [key: string]: { [key: string]: string } } = {
		social_venues: {
			"la discothèque":
				'We often say "aller en boîte" (go clubbing) when talking about going to a nightclub.',
			"le café":
				"French cafés are central to social life - perfect for meeting friends or people-watching.",
			"le bar":
				"French bars often serve as meeting places before heading to restaurants or clubs.",
		},
		preferences: {
			"j'aime":
				'Use this to express things you like: "J\'aime danser" (I like dancing).',
			"je préfère":
				'Perfect for comparing options: "Je préfère le cinéma au théâtre" (I prefer cinema to theater).',
		},
		question_words: {
			qui: 'Essential for asking about people: "Qui vient ce soir?" (Who\'s coming tonight?)',
			quand:
				'Use for time questions: "Quand est-ce qu\'on se retrouve?" (When do we meet?)',
		},
	};

	return (
		examples[category]?.[word] ||
		`"${word}" is commonly used in French social situations and conversations.`
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
	backIconButton: {
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
	cardCounter: {
		fontSize: 14,
		color: "#666",
		fontWeight: "500",
	},
	progressContainer: {
		padding: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	progressBar: {
		height: 6,
		backgroundColor: "#e0e0e0",
		borderRadius: 3,
		marginBottom: 8,
	},
	progressFill: {
		height: "100%",
		backgroundColor: "#4CAF50",
		borderRadius: 3,
	},
	progressText: {
		fontSize: 12,
		color: "#666",
		textAlign: "center",
	},
	content: {
		flex: 1,
	},
	contentContainer: {
		padding: 20,
		alignItems: "center",
	},
	flashcard: {
		width: "100%",
		height: 300,
		marginBottom: 20,
	},
	cardContent: {
		flex: 1,
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 24,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
		borderWidth: 2,
		borderColor: "#e3f2fd",
	},
	cardFront: {
		alignItems: "center",
	},
	cardBack: {
		alignItems: "center",
	},
	frenchWord: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#003366",
		marginBottom: 12,
		textAlign: "center",
	},
	pronunciation: {
		fontSize: 16,
		color: "#666",
		fontStyle: "italic",
		marginBottom: 16,
	},
	category: {
		fontSize: 12,
		color: "#2196F3",
		textTransform: "uppercase",
		letterSpacing: 1,
		marginBottom: 20,
	},
	tapHint: {
		fontSize: 14,
		color: "#999",
		fontStyle: "italic",
	},
	englishWord: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#4CAF50",
		marginBottom: 16,
		textAlign: "center",
	},
	frenchWordSmall: {
		fontSize: 20,
		color: "#003366",
		marginBottom: 8,
	},
	pronunciationSmall: {
		fontSize: 14,
		color: "#666",
		fontStyle: "italic",
		marginBottom: 16,
	},
	studiedBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: "#e8f5e8",
		borderRadius: 16,
	},
	studiedText: {
		fontSize: 12,
		color: "#4CAF50",
		fontWeight: "500",
	},
	contextSection: {
		width: "100%",
		backgroundColor: "#f0f7ff",
		padding: 16,
		borderRadius: 12,
		marginTop: 8,
	},
	contextTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1976D2",
		marginBottom: 8,
	},
	contextText: {
		fontSize: 14,
		color: "#333",
		lineHeight: 20,
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
	flipButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#2196F3",
		backgroundColor: "#e3f2fd",
		gap: 8,
	},
	flipButtonText: {
		fontSize: 14,
		color: "#2196F3",
		fontWeight: "500",
	},
	errorText: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginTop: 50,
	},
	backButton: {
		margin: 20,
		padding: 16,
		backgroundColor: "#003366",
		borderRadius: 8,
		alignItems: "center",
	},
	backButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
