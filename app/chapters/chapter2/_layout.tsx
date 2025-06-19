import { Stack } from "expo-router";

export default function Chapter2Layout() {
	return (
		<Stack>
			{" "}
			<Stack.Screen
				name="index"
				options={{
					title: "Race Against Time",
					headerStyle: { backgroundColor: "#E91E63" },
					headerTintColor: "#fff",
				}}
			/>
			<Stack.Screen
				name="vocabulary/[lessonId]"
				options={{
					title: "Vocabulaire",
					headerStyle: { backgroundColor: "#E91E63" },
					headerTintColor: "#fff",
				}}
			/>
			<Stack.Screen
				name="exercises/[lessonId]"
				options={{
					title: "Exercices",
					headerStyle: { backgroundColor: "#E91E63" },
					headerTintColor: "#fff",
				}}
			/>
			<Stack.Screen
				name="games/[lessonId]"
				options={{
					title: "Jeux",
					headerStyle: { backgroundColor: "#E91E63" },
					headerTintColor: "#fff",
				}}
			/>
			<Stack.Screen
				name="assessment"
				options={{
					title: "Évaluation",
					headerStyle: { backgroundColor: "#E91E63" },
					headerTintColor: "#fff",
				}}
			/>
		</Stack>
	);
}
