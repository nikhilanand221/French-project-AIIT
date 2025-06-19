import { Redirect } from "expo-router";
import "../utils/debugProgress"; // Debug utilities for development
import "../utils/testData"; // Test data utilities for development

export default function RootIndex() {
	return <Redirect href="/(tabs)" />;
}
