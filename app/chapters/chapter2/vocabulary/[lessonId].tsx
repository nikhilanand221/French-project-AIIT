import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
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
import { chapter2Data } from "../../../../data/chapter2/content";
import { useColorScheme } from "../../../../hooks/useColorScheme";

interface VocabularyCardProps {
	french: string;
	english: string;
	pronunciation: string;
	isFlipped: boolean;
	onFlip: () => void;
}

function VocabularyCard({
	french,
	english,
	pronunciation,
	isFlipped,
	onFlip,
}: VocabularyCardProps) {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];

	return (
		<TouchableOpacity
			style={[
				styles.card,
				{
					backgroundColor: colors.card,
					borderColor: colors.border,
				},
			]}
			onPress={onFlip}
		>
			<View style={styles.cardContent}>
				{!isFlipped ? (
					<>
						<Text style={[styles.frenchWord, { color: colors.text }]}>
							{french}
						</Text>
						<Text style={[styles.pronunciation, { color: colors.secondary }]}>
							{pronunciation}
						</Text>
						<Text style={[styles.flipHint, { color: colors.secondary }]}>
							Tap to see translation
						</Text>
					</>
				) : (
					<>
						<Text style={[styles.englishWord, { color: colors.text }]}>
							{english}
						</Text>
						<Text style={[styles.frenchSmall, { color: colors.secondary }]}>
							{french}
						</Text>
						<Text style={[styles.flipHint, { color: colors.secondary }]}>
							Tap to flip back
						</Text>
					</>
				)}
			</View>
		</TouchableOpacity>
	);
}

