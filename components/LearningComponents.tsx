import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";

interface ProgressBarProps {
	progress: number; // 0-1
	height?: number;
	backgroundColor?: string;
	fillColor?: string;
	showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
	progress,
	height = 8,
	backgroundColor,
	fillColor,
	showPercentage = false,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];

	const bgColor = backgroundColor || colors.border;
	const fillCol = fillColor || colors.primary;
	const clampedProgress = Math.max(0, Math.min(1, progress));

	return (
		<View style={styles.container}>
			<View style={[styles.progressBar, { height, backgroundColor: bgColor }]}>
				<View
					style={[
						styles.progressFill,
						{
							width: `${clampedProgress * 100}%`,
							backgroundColor: fillCol,
							height,
						},
					]}
				/>
			</View>
			{showPercentage && (
				<Text style={[styles.percentageText, { color: colors.text }]}>
					{Math.round(clampedProgress * 100)}%
				</Text>
			)}
		</View>
	);
};

interface LessonCardProps {
	title: string;
	subtitle?: string;
	type: "vocabulary" | "exercises" | "games" | "assessment" | "grammar";
	completed?: boolean;
	locked?: boolean;
	progress?: number;
	score?: number;
	onPress?: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
	title,
	subtitle,
	type,
	completed = false,
	locked = false,
	progress = 0,
	score,
	onPress,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];

	const getIconName = (lessonType: string) => {
		switch (lessonType) {
			case "vocabulary":
				return "book-outline";
			case "exercises":
				return "pencil-outline";
			case "games":
				return "game-controller-outline";
			case "assessment":
				return "checkmark-circle-outline";
			case "grammar":
				return "library-outline";
			default:
				return "document-outline";
		}
	};

	const getTypeColor = (lessonType: string) => {
		switch (lessonType) {
			case "vocabulary":
				return "#4CAF50";
			case "exercises":
				return "#2196F3";
			case "games":
				return "#FF9800";
			case "assessment":
				return "#9C27B0";
			case "grammar":
				return "#607D8B";
			default:
				return colors.primary;
		}
	};

	return (
		<TouchableOpacity
			style={[
				styles.lessonCard,
				{ backgroundColor: colors.card, borderColor: colors.border },
				locked && styles.lockedCard,
			]}
			onPress={onPress}
			disabled={locked}
		>
			<View style={styles.lessonCardContent}>
				<View
					style={[
						styles.iconContainer,
						{ backgroundColor: getTypeColor(type) + "20" },
					]}
				>
					<Ionicons
						name={locked ? "lock-closed" : getIconName(type)}
						size={24}
						color={locked ? colors.tabIconDefault : getTypeColor(type)}
					/>
				</View>

				<View style={styles.lessonInfo}>
					<Text
						style={[
							styles.lessonTitle,
							{ color: locked ? colors.tabIconDefault : colors.text },
						]}
					>
						{title}
					</Text>
					{subtitle && (
						<Text
							style={[styles.lessonSubtitle, { color: colors.tabIconDefault }]}
						>
							{subtitle}
						</Text>
					)}

					{!locked && progress > 0 && (
						<View style={styles.progressContainer}>
							<ProgressBar progress={progress} height={4} />
						</View>
					)}
				</View>

				<View style={styles.lessonStatus}>
					{completed && (
						<View style={styles.completedIndicator}>
							<Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
							{score !== undefined && (
								<Text style={[styles.scoreText, { color: colors.text }]}>
									{score}%
								</Text>
							)}
						</View>
					)}

					{!locked && !completed && (
						<Ionicons
							name="chevron-forward"
							size={20}
							color={colors.tabIconDefault}
						/>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

interface StatsCardProps {
	title: string;
	value: string | number;
	icon: string;
	color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
	title,
	value,
	icon,
	color,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const cardColor = color || colors.primary;

	return (
		<View
			style={[
				styles.statsCard,
				{ backgroundColor: colors.card, borderColor: colors.border },
			]}
		>
			<View
				style={[
					styles.statsIconContainer,
					{ backgroundColor: cardColor + "20" },
				]}
			>
				<Ionicons name={icon as any} size={20} color={cardColor} />
			</View>
			<Text style={[styles.statsValue, { color: colors.text }]}>{value}</Text>
			<Text style={[styles.statsTitle, { color: colors.tabIconDefault }]}>
				{title}
			</Text>
		</View>
	);
};

interface XPBadgeProps {
	xp: number;
	level: number;
}

export const XPBadge: React.FC<XPBadgeProps> = ({ xp, level }) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];

	const xpForCurrentLevel = (level - 1) * 1000;
	const progressInLevel = (xp - xpForCurrentLevel) / 1000;

	return (
		<View
			style={[
				styles.xpBadge,
				{ backgroundColor: colors.card, borderColor: colors.border },
			]}
		>
			<View style={styles.xpHeader}>
				<Text style={[styles.levelText, { color: colors.text }]}>
					Level {level}
				</Text>
				<Text style={[styles.xpText, { color: colors.tabIconDefault }]}>
					{xp - xpForCurrentLevel} / 1000 XP
				</Text>
			</View>
			<ProgressBar progress={progressInLevel} height={6} fillColor="#FFD700" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	progressBar: {
		flex: 1,
		borderRadius: 4,
		overflow: "hidden",
	},
	progressFill: {
		borderRadius: 4,
	},
	percentageText: {
		fontSize: 12,
		fontWeight: "600",
		minWidth: 35,
		textAlign: "right",
	},
	lessonCard: {
		borderRadius: 12,
		borderWidth: 1,
		marginBottom: 12,
		overflow: "hidden",
	},
	lockedCard: {
		opacity: 0.6,
	},
	lessonCardContent: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	lessonInfo: {
		flex: 1,
	},
	lessonTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 2,
	},
	lessonSubtitle: {
		fontSize: 14,
		marginBottom: 8,
	},
	progressContainer: {
		marginTop: 4,
	},
	lessonStatus: {
		alignItems: "center",
	},
	completedIndicator: {
		alignItems: "center",
	},
	scoreText: {
		fontSize: 12,
		fontWeight: "600",
		marginTop: 2,
	},
	statsCard: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 16,
		alignItems: "center",
		minWidth: 80,
	},
	statsIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
	},
	statsValue: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 2,
	},
	statsTitle: {
		fontSize: 12,
		textAlign: "center",
	},
	xpBadge: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 16,
		marginBottom: 16,
	},
	xpHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	levelText: {
		fontSize: 16,
		fontWeight: "700",
	},
	xpText: {
		fontSize: 14,
	},
});
