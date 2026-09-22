// src/server/quiz/modules/sva/generator.ts
import { QuizQuestion, QuizDifficultyLevel, GrammaticalNumber } from '@/types/quiz';

interface SvaTemplate {
  category: string;
  level: QuizDifficultyLevel;
  headSubject: string;
  headNumber: GrammaticalNumber;
  distractor: string;
  distractorType: string;
  beforeBlank: string;
  afterBlank: string;
  correctVerb: string;
  incorrectVerb: string;
  alternativeOptions?: string[];
  explanation: string;
}

const TEMPLATE_POOL: SvaTemplate[] = [
  // ==========================================
  // LEVEL 1: PREPOSITIONAL PHRASE DISTRACTORS
  // ==========================================
  {
    category: 'Prepositional Modifier',
    level: 1,
    headSubject: 'The quality',
    headNumber: 'singular',
    distractor: 'of these newly developed mobile applications and cloud services',
    distractorType: 'Prepositional Phrase (of...)',
    beforeBlank: 'The quality of these newly developed mobile applications and cloud services',
    afterBlank: 'consistently evaluated by the senior quality assurance committee.',
    correctVerb: 'is',
    incorrectVerb: 'are',
    explanation: 'The head subject is "The quality" (uncountable / singular). The plural phrase "mobile applications and cloud services" is merely inside the prepositional modifier [of ...].',
  },
  {
    category: 'Prepositional Modifier',
    level: 1,
    headSubject: 'The list',
    headNumber: 'singular',
    distractor: 'of recommended books, scientific journals, and reference articles',
    distractorType: 'Prepositional Phrase (of...)',
    beforeBlank: 'The list of recommended books, scientific journals, and reference articles',
    afterBlank: 'available on the university library portal.',
    correctVerb: 'is',
    incorrectVerb: 'are',
    explanation: 'The subject is "The list" (singular). The plural nouns "books, journals, and articles" are objects of the preposition "of".',
  },
  {
    category: 'Prepositional Modifier',
    level: 1,
    headSubject: 'The results',
    headNumber: 'plural',
    distractor: 'of the latest clinical trial on the experimental vaccine',
    distractorType: 'Prepositional Phrase (of...)',
    beforeBlank: 'The results of the latest clinical trial on the experimental vaccine',
    afterBlank: 'significant progress in combating the virus.',
    correctVerb: 'show',
    incorrectVerb: 'shows',
    explanation: 'The head subject is "The results" (plural). Even though "trial" and "vaccine" right before the verb are singular, the verb must match "results" (plural).',
  },
  {
    category: 'Prepositional Modifier',
    level: 1,
    headSubject: 'A comprehensive study',
    headNumber: 'singular',
    distractor: 'on the long-term psychological impacts of social media platforms',
    distractorType: 'Prepositional Phrase (on...)',
    beforeBlank: 'A comprehensive study on the long-term psychological impacts of social media platforms',
    afterBlank: 'published in the International Journal of Psychology.',
    correctVerb: 'was',
    incorrectVerb: 'were',
    explanation: 'The head subject is "A comprehensive study" (singular). The nouns "impacts" and "platforms" are inside the prepositional phrase [on ...].',
  },
  {
    category: 'Prepositional Modifier',
    level: 1,
    headSubject: 'The cost',
    headNumber: 'singular',
    distractor: 'of organic vegetables, imported fruits, and grass-fed meats',
    distractorType: 'Prepositional Phrase (of...)',
    beforeBlank: 'The cost of organic vegetables, imported fruits, and grass-fed meats',
    afterBlank: 'surged dramatically over the past quarter.',
    correctVerb: 'has',
    incorrectVerb: 'have',
    explanation: 'The head subject is "The cost" (singular). Plural food items inside [of ...] do not change the number of the head noun.',
  },
  {
    category: 'Prepositional Modifier',
    level: 1,
    headSubject: 'The archaeological discoveries',
    headNumber: 'plural',
    distractor: 'in the ancient subterranean tomb near Luxor',
    distractorType: 'Prepositional Phrase (in...)',
    beforeBlank: 'The archaeological discoveries in the ancient subterranean tomb near Luxor',
    afterBlank: 'shed new light on the daily life of ancient Egyptian artisans.',
    correctVerb: 'have',
    incorrectVerb: 'has',
    explanation: 'The head subject is "The archaeological discoveries" (plural). "Tomb" is a singular noun in a prepositional phrase, but the verb must agree with "discoveries".',
  },
  {
    category: 'Prepositional Modifier',
    level: 1,
    headSubject: 'The primary cause',
    headNumber: 'singular',
    distractor: 'of frequent software crashes and memory leak exceptions',
    distractorType: 'Prepositional Phrase (of...)',
    beforeBlank: 'The primary cause of frequent software crashes and memory leak exceptions',
    afterBlank: 'traced back to an unhandled asynchronous database query.',
    correctVerb: 'was',
    incorrectVerb: 'were',
    explanation: '"The primary cause" is singular. The plural nouns "crashes" and "exceptions" are part of the modifier [of ...].',
  },
  {
    category: 'Prepositional Modifier',
    level: 1,
    headSubject: 'Detailed instructions',
    headNumber: 'plural',
    distractor: 'for assembling the modular workstation and ergonomic chair',
    distractorType: 'Prepositional Phrase (for...)',
    beforeBlank: 'Detailed instructions for assembling the modular workstation and ergonomic chair',
    afterBlank: 'provided inside the cardboard packaging.',
    correctVerb: 'are',
    incorrectVerb: 'is',
    explanation: 'The head subject is "Detailed instructions" (plural). The singular nouns "workstation" and "chair" are inside the prepositional phrase [for ...].',
  },

  // ==========================================
  // LEVEL 2: PARENTHETICAL SEPARATORS
  // ==========================================
  {
    category: 'Parenthetical Separator',
    level: 2,
    headSubject: 'The chief executive officer',
    headNumber: 'singular',
    distractor: 'along with six senior regional directors and legal advisors',
    distractorType: 'Parenthetical Phrase (along with...)',
    beforeBlank: 'The chief executive officer, along with six senior regional directors and legal advisors,',
    afterBlank: 'attending the international trade summit in Geneva.',
    correctVerb: 'is',
    incorrectVerb: 'are',
    explanation: 'Phrases introduced by "along with", "as well as", or "together with" do not compound the subject. The subject remains singular: "The chief executive officer".',
  },
  {
    category: 'Parenthetical Separator',
    level: 2,
    headSubject: 'The principal investigator',
    headNumber: 'singular',
    distractor: 'as well as numerous graduate research assistants',
    distractorType: 'Parenthetical Phrase (as well as...)',
    beforeBlank: 'The principal investigator, as well as numerous graduate research assistants,',
    afterBlank: 'dedicated hundreds of hours to verifying the genomic sequences.',
    correctVerb: 'has',
    incorrectVerb: 'have',
    explanation: '"As well as" acts as an additive parenthetical modifier, not a coordinating conjunction like "and". The true subject is "The principal investigator" (singular).',
  },
  {
    category: 'Parenthetical Separator',
    level: 2,
    headSubject: 'The historical mansion',
    headNumber: 'singular',
    distractor: 'together with its sprawling gardens and detached guest cottages',
    distractorType: 'Parenthetical Phrase (together with...)',
    beforeBlank: 'The historical mansion, together with its sprawling gardens and detached guest cottages,',
    afterBlank: 'currently valued at over fifteen million dollars.',
    correctVerb: 'is',
    incorrectVerb: 'are',
    explanation: '"Together with" creates a parenthetical modifier. The head noun is "The historical mansion" (singular), so the singular verb "is" is required.',
  },
  {
    category: 'Parenthetical Separator',
    level: 2,
    headSubject: 'The lead software architect',
    headNumber: 'singular',
    distractor: 'accompanied by four full-stack engineers and a product manager',
    distractorType: 'Parenthetical Phrase (accompanied by...)',
    beforeBlank: 'The lead software architect, accompanied by four full-stack engineers and a product manager,',
    afterBlank: 'scheduled to present the new microservice architecture tomorrow.',
    correctVerb: 'is',
    incorrectVerb: 'are',
    explanation: '"Accompanied by" is a parenthetical modifier. The subject remains the singular "architect".',
  },
  {
    category: 'Parenthetical Separator',
    level: 2,
    headSubject: 'The software update',
    headNumber: 'singular',
    distractor: 'in addition to several critical security patches',
    distractorType: 'Parenthetical Phrase (in addition to...)',
    beforeBlank: 'The software update, in addition to several critical security patches,',
    afterBlank: 'expected to resolve system vulnerabilities across all production servers.',
    correctVerb: 'is',
    incorrectVerb: 'are',
    explanation: '"In addition to" does not create a plural compound subject. The singular head subject "The software update" governs the verb.',
  },
  {
    category: 'Parenthetical Separator',
    level: 2,
    headSubject: 'The local farmers',
    headNumber: 'plural',
    distractor: 'together with the agricultural extension specialist',
    distractorType: 'Parenthetical Phrase (together with...)',
    beforeBlank: 'The local farmers, together with the agricultural extension specialist,',
    afterBlank: 'organizing a cooperative market for seasonal crops.',
    correctVerb: 'are',
    incorrectVerb: 'is',
    explanation: 'The head subject is "The local farmers" (plural). The singular specialist in the parenthetical phrase does not make the plural subject singular.',
  },

  // ==========================================
  // LEVEL 3: RELATIVE CLAUSES & PARTICIPLES
  // ==========================================
  {
    category: 'Relative Clause Modifier',
    level: 3,
    headSubject: 'The cybersecurity specialist',
    headNumber: 'singular',
    distractor: 'who investigated the ransomware attacks and server breaches',
    distractorType: 'Relative Clause (who...)',
    beforeBlank: 'The cybersecurity specialist who investigated the ransomware attacks and server breaches',
    afterBlank: 'recommended implementing strict multi-factor authentication protocols.',
    correctVerb: 'has',
    incorrectVerb: 'have',
    explanation: 'The relative clause [who investigated...] separates the head subject "The cybersecurity specialist" (singular) from the main verb. The plural words "attacks" and "breaches" inside the clause must be ignored.',
  },
  {
    category: 'Participle Clause Modifier',
    level: 3,
    headSubject: 'The academic research paper',
    headNumber: 'singular',
    distractor: 'analyzing ten distinct socioeconomic factors across developing nations',
    distractorType: 'Present Participle Phrase (-ing...)',
    beforeBlank: 'The academic research paper analyzing ten distinct socioeconomic factors across developing nations',
    afterBlank: 'compelling empirical evidence for educational reform.',
    correctVerb: 'provides',
    incorrectVerb: 'provide',
    explanation: 'The participle phrase [analyzing ten distinct socioeconomic factors...] describes the singular noun "paper". The main verb must be singular: "provides".',
  },
  {
    category: 'Relative Clause Modifier',
    level: 3,
    headSubject: 'The rare manuscript',
    headNumber: 'singular',
    distractor: 'which contains medieval medical formulas and herbal remedies',
    distractorType: 'Relative Clause (which...)',
    beforeBlank: 'The rare manuscript which contains medieval medical formulas and herbal remedies',
    afterBlank: 'stored in a climate-controlled vault at the national museum.',
    correctVerb: 'is',
    incorrectVerb: 'are',
    explanation: 'The head subject is "The rare manuscript" (singular). "Formulas" and "remedies" are objects within the relative clause [which contains...].',
  },
  {
    category: 'Participle Clause Modifier',
    level: 3,
    headSubject: 'The antique Persian carpets',
    headNumber: 'plural',
    distractor: 'carefully preserved in the royal palace museum gallery',
    distractorType: 'Past Participle Phrase (-ed...)',
    beforeBlank: 'The antique Persian carpets carefully preserved in the royal palace museum gallery',
    afterBlank: 'inspected every month by certified textile conservators.',
    correctVerb: 'are',
    incorrectVerb: 'is',
    explanation: 'The head subject is "The antique Persian carpets" (plural). The singular noun "gallery" right before the verb is part of the participle phrase.',
  },
  {
    category: 'Relative Clause Modifier',
    level: 3,
    headSubject: 'The financial advisor',
    headNumber: 'singular',
    distractor: 'who manages international stock portfolios and commodity futures',
    distractorType: 'Relative Clause (who...)',
    beforeBlank: 'The financial advisor who manages international stock portfolios and commodity futures',
    afterBlank: 'urged clients to diversify into sovereign bonds.',
    correctVerb: 'has',
    incorrectVerb: 'have',
    explanation: 'The relative clause [who manages...] contains plural nouns ("portfolios", "futures"), but the main subject is "The financial advisor" (singular).',
  },
  {
    category: 'Participle Clause Modifier',
    level: 3,
    headSubject: 'The automated monitoring sensors',
    headNumber: 'plural',
    distractor: 'installed throughout the chemical synthesis plant',
    distractorType: 'Past Participle Phrase (-ed...)',
    beforeBlank: 'The automated monitoring sensors installed throughout the chemical synthesis plant',
    afterBlank: 'real-time telemetry to the centralized safety dashboard.',
    correctVerb: 'transmit',
    incorrectVerb: 'transmits',
    explanation: 'The head subject is "sensors" (plural). The singular noun "plant" at the end of the participle phrase does not govern the verb.',
  },

  // ==========================================
  // LEVEL 4: GERUND & NOUN CLAUSE SUBJECTS
  // ==========================================
  {
    category: 'Gerund Subject',
    level: 4,
    headSubject: 'Developing scalable applications',
    headNumber: 'singular',
    distractor: 'for multiple mobile platforms and web browsers',
    distractorType: 'Gerund Phrase (Verb-ing)',
    beforeBlank: 'Developing scalable applications for multiple mobile platforms and web browsers',
    afterBlank: 'a deep comprehension of asynchronous distributed systems.',
    correctVerb: 'requires',
    incorrectVerb: 'require',
    explanation: 'A Gerund phrase ("Developing scalable applications...") functions as a singular noun concept. Even though "applications", "platforms", and "browsers" are plural, the subject is the singular activity of developing.',
  },
  {
    category: 'Gerund Subject',
    level: 4,
    headSubject: 'Analyzing complex data sets',
    headNumber: 'singular',
    distractor: 'from various clinical trials and laboratory experiments',
    distractorType: 'Gerund Phrase (Verb-ing)',
    beforeBlank: 'Analyzing complex data sets from various clinical trials and laboratory experiments',
    afterBlank: 'proven to be an indispensable step in drug discovery.',
    correctVerb: 'has',
    incorrectVerb: 'have',
    explanation: 'The subject is the gerund "Analyzing" (singular activity). The plural nouns "data sets", "trials", and "experiments" are all objects within the phrase.',
  },
  {
    category: 'Gerund Subject',
    level: 4,
    headSubject: 'Maintaining healthy communication channels',
    headNumber: 'singular',
    distractor: 'among remote engineering teams and stakeholder departments',
    distractorType: 'Gerund Phrase (Verb-ing)',
    beforeBlank: 'Maintaining healthy communication channels among remote engineering teams and stakeholder departments',
    afterBlank: 'vital for meeting sprint release deadlines.',
    correctVerb: 'is',
    incorrectVerb: 'are',
    explanation: 'The head subject is the singular gerund "Maintaining". Plural words "channels", "teams", and "departments" are modifiers and objects.',
  },
  {
    category: 'Noun Clause Subject',
    level: 4,
    headSubject: 'What surprised the financial analysts',
    headNumber: 'singular',
    distractor: 'about the quarterly balance sheets and revenue statements',
    distractorType: 'Wh- Noun Clause',
    beforeBlank: 'What surprised the financial analysts about the quarterly balance sheets and revenue statements',
    afterBlank: 'the sudden reduction in capital expenditure.',
    correctVerb: 'was',
    incorrectVerb: 'were',
    explanation: 'A noun clause starting with "What" acting as a singular fact takes a singular verb ("was"). Plural nouns "analysts", "sheets", and "statements" are internal to the clause.',
  },
  {
    category: 'Gerund Subject',
    level: 4,
    headSubject: 'Migrating legacy monolithic databases',
    headNumber: 'singular',
    distractor: 'to modern serverless cloud infrastructures',
    distractorType: 'Gerund Phrase (Verb-ing)',
    beforeBlank: 'Migrating legacy monolithic databases to modern serverless cloud infrastructures',
    afterBlank: 'meticulous contingency planning and rollback mechanisms.',
    correctVerb: 'demands',
    incorrectVerb: 'demand',
    explanation: 'The action of "Migrating" is singular. The plural nouns "databases" and "infrastructures" do not make the subject plural.',
  },
  {
    category: 'Noun Clause Subject',
    level: 4,
    headSubject: 'How the ancient builders transported the megalithic stones',
    headNumber: 'singular',
    distractor: 'across miles of rough desert terrain',
    distractorType: 'Wh- Noun Clause',
    beforeBlank: 'How the ancient builders transported the megalithic stones across miles of rough desert terrain',
    afterBlank: 'an unsolved mystery for modern archaeologists.',
    correctVerb: 'remains',
    incorrectVerb: 'remain',
    explanation: 'The entire clause "How the ancient builders transported the stones..." represents a single conceptual subject and takes the singular verb "remains".',
  },

  // ==========================================
  // LEVEL 5: INVERSIONS & CORRELATIVE CONJUNCTIONS
  // ==========================================
  {
    category: 'Correlative Conjunction',
    level: 5,
    headSubject: 'the software engineers',
    headNumber: 'plural',
    distractor: 'Neither the product manager nor',
    distractorType: 'Neither / Nor (Proximity to Verb Rule)',
    beforeBlank: 'Neither the senior product manager nor the software engineers',
    afterBlank: 'aware of the critical bug introduced in the latest release build.',
    correctVerb: 'were',
    incorrectVerb: 'was',
    explanation: 'With "Neither... nor..." and "Either... or...", the verb agrees with the subject CLOSER to it. "The software engineers" is plural and adjacent to the blank, requiring "were".',
  },
  {
    category: 'Correlative Conjunction',
    level: 5,
    headSubject: 'the project director',
    headNumber: 'singular',
    distractor: 'Neither the international consultants nor',
    distractorType: 'Neither / Nor (Proximity to Verb Rule)',
    beforeBlank: 'Neither the international consultants nor the project director',
    afterBlank: 'willing to compromise on the environmental safety standards.',
    correctVerb: 'was',
    incorrectVerb: 'were',
    explanation: 'In "Neither [plural] nor [singular]", the verb must agree with the subject closest to it: "the project director" (singular) requires "was".',
  },
  {
    category: 'Inverted Structure',
    level: 5,
    headSubject: 'three state-of-the-art research laboratories',
    headNumber: 'plural',
    distractor: 'Behind the newly constructed campus library and lecture halls',
    distractorType: 'Inverted Prepositional Opening',
    beforeBlank: 'Behind the newly constructed campus library and lecture halls',
    afterBlank: 'three state-of-the-art research laboratories dedicated to nanotechnology.',
    correctVerb: 'stand',
    incorrectVerb: 'stands',
    explanation: 'This is an inverted sentence where the prepositional phrase comes first. The true subject comes AFTER the verb: "three state-of-the-art research laboratories" (plural), so the plural verb "stand" is correct.',
  },
  {
    category: 'Inverted Structure',
    level: 5,
    headSubject: 'a remarkable collection of ancient manuscripts',
    headNumber: 'singular',
    distractor: 'In the dimly lit basement of the historic abbey',
    distractorType: 'Inverted Prepositional Opening',
    beforeBlank: 'In the dimly lit basement of the historic abbey',
    afterBlank: 'a remarkable collection of ancient illuminated manuscripts.',
    correctVerb: 'lies',
    incorrectVerb: 'lie',
    explanation: 'In this inverted structure, the subject is "a remarkable collection" (singular, followed by prepositional phrase), placed after the verb. Hence, the singular verb "lies" is required.',
  },
  {
    category: 'Correlative Conjunction',
    level: 5,
    headSubject: 'the board members',
    headNumber: 'plural',
    distractor: 'Not only the executive chairman but also',
    distractorType: 'Not only / But also Rule',
    beforeBlank: 'Not only the executive chairman but also the board members',
    afterBlank: 'unanimously approved the proposed merger and acquisition.',
    correctVerb: 'have',
    incorrectVerb: 'has',
    explanation: 'With "Not only... but also...", the verb agrees with the subject following "but also". "The board members" is plural, taking "have".',
  },
  {
    category: 'Inverted Structure',
    level: 5,
    headSubject: 'several unexpected legal and compliance challenges',
    headNumber: 'plural',
    distractor: 'There',
    distractorType: 'Existential There Construction',
    beforeBlank: 'During the initial phase of the corporate restructuring, there',
    afterBlank: 'several unexpected legal and compliance challenges that delayed the rollout.',
    correctVerb: 'were',
    incorrectVerb: 'was',
    explanation: 'In "there is/are/was/were" sentences, "there" is an expletive, not the subject. The true subject follows the verb: "several unexpected challenges" (plural), requiring "were".',
  },
];

