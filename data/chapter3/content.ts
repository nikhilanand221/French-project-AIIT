// Chapter 3: "Meet & Greet" - People, Places, and Family
// Learning Goals: Describing people, identifying objects and places, family relations

export const chapter3Data = {
	id: 3,
	title: "Meet & Greet",
	subtitle: "People, Places, and Family",
	emoji: "👥",
	description:
		"Make connections and build relationships by learning to describe people, identify places, and talk about family.",

	// Story context
	story: {
		intro:
			"Your French journey continues as you explore the vibrant social life of France. Meet Marie's family and friends, learn to describe people and places, and discover the importance of family in French culture.",
		setting: "Marie's family home and neighborhood in Lyon",
		character:
			"You are visiting Marie's family, learning to describe people, places, and understand family relationships in French society",
	},
	// Learning objectives
	objectives: [
		"Describe a person",
		"Identify a person, object and place",
		"Describe relations in a family",
		"Identify a specific person, object and place",
	],
	// Vocabulary for this chapter
	vocabulary: [
		// Family members
		{
			french: "la famille",
			english: "family",
			pronunciation: "lah fah-MEEL",
			category: "family",
		},
		{
			french: "le père",
			english: "father",
			pronunciation: "luh PEHR",
			category: "family",
		},
		{
			french: "la mère",
			english: "mother",
			pronunciation: "lah MEHR",
			category: "family",
		},
		{
			french: "le fils",
			english: "son",
			pronunciation: "luh FEES",
			category: "family",
		},
		{
			french: "la fille",
			english: "daughter",
			pronunciation: "lah FEEL",
			category: "family",
		},
		{
			french: "le frère",
			english: "brother",
			pronunciation: "luh FREHR",
			category: "family",
		},
		{
			french: "la sœur",
			english: "sister",
			pronunciation: "lah SUR",
			category: "family",
		},
		{
			french: "les grands-parents",
			english: "grandparents",
			pronunciation: "lay grahn-pah-RAHN",
			category: "family",
		},
		{
			french: "le grand-père",
			english: "grandfather",
			pronunciation: "luh grahn-PEHR",
			category: "family",
		},
		{
			french: "la grand-mère",
			english: "grandmother",
			pronunciation: "lah grahn-MEHR",
			category: "family",
		},

		// Physical descriptions
		{
			french: "grand",
			english: "tall",
			pronunciation: "GRAHN",
			category: "descriptions",
		},
		{
			french: "petit",
			english: "short/small",
			pronunciation: "puh-TEE",
			category: "descriptions",
		},
		{
			french: "gros",
			english: "fat/big",
			pronunciation: "GROH",
			category: "descriptions",
		},
		{
			french: "mince",
			english: "thin",
			pronunciation: "MAHNSS",
			category: "descriptions",
		},
		{
			french: "beau/belle",
			english: "beautiful/handsome",
			pronunciation: "BOH/BELL",
			category: "descriptions",
		},
		{
			french: "laid",
			english: "ugly",
			pronunciation: "LEH",
			category: "descriptions",
		},
		{
			french: "jeune",
			english: "young",
			pronunciation: "ZHUN",
			category: "descriptions",
		},
		{
			french: "vieux/vieille",
			english: "old",
			pronunciation: "vee-UH/vee-AY",
			category: "descriptions",
		},

		// Hair and eyes
		{
			french: "les cheveux",
			english: "hair",
			pronunciation: "lay shuh-VUH",
			category: "appearance",
		},
		{
			french: "blond",
			english: "blonde",
			pronunciation: "BLOHN",
			category: "appearance",
		},
		{
			french: "brun",
			english: "brown/brunette",
			pronunciation: "BRUHN",
			category: "appearance",
		},
		{
			french: "roux",
			english: "red/ginger",
			pronunciation: "ROO",
			category: "appearance",
		},
		{
			french: "les yeux",
			english: "eyes",
			pronunciation: "lay ZYUH",
			category: "appearance",
		},
		{
			french: "bleu",
			english: "blue",
			pronunciation: "BLUH",
			category: "appearance",
		},
		{
			french: "vert",
			english: "green",
			pronunciation: "VEHR",
			category: "appearance",
		},
		{
			french: "marron",
			english: "brown",
			pronunciation: "mah-ROHN",
			category: "appearance",
		},

		// Places
		{
			french: "la maison",
			english: "house",
			pronunciation: "lah meh-ZOHN",
			category: "places",
		},
		{
			french: "l'appartement",
			english: "apartment",
			pronunciation: "lah-par-tuh-MAHN",
			category: "places",
		},
		{
			french: "la rue",
			english: "street",
			pronunciation: "lah RUU",
			category: "places",
		},
		{
			french: "la ville",
			english: "city",
			pronunciation: "lah VEEL",
			category: "places",
		},
		{
			french: "le quartier",
			english: "neighborhood",
			pronunciation: "luh kar-tee-AY",
			category: "places",
		},
		{
			french: "le parc",
			english: "park",
			pronunciation: "luh PARK",
			category: "places",
		},
		{
			french: "l'école",
			english: "school",
			pronunciation: "lay-KOHL",
			category: "places",
		},
		{
			french: "le magasin",
			english: "store",
			pronunciation: "luh mah-gah-ZAHN",
			category: "places",
		},

		// Objects
		{
			french: "la table",
			english: "table",
			pronunciation: "lah TAHBL",
			category: "objects",
		},
		{
			french: "la chaise",
			english: "chair",
			pronunciation: "lah SHEHZ",
			category: "objects",
		},
		{
			french: "le livre",
			english: "book",
			pronunciation: "luh LEEVR",
			category: "objects",
		},
		{
			french: "le téléphone",
			english: "telephone",
			pronunciation: "luh tay-lay-FOHN",
			category: "objects",
		},
		{
			french: "la voiture",
			english: "car",
			pronunciation: "lah vwah-TUUR",
			category: "objects",
		},
		{
			french: "le sac",
			english: "bag",
			pronunciation: "luh SAHK",
			category: "objects",
		},
	],
	// Grammar concepts for this chapter
	grammar: [
		{
			concept: "Descriptive Adjectives",
			explanation:
				"Adjectives that describe physical appearance and personality",
			examples: [
				"Il est grand et beau (He is tall and handsome)",
				"Elle est petite et intelligente (She is small and intelligent)",
				"Mes cheveux sont bruns (My hair is brown)",
			],
		},
		{
			concept: "Agreement of Adjectives",
			explanation: "Adjectives must agree with the gender and number of nouns",
			examples: [
				"Un homme grand → Une femme grande",
				"Il est beau → Elle est belle",
				"Des yeux bleus → Des yeux verts",
			],
		},
		{
			concept: "Demonstrative Adjectives",
			explanation:
				"Ce, cette, ces - pointing out specific people, objects, places",
			examples: [
				"Ce garçon (This boy)",
				"Cette fille (This girl)",
				"Ces maisons (These houses)",
			],
		},
		{
			concept: "Possessive Adjectives",
			explanation:
				"Mon, ma, mes, ton, ta, tes, son, sa, ses - showing ownership",
			examples: [
				"Ma famille (My family)",
				"Ton père (Your father)",
				"Ses yeux (His/her eyes)",
			],
		},
	],
	// Exercises for this chapter
	exercises: [
		{
			id: "family-vocabulary",
			type: "vocabulary",
			title: "Family Members Practice",
			instructions:
				"Match the French family terms with their English translations",
		},
		{
			id: "describing-people",
			type: "conversation",
			title: "Describing People",
			instructions: "Practice describing people's appearance and personality",
		},
		{
			id: "adjective-agreement",
			type: "grammar",
			title: "Adjective Agreement",
			instructions:
				"Choose the correct form of adjectives based on gender and number",
		},
		{
			id: "demonstrative-adjectives",
			type: "grammar",
			title: "This, That, These, Those",
			instructions:
				"Practice using ce, cette, ces to identify specific objects and people",
		},
	],

	// Games for this chapter
	games: [
		{
			id: "family-tree",
			title: "Family Tree Builder",
			description: "Build a family tree using French vocabulary",
			type: "puzzle",
		},
		{
			id: "description-game",
			title: "Guess Who - French Edition",
			description: "Describe people and guess who is being described",
			type: "guessing",
		},
		{
			id: "place-identification",
			title: "Where Am I?",
			description: "Identify places based on descriptions",
			type: "matching",
		},
	],

	// Assessment
	assessment: {
		passingScore: 70,
		timeLimit: 15,
		questions: [
			{
				id: 1,
				type: "multiple_choice",
				question: "Comment dit-on 'tall' en français?",
				options: ["grand", "petit", "gros", "mince"],
				correct: 0,
			},
			{
				id: 2,
				type: "translation",
				question: "Traduisez: 'This is my father'",
				correct: "C'est mon père",
			},
			{
				id: 3,
				type: "multiple_choice",
				question: "Quelle est la forme féminine de 'beau'?",
				options: ["beau", "belle", "beaux", "belles"],
				correct: 1,
			},
			{
				id: 4,
				type: "fill_blank",
				question: "Ma _____ habite dans une grande maison. (grandmother)",
				correct: "grand-mère",
			},
			{
				id: 5,
				type: "multiple_choice",
				question: "Comment dit-on 'these houses' en français?",
				options: ["ce maison", "cette maisons", "ces maisons", "cet maisons"],
				correct: 2,
			},
		],
	},

	// Cultural notes
	culturalNotes: [
		{
			title: "French Family Values",
			content:
				"Family is extremely important in French culture. Sunday family meals are traditional, and multiple generations often live close to each other. The concept of 'la famille élargie' (extended family) includes close family friends.",
		},
		{
			title: "French Social Etiquette",
			content:
				"When meeting someone in France, it's customary to shake hands or give 'la bise' (air kisses on both cheeks) depending on your relationship. Formal introductions use 'Monsieur' or 'Madame' followed by the last name.",
		},
		{
			title: "French Architecture and Housing",
			content:
				"French cities feature a mix of historic architecture and modern buildings. Many French people live in apartments rather than houses, especially in cities. The typical French home prioritizes intimate family spaces.",
		},
	],
};
