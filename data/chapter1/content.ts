// Chapter 1: "Bonjour France!" - Your first day in France
// Learning Goals: Introductions, greetings, personal information

export const chapter1Data = {
	id: 1,
	title: "Bonjour France!",
	subtitle: "Your first day in France",
	emoji: "🇫🇷",
	description:
		"Welcome to France! Learn essential greetings and how to introduce yourself.",

	// Story context
	story: {
		intro:
			"You've just arrived in Paris for your French adventure! As you step off the plane, you realize you'll need to master basic French greetings and introductions to navigate your new environment.",
		setting: "Charles de Gaulle Airport, Paris",
		character:
			"You are Alex, a language enthusiast starting your French journey",
	},
	// Learning objectives
	objectives: [
		"Brief introduction to French and Francophone countries",
		"Learn to present yourself in French",
		"Get information about someone else",
		"Master greetings and taking leave",
		"Ask for and give personal information",
	],

	// Vocabulary for this chapter
	vocabulary: [
		// Greetings
		{
			french: "Bonjour",
			english: "Hello/Good morning",
			pronunciation: "bon-ZHOOR",
			category: "greetings",
		},
		{
			french: "Bonsoir",
			english: "Good evening",
			pronunciation: "bon-SWAHR",
			category: "greetings",
		},
		{
			french: "Salut",
			english: "Hi/Bye (informal)",
			pronunciation: "sah-LUU",
			category: "greetings",
		},
		{
			french: "Au revoir",
			english: "Goodbye",
			pronunciation: "oh ruh-VWAHR",
			category: "greetings",
		},
		{
			french: "À bientôt",
			english: "See you soon",
			pronunciation: "ah bee-ahn-TOH",
			category: "greetings",
		},

		// Introductions
		{
			french: "Je m'appelle",
			english: "My name is",
			pronunciation: "zhuh mah-PELL",
			category: "introductions",
		},
		{
			french: "Je suis",
			english: "I am",
			pronunciation: "zhuh swee",
			category: "introductions",
		},
		{
			french: "Comment vous appelez-vous?",
			english: "What is your name? (formal)",
			pronunciation: "koh-mahn voo zah-play VOO",
			category: "introductions",
		},
		{
			french: "Comment tu t'appelles?",
			english: "What is your name? (informal)",
			pronunciation: "koh-mahn tuu tah-PELL",
			category: "introductions",
		},

		// Personal information
		{
			french: "Je viens de",
			english: "I come from",
			pronunciation: "zhuh vee-ahn duh",
			category: "personal",
		},
		{
			french: "J'habite à",
			english: "I live in",
			pronunciation: "zhah-beet ah",
			category: "personal",
		},
		{
			french: "J'ai ... ans",
			english: "I am ... years old",
			pronunciation: "zhay ... ahn",
			category: "personal",
		},

		// Polite expressions
		{
			french: "S'il vous plaît",
			english: "Please (formal)",
			pronunciation: "seel voo PLAY",
			category: "polite",
		},
		{
			french: "S'il te plaît",
			english: "Please (informal)",
			pronunciation: "seel tuh PLAY",
			category: "polite",
		},
		{
			french: "Merci",
			english: "Thank you",
			pronunciation: "mer-SEE",
			category: "polite",
		},
		{
			french: "De rien",
			english: "You're welcome",
			pronunciation: "duh ree-AHN",
			category: "polite",
		},
		{
			french: "Excusez-moi",
			english: "Excuse me (formal)",
			pronunciation: "ek-skuu-zay MWAH",
			category: "polite",
		},
		{
			french: "Pardon",
			english: "Sorry/Pardon",
			pronunciation: "par-DOHN",
			category: "polite",
		},
	],

	// Grammar points
	grammar: [
		{
			title: "Formal vs Informal",
			explanation:
				"French has formal (vous) and informal (tu) ways of addressing people. Use 'vous' with strangers, older people, or in professional settings.",
			examples: [
				{
					formal: "Comment vous appelez-vous?",
					informal: "Comment tu t'appelles?",
				},
				{ formal: "S'il vous plaît", informal: "S'il te plaît" },
			],
		},
		{
			title: "Pronunciation Basics",
			explanation:
				"French pronunciation has specific rules. The 'r' is rolled, silent letters are common, and accent marks change pronunciation.",
			tips: [
				"Silent 's' at the end of words",
				"Nasal sounds: 'an', 'en', 'in', 'on'",
				"Liaison: connecting words in speech",
			],
		},
	],

	// Interactive exercises
	exercises: [
		{
			id: 1,
			type: "flashcard_match",
			title: "Greeting Flashcards",
			instructions: "Match the French greeting with its English meaning",
			items: [
				{ french: "Bonjour", english: "Hello/Good morning" },
				{ french: "Bonsoir", english: "Good evening" },
				{ french: "Au revoir", english: "Goodbye" },
				{ french: "Salut", english: "Hi/Bye (informal)" },
			],
		},
		{
			id: 2,
			type: "fill_blank",
			title: "Complete the Introduction",
			instructions: "Fill in the blanks to complete the French introduction",
			sentence: "Bonjour, je _____ Pierre et je _____ de Paris.",
			options: ["m'appelle", "suis", "viens", "habite"],
			correct: ["m'appelle", "viens"],
		},
		{
			id: 3,
			type: "pronunciation",
			title: "Pronunciation Practice",
			instructions: "Practice pronouncing these French greetings",
			words: [
				{ french: "Bonjour", pronunciation: "bon-ZHOOR" },
				{ french: "Merci", pronunciation: "mer-SEE" },
				{ french: "S'il vous plaît", pronunciation: "seel voo PLAY" },
			],
		},
		{
			id: 4,
			type: "dialogue_complete",
			title: "Airport Arrival Dialogue",
			instructions: "Complete this dialogue at the airport",
			scenario: "You're at passport control in Paris",
			dialogue: [
				{ speaker: "Officer", text: "Bonjour! Comment vous appelez-vous?" },
				{
					speaker: "You",
					options: ["Je m'appelle Alex", "Bonjour monsieur", "Merci beaucoup"],
				},
				{ speaker: "Officer", text: "D'où venez-vous?" },
				{
					speaker: "You",
					options: ["Je viens des États-Unis", "Je suis étudiant", "Au revoir"],
				},
			],
		},
	],

	// Mini-games
	games: [
		{
			id: 1,
			type: "greeting_simulator",
			title: "French Greeting Simulator",
			description: "Practice greetings in different French scenarios",
			scenarios: [
				{ setting: "Morning café", timeOfDay: "morning", formality: "casual" },
				{
					setting: "Business meeting",
					timeOfDay: "afternoon",
					formality: "formal",
				},
				{
					setting: "Evening dinner",
					timeOfDay: "evening",
					formality: "casual",
				},
			],
		},
		{
			id: 2,
			type: "introduction_builder",
			title: "Build Your Introduction",
			description: "Create your perfect French self-introduction",
			components: ["greeting", "name", "origin", "age", "occupation"],
		},
	],

	// Cultural insights
	culture: [
		{
			title: "French Greeting Etiquette",
			content:
				"In France, greeting people properly is very important. Always say 'Bonjour' when entering shops or meeting someone for the first time during the day.",
		},
		{
			title: "The French Handshake",
			content:
				"French people often shake hands when meeting someone new. The handshake should be brief and firm, accompanied by direct eye contact.",
		},
		{
			title: "Francophone Countries",
			content:
				"French is spoken in 29 countries worldwide! Major Francophone countries include Canada, Belgium, Switzerland, and many African nations.",
		},
	],

	// Assessment
	assessment: {
		passingScore: 70,
		questions: [
			{
				id: 1,
				type: "multiple_choice",
				question: "How do you say 'Good morning' in French?",
				options: ["Bonsoir", "Bonjour", "Salut", "Au revoir"],
				correct: 1,
			},
			{
				id: 2,
				type: "audio_recognition",
				question: "Listen and select the correct French phrase",
				audio: "je_mappelle.mp3",
				options: ["Je suis", "Je m'appelle", "Je viens", "J'habite"],
				correct: 1,
			},
			{
				id: 3,
				type: "translation",
				question: "Translate: 'My name is Marie and I come from Lyon'",
				answer: "Je m'appelle Marie et je viens de Lyon",
			},
		],
	},

	// Rewards and XP
	rewards: {
		totalXP: 120,
		badges: [
			{
				id: "first_greeting",
				name: "First Greeting",
				description: "Said your first Bonjour!",
				xp: 20,
			},
			{
				id: "introduction_master",
				name: "Introduction Master",
				description: "Perfect self-introduction!",
				xp: 30,
			},
			{
				id: "pronunciation_pro",
				name: "Pronunciation Pro",
				description: "Nailed the French pronunciation!",
				xp: 25,
			},
			{
				id: "culture_explorer",
				name: "Culture Explorer",
				description: "Learned about French culture!",
				xp: 15,
			},
			{
				id: "chapter_complete",
				name: "Bonjour Champion",
				description: "Completed Chapter 1!",
				xp: 30,
			},
		],
	},
};
