import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "../../hooks/useColorScheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.icon,
				headerShown: false,
				tabBarStyle: {
					backgroundColor: colors.card,
					borderTopColor: colors.border,
					height: Platform.OS === "ios" ? 90 : 60,
					paddingBottom: Platform.OS === "ios" ? 30 : 5,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<Text style={{ color, fontSize: size || 24 }}>🏠</Text>
					),
				}}
			/>
			<Tabs.Screen
				name="chapters"
				options={{
					title: "Adventure",
					tabBarIcon: ({ color, size }) => (
						<Text style={{ color, fontSize: size || 24 }}>📖</Text>
					),
				}}
			/>
			<Tabs.Screen
				name="practice"
				options={{
					title: "Practice",
					tabBarIcon: ({ color, size }) => (
						<Text style={{ color, fontSize: size || 24 }}>🎮</Text>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => (
						<Text style={{ color, fontSize: size || 24 }}>👤</Text>
					),
				}}
			/>
		</Tabs>
	);
}
