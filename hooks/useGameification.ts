import { useEffect, useState } from "react";
import { UserService } from "../services/userService";
import { DailyChallenge, GameStats } from "../types/Game";

export function useGameification() {
	const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
	const [stats, setStats] = useState<GameStats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadGameData();
	}, []);

	const loadGameData = async () => {
		try {
			const [challengesData, statsData] = await Promise.all([
				UserService.getDailyChallenges(),
				UserService.getStats(),
			]);
			setChallenges(challengesData);
			setStats(statsData);
		} catch (error) {
			console.error("Error loading game data:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateChallengeProgress = async (
		challengeId: string,
		increment: number = 1
	) => {
		try {
			await UserService.updateChallengeProgress(challengeId, increment);
			await loadGameData(); // Refresh challenges
		} catch (error) {
			console.error("Error updating challenge progress:", error);
		}
	};

	const updateStats = async (statsUpdate: Partial<GameStats>) => {
		try {
			await UserService.updateStats(statsUpdate);
			if (stats) {
				setStats({ ...stats, ...statsUpdate });
			}
		} catch (error) {
			console.error("Error updating stats:", error);
		}
	};

	const completeActivity = async (
		activityType: string,
		score: number,
		perfect: boolean = false
	) => {
		try {
			// Update stats
			const newStats: Partial<GameStats> = {
				activitiesCompleted: (stats?.activitiesCompleted || 0) + 1,
			};

			if (perfect) {
				newStats.perfectScores = (stats?.perfectScores || 0) + 1;
			}

			await updateStats(newStats);

			// Update relevant challenges
			switch (activityType) {
				case "lesson":
					await updateChallengeProgress("daily_lesson");
					break;
				case "pronunciation":
					await updateChallengeProgress("daily_practice");
					break;
				case "flashcard":
					await updateChallengeProgress("daily_flashcards");
					break;
			}
		} catch (error) {
			console.error("Error completing activity:", error);
		}
	};

	return {
		challenges,
		stats,
		loading,
		updateChallengeProgress,
		updateStats,
		completeActivity,
		refresh: loadGameData,
	};
}
