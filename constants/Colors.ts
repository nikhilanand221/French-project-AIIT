/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#003366"; // French Blue
const tintColorDark = "#FFD700"; // Gold

export const Colors = {
	light: {
		text: "#11181C",
		background: "#F5F5F5",
		tint: tintColorLight,
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
		primary: "#003366", // French Blue
		secondary: "#CC0000", // French Red
		accent: "#FFD700", // Gold
		success: "#4CAF50",
		warning: "#FF9800",
		card: "#FFFFFF",
		border: "#E0E0E0",
	},
	dark: {
		text: "#ECEDEE",
		background: "#151718",
		tint: tintColorDark,
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: tintColorDark,
		primary: "#4A90E2", // Lighter blue for dark mode
		secondary: "#FF6B6B", // Softer red for dark mode
		accent: "#FFD700", // Gold
		success: "#4CAF50",
		warning: "#FF9800",
		card: "#1F1F1F",
		border: "#333333",
	},
};