export default function VocabularyLesson() {
	const { lessonId } = useLocalSearchParams();
	const router = useRouter();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const { updateLessonProgress, addXP } = useProgress();

	const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showCelebration, setShowCelebration] = useState(false);
	const [lessonCompleted, setLessonCompleted] = useState(false);
	// Get vocabulary based on lesson
	const getVocabularyForLesson = (lessonId: string) => {
		switch (lessonId) {
			case "numbers":
				return chapter2Data.vocabulary.filter(
					(word) =>
						word.category === "numbers" || word.category === "basic_numbers"
				);
			case "time":
				return chapter2Data.vocabulary.filter(
					(word) =>
						word.category === "time" ||
						word.category === "temporal" ||
						word.category === "scheduling"
				);
			case "days":
				return chapter2Data.vocabulary.filter(
					(word) => word.category === "days" || word.category === "months"
				);
			default:
				return chapter2Data.vocabulary.slice(0, 8);
		}
	};

	const vocabulary = getVocabularyForLesson(lessonId as string);
	const currentWord = vocabulary[currentIndex];

	const handleFlip = () => {
		const newFlippedCards = new Set(flippedCards);
		if (flippedCards.has(currentIndex)) {
			newFlippedCards.delete(currentIndex);
		} else {
			newFlippedCards.add(currentIndex);
		}
		setFlippedCards(newFlippedCards);
	};

	const handleNext = () => {
		if (currentIndex < vocabulary.length - 1) {
			setCurrentIndex(currentIndex + 1);
		} else {
			// Lesson completed
			handleLessonComplete();
		}
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const handleLessonComplete = async () => {
		if (!lessonCompleted) {
			setLessonCompleted(true);

			// Update lesson progress
			await updateLessonProgress({
				lessonId: `chapter2-vocabulary-${lessonId}`,
				chapterId: "chapter2",
				completed: true,
				score: 100, // Full score for completing vocabulary
				timeSpent: Date.now() - startTime.current,
				completedAt: new Date(),
				attempts: 1,
			});

			// Award XP
			await addXP(50);

			// Show celebration
			setShowCelebration(true);
		}
	};
	const startTime = React.useRef(Date.now());

	const getLessonTitle = (lessonId: string) => {
		switch (lessonId) {
			case "lesson1":
				return "La Famille Proche";
			case "lesson3":
				return "La Famille Élargie";
			case "lesson4":
				return "Les Amis et Voisins";
			default:
				return "Vocabulaire";
		}
	};

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView style={styles.scrollView}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={[styles.lessonTitle, { color: colors.text }]}>
						{getLessonTitle(lessonId as string)}
					</Text>
					<Text style={[styles.progress, { color: colors.secondary }]}>
						{currentIndex + 1} / {vocabulary.length}
					</Text>
				</View>

				{/* Vocabulary Card */}
				<View style={styles.cardContainer}>
					<VocabularyCard
						french={currentWord.french}
						english={currentWord.english}
						pronunciation={currentWord.pronunciation}
						isFlipped={flippedCards.has(currentIndex)}
						onFlip={handleFlip}
					/>
				</View>

				{/* Navigation */}
				<View style={styles.navigation}>
					<TouchableOpacity
						style={[
							styles.navButton,
							{
								backgroundColor:
									currentIndex === 0 ? colors.secondary : "#E91E63",
								opacity: currentIndex === 0 ? 0.5 : 1,
							},
						]}
						onPress={handlePrevious}
						disabled={currentIndex === 0}
					>
						<Text style={styles.navButtonText}>← Précédent</Text>
					</TouchableOpacity>{" "}
					<TouchableOpacity
						style={[
							styles.navButton,
							{
								backgroundColor:
									currentIndex === vocabulary.length - 1
										? "#4CAF50"
										: "#E91E63",
							},
						]}
						onPress={
							currentIndex === vocabulary.length - 1
								? handleLessonComplete
								: handleNext
						}
					>
						<Text style={styles.navButtonText}>
							{currentIndex === vocabulary.length - 1
								? "Terminé ✓"
								: "Suivant →"}
						</Text>
					</TouchableOpacity>
				</View>

				{/* Word List */}
				<View style={styles.wordList}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						📚 Tous les mots de cette leçon
					</Text>
					{vocabulary.map((word: any, index: number) => (
						<TouchableOpacity
							key={index}
							style={[
								styles.wordItem,
								{
									backgroundColor:
										index === currentIndex ? "#E91E63" : colors.card,
									borderColor: colors.border,
								},
							]}
							onPress={() => setCurrentIndex(index)}
						>
							<Text
								style={[
									styles.wordFrench,
									{
										color: index === currentIndex ? "white" : colors.text,
									},
								]}
							>
								{word.french}
							</Text>
							<Text
								style={[
									styles.wordEnglish,
									{
										color: index === currentIndex ? "white" : colors.secondary,
									},
								]}
							>
								{word.english}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>

			{/* Celebration Modal */}
			<CelebrationModal
				visible={showCelebration}
				onClose={() => {
					setShowCelebration(false);
					router.back();
				}}
				type="lesson_complete"
				title="Félicitations !"
				message="Vous avez terminé cette leçon de vocabulaire avec succès !"
				xpEarned={50}
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
		padding: 16,
	},
	header: {
		alignItems: "center",
		marginBottom: 24,
	},
	lessonTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	progress: {
		fontSize: 16,
	},
	cardContainer: {
		alignItems: "center",
		marginBottom: 24,
	},
	card: {
		width: "100%",
		maxWidth: 350,
		height: 200,
		borderRadius: 16,
		borderWidth: 2,
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	cardContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	frenchWord: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 8,
	},
	pronunciation: {
		fontSize: 18,
		fontStyle: "italic",
		textAlign: "center",
		marginBottom: 16,
	},
	englishWord: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 8,
	},
	frenchSmall: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 16,
	},
	flipHint: {
		fontSize: 14,
		textAlign: "center",
		opacity: 0.7,
	},
	navigation: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 32,
		gap: 16,
	},
	navButton: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: "center",
	},
	navButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 16,
	},
	wordList: {
		marginBottom: 24,
	},
	wordItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 12,
		borderRadius: 8,
		borderWidth: 1,
		marginBottom: 8,
	},
	wordFrench: {
		fontSize: 16,
		fontWeight: "bold",
	},
	wordEnglish: {
		fontSize: 14,
	},
});
