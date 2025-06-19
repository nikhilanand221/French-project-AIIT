import AsyncStorage from "@react-native-async-storage/async-storage";

export const debugProgress = {
	// Clear all progress
	clearProgress: async () => {
		try {
			await AsyncStorage.removeItem("userProgress");
			console.log("Progress cleared successfully");
		} catch (error) {
			console.error("Error clearing progress:", error);
		}
	},

	// Log current progress
	logProgress: async () => {
		try {
			const progress = await AsyncStorage.getItem("userProgress");
			if (progress) {
				console.log("Current Progress:", JSON.parse(progress));
			} else {
				console.log("No progress found");
			}
		} catch (error) {
			console.error("Error reading progress:", error);
		}
	},

	// Unlock a specific chapter
	unlockChapter: async (chapterId: string) => {
		try {
			const progress = await AsyncStorage.getItem("userProgress");
			if (progress) {
				const parsed = JSON.parse(progress);
				parsed.chaptersProgress = parsed.chaptersProgress || {};
				parsed.chaptersProgress[chapterId] = {
					chapterId,
					lessonsCompleted: 0,
					totalLessons: 4,
					averageScore: 0,
					totalTimeSpent: 0,
					assessmentPassed: false,
					unlockedAt: new Date(),
				};
				await AsyncStorage.setItem("userProgress", JSON.stringify(parsed));
				console.log(`Chapter ${chapterId} unlocked`);
			}
		} catch (error) {
			console.error("Error unlocking chapter:", error);
		}
	},
};

// For debugging in dev tools
(global as any).debugProgress = debugProgress;
