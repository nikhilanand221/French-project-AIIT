import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useProgress } from "../../../contexts/ProgressContext";
import { chapter5Data } from "../../../data/chapter5/content";

const lessons = [
	{
		id: "social-venues",
		title: "Social Venues & Nightlife",
		description: "Learn about cafés, bars, discos, and cultural venues",
		icon: "musical-notes" as const,
		color: "#FF6B6B",
		estimatedTime: "15 min",
	},
	{
		id: "preferences-opinions",
		title: "Preferences & Opinions",
		description:
			"Express what you like, dislike, and prefer in social situations",
		icon: "heart" as const,
		color: "#4ECDC4",
		estimatedTime: "12 min",
	},
	{
		id: "questions-conversation",
		title: "Questions & Conversation",
		description: "Ask questions and hold engaging conversations",
		icon: "chatbubbles" as const,
		color: "#45B7D1",
		estimatedTime: "18 min",
	},
	{
		id: "daily-activities",
		title: "Daily Activities",
		description: "Describe activities throughout the day",
		icon: "time" as const,
		color: "#96CEB4",
		estimatedTime: "14 min",
	},
];

export default function Chapter5Screen() {
	const { getLessonProgress } = useProgress();

	const getLessonStatus = (lessonId: string) => {
		const vocabProgress = getLessonProgress(`chapter5_vocabulary_${lessonId}`);
		const exerciseProgress = getLessonProgress(
			`chapter5_exercises_${lessonId}`
		);
		const gameProgress = getLessonProgress(`chapter5_games_${lessonId}`);

		const completed = [vocabProgress, exerciseProgress, gameProgress].filter(
			(p) => p?.completed
		).length;
		const total = 3;

		return { completed, total, percentage: (completed / total) * 100 };
	};

	const getOverallProgress = () => {
		let totalCompleted = 0;
		let totalSections = 0;

		lessons.forEach((lesson) => {
			const status = getLessonStatus(lesson.id);
			totalCompleted += status.completed;
			totalSections += status.total;
		});

		// Add assessment
		const assessmentProgress = getLessonProgress("chapter5_assessment");
		if (assessmentProgress?.completed) totalCompleted += 1;
		totalSections += 1;

		return (totalCompleted / totalSections) * 100;
	};
	const handleLessonPress = (type: string, lessonId: string) => {
		router.push(`/chapters/chapter5/${type}/${lessonId}` as any);
	};

	const handleAssessmentPress = () => {
		router.push("/chapters/chapter5/assessment" as any);
	};

	const overallProgress = getOverallProgress();

	return (
		<ScrollView style={styles.container}>
			{/* Header Section */}
			<View style={styles.header}>
				<View style={styles.headerContent}>
					<Text style={styles.chapterNumber}>Chapter 5</Text>
					<Text style={styles.chapterTitle}>{chapter5Data.title}</Text>
					<Text style={styles.chapterSubtitle}>{chapter5Data.subtitle}</Text>
					<Text style={styles.chapterDescription}>
						{chapter5Data.description}
					</Text>
				</View>
				<Text style={styles.chapterEmoji}>{chapter5Data.emoji}</Text>
			</View>
			{/* Progress Overview */}
			<View style={styles.progressSection}>
				<Text style={styles.progressTitle}>Your Progress</Text>
				<View style={styles.progressBar}>
					<View
						style={[styles.progressFill, { width: `${overallProgress}%` }]}
					/>
				</View>
				<Text style={styles.progressText}>
					{Math.round(overallProgress)}% Complete
				</Text>
			</View>
			{/* Story Context */}
			<View style={styles.storySection}>
				<Text style={styles.storyTitle}>🎭 Your Story</Text>
				<Text style={styles.storyText}>{chapter5Data.story.intro}</Text>
				<View style={styles.storyDetails}>
					<View style={styles.storyDetail}>
						<Ionicons name="location" size={16} color="#FF6B6B" />
						<Text style={styles.storyDetailText}>
							{chapter5Data.story.setting}
						</Text>
					</View>
					<View style={styles.storyDetail}>
						<Ionicons name="person" size={16} color="#4ECDC4" />
						<Text style={styles.storyDetailText}>
							{chapter5Data.story.character}
						</Text>
					</View>
				</View>
			</View>
			{/* Learning Objectives */}
			<View style={styles.objectivesSection}>
				<Text style={styles.objectivesTitle}>🎯 Learning Goals</Text>
				{chapter5Data.objectives.map((objective, index) => (
					<View key={index} style={styles.objective}>
						<Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
						<Text style={styles.objectiveText}>{objective}</Text>
					</View>
				))}
			</View>{" "}
			{/* Lessons */}
			<View style={styles.lessonsSection}>
				<Text style={styles.lessonsTitle}>📚 Lessons</Text>
				{lessons.map((lesson, index) => {
					const status = getLessonStatus(lesson.id);
					return (
						<View key={lesson.id} style={styles.lessonCard}>
							<View
								style={[styles.lessonIcon, { backgroundColor: lesson.color }]}
							>
								<Ionicons name={lesson.icon} size={24} color="#fff" />
							</View>
							<View style={styles.lessonContent}>
								<Text style={styles.lessonTitle}>{lesson.title}</Text>
								<Text style={styles.lessonDescription}>
									{lesson.description}
								</Text>
								<View style={styles.lessonMeta}>
									<Text style={styles.lessonTime}>{lesson.estimatedTime}</Text>
									<Text style={styles.lessonProgress}>
										{status.completed}/{status.total} completed
									</Text>
								</View>

								{/* Activity buttons */}
								<View style={styles.activityButtons}>
									<TouchableOpacity
										style={styles.activityButton}
										onPress={() => handleLessonPress("vocabulary", lesson.id)}
									>
										<Ionicons name="book" size={16} color="#007AFF" />
										<Text style={styles.activityButtonText}>Vocabulary</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.activityButton}
										onPress={() => handleLessonPress("exercises", lesson.id)}
									>
										<Ionicons name="create" size={16} color="#007AFF" />
										<Text style={styles.activityButtonText}>Exercises</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.activityButton}
										onPress={() => handleLessonPress("games", lesson.id)}
									>
										<Ionicons
											name="game-controller"
											size={16}
											color="#007AFF"
										/>
										<Text style={styles.activityButtonText}>Games</Text>
									</TouchableOpacity>
								</View>
							</View>
							<View style={styles.lessonStatus}>
								{status.percentage === 100 ? (
									<Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
								) : status.percentage > 0 ? (
									<View style={styles.progressCircle}>
										<Text style={styles.progressCircleText}>
											{Math.round(status.percentage)}%
										</Text>
									</View>
								) : (
									<Ionicons name="play-circle" size={24} color="#666" />
								)}
							</View>
						</View>
					);
				})}
			</View>
			{/* Cultural Insights */}
			<View style={styles.cultureSection}>
				<Text style={styles.cultureTitle}>🇫🇷 Cultural Insights</Text>
				{chapter5Data.culture.map((insight, index) => (
					<View key={index} style={styles.cultureCard}>
						<Text style={styles.cultureCardTitle}>{insight.title}</Text>
						<Text style={styles.cultureCardText}>{insight.description}</Text>
					</View>
				))}
			</View>
			{/* Assessment */}
			<View style={styles.assessmentSection}>
				<Text style={styles.assessmentTitle}>🏆 Chapter Assessment</Text>
				<TouchableOpacity
					style={styles.assessmentCard}
					onPress={handleAssessmentPress}
				>
					<View style={styles.assessmentIcon}>
						<Ionicons name="trophy" size={32} color="#FFD700" />
					</View>
					<View style={styles.assessmentContent}>
						<Text style={styles.assessmentCardTitle}>Final Assessment</Text>
						<Text style={styles.assessmentDescription}>
							Test your knowledge of French social life and conversation skills
						</Text>
						<Text style={styles.assessmentMeta}>10 questions • 15 minutes</Text>
					</View>
					<View style={styles.assessmentStatus}>
						{getLessonProgress("chapter5_assessment")?.completed ? (
							<Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
						) : (
							<Ionicons name="play-circle" size={24} color="#FF6B6B" />
						)}
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
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
		padding: 20,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	headerContent: {
		flex: 1,
	},
	chapterNumber: {
		fontSize: 14,
		color: "#666",
		fontWeight: "500",
	},
	chapterTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#003366",
		marginVertical: 4,
	},
	chapterSubtitle: {
		fontSize: 16,
		color: "#666",
		marginBottom: 8,
	},
	chapterDescription: {
		fontSize: 14,
		color: "#333",
		lineHeight: 20,
	},
	chapterEmoji: {
		fontSize: 48,
		marginLeft: 16,
	},
	progressSection: {
		padding: 20,
		backgroundColor: "#fff",
		marginTop: 8,
	},
	progressTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#003366",
		marginBottom: 12,
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
	storySection: {
		padding: 20,
		backgroundColor: "#fff",
		marginTop: 8,
	},
	storyTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#003366",
		marginBottom: 12,
	},
	storyText: {
		fontSize: 14,
		color: "#333",
		lineHeight: 22,
		marginBottom: 16,
	},
	storyDetails: {
		gap: 8,
	},
	storyDetail: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	storyDetailText: {
		fontSize: 13,
		color: "#666",
		flex: 1,
	},
	objectivesSection: {
		padding: 20,
		backgroundColor: "#fff",
		marginTop: 8,
	},
	objectivesTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#003366",
		marginBottom: 16,
	},
	objective: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 8,
		marginBottom: 8,
	},
	objectiveText: {
		fontSize: 14,
		color: "#333",
		flex: 1,
		lineHeight: 20,
	},
	lessonsSection: {
		padding: 20,
		backgroundColor: "#fff",
		marginTop: 8,
	},
	lessonsTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#003366",
		marginBottom: 16,
	},
	lessonCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#f9f9f9",
		borderRadius: 12,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	lessonIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},
	lessonContent: {
		flex: 1,
	},
	lessonTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#003366",
		marginBottom: 4,
	},
	lessonDescription: {
		fontSize: 14,
		color: "#666",
		marginBottom: 8,
	},
	lessonMeta: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	lessonTime: {
		fontSize: 12,
		color: "#999",
	},
	lessonProgress: {
		fontSize: 12,
		color: "#4CAF50",
		fontWeight: "500",
	},
	lessonStatus: {
		marginLeft: 16,
	},
	progressCircle: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: "#e0e0e0",
		justifyContent: "center",
		alignItems: "center",
	},
	progressCircleText: {
		fontSize: 10,
		fontWeight: "600",
		color: "#666",
	},
	cultureSection: {
		padding: 20,
		backgroundColor: "#fff",
		marginTop: 8,
	},
	cultureTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#003366",
		marginBottom: 16,
	},
	cultureCard: {
		padding: 16,
		backgroundColor: "#f0f7ff",
		borderRadius: 12,
		marginBottom: 12,
		borderLeftWidth: 4,
		borderLeftColor: "#2196F3",
	},
	cultureCardTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1976D2",
		marginBottom: 8,
	},
	cultureCardText: {
		fontSize: 14,
		color: "#333",
		lineHeight: 20,
	},
	assessmentSection: {
		padding: 20,
		backgroundColor: "#fff",
		marginTop: 8,
		marginBottom: 20,
	},
	assessmentTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#003366",
		marginBottom: 16,
	},
	assessmentCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff9e6",
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#FFD700",
	},
	assessmentIcon: {
		marginRight: 16,
	},
	assessmentContent: {
		flex: 1,
	},
	assessmentCardTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#003366",
		marginBottom: 4,
	},
	assessmentDescription: {
		fontSize: 14,
		color: "#666",
		marginBottom: 8,
	},
	assessmentMeta: {
		fontSize: 12,
		color: "#999",
	},
	assessmentStatus: {
		marginLeft: 16,
	},
	activityButtons: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 12,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: "#e0e0e0",
	},
	activityButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: "#f0f8ff",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#007AFF",
	},
	activityButtonText: {
		fontSize: 12,
		color: "#007AFF",
		fontWeight: "500",
		marginLeft: 4,
	},
});
