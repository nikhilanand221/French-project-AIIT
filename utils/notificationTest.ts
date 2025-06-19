/**
 * Notification Testing Utilities
 * For development and testing purposes only
 */

import NotificationService from "../services/NotificationService";

export const testNotifications = {
	/**
	 * Test achievement notification
	 */
	async testAchievement() {
		await NotificationService.sendAchievementNotification(
			"Test Achievement",
			"This is a test achievement notification!"
		);
	},

	/**
	 * Test daily reminder scheduling
	 */
	async testDailyReminder() {
		await NotificationService.scheduleDailyReminder();
		console.log("Daily reminder scheduled for testing");
	},

	/**
	 * Test study reminders
	 */
	async testStudyReminders() {
		await NotificationService.scheduleStudyReminders();
		console.log("Study reminders scheduled for testing");
	},

	/**
	 * Test streak reminder
	 */
	async testStreakReminder() {
		await NotificationService.scheduleStreakReminder(5); // Test with 5-day streak
		console.log("Streak reminder scheduled for testing");
	},

	/**
	 * Test all notifications
	 */
	async testAll() {
		await this.testAchievement();
		await this.testDailyReminder();
		await this.testStudyReminders();
		await this.testStreakReminder();
		console.log("All test notifications triggered");
	},

	/**
	 * Clear all scheduled notifications
	 */
	async clearAll() {
		await NotificationService.cancelAllNotifications();
		console.log("All notifications cleared");
	},

	/**
	 * Show all scheduled notifications
	 */
	async showScheduled() {
		const scheduled = await NotificationService.getScheduledNotifications();
		console.log("Scheduled notifications:", scheduled);
		return scheduled;
	},
};

// Export for easy access in __DEV__ mode
if (__DEV__) {
	// Make available globally for console testing
	(global as any).testNotifications = testNotifications;
}
