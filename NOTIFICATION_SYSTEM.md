# Notification System Documentation

## Overview

The French Language Lab app includes a comprehensive notification system that provides automatic user feedback for various learning milestones and achievements. The system is fully integrated with the app's progress tracking and provides real-time notifications for XP milestones, learning streaks, lesson completions, and chapter completions.

## Architecture

### Core Components

1. **NotificationService** (`services/NotificationService.ts`)

   - Singleton service that manages all notification operations
   - Handles permission requests, notification scheduling, and delivery
   - Supports both immediate and scheduled notifications
   - Integrates with Expo Notifications

2. **ProgressContext Integration** (`contexts/ProgressContext.tsx`)

   - Automatically triggers notifications when progress events occur
   - Integrated with all major progress tracking methods
   - Prevents duplicate notifications for the same milestone

3. **useNotifications Hook** (`hooks/useNotifications.ts`)
   - React hook for managing notification state and permissions
   - Provides easy access to notification settings and status
   - Handles notification listeners and responses

## Features

### Automatic Notifications

The system automatically sends notifications for:

#### XP Milestones

- **Levels**: Notifications when users reach new levels (every 1000 XP)
- **XP Milestones**: 100, 250, 500, 1000, 2000, 5000 XP achievements

#### Learning Streaks

- **Streak Milestones**: 3, 7, 14, 30, 50, 100-day streaks
- **Automatic Tracking**: Streak calculations based on daily activity

#### Lesson Progress

- **Lesson Completion**: First-time completion notifications
- **Perfect Scores**: Special recognition for 100% lesson scores

#### Chapter Progress

- **Chapter Completion**: Congratulations when completing chapters
- **Assessment Success**: Notifications for passing chapter assessments

### Notification Settings

Users can customize their notification preferences:

```typescript
interface NotificationSettings {
	enabled: boolean;
	dailyReminder: boolean;
	streakReminder: boolean;
	achievementNotifications: boolean;
	studyReminders: boolean;
	reminderTime: { hour: number; minute: number };
}
```

## Integration Guide

### Automatic Integration

The notification system is automatically integrated with the ProgressContext. When you use any of these methods, notifications are triggered automatically:

```typescript
const { addXP, updateStreak, updateLessonProgress, updateChapterProgress } =
	useProgress();

// These will automatically trigger appropriate notifications
await addXP(50);
await updateStreak();
await updateLessonProgress(lessonData);
await updateChapterProgress(chapterData);
```

### Manual Notifications

For custom notifications, you can use the NotificationService directly:

```typescript
import NotificationService from "../services/NotificationService";

// Send achievement notification
await NotificationService.sendAchievementNotification(
	"Custom Achievement!",
	"You did something amazing!"
);

// Send study reminder
await NotificationService.sendStudyReminder(
	"Time to Study!",
	"Continue your French learning journey"
);
```

### Permission Handling

The system automatically requests permissions when initialized:

```typescript
const { hasPermissions, isInitializing } = useNotifications();

if (isInitializing) {
	// Show loading state
} else if (!hasPermissions) {
	// Show permission request UI
}
```

## Usage Examples

### In Components

```typescript
import { useNotifications } from "../hooks/useNotifications";
import { useProgress } from "../contexts/ProgressContext";

const MyComponent = () => {
	const { hasPermissions, notificationSettings, updateSettings } =
		useNotifications();
	const { addXP } = useProgress();

	const handleStudyComplete = async () => {
		// This will automatically trigger milestone notifications if applicable
		await addXP(25);
	};

	const toggleNotifications = async () => {
		await updateSettings({
			...notificationSettings,
			enabled: !notificationSettings.enabled,
		});
	};

	return (
		<View>
			{hasPermissions ? (
				<Text>Notifications are enabled</Text>
			) : (
				<Text>Please enable notifications for the best experience</Text>
			)}
		</View>
	);
};
```

### Testing Notifications (Development)

For development and testing, you can manually trigger notifications:

```typescript
// Test XP milestone notification
await NotificationService.sendAchievementNotification(
	"Test Milestone!",
	"This is a test notification"
);

// Test study reminder
await NotificationService.sendStudyReminder(
	"Study Time!",
	"Time for your French lesson"
);
```

## Configuration

### Default Settings

The system comes with sensible defaults:

- **Notifications Enabled**: true
- **Daily Reminders**: 7:00 PM
- **All Achievement Types**: Enabled
- **Sound Effects**: Enabled

### Customization

Settings can be customized per user and are persisted across app sessions:

```typescript
const customSettings: NotificationSettings = {
	enabled: true,
	dailyReminder: true,
	streakReminder: true,
	achievementNotifications: true,
	studyReminders: true,
	reminderTime: { hour: 18, minute: 30 }, // 6:30 PM
};

await NotificationService.updateSettings(customSettings);
```

## Platform Considerations

### iOS

- Requires notification permissions
- Supports rich notifications with badges
- Respects Do Not Disturb settings

### Android

- Supports notification channels
- Customizable notification importance levels
- Background execution limitations

### Development

- Notifications only work on physical devices
- Use Expo Development Client for testing
- Console warnings on simulators/emulators

## Error Handling

The system includes comprehensive error handling:

```typescript
try {
	await NotificationService.sendAchievementNotification(title, body);
} catch (error) {
	console.error("Error sending notification:", error);
	// Fallback: Could show in-app toast or banner
}
```

## Best Practices

1. **Permission Management**: Always check permissions before sending notifications
2. **Rate Limiting**: The system prevents spam by checking previous milestones
3. **User Control**: Respect user notification preferences
4. **Graceful Degradation**: App functions normally even if notifications fail
5. **Testing**: Test on physical devices for accurate behavior

## Troubleshooting

### Common Issues

1. **Notifications not appearing**

   - Check device permissions
   - Verify notification settings in app
   - Test on physical device

2. **Permissions denied**

   - Guide users to system settings
   - Explain benefits of notifications
   - Provide fallback in-app feedback

3. **Background notifications not working**
   - Check platform-specific background execution limits
   - Ensure app is not in battery optimization

### Debug Mode

Enable debug logging by setting:

```typescript
NotificationService.setDebugMode(true);
```

This will log all notification attempts and help identify issues.

## Future Enhancements

Potential improvements to consider:

1. **Rich Notifications**: Images, progress bars, action buttons
2. **Smart Timing**: AI-powered optimal notification timing
3. **Localization**: Multi-language notification support
4. **Analytics**: Track notification engagement and effectiveness
5. **A/B Testing**: Test different notification strategies

## Conclusion

The notification system provides a seamless, automatic way to keep users engaged with their French learning journey. It's designed to be unobtrusive yet encouraging, helping users celebrate their achievements and maintain their learning momentum.
