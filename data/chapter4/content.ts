// Chapter 4: "Job Interview Challenge" - Défi d'Entretien d'Embauche
// Learning Goals: Professions, nationalities, regular -er verbs, avoir, être, reflexive verbs

export const chapter4Data = {
	id: 4,
	title: "Défi d'Entretien d'Embauche",
	subtitle: "Job Interview Challenge",
	emoji: "💼",
	description:
		"Master professional French as you prepare for your dream job interview in France. Learn professions, nationalities, and essential verb conjugations.",

	// Story context
	story: {
		intro:
			"Your French language skills have impressed everyone! Now you're ready for the ultimate challenge: landing your dream job in France. Join Sophie, a career counselor, as she helps you prepare for a professional interview at a prestigious French company.",
		setting: "A modern office building in Paris",
		character:
			"You are preparing for a job interview, learning professional vocabulary and practicing formal conversation skills with Sophie",
	},
	// Learning objectives
	objectives: [
		"Description of objects, people and places",
		"Learn nationalities",
		"Speak about one's professions",
		"Express actions using regular –er ending verbs",
		"Use avoir and être correctly",
		"Understand reflexive verbs – usage and conjugation",
		"Conduct an interview of celebrity",
	],

	// Vocabulary for this chapter
	vocabulary: [
		// Professions
		{
			french: "le travail",
			english: "work/job",
			pronunciation: "luh trah-VIE",
			category: "general",
		},
		{
			french: "la profession",
			english: "profession",
			pronunciation: "lah proh-feh-see-OHN",
			category: "general",
		},
		{
			french: "l'emploi",
			english: "employment",
			pronunciation: "lahn-PLWAH",
			category: "general",
		},
		{
			french: "le médecin",
			english: "doctor",
			pronunciation: "luh mayd-SAHN",
			category: "professions",
		},
		{
			french: "l'infirmier/l'infirmière",
			english: "nurse",
			pronunciation: "lahn-feer-mee-AY/lahn-feer-mee-YEHR",
			category: "professions",
		},
		{
			french: "le professeur",
			english: "teacher",
			pronunciation: "luh proh-feh-SUR",
			category: "professions",
		},
		{
			french: "l'ingénieur",
			english: "engineer",
			pronunciation: "lahn-zhay-nee-UR",
			category: "professions",
		},
		{
			french: "l'avocat/l'avocate",
			english: "lawyer",
			pronunciation: "lah-voh-KAH/lah-voh-KAHT",
			category: "professions",
		},
		{
			french: "le comptable",
			english: "accountant",
			pronunciation: "luh kohn-TAHBL",
			category: "professions",
		},
		{
			french: "le vendeur/la vendeuse",
			english: "salesperson",
			pronunciation: "luh vahn-DUR/lah vahn-DUHZ",
			category: "professions",
		},
		{
			french: "le chef",
			english: "chef",
			pronunciation: "luh SHEF",
			category: "professions",
		},
		{
			french: "l'artiste",
			english: "artist",
			pronunciation: "lahr-TEEST",
			category: "professions",
		},
		{
			french: "le journaliste",
			english: "journalist",
			pronunciation: "luh zhoor-nah-LEEST",
			category: "professions",
		},

		// Nationalities
		{
			french: "français/française",
			english: "French",
			pronunciation: "frahn-SAY/frahn-SEHZ",
			category: "nationalities",
		},
		{
			french: "américain/américaine",
			english: "American",
			pronunciation: "ah-may-ree-KAHN/ah-may-ree-KEHN",
			category: "nationalities",
		},
		{
			french: "canadien/canadienne",
			english: "Canadian",
			pronunciation: "kah-nah-dee-AHN/kah-nah-dee-EHN",
			category: "nationalities",
		},
		{
			french: "anglais/anglaise",
			english: "English",
			pronunciation: "ahn-GLEH/ahn-GLEHZ",
			category: "nationalities",
		},
		{
			french: "allemand/allemande",
			english: "German",
			pronunciation: "ahl-MAHN/ahl-MAHND",
			category: "nationalities",
		},
		{
			french: "espagnol/espagnole",
			english: "Spanish",
			pronunciation: "ehs-pah-NYOHL/ehs-pah-NYOHL",
			category: "nationalities",
		},
		{
			french: "italien/italienne",
			english: "Italian",
			pronunciation: "ee-tah-lee-AHN/ee-tah-lee-EHN",
			category: "nationalities",
		},

		// Interview vocabulary
		{
			french: "l'entretien",
			english: "interview",
			pronunciation: "lahn-truh-tee-AHN",
			category: "interview",
		},
		{
			french: "le CV",
			english: "resume/CV",
			pronunciation: "luh say-VAY",
			category: "interview",
		},
		{
			french: "la lettre de motivation",
			english: "cover letter",
			pronunciation: "lah leh-truh duh moh-tee-vah-see-OHN",
			category: "interview",
		},
		{
			french: "l'expérience",
			english: "experience",
			pronunciation: "lehks-pay-ree-AHNS",
			category: "interview",
		},
		{
			french: "les compétences",
			english: "skills",
			pronunciation: "lay kohn-pay-TAHNS",
			category: "interview",
		},
		{
			french: "le salaire",
			english: "salary",
			pronunciation: "luh sah-LEHR",
			category: "interview",
		},
		{
			french: "la formation",
			english: "education/training",
			pronunciation: "lah for-mah-see-OHN",
			category: "interview",
		},

		// Descriptive vocabulary for objects, people, and places
		{
			french: "grand",
			english: "big/tall",
			pronunciation: "GRAHN",
			category: "descriptions",
		},
		{
			french: "petit",
			english: "small/short",
			pronunciation: "puh-TEE",
			category: "descriptions",
		},
		{
			french: "moderne",
			english: "modern",
			pronunciation: "moh-DEHRN",
			category: "descriptions",
		},
		{
			french: "ancien",
			english: "old/ancient",
			pronunciation: "ahn-see-AHN",
			category: "descriptions",
		},
		{
			french: "beau/belle",
			english: "beautiful/handsome",
			pronunciation: "BOH/BELL",
			category: "descriptions",
		},
		{
			french: "intelligent",
			english: "intelligent",
			pronunciation: "an-tel-lee-ZHAHN",
			category: "descriptions",
		},
		{
			french: "sympathique",
			english: "nice/kind",
			pronunciation: "sam-pah-TEEK",
			category: "descriptions",
		},
		{
			french: "professionnel",
			english: "professional",
			pronunciation: "proh-feh-see-oh-NELL",
			category: "descriptions",
		},

		// Places vocabulary
		{
			french: "le bureau",
			english: "office",
			pronunciation: "luh buu-ROH",
			category: "places",
		},
		{
			french: "l'entreprise",
			english: "company",
			pronunciation: "lahn-truh-PREEZ",
			category: "places",
		},
		{
			french: "l'université",
			english: "university",
			pronunciation: "luu-nee-vehr-see-TAY",
			category: "places",
		},
		{
			french: "l'hôpital",
			english: "hospital",
			pronunciation: "loh-pee-TAHL",
			category: "places",
		},

		// Objects vocabulary
		{
			french: "l'ordinateur",
			english: "computer",
			pronunciation: "lor-dee-nah-TUR",
			category: "objects",
		},
		{
			french: "le téléphone",
			english: "telephone",
			pronunciation: "luh tay-lay-FOHN",
			category: "objects",
		},
		{
			french: "le stylo",
			english: "pen",
			pronunciation: "luh stee-LOH",
			category: "objects",
		},
		{
			french: "le papier",
			english: "paper",
			pronunciation: "luh pah-pee-AY",
			category: "objects",
		},

		// Regular -er verbs
		{
			french: "travailler",
			english: "to work",
			pronunciation: "trah-vah-YAY",
			category: "verbs",
		},
		{
			french: "étudier",
			english: "to study",
			pronunciation: "ay-tuu-dee-AY",
			category: "verbs",
		},
		{
			french: "parler",
			english: "to speak",
			pronunciation: "pahr-LAY",
			category: "verbs",
		},
		{
			french: "habiter",
			english: "to live",
			pronunciation: "ah-bee-TAY",
			category: "verbs",
		},
		{
			french: "chercher",
			english: "to search/look for",
			pronunciation: "sher-SHAY",
			category: "verbs",
		},
		{
			french: "présenter",
			english: "to present",
			pronunciation: "pray-zahn-TAY",
			category: "verbs",
		},

		// Reflexive verbs
		{
			french: "se présenter",
			english: "to introduce oneself",
			pronunciation: "suh pray-zahn-TAY",
			category: "reflexive_verbs",
		},
		{
			french: "s'appeler",
			english: "to be called",
			pronunciation: "sah-play",
			category: "reflexive_verbs",
		},
		{
			french: "se préparer",
			english: "to prepare oneself",
			pronunciation: "suh pray-pah-RAY",
			category: "reflexive_verbs",
		},
		{
			french: "se lever",
			english: "to get up",
			pronunciation: "suh luh-VAY",
			category: "reflexive_verbs",
		},
	],

	// Grammar concepts for this chapter
	grammar: [
		{
			concept: "Regular -er Verbs",
			explanation:
				"Most French verbs end in -er. Remove -er and add: -e, -es, -e, -ons, -ez, -ent",
			examples: [
				"Je travaille (I work)",
				"Tu travailles (You work)",
				"Il/Elle travaille (He/She works)",
				"Nous travaillons (We work)",
				"Vous travaillez (You work - formal/plural)",
				"Ils/Elles travaillent (They work)",
			],
		},
		{
			concept: "Être (to be) - Present Tense",
			explanation: "Irregular verb meaning 'to be'",
			examples: [
				"Je suis médecin (I am a doctor)",
				"Tu es étudiant (You are a student)",
				"Il/Elle est française (He/She is French)",
				"Nous sommes ingénieurs (We are engineers)",
				"Vous êtes professeur (You are a teacher)",
				"Ils/Elles sont avocats (They are lawyers)",
			],
		},
		{
			concept: "Avoir (to have) - Present Tense",
			explanation: "Irregular verb meaning 'to have'",
			examples: [
				"J'ai de l'expérience (I have experience)",
				"Tu as un CV (You have a resume)",
				"Il/Elle a 25 ans (He/She is 25 years old)",
				"Nous avons des compétences (We have skills)",
				"Vous avez une formation (You have training)",
				"Ils/Elles ont du travail (They have work)",
			],
		},
		{
			concept: "Reflexive Verbs",
			explanation:
				"Verbs that use reflexive pronouns (me, te, se, nous, vous, se)",
			examples: [
				"Je me présente (I introduce myself)",
				"Tu te prépares (You prepare yourself)",
				"Il/Elle se lève (He/She gets up)",
				"Nous nous appelons (We are called)",
				"Vous vous présentez (You introduce yourself)",
				"Ils/Elles se préparent (They prepare themselves)",
			],
		},
	],
	// Exercises for this chapter
	exercises: [
		{
			id: "professions-vocab",
			type: "vocabulary",
			title: "Professional Vocabulary",
			instructions:
				"Match the French professions with their English translations",
		},
		{
			id: "verb-conjugation",
			type: "grammar",
			title: "Verb Conjugation Practice",
			instructions: "Conjugate -er verbs, être, and avoir correctly",
		},
		{
			id: "nationalities",
			type: "vocabulary",
			title: "Nationalities and Origins",
			instructions: "Learn how to express nationalities in French",
		},
		{
			id: "reflexive-verbs",
			type: "grammar",
			title: "Reflexive Verbs",
			instructions: "Practice reflexive verb conjugations and usage",
		},
		{
			id: "celebrity-interview-practice",
			type: "conversation",
			title: "Celebrity Interview Practice",
			instructions:
				"Practice conducting interviews with famous personalities using French questions",
		},
	],
	// Games for this chapter
	games: [
		{
			id: "interview-roleplay",
			title: "Mock Interview",
			description: "Practice a formal job interview in French",
			type: "conversation",
		},
		{
			id: "celebrity-interview",
			title: "Celebrity Interview",
			description: "Interview a famous person using French questions",
			type: "conversation",
		},
		{
			id: "profession-match",
			title: "Profession Matching Game",
			description: "Match people with their professions",
			type: "matching",
		},
	],

	// Cultural notes
	culturalNotes: [
		{
			title: "French Work Culture",
			content:
				"In France, work-life balance is highly valued. The standard work week is 35 hours, and employees enjoy generous vacation time. Lunch breaks are typically 1-2 hours long.",
		},
		{
			title: "Professional Etiquette",
			content:
				"French business culture is more formal than many other countries. Use 'vous' in professional settings, dress conservatively, and always shake hands when meeting colleagues.",
		},
		{
			title: "Interview Preparation",
			content:
				"French interviews often include detailed discussions about your motivations and career goals. Be prepared to explain why you want to work in France and your long-term objectives.",
		},
	],
	// Interview scenarios for practice
	interviewScenarios: [
		{
			question: "Présentez-vous, s'il vous plaît.",
			englishTranslation: "Please introduce yourself.",
			sampleResponse:
				"Je m'appelle [nom], je suis [nationalité], et je suis [profession]. J'ai [nombre] ans d'expérience dans [domaine].",
		},
		{
			question: "Pourquoi voulez-vous travailler dans notre entreprise?",
			englishTranslation: "Why do you want to work for our company?",
			sampleResponse:
				"Je voudrais travailler ici parce que votre entreprise a une excellente réputation et je cherche de nouvelles opportunités.",
		},
		{
			question: "Quelles sont vos compétences principales?",
			englishTranslation: "What are your main skills?",
			sampleResponse:
				"Mes compétences principales sont la communication, le travail d'équipe, et j'ai une bonne formation en [domaine].",
		},
	],

	// Celebrity interview scenarios for practice
	celebrityInterviewScenarios: [
		{
			question: "Bonjour, pouvez-vous vous présenter à nos téléspectateurs?",
			englishTranslation: "Hello, can you introduce yourself to our viewers?",
			sampleResponse:
				"Bonjour, je m'appelle [nom], je suis [profession] et je suis [nationalité]. Je travaille dans [domaine].",
		},
		{
			question:
				"Parlez-nous de votre métier. Qu'est-ce que vous faites exactement?",
			englishTranslation: "Tell us about your job. What exactly do you do?",
			sampleResponse:
				"Je suis [profession]. Je travaille [description du travail]. J'ai étudié [formation] et j'ai [nombre] ans d'expérience.",
		},
		{
			question: "D'où venez-vous? Quelle est votre nationalité?",
			englishTranslation: "Where are you from? What is your nationality?",
			sampleResponse:
				"Je viens de [pays]. Je suis [nationalité]. J'habite maintenant à [ville].",
		},
		{
			question: "Comment vous préparez-vous pour votre travail?",
			englishTranslation: "How do you prepare for your work?",
			sampleResponse:
				"Je me lève tôt, je me prépare soigneusement, et j'étudie mes rôles/projets. Je me présente toujours professionnel(le).",
		},
	],
};
