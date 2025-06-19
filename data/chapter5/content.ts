// Chapter 5: "Weekend Fun" - Amusement de Week-end
// Learning Goals: Social activities, giving positive/negative replies, asking questions, daily activities

export const chapter5Data = {
	id: 5,
	title: "Amusement de Week-end",
	subtitle: "Weekend Fun",
	emoji: "🎉",
	description:
		"Discover the vibrant French social scene! Learn to navigate nightlife, make plans with friends, and express your preferences for weekend activities.",

	// Story context
	story: {
		intro:
			"The weekend has arrived, and your French friends are excited to show you the local nightlife and social scene. Join Marie and her friends as they explore cafés, clubs, and cultural events around the city. Learn to express your preferences, ask questions, and engage in lively conversations!",
		setting:
			"Various social venues around Paris - cafés, discotheques, cultural events",
		character:
			"You are exploring French social life with Marie and her friends, learning to navigate social situations and express preferences",
	},
	// Learning objectives
	objectives: [
		"Create a portrait by a journalist",
		"Give positive or negative replies",
		"Ask questions",
		"Hold discussions with a person",
		"Describe activities in a day",
	],

	// Vocabulary for social activities and nightlife
	vocabulary: [
		// Social activities
		{
			french: "la discothèque",
			english: "nightclub/disco",
			pronunciation: "lah dees-koh-TEHK",
			category: "social_venues",
		},
		{
			french: "le café",
			english: "café",
			pronunciation: "luh kah-FAY",
			category: "social_venues",
		},
		{
			french: "le bar",
			english: "bar",
			pronunciation: "luh BAHR",
			category: "social_venues",
		},
		{
			french: "le restaurant",
			english: "restaurant",
			pronunciation: "luh reh-stoh-RAHN",
			category: "social_venues",
		},
		{
			french: "le cinéma",
			english: "cinema",
			pronunciation: "luh see-nay-MAH",
			category: "social_venues",
		},
		{
			french: "le théâtre",
			english: "theater",
			pronunciation: "luh tay-AH-truh",
			category: "social_venues",
		},
		{
			french: "la fête",
			english: "party",
			pronunciation: "lah FEHT",
			category: "social_activities",
		},
		{
			french: "la soirée",
			english: "evening party",
			pronunciation: "lah swah-RAY",
			category: "social_activities",
		},
		{
			french: "danser",
			english: "to dance",
			pronunciation: "dahn-SAY",
			category: "social_activities",
		},
		{
			french: "boire",
			english: "to drink",
			pronunciation: "BWAHR",
			category: "social_activities",
		},
		{
			french: "rencontrer",
			english: "to meet",
			pronunciation: "rahn-kohn-TRAY",
			category: "social_activities",
		},
		{
			french: "sortir",
			english: "to go out",
			pronunciation: "sohr-TEER",
			category: "social_activities",
		},
		{
			french: "s'amuser",
			english: "to have fun",
			pronunciation: "sah-mü-ZAY",
			category: "social_activities",
		},
		{
			french: "se détendre",
			english: "to relax",
			pronunciation: "suh day-TAHN-druh",
			category: "social_activities",
		},
		// Preferences and opinions
		{
			french: "j'aime",
			english: "I like",
			pronunciation: "zheh-M",
			category: "preferences",
		},
		{
			french: "je n'aime pas",
			english: "I don't like",
			pronunciation: "zhuh neh-M PAH",
			category: "preferences",
		},
		{
			french: "je préfère",
			english: "I prefer",
			pronunciation: "zhuh pray-FEHR",
			category: "preferences",
		},
		{
			french: "je déteste",
			english: "I hate",
			pronunciation: "zhuh day-TEHST",
			category: "preferences",
		},
		{
			french: "c'est formidable",
			english: "it's great",
			pronunciation: "say fohr-mee-DAHBL",
			category: "positive_opinions",
		},
		{
			french: "c'est génial",
			english: "it's awesome",
			pronunciation: "say zhay-nee-AHL",
			category: "positive_opinions",
		},
		{
			french: "c'est super",
			english: "it's super",
			pronunciation: "say sü-PEHR",
			category: "positive_opinions",
		},
		{
			french: "c'est nul",
			english: "it's awful",
			pronunciation: "say NÜL",
			category: "negative_opinions",
		},
		{
			french: "c'est ennuyeux",
			english: "it's boring",
			pronunciation: "say ahn-nü-YUH",
			category: "negative_opinions",
		},
		{
			french: "c'est décevant",
			english: "it's disappointing",
			pronunciation: "say day-suh-VAHN",
			category: "negative_opinions",
		},
		// Question words
		{
			french: "qui",
			english: "who",
			pronunciation: "KEE",
			category: "question_words",
		},
		{
			french: "que/qu'est-ce que",
			english: "what",
			pronunciation: "kuh/keh-skuh",
			category: "question_words",
		},
		{
			french: "quand",
			english: "when",
			pronunciation: "KAHN",
			category: "question_words",
		},
		{
			french: "où",
			english: "where",
			pronunciation: "OO",
			category: "question_words",
		},
		{
			french: "pourquoi",
			english: "why",
			pronunciation: "poor-KWAH",
			category: "question_words",
		},
		{
			french: "comment",
			english: "how",
			pronunciation: "koh-MAHN",
			category: "question_words",
		},

		// Time expressions and daily activities
		{
			french: "le matin",
			english: "morning",
			pronunciation: "luh mah-TAHN",
			category: "time_expressions",
		},
		{
			french: "l'après-midi",
			english: "afternoon",
			pronunciation: "lah-preh-mee-DEE",
			category: "time_expressions",
		},
		{
			french: "le soir",
			english: "evening",
			pronunciation: "luh SWAHR",
			category: "time_expressions",
		},
		{
			french: "la nuit",
			english: "night",
			pronunciation: "lah NWEE",
			category: "time_expressions",
		},
		{
			french: "aujourd'hui",
			english: "today",
			pronunciation: "oh-zhoor-DWEE",
			category: "time_expressions",
		},
		{
			french: "demain",
			english: "tomorrow",
			pronunciation: "duh-MAHN",
			category: "time_expressions",
		},
		{
			french: "hier",
			english: "yesterday",
			pronunciation: "ee-YEHR",
			category: "time_expressions",
		},
		{
			french: "maintenant",
			english: "now",
			pronunciation: "mahn-tuh-NAHN",
			category: "time_expressions",
		},
	],

	// Grammar lessons
	grammar: [
		{
			title: "Asking Questions in French",
			explanation:
				"There are three main ways to ask questions in French: intonation, est-ce que, and inversion.",
			examples: [
				{
					french: "Tu viens ce soir?",
					english: "Are you coming tonight?",
					type: "intonation",
				},
				{
					french: "Est-ce que tu viens ce soir?",
					english: "Are you coming tonight?",
					type: "est-ce que",
				},
				{
					french: "Viens-tu ce soir?",
					english: "Are you coming tonight?",
					type: "inversion",
				},
			],
		},
		{
			title: "Expressing Preferences",
			explanation:
				"Use various expressions to show what you like or dislike in social situations.",
			examples: [
				{
					french: "J'adore danser!",
					english: "I love dancing!",
					type: "strong_positive",
				},
				{
					french: "Je n'aime pas du tout cette musique.",
					english: "I don't like this music at all.",
					type: "strong_negative",
				},
				{
					french: "Ça me plaît beaucoup.",
					english: "I really like it.",
					type: "positive",
				},
			],
		},
		{
			title: "Daily Activities and Time Expressions",
			explanation:
				"Learn to describe activities throughout the day using appropriate time expressions.",
			examples: [
				{
					french: "Le matin, je bois du café.",
					english: "In the morning, I drink coffee.",
					type: "morning",
				},
				{
					french: "L'après-midi, je retrouve mes amis.",
					english: "In the afternoon, I meet my friends.",
					type: "afternoon",
				},
				{
					french: "Le soir, nous sortons en boîte.",
					english: "In the evening, we go clubbing.",
					type: "evening",
				},
			],
		},
	],

	// Cultural insights
	culture: [
		{
			title: "French Nightlife Culture",
			description:
				"French nightlife is sophisticated and varied. People often start with an 'apéritif' (pre-dinner drink) around 6-8 PM, have dinner late (8-10 PM), and then may go to bars or clubs. The legal drinking age is 18, and nightlife tends to be more relaxed and conversation-focused than in some other countries.",
		},
		{
			title: "French Social Etiquette",
			description:
				"When meeting friends, French people often greet with 'la bise' (cheek kisses) - usually two kisses, one on each cheek. It's polite to ask questions about others' preferences and show genuine interest in conversations. Saying 'santé' (cheers) when drinking together is customary.",
		},
		{
			title: "Weekend Social Activities",
			description:
				"French weekends often involve cultural activities like visiting museums, going to the cinema, or attending cultural events. Many cafés and bars have terraces where people gather to socialize. The concept of 'flâner' (leisurely strolling) is important in French culture.",
		},
	],

	// Exercises for this chapter
	exercises: [
		{
			id: "social-vocabulary",
			type: "vocabulary",
			title: "Social Activities Vocabulary",
			instructions:
				"Match French social activities with their English translations",
		},
		{
			id: "preferences-practice",
			type: "conversation",
			title: "Expressing Preferences",
			instructions:
				"Practice giving positive and negative opinions about activities",
		},
		{
			id: "question-formation",
			type: "grammar",
			title: "Asking Questions",
			instructions: "Learn the three ways to ask questions in French",
		},
		{
			id: "daily-schedule",
			type: "vocabulary",
			title: "Daily Activities Schedule",
			instructions:
				"Describe activities throughout the day using time expressions",
		},
		{
			id: "journalist-interview",
			type: "conversation",
			title: "Portrait by a Journalist",
			instructions:
				"Practice being interviewed about your social life and weekend activities",
		},
	],

	// Interactive games and activities
	games: [
		{
			type: "social_scenario",
			title: "Weekend Planning",
			description:
				"Plan a weekend with French friends by expressing preferences and asking questions",
			scenarios: [
				{
					situation: "Your friend Marie asks what you want to do this weekend",
					options: [
						"J'aimerais aller au cinéma.",
						"Je préfère rester à la maison.",
						"Et toi, qu'est-ce que tu veux faire?",
					],
					feedback: {
						correct: [
							"Great way to express preference!",
							"Honest response, well done!",
							"Excellent question to keep the conversation going!",
						],
					},
				},
				{
					situation: "You're at a café and want to order drinks",
					options: [
						"Qu'est-ce que vous avez comme boissons?",
						"Je voudrais un café, s'il vous plaît.",
						"L'addition, s'il vous plaît.",
					],
					feedback: {
						correct: [
							"Perfect way to ask about available drinks!",
							"Polite way to order!",
							"Good, but maybe order first!",
						],
					},
				},
			],
		},
		{
			type: "opinion_exchange",
			title: "Express Your Opinion",
			description:
				"Practice giving positive and negative opinions about social activities",
			activities: [
				{
					activity: "aller en discothèque",
					responses: [
						{ type: "positive", text: "C'est génial! J'adore danser." },
						{ type: "negative", text: "C'est trop bruyant pour moi." },
						{ type: "neutral", text: "Ça dépend de la musique." },
					],
				},
				{
					activity: "regarder un film français",
					responses: [
						{ type: "positive", text: "C'est une excellente idée!" },
						{ type: "negative", text: "Je ne comprends pas bien le français." },
						{ type: "neutral", text: "Avec des sous-titres, pourquoi pas?" },
					],
				},
			],
		},
	],

	// Day schedule practice
	dailyActivities: [
		{
			time: "08h00",
			activity: "prendre le petit-déjeuner",
			english: "have breakfast",
			context: "morning routine",
		},
		{
			time: "14h00",
			activity: "déjeuner avec des amis",
			english: "lunch with friends",
			context: "social meal",
		},
		{
			time: "16h00",
			activity: "faire les courses",
			english: "go shopping",
			context: "daily errands",
		},
		{
			time: "19h00",
			activity: "prendre l'apéritif",
			english: "have pre-dinner drinks",
			context: "social tradition",
		},
		{
			time: "21h00",
			activity: "dîner au restaurant",
			english: "dine at restaurant",
			context: "evening meal",
		},
		{
			time: "23h00",
			activity: "aller en boîte",
			english: "go clubbing",
			context: "nightlife",
		},
	],

	// Interview/conversation practice
	conversationPractice: [
		{
			role: "journalist",
			scenario: "Weekend Interview",
			questions: [
				{
					french: "Comment passez-vous vos week-ends généralement?",
					english: "How do you usually spend your weekends?",
					context: "general_lifestyle",
				},
				{
					french: "Quel est votre lieu de sortie préféré?",
					english: "What is your favorite place to go out?",
					context: "preferences",
				},
				{
					french: "Avec qui sortez-vous le plus souvent?",
					english: "Who do you go out with most often?",
					context: "social_circle",
				},
				{
					french: "Quelle musique aimez-vous écouter en soirée?",
					english: "What music do you like to listen to in the evening?",
					context: "entertainment_preferences",
				},
			],
			responses: [
				"J'aime sortir avec mes amis le vendredi soir.",
				"Mon café préféré est dans le quartier Latin.",
				"Je sors souvent avec ma sœur et mes collègues.",
				"J'écoute de la musique française et internationale.",
			],
		},
	],
};
