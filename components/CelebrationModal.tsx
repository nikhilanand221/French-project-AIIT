import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	Animated,
	Easing,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";

interface Achievement {
	id: string;
	title: string;
	description: string;
	icon: string;
	color: string;
	xpReward: number;
}

interface CelebrationModalProps {
	visible: boolean;
	onClose: () => void;
	type: "lesson_complete" | "achievement" | "level_up" | "perfect_score";
	title: string;
	message: string;
	xpEarned?: number;
	achievement?: Achievement;
	newLevel?: number;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
	visible,
	onClose,
	type,
	title,
	message,
	xpEarned,
	achievement,
	newLevel,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];

	const scaleValue = React.useRef(new Animated.Value(0)).current;
	const rotateValue = React.useRef(new Animated.Value(0)).current;
	const sparkleValues = React.useRef([
		new Animated.Value(0),
		new Animated.Value(0),
		new Animated.Value(0),
		new Animated.Value(0),
	]).current;
	React.useEffect(() => {
		if (visible) {
			// Reset animations
			scaleValue.setValue(0);
			rotateValue.setValue(0);
			sparkleValues.forEach((val) => val.setValue(0));

			// Start celebration animation
			Animated.sequence([
				Animated.timing(scaleValue, {
					toValue: 1.2,
					duration: 300,
					useNativeDriver: true,
					easing: Easing.out(Easing.back(1.1)),
				}),
				Animated.timing(scaleValue, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
					easing: Easing.out(Easing.quad),
				}),
			]).start();

			// Rotate animation for icons
			Animated.timing(rotateValue, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
				easing: Easing.out(Easing.quad),
			}).start();

			// Sparkle animation
			const sparkleAnimations = sparkleValues.map((val, index) =>
				Animated.loop(
					Animated.sequence([
						Animated.delay(index * 200),
						Animated.timing(val, {
							toValue: 1,
							duration: 600,
							useNativeDriver: true,
							easing: Easing.inOut(Easing.quad),
						}),
						Animated.timing(val, {
							toValue: 0,
							duration: 600,
							useNativeDriver: true,
							easing: Easing.inOut(Easing.quad),
						}),
					])
				)
			);

			Animated.parallel(sparkleAnimations).start();
		}
	}, [visible, scaleValue, rotateValue, sparkleValues]);

	const getMainIcon = () => {
		switch (type) {
			case "lesson_complete":
				return "checkmark-circle";
			case "achievement":
				return achievement?.icon || "trophy";
			case "level_up":
				return "trending-up";
			case "perfect_score":
				return "star";
			default:
				return "happy";
		}
	};

	const getMainColor = () => {
		switch (type) {
			case "lesson_complete":
				return "#4CAF50";
			case "achievement":
				return achievement?.color || "#FFD700";
			case "level_up":
				return "#9C27B0";
			case "perfect_score":
				return "#FF9800";
			default:
				return colors.primary;
		}
	};

	const rotateInterpolate = rotateValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	if (!visible) return null;

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.modalOverlay}>
				<View style={[styles.modalContent, { backgroundColor: colors.card }]}>
					{/* Sparkles */}
					{sparkleValues.map((val, index) => (
						<Animated.View
							key={index}
							style={[
								styles.sparkle,
								{
									opacity: val,
									transform: [{ scale: val }, { rotate: rotateInterpolate }],
								},
								getSparklePosition(index),
							]}
						>
							<Ionicons name="sparkles" size={20} color="#FFD700" />
						</Animated.View>
					))}

					{/* Main Icon */}
					<Animated.View
						style={[
							styles.iconContainer,
							{
								backgroundColor: getMainColor() + "20",
								transform: [{ scale: scaleValue }],
							},
						]}
					>
						<Animated.View
							style={{
								transform: [{ rotate: rotateInterpolate }],
							}}
						>
							<Ionicons
								name={getMainIcon() as any}
								size={60}
								color={getMainColor()}
							/>
						</Animated.View>
					</Animated.View>

					{/* Title */}
					<Text style={[styles.title, { color: colors.text }]}>{title}</Text>

					{/* Message */}
					<Text style={[styles.message, { color: colors.tabIconDefault }]}>
						{message}
					</Text>

					{/* XP Earned */}
					{xpEarned && (
						<View
							style={[
								styles.xpContainer,
								{ backgroundColor: colors.primary + "20" },
							]}
						>
							<Ionicons name="star" size={20} color={colors.primary} />
							<Text style={[styles.xpText, { color: colors.primary }]}>
								+{xpEarned} XP
							</Text>
						</View>
					)}

					{/* New Level */}
					{newLevel && (
						<View
							style={[
								styles.levelContainer,
								{ backgroundColor: "#9C27B0" + "20" },
							]}
						>
							<Ionicons name="trophy" size={20} color="#9C27B0" />
							<Text style={[styles.levelText, { color: "#9C27B0" }]}>
								Niveau {newLevel} atteint !
							</Text>
						</View>
					)}

					{/* Close Button */}
					<TouchableOpacity
						style={[styles.closeButton, { backgroundColor: colors.primary }]}
						onPress={onClose}
					>
						<Text style={styles.closeButtonText}>Continuer</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const getSparklePosition = (index: number) => {
	const positions = [
		{ top: 20, left: 20 },
		{ top: 20, right: 20 },
		{ bottom: 100, left: 20 },
		{ bottom: 100, right: 20 },
	];
	return positions[index];
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		width: "85%",
		maxWidth: 400,
		borderRadius: 20,
		padding: 30,
		alignItems: "center",
		elevation: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
	},
	sparkle: {
		position: "absolute",
	},
	iconContainer: {
		width: 120,
		height: 120,
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	message: {
		fontSize: 16,
		textAlign: "center",
		lineHeight: 24,
		marginBottom: 20,
	},
	xpContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		marginBottom: 10,
	},
	xpText: {
		fontSize: 16,
		fontWeight: "600",
		marginLeft: 8,
	},
	levelContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		marginBottom: 20,
	},
	levelText: {
		fontSize: 16,
		fontWeight: "600",
		marginLeft: 8,
	},
	closeButton: {
		paddingHorizontal: 32,
		paddingVertical: 12,
		borderRadius: 25,
		minWidth: 120,
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
	},
});
