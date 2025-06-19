import { useEffect, useState } from "react";
import { UserService } from "../services/userService";
import { UserProgress } from "../types/Game";

export function useProgress() {
	const [progress, setProgress] = useState<UserProgress | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadProgress();
	}, []);

	const loadProgress = async () => {
		try {
			const progressData = await UserService.getProgress();
			setProgress(progressData);
		} catch (error) {
			console.error("Error loading progress:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateChapterProgress = async (
		chapterId: number,
		progressUpdate: Partial<UserProgress["chapterProgress"][0]>
	) => {
		try {
			await UserService.updateChapterProgress(chapterId, progressUpdate);
			await loadProgress(); // Refresh progress
		} catch (error) {
			console.error("Error updating chapter progress:", error);
		}
	};

	return {
		progress,
		loading,
		updateChapterProgress,
		refresh: loadProgress,
	};
}
