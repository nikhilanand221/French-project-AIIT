import { Stack } from "expo-router";

export default function Chapter1Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Bonjour France!",
					headerStyle: { backgroundColor: "#003366" },
					headerTintColor: "#FFFFFF",
					headerTitleStyle: { fontWeight: "bold" },
				}}
			/>
			<Stack.Screen
				name="vocabulary/[lessonId]"
				options={{
					title: "Vocabulary",
					headerStyle: { backgroundColor: "#003366" },
					headerTintColor: "#FFFFFF",
					headerTitleStyle: { fontWeight: "bold" },
				}}
			/>
			<Stack.Screen
				name="exercises/[lessonId]"
				options={{
					title: "Exercises",
					headerStyle: { backgroundColor: "#003366" },
					headerTintColor: "#FFFFFF",
					headerTitleStyle: { fontWeight: "bold" },
				}}
			/>
			<Stack.Screen
				name="games/[lessonId]"
				options={{
					title: "Games",
					headerStyle: { backgroundColor: "#003366" },
					headerTintColor: "#FFFFFF",
					headerTitleStyle: { fontWeight: "bold" },
				}}
			/>
			<Stack.Screen
				name="assessment"
				options={{
					title: "Chapter Assessment",
					headerStyle: { backgroundColor: "#003366" },
					headerTintColor: "#FFFFFF",
					headerTitleStyle: { fontWeight: "bold" },
				}}
			/>
		</Stack>
	);
}
