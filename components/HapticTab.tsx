import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { type ComponentProps } from "react";
import { Platform } from "react-native";

export function HapticTab(props: ComponentProps<typeof PlatformPressable>) {
	return (
		<PlatformPressable
			{...props}
			onPressIn={(ev) => {
				if (Platform.OS === "ios") {
					// Add a soft haptic feedback when pressing down on the tabs.
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				}
				props.onPressIn?.(ev);
			}}
		/>
	);
}
