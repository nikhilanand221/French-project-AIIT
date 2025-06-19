import { Stack } from "expo-router";

export default function Chapter3Layout() {
	return (
		<Stack>
			{" "}
			<Stack.Screen
				name="index"
				options={{
					title: "Meet & Greet",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Stack.Screen
				name="vocabulary/[lessonId]"
				options={{
					title: "Vocabulaire",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Stack.Screen
				name="exercises/[lessonId]"
				options={{
					title: "Exercices",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Stack.Screen
				name="games/[lessonId]"
				options={{
					title: "Jeux",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Stack.Screen
				name="assessment"
				options={{
					title: "Évaluation",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
		</Stack>
	);
}
