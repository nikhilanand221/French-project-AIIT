import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import NotificationService, { NotificationSettings } from '../services/NotificationService';

export const useNotifications = () => {
	const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(
		NotificationService.getSettings()
	);
	const [hasPermissions, setHasPermissions] = useState(false);	const [isInitializing, setIsInitializing] = useState(true);
	
	useEffect(() => {
		const initializeNotifications = async () => {
			try {
				setIsInitializing(true);
				const permissions = await NotificationService.initialize();
				setHasPermissions(permissions);
				setNotificationSettings(NotificationService.getSettings());
			} catch (error) {
				console.error('Error initializing notifications:', error);
			} finally {
				setIsInitializing(false);
			}
		};

		const setupNotificationListeners = () => {
			// Listen for notification responses (when user taps notification)
			const notificationListener = Notifications.addNotificationReceivedListener(notification => {
				console.log('Notification received:', notification);
			});

			const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
				console.log('Notification response:', response);
				handleNotificationResponse(response);
			});			return () => {
				Notifications.removeNotificationSubscription(notificationListener);
				Notifications.removeNotificationSubscription(responseListener);
			};
		};

		const initializeAndSetup = async () => {
			await initializeNotifications();
			const cleanup = setupNotificationListeners();
			return cleanup;
		};

		let cleanup: (() => void) | undefined;
		
		initializeAndSetup().then((cleanupFn) => {
			cleanup = cleanupFn;
		});

		return () => {
			if (cleanup) {
				cleanup();
			}
		};
	}, []);

	const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
		const { type } = response.notification.request.content.data || {};
		
		switch (type) {
			case 'daily-reminder':
			case 'study-reminder':
				// Navigate to practice screen
				console.log('Opening practice screen');
				break;
			case 'streak-reminder':
				// Navigate to home screen with streak focus
				console.log('Opening home screen');
				break;
			case 'achievement':
				// Navigate to profile screen to show achievements
				console.log('Opening profile screen');
				break;
			default:
				console.log('Unknown notification type:', type);
		}
	};

	const updateNotificationSettings = async (newSettings: Partial<NotificationSettings>) => {
		try {
			NotificationService.updateSettings(newSettings);
			setNotificationSettings(NotificationService.getSettings());
		} catch (error) {
			console.error('Error updating notification settings:', error);
		}
	};

	const requestPermissions = async (): Promise<boolean> => {
		try {
			const granted = await NotificationService.requestPermissions();
			setHasPermissions(granted);
			return granted;
		} catch (error) {
			console.error('Error requesting permissions:', error);
			return false;
		}
	};

	const scheduleAchievementNotification = async (title: string, description: string) => {
		if (notificationSettings.enabled && notificationSettings.achievementNotifications) {
			await NotificationService.sendAchievementNotification(title, description);
		}
	};

	const scheduleLessonCompletionNotification = async (lessonTitle: string, xpEarned: number) => {
		if (notificationSettings.enabled) {
			await NotificationService.sendLessonCompletionNotification(lessonTitle, xpEarned);
		}
	};

	const scheduleStreakReminder = async (currentStreak: number) => {
		if (notificationSettings.enabled && notificationSettings.streakReminder) {
			await NotificationService.scheduleStreakReminder(currentStreak);
		}
	};

	const cancelAllNotifications = async () => {
		await NotificationService.cancelAllNotifications();
	};

	const getScheduledNotifications = async () => {
		return await NotificationService.getScheduledNotifications();
	};
	return {
		// State
		notificationSettings,
		hasPermissions,
		isInitializing,

		// Actions
		updateNotificationSettings,
		requestPermissions,
		scheduleAchievementNotification,
		scheduleLessonCompletionNotification,
		scheduleStreakReminder,
		cancelAllNotifications,
		getScheduledNotifications,
	};
};

export default useNotifications;