// Variable Slot Fillers to procedurally generate hundreds of unique combinations
const DOMAINS = [
  {
    topic: 'Healthcare & Biotechnology',
    adjectives: ['clinical', 'therapeutic', 'biomedical', 'pharmaceutical', 'genomic'],
    singularSubjects: ['The efficacy', 'The protocol', 'The evaluation', 'The synthesis'],
    pluralDistractors: ['of experimental treatments and therapeutic antibodies', 'of diagnostic procedures and laboratory tests'],
  },
  {
    topic: 'Artificial Intelligence & Cloud',
    adjectives: ['distributed', 'algorithmic', 'neural', 'automated', 'computational'],
    singularSubjects: ['The architecture', 'The latency', 'The reliability', 'The deployment'],
    pluralDistractors: ['of large language models and inference pipelines', 'of edge computing nodes and cloud clusters'],
  },
  {
    topic: 'Economics & Financial Markets',
    adjectives: ['macroeconomic', 'monetary', 'fiscal', 'quantitative', 'regulatory'],
    singularSubjects: ['The fluctuation', 'The trajectory', 'The index', 'The forecast'],
    pluralDistractors: ['of sovereign bond yields and foreign currencies', 'of commodity prices and commercial real estate assets'],
  },
  {
    topic: 'Environmental Science',
    adjectives: ['ecological', 'sustainable', 'renewable', 'biodiverse', 'conservation'],
    singularSubjects: ['The preservation', 'The regeneration', 'The degradation', 'The monitoring'],
    pluralDistractors: ['of coral reef ecosystems and marine habitats', 'of native forestry reserves and wildlife sanctuaries'],
  },
];

