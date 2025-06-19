import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
		shouldShowBanner: true,
		shouldShowList: true,
	}),
});

export interface NotificationSettings {
	enabled: boolean;
	dailyReminder: boolean;
	streakReminder: boolean;
	achievementNotifications: boolean;
	studyReminders: boolean;
	reminderTime: { hour: number; minute: number };
}

class NotificationService {
	private static instance: NotificationService;
	private notificationSettings: NotificationSettings = {
		enabled: true,
		dailyReminder: true,
		streakReminder: true,
		achievementNotifications: true,
		studyReminders: true,
		reminderTime: { hour: 19, minute: 0 }, // 7 PM default
	};

	public static getInstance(): NotificationService {
		if (!NotificationService.instance) {
			NotificationService.instance = new NotificationService();
		}
		return NotificationService.instance;
	}

	// Request notification permissions
	async requestPermissions(): Promise<boolean> {
		if (!Device.isDevice) {
			console.warn('Notifications only work on physical devices');
			return false;
		}

		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
			console.warn('Failed to get push token for push notification!');
			return false;
		}

		// Configure notification channel for Android
		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('french-learning', {
				name: 'French Learning Reminders',
				importance: Notifications.AndroidImportance.HIGH,
				sound: 'default',
				vibrationPattern: [0, 250, 250, 250],
			});
		}

		return true;
	}

	// Get push token (for future push notification features)
	async getPushToken(): Promise<string | null> {
		try {
			const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
			if (!projectId) {
				console.warn('Project ID not found');
				return null;
			}

			const token = await Notifications.getExpoPushTokenAsync({ projectId });
			return token.data;
		} catch (error) {
			console.error('Error getting push token:', error);
			return null;
		}
	}

	// Schedule daily study reminder
	async scheduleDailyReminder(): Promise<void> {
		if (!this.notificationSettings.enabled || !this.notificationSettings.dailyReminder) {
			return;
		}

		try {
			// Cancel existing daily reminders
			await this.cancelNotification('daily-reminder');

			const { hour, minute } = this.notificationSettings.reminderTime;

			await Notifications.scheduleNotificationAsync({
				identifier: 'daily-reminder',
				content: {
					title: "Bonjour! 🇫🇷",
					body: "Time for your daily French practice! Keep your streak alive!",
					data: { type: 'daily-reminder' },
					sound: 'default',
				},				trigger: {
					type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
					hour,
					minute,
					repeats: true,
				},
			});

			console.log(`Daily reminder scheduled for ${hour}:${minute.toString().padStart(2, '0')}`);
		} catch (error) {
			console.error('Error scheduling daily reminder:', error);
		}
	}

	// Schedule streak reminder (if user hasn't studied today)
	async scheduleStreakReminder(currentStreak: number): Promise<void> {
		if (!this.notificationSettings.enabled || !this.notificationSettings.streakReminder) {
			return;
		}

		try {
			// Cancel existing streak reminders
			await this.cancelNotification('streak-reminder');

			// Schedule for 8 PM if user hasn't studied today
			await Notifications.scheduleNotificationAsync({
				identifier: 'streak-reminder',
				content: {
					title: "Don't Break Your Streak! 🔥",
					body: `You're on a ${currentStreak}-day streak! Complete a lesson to keep it going.`,
					data: { type: 'streak-reminder', streak: currentStreak },
					sound: 'default',
				},				trigger: {
					type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
					hour: 20,
					minute: 0,
					repeats: false,
				},
			});

			console.log(`Streak reminder scheduled for ${currentStreak}-day streak`);
		} catch (error) {
			console.error('Error scheduling streak reminder:', error);
		}
	}

	// Send achievement notification
	async sendAchievementNotification(title: string, description: string): Promise<void> {
		if (!this.notificationSettings.enabled || !this.notificationSettings.achievementNotifications) {
			return;
		}

		try {
			await Notifications.scheduleNotificationAsync({
				identifier: `achievement-${Date.now()}`,
				content: {
					title: `🎉 Achievement Unlocked!`,
					body: `${title}: ${description}`,
					data: { type: 'achievement', title, description },
					sound: 'default',
				},				trigger: {
					type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
					seconds: 1,
				},
			});

			console.log(`Achievement notification sent: ${title}`);
		} catch (error) {
			console.error('Error sending achievement notification:', error);
		}
	}

	// Send study reminder notifications
	async scheduleStudyReminders(): Promise<void> {
		if (!this.notificationSettings.enabled || !this.notificationSettings.studyReminders) {
			return;
		}

		try {
			// Cancel existing study reminders
			await this.cancelNotificationsWithPrefix('study-reminder');

			const reminders = [
				{
					id: 'study-reminder-morning',
					hour: 9,
					minute: 0,
					title: "Good Morning! ☀️",
					body: "Start your day with some French practice!",
				},
				{
					id: 'study-reminder-afternoon',
					hour: 14,
					minute: 0,
					title: "Afternoon Break 📚",
					body: "Take a quick French lesson break!",
				},
				{
					id: 'study-reminder-evening',
					hour: 18,
					minute: 0,
					title: "Evening Study 🌙",
					body: "End your day with French practice!",
				},
			];

			for (const reminder of reminders) {
				await Notifications.scheduleNotificationAsync({
					identifier: reminder.id,
					content: {
						title: reminder.title,
						body: reminder.body,
						data: { type: 'study-reminder' },
						sound: 'default',
					},					trigger: {
						type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
						hour: reminder.hour,
						minute: reminder.minute,
						repeats: true,
					},
				});
			}

			console.log('Study reminders scheduled');
		} catch (error) {
			console.error('Error scheduling study reminders:', error);
		}
	}

	// Send lesson completion celebration
	async sendLessonCompletionNotification(lessonTitle: string, xpEarned: number): Promise<void> {
		if (!this.notificationSettings.enabled) {
			return;
		}

		try {
			await Notifications.scheduleNotificationAsync({
				identifier: `lesson-complete-${Date.now()}`,
				content: {
					title: "Lesson Complete! 🎯",
					body: `Great job completing "${lessonTitle}"! You earned ${xpEarned} XP!`,
					data: { type: 'lesson-complete', lessonTitle, xpEarned },
					sound: 'default',
				},				trigger: {
					type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
					seconds: 2,
				},
			});

			console.log(`Lesson completion notification sent: ${lessonTitle}`);
		} catch (error) {
			console.error('Error sending lesson completion notification:', error);
		}
	}

	// Cancel specific notification
	async cancelNotification(identifier: string): Promise<void> {
		try {
			await Notifications.cancelScheduledNotificationAsync(identifier);
			console.log(`Cancelled notification: ${identifier}`);
		} catch (error) {
			console.error(`Error cancelling notification ${identifier}:`, error);
		}
	}

	// Cancel notifications with prefix
	async cancelNotificationsWithPrefix(prefix: string): Promise<void> {
		try {
			const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
			const toCancel = scheduledNotifications
				.filter(notification => notification.identifier.startsWith(prefix))
				.map(notification => notification.identifier);

			for (const identifier of toCancel) {
				await Notifications.cancelScheduledNotificationAsync(identifier);
			}

			console.log(`Cancelled ${toCancel.length} notifications with prefix: ${prefix}`);
		} catch (error) {
			console.error(`Error cancelling notifications with prefix ${prefix}:`, error);
		}
	}

	// Cancel all notifications
	async cancelAllNotifications(): Promise<void> {
		try {
			await Notifications.cancelAllScheduledNotificationsAsync();
			console.log('All notifications cancelled');
		} catch (error) {
			console.error('Error cancelling all notifications:', error);
		}
	}

	// Update notification settings
	updateSettings(newSettings: Partial<NotificationSettings>): void {
		this.notificationSettings = { ...this.notificationSettings, ...newSettings };
		
		// Re-schedule notifications based on new settings
		if (newSettings.dailyReminder !== undefined) {
			if (newSettings.dailyReminder) {
				this.scheduleDailyReminder();
			} else {
				this.cancelNotification('daily-reminder');
			}
		}

		if (newSettings.studyReminders !== undefined) {
			if (newSettings.studyReminders) {
				this.scheduleStudyReminders();
			} else {
				this.cancelNotificationsWithPrefix('study-reminder');
			}
		}

		if (!newSettings.enabled) {
			this.cancelAllNotifications();
		}
	}

	// Get current settings
	getSettings(): NotificationSettings {
		return { ...this.notificationSettings };
	}

	// Get scheduled notifications (for debugging)
	async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
		try {
			return await Notifications.getAllScheduledNotificationsAsync();
		} catch (error) {
			console.error('Error getting scheduled notifications:', error);
			return [];
		}
	}

	// Initialize notification service
	async initialize(): Promise<boolean> {
		const hasPermissions = await this.requestPermissions();
		
		if (hasPermissions && this.notificationSettings.enabled) {
			await this.scheduleDailyReminder();
			if (this.notificationSettings.studyReminders) {
				await this.scheduleStudyReminders();
			}
		}

		return hasPermissions;
	}
}

export default NotificationService.getInstance();
