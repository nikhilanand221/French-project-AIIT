import AsyncStorage from "@react-native-async-storage/async-storage";

export const simulateChapter1Completion = async () => {
	try {
		const progress = await AsyncStorage.getItem("userProgress");
		let parsed = progress
			? JSON.parse(progress)
			: {
					level: 1,
					totalXP: 0,
					streak: 0,
					lessonsProgress: {},
					chaptersProgress: {},
					achievements: [],
			  };

		// Simulate chapter 1 completion with assessment passed
		parsed.lessonsProgress = parsed.lessonsProgress || {};
		parsed.chaptersProgress = parsed.chaptersProgress || {};

		// Add chapter 1 progress
		parsed.chaptersProgress["chapter1"] = {
			chapterId: "chapter1",
			lessonsCompleted: 4,
			totalLessons: 4,
			averageScore: 85,
			totalTimeSpent: 1200,
			assessmentPassed: true,
			assessmentScore: 85,
			unlockedAt: new Date(Date.now() - 86400000), // 1 day ago
			completedAt: new Date(),
		};

		// Add assessment lesson progress
		const assessmentKey = `assessment_chapter1_${Date.now()}`;
		parsed.lessonsProgress[assessmentKey] = {
			lessonId: "assessment",
			chapterId: "chapter1",
			completed: true,
			score: 85,
			timeSpent: 300,
			completedAt: new Date(),
			attempts: 1,
		};

		// Add some XP
		parsed.totalXP = 200;
		parsed.level = 1;

		await AsyncStorage.setItem("userProgress", JSON.stringify(parsed));
		console.log("Chapter 1 completion simulated successfully");
		return parsed;
	} catch (error) {
		console.error("Error simulating chapter 1 completion:", error);
	}
};

// Make available globally for testing
(global as any).simulateChapter1Completion = simulateChapter1Completion;
