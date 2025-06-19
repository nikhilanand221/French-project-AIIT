import { Stack } from "expo-router";

export default function PracticeLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="flashcards"
				options={{ title: "Flashcards Practice" }}
			/>
			<Stack.Screen
				name="pronunciation"
				options={{ title: "Pronunciation Practice" }}
			/>
			<Stack.Screen name="quiz" options={{ title: "Quick Quiz" }} />
			<Stack.Screen name="grammar" options={{ title: "Grammar Drills" }} />
			<Stack.Screen
				name="listening"
				options={{ title: "Listening Practice" }}
			/>
			<Stack.Screen name="speed" options={{ title: "Speed Challenge" }} />
		</Stack>
	);
}
