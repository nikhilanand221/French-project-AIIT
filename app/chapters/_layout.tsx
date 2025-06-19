import { Stack } from "expo-router";

export default function ChaptersLayout() {
	return (
		<Stack>
			<Stack.Screen name="chapter1" options={{ headerShown: false }} />
			<Stack.Screen name="chapter2" options={{ headerShown: false }} />
			<Stack.Screen name="chapter3" options={{ headerShown: false }} />
			<Stack.Screen name="chapter4" options={{ headerShown: false }} />
			<Stack.Screen name="chapter5" options={{ headerShown: false }} />
			{/* Future chapters will be added here */}
		</Stack>
	);
}