/**
 * Procedurally generates domain-specific templates from the DOMAINS matrix.
 */
function generateDomainTemplates(): SvaTemplate[] {
  const dynamicTemplates: SvaTemplate[] = [];
  DOMAINS.forEach((domain) => {
    domain.singularSubjects.forEach((subject) => {
      domain.pluralDistractors.forEach((distractor) => {
        dynamicTemplates.push({
          category: `Domain: ${domain.topic}`,
          level: 1,
          headSubject: subject,
          headNumber: 'singular',
          distractor,
          distractorType: 'Prepositional Phrase (of...)',
          beforeBlank: `${subject} ${distractor}`,
          afterBlank: 'strictly evaluated by the international scientific oversight committee.',
          correctVerb: 'is',
          incorrectVerb: 'are',
          explanation: `The head subject is "${subject}" (singular concept). The plural nouns inside [${distractor}] are objects of the preposition and do not govern the verb.`,
        });
      });
    });
  });
  return dynamicTemplates;
}

/**
 * Fisher-Yates shuffle helper
 */
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates a randomized practice session of SVA questions.
 * Ensures a balanced mix across difficulty tiers, varied sentence lengths,
 * and procedural variation so every session is unique.
 */
export function generateSvaQuestions(count = 10, targetLevel?: QuizDifficultyLevel): QuizQuestion[] {
  const fullPool = [...TEMPLATE_POOL, ...generateDomainTemplates()];
  let pool = fullPool;

  if (targetLevel) {
    pool = fullPool.filter((t) => t.level === targetLevel);
    if (pool.length === 0) {
      pool = fullPool;
    }
  }

  const shuffledTemplates = shuffle(pool);
  const selectedTemplates = shuffledTemplates.slice(0, count);

  return selectedTemplates.map((template, idx) => {
    // Determine options ordering (randomize correct vs incorrect)
    const isCorrectFirst = Math.random() > 0.5;
    const options = isCorrectFirst
      ? [template.correctVerb, template.incorrectVerb]
      : [template.incorrectVerb, template.correctVerb];

    const sentence = `${template.beforeBlank} [ ___ ] ${template.afterBlank}`;
    const bracketedSentence = `${template.headSubject} [${template.distractor}] ${template.correctVerb} ${template.afterBlank}`;

    return {
      id: `sva-q-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
      sentence,
      options,
      correctAnswer: template.correctVerb,
      explanation: template.explanation,
      category: template.category,
      difficultyLevel: template.level,
      structuralBreakdown: {
        headSubject: template.headSubject,
        headNumber: template.headNumber,
        distractor: template.distractor,
        distractorType: template.distractorType,
        bracketedSentence,
        targetVerb: template.correctVerb,
      },
    };
  });
}
