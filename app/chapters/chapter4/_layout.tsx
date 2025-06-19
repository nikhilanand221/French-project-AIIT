import { Stack } from "expo-router";

export default function Chapter4Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Chapitre 4: Entretien d'Embauche",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Stack.Screen
				name="vocabulary/[lessonId]"
				options={{
					title: "Vocabulaire Professionnel",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Stack.Screen
				name="exercises/[lessonId]"
				options={{
					title: "Exercices de Grammaire",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Stack.Screen
				name="games/[lessonId]"
				options={{
					title: "Jeux Professionnels",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Stack.Screen
				name="assessment"
				options={{
					title: "Évaluation Professionnelle",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
		</Stack>
	);
}
