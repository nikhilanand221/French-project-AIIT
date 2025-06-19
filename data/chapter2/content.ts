// Chapter 2: "Race Against Time" - A rendez-vous
// Learning Goals: Numbers, time, temporal expressions, scheduling meetings

export const chapter2Data = {
	id: 2,
	title: "Race Against Time",
	subtitle: "A rendez-vous",
	emoji: "⏰",
	description:
		"Master French numbers and time expressions as you navigate scheduling appointments and meetings in France.",

	// Story context
	story: {
		intro:
			"Your first week in France is busy! You need to schedule various appointments - a doctor's visit, a meeting with your academic advisor, and coffee dates with new friends. Learn to manage time and dates in French!",
		setting: "Various locations around Paris - university, café, offices",
		character:
			"You are learning to navigate French scheduling culture and manage your time effectively",
	},
	// Learning objectives
	objectives: [
		"Pronounce and write numbers in French",
		"Spell and count numbers",
		"Tell time accurately in French",
		"Use temporal expressions",
		"Communicate effectively in class",
		"Fix an hour and place for a meeting",
	],
	// Vocabulary for this chapter
	vocabulary: [
		// Numbers 0-20
		{
			french: "zéro",
			english: "zero",
			pronunciation: "zay-ROH",
			category: "numbers",
		},
		{
			french: "un",
			english: "one",
			pronunciation: "UHN",
			category: "numbers",
		},
		{
			french: "deux",
			english: "two",
			pronunciation: "DUH",
			category: "numbers",
		},
		{
			french: "trois",
			english: "three",
			pronunciation: "TWAH",
			category: "numbers",
		},
		{
			french: "quatre",
			english: "four",
			pronunciation: "KATR",
			category: "numbers",
		},
		{
			french: "cinq",
			english: "five",
			pronunciation: "SANK",
			category: "numbers",
		},
		{
			french: "six",
			english: "six",
			pronunciation: "SEES",
			category: "numbers",
		},
		{
			french: "sept",
			english: "seven",
			pronunciation: "SET",
			category: "numbers",
		},
		{
			french: "huit",
			english: "eight",
			pronunciation: "WEET",
			category: "numbers",
		},
		{
			french: "neuf",
			english: "nine",
			pronunciation: "NUHF",
			category: "numbers",
		},
		{
			french: "dix",
			english: "ten",
			pronunciation: "DEES",
			category: "numbers",
		},
		{
			french: "onze",
			english: "eleven",
			pronunciation: "AHNZ",
			category: "numbers",
		},
		{
			french: "douze",
			english: "twelve",
			pronunciation: "DOOZ",
			category: "numbers",
		},
		{
			french: "treize",
			english: "thirteen",
			pronunciation: "TREHZ",
			category: "numbers",
		},
		{
			french: "quatorze",
			english: "fourteen",
			pronunciation: "kah-TOHRZ",
			category: "numbers",
		},
		{
			french: "quinze",
			english: "fifteen",
			pronunciation: "KANZ",
			category: "numbers",
		},
		{
			french: "seize",
			english: "sixteen",
			pronunciation: "SEHZ",
			category: "numbers",
		},
		{
			french: "dix-sept",
			english: "seventeen",
			pronunciation: "dees-SET",
			category: "numbers",
		},
		{
			french: "dix-huit",
			english: "eighteen",
			pronunciation: "dees-WEET",
			category: "numbers",
		},
		{
			french: "dix-neuf",
			english: "nineteen",
			pronunciation: "dees-NUHF",
			category: "numbers",
		},
		{
			french: "vingt",
			english: "twenty",
			pronunciation: "VAN",
			category: "numbers",
		},
		{
			french: "trente",
			english: "thirty",
			pronunciation: "TRAHNGT",
			category: "numbers",
		},
		{
			french: "quarante",
			english: "forty",
			pronunciation: "kah-RAHNGT",
			category: "numbers",
		},
		{
			french: "cinquante",
			english: "fifty",
			pronunciation: "san-KAHNGT",
			category: "numbers",
		},
		{
			french: "soixante",
			english: "sixty",
			pronunciation: "swah-SAHNGT",
			category: "numbers",
		},
		{
			french: "soixante-dix",
			english: "seventy",
			pronunciation: "swah-sahnt-DEES",
			category: "numbers",
		},
		{
			french: "quatre-vingts",
			english: "eighty",
			pronunciation: "katr-VAN",
			category: "numbers",
		},
		{
			french: "quatre-vingt-dix",
			english: "ninety",
			pronunciation: "katr-van-DEES",
			category: "numbers",
		},
		{
			french: "cent",
			english: "one hundred",
			pronunciation: "SAHN",
			category: "numbers",
		},

		// Time expressions
		{
			french: "l'heure",
			english: "time/hour",
			pronunciation: "LUR",
			category: "time",
		},
		{
			french: "la minute",
			english: "minute",
			pronunciation: "lah mee-NEWT",
			category: "time",
		},
		{
			french: "la seconde",
			english: "second",
			pronunciation: "lah suh-GAHND",
			category: "time",
		},
		{
			french: "maintenant",
			english: "now",
			pronunciation: "mahn-tuh-NAHN",
			category: "time",
		},
		{
			french: "plus tard",
			english: "later",
			pronunciation: "ploo TAHR",
			category: "time",
		},
		{
			french: "tôt",
			english: "early",
			pronunciation: "TOH",
			category: "time",
		},
		{
			french: "tard",
			english: "late",
			pronunciation: "TAHR",
			category: "time",
		},

		// Days of the week
		{
			french: "lundi",
			english: "Monday",
			pronunciation: "lahn-DEE",
			category: "days",
		},
		{
			french: "mardi",
			english: "Tuesday",
			pronunciation: "mahr-DEE",
			category: "days",
		},
		{
			french: "mercredi",
			english: "Wednesday",
			pronunciation: "mer-kruh-DEE",
			category: "days",
		},
		{
			french: "jeudi",
			english: "Thursday",
			pronunciation: "zhuh-DEE",
			category: "days",
		},
		{
			french: "vendredi",
			english: "Friday",
			pronunciation: "vahn-druh-DEE",
			category: "days",
		},
		{
			french: "samedi",
			english: "Saturday",
			pronunciation: "sahm-DEE",
			category: "days",
		},
		{
			french: "dimanche",
			english: "Sunday",
			pronunciation: "dee-MAHNSH",
			category: "days",
		},

		// Scheduling vocabulary
		{
			french: "le rendez-vous",
			english: "appointment",
			pronunciation: "luh rahn-day-VOO",
			category: "scheduling",
		},
		{
			french: "la réunion",
			english: "meeting",
			pronunciation: "lah ray-ew-nee-OHN",
			category: "scheduling",
		},
		{
			french: "libre",
			english: "free/available",
			pronunciation: "LEE-bruh",
			category: "scheduling",
		},
		{
			french: "occupé",
			english: "busy",
			pronunciation: "oh-kew-PAY",
			category: "scheduling",
		},
		{
			french: "possible",
			english: "possible",
			pronunciation: "poh-SEE-bluh",
			category: "scheduling",
		},
		{
			french: "impossible",
			english: "impossible",
			pronunciation: "an-poh-SEE-bluh",
			category: "scheduling",
		},

		// Class communication vocabulary
		{
			french: "la classe",
			english: "class",
			pronunciation: "lah KLAHS",
			category: "class",
		},
		{
			french: "le professeur",
			english: "teacher",
			pronunciation: "luh proh-feh-SUR",
			category: "class",
		},
		{
			french: "l'étudiant",
			english: "student",
			pronunciation: "lay-tew-dee-AHN",
			category: "class",
		},
		{
			french: "la question",
			english: "question",
			pronunciation: "lah kehs-tee-OHN",
			category: "class",
		},
		{
			french: "la réponse",
			english: "answer",
			pronunciation: "lah ray-PAHNSS",
			category: "class",
		},
		{
			french: "Excusez-moi",
			english: "Excuse me",
			pronunciation: "ehks-kew-ZAY mwah",
			category: "class",
		},
		{
			french: "Je ne comprends pas",
			english: "I don't understand",
			pronunciation: "zhuh nuh kohn-prahn PAH",
			category: "class",
		},
		{
			french: "Pouvez-vous répéter?",
			english: "Can you repeat?",
			pronunciation: "poo-vay voo ray-pay-TAY",
			category: "class",
		},
		{
			french: "Comment dit-on...?",
			english: "How do you say...?",
			pronunciation: "koh-mahn dee-tohn",
			category: "class",
		},
	],
	// Grammar points
	grammar: [
		{
			title: "Les Nombres (Numbers)",
			explanation:
				"French numbers follow specific patterns. Learn to count from 0-20, then build larger numbers.",
			examples: [
				{
					french: "vingt et un (21)",
					english: "Use 'et' (and) for numbers ending in 1",
				},
				{
					french: "quatre-vingts (80)",
					english: "French uses 'four twenties' for 80",
				},
				{
					french: "quatre-vingt-dix (90)",
					english: "Literally 'four twenty ten'",
				},
			],
		},
		{
			title: "L'Heure (Telling Time)",
			explanation:
				"French time expressions use specific structures. Learn to tell time accurately.",
			examples: [
				{
					french: "Il est deux heures",
					english: "It is two o'clock",
				},
				{
					french: "Il est deux heures et demie",
					english: "It is half past two",
				},
				{
					french: "Il est deux heures moins le quart",
					english: "It is quarter to two",
				},
			],
		},
		{
			title: "Les Expressions Temporelles (Temporal Expressions)",
			explanation: "Use specific phrases to express when things happen.",
			examples: [
				{
					french: "à huit heures",
					english: "at eight o'clock",
				},
				{
					french: "le matin/le soir",
					english: "in the morning/evening",
				},
				{
					french: "aujourd'hui/demain",
					english: "today/tomorrow",
				},
			],
		},
	],
	// Exercises
	exercises: [
		{
			id: 1,
			type: "multiple_choice",
			title: "Numbers Practice",
			instructions: "Choose the correct French number",
			sentence: "Comment dit-on 'fifteen' en français?",
			options: ["quinze", "quatorze", "seize", "treize"],
			correct: 0,
		},
		{
			id: 2,
			type: "fill_blank",
			title: "Telling Time",
			instructions: "Complete with the correct time expression",
			sentence: "Il est deux heures _____ (2:30)",
			correct: "et demie",
		},
		{
			id: 3,
			type: "multiple_choice",
			title: "Days of the Week",
			instructions: "Choose the correct day",
			sentence: "Quel jour vient après lundi?",
			options: ["mardi", "mercredi", "dimanche", "vendredi"],
			correct: 0,
		},
		{
			id: 4,
			type: "fill_blank",
			title: "Scheduling",
			instructions: "Complete the appointment booking",
			sentence: "J'ai un _____ à trois heures. (appointment)",
			correct: "rendez-vous",
		},
		{
			id: 5,
			type: "multiple_choice",
			title: "Class Communication",
			instructions: "Choose the correct classroom expression",
			sentence: "How do you say 'I don't understand' in French?",
			options: [
				"Je ne comprends pas",
				"Je suis désolé",
				"Excusez-moi",
				"Au revoir",
			],
			correct: 0,
		},
		{
			id: 6,
			type: "dialogue_complete",
			title: "Making an Appointment",
			instructions: "Complete the appointment dialogue",
			scenario: "Making a doctor's appointment",
			dialogue: [
				{
					speaker: "Marie",
					text: "Voici ma famille!",
				},
				{
					speaker: "You",
					options: [
						"Elle est très grande!",
						"Ils sont très gentils!",
						"C'est magnifique!",
					],
				},
				{
					speaker: "Marie",
					text: "Oui, mes parents sont très accueillants.",
				},
			],
		},
	],
	// Mini-games
	games: [
		{
			id: 1,
			type: "speed_vocabulary",
			title: "Number Racing",
			description: "Quick-fire number recognition and pronunciation practice",
			scenarios: [
				{
					setting: "French marketplace",
					timeOfDay: "morning",
					formality: "casual",
				},
			],
			difficulty: "easy",
			estimatedTime: 3,
			xpReward: 25,
		},
		{
			id: 2,
			type: "conversation_practice",
			title: "Time Master",
			description: "Practice telling time and making appointments",
			scenarios: [
				{
					setting: "Doctor's office",
					timeOfDay: "afternoon",
					formality: "formal",
					characters: ["Receptionist", "Patient"],
				},
			],
			difficulty: "medium",
			estimatedTime: 5,
			xpReward: 35,
		},
		{
			id: 3,
			type: "pronunciation_challenge",
			title: "Schedule Scheduler",
			description: "Master scheduling vocabulary and time expressions",
			difficulty: "medium",
			estimatedTime: 4,
			xpReward: 30,
		},
	],
	// Cultural insights
	culture: [
		{
			title: "French Time Culture",
			content:
				"Punctuality is highly valued in French culture, especially for business meetings and appointments. Being late is considered disrespectful.",
			category: "etiquette",
		},
		{
			title: "24-Hour Time",
			content:
				"France uses the 24-hour clock system for official times (trains, appointments, etc.). 14h30 means 2:30 PM.",
			category: "practical",
		},
		{
			title: "French Class Etiquette",
			content:
				"In French classrooms, students raise their hand and wait to be called on. Saying 'Excusez-moi' before asking questions is polite.",
			category: "education",
		},
	],
	// Assessment
	assessment: {
		passingScore: 70,
		timeLimit: 10,
		questions: [
			{
				id: 1,
				type: "multiple_choice",
				question: "Comment dit-on 'twenty-five' en français?",
				options: ["vingt-cinq", "vingt-quatre", "trente-cinq", "quinze"],
				correct: 0,
			},
			{
				id: 2,
				type: "translation",
				question: "Traduisez: 'It is half past three'",
				correct: "Il est trois heures et demie",
			},
			{
				id: 3,
				type: "multiple_choice",
				question: "Quel jour vient après mercredi?",
				options: ["mardi", "jeudi", "vendredi", "lundi"],
				correct: 1,
			},
			{
				id: 4,
				type: "fill_blank",
				question: "J'ai un _____ avec le médecin à 15h. (appointment)",
				correct: "rendez-vous",
			},
			{
				id: 5,
				type: "multiple_choice",
				question: "Comment dit-on 'I don't understand' en français?",
				options: [
					"Je ne comprends pas",
					"Je suis désolé",
					"Excusez-moi",
					"Au revoir",
				],
				correct: 0,
			},
		],
	},

	// Rewards for completing this chapter
	rewards: {
		totalXP: 250,
		badges: [
			{
				id: "family_expert",
				name: "Expert en Famille",
				description: "Master of family vocabulary",
				xp: 50,
			},
			{
				id: "social_butterfly",
				name: "Papillon Social",
				description: "Great at talking about relationships",
				xp: 30,
			},
		],
		unlocks: ["chapter3", "family_practice_mode"],
	},

	// Chapter prerequisites and unlock status
	unlocked: false,
	prerequisite: 1, // Chapter 1 must be completed
};
