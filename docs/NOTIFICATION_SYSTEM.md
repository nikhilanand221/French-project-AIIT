# French Learning App - Notification System

## Overview

The French Learning App now includes a fully functional notification system that provides users with study reminders, achievement notifications, and progress updates. The system is built using Expo Notifications and integrates seamlessly with the app's progress tracking.

## Features

### 🔔 Notification Types

1. **Daily Study Reminders**

   - Scheduled at 7:00 PM by default
   - Customizable through user settings
   - Motivational messages to encourage daily practice

2. **Study Session Reminders**

   - Morning reminder (9:00 AM): "Start your day with some French practice!"
   - Afternoon reminder (2:00 PM): "Time for a quick French lesson!"
   - Evening reminder (6:00 PM): "End your day with some French learning!"

3. **Streak Reminders**

   - Sent when user hasn't studied for 23+ hours
   - Helps maintain learning streaks
   - Personalized based on current streak length

4. **Achievement Notifications**
   - Level up notifications
   - XP milestone achievements (100, 250, 500, 1000, 2000, 5000 XP)
   - Streak milestones (3, 7, 14, 30, 50, 100 days)
   - Lesson completion with perfect scores
   - Chapter completion notifications
   - Assessment pass notifications

### ⚙️ User Settings

Users can control their notification preferences through the Profile settings:

- **Enable/Disable All Notifications**: Master toggle for all notification types
- **Permission Management**: Automatic permission requests with user-friendly prompts
- **Real-time Status**: Shows permission status and initialization state

### 🔧 Developer Features

- **Debug Mode**: View scheduled notifications in development
- **Test Utilities**: `testNotifications` global object for testing
- **Console Logging**: Comprehensive logging for debugging
- **Error Handling**: Robust error handling with fallback behaviors

## Architecture

### Core Components

1. **NotificationService** (`services/NotificationService.ts`)

   - Singleton service managing all notification operations
   - Handles scheduling, canceling, and updating notifications
   - Platform-specific configurations (Android channels)

2. **useNotifications Hook** (`hooks/useNotifications.ts`)

   - React integration for notification state management
   - Permission handling and initialization
   - Notification response listeners

3. **ProgressContext Integration** (`contexts/ProgressContext.tsx`)

   - Automatic achievement notifications on progress updates
   - XP and streak milestone detection
   - Lesson and chapter completion notifications

4. **Profile Settings** (`app/(tabs)/profile.tsx`)
   - User interface for notification preferences
   - Permission status display
   - Settings persistence with AsyncStorage

### Notification Flow

```
User Action (e.g., complete lesson)
        ↓
ProgressContext updates progress
        ↓
Automatic milestone/achievement detection
        ↓
NotificationService sends relevant notifications
        ↓
User receives notification on device
```

## Configuration

### Default Settings

```typescript
{
  enabled: true,
  dailyReminder: true,
  streakReminder: true,
  achievementNotifications: true,
  studyReminders: true,
  reminderTime: { hour: 19, minute: 0 } // 7 PM
}
```

### Customization

Users can customize:

- Enable/disable individual notification types
- Notification timing (through settings)
- Sound and vibration preferences

## Installation & Setup

The notification system is automatically initialized when the app starts:

1. **Permissions**: Requested on first notification toggle
2. **Scheduling**: Daily and study reminders scheduled automatically
3. **Achievement Tracking**: Integrated with progress system

### Dependencies

- `expo-notifications`: Core notification functionality
- `expo-device`: Device detection for notifications
- `expo-constants`: Project configuration access
- `@react-native-async-storage/async-storage`: Settings persistence

## Testing

### Development Testing

```javascript
// Access test utilities in __DEV__ mode
global.testNotifications.testAll(); // Test all notification types
global.testNotifications.showScheduled(); // View scheduled notifications
global.testNotifications.clearAll(); // Clear all notifications
```

### Manual Testing

1. Toggle notifications in Profile settings
2. Complete lessons to trigger achievement notifications
3. Build streak to test streak reminders
4. Check notification permissions in device settings

## Performance Considerations

- **Lazy Loading**: NotificationService uses singleton pattern
- **Debouncing**: Achievement notifications are debounced to prevent spam
- **Cleanup**: Automatic cleanup of old notifications
- **Permission Caching**: Permission status cached to reduce API calls

## Platform Support

### iOS

- Native notification support
- Sound and badge configurations
- Deep linking support (future enhancement)

### Android

- Custom notification channels
- Vibration patterns
- High importance notifications for study reminders

## Future Enhancements

- [ ] Custom notification sounds
- [ ] In-app notification handling
- [ ] Deep linking on notification tap
- [ ] Smart scheduling based on user behavior
- [ ] Notification analytics and insights
- [ ] Social sharing of achievements
- [ ] Customizable reminder times
- [ ] Notification templates and personalization

## Troubleshooting

### Common Issues

1. **Notifications not appearing**

   - Check device notification permissions
   - Verify app is not in Do Not Disturb mode
   - Ensure notifications are enabled in Profile settings

2. **Permission denied**

   - Guide user to device settings
   - Show clear instructions for enabling permissions
   - Provide fallback functionality

3. **Delayed notifications**
   - iOS/Android may delay background notifications
   - Consider using foreground notifications for critical alerts

### Debug Commands

```javascript
// Show all scheduled notifications
await NotificationService.getScheduledNotifications();

// Check current settings
NotificationService.getSettings();

// Test immediate notification
await NotificationService.sendAchievementNotification("Test", "Test message");
```

## Contributing

When adding new notification features:

1. Update `NotificationService` with new notification types
2. Add corresponding settings to user preferences
3. Integrate with appropriate progress tracking events
4. Add comprehensive error handling
5. Update this documentation

## License

Part of the French Learning App project.
