import { Stack } from "expo-router";

export default function Chapter5Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Weekend Fun",
					headerStyle: {
						backgroundColor: "#003366",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Stack.Screen
				name="vocabulary/[lessonId]"
				options={{
					title: "Vocabulary",
					headerStyle: {
						backgroundColor: "#003366",
					},
					headerTintColor: "#fff",
				}}
			/>
			<Stack.Screen
				name="exercises/[lessonId]"
				options={{
					title: "Exercises",
					headerStyle: {
						backgroundColor: "#003366",
					},
					headerTintColor: "#fff",
				}}
			/>
			<Stack.Screen
				name="games/[lessonId]"
				options={{
					title: "Games",
					headerStyle: {
						backgroundColor: "#003366",
					},
					headerTintColor: "#fff",
				}}
			/>
			<Stack.Screen
				name="assessment"
				options={{
					title: "Assessment",
					headerStyle: {
						backgroundColor: "#003366",
					},
					headerTintColor: "#fff",
				}}
			/>
		</Stack>
	);
}
