import React, { useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useProgress } from "../contexts/ProgressContext";
import { useNotifications } from "../hooks/useNotifications";
import { useSounds } from "../hooks/useSounds";
import NotificationService from "../services/NotificationService";

/**
 * Development utility component for testing notifications
 * This component should only be used during development
 */
const NotificationTester: React.FC = () => {
	const [customTitle, setCustomTitle] = useState("Test Notification");
	const [customBody, setCustomBody] = useState("This is a test notification");
	const { addXP, updateStreak } = useProgress();
	const { hasPermissions, notificationSettings } = useNotifications();
	const {
		playButtonClick,
		playCorrectAnswer,
		playIncorrectAnswer,
		playLessonComplete,
		playAchievementUnlock,
		playLevelUp,
		playXPGain,
		playPerfectScore,
		playChapterComplete,
		playStreakMilestone,
	} = useSounds();

	const testAchievementNotification = async () => {
		try {
			await NotificationService.sendAchievementNotification(
				customTitle,
				customBody
			);
			Alert.alert("Success", "Achievement notification sent!");
		} catch (error) {
			Alert.alert("Error", `Failed to send notification: ${error}`);
		}
	};
	const testStudyReminder = async () => {
		try {
			await NotificationService.sendAchievementNotification(
				"Study Reminder",
				"Time for your French lesson!"
			);
			Alert.alert("Success", "Study reminder sent!");
		} catch (error) {
			Alert.alert("Error", `Failed to send reminder: ${error}`);
		}
	};

	const testXPMilestone = async () => {
		try {
			// Add XP to trigger milestone notifications
			await addXP(100);
			Alert.alert(
				"Success",
				"Added 100 XP - check for milestone notifications!"
			);
		} catch (error) {
			Alert.alert("Error", `Failed to add XP: ${error}`);
		}
	};

	const testStreakMilestone = async () => {
		try {
			await updateStreak();
			Alert.alert(
				"Success",
				"Updated streak - check for milestone notifications!"
			);
		} catch (error) {
			Alert.alert("Error", `Failed to update streak: ${error}`);
		}
	};
	const testScheduledNotification = async () => {
		try {
			await NotificationService.scheduleStudyReminders();
			Alert.alert("Success", "Scheduled study reminder for later!");
		} catch (error) {
			Alert.alert("Error", `Failed to schedule notification: ${error}`);
		}
	};

	const testPermissionRequest = async () => {
		try {
			const granted = await NotificationService.requestPermissions();
			Alert.alert(
				"Permission Result",
				granted ? "Permissions granted!" : "Permissions denied"
			);
		} catch (error) {
			Alert.alert("Error", `Failed to request permissions: ${error}`);
		}
	};

	if (!__DEV__) {
		return null; // Only show in development mode
	}

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Notification Tester</Text>
			<Text style={styles.subtitle}>Development Tool</Text>

			<View style={styles.statusContainer}>
				<Text style={styles.statusText}>
					Permissions: {hasPermissions ? "✅ Granted" : "❌ Denied"}
				</Text>
				<Text style={styles.statusText}>
					Notifications:{" "}
					{notificationSettings.enabled ? "✅ Enabled" : "❌ Disabled"}
				</Text>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Custom Title:</Text>
				<TextInput
					style={styles.input}
					value={customTitle}
					onChangeText={setCustomTitle}
					placeholder="Enter notification title"
				/>

				<Text style={styles.label}>Custom Body:</Text>
				<TextInput
					style={styles.input}
					value={customBody}
					onChangeText={setCustomBody}
					placeholder="Enter notification body"
					multiline
				/>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={testPermissionRequest}>
					<Text style={styles.buttonText}>Request Permissions</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={testAchievementNotification}
				>
					<Text style={styles.buttonText}>Test Achievement</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={testStudyReminder}>
					<Text style={styles.buttonText}>Test Study Reminder</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={testXPMilestone}>
					<Text style={styles.buttonText}>Test XP Milestone (+100 XP)</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={testStreakMilestone}>
					<Text style={styles.buttonText}>Test Streak Update</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={testScheduledNotification}
				>
					<Text style={styles.buttonText}>Schedule Reminder</Text>
				</TouchableOpacity>{" "}
			</View>

			{/* Sound Testing Section */}
			<Text style={styles.sectionTitle}>🔊 Sound Effects Testing</Text>
			<View style={styles.section}>
				<TouchableOpacity style={styles.button} onPress={playButtonClick}>
					<Text style={styles.buttonText}>Button Click</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={playCorrectAnswer}>
					<Text style={styles.buttonText}>Correct Answer</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={playIncorrectAnswer}>
					<Text style={styles.buttonText}>Incorrect Answer</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={playLessonComplete}>
					<Text style={styles.buttonText}>Lesson Complete</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={playAchievementUnlock}>
					<Text style={styles.buttonText}>Achievement Unlock</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={playLevelUp}>
					<Text style={styles.buttonText}>Level Up</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={playXPGain}>
					<Text style={styles.buttonText}>XP Gain</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={playPerfectScore}>
					<Text style={styles.buttonText}>Perfect Score</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={playChapterComplete}>
					<Text style={styles.buttonText}>Chapter Complete</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={playStreakMilestone}>
					<Text style={styles.buttonText}>Streak Milestone</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.infoContainer}>
				<Text style={styles.infoTitle}>Notes:</Text>{" "}
				<Text style={styles.infoText}>
					• Notifications only work on physical devices{"\n"}• Test milestone
					notifications by adding XP or updating streak{"\n"}• Check
					notification settings if notifications do not appear{"\n"}• This
					component only appears in development mode
				</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 5,
		color: "#333",
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
		color: "#666",
		fontStyle: "italic",
	},
	statusContainer: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		marginBottom: 20,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	statusText: {
		fontSize: 16,
		marginBottom: 5,
		color: "#333",
	},
	inputContainer: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		marginBottom: 20,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 5,
		color: "#333",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 10,
		marginBottom: 15,
		fontSize: 16,
		backgroundColor: "#f9f9f9",
	},
	buttonContainer: {
		gap: 10,
		marginBottom: 20,
	},
	button: {
		backgroundColor: "#007AFF",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	infoContainer: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	infoTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#333",
	},
	infoText: {
		fontSize: 14,
		lineHeight: 20,
		color: "#666",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 20,
		color: "#333",
	},
	section: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		marginBottom: 20,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
});

export default NotificationTester;
