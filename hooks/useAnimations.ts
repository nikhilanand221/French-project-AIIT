import React from "react";
import { Animated, Easing } from "react-native";

// Custom hook for fade in animation
export const useFadeIn = (duration: number = 300, delay: number = 0) => {
	const opacity = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		Animated.timing(opacity, {
			toValue: 1,
			duration,
			delay,
			useNativeDriver: true,
			easing: Easing.out(Easing.quad),
		}).start();
	}, [opacity, duration, delay]);

	return opacity;
};

// Custom hook for slide in animation
export const useSlideIn = (
	fromX: number = 50,
	duration: number = 300,
	delay: number = 0
) => {
	const translateX = React.useRef(new Animated.Value(fromX)).current;

	React.useEffect(() => {
		Animated.timing(translateX, {
			toValue: 0,
			duration,
			delay,
			useNativeDriver: true,
			easing: Easing.out(Easing.back(1.1)),
		}).start();
	}, [translateX, fromX, duration, delay]);

	return translateX;
};

// Custom hook for scale animation
export const useScale = (
	fromScale: number = 0.8,
	duration: number = 300,
	delay: number = 0
) => {
	const scale = React.useRef(new Animated.Value(fromScale)).current;

	React.useEffect(() => {
		Animated.timing(scale, {
			toValue: 1,
			duration,
			delay,
			useNativeDriver: true,
			easing: Easing.out(Easing.back(1.1)),
		}).start();
	}, [scale, fromScale, duration, delay]);

	return scale;
};

// Custom hook for pulse animation (for interactive elements)
export const usePulse = (scale: number = 1.05, duration: number = 1000) => {
	const scaleValue = React.useRef(new Animated.Value(1)).current;

	React.useEffect(() => {
		const pulseAnimation = () => {
			Animated.sequence([
				Animated.timing(scaleValue, {
					toValue: scale,
					duration: duration / 2,
					useNativeDriver: true,
					easing: Easing.inOut(Easing.ease),
				}),
				Animated.timing(scaleValue, {
					toValue: 1,
					duration: duration / 2,
					useNativeDriver: true,
					easing: Easing.inOut(Easing.ease),
				}),
			]).start(() => pulseAnimation());
		};

		pulseAnimation();
	}, [scaleValue, scale, duration]);

	return scaleValue;
};

// Custom hook for progress bar animation
export const useProgressAnimation = (
	progress: number,
	duration: number = 500
) => {
	const progressValue = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		Animated.timing(progressValue, {
			toValue: progress,
			duration,
			useNativeDriver: false, // width animations require native driver to be false
			easing: Easing.out(Easing.cubic),
		}).start();
	}, [progress, duration, progressValue]);

	return progressValue;
};

// Bounce animation for correct answers
export const createBounceAnimation = (animatedValue: Animated.Value) => {
	return Animated.sequence([
		Animated.timing(animatedValue, {
			toValue: 1.2,
			duration: 150,
			useNativeDriver: true,
			easing: Easing.out(Easing.quad),
		}),
		Animated.timing(animatedValue, {
			toValue: 1,
			duration: 150,
			useNativeDriver: true,
			easing: Easing.out(Easing.quad),
		}),
	]);
};

// Shake animation for incorrect answers
export const createShakeAnimation = (animatedValue: Animated.Value) => {
	return Animated.sequence([
		Animated.timing(animatedValue, {
			toValue: 10,
			duration: 50,
			useNativeDriver: true,
		}),
		Animated.timing(animatedValue, {
			toValue: -10,
			duration: 50,
			useNativeDriver: true,
		}),
		Animated.timing(animatedValue, {
			toValue: 10,
			duration: 50,
			useNativeDriver: true,
		}),
		Animated.timing(animatedValue, {
			toValue: -10,
			duration: 50,
			useNativeDriver: true,
		}),
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 50,
			useNativeDriver: true,
		}),
	]);
};

// Stagger animation for lists
export const createStaggerAnimation = (
	items: Animated.Value[],
	duration: number = 200,
	stagger: number = 100
) => {
	const animations = items.map((item, index) =>
		Animated.timing(item, {
			toValue: 1,
			duration,
			delay: index * stagger,
			useNativeDriver: true,
			easing: Easing.out(Easing.quad),
		})
	);

	return Animated.parallel(animations);
};

// Card flip animation
export const useCardFlip = () => {
	const flipValue = React.useRef(new Animated.Value(0)).current;
	const [isFlipped, setIsFlipped] = React.useState(false);

	const flipCard = () => {
		const toValue = isFlipped ? 0 : 1;
		Animated.timing(flipValue, {
			toValue,
			duration: 600,
			useNativeDriver: true,
			easing: Easing.out(Easing.quad),
		}).start();
		setIsFlipped(!isFlipped);
	};

	const frontInterpolate = flipValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "180deg"],
	});

	const backInterpolate = flipValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["180deg", "360deg"],
	});

	return {
		flipCard,
		isFlipped,
		frontAnimatedStyle: {
			transform: [{ rotateY: frontInterpolate }],
		},
		backAnimatedStyle: {
			transform: [{ rotateY: backInterpolate }],
		},
	};
};
