/**
 * VocabPro - Idioms & Phrases Database
 * 1116 common idioms and phrases for competitive exams
 * Each entry: idiom, meaning, example, exam relevance, category
 */
const idiomsDB = [
  {
    "idiom": "Sweeping Statement",
    "meaning": "Thoughtless statement",
    "example": "Saying that all politicians are dishonest is a sweeping statement with no evidence.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "All At Sea",
    "meaning": "Puzzled",
    "example": "When the professor switched to advanced calculus, the new students were all at sea.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Enough Rope",
    "meaning": "Enough freedom for action",
    "example": "The manager gave the trainee enough rope, letting him handle the project his own way.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "By Fits And Start",
    "meaning": "Irregularly",
    "example": "His preparation went by fits and starts, so he was never fully ready for the exam.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Fell Foul Of",
    "meaning": "Got into trouble with",
    "example": "The contractor fell foul of the new safety regulations and was fined heavily.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Token Strike",
    "meaning": "Short strike held as warning",
    "example": "The workers held a token strike for one hour to warn the management.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Face The Music",
    "meaning": "Get reprimanded",
    "example": "After missing the deadline, he had to face the music in front of his boss.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Look Down Upon",
    "meaning": "Hate intensely",
    "example": "One should never look down upon people who do manual labour.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Flogging A Dead Horse",
    "meaning": "Wasting time in useless effort",
    "example": "Arguing with him after the decision was made was just flogging a dead horse.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Under A Cloud",
    "meaning": "Under suspicion",
    "example": "Ever since the audit, the officer has been under a cloud of suspicion.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Played Havoc",
    "meaning": "Caused destruction",
    "example": "The sudden floods played havoc with the farmers' standing crops.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "No Love Lost Between",
    "meaning": "Not on good terms",
    "example": "There is no love lost between the two rival shopkeepers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Fair And Square",
    "meaning": "Honest",
    "example": "She won the election fair and square, with the highest number of votes.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A White Elephant",
    "meaning": "Costly or troublesome possession",
    "example": "The unused stadium became a white elephant, draining the city's budget.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Out And Out",
    "meaning": "Totally",
    "example": "He is an out and out gentleman, always courteous to everyone.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Cuff",
    "meaning": "On credit",
    "example": "The shopkeeper let his old customers buy groceries on the cuff.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Does Not Hold Water",
    "meaning": "Cannot be believed",
    "example": "His excuse for being absent simply does not hold water.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "A Wild Goose Chase",
    "meaning": "Futile search",
    "example": "Searching for the lost file without a reference number was a wild goose chase.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "In A Tight Corner",
    "meaning": "In a difficult situation",
    "example": "With no savings left, the family found itself in a tight corner.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Green Thumb",
    "meaning": "To have a natural interest",
    "example": "My grandmother has a green thumb; her garden blooms all year round.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Going Places",
    "meaning": "Talented and successful",
    "example": "Everyone knew the young IAS officer was going places with her sharp decisions.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "In Cold Blood",
    "meaning": "A murder done with intention",
    "example": "The crime novel described how the victim was murdered in cold blood.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Off And On",
    "meaning": "Occasionally",
    "example": "It rained off and on throughout the monsoon afternoon in Pune.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hard And Fast",
    "meaning": "Strict",
    "example": "There are no hard and fast rules about which optional subject to pick for UPSC.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Took To Heels",
    "meaning": "Run away in fear",
    "example": "The moment the police arrived, the pickpocket took to his heels.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep Up",
    "meaning": "To keep in touch",
    "example": "Despite moving abroad, she managed to keep up with her old classmates.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make A Clean Breast",
    "meaning": "Confess without reserve",
    "example": "The clerk decided to make a clean breast of the accounting error to his manager.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Heads Will Roll",
    "meaning": "Transfers will take place",
    "example": "After the scam was exposed, the minister warned that heads will roll.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Make No Bones About",
    "meaning": "Do not have any hesitation in",
    "example": "The professor made no bones about his dislike for rote learning.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Take After",
    "meaning": "Resembles",
    "example": "With his love for cricket, the boy takes after his father.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Stave Off",
    "meaning": "Postpone",
    "example": "She ate a light snack to stave off hunger during the long exam.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Give A Piece Of Mind",
    "meaning": "To reprimand",
    "example": "The coach gave the careless players a piece of his mind after the loss.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Rest On Laurels",
    "meaning": "To be complacent",
    "example": "After topping the prelims, he refused to rest on his laurels and kept studying.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pay Through Nose",
    "meaning": "Pay an extremely high price",
    "example": "During the festival rush, travellers had to pay through the nose for train tickets.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Draw On Fancy",
    "meaning": "Use imagination",
    "example": "The storyteller drew on fancy to keep the village children spellbound.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn An Honest Living",
    "meaning": "Make an legitimate living",
    "example": "He left the gang and started a small shop to turn an honest living.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Give The Game Away",
    "meaning": "Give out the secret",
    "example": "Her nervous smile gave the game away before the surprise party began.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Cheek By Jowl",
    "meaning": "Very near",
    "example": "In the old city, tiny shops stand cheek by jowl along narrow lanes.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Give In",
    "meaning": "Yield",
    "example": "After hours of protest, the management finally gave in to the workers' demands.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Run Riot",
    "meaning": "Act without restraint",
    "example": "Without a referee, the players let their tempers run riot on the field.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Go Through Fire And Water",
    "meaning": "Undergo any risk",
    "example": "A devoted mother will go through fire and water for her children.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Talking Through Hat",
    "meaning": "Talking nonsense",
    "example": "Ignore his predictions; he is just talking through his hat.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Put Up With",
    "meaning": "Tolerate",
    "example": "A good teacher learns to put up with all kinds of student behaviour.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "By Fits And Starts",
    "meaning": "Irregularly",
    "example": "His exam preparation went by fits and starts, so results were poor.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Reading Between The Lines",
    "meaning": "Understanding the hidden",
    "example": "Reading between the lines, the officer sensed the report was hiding something.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get The Sack",
    "meaning": "Dismissed from",
    "example": "The employee feared he would get the sack after the merger.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pros And Cons",
    "meaning": "Considering all the facts",
    "example": "Weigh the pros and cons carefully before choosing your optional subject.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By Leaps And Bounds",
    "meaning": "Very Quickly",
    "example": "After joining the coaching, her scores improved by leaps and bounds.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "In The Good Books",
    "meaning": "In favour with boss",
    "example": "By finishing every task on time, he stayed in the good books of his boss.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Long Run",
    "meaning": "Ultimately",
    "example": "Honest work always pays off in the long run.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn A Deaf Ear",
    "meaning": "Disregard / Ignore / Refuse",
    "example": "The officer turned a deaf ear to the villagers' repeated complaints.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Fight Tooth And Nail",
    "meaning": "To fight fiercely and with all one's strength",
    "example": "The lawyer promised to fight tooth and nail for the farmers' land rights.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "The Green-Eyed",
    "meaning": "Used as a way of talking about",
    "example": "The green-eyed monster of jealousy ruined their old friendship.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Set The Record Straight",
    "meaning": "To correct a misunderstanding with the true facts",
    "example": "The minister called a press meet to set the record straight.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Good Samaritan",
    "meaning": "Helpful person",
    "example": "A good Samaritan helped the injured traveller reach the hospital.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Bad Blood",
    "meaning": "Angry feeling",
    "example": "There has been bad blood between the two families over the land dispute.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Go To The Whole Hog",
    "meaning": "To do it completely",
    "example": "Once he decides to study, he goes the whole hog and covers everything.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Lay Out",
    "meaning": "Spend",
    "example": "They had to lay out a huge sum to renovate the old ancestral house.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Laying Off",
    "meaning": "Dismissal from jobs",
    "example": "The recession led to the laying off of hundreds of factory workers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Spilling The Beans",
    "meaning": "Revealing the information indiscreetly",
    "example": "He spilled the beans about the office party before it was announced.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Carry Out",
    "meaning": "Execute",
    "example": "The team worked overnight to carry out the minister's instructions.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Went To The Winds",
    "meaning": "Dissipated/ To be utterly lost",
    "example": "When the floods came, all their savings went to the winds.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Ins And Outs",
    "meaning": "Full details",
    "example": "A good guide knows the ins and outs of the entire syllabus.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Fed Up",
    "meaning": "Annoyed",
    "example": "She was fed up with the constant power cuts during the summer.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Sharp Practices",
    "meaning": "Dishonest means",
    "example": "The trader was fined for the sharp practices in his shop.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "In High Spirits",
    "meaning": "Full of hope and enthusiasm",
    "example": "The students were in high spirits after clearing the prelims.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Shake In Shoes",
    "meaning": "Tremble with fear",
    "example": "The new recruit was shaking in his shoes before meeting the strict officer.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Fits And Starts",
    "meaning": "Not regularly",
    "example": "The old scooter moved in fits and starts along the bumpy road.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Close Shave",
    "meaning": "Narrow escape",
    "example": "He reached the exam hall just in time; it was a close shave.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Take With A Grain Of Salt",
    "meaning": "To accept something with some doubt or scepticism",
    "example": "Take his tall claims with a grain of salt.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Eat A Humble Pie",
    "meaning": "To apologize",
    "example": "After his wrong prediction, the analyst had to eat humble pie.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Give The Devil His Due",
    "meaning": "To give encouragement even to",
    "example": "To give the devil his due, even his rivals admired his hard work.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "hard"
  },
  {
    "idiom": "Reading Between The Lines",
    "meaning": "Understanding the hidden or implied meaning",
    "example": "Reading between the lines, she guessed the letter carried bad news.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "An Open Book",
    "meaning": "One that hold no secrets",
    "example": "His honest face was an open book to everyone around him.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "An Axe To Grind",
    "meaning": "A private interest to serve",
    "example": "He praised the scheme because he had an axe to grind.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Stand-Offish",
    "meaning": "Indifferent",
    "example": "The new neighbour seemed stand-offish and rarely greeted anyone.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Sowing Wild Oats",
    "meaning": "Irresponsible pleasure seeking",
    "example": "In his college days he wasted time sowing wild oats.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Of No Avail",
    "meaning": "Useless",
    "example": "All her pleading was of no avail before the strict examiner.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Bolt From The Blue",
    "meaning": "Something unexpected and",
    "example": "The sudden transfer order came as a bolt from the blue.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Verge Of",
    "meaning": "On the brink of",
    "example": "The exhausted runner was on the verge of collapse near the finish line.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Sore Point",
    "meaning": "Something which hurts",
    "example": "His failure in the interview remains a sore point even today.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Rise Like A Phoenix From The Ashes",
    "meaning": "To recover strongly after complete ruin",
    "example": "After bankruptcy, the businessman rose like a phoenix from the ashes.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep Under Wraps",
    "meaning": "Secret",
    "example": "The company kept its new product under wraps until the launch.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Fair- Weather Friend",
    "meaning": "A friend that deserts in",
    "example": "A fair-weather friend vanishes the moment you face trouble.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Emerge Out Of Thin Air",
    "meaning": "Appear Suddenly",
    "example": "The clever solution seemed to emerge out of thin air during the meeting.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cut No Ice",
    "meaning": "Have no influence",
    "example": "His flimsy excuses cut no ice with the principal.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Bring To Light",
    "meaning": "Introduce for discussion",
    "example": "The audit brought several irregularities to light.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cannot Hold A Candle To",
    "meaning": "To be far inferior in comparison to someone",
    "example": "As a batsman, he cannot hold a candle to the legendary captain.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take Into Account",
    "meaning": "To consider",
    "example": "The examiner takes handwriting into account while grading.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Blow Over",
    "meaning": "Pass off",
    "example": "The manager assured them that the controversy would soon blow over.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Run Into",
    "meaning": "Incurred / To experience",
    "example": "Fourth seed Sindhu could face Hong Kongs Ngan Yi Cheung, seeded 13, for a place in the quarterfinals where she could run into fifth seed Sun Yu.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Blue-Eyed Boys",
    "meaning": "Favorites",
    "example": "The two blue-eyed boys of the director got the best projects.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Dropping Names",
    "meaning": "Hinting at high connections/ To",
    "example": "He kept dropping names to impress the interview panel.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Red Letter Day",
    "meaning": "An important day",
    "example": "The day she cleared the civil services was a red letter day for her family.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Bone To Pick",
    "meaning": "Cause of quarrel/ Bone of",
    "example": "The captain had a bone to pick with the umpire after the match.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Struck A Chill To The Heart",
    "meaning": "To fill someone with sudden fear or dread",
    "example": "The eerie silence struck a chill to the heart of the travellers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "End In A Fiasco",
    "meaning": "A total or utter failure",
    "example": "Without planning, the event ended in a fiasco.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Fall Back",
    "meaning": "To turn or move back",
    "example": "When the plan failed, they had savings to fall back on.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "High And Dry",
    "meaning": "Neglected / To leave someone",
    "example": "The sudden strike left thousands of commuters high and dry.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Take For Granted",
    "meaning": "To accept readily / To pre-",
    "example": "We often take our parents' sacrifices for granted.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Mince Matters",
    "meaning": "To confuse issues/ to mix facts",
    "example": "The blunt officer never minces matters while giving feedback.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Currying Favour With",
    "meaning": "Ingratiating / Trying too hard to",
    "example": "He was always currying favour with the senior officers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Strom In A Tea Cup",
    "meaning": "Commotion (angry/worry) over a",
    "example": "The office dispute was just a storm in a teacup and soon settled.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "The Man In The Street",
    "meaning": "An ordinary man (common",
    "example": "Rising onion prices worry the man in the street the most.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Fight To The Bitter End",
    "meaning": "To fight a losing battle",
    "example": "The small team fought to the bitter end despite trailing badly.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Throw Down A Glove",
    "meaning": "To accept defeat",
    "example": "The champion threw down the glove and challenged all newcomers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Read Between The Lines",
    "meaning": "Understanding the hidden",
    "example": "Reading between the lines, he understood the boss was unhappy.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Let The Cat Out Of The Bag",
    "meaning": "To reveal a secret carelessly",
    "example": "She let the cat out of the bag about the transfer news.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "To Have Too Many Irons In The Fire",
    "meaning": "To attempt too many things at the same time",
    "example": "He failed because he had too many irons in the fire.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Fall Through",
    "meaning": "To fail",
    "example": "Their picnic plan fell through because of the heavy rain.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "To Smell A Rat",
    "meaning": "To suspect a trick",
    "example": "When the accounts did not match, the auditor began to smell a rat.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Have The Last Laugh",
    "meaning": "To be victorious at the end of",
    "example": "Rejected early, she topped the merit list and had the last laugh.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Red Letter Day",
    "meaning": "Happy and significant day",
    "example": "His selection into the army was a red letter day for the village.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "To Blaze A Trail",
    "meaning": "To lead the way as a pioneer",
    "example": "The scientist blazed a trail in affordable rural healthcare.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Steer Clear Of",
    "meaning": "Avoid",
    "example": "The mentor advised students to steer clear of last-minute cramming.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Run Across",
    "meaning": "To meet by chance",
    "example": "I ran across an old schoolmate at the railway station.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Dark Horse",
    "meaning": "An unforeseen competitor",
    "example": "The quiet candidate turned out to be the dark horse of the election.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Got The Sack",
    "meaning": "Dismissed from service",
    "example": "He got the sack for repeatedly coming late to office.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Herculean Task",
    "meaning": "A work requiring very",
    "example": "Cleaning the entire riverbank was a Herculean task for the volunteers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Helter-Skelter",
    "meaning": "In disorderly haste",
    "example": "When the bell rang, the children ran helter-skelter out of the class.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Go To The Winds",
    "meaning": "Disappear",
    "example": "In the panic, all caution went to the winds.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Make Ducks And Drakes Of",
    "meaning": "To waste or squander recklessly",
    "example": "He made ducks and drakes of his inheritance within a few years.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Level",
    "meaning": "Honest and sincere",
    "example": "You can trust that shopkeeper; he is completely on the level.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Done For",
    "meaning": "Ruined",
    "example": "Without water in the desert, the stranded travellers thought they were done for.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To End In Smoke",
    "meaning": "To come to nothing, no",
    "example": "All his grand plans for the startup ended in smoke.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Turn A Deaf Ear",
    "meaning": "To be indifferent",
    "example": "The officer turned a deaf ear to the daily complaints of the staff.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Run One Down",
    "meaning": "To disparage someone",
    "example": "It is unkind to run down colleagues behind their backs.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Face The Music",
    "meaning": "To bear the consequences",
    "example": "After the failed project, the team leader had to face the music.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Take Someone To Task",
    "meaning": "To scold or reprimand someone",
    "example": "The principal took the latecomers to task in front of everyone.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "At Stake",
    "meaning": "In danger/ that can be lost",
    "example": "With the final exam near, his entire career was at stake.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Play To The Gallery",
    "meaning": "To behave in an",
    "example": "The politician played to the gallery with grand but empty promises.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Read Between The Lines",
    "meaning": "To understand the hidden or implied meaning",
    "example": "Read between the lines and you will see the letter hides a warning.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sitting On The Fence",
    "meaning": "Hesitating which side to",
    "example": "During the debate he kept sitting on the fence, supporting neither side.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Man In The Street",
    "meaning": "An ordinary person ",
    "example": "Fuel price hikes hit the man in the street the hardest.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Blood Running Cold",
    "meaning": "Become very frightened",
    "example": "The ghost story made the children's blood run cold.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Playing To The Gallery",
    "meaning": "Befooling the common man",
    "example": "The speaker was merely playing to the gallery to win applause.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have Not A Leg To Stand On",
    "meaning": "To have no support or valid argument",
    "example": "With no proof, his complaint had not a leg to stand on.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Lay Down Arms",
    "meaning": "To surrender",
    "example": "The rebels finally agreed to lay down arms after the treaty.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Making Hay While The Sun Shines",
    "meaning": "To make the most of a favourable opportunity",
    "example": "The vendors made hay while the sun shone during the festival rush.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Bear With",
    "meaning": "Support / To be patient",
    "example": "Please bear with me while I finish checking your documents.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Give Vent To",
    "meaning": "To emphasize or to express",
    "example": "She gave vent to her anger by writing a strong letter.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Bone Of Contention",
    "meaning": "Matter of dispute",
    "example": "The shared boundary wall became the bone of contention between the neighbours.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Stand On Own Feet",
    "meaning": "To be independent",
    "example": "After getting a job, she finally learned to stand on her own feet.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Over Head And Ears",
    "meaning": "Completely",
    "example": "He was over head and ears in debt after the failed business.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Call It A Day",
    "meaning": "To conclude proceedings",
    "example": "After eight hours of study, the students decided to call it a day.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put Up With",
    "meaning": "To tolerate",
    "example": "A teacher must put up with a great deal of noise every day.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take To Hearts",
    "meaning": "Deeply affected by",
    "example": "She took the harsh criticism to heart and cried all night.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Move Heaven And Earth",
    "meaning": "To make every possible effort",
    "example": "His parents moved heaven and earth to fund his coaching.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take Someone For A",
    "meaning": "To deceive (cheat) someone",
    "example": "The fake agent took several job seekers for a ride.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "A Damp Squib",
    "meaning": "A disappointing result",
    "example": "The much-awaited launch turned out to be a damp squib.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Bite The Dust",
    "meaning": "To be defeated",
    "example": "The defending champion bit the dust in the very first round.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "To Be All At Sea",
    "meaning": "Lost and confused",
    "example": "Without the notes, he was all at sea during the viva.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Cold Comfort",
    "meaning": "Slight satisfaction",
    "example": "A small refund was cold comfort for the ruined holiday.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "To Die In Harness",
    "meaning": "To die while in service",
    "example": "The devoted teacher died in harness, still teaching at seventy.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Show A Clean Pair Of Heels",
    "meaning": "To run away swiftly",
    "example": "At the first sign of danger, the thief showed a clean pair of heels.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "To Strain Every Nerve",
    "meaning": "To make utmost efforts",
    "example": "She strained every nerve to clear the exam in her first attempt.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "A Bolt Form The Blue",
    "meaning": "Unexpected problem",
    "example": "The company's sudden closure was a bolt from the blue.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Sailing In The Same Boat",
    "meaning": "To be in the same difficult situation as others",
    "example": "With exams near, all the hostel students were sailing in the same boat.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Gift Of The Gab",
    "meaning": "Ability to speak well",
    "example": "With his gift of the gab, he easily won the debate competition.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep The Wolf From The Door",
    "meaning": "To earn just enough to avoid hunger and poverty",
    "example": "He took two jobs just to keep the wolf from the door.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Soft Option",
    "meaning": "Easy and agreeable option",
    "example": "Choosing an easy topic was the soft option, but he wanted a challenge.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Little Gush Of Gratitude",
    "meaning": "A sudden brief show of thankfulness",
    "example": "A little gush of gratitude filled her heart when the stranger helped.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Lose Ground",
    "meaning": "To become less popular",
    "example": "The old brand began to lose ground to cheaper rivals.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "To Fall Back On",
    "meaning": "To use or do something else",
    "example": "When the plan failed, they had their savings to fall back on.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Wear And Tear",
    "meaning": "Damage",
    "example": "The visitors dominance has been overwhelming against a host that is still searching for the right combination and ideal performance while also resembling the walking-wounded, losi",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Add Fuel To The Fire",
    "meaning": "To cause additional anger",
    "example": "His rude reply only added fuel to the fire during the argument.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "hard"
  },
  {
    "idiom": "Hand In Glove",
    "meaning": "In close relationship",
    "example": "The smugglers worked hand in glove with a few corrupt officials.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Make A Mountain Of A Molehill",
    "meaning": "To exaggerate a small problem",
    "example": "Stop making a mountain of a molehill over one small mistake.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Maiden Speech",
    "meaning": "First speech",
    "example": "The new MP delivered a confident maiden speech in Parliament.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "At The Eleventh Hour",
    "meaning": "At the very last moment",
    "example": "Millions of companies in India are still not ready to file their first returns under the new Goods and Services Tax (GST) ahead of an Aug. 20 deadline, a top official told Reuters,",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Cope With",
    "meaning": "To face and deal with",
    "example": "It was hard to cope with the syllabus and a job together.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Go A Long Way Towards Doing Something",
    "meaning": "To contribute greatly to achieving something",
    "example": "Daily revision goes a long way towards clearing tough exams.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Standstill",
    "meaning": "Complete halt",
    "example": "The heavy rains brought city traffic to a complete standstill.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cross Swords",
    "meaning": "Disagree",
    "example": "The two ministers crossed swords over the new policy.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Pore Over",
    "meaning": "Go through",
    "example": "She spent the night poring over previous years' question papers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Make Both Ends Meet",
    "meaning": "To live a lavish life",
    "example": "With rising prices, the daily worker struggled to make both ends meet.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Run Down",
    "meaning": "Criticise",
    "example": "It is easy to run down others but hard to appreciate them.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Leave In The Lurch",
    "meaning": "Abandon in the",
    "example": "His partner left him in the lurch just before the deadline.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Caught Red Handed",
    "meaning": "At the time of committing",
    "example": "The clerk was caught red handed taking a bribe.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Brink Of",
    "meaning": "On the point of",
    "example": "The exhausted climbers were on the brink of giving up.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Go Down The Drain",
    "meaning": "Lose forever",
    "example": "Years of savings went down the drain in one bad investment.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "A Close Shave",
    "meaning": "Narrow escape from danger",
    "example": "The bus missed the truck by inches; it was a close shave.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Cool As A Cucumber",
    "meaning": "Not nervous or emotional",
    "example": "Even during the tough interview, she stayed cool as a cucumber.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Scapegoat",
    "meaning": "A person who is blamed for",
    "example": "The junior clerk was made a scapegoat for the whole department's error.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "Wears Heart On Sleeves",
    "meaning": "Express feelings openly",
    "example": "He wears his heart on his sleeve and hides nothing.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Pay Off Old Scores",
    "meaning": "To refund old dues",
    "example": "from his attitude it is cl, ar that he wants to pay off old scores",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "Man Of Letters",
    "meaning": "Proficient in literary arts",
    "example": "The retired professor was respected as a true man of letters.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn Down",
    "meaning": "Refuse",
    "example": "How could you turn down such a fantastic job?",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "On Good Terms",
    "meaning": "Agree with someone",
    "example": "Despite the rivalry, the two shopkeepers stayed on good terms.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Measure Up",
    "meaning": "Reach the level",
    "example": "The new recruit worked hard to measure up to the team's standards.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Doctor The Accounts",
    "meaning": "To manipulate the accounts",
    "example": "The manager was caught trying to doctor the accounts before the audit.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Dark Horse",
    "meaning": "An unexpected winner",
    "example": "The unknown player was the dark horse who won the tournament.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "In The Red",
    "meaning": "Losing money/ To owe money",
    "example": "After the poor season, the small firm was deep in the red.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "In Lieu Of",
    "meaning": "Despite of",
    "example": "He was given a certificate in lieu of a cash prize.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Beat About The Bush",
    "meaning": "Speak in a round-about",
    "example": "Stop beating about the bush and tell me the result.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Bring About",
    "meaning": "Cause",
    "example": "The new policy brought about big changes in rural banking.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pull Up",
    "meaning": "Reprimand",
    "example": "The officer pulled up the staff for their careless work.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "At Sixes And Seven",
    "meaning": "In disorder or confusion",
    "example": "With the leader absent, the committee was at sixes and sevens.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Lose Head",
    "meaning": "Panic",
    "example": "A good captain never loses his head under pressure.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Take To Task",
    "meaning": "To criticize severely / To",
    "example": "The examiner took him to task for copying in the test.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sit In Judgement",
    "meaning": "comment on someone )",
    "example": "It is unfair to sit in judgement without hearing both sides.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cry Over Spilt Milk",
    "meaning": "Cry over irreparable loss",
    "example": "The exam is over, so there is no use crying over spilt milk.",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Grease Palms",
    "meaning": "To bribe someone",
    "example": "He got the licence quickly by greasing a few palms.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Carrot And Stick",
    "meaning": "Reward and punishment",
    "example": "The coach used a carrot and stick approach to motivate the team.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Cut Teeth",
    "meaning": "To gain experience of",
    "example": "She cut her teeth as a clerk before becoming an officer.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Close The Book",
    "meaning": "Stop working on something",
    "example": "After years of research, he finally closed the book on the project.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "In Fits And Starts",
    "meaning": "Irregularly",
    "example": "The generator worked in fits and starts during the power cut.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Run In The Same Groove",
    "meaning": "Advance in harmony",
    "example": "The two departments must run in the same groove for the plan to work.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep Your Head",
    "meaning": "Remain calm",
    "example": "Keep your head during the exam and read each question carefully.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Pull Strings",
    "meaning": "Use personal influence",
    "example": "He pulled a few strings to get his file cleared quickly.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pot Luck Dinner",
    "meaning": "Dinner where somebody",
    "example": "The hostel friends organised a pot luck dinner before the holidays.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Hit Below The Belt",
    "meaning": "To attack unfairly",
    "example": "Mocking his poverty was hitting below the belt.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sought After",
    "meaning": "Wanted by many people",
    "example": "The topper became a sought-after mentor for junior aspirants.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Build Castles In The Air",
    "meaning": "Daydreaming",
    "example": "Instead of studying, he kept building castles in the air.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Spur Of The Moment",
    "meaning": "Suddenly, without any planning",
    "example": "On the spur of the moment, they decided to visit the hill station.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Explore Every Avenue",
    "meaning": "To try every possible course of action",
    "example": "The lawyer promised to explore every avenue to save the case.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By Fair Or Foul Means",
    "meaning": "In honest or dishonest way",
    "example": "He was determined to win the seat by fair or foul means.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Status Quo",
    "meaning": "As it is / Unchanged position",
    "example": "The court ordered both parties to maintain the status quo.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Burn The Candle At Both Ends",
    "meaning": "To exhaust oneself by overwork day and night",
    "example": "Working days and studying nights, she burned the candle at both ends.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Hit The Jackpot",
    "meaning": "To make money quickly",
    "example": "The small firm hit the jackpot with its new mobile app.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "To Bring To Light",
    "meaning": "To reveal",
    "example": "The RTI reply brought the hidden expenses to light.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Go Scot-Free",
    "meaning": "To escape without",
    "example": "Due to lack of evidence, the accused went scot-free.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Shed Crocodile Tears",
    "meaning": "To show false or insincere sorrow",
    "example": "The cheat shed crocodile tears to win everyone's sympathy.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Miss The Bus",
    "meaning": "To miss an opportunity",
    "example": "By delaying the form, he missed the bus for the exam.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Call Spade A Spade",
    "meaning": "To be frank",
    "example": "An honest officer will always call a spade a spade.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Fight Tooth And Nail",
    "meaning": "To fight heroically, in very",
    "example": "The villagers fought tooth and nail to protect their forest.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Birds Of Same Feather",
    "meaning": "Persons of same character",
    "example": "Birds of the same feather, the two idlers spent all day gossiping.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Take Exception",
    "meaning": "To object over something",
    "example": "She took exception to his rude remark during the meeting.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "High Handed",
    "meaning": "Using authority in an",
    "example": "The staff resented the manager's high-handed decisions.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Fall Short",
    "meaning": "Fail to meet expectation",
    "example": "His marks fell short of the cut-off by just one point.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Heart To Heart Talk",
    "meaning": "Frank talk",
    "example": "After the quarrel, the friends had a heart to heart talk.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Take Cue From",
    "meaning": "To copy what someone",
    "example": "Junior officers took a cue from their honest senior.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Call For",
    "meaning": "To ask",
    "example": "This difficult situation calls for patience and calm.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Out Of The Question",
    "meaning": "Undesirable/ Not worth",
    "example": "Skipping the mock tests is out of the question before finals.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "End Up In Smoke",
    "meaning": "Come to nothing / Useless",
    "example": "Without funding, the ambitious project ended up in smoke.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Spread Like Fire",
    "meaning": "Spread rapidly",
    "example": "The news of the result spread like fire across the campus.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Dropping Like Flies",
    "meaning": "Collapsing in large numbers",
    "example": "In the heat wave, the marchers were dropping like flies.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Rat Race",
    "meaning": "Fierce competition for power",
    "example": "Tired of the rat race, he left the city to teach in a village.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Hard Nut To Crack",
    "meaning": "Difficult task",
    "example": "The last mathematics problem was a hard nut to crack.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "See Eye To Eye",
    "meaning": "To think in the same way",
    "example": "The partners rarely see eye to eye on money matters.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Put Across",
    "meaning": "To communicate your ideas clearly to others",
    "example": "A good teacher can put across tough ideas very simply.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "To Have Second Thoughts",
    "meaning": "To reconsider and feel doubt about a decision",
    "example": "He had second thoughts before signing the risky contract.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Not My Cup Of Tea",
    "meaning": "Not what somebody likes or",
    "example": "Long meetings are simply not my cup of tea.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Break The Ice",
    "meaning": "To start a conversation",
    "example": "To break the ice, the trainer began with a light joke.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "To Add Fuel To Fire",
    "meaning": "To worsen the matter / To",
    "example": "His sarcastic comment only added fuel to the fire.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Feel Like A Fish Out Of Water",
    "meaning": "To feel awkward in unfamiliar surroundings",
    "example": "On his first day in the city, he felt like a fish out of water.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "Give A Hand With",
    "meaning": "To help with something",
    "example": "Could you give me a hand with these heavy files?",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Take To Heart",
    "meaning": "To be very upset by",
    "example": "Do not take every small failure to heart.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Had Better",
    "meaning": "Used for telling somebody",
    "example": "You had better revise the notes before the test tomorrow.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Strike A Bargain",
    "meaning": "To negotiate a deal",
    "example": "After long talks, the traders struck a bargain.",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Point Blank",
    "meaning": "Very definite and direct",
    "example": "She refused his request point blank.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Kicking Heels",
    "meaning": "To be relaxed and enjoy ",
    "example": "With no work to do, the clerks were kicking their heels all day.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "End In Smoke",
    "meaning": "Come to nothing",
    "example": "Their picnic plan ended in smoke because of the sudden rain.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Die In Harness",
    "meaning": "Die in service/ Die while",
    "example": "The dedicated doctor wished to die in harness, serving patients.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Horns Of A Dilemma",
    "meaning": "Facing a choice between two equally bad options",
    "example": "He was on the horns of a dilemma over which job to accept.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Send Packing",
    "meaning": "To tell somebody firmly or",
    "example": "The manager sent the dishonest agent packing.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Kick Up A Row",
    "meaning": "Make a great fuss / To",
    "example": "The passengers kicked up a row over the cancelled train.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Wet Behind The Ears",
    "meaning": "Young and without",
    "example": "The new trainee is still wet behind the ears.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Talk Someone Over",
    "meaning": "To convince over",
    "example": "She talked her father over into letting her join coaching.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Wear Heart On Sleeves",
    "meaning": "Express emotions freely",
    "example": "An honest man like him wears his heart on his sleeve.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Bury The Hatchet",
    "meaning": "To make peace / To stop being",
    "example": "AIADMK factions bury the hatchet",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Once In A Blue Moon",
    "meaning": "Rarely",
    "example": "He visits his native village once in a blue moon.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Through Thick And Thin",
    "meaning": "Under all circumstances",
    "example": "True friends stand by you through thick and thin.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Come To Grief",
    "meaning": "To suffer",
    "example": "The rushed plan soon came to grief.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "No Hard And Fast Rules",
    "meaning": "Easy regulation",
    "example": "There are no hard and fast rules for scoring in the interview.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Live From Hand To Mouth",
    "meaning": "To survive on barely enough to meet daily needs",
    "example": "The daily wager lives from hand to mouth.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Hail From",
    "meaning": "To come from",
    "example": "The new officer hails from a small town in Maharashtra.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put An End To",
    "meaning": "Stop",
    "example": "The new law put an end to the illegal trade.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn Up",
    "meaning": "To appear",
    "example": "Only half the invitees turned up for the seminar.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Die Hard",
    "meaning": "Unwilling to change",
    "example": "Old habits die hard, especially the habit of last-minute study.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Pass Away",
    "meaning": "Die",
    "example": "The veteran freedom fighter passed away at ninety.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Carry Weight",
    "meaning": "Be important / Important",
    "example": "The senior scientist's opinion carries weight in the committee.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Fall Flat",
    "meaning": "Fail to amuse people / Fail to",
    "example": "His joke fell flat before the serious audience.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Under The Thumb Of",
    "meaning": "Under the control of",
    "example": "The junior clerk was completely under the thumb of his boss.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Get Wind",
    "meaning": "Come to know about",
    "example": "The staff got wind of the surprise inspection in advance.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Part And Parcel",
    "meaning": "An essential part of",
    "example": "Hard work is part and parcel of exam preparation.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Give Vent To",
    "meaning": "To express a strong feeling openly",
    "example": "He gave vent to his frustration by writing in his diary.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Stand By",
    "meaning": "To help / Support somebody",
    "example": "A true friend will always stand by you in hard times.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "In Black And White",
    "meaning": "In writing",
    "example": "Get the agreement in black and white before you sign it.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "At A Loss",
    "meaning": "Unable / Not knowing about",
    "example": "Faced with the tricky question, the student was at a loss.",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Lame Excuse",
    "meaning": "Unsatisfactory explanation",
    "example": "He gave a lame excuse for missing the important meeting.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Hard Nut To Crack",
    "meaning": "A difficult problem or",
    "example": "The reasoning section proved a hard nut to crack.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "For Better Or Worse",
    "meaning": "Always / In every condition",
    "example": "For better or worse, they decided to start the business together.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In A Nutshell",
    "meaning": "Brief",
    "example": "In a nutshell, hard work and revision decide your success.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Shot In The Dark",
    "meaning": "An attempt to guess",
    "example": "With no data, his answer was just a shot in the dark.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Water Under The Bridge",
    "meaning": "Something that happened in",
    "example": "That old quarrel is water under the bridge now.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Stick To Guns",
    "meaning": "Hold on to original decisions",
    "example": "Despite pressure, the honest officer stuck to his guns.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Out Of Hand",
    "meaning": "Out of control, or done at once without thought",
    "example": "The small argument soon got out of hand.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "The Salt Of The Earth",
    "meaning": "Very good and honest/ Kind",
    "example": "The kind old teacher was the salt of the earth.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Looking Forward To",
    "meaning": "To expect something or",
    "example": "The students were looking forward to the summer break.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Slip Off",
    "meaning": "Leave quietly",
    "example": "He slipped off quietly before the boring lecture ended.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Get On Well",
    "meaning": "Have a friendly relationship",
    "example": "The new trainee gets on well with the whole team.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In A Pickle",
    "meaning": "In an embarrassing or",
    "example": "Having lost his admit card, he was in a real pickle.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "As Hard As Nail",
    "meaning": "Emotionless / To show no",
    "example": "The strict warden was as hard as nails with latecomers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Allow A Free Hand",
    "meaning": "Complete liberty",
    "example": "The director allowed his deputy a free hand in the project.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Lays Out",
    "meaning": "To spend money",
    "example": "The family had to lay out a fortune on the wedding.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "Break Down",
    "meaning": "To lose control of your",
    "example": "She broke down in tears when she heard the sad news.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Weal And Woe",
    "meaning": "Ups and downs",
    "example": "A good leader shares the weal and woe of his people.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Iron Will",
    "meaning": "Strong determination",
    "example": "With an iron will, she cleared the exam despite many hardships.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Take To Task",
    "meaning": "Punish",
    "example": "The teacher took the noisy students to task.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Rack And Ruin",
    "meaning": "Ransacked",
    "example": "The neglected old mansion went to rack and ruin.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Rides The High Horse",
    "meaning": "Feel superior",
    "example": "Ever since his promotion, he rides the high horse.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "See Through",
    "meaning": "Detect / To realize the truth",
    "example": "The wise officer saw through the clerk's clever lie.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Break Up",
    "meaning": "Disband itself / The breaking",
    "example": "The committee decided to break up after the project ended.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Bull In A China Shop",
    "meaning": "A clumsy person",
    "example": "He handled the delicate talks like a bull in a china shop.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Change Colours",
    "meaning": "To turn pale",
    "example": "He changed colours the moment he heard the alarming news.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Spick And Span",
    "meaning": "Neat and clean / Tidy",
    "example": "She keeps her house spick and span",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Wide Off The Mark",
    "meaning": "Irrelevant / Not accurate ",
    "example": "His guess about the result was wide off the mark.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Out Of The World",
    "meaning": "Extraordinary",
    "example": "The food at the festival was simply out of this world.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sweep Under The Carpet",
    "meaning": "To hide something",
    "example": "The officials tried to sweep the scandal under the carpet.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By Leaps And Bound",
    "meaning": "Very rapidly",
    "example": "Under the new teacher, the class improved by leaps and bounds.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Toe The Line",
    "meaning": "To follow the lead / To follow",
    "example": "New employees are expected to toe the line.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Take Hat Off",
    "meaning": "Encourage / To admire",
    "example": "I take my hat off to her for topping the exam while working.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Null And Void",
    "meaning": "Empty",
    "example": "The court declared the illegal contract null and void.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Break The Ice",
    "meaning": "Initiate a talk",
    "example": "A friendly question helped break the ice at the interview.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Keep The Wolf From The Door",
    "meaning": "To earn just enough to avoid hunger and poverty",
    "example": "He worked overtime to keep the wolf from the door.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Fish In Troubled Water",
    "meaning": "To make a profit out of",
    "example": "Some traders fish in troubled waters during a crisis.",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Look Into",
    "meaning": "To investigate",
    "example": "The committee promised to look into the students' complaints.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Smell The Rat",
    "meaning": "Suspect that something is",
    "example": "When the deal seemed too good, she smelt a rat.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Let The Grass Grow Under One's Feet",
    "meaning": "To waste time and delay taking action",
    "example": "A hardworking clerk never lets the grass grow under his feet.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Apple Of Discord",
    "meaning": "Cause of animosity",
    "example": "The property became the apple of discord between the brothers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Fish Out Of Water",
    "meaning": "In uncomfortable situation",
    "example": "At the fancy party, the villager felt like a fish out of water.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Out Of Wits",
    "meaning": "Greatly confused",
    "example": "The sudden question left him out of his wits.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Call Spade A Spade",
    "meaning": "To speak in a straightforward",
    "example": "A frank leader always calls a spade a spade.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "To Play Second Fiddle",
    "meaning": "Take a subordinate role",
    "example": "He was tired of always playing second fiddle to his senior.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Casting Pearls Before Swine",
    "meaning": "To offer something valuable to those unable to appreciate it",
    "example": "Teaching poetry to that careless class felt like casting pearls before swine.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Putting The Cart Before The Horse",
    "meaning": "To do things in the wrong order",
    "example": "Buying furniture before building the house is putting the cart before the horse.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Not Fit To Hold Candle",
    "meaning": "Not so good as somebody or",
    "example": "As a singer, he is not fit to hold a candle to the maestro.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Egg Someone On",
    "meaning": "To encourage somebody to do",
    "example": "His friends egged him on to attempt the tough question.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "For Good",
    "meaning": "Permanently",
    "example": "After retirement, he left the busy city for good.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Take A Leap In The Dark",
    "meaning": "To take risk",
    "example": "Starting a business with no plan is taking a leap in the dark.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Cut The Guardian Knot",
    "meaning": "Remove difficulty / To solve",
    "example": "The wise judge cut the Gordian knot with one clever order.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Cakewalk",
    "meaning": "An easy achievement",
    "example": "For the well-prepared student, the test was a cakewalk.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Not To Look A Gift Horse In The Mouth",
    "meaning": "To accept a gift gratefully without finding fault",
    "example": "He accepted the old cycle gladly, not looking a gift horse in the mouth.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Man Of Straw",
    "meaning": "A man of no substance",
    "example": "The committee head turned out to be a mere man of straw.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Born With A Silver Spoon",
    "meaning": "Born into a wealthy and privileged family",
    "example": "He was born with a silver spoon and never knew hardship.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Let Sleeping Dogs Lie",
    "meaning": "Not to bring up an old",
    "example": "It is best to let sleeping dogs lie and forget the old dispute.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "A Month Of Sundays",
    "meaning": "A long time",
    "example": "I have not seen my school friends in a month of Sundays.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "A Closed Book",
    "meaning": "A mystery",
    "example": "Advanced physics is a closed book to me.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "In Apple Pie Order",
    "meaning": "In perfect order",
    "example": "The clerk kept all the files in apple pie order.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Through Thick And Thin",
    "meaning": "Through both good and bad times",
    "example": "Her parents supported her through thick and thin.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Live-Wire",
    "meaning": "A person who is lively or",
    "example": "The class monitor was a live-wire, full of energy and ideas.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Feel Blue",
    "meaning": "In trouble / depressed",
    "example": "He felt blue after failing to clear the interview.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Above Board",
    "meaning": "Legal and honest",
    "example": "All the accounts of the trust were clean and above board.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Pour Cats And Dogs",
    "meaning": "Rain heavily",
    "example": "It poured cats and dogs on the day of the exam.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Iron Fist",
    "meaning": "To treat people in severe",
    "example": "The dictator ruled the country with an iron fist.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Time And Again",
    "meaning": "Always",
    "example": "The teacher warned them time and again about careless mistakes.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Eat Humble Pie",
    "meaning": "To say or show that you are",
    "example": "After his wrong prediction, the expert had to eat humble pie.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Rule The Roost",
    "meaning": "Exercise authority / To be the",
    "example": "In that office, the senior clerk rules the roost.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Have Something Up Your Sleeve",
    "meaning": "To have a secret plan kept in reserve",
    "example": "The clever lawyer always had something up his sleeve.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Make Things Done",
    "meaning": "To manage",
    "example": "A good manager knows how to make things done on time.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Chicken Out",
    "meaning": "Withdraw / To decide not to do",
    "example": "He chickened out at the last minute and skipped the debate.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Ice Braking",
    "meaning": "Starting a conversation",
    "example": "The trainer began with an ice-breaking game.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Bad Hats",
    "meaning": "People of bad character",
    "example": "The colony warned children to stay away from the bad hats.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Give And Take",
    "meaning": "Adjustment / Willingness in",
    "example": "Every good partnership needs some give and take.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get Down To Business",
    "meaning": "To begin work seriously",
    "example": "After the introductions, they got down to business.",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Go About",
    "meaning": "Go around / To continue to do something",
    "example": "She went about her studies with quiet determination.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Picking Up Holes In",
    "meaning": "Finding out faults with something",
    "example": "He kept picking holes in every plan without offering one.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Cast A Die",
    "meaning": "To take a decision",
    "example": "Once she cast the die, there was no turning back.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "The Gift Of The Gab",
    "meaning": "Ability to speak well",
    "example": "With the gift of the gab, the salesman convinced everyone.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Cordon Off",
    "meaning": "Isolate / To stop people from",
    "example": "The police cordoned off the area after the accident.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Keep An Open House",
    "meaning": "Welcome all members",
    "example": "The generous family kept an open house during the festival.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pick On",
    "meaning": "Warn severely",
    "example": "The seniors should not pick on the new students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Fight Tooth And Nail",
    "meaning": "Fight with strength and fury",
    "example": "The team fought tooth and nail to win the final match.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Teething Problems",
    "meaning": "Difficulties at the start",
    "example": "The new online portal had a few teething problems.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Get Into Hot Water",
    "meaning": "To get into trouble",
    "example": "He got into hot water for submitting the report late.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Plain Sailing",
    "meaning": "Very easy",
    "example": "After the tough prelims, the interview was plain sailing.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Cut One Short",
    "meaning": "To criticize",
    "example": "The chairman cut the speaker short as time ran out.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Show The White Flag",
    "meaning": "To surrender",
    "example": "Outnumbered, the small team had to show the white flag.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "A Cut Above",
    "meaning": "Rather superior to",
    "example": "Her essay was a cut above the rest.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Foam At The Mouth",
    "meaning": "Angry",
    "example": "He was foaming at the mouth over the unfair decision.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep The Wolf Away From The Door",
    "meaning": "To earn just enough to avoid hunger and poverty",
    "example": "Two part-time jobs helped him keep the wolf away from the door.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Pin Money",
    "meaning": "Additional money",
    "example": "She earned some pin money by tutoring in the evenings.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "The Alpha And Omega",
    "meaning": "Beginning and end",
    "example": "Discipline was the alpha and omega of the coach's training.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Salt Of The Earth",
    "meaning": "Good, honest and ideal",
    "example": "The humble farmer was truly the salt of the earth.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Bring The House Down",
    "meaning": "Make the audience applaud",
    "example": "The young comedian brought the house down with his jokes.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Gerrymandering Way",
    "meaning": "In a manipulative and unfair way",
    "example": "The boundaries were redrawn in a gerrymandering way to favour one party.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Strain Every Nerve",
    "meaning": "Make all efforts / Try all tricks",
    "example": "He strained every nerve to finish the paper in time.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Down In The Dumps",
    "meaning": "Sad and depressed",
    "example": "She was down in the dumps after the poor result.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "All Moonshine",
    "meaning": "Superficial",
    "example": "His grand promises turned out to be all moonshine.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Wild Goose Chase",
    "meaning": "A foolish and useless enterprise",
    "example": "Searching for the address without a map was a wild goose chase.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Swan Song",
    "meaning": "Last prayer (at funeral or farewell)",
    "example": "The veteran actor called the film his swan song.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "By The Skin Of Teeth",
    "meaning": "By the narrowest margin",
    "example": "He passed the exam by the skin of his teeth.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep Up With",
    "meaning": "Go at equal pace",
    "example": "It was hard to keep up with the fast-paced lecture.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Flies Off At A Tangent",
    "meaning": "Start discussing something irrelevant",
    "example": "The speaker often flies off at a tangent and forgets the topic.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Batten Down The Hatches",
    "meaning": "To prepare for an approaching difficulty",
    "example": "With the storm coming, the fishermen battened down the hatches.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "All Might And Main",
    "meaning": "With full force",
    "example": "They worked with all their might and main to finish on time.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Red Herrings",
    "meaning": "Clues intended to distract or mislead / An",
    "example": "The clever author planted red herrings throughout the mystery.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "hard"
  },
  {
    "idiom": "White Elephant",
    "meaning": "A costly but useless possession",
    "example": "The huge unused hall became a white elephant for the college.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Look Sharp",
    "meaning": "Pay attention",
    "example": "Look sharp, or you will miss the last train.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "Big Draw",
    "meaning": "Huge attraction",
    "example": "The magic show was the big draw at the village fair.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Bear Down",
    "meaning": "To move quickly towards",
    "example": "The angry crowd bore down on the ticket counter.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "At A Stretch",
    "meaning": "Continuously",
    "example": "He studied for six hours at a stretch before the exam.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Know Beans About Something",
    "meaning": "To know very little or nothing about something",
    "example": "He does not know beans about running a business.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Know The Ropes",
    "meaning": "Learn the procedures",
    "example": "After a month, the new clerk finally knew the ropes.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Barking Up The Wrong Tree",
    "meaning": "To pursue a mistaken or misguided course",
    "example": "By blaming the peon, they were barking up the wrong tree.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Swim",
    "meaning": "Well informed and up-to-date",
    "example": "A good journalist stays in the swim of current affairs.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Rub Up The Wrong Way",
    "meaning": "To irk or irritate someone",
    "example": "His rude tone rubbed the whole panel up the wrong way.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Add Fuel To The Fire",
    "meaning": "Worsen the situation",
    "example": "His careless joke added fuel to the fire.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Loop",
    "meaning": "Informed regularly",
    "example": "The manager kept his team in the loop about every change.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Black Out",
    "meaning": "Lost consciousness",
    "example": "She blacked out for a moment in the extreme heat.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Cut And Dry Method",
    "meaning": "Specific",
    "example": "There is no cut and dry method to crack the interview.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Back To The Drawing Board",
    "meaning": "To start again after a failed attempt",
    "example": "When the plan failed, they went back to the drawing board.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Air",
    "meaning": "Certain / Able to be firmly relied on to",
    "example": "With results due, a sense of excitement was in the air.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Same Page",
    "meaning": "Thinks in a similar way",
    "example": "Before starting, the team made sure everyone was on the same page.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Pull No Punch",
    "meaning": "Speaks frankly",
    "example": "The honest reviewer pulled no punches in his report.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Stand Your Ground",
    "meaning": "To refuse to yield under pressure",
    "example": "Despite the pressure, she stood her ground on the issue.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Put Your Feet Down",
    "meaning": "Take a firm stand / To be very strict in opposing what somebody",
    "example": "The parents put their foot down about late-night outings.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Read Between The Line",
    "meaning": "To understand the inner meaning",
    "example": "Read between the lines to grasp the poet's real message.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To The Letter",
    "meaning": "Paying attention to every detail / Doing or",
    "example": "He followed the exam instructions to the letter.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "In Dutch",
    "meaning": "In trouble",
    "example": "He landed in Dutch with his boss over the missing file.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Come To Light",
    "meaning": "Been revealed / To become known to",
    "example": "New facts came to light during the inquiry.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Around The Clock",
    "meaning": "Day and night",
    "example": "The relief teams worked around the clock after the floods.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Balloon Goes Up",
    "meaning": "The situation turns unpleasant or serious",
    "example": "When the scam broke, the balloon really went up.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Watching Grass Grow",
    "meaning": "Very boring",
    "example": "The dull lecture was like watching grass grow.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Beyond The Pale",
    "meaning": "Outside commonly accepted standards",
    "example": "His rude behaviour at the function was beyond the pale.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Took After",
    "meaning": "Similar to / to look or behave like an older",
    "example": "The bright boy took after his scholarly grandfather.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cool About Working",
    "meaning": "Not tense about working / Reading to",
    "example": "She stayed cool about working late during the busy season.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Salad Days",
    "meaning": "Adolescence",
    "example": "In his salad days he dreamed of becoming a pilot.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "All Ears",
    "meaning": "Attentive",
    "example": "Tell me what happened; I am all ears.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Hold Water",
    "meaning": "With logical backing / To stand up to",
    "example": "His explanation simply did not hold water.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Other Fish To Fry",
    "meaning": "Some important work to attend to",
    "example": "He skipped the party as he had other fish to fry.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Tell In A Nut Shell",
    "meaning": "In a brief manner / Summarize",
    "example": "To tell it in a nutshell, the plan failed for lack of funds.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "hard"
  },
  {
    "idiom": "A Close-Fisted Person",
    "meaning": "A miser",
    "example": "Being a close-fisted person, he never donated a rupee.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "To Gather Roses Only",
    "meaning": "To seek all enjoyments of life",
    "example": "He lived to gather roses only, ignoring all responsibility.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "A Black Sheep",
    "meaning": "A person with bad reputation",
    "example": "He was the black sheep of an otherwise respected family.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "To Grease The Palm",
    "meaning": "To bribe",
    "example": "The file moved fast once he greased the clerk's palm.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "An About Turn",
    "meaning": "Complete change of opinion or situation",
    "example": "The government did an about turn on the controversial tax rule.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make A Mockery",
    "meaning": "To make something seem ridiculous or",
    "example": "The careless referee made a mockery of the whole match.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Eat Like A Horse",
    "meaning": "Eat a lot",
    "example": "After the long trek, the boys ate like horses.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Go To The Dogs",
    "meaning": "To be ruined",
    "example": "Without proper care, the once-famous school went to the dogs.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Pay On The Nail",
    "meaning": "Pay promptly / Payment without delay",
    "example": "The honest merchant always paid his workers on the nail.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "At Draggers Drawn",
    "meaning": "Enmity",
    "example": "The two rival groups have been at daggers drawn for years.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Break In",
    "meaning": "Force entry to a building",
    "example": "Thieves broke in while the family was away for the festival.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Carve Out A Niche",
    "meaning": "To work harder in order to have",
    "example": "She carved out a niche for herself in online teaching.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Second Thoughts",
    "meaning": "Reconsidering the original idea",
    "example": "On second thoughts, he decided to attempt the harder question.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Average Out",
    "meaning": "Balance",
    "example": "Over the year, his marks averaged out to a first class.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Floored",
    "meaning": "To surprise or confuse",
    "example": "The tricky puzzle completely floored the whole class.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Give Way",
    "meaning": "Collapse",
    "example": "The old bridge gave way under the weight of the truck.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Tall Tales",
    "meaning": "Boasting",
    "example": "Nobody believed his tall tales about meeting the minister.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Backseat Driver",
    "meaning": "A person who gives unwanted advice",
    "example": "Nobody likes a backseat driver telling them what to do.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "At Random",
    "meaning": "Without any aim or target",
    "example": "The examiner picked questions at random from the syllabus.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Break Off",
    "meaning": "Suddenly stop",
    "example": "She broke off in the middle of her speech, overcome with emotion.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Go Haywire",
    "meaning": "Become out of control",
    "example": "During the storm, the whole signal system went haywire.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Latch Onto",
    "meaning": "To promote",
    "example": "The clever trader latched onto the new market trend early.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Fight Shy Of",
    "meaning": "To avoid someone/ something",
    "example": "Many students fight shy of asking doubts in class.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cock And Bull Story",
    "meaning": "Absurd an unbelievable story",
    "example": "He gave a cock and bull story to explain his absence.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Be Down To Earth",
    "meaning": "To be realistic",
    "example": "Despite his fame, the officer remained down to earth.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Nick Of Time",
    "meaning": "Just in time",
    "example": "The ambulance arrived in the nick of time.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Shun Evil Company",
    "meaning": "To avoid or give up bad company",
    "example": "Elders advise the young to shun evil company.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Seamy Side",
    "meaning": "Unpleasant and immoral",
    "example": "The novel exposed the seamy side of city life.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "A Sacred Cow",
    "meaning": "A person never to be criticized",
    "example": "In that office, the senior manager was a sacred cow.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Sail In The Same Boat",
    "meaning": "To be in same situation",
    "example": "With no jobs in sight, all the graduates sailed in the same boat.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Take The Bull By The Horns",
    "meaning": "To face a difficulty boldly and directly",
    "example": "She took the bull by the horns and confronted the problem directly.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Shed Crocodile Tears",
    "meaning": "To pretend to be sympathetic",
    "example": "The cheat shed crocodile tears at the victim's loss.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Be In A Quandary",
    "meaning": "In a confusing situation",
    "example": "He was in a quandary over which college to join.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Take French Leave",
    "meaning": "Absenting oneself without permission",
    "example": "The clerk took French leave and missed the audit.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put In A Nutshell",
    "meaning": "To state something very concisely",
    "example": "To put it in a nutshell, revision is the key to success.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "The Genomes Of Zurich",
    "meaning": "A slang term for Swiss bankers",
    "example": "Like the gnomes of Zurich, the financiers worked behind the scenes.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "In Two Minds",
    "meaning": "To be undecided",
    "example": "She was in two minds about changing her optional subject.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Put Something By",
    "meaning": "To save money for a particular purpose",
    "example": "He put a little money by every month for his studies.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "On Cloud Nine",
    "meaning": "Extremely happy",
    "example": "She was on cloud nine after topping the merit list.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "The Jury Is Out",
    "meaning": "No decision has been reached",
    "example": "On the new policy, the jury is still out.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Have A Finger In Every Pie",
    "meaning": "To be involved in many activities at once",
    "example": "The busy trustee had a finger in every pie in town.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take After",
    "meaning": "To resemble an older member of family",
    "example": "The talented girl takes after her musician mother.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Flying Visit",
    "meaning": "Very short visit",
    "example": "The minister paid a flying visit to the flood-hit village.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Telling Upon",
    "meaning": "Showing effectively / Having strong effect",
    "example": "The long night shifts were telling upon his health.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Kith And Kin",
    "meaning": "Relatives",
    "example": "During the festival, all his kith and kin gathered at home.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Take Fancy",
    "meaning": "To attract or please somebody",
    "example": "The child took a fancy to the bright red kite.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Snake In The Grass",
    "meaning": "A hidden enemy",
    "example": "He trusted his partner, unaware of the snake in the grass.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Make A Mountain Of A Molehill",
    "meaning": "To exaggerate a small problem",
    "example": "Do not make a mountain of a molehill over a small error.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Spill The Beans",
    "meaning": "Reveal the secret information",
    "example": "He spilled the beans about the surprise transfer.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Make Amends For",
    "meaning": "Compensate the loss",
    "example": "He worked hard to make amends for his earlier mistake.",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Leave High And Dry",
    "meaning": "In a difficult situation without help or",
    "example": "The sudden strike left the passengers high and dry.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make Believe",
    "meaning": "To pretend that something is true",
    "example": "The children played make believe as brave soldiers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Keep A Level Head",
    "meaning": "To remain calm and sensible in a difficult",
    "example": "A good pilot keeps a level head during turbulence.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Under The Weather",
    "meaning": "Sick",
    "example": "He stayed home from work, feeling under the weather.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "At Loggerheads",
    "meaning": "In strong disagreement",
    "example": "The two departments were at loggerheads over the budget.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Go Dutch",
    "meaning": "Divide the cost",
    "example": "The friends decided to go Dutch at the restaurant.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "Alma Mater",
    "meaning": "Institution where one got education",
    "example": "He returned to his alma mater to give a motivational talk.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "A Closefisted Man",
    "meaning": "A miser",
    "example": "The closefisted man refused to spend even on necessities.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "As Daft As A Brush",
    "meaning": "Very silly",
    "example": "His silly plan was as daft as a brush.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Rise With The Lark",
    "meaning": "Get up early / To get out of bed very early",
    "example": "To finish the syllabus, she began rising with the lark.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Make A Beeline",
    "meaning": "Rush / To go straight towards something",
    "example": "The hungry students made a beeline for the canteen.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "A Man Of Letters",
    "meaning": "A literary person",
    "example": "The respected editor was a true man of letters.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Horse Sense",
    "meaning": "Basic common sense",
    "example": "Good horse sense matters more than bookish knowledge sometimes.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Shot In The Arm",
    "meaning": "Something that gives encouragement",
    "example": "Fresh investment would provide the shot in the arm that this industry so badly needs",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Catch Time By The Forelock",
    "meaning": "To seize an opportunity without delay",
    "example": "Successful people catch time by the forelock and never delay.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Get On Nerves",
    "meaning": "Annoying",
    "example": "The constant noise began to get on her nerves.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Clean Hands",
    "meaning": "Innocent",
    "example": "The inquiry proved that the officer had clean hands.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "A Golden Mean",
    "meaning": "Middle course between two extremes",
    "example": "Wise living lies in following the golden mean.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Vexed Question",
    "meaning": "Controversial issue",
    "example": "The vexed question of reservation was debated for hours.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Keep The Wolf Away From The Door",
    "meaning": "To earn just enough to avoid hunger and poverty",
    "example": "He took extra tuition to keep the wolf away from the door.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Out Of Sorts",
    "meaning": "Ill or sick / Upset",
    "example": "She felt out of sorts after the sleepless night.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Gut Feeling",
    "meaning": "Strong instinct (based on feelings and",
    "example": "His gut feeling told him to double-check the accounts.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "easy"
  },
  {
    "idiom": "Finish With Something",
    "meaning": "Be through / To have something at the",
    "example": "Once he finished with his exams, he took a long holiday.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Close Fisted Man",
    "meaning": "Miser",
    "example": "Being a close fisted man, he never lent a single rupee.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "To Set The Thames On Fire",
    "meaning": "To do something remarkable or brilliant",
    "example": "He is hardworking but will never set the Thames on fire.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Play Ducks And Drakes",
    "meaning": "Spend lavishly / To waste or squander",
    "example": "He played ducks and drakes with his father's hard-earned money.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Be Taken Aback",
    "meaning": "Shocked or surprised",
    "example": "She was taken aback by the sudden good news.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
{
    "idiom": "Lay It On Thick",
    "meaning": "An exaggeration / To talk about somebody",
    "example": "The examiner used 'lay it on thick' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Win Laurels",
    "meaning": "To earn great prestige",
    "example": "The two, who have won many laurels for the country by winning medals in the Commonwealth, Asian and World championships, exhorted the students to focus on physical fitness.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Soup",
    "meaning": "To be in trouble",
    "example": "The examiner used 'in the soup' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Draw The Line",
    "meaning": "To set a limit",
    "example": "The examiner used 'draw the line' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Bee Hive",
    "meaning": "A busy place",
    "example": "The examiner used 'a bee hive' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Cut The Gordian Knot",
    "meaning": "To perform a difficult task",
    "example": "The examiner used 'to cut the gordian knot' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Take A French Leave",
    "meaning": "Being absent without permission",
    "example": "The examiner used 'take a french leave' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Arm-Chair Critic",
    "meaning": "A person who give advice based on theory",
    "example": "The examiner used 'arm-chair critic' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "A Chip Of The Old Block",
    "meaning": "An experienced old man",
    "example": "The examiner used 'a chip of the old block' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Feather Your Nest",
    "meaning": "To make yourself richer, especially by",
    "example": "The examiner used 'feather your nest' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "Throw Up Cards",
    "meaning": "To give in / To blow away the plan",
    "example": "The examiner used 'throw up cards' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Vote With Your Feet",
    "meaning": "Showing your disapproval",
    "example": "The examiner used 'vote with your feet' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Dog In A Manger",
    "meaning": "A selfish person",
    "example": "The examiner used 'dog in a manger' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Chapter And Verse",
    "meaning": "Providing minutes details",
    "example": "The examiner used 'chapter and verse' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Bring Down The House",
    "meaning": "Amuse the audience greatly / To make",
    "example": "The examiner used 'bring down the house' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Give A Wide Berth To",
    "meaning": "To stay away from or avoid someone",
    "example": "The examiner used 'give a wide berth to' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Beside The Mark",
    "meaning": "Irrelevant / Not to be accurate",
    "example": "The examiner used 'beside the mark' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Give Away",
    "meaning": "To distribute something",
    "example": "The examiner used 'give away' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Show A Clean Pair Of Heels",
    "meaning": "To run away swiftly",
    "example": "The thief showed a clean pair of heels the moment the alarm rang.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Up To The Mark",
    "meaning": "According to the required standard",
    "example": "The examiner used 'up to the mark' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Sit On The Fence",
    "meaning": "To avoid becoming involved in deciding or",
    "example": "The examiner used 'sit on the fence' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Shake Off",
    "meaning": "Forget / To get away from somebody who",
    "example": "The examiner used 'shake off' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pull A Long Face",
    "meaning": "Look dejected / An unhappy or",
    "example": "The examiner used 'pull a long face' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cat-Nap",
    "meaning": "Short sleep",
    "example": "The examiner used 'cat-nap' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "To Pull A Long Face",
    "meaning": "Look sad",
    "example": "The examiner used 'to pull a long face' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Fit Like A Glove",
    "meaning": "Perfectly",
    "example": "The examiner used 'fit like a glove' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Gate Crasher",
    "meaning": "Uninvited guest",
    "example": "The examiner used 'gate crasher' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Angle",
    "meaning": "To fish",
    "example": "The examiner used 'to angle' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "For All Intents And Purposes",
    "meaning": "In every practical sense; virtually",
    "example": "For all intents and purposes, the project was finished by Friday.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Running",
    "meaning": "Has good prospects in competition",
    "example": "The examiner used 'in the running' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make Room",
    "meaning": "Make space",
    "example": "The examiner used 'make room' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Beggar Description",
    "meaning": "Cannot be described",
    "example": "The examiner used 'beggar description' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Hope Against Hope",
    "meaning": "Nurture an impossible hope",
    "example": "The examiner used 'hope against hope' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "For Keeps",
    "meaning": "Forever",
    "example": "The examiner used 'for keeps' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Paled Into Insignificance",
    "meaning": "To seem unimportant compared with something else",
    "example": "His earlier troubles paled into insignificance beside this loss.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "With One Voice",
    "meaning": "Unanimously",
    "example": "The examiner used 'with one voice' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Make It Light",
    "meaning": "Treat lightly",
    "example": "The examiner used 'make it light' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Every Inch A Gentleman",
    "meaning": "Entirely",
    "example": "The examiner used 'every inch a gentleman' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Catch A Tartar",
    "meaning": "A rough, violent, troublesome person",
    "example": "The examiner used 'catch a tartar' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take To Heart",
    "meaning": "To be greatly affected",
    "example": "The examiner used 'to take to heart' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "All Moon Shine",
    "meaning": "Far from reality",
    "example": "The examiner used 'all moon shine' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Call On",
    "meaning": "Pay a visit",
    "example": "The examiner used 'call on' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "Fish Out Of Water",
    "meaning": "An uncomfortable position",
    "example": "The examiner used 'fish out of water' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Be Down With",
    "meaning": "Suffering from",
    "example": "The examiner used 'be down with' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Fair-Weather Friend",
    "meaning": "Supports only when easy and convenient",
    "example": "The examiner used 'fair-weather friend' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Pull Together",
    "meaning": "Work harmoniously",
    "example": "The examiner used 'pull together' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Bury The Hatchet",
    "meaning": "To make peace",
    "example": "The examiner used 'to bury the hatchet' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Selling Like Hot Cakes",
    "meaning": "To have a very good sale",
    "example": "The examiner used 'selling like hot cakes' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Scot Free",
    "meaning": "Unpunished",
    "example": "The examiner used 'scot free' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Give Oneself Airs",
    "meaning": "Behave arrogantly",
    "example": "The examiner used 'to give oneself airs' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Eat Humble Pie",
    "meaning": "To yield under humiliating circumstances",
    "example": "The examiner used 'to eat humble pie' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Spill The Beans",
    "meaning": "To reveal a secret",
    "example": "The examiner used 'to spill the beans' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Drive Home",
    "meaning": "Emphasise",
    "example": "The examiner used 'drive home' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Left Hand Compliment",
    "meaning": "An ambiguous compliment",
    "example": "The examiner used 'a left hand compliment' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cut A Sorry Figure",
    "meaning": "Make a poor impression",
    "example": "The examiner used 'cut a sorry figure' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "To Get Cold Feet",
    "meaning": "Fear",
    "example": "The examiner used 'to get cold feet' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "On Tenterhooks",
    "meaning": "In suspense and anxiety",
    "example": "The examiner used 'on tenterhooks' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Cuckoo In The Nest",
    "meaning": "An unwelcomed intruder",
    "example": "The examiner used 'a cuckoo in the nest' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A House Of Cards",
    "meaning": "An insecure scheme",
    "example": "The examiner used 'a house of cards' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Old Head On Young Shoulders",
    "meaning": "A young person who shows unusual maturity",
    "example": "At just nineteen, she has an old head on young shoulders.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Hard Of Hearing",
    "meaning": "To be deaf",
    "example": "The examiner used 'hard of hearing' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Burn Your Boats",
    "meaning": "Do something that makes it impossible to",
    "example": "The examiner used 'burn your boats' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Dressing-Down",
    "meaning": "To give scolding",
    "example": "The examiner used 'dressing-down' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Throw Cold Water",
    "meaning": "Discourage",
    "example": "The examiner used 'throw cold water' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Butt In",
    "meaning": "Interrupt",
    "example": "The examiner used 'butt in' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Couch Potato",
    "meaning": "A person who prefers to watch television",
    "example": "The examiner used 'couch potato' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Carry The Ball",
    "meaning": "Be in charge",
    "example": "The examiner used 'carry the ball' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cap In Hand",
    "meaning": "In a respectful manner",
    "example": "The examiner used 'cap in hand' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Blues",
    "meaning": "Cheerless and depressed",
    "example": "The examiner used 'in the blues' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "At Sea",
    "meaning": "Confused",
    "example": "The examiner used 'at sea' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Straw In The Wind",
    "meaning": "An indication of what might happen",
    "example": "The examiner used 'straw in the wind' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Curry Favours",
    "meaning": "Seek favourable attention",
    "example": "The examiner used 'curry favours' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Call In Question",
    "meaning": "Challenge",
    "example": "The examiner used 'call in question' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Put Up The Shutters",
    "meaning": "Go out of business",
    "example": "The examiner used 'put up the shutters' in the sentence to test students.",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Drop In A Bucket",
    "meaning": "A very insignificant amount",
    "example": "The examiner used 'a drop in a bucket' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Draw A Blank",
    "meaning": "Find no favour",
    "example": "The examiner used 'draw a blank' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep In Abeyance",
    "meaning": "In a state of suspension",
    "example": "The examiner used 'to keep in abeyance' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Be In A Fix",
    "meaning": "In a difficult situation",
    "example": "The examiner used 'to be in a fix' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Evening Of Life",
    "meaning": "Old age",
    "example": "The examiner used 'evening of life' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Cock And Bull Stories",
    "meaning": "Absurd and unlikely stories",
    "example": "The examiner used 'cock and bull stories' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "A Live Wire",
    "meaning": "Lively and active",
    "example": "The examiner used 'a live wire' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Capital Punishment",
    "meaning": "Death sentence",
    "example": "The examiner used 'capital punishment' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Leaps And Bounds",
    "meaning": "Rapidly",
    "example": "The examiner used 'leaps and bounds' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Leave No Stone Unturned",
    "meaning": "To make every possible effort to succeed",
    "example": "The police left no stone unturned in tracing the missing boy.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Bear In Mind",
    "meaning": "Remembe",
    "example": "The examiner used 'bear in mind' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Nip In The Bud",
    "meaning": "To stop something in the starting",
    "example": "The examiner used 'to nip in the bud' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hold Up",
    "meaning": "Delay",
    "example": "The examiner used 'hold up' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Play Fast And Loose",
    "meaning": "To act in an unreliable way",
    "example": "The examiner used 'to play fast and loose' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pull A Fast One",
    "meaning": "Play a trick",
    "example": "The examiner used 'pull a fast one' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Grease The Palm",
    "meaning": "To bribe",
    "example": "The examiner used 'grease the palm' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn-Turtle",
    "meaning": "Complete over-turn of a situation",
    "example": "The examiner used 'turn-turtle' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Gentleman At Large",
    "meaning": "A man without a job",
    "example": "The examiner used 'a gentleman at large' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Lose Face",
    "meaning": "Become embarrassed",
    "example": "The examiner used 'lose face' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Build Castle In The Air",
    "meaning": "Day dreaming",
    "example": "The examiner used 'build castle in the air' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Fall Back On",
    "meaning": "Resort to something",
    "example": "The examiner used 'fall back on' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Go To Rack And Ruin",
    "meaning": "Get into a bad condition",
    "example": "The examiner used 'go to rack and ruin' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Bite The Dust",
    "meaning": "Suffer a defeat",
    "example": "The examiner used 'bite the dust' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "The Seamy Side",
    "meaning": "Unpleasant aspect",
    "example": "The examiner used 'the seamy side' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Too Many Chiefs And Not Enough Indians",
    "meaning": "Too many leaders and too few workers",
    "example": "The committee failed because there were too many chiefs and not enough Indians.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Throw In The Towel",
    "meaning": "Acknowledge defeat",
    "example": "The examiner used 'throw in the towel' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "A Storm In A Teacup",
    "meaning": "Big fuss over a small matter",
    "example": "The examiner used 'a storm in a teacup' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Blue-Blooded",
    "meaning": "Of noble birth",
    "example": "The examiner used 'blue-blooded' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Do A Roaring Trade",
    "meaning": "Highly successful",
    "example": "The examiner used 'do a roaring trade' in the sentence to test students.",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep Body And Soul Together",
    "meaning": "To manage to stay alive on minimal means",
    "example": "The daily wager earned barely enough to keep body and soul together.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Will-O-The-Wisp",
    "meaning": "Unreal Imagining",
    "example": "The examiner used 'will-o-the-wisp' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cloak-And-Dagger",
    "meaning": "An activity that involves mystery and",
    "example": "The examiner used 'cloak-and-dagger' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Palm Off",
    "meaning": "To dispose off with the intent to deceive",
    "example": "The examiner used 'palm off' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "From Stem To Stern",
    "meaning": "All the way from the front of a ship to",
    "example": "The examiner used 'from stem to stern' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Over-Egg The Pudding",
    "meaning": "Add unnecessary details to make",
    "example": "The examiner used 'over-egg the pudding' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn Over A New Leaf",
    "meaning": "Change ones behavior for the better",
    "example": "The examiner used 'turn over a new leaf' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Take Up The Hatchet",
    "meaning": "Prepare for or go to war",
    "example": "The examiner used 'take up the hatchet' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "At Loose Ends",
    "meaning": "In an uncertain situation",
    "example": "The examiner used 'at loose ends' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "With Might And Main",
    "meaning": "With full force",
    "example": "The examiner used 'with might and main' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cut Short",
    "meaning": "Interrupt",
    "example": "The examiner used 'cut short' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Laughing Stock",
    "meaning": "An object of laughter",
    "example": "The examiner used 'a laughing stock' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Have A Foot In The Grave",
    "meaning": "Be close to death",
    "example": "The examiner used 'have a foot in the grave' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "hard"
  },
  {
    "idiom": "A Hornet'S Nest",
    "meaning": "An unpleasant situation",
    "example": "The examiner used 'a hornet's nest' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Roll Out The Carpet",
    "meaning": "To give a grand party",
    "example": "The examiner used 'to roll out the carpet' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have An Axe To Grind",
    "meaning": "To have a selfish end to serve",
    "example": "The examiner used 'to have an axe to grind' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "God'S Acre",
    "meaning": "A cemetery besides Church",
    "example": "The examiner used 'god's acre' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Wrangle Over An Ass's Shadow",
    "meaning": "To quarrel over something trivial",
    "example": "The two clerks wrangled over an ass's shadow for an entire afternoon.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put One's Hand To The Plough",
    "meaning": "To begin a task in earnest",
    "example": "Once he put his hand to the plough, he never looked back.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Pick Holes",
    "meaning": "To criticize someone",
    "example": "The examiner used 'to pick holes' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Swept Under The Rug",
    "meaning": "Concealed from others",
    "example": "The examiner used 'swept under the rug' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "With A Fine-Tooth Comb",
    "meaning": "Carefully",
    "example": "The examiner used 'with a fine-tooth comb' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Stave Off",
    "meaning": "Delay",
    "example": "The examiner used 'stave off' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Full Of Beans",
    "meaning": "Energetic",
    "example": "The examiner used 'full of beans' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "At Sixes And Sevens",
    "meaning": "Confused",
    "example": "The examiner used 'at sixes and sevens' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Dog Eat Dog",
    "meaning": "Ruthlessly competitive",
    "example": "The examiner used 'dog eat dog' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Fits And Start",
    "meaning": "Unsteady",
    "example": "The examiner used 'fits and start' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In Harness",
    "meaning": "In office",
    "example": "The examiner used 'in harness' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Between The Horns Of A Dilemma",
    "meaning": "Facing a choice between two equally bad options",
    "example": "She was between the horns of a dilemma over which offer to accept.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Red Tape",
    "meaning": "Official procedures causing delay",
    "example": "The examiner used 'red tape' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Square Peg In A Round Hole",
    "meaning": "A person unsuited to their position or surroundings",
    "example": "As an accountant, the artist felt like a square peg in a round hole.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Eat One'S Own Words",
    "meaning": "Forced to retract one's own statement",
    "example": "The examiner used 'to eat one's own words' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Steal Someone'S Thunder",
    "meaning": "To take credit of something someone",
    "example": "The examiner used 'steal someone's thunder' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Going Against The Grain",
    "meaning": "Doing things differently from what one",
    "example": "The examiner used 'going against the grain' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Pull A Rabbit Out Of A Hat",
    "meaning": "To do something unexpected",
    "example": "The examiner used 'pull a rabbit out of a hat' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Let The Chips Fall Where They May",
    "meaning": "To let events unfold without interference",
    "example": "He told the truth and let the chips fall where they may.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Whole Bag Of Tricks",
    "meaning": "Make use of all the possibilities or",
    "example": "The examiner used 'whole bag of tricks' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn A Blind Eye",
    "meaning": "To ignore situation, facts or reality",
    "example": "The examiner used 'turn a blind eye' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Make A Long Story Short",
    "meaning": "To be precise and avoid giving the",
    "example": "The examiner used 'make a long story short' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Kill Two Birds With One Stone",
    "meaning": "To achieve two aims with a single action",
    "example": "By cycling to college, he killed two birds with one stone — saving money and staying fit.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "Pound The Pavement",
    "meaning": "Hunt for a job on the street",
    "example": "The examiner used 'pound the pavement' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "To Stick To One'S Guns",
    "meaning": "To be faithful to a cause",
    "example": "The examiner used 'to stick to one's guns' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Whole Nine Yards",
    "meaning": "Everything",
    "example": "The examiner used 'whole nine yards' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Bite One'S Lips",
    "meaning": "To get angry",
    "example": "The examiner used 'to bite one's lips' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Zero Tolerance",
    "meaning": "Non-acceptance of antisocial behavior",
    "example": "The examiner used 'zero tolerance' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Variety Is The Spice Of Life",
    "meaning": "New experiences make life more",
    "example": "The examiner used 'variety is the spice of life' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "hard"
  },
  {
    "idiom": "Scotfree",
    "meaning": "Without suffering any punishment",
    "example": "The examiner used 'scotfree' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Tongue In Cheek",
    "meaning": "In an insincere way",
    "example": "The examiner used 'tongue in cheek' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Wear Your Heart On Your Sleeve",
    "meaning": "To show one's feelings openly",
    "example": "He wears his heart on his sleeve and hides nothing from his friends.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "A Slap On The Wrist",
    "meaning": "A mild punishment",
    "example": "The examiner used 'a slap on the wrist' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Actions Speak Louder Than Words",
    "meaning": "What people do matters more than what they say",
    "example": "He promised to help, but actions speak louder than words.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "A Blessing In Disguise",
    "meaning": "A misfortune that eventually has good",
    "example": "The examiner used 'a blessing in disguise' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Against The Clock",
    "meaning": "To do a job fast to finish it before a",
    "example": "The examiner used 'against the clock' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "A Dime A Dozen",
    "meaning": "Very common and of particular value",
    "example": "The examiner used 'a dime a dozen' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Drop In The Bucket",
    "meaning": "A very small amount compared with",
    "example": "The examiner used 'a drop in the bucket' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Practice Makes A Man Perfect",
    "meaning": "Regular practice leads to mastery",
    "example": "Solve a paper daily; practice makes a man perfect.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Pull The Plug",
    "meaning": "Prevent something from continuing",
    "example": "The examiner used 'pull the plug' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "New Kid On The Block",
    "meaning": "A new comer",
    "example": "The examiner used 'new kid on the block' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Hot Potato",
    "meaning": "A controversial situation which is",
    "example": "The examiner used 'a hot potato' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Wag The Dog",
    "meaning": "To divert attention from something of",
    "example": "The examiner used 'wag the dog' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Tie The Knot",
    "meaning": "To get married",
    "example": "The examiner used 'tie the knot' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "The Ball Is In Your Court",
    "meaning": "It is up to you to make the next move",
    "example": "The examiner used 'the ball is in your court' in the sentence to test students.",
    "exam": ["SSC", "Banking", "UPSC", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "To Bite Off More Than One Can Chew",
    "meaning": "To take on more than one can handle",
    "example": "Taking five optional subjects, he bit off more than he could chew.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "To Bite The Bullet",
    "meaning": "To do or to accept something difficult",
    "example": "The examiner used 'to bite the bullet' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "To Make A Long Story Short",
    "meaning": "To tell something briefly, omitting details",
    "example": "To make a long story short, the deal finally fell through.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Steal Someone's Thunder",
    "meaning": "To take credit meant for another person",
    "example": "She stole his thunder by announcing the result before he could.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Rise And Shine",
    "meaning": "An expression used when waking",
    "example": "The examiner used 'rise and shine' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Raining Cats And Dogs",
    "meaning": "It is raining unusually hard",
    "example": "The examiner used 'raining cats and dogs' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Run Out Of Steam",
    "meaning": "To lose impetus or enthusiasm",
    "example": "The examiner used 'run out of steam' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Saved By The Bell",
    "meaning": "Saved at the last moment",
    "example": "The examiner used 'saved by the bell' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Smell A Rat",
    "meaning": "To begin to suspect trickery or deception",
    "example": "The examiner used 'smell a rat' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Sixth Sense",
    "meaning": "An intuitive power of perception",
    "example": "The examiner used 'sixth sense' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Rome Was Not Built In A Day",
    "meaning": "Great achievements take time and patience",
    "example": "Be patient with your preparation; Rome was not built in a day.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "hard"
  },
  {
    "idiom": "Rule Of Thumb",
    "meaning": "A broadly accurate guide based on",
    "example": "The examiner used 'rule of thumb' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Up A Blind Alley",
    "meaning": "Following a course of action that is",
    "example": "The examiner used 'up a blind alley' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Familiarity Breeds Contempt",
    "meaning": "Knowing someone too well can reduce respect",
    "example": "They quarrelled often after sharing a room, proving familiarity breeds contempt.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Don't Put All Your Eggs In One Basket",
    "meaning": "Do not risk everything on a single venture",
    "example": "Apply for several exams; don't put all your eggs in one basket.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Thumb One'S Nose",
    "meaning": "To express scorn",
    "example": "The examiner used 'thumb one's nose' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put The Cat Among The Pigeons",
    "meaning": "To cause trouble or commotion",
    "example": "His blunt question put the cat among the pigeons at the meeting.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "To Shoot The Breeze",
    "meaning": "To have a casual conversation",
    "example": "The examiner used 'to shoot the breeze' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "The Best Of Both Worlds",
    "meaning": "The benefits of widely differing",
    "example": "The examiner used 'the best of both worlds' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take The Cake",
    "meaning": "To degrade",
    "example": "The examiner used 'to take the cake' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Sleep With The Fishes",
    "meaning": "To be dead",
    "example": "The examiner used 'to sleep with the fishes' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Shooting Fish In A Barrel",
    "meaning": "Ridiculously easy task",
    "example": "The examiner used 'shooting fish in a barrel' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Ignorance Is Bliss",
    "meaning": "Sometimes it is better for you if you do",
    "example": "The examiner used 'ignorance is bliss' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Have A Blast",
    "meaning": "To have a lot of fun",
    "example": "The examiner used 'have a blast' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By The Skin Of One'S Teeth",
    "meaning": "A very narrow margin",
    "example": "The examiner used 'by the skin of one's teeth' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Crocodile Tears",
    "meaning": "Expressions of sorrow that are insincere",
    "example": "The examiner used 'crocodile tears' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Chink In One'S Armour",
    "meaning": "An area of vulnerability",
    "example": "The examiner used 'chink in one's armour' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Beauty Is In The Eye Of The Beholder",
    "meaning": "Beauty is a matter of personal opinion",
    "example": "Some found the painting odd, but beauty is in the eye of the beholder.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Necessity Is The Mother Of Invention",
    "meaning": "Need drives people to find creative solutions",
    "example": "The villagers built a bamboo bridge — necessity is the mother of invention.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By The Seat Of One'S Pants",
    "meaning": "To do it using only one's own experience",
    "example": "The examiner used 'by the seat of one's pants' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "hard"
  },
  {
    "idiom": "Discretion Is The Better Part Of Valour",
    "meaning": "Caution is wiser than reckless bravery",
    "example": "He withdrew from the argument, knowing discretion is the better part of valour.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Too Many Cooks Spoil The Broth",
    "meaning": "Too many people involved ruin the work",
    "example": "Five people editing one report proved too many cooks spoil the broth.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Spin One'S Wheels",
    "meaning": "To waste one's time",
    "example": "The examiner used 'to spin one's wheels' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Be Pushing Up Daisies",
    "meaning": "To be dead and buried",
    "example": "The examiner used 'to be pushing up daisies' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Pull Or Twist Out Of Shape",
    "meaning": "To distort something from its proper form",
    "example": "The heat pulled the plastic frame out of shape.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "To Jump Ship",
    "meaning": "To leave an organization",
    "example": "The examiner used 'to jump ship' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Kick The Bucket",
    "meaning": "To die",
    "example": "The examiner used 'to kick the bucket' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "X Marks The Spot",
    "meaning": "The exact location",
    "example": "The examiner used 'x marks the spot' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "You Can Say That Again",
    "meaning": "To express agreement",
    "example": "The examiner used 'you can say that again' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "The Elephant In The Room",
    "meaning": "An obvious problem that no one wants",
    "example": "The examiner used 'the elephant in the room' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Make From Scratch",
    "meaning": "To do something from the beginning",
    "example": "The examiner used 'to make from scratch' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "All Good Things Must Come To An End",
    "meaning": "Nothing pleasant lasts forever",
    "example": "The holiday ended sadly, but all good things must come to an end.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Barking Up The Wrong Tree",
    "meaning": "To be pursuing a misguided line of",
    "example": "By blaming the peon, the officer was barking up the wrong tree.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Back To The Drawing Board",
    "meaning": "An idea has been unsuccessful and that",
    "example": "The prototype failed, so the team went back to the drawing board.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Blood Is Thicker Than Water",
    "meaning": "Family bonds are stronger than other ties",
    "example": "He supported his cousin in the dispute — blood is thicker than water.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "A Fool And His Money Are Easily Parted",
    "meaning": "Foolish people quickly lose their wealth",
    "example": "He spent his prize on lottery tickets; a fool and his money are easily parted.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "hard"
  },
  {
    "idiom": "All Bark And No Bite",
    "meaning": "To be full of big talk but lacking action",
    "example": "The examiner used 'all bark and no bite' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Back To Square One",
    "meaning": "To be back to where one started, with",
    "example": "The examiner used 'back to square one' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "An Arm And A Leg",
    "meaning": "A large, possibly exorbitant, amount of",
    "example": "The examiner used 'an arm and a leg' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "All In The Same Boat",
    "meaning": "To be in the same unpleasant situation",
    "example": "The examiner used 'all in the same boat' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "All Greek To Me",
    "meaning": "Saying that one does not understand",
    "example": "The examiner used 'all greek to me' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "At The Drop Of A Hat",
    "meaning": "Without hesitation or good reason",
    "example": "The examiner used 'at the drop of a hat' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Apple Of My Eye",
    "meaning": "Someone that one cherishes above all",
    "example": "The examiner used 'apple of my eye' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "No Man Is An Island",
    "meaning": "No one is self-sufficient, everyone relies",
    "example": "The examiner used 'no man is an island' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "The Squeaky Wheel Gets The Grease",
    "meaning": "The one who complains loudest gets attention",
    "example": "She complained daily until her file moved — the squeaky wheel gets the grease.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Beat A Dead Horse",
    "meaning": "To revive interest in a hopeless issue",
    "example": "The examiner used 'to beat a dead horse' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Beating Around The Bush",
    "meaning": "To avoid getting to the point of an issue",
    "example": "The examiner used 'beating around the bush' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "To Bite Off More Than You Can Chew",
    "meaning": "To take on more than you can handle",
    "example": "Running two businesses at once, he bit off more than he could chew.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "To Bite Your Tongue",
    "meaning": "To make a desperate effort to avoid",
    "example": "The examiner used 'to bite your tongue' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Birds Of A Feather Flock Together",
    "meaning": "Similar people tend to associate with each other",
    "example": "The two idlers spent all day together; birds of a feather flock together.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Beggars Can'T Be Choosers",
    "meaning": "People with no other options must be",
    "example": "The examiner used 'beggars can't be choosers' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Chip On His Shoulder",
    "meaning": "Holding a grudge or grievance that",
    "example": "The examiner used 'to chip on his shoulder' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Chew Someone Out",
    "meaning": "Reprimand someone severely",
    "example": "The examiner used 'to chew someone out' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Feeding Frenzy",
    "meaning": "An episode of frantic competition for",
    "example": "The examiner used 'feeding frenzy' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Excuse My French",
    "meaning": "To apologize for swearing",
    "example": "The examiner used 'excuse my french' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Dry Run",
    "meaning": "A rehearsal of a performance before the",
    "example": "The examiner used 'dry run' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Cross Your Fingers",
    "meaning": "To hope that things will happen in the",
    "example": "The examiner used 'to cross your fingers' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Crack Someone Up",
    "meaning": "To make someone laugh",
    "example": "The examiner used 'to crack someone up' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Down To The Wire",
    "meaning": "To denote a situation whose outcome is",
    "example": "The examiner used 'down to the wire' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Drink Like A Fish",
    "meaning": "To drink excessive amounts of alcohol",
    "example": "The examiner used 'to drink like a fish' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Buy A Lemon",
    "meaning": "To purchase a vehicle that constantly",
    "example": "The examiner used 'to buy a lemon' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Cast Iron Stomach",
    "meaning": "To be able to eat or drink anything",
    "example": "The examiner used 'to cast iron stomach' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Ethnic Cleansing",
    "meaning": "The mass killing of members of one",
    "example": "The examiner used 'ethnic cleansing' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Every Cloud Has A Silver Lining",
    "meaning": "Every difficulty has some hidden benefit",
    "example": "He lost the job but found a better one — every cloud has a silver lining.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Dead Ringer",
    "meaning": "A candidate fraudulently substituted for",
    "example": "The examiner used 'dead ringer' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Flea Market",
    "meaning": "A street market selling second-hand",
    "example": "The examiner used 'flea market' in the sentence to test students.",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Flesh And Blood",
    "meaning": "A person's physical body and their",
    "example": "The examiner used 'flesh and blood' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Go For Broke",
    "meaning": "To risk everything in an all-out effort",
    "example": "The examiner used 'to go for broke' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Go The Extra Mile",
    "meaning": "To make a special effort to achieve",
    "example": "The examiner used 'to go the extra mile' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Fixed In One'S Ways",
    "meaning": "Not wanting to change how one does",
    "example": "The examiner used 'fixed in one's ways' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Flash In The Pan",
    "meaning": "A thing or person whose sudden but",
    "example": "The examiner used 'flash in the pan' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Foam At The Mouth",
    "meaning": "To be very angry",
    "example": "The examiner used 'to foam at the mouth' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Fuddy-Duddy",
    "meaning": "A person who is very old-fashioned and",
    "example": "The examiner used 'fuddy-duddy' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Great Minds Think Alike",
    "meaning": "It is said when two people have the",
    "example": "The examiner used 'great minds think alike' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Go Down Like A Lead Balloon",
    "meaning": "To fail completely and be badly received",
    "example": "His joke went down like a lead balloon before the serious panel.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Graveyard Shift",
    "meaning": "A work shift that runs through the",
    "example": "The examiner used 'graveyard shift' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Get Over It",
    "meaning": "To accept something that happened in",
    "example": "The examiner used 'to get over it' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Get Up On The Wrong Side Of The Bed",
    "meaning": "To be in a bad mood all day",
    "example": "He snapped at everyone; clearly he got up on the wrong side of the bed.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "To Burn The Midnight Oil",
    "meaning": "To read or work late into the night",
    "example": "The examiner used 'to burn the midnight oil' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Lose One'S Head",
    "meaning": "To become confused or overly emotional",
    "example": "The examiner used 'to lose one's head' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Head Over Heels",
    "meaning": "To be madly in love",
    "example": "The examiner used 'head over heels' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "At Iron Will",
    "meaning": "A firm option",
    "example": "The examiner used 'at iron will' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get Into Soup",
    "meaning": "To make things difficult",
    "example": "The examiner used 'get into soup' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Haul Over The Coals",
    "meaning": "To scold",
    "example": "The examiner used 'haul over the coals' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Carry The Day",
    "meaning": "To succeed",
    "example": "The examiner used 'to carry the day' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Go Over",
    "meaning": "Review",
    "example": "The examiner used 'go over' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Swelled Head",
    "meaning": "Pride",
    "example": "The examiner used 'swelled head' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Sow The Dragon'S Teeth",
    "meaning": "To take some action",
    "example": "The examiner used 'to sow the dragon's teeth' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get Ground",
    "meaning": "Avoid",
    "example": "The examiner used 'get ground' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Cudgel One'S Brain",
    "meaning": "To think hard",
    "example": "The examiner used 'to cudgel one's brain' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Broke Priscian'S Head",
    "meaning": "To use bad grammar",
    "example": "The examiner used 'broke priscian's head' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Cry In The Wilderness",
    "meaning": "Unpopular opinion",
    "example": "The examiner used 'cry in the wilderness' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Bolt From The Blue",
    "meaning": "A sudden calamity",
    "example": "The examiner used 'bolt from the blue' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "A Snake In The Grass",
    "meaning": "A treacherous person",
    "example": "The examiner used 'a snake in the grass' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "At Variance With",
    "meaning": "In opposite",
    "example": "The examiner used 'at variance with' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In Deep Water",
    "meaning": "In great difficulty",
    "example": "The examiner used 'in deep water' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Egg",
    "meaning": "In an early stage",
    "example": "The examiner used 'in the egg' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cut In On",
    "meaning": "Interrupt",
    "example": "The examiner used 'cut in on' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Give Up Ghost",
    "meaning": "To die",
    "example": "The examiner used 'give up ghost' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By Fair Means Or Foul",
    "meaning": "By any means",
    "example": "The examiner used 'by fair means or foul' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sword Of Damocles",
    "meaning": "Imminent danger",
    "example": "The examiner used 'sword of damocles' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "hard"
  },
  {
    "idiom": "Out Of Elbows",
    "meaning": "Poor",
    "example": "The examiner used 'out of elbows' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Pandora'S Box",
    "meaning": "A prolific source of trouble",
    "example": "The examiner used 'pandora's box' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "A Nignog",
    "meaning": "A fool",
    "example": "The examiner used 'a nignog' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Faint Hearted",
    "meaning": "Timid",
    "example": "The examiner used 'faint hearted' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Lead Astray",
    "meaning": "To misguide",
    "example": "The examiner used 'to lead astray' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Make A Pile",
    "meaning": "To make a lot of money",
    "example": "The examiner used 'to make a pile' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "Back Out Of",
    "meaning": "Withdraw",
    "example": "The examiner used 'back out of' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Throw Over",
    "meaning": "Reject",
    "example": "The examiner used 'throw over' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Chicken Hearted",
    "meaning": "Timid",
    "example": "The examiner used 'chicken hearted' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Down And Out",
    "meaning": "Without money",
    "example": "The examiner used 'down and out' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "High And Low",
    "meaning": "Everywhere",
    "example": "The examiner used 'high and low' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Damsel In Distress",
    "meaning": "A helpless woman",
    "example": "The examiner used 'a damsel in distress' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "God'S Ape",
    "meaning": "A born fool",
    "example": "The examiner used 'god's ape' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Lion'S Mouth",
    "meaning": "A dangerous situation",
    "example": "The examiner used 'lion's mouth' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "A Stiff-Necked Person",
    "meaning": "An obstinate person",
    "example": "The examiner used 'a stiff-necked person' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cross Out",
    "meaning": "Eliminate",
    "example": "The examiner used 'cross out' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Make Away With",
    "meaning": "To remove",
    "example": "The examiner used 'make away with' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put One Out Of Countenance",
    "meaning": "To embarrass or disconcert someone",
    "example": "The sharp question put the speaker out of countenance.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In Vogue",
    "meaning": "Popular",
    "example": "The examiner used 'in vogue' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "In A Fix",
    "meaning": "In a puzzling state",
    "example": "The examiner used 'in a fix' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Hammer Out",
    "meaning": "To plan",
    "example": "The examiner used 'to hammer out' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Mare'S Nest",
    "meaning": "A rumour",
    "example": "The examiner used 'a mare's nest' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Stand For",
    "meaning": "Represent",
    "example": "The examiner used 'stand for' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Cock And Bull Story",
    "meaning": "An imaginary story",
    "example": "The examiner used 'a cock and bull story' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Black Ox",
    "meaning": "Misfortune",
    "example": "The examiner used 'black ox' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Broke A Lance With",
    "meaning": "To argue against",
    "example": "The examiner used 'broke a lance with' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Cry Wolf",
    "meaning": "To raise a false alarm",
    "example": "The examiner used 'cry wolf' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Broke Reed",
    "meaning": "Support that failed",
    "example": "The examiner used 'broke reed' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Bear Up With",
    "meaning": "Endure",
    "example": "The examiner used 'bear up with' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Creature Comforts",
    "meaning": "Luxuries",
    "example": "The examiner used 'creature comforts' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Clear The Decks",
    "meaning": "To remove obstructions",
    "example": "The examiner used 'to clear the decks' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Cut The Crackle",
    "meaning": "To stop talking and start",
    "example": "The politicians in India needs to cut the crackle for the benefit of the masses.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Offing",
    "meaning": "Appear soon",
    "example": "The examiner used 'in the offing' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Wolf In Sheep Clothing",
    "meaning": "Hypocrite",
    "example": "The examiner used 'wolf in sheep clothing' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Heads With Roll",
    "meaning": "Dismissed or forced to resign",
    "example": "The examiner used 'heads with roll' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "A Green Horn",
    "meaning": "An experienced person",
    "example": "The examiner used 'a green horn' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "To Paddle One'S Own Canoe",
    "meaning": "Manage independently",
    "example": "The examiner used 'to paddle one's own canoe' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep The Pot",
    "meaning": "To keep controversy alive",
    "example": "The examiner used 'to keep the pot' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Beat The Air",
    "meaning": "To make the efforts that are useless",
    "example": "The examiner used 'to beat the air' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Threw A Sapper",
    "meaning": "Sabotage",
    "example": "The examiner used 'threw a sapper' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "A Rift In The Lute",
    "meaning": "Brought about disharmony",
    "example": "The examiner used 'a rift in the lute' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cushy Job",
    "meaning": "Financially comfortable job",
    "example": "The examiner used 'cushy job' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Sum And Substance",
    "meaning": "Summary",
    "example": "The examiner used 'sum and substance' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Weigh Anchor",
    "meaning": "Prepare to sail again",
    "example": "The examiner used 'weigh anchor' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Seize The Nettle",
    "meaning": "Dealt firmly",
    "example": "The examiner used 'seize the nettle' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep The Wolf From The Door",
    "meaning": "To earn just enough to avoid hunger and poverty",
    "example": "He took evening tuitions to keep the wolf from the door.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "Mealymouthed",
    "meaning": "Softspoken",
    "example": "The examiner used 'mealymouthed' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Spin One'S Wheels",
    "meaning": "Expel much effort for little or no gain",
    "example": "The examiner used 'spin one's wheels' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Put One'S Foot Down",
    "meaning": "Adopt a firm policy when faced with",
    "example": "The examiner used 'put one's foot down' in the sentence to test students.",
    "exam": ["SSC", "Banking", "UPSC", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Whistle In The Dark",
    "meaning": "Pretend to be unafraid",
    "example": "The examiner used 'whistle in the dark' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "The Alpha And The Omega",
    "meaning": "The beginning and the end",
    "example": "The examiner used 'the alpha and the omega' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Throw Up The Sponge",
    "meaning": "To surrender",
    "example": "The examiner used 'throw up the sponge' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put A Spoke In One's Wheel",
    "meaning": "To obstruct someone's plans",
    "example": "His rival put a spoke in his wheel by delaying the paperwork.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "A Moot Point",
    "meaning": "Disputed",
    "example": "The examiner used 'a moot point' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Draw The Longbow",
    "meaning": "To exaggerate",
    "example": "The examiner used 'to draw the longbow' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "All Agog",
    "meaning": "Amazed",
    "example": "The examiner used 'all agog' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Not To Mince Matters",
    "meaning": "To speak out politely",
    "example": "The examiner used 'not to mince matters' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Kick The Bucket",
    "meaning": "To die",
    "example": "The examiner used 'kick the bucket' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Willothe Wisp",
    "meaning": "Something that is impossible to get or",
    "example": "The examiner used 'willothe wisp' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Go Through Fire And Water",
    "meaning": "To face any danger for someone's sake",
    "example": "A mother will go through fire and water for her children.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Ended In A Fiasco",
    "meaning": "A complete failure",
    "example": "The examiner used 'ended in a fiasco' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Sow Wild Oats",
    "meaning": "To waste time by doing foolish things in",
    "example": "The examiner used 'sow wild oats' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Live From Hand To Mouth",
    "meaning": "To have enough money to live on and",
    "example": "The family lived from hand to mouth after the factory closed.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Pillar To Post",
    "meaning": "One place to another",
    "example": "The examiner used 'pillar to post' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hobson'S Choice",
    "meaning": "No real choice at all",
    "example": "The examiner used 'hobson's choice' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "hard"
  },
  {
    "idiom": "Adam'S Ale",
    "meaning": "Water",
    "example": "The examiner used 'adam's ale' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "At One'S Wits End",
    "meaning": "To get puzzled",
    "example": "The examiner used 'at one's wits end' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Steal A March",
    "meaning": "To outshine",
    "example": "The examiner used 'to steal a march' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In A Jiffy",
    "meaning": "Something that is done very quickly",
    "example": "The examiner used 'in a jiffy' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "The Thin End Of The Wedge",
    "meaning": "A small change that leads to something much worse",
    "example": "Allowing one exception may be the thin end of the wedge.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Accept The Gauntlet",
    "meaning": "To accept challenge",
    "example": "The examiner used 'to accept the gauntlet' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Wrangle Over An Ass's Shadow",
    "meaning": "To quarrel over something trivial",
    "example": "They wrangled over an ass's shadow instead of solving the real issue.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make One'S Flesh Creep",
    "meaning": "To frighten someone",
    "example": "The examiner used 'make one's flesh creep' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Damp Squib",
    "meaning": "Complete failure",
    "example": "The examiner used 'damp squib' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Bear The Palm",
    "meaning": "To win",
    "example": "The examiner used 'bear the palm' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have A Finger In Every Pie",
    "meaning": "To be involved in many activities at once",
    "example": "The busy trustee has a finger in every pie in the town.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "To Make Up One'S Mind",
    "meaning": "To make a decision / decide",
    "example": "The examiner used 'to make up one's mind' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Hit The Nail On The Head",
    "meaning": "To describe something exactly right",
    "example": "Her comment hit the nail on the head and ended the debate.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "On Thin Ice",
    "meaning": "In a precarious or risky situation",
    "example": "The examiner used 'on thin ice' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have A Sigh Of Relief",
    "meaning": "To suddenly feel very happy because",
    "example": "The examiner used 'to have a sigh of relief' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "hard"
  },
  {
    "idiom": "To Be On Cloud Nine",
    "meaning": "To extremely happy",
    "example": "Was Helen pleased about getting that job?' 'Pleased? She was on cloud nine!",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have Something On The Brain",
    "meaning": "To be obsessed with one thought",
    "example": "Ever since the result, he has the interview on the brain.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Not One'S Cup Of Tea",
    "meaning": "Not one's choice or preference",
    "example": "The examiner used 'not one's cup of tea' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "In Bad Taste",
    "meaning": "Not suitable or offensive",
    "example": "The examiner used 'in bad taste' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have At One's Fingertips",
    "meaning": "To know something thoroughly and readily",
    "example": "A good teacher has the whole syllabus at her fingertips.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Not Have A Clue",
    "meaning": "To not know about something",
    "example": "The examiner used 'to not have a clue' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Out Of Date",
    "meaning": "Old fashioned",
    "example": "The examiner used 'out of date' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "It Goes Without Saying",
    "meaning": "Something which is implied to be",
    "example": "The examiner used 'it goes without saying' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "To Let Someone Off",
    "meaning": "To leave someone in his present state",
    "example": "The examiner used 'to let someone off' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Call It A Day",
    "meaning": "To declare the end of a task",
    "example": "The examiner used 'call it a day' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Ball Is In Your Court",
    "meaning": "It is up to you to make the next decision",
    "example": "The examiner used 'ball is in your court' in the sentence to test students.",
    "exam": ["SSC", "Banking", "UPSC", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Best Of Both Worlds",
    "meaning": "A situation wherein someone has the",
    "example": "The examiner used 'best of both worlds' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Give Somebody A Ring",
    "meaning": "Call someone on the telephone",
    "example": "The examiner used 'give somebody a ring' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Leave No Stone Unturned",
    "meaning": "Try every possible course of action in",
    "example": "Ahead of its return to the IPL in , Chennai Super Kings is leaving no stone unturned to get its campaign back on the track. One of the key reasons for its success in the first eigh",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get The Message",
    "meaning": "Understand what is implied by a",
    "example": "The examiner used 'get the message' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep At Bay",
    "meaning": "To control something and prevent it",
    "example": "Refreshed with a days rest thanks to the inclement weather, Virat Kohli reiterated that his men will keep complacency at bay while playing the third and final Test against Sri Lan",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Go Off The Air",
    "meaning": "To stop broadcasting a radio or TV",
    "example": "The examiner used 'to go off the air' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Make A Fuss About",
    "meaning": "An excessive display of attention or",
    "example": "The examiner used 'to make a fuss about' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Go To Somebody'S Head",
    "meaning": "To make someone dizzy or slightly",
    "example": "The examiner used 'to go to somebody's head' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Make Amends",
    "meaning": "To compensate",
    "example": "The examiner used 'to make amends' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get On The Nerves",
    "meaning": "To be an irritant",
    "example": "The examiner used 'get on the nerves' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep Under One'S Hat",
    "meaning": "To keep something a secret",
    "example": "The examiner used 'keep under one's hat' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Go For A Song Sold",
    "meaning": "Cheaply",
    "example": "The examiner used 'go for a song sold' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make An Ass Out Of",
    "meaning": "Cause someone or oneself to look foolish",
    "example": "The examiner used 'make an ass out of' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Achilles' Heel",
    "meaning": "A fatal weakness in spite of overall",
    "example": "The examiner used 'achilles' heel' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Beat Around The Bush",
    "meaning": "To treat a topic, but omit its main",
    "example": "The examiner used 'beat around the bush' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Gnash Your Teeth",
    "meaning": "Express rage",
    "example": "The examiner used 'gnash your teeth' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Let Something Slip Through One's Fingers",
    "meaning": "To lose an opportunity through carelessness",
    "example": "He let a golden opportunity slip through his fingers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Get Up On The Wrong Side Of The Bed",
    "meaning": "To be in a bad mood all day",
    "example": "She was grumpy all morning, having got up on the wrong side of the bed.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Learn By Heart",
    "meaning": "To memorize something",
    "example": "The examiner used 'learn by heart' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Beat A Dead Horse",
    "meaning": "To uselessly dwell on a subject far",
    "example": "The examiner used 'beat a dead horse' in the sentence to test students.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Decked up",
    "meaning": "put on special clothes to appear particularly appealing and attractive",
    "example": "When the consultation began in the evening, the mausoleum of former Chief Minister Jayalalithaa on the Marina was decked up with flowers",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Doing the rounds",
    "meaning": "to be passed from one person to another",
    "example": "Since morning, the talk doing the rounds was that Mr. Panneerselvam would come out with a statement on the merger after Chief Minister Edappadi K. Palaniswami on Thursday announced",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Put off",
    "meaning": "an evasive reply, to delay doing something, especially because you do not want to do it",
    "example": "The strong stand taken by leaders, including former Minister K.P. Munusamy, was said to have prompted Mr. Panneerselvam to put off a decision on the merger. Mr. Munusamy was not ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Takes a beating",
    "meaning": "to be damaged because of performing badly or being criticized",
    "example": "Vishal Sikka quits as Infosys CEO, shares take a beating",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn up/on the heat",
    "meaning": "to use force to persuade someone to do something; to increase the pressure on someone to do something",
    "example": "Management is turning the heat up to increase production. The teacher really turned up the heat on the students by saying that everyone would be punished if the real culprit was no",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Rip apart",
    "meaning": "to destroy something completely",
    "example": "The nine judge bench of the supreme court on Thursday ripped apart its own",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Step down",
    "meaning": "withdraw or resign from an important position or office",
    "example": "R. Seshasayee, chairman of the board decided to step down from the board, Infosys said in a release.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Strikes a blow",
    "meaning": "to do something to help or to support an idea, movement, or group , to do something to harm or oppose an idea, movement, or group",
    "example": "The supreme court judgment strikes a blow on the unbridled encroachment and surveillance by the state and its agencies in the life of the common man",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Hold on",
    "meaning": "wait; stop , endure in difficult circumstances.",
    "example": "The result helped UP hold on to the top spot in Zone B but, in a group where the difference between the top and bottom-placed sides is just 16 points, it would be a fragile lead",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pull through",
    "meaning": "get through an illness or other dangerous or difficult situation",
    "example": "Second seed Harinder Pal was in a lot of trouble after a sluggish start against Aditya Jagtap, but regained the surety of his touch to pull through in four games.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pumped up",
    "meaning": "to fill with enthusiasm or excitement, to fill with or as if with air",
    "example": "I like the fast court. I am pretty happy and pumped up to play the semifinal, said Kush.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "12: Leave no stone unturned",
    "meaning": "to do everything possible in order to achieve or find something",
    "example": "Ahead of its return to the IPL in 2018, Chennai Super Kings is leaving no stone unturned to get its campaign back on the track. One of the key reasons for its success in the first ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Rope in",
    "meaning": "you mean that someone persuaded you to help them do that task",
    "example": "For 2018, the intentions remains the same with the team intending to rope in former coach Stephen Fleming",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "snuffed out",
    "meaning": "to make something end quickly, especially by using force",
    "example": "It was the governments most brutal attempt to snuff out the rebellion.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "knock out",
    "meaning": "to make someone leave a competition by defeating them",
    "example": "Denis Shapovalov makes his glee known after knocking out top seed Rafael Nadal.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "crash out",
    "meaning": "to be badly defeated so that you have to leave a competition",
    "example": "Davinder Singh became the first Indian to qualify for the javelin final even as his more fancied compatriot Neeraj Chopra crashed out in the qualification round.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "lay in tatters",
    "meaning": "damaged beyond repair",
    "example": "Wayde van Niekerks dreams of emulating legend Michael Johnsons 200-400m world double lay in tatters on Thursday as Turkeys 9/1 outsider Ramil Guliyev edged the 200m final",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn in",
    "meaning": "Hand in, submit",
    "example": "Ramil Guliyev turned it on when it mattered most tostun pre-race favorite Wayde Van Niekerk In the 200 m",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "sweat something out",
    "meaning": "to anxiously wait for something, to get rid of something in one's body by sweating.",
    "example": "With team selection imminent, Dhoni and Suresh Raina, who last played an ODI for India in October 2015, sweated it out on Friday. sent in my application and now I have to sweat out",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "tone down",
    "meaning": "altered so as to be less extreme or intense.",
    "example": "The ground is surrounded by cloud-enveloped mountains and acres of verdant green. The last-named shade was however toned down on the pitch with the ground-staff scrubbing away the ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "scrub away",
    "meaning": "to clean something away by rubbing.",
    "example": "The ground is surrounded by cloud-enveloped mountains and acres of verdant green. The last-named shade was however toned down on the pitch with the ground-staff scrubbing away the ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "tick all the boxes :",
    "meaning": "To satisfy or fulfill everything that is necessary or desired.",
    "example": "Virat Kohlis men have ticked most of the boxes, be it runs or wickets, with the lone worry being a few butter-fingers in the close-in cordon.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "butter-fingers",
    "meaning": "Someone who is clumsy and often drops things or else fails to catch something",
    "example": "Virat Kohlis men have ticked most of the boxes, be it runs or wickets, with the lone worry being a few butter-fingers in the close-in cordon.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "lose ground",
    "meaning": "to fall behind someone or something, become less successful",
    "example": "Equity benchmark indices lost ground for the fifth consecutive day on Friday as weak domestic corporate numbers along with global negativity on account of geopolitical tensions dam",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "stem the tide",
    "meaning": "to stop something from increasing",
    "example": "This law may stem the tide of pollution of our beautiful river from the factories built along its banks.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hinge on",
    "meaning": "to be determined or decided by (something): to depend on (something)",
    "example": "Roelant Oltmans continuation as the hockey head coach hinges on the clarity and quality of his plans for Indias hectic season ahead",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Make or break",
    "meaning": "To cause either total success or total ruin",
    "example": "The recent Europe tour was expected to be the make-or-break outing for the Dutchman and a final decision will be taken when the Hockey India panel, formed to evaluate the teams pe",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Step up",
    "meaning": "To increase the pace, effort or intensity of something",
    "example": "What he has done so far is appreciated but there is now need to step up to another level, compete and win against the top-four.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "In the scheme of things",
    "meaning": "the way things are organized or happen in a particular situation, or the way someone wants them to be organized:",
    "example": "He insisted that R. Ashwin, despite playing only 15 ODI matches since the 2015 World Cup, is very much in the scheme of things",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Back up",
    "meaning": "one that serves as a substitute or support",
    "example": "Looking ahead to the 2019 World Cup, we will need to have back up options for every bowler that we have.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Bestowed on",
    "meaning": "to give something to someone; to present something to someone",
    "example": "Knighthoods had been bestowed on West Indian cricketers like confetti",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cross the line",
    "meaning": "to change from being acceptable to being unacceptable, to do something wrong",
    "example": "Chasing a target of 224, India-A took",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pulled off",
    "meaning": "to succeed in doing something that is difficult",
    "example": "In the biggest upset in the section, Frances Brice Leverdez pulled off the first shock by defeating second seed Lee Chong Wei 21-19, 22-24, 21-17 in 75 minutes and perhaps end Lee",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Bow out",
    "meaning": "withdraw or retire from an activity or role.",
    "example": "India top mixed doubles pair of Pranaav Jerry Chopra and N. Sikki Reddy, also seeded 15th, defeated Indo-Malaysian combo of Prajakta Sawant and Yogendran Khrishnan 21-12, 21-",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cast out",
    "meaning": "to force someone or something to leave a place",
    "example": "The minority verdict said social evils such as sati, infanticide, and devadasi system were cast out by way of legislation and not by judicial orders.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Every cloud has a silver lining",
    "meaning": "Good things come after bad things",
    "example": "It seems that if you're big, rich and powerful enough, every cloud has a silver lining.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "hard"
  },
  {
    "idiom": "Take a stand",
    "meaning": "Adopt a firm position about an issue",
    "example": "To smoothen the process of merger of the two AIADMK factions, the camp led by chief minister Edapadi k. Palaniswami is expected to take a stand against AIADMK (AMMA) interim genera",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Blew the lid off",
    "meaning": "to make public something that was previously not known or was hidden",
    "example": "Former DIG of Prisons D. Roopa, who blew the lid off the special treatment meted out to prisoners, including Sasikala submitted the footage taken from the CCTV recording of the cen",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Run over",
    "meaning": "to hit someone or something with a vehicle and drive over them, to practise what you are going to say in a speech, performance etc",
    "example": "Senior Railway Ministry officials told that welding work was underway near the Khatauli railway station in Uttar Pradesh, leaving a portion of the track without rails when the Utka",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Gearing up",
    "meaning": "to prepare yourself, or to prepare something for an activity or event.",
    "example": "With the home-stretch in sight, the leading contenders headed by Swapnil Dhopade are gearing up for a powerful finish in the National Challengers chess championship here.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Pinned back",
    "meaning": "to hold something back by pinning",
    "example": "The 26-year-old Spaniard struck the winner with less than three minutes",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Part ways",
    "meaning": "to leave each other, to depart from someone",
    "example": "After failing to defend their Los Cabos title last month. Purav Raja and Divji Sharan fell 15 places each in the ATP rankings and the pair decided to part ways heading to the US OP",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Hogging the limelight",
    "meaning": "making oneself the center of attention to the exclusion of others",
    "example": "Over the past few years, the Indian presence in the mens singles has been growing steadily. Initially, women players hogged the limelight due to Saina Nehwal and P.V. Sindhu winni",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Drowning out",
    "meaning": "to make it impossible to hear something",
    "example": "The hyper-charged crowds were only too happy to comply and shouted back, Bharat Mata ki Jai, drowning out the Pakistani attack",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Wind down",
    "meaning": "gradually lose power",
    "example": "Seventy years after 1947, its time to wind down the choreographed hostility at the India-Pakistan border",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "To feel under the weather",
    "meaning": "to not feel well",
    "example": "Im really feeling under the weather today; I have a terrible cold and fever",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "easy"
  },
  {
    "idiom": "Eked out",
    "meaning": "to make (a supply) last, to add to (something insufficient), esp with effort",
    "example": "GM Harika eked out a draw against GM Stupak Kirill from Belarus Many workers can only eke out their redundancy money for about 10 weeks.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Signed off",
    "meaning": "To announce the end of a communication; conclude.",
    "example": "Vishwanathan Anand signed off with a loss, that resulted in Sergey Karjakins lone victory, and finished tied eighth with Garry Kasparov",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Bring up the rear",
    "meaning": "to move along behind everyone else; to be at the end of the line.",
    "example": "Having brought up the rear in the 10 player event, Anand and Kasparov will be keen to gain ground when the action shifts to 18 round blitz.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Gain ground",
    "meaning": "to become more successful, popular, or accepted",
    "example": "Having brought up the rear in the 10 player event, Anand and kasporav will be keen to gain ground when the action shifts to 18 round blitz.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Put up a brave front",
    "meaning": "to act confidently in a difficult situation",
    "example": "When the National Anthem played, Rashmi Rathore put up a brave front. shed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pent-up",
    "meaning": "unable to be expressed or released, closely confined or held back.",
    "example": "Ceremony over, she deserted the podium, heading for the closest corner. Pent- up grief gave way to a torrent of tears.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Tie up (the) loose ends",
    "meaning": "to deal with the last few things that have to be done before you can finish something",
    "example": "Weve just got a few loose ends to tie up and then the report will be ready.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Shore up",
    "meaning": "to support or help",
    "example": "NPA resolution would necessitate a higher recapitalization of these banks  MR.PATEL said the government and the RBI are in dialogue to prepare a set of measures to enable state-r",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Run out",
    "meaning": "be used up.",
    "example": "Just a year after Rio hosted the Olympics, its crime rate has spiralled out of control, and its top politicians have landed in jail cells for corruption",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Spilled over",
    "meaning": "reach a point at which it can no longer be controlled or contained, to spread to other areas",
    "example": "Rios poor have been bearing the brunt of gang wars for decades. But in the year since the 2016 Games, robberies, murders, kidnappings and gun battles have spilled over onto the st",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cut down",
    "meaning": "reduce, do less of something bad",
    "example": "The troops may stay over till 2018 if their guns fail to cut down the surging violence",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Playing out",
    "meaning": "happen, take place, develop in a particular way",
    "example": "As the world is hooked on the Game of Thrones season seven, Pakistan continues to experience its own power games, which have been playing out, in one way or the other, since the ea",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To take off",
    "meaning": "To embark on rapid activity, development, or growth, to begin",
    "example": "the Higher Education Financing Agency (HEFA) is set to take off soon, with the Ministry of Human Resource Development (MHRD) asking Centrally funded higher education institutions t",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Close on the heels",
    "meaning": "happening soon after another event, following close behind someone or something",
    "example": "Her remarks came hard on the heels of a statement by the President.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Chalk out",
    "meaning": "to explain something carefully to someone, as if one were talking about a chalk drawing.",
    "example": "Directing status quo in the matter till August 22, which is also the next date of hearing, the apex court ordered the Medical Council of India (MCI) and the State government to cha",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Mow someone or something down",
    "meaning": "to violently cause someone or something to fall.",
    "example": "The car skidded along the side of the road and mowed down several mailboxes before coming to a stop",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Plough into someone/something",
    "meaning": "to crash into someone or something with force, especially because you are moving or driving too quickly or in a careless or uncontrolled way",
    "example": "On Thursday afternoon, Oukabir and his associates drove a van along Barcelonas crowded Las Ramblas thoroughfare, ploughing into tourists leaving 13 dead and more than 100 injured.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Wearing off",
    "meaning": "lose effectiveness or intensity.",
    "example": "With the impact of the slowdown on the citys residential market wearing off, inventory levels are now gradually decreasing",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Have/take a crack at something",
    "meaning": "to try something",
    "example": "He didn't win the tennis championships, but he plans to have another crack at it next year. I would love to have another crack at the pro game, says Staffordshire's, Sam Kelsall",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Brushed aside",
    "meaning": "to refuse to accept that something is important or true",
    "example": "PCB has announced that it would serve Umar Akmal with a show cause notice even as head coach Mickey Arthur brushed aside the allegations leveled against him by the middle order bat",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Knockout",
    "meaning": "defeat",
    "example": "Conor Mc Gregor believes he will knock out Floyd Mayweather inside two rounds but is ready for all scenarios when the two fighters clash in their eagerly anticipated",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Picked up",
    "meaning": "become better; improve, to come down with",
    "example": "Tests carried out on Thursday morning confirm that the Uruguayan has a distension in the posterior articular capsule in his right knew picked up in the second half of the Clasico i",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Ruled out",
    "meaning": "to prevent, disqualify, overrule, or cancel someone or something",
    "example": "Juventus on Thursday ruled key defender Giorgio Chiellini out of the Champions League final against Barcelona after he suffered a muscle tear in training",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Hit the right note",
    "meaning": "if something you say or do hits the right note, it is suitable and has a good effect",
    "example": "It was an optional session where Dhoni, Kedar Jadhav, Manish Pandey, Shardul Thakur, Yuzvendra Chahal and Jasprit Bumrah looked like hitting the right notes ahead of what will be t",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Fend off",
    "meaning": "To prevent something harmful from happening",
    "example": "The spotlight, though, was on the 36-year-old Dhoni, who now has to fend off questions about his future with alarming regularity.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pale shadow",
    "meaning": "Less impressive or not as good as before or when compared with someone or something similar",
    "example": "Yet, there is no denying that the former skipper has looked a pale shadow of his past glorious self on many occasions, the last of which was in the West Indies recently, when he sc",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Dig in",
    "meaning": "to prepare yourself for a difficult situation",
    "example": "Both sides are digging in for a long and bitter dispute.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To burst the bubble",
    "meaning": "to disabuse someone of a false notion or rationalization that has grown comfortable",
    "example": "Daniel Craig's comments came just hours after he told a radio station; Id hate to burst the bubble, but no decision has been made at the moment",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "On the run",
    "meaning": "trying to avoid being captured",
    "example": "A third woman came forward on Tuesday to accuse Roman Polanski of sexual assault when she was a minor, four decades after he went on the run for raping another girl",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Put on airs",
    "meaning": "Pretend to be better than one is",
    "example": "He didnt have to put on airs. He was the nicest guy.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A bolt out of the blue.",
    "meaning": "a sudden unexpected event",
    "example": "Bill's dropping his life insurance was a bolt from the blue for his wife",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "hard"
  },
  {
    "idiom": "Don't look a gift horse in the mouth",
    "meaning": "dont be ungrateful when you receive a gift",
    "example": "I know the car is not in great condition, but you shouldn't look a gift horse in the mouth.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "Shoots up",
    "meaning": "to increase very quickly in size or amount",
    "example": "Some athletes are suspected of shooting up steroids to improve their strength.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Wrapped up",
    "meaning": "involved with someone or something",
    "example": "She is all wrapped up with her husband and his problems",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Keeps his nerves/ holds his nerves",
    "meaning": "you remain calm and determined in a difficult situation",
    "example": "Justin Thomas keeps his nerve, wins PGA championship",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Has an edge",
    "meaning": "to have an advantage, enjoy a superior or winning position",
    "example": "The new Renault has the edge on other similar models - it's larger and cheaper.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Set down",
    "meaning": "to consider something in a particular way, o write something on a piece of paper so that it will not be forgotten and can be looked at later",
    "example": "Its often a lot of work to set your thoughts down on paper.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "In the pink",
    "meaning": "very healthy",
    "example": "He recovered completely from his surgery and has been in the pink ever since",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pulled up",
    "meaning": "come to a halt. increase the altitude",
    "example": "A van pulled up outside the cottage with six men inside",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To run hot",
    "meaning": "be ahead of ones shcedule",
    "example": "Sundar is running hot in his cricket career",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Roar to life",
    "meaning": "to begin working",
    "example": "He puts his foot on the accelerator and the innings roars to life",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sketched out",
    "meaning": "to give a short description of something, containing few details:",
    "example": "In his shortest Independence Day address yet, Prime Minister Narendra Modi on Tuesday sketched out the broad contours of his idea of a New India as one that was free of communali",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Blacked out",
    "meaning": "to suppress by censorship",
    "example": "The CPI(M) said on Tuesday that Tripura Chief Minister Manik Sarkars Independence Day speech was blacked out by Doordarshan and All India Radio",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Trampling on",
    "meaning": "to crush someone or something underfoot, To tread heavily or destructively on something",
    "example": "The children trampled on the flowers",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Give up",
    "meaning": "to stop doing something that you do regularly",
    "example": "The Union home ministry is set to give up its power to impose the disturbed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Trickle in",
    "meaning": "to come into something or a place, a few at a time",
    "example": "More people trickled in, almost all of them in their sixties and seventies. Bulbul Sen, a retired school teacher and joint secretary of the Samity, said without the governments su",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Ring in",
    "meaning": "(ring in something), to ring bells to celebrate something, especially the new year",
    "example": "Janamastmi was rung in with religious fervor in Maharastra on Tuesday.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "To fan the flames",
    "meaning": "make something more intense; to make a situation worse",
    "example": "The riot fanned the flames of racial hatred even more.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cruise around in something",
    "meaning": "to drive or ride around in something",
    "example": "Would you like to cruise around in a car like that?",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Chips in",
    "meaning": "to add something to someone elses conversation , To contribute to something being undertaken by a group, such as a task or collection",
    "example": "Athisyaraj chips in with a four wicket haul as the side eases past super gillies",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Tighten the screws",
    "meaning": "exert strong pressure on someone.",
    "example": "Washington contained and struck to tighten the screws on the Super Gillies batting and then waded into the attack for the quickest half century in TNPL",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Set the tone",
    "meaning": "to establish a particular mood or character for something",
    "example": "The lanky Wahingtons Blitzkrieg shut out the opposition.To the super gillie's attack, he must have seemed a force of nature.Washington blasted paceman for three successive sixes i",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Shut out",
    "meaning": "to not allow someone to enter a particular place, if you shut something out, you stop yourself from seeing it, hearing it, or thinking about it",
    "example": "The lanky Wahingtons Blitzkrieg shut out the opposition.To the super gillie's attack, he must have seemed a force of nature.Washington blasted paceman for three successive sixes i",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Racked up",
    "meaning": "to get a large number or amount of something",
    "example": "Mr. Trump deleted his retweet on Tuesday after about five minutes, but not before the message sent to his 35 million followers racked up a big response.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A penny for your thoughts",
    "meaning": "A way of asking what someone is thinking",
    "example": "For several minutes they sat silently, then finally she looked at him and said, A penny for your thoughts, Walter'",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To keep ones head above water",
    "meaning": "avoid succumbing to difficulties, typically debt.",
    "example": "The business is in trouble, but we are just about keeping our heads above water.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "A clarion call",
    "meaning": "a strong and clear request for people to do something",
    "example": "In 1942, the clarion call was  Karenge ya marenge  (Do or Die)  today it is  Karenge aur kar ke rahenge  (We will do and accomplish). These five years are about Sankalp se sid",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Against the odds",
    "meaning": "despite many difficulties",
    "example": "Congress president Sonia Gandhis political secretary Ahmed Patel may have won a high-stakes Rajya Sabha battle against great odds, but the mystery about the one extra vote that pr",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pitched against someone",
    "meaning": "to make someone fight or compete against someone else",
    "example": "Mr. Patel received a total of 44 votes to win the prestigious fight that saw him pitched against BJPs Amit Shah, known for his election and political strategies.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Teeming down",
    "meaning": "to rain very heavily",
    "example": "Its been teeming down all day.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Send someone to glory",
    "meaning": "to kill someone, to officiate at the burial services for someone",
    "example": "The preacher sent him to glory amidst the sobs of six or seven former fans.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Tees off",
    "meaning": "to start the first hole in a game of golf, to begin [doing anything]; to be the first one to start something, (to tee someone off )",
    "example": "Jordan Spieth and Rory McIlroy make their bids for golfing history when the 99th PGA Championship tees off Thursday at Quail Hollow with heavy rain and storms forecast.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Claw back",
    "meaning": "to get something again that you had lost such as power, especially gradually and with difficulty",
    "example": "Schwartzman claws back from the brink",
    "exam": ["SSC", "Banking", "UPSC", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Tune up",
    "meaning": "to prepare for something",
    "example": "Croatias Vekic powered to a 6-3, 6-4 victory, to the disappointment of a partisan crowd whose support couldnt lift Bouchard. She was broken six times by Vekic, 21, who is in the ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Shoot off",
    "meaning": "to write and send a message quickly",
    "example": "My daughter will shoot off an e-mail before shell sit down and write a letter.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Crunch up",
    "meaning": "to break someone or something up into piece",
    "example": "Yet he gave an assurance that the huge IT back end that is designed to crunch up to 3 billion invoices a month and calculate companies taxes would be stable, even if there is a la",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A chip off the old block",
    "meaning": "someone who resembles their parent in character or appearance",
    "example": "Meher has a very little patience-a chip off the old block.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "To throw up the sponge/throw in the towel",
    "meaning": "to stop trying to do something because you know that you cannot succeed",
    "example": "Three of the original five candidates have now thrown in the towel.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Cry down",
    "meaning": "to belittle; disparage, to silence by making a greater noise",
    "example": "Men of dissolute lives cry down religion because they would not be under the restraints",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Take on",
    "meaning": "become very upset, fight against someone",
    "example": "After a delay in counting, the Election commission announced the names of the winners, while the fourth candidate Balwantsinh Rajput of the BJP, who resigned as Congress leader to ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Tightrope walk",
    "meaning": "to be in a situation where one must be very cautious.",
    "example": "After a delay in counting, the Election commission announced the names of the winners, while the fourth candidate Balwantsinh Rajput of the BJP, who resigned as Congress leader to ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Passed himself off",
    "meaning": "pretend to be",
    "example": "He passed himself off as a great and rich man",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Ramp up",
    "meaning": "to increase the amount or size of something",
    "example": "The maker of iconic products like the iPhone and the Mac is looking at a multi pronged strategy to ramp up its presence in one of the fastest growing markets in the world.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Scaling up",
    "meaning": "to make something larger in size, amount etc than it used to be",
    "example": "This includes scaling up its manufacturing, developing localized features on its OS, setting up self-owned retail outlets and creating an ecosystem for developers to shift from and",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Narrowing down",
    "meaning": "to reduce the number of possibilities or choices",
    "example": "In this case, for the first time, we were able to identify some key papers and documents. we also spoke to the banks, gathered CCTV footage and collected bank",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Roped in",
    "meaning": "to persuade to take part in some activity or to trick or entice into some activity",
    "example": "Despite the smashing success of the show elsewhere, and actor Kamal Haasan being roped in, there were doubts over whether a show that depends on surveillance and an intrusion on pr",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Notched up",
    "meaning": "to win something, or to achieve something",
    "example": "Jones, who notched up 3631 runs in 52 Tests at",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Held off",
    "meaning": "to stop an opponent from starting to win or lead",
    "example": "In a fantastic race that erupted on the final lap, Kipyegon held off all-comers, including double-hunting Semenya, down the home straight to clock 4min",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Bear the brunt of",
    "meaning": "to receive the worst part of something unpleasant or harmful, such as an attack",
    "example": "Young people are bearing the brunt of unemployment",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Hush up",
    "meaning": "to keep something a secret; to try to stop a rumour from spreading.",
    "example": "Centre attempting to hush up incident , alleges Congress There was some financial scandal involving one of the ministers but it was all hushed up.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "To keep its flock together",
    "meaning": "to gather together in great numbers.",
    "example": "Gujarat MLAs , who were flown to Bengaluru 10 days ago s part of the partys desperate move to keep its flock together amid several defections .returned to Gujarat",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In the dock",
    "meaning": "On trial or under intense scrutiny",
    "example": "The police found itself in the dock after the missing CCTV footage was reported.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Hover over",
    "meaning": "To stay close to someone, ready to advise or interfere",
    "example": "Please don't hover over me while I am working on this file.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Brought up",
    "meaning": "to start discussing a subject",
    "example": "Mr. Sonowal brought up the idea when he called on the president on Saturday.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Call on someone",
    "meaning": "To visit someone briefly",
    "example": "Mr. Sonowal brought up the idea when he called on the president on Saturday",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Beat someone down",
    "meaning": "To defeat or demoralize someone",
    "example": "Pain and exhaustion finally beat him down near the end of the run.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep/ have your tail up",
    "meaning": "If someone has their tail up, they are optimistic and expect to be successful.",
    "example": "The Indian team keeps their tail up for the upcoming match",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Boxed into a corner",
    "meaning": "Trapped in a situation with very few favourable options",
    "example": "The captain found himself boxed into a corner after the early wickets fell.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Map out",
    "meaning": ": to decide in detail how something will be done",
    "example": "He was plagued by Gstro-intestinal infections and contracted viral fever but has run",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "whisked away",
    "meaning": "To escort, conduct, or carry someone or something swiftly and quietly away",
    "example": "The bodyguards whisked away the politician after the speech.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "spot on",
    "meaning": "Exactly right; perfectly accurate",
    "example": "Drag flick specialist Diwakar Ram, who had put up a sterling show throughout the tournament was spot on in the final too",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "play / cry / sing hearts out",
    "meaning": "to do something with vigour or intensity.",
    "example": "both teams played their hearts out in an entertaining contest",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "4: with tail between legs",
    "meaning": "Appearing frightened or cowardly",
    "example": "The frightened dog ran away with its tail between its legs when the bigger dog growled.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "in the thick of things",
    "meaning": "to be very involved at the busiest or most active stage of a situation or activity",
    "example": "A fierce debate ensued and he found himself in the thick of it.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Taste of your own medicine",
    "meaning": "you do something bad to someone that they have done to you to teach them a lesson.",
    "example": "John, who is often rude and abrupt with people, was devastated when the teacher treated him rudely. He doesn't like having a dose of his own medicine.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A fair crack of the whip",
    "meaning": "an equal chance to do something",
    "example": "In India all the students should be given a fair crack of the whip.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "cutting loose",
    "meaning": "to behave in an uncontrolled, wild way",
    "example": "Don't be too hard on them - they're just kids and they need to cut loose sometimes.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Wiped out",
    "meaning": "to kill someone , a decisive defeat , to clean completely by wiping:",
    "example": "Malawi on Thursday celebrated successful conclusion of a two year project moving 520 sedated elephants by truck to a reserve where the animals had been nearly wiped out They wiped ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Calls off",
    "meaning": "to decide that something will not happen , cancel",
    "example": "The federation called off its strike after appeals from the producers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "boss someone around",
    "meaning": "To tell one what to do",
    "example": "Stop bossing me around. I'm not your employee. Captain Smith bosses around the whole crew. That's his job",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Run up",
    "meaning": "to raise or hoist something, such as a flag , to cause something to go higher, such as the price of stocks or commodities",
    "example": "In the run up to the GST rollout, traders expected many challenges.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "To live in clover",
    "meaning": "Meaning : having good fortune; in a very good situation, especially financially",
    "example": "If I get this contract, I'll be in clover for the rest of my life.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "to be in two minds",
    "meaning": "Meaning : to be unable to decide about something:",
    "example": "Im in two minds about accepting the job",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "to talk shop",
    "meaning": "to talk about work when not working",
    "example": "Two New York Yankee pitchers will be there to sign autographs and talk shop with fans.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "to make the grade",
    "meaning": "to be satisfactory; to be what is expected.",
    "example": "He wanted to get into medical school but he failed to make the grade.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "picking holes",
    "meaning": "to find mistakes in something someone has done or said, to show that it is not good or not correct",
    "example": "He is always picking holes in every project",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "with tail between legs",
    "meaning": "Appearing frightened or cowardly",
    "example": "The frightened dog ran away with its tail between its legs when the bigger dog growled.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Buck the odds",
    "meaning": "To buck the odds means to go against the odds. Despite the odds not being in your favour, you still won.",
    "example": "Given the manner she has been bucking the odds, nothing seems impossible for the brave Jyotika far far away from the glitz-laden metros.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Break through",
    "meaning": "If you break through, you achieve success even though there are difficulties and obstacles.",
    "example": "Indeed , the shy Jyothika has a heart larger than her small frame.Given her background and modest means, she has been breaking through barriers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Zero in on",
    "meaning": "to direct all your attention to one thing , If you zero in a weapon, you aim it directly at something you want to hit:",
    "example": "This was not the first time . he had come to meet his wife on two occasions earlier, and he followed the same pattern and time .It was easy for the police to zero in on him. Said",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Holed up",
    "meaning": "to take shelter somewhere , to hide somewhere.",
    "example": "Soldiers seen at the house at Hakripora in Pluwara district ,where the militants were holed up, on Tuesday. The robbers were holed up in a deserted warehouse.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Live something down",
    "meaning": "to make people forget that you made a big mistake or did something very embarrassing in the past:",
    "example": "Having mishandled NEET is one failure that the Tamilnadu government will struggle to live down",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Music to the ears",
    "meaning": "a welcome sound to someone; news that someone is pleased to hear",
    "example": "The winter session of 2016 hit a low point of 16%.It is shameful.Taxation bills, as significant as Aadhaar , were passed within two weeks without being referred toa commitmee he s",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Lavish something on someone",
    "meaning": "to give someone a lot, or too much, of something such as money, presents, or attention:",
    "example": "MR.Trump lavished praise on Gen.Kelly after he was sworn in , but that may not necessarily guarantee anything in the long term.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "Wound up",
    "meaning": "brought to a state of great tension",
    "example": "A former India captain ,who served the squad as its team director just a year bach , Shastri steps into the shoes of Anil kumble , whose manner of exit showed the BCCI and Skipper ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Step into someones shoes",
    "meaning": "to take on a particular role or task that someone else has been doing",
    "example": "A former India captain ,who served the squad as its team director just a year bach , Shastri steps into the shoes of Anil kumble , whose manner of exit showed the BCCI and Skipper ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Served up",
    "meaning": "to offer something",
    "example": "Serena Williams served up a rallying cry for equal pay for black women , decrying that they would have to work on average eight months longer to earn the same",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Chip on ones shoulder",
    "meaning": "an angry attitude from someone who feels unfairly treated:",
    "example": "Shes not going to make any friends if she walks around with a chip on her shoulder like that.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Steal The Show",
    "meaning": "attracts the most attention and praise.",
    "example": "Falcons TTCS Wu Yang, who stole the show on the final night of the inaugural Ultimate Table tennis league on Sunday, walked away with the biggest individual purse of Rs.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Walk All Over Someone",
    "meaning": "to treat someone badly by always making them do what you want them to do",
    "example": "If you don't want to work at the weekend, say so - don't let the boss walk all over you.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make The Cut",
    "meaning": "To survive an elimination when a team or group is being chosen",
    "example": "By his own admission, Jeev Mikha Singh has not had a great 2017, h e has made the cut only four times from 13 appearances on the Asian and European Tours, his best finish a tied 22",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Bring / Ring The Curtain Down",
    "meaning": "to bring something to an end; to declare something to be at an end",
    "example": "Caeleb Dressel brought the curtain down on the World championships with a historic seventh medal here on Sunday, equaling the record of swim legend Michael Phelps.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Make A Splash",
    "meaning": "to get a lot of public attention",
    "example": "Now she's made a splash in the American television show 'Civil Wars'.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Spruced Up",
    "meaning": "To make someone or something neat and smart in appearance",
    "example": "The Karnataka Golf Association has undergone much work to be ready for this weeks TAKE SOLUTIONS MASTERS, the first Asian Tour event at the venue since the Indian open in",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Shunted Out",
    "meaning": "to move (someone or something) to a different and usually less important or noticeable place or position.",
    "example": "Daniel Ricciardo blasted Red Bull teammate Max Verstappen for amateur diving on Sunday after the Dutch teenager shunted him out of the Hungarian GP on the opening lap.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Taking Its Toll",
    "meaning": "to cause harm or suffering",
    "example": "A little more than a year after the alleged Russian effort to interfere in the US. Presidential election came to light, the diplomatic fallout an unravelling of the relationship b",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Mended His Ways",
    "meaning": "to improve your behaviour after you have been behaving badly for a long time",
    "example": ": Appearing before a Bench led by Justice Dipak Mishra, Attorney General K.K.Venugopal highlighted that Mr.khan had not mended his ways even after rendering an apology to the supre",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Back to drawing board",
    "meaning": "Revising something (such as a plan) from the beginning, typically after it has failed",
    "example": "Having triggered an avalanche of litigation across the country, the prevention of Cruelty to animal (regulation of livestock market) rules of 2017, which ban the sale of cattle in ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Lash out",
    "meaning": "to suddenly attack someone or something physically or criticize him, her, or it in an angry way",
    "example": "After the incident, Mr.Gandhi lashed out on twitter at the BJP govt. in the state and at the centre, saying he would not be deterred by stones or black flags.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "easy"
  },
  {
    "idiom": "Ratcheting up",
    "meaning": "To cause something to increase in increments",
    "example": "Ratcheting up the political temperature, TTV Dhinakaran, deputy general secretary of the All India Anna Dravida Munnetra Kazhagam (amma), announced his plan to tour the state and a",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Hunt down",
    "meaning": "to try to find a particular thing or person",
    "example": "The summer postcard campaign by the European policy agency, Europol , was unveiled on Friday on its EU most wanted website as part of its ongoing initiative to hunt down Europes m",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Hang up",
    "meaning": "To disconnect a phone call, o give up on someone or something; to quit dealing with someone or something.",
    "example": "Usain Bolt insists he will hang up his running spike after the world championships in London.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "stack up (against something)",
    "meaning": "to compare with something else , To make sense; add up",
    "example": "We wondered how London restaurants stacked up against Atlanta's. The story he gave the police was full of contradictionsit just didn't stack up.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Raise the bar",
    "meaning": "to make a task a little more difficult, To raise the standards of quality that are expected of or required for something",
    "example": "Now free and confident Anna after winning maiden Asian 400 m gold at Bhubaneshwar, Ana could raise the bar in London",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Playing second fiddle to someone",
    "meaning": "To play a supporting or minor role in relation to someone else",
    "example": "He also denied that he had tired out of playing second fiddle to Lionel Messi at",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Miss the cut",
    "meaning": "(golf)to achieve a greater score after the first two rounds of a strokeplay tournament than that required to play in the remaining two rounds",
    "example": "He arrives here after having missed the cut at the Irish and scottish opens , but then he was in similarly wretched form before the secured the Indian open in March",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Rule out",
    "meaning": "to stop considering something as a possibility",
    "example": "Mr.Tillerson did not rule out a military strike against North Korea in remarks that were overall not strident at the state department",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cut to the size",
    "meaning": "to make someone or something less important or detailed",
    "example": "Has Digvijaya Singh been cut to size?",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Scrape through",
    "meaning": "to move through something, scraping or rubbing the sides, to get by something just barely; to pass a test just barely.",
    "example": "The car, going at a very high speed, scraped through the tunnel. It just managed to scrape through Alice passed the test, but she just scraped through it. I just scraped through my",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "knock on the door of",
    "meaning": "to be very close to achieving",
    "example": "The Income  tax raids on the premises of Energy Minister D.K.Shivakumar and his close aides have sent shock waves among leaders of the ruling congress in Karnataka, with apprehens",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Pulled out",
    "meaning": "withdraw from an undertaking.",
    "example": ": While the Jaiprakash Associates led consortium, including IBM and Israels tower semiconductor, had pulled out in March last year, things were not moving ahead for the consortium",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "On a knifes edge",
    "meaning": "if a person or organization is on a knife-edge, they are in a difficult situation and are worried about what will happen in the future",
    "example": "She's been living on a knife-edge since her ex-husband was released from prison last month. The theatre is on a financial knife-edge and must sell 75% of its seats every night to s",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hinged on",
    "meaning": "to depend on someone or something; to depend on what someone or something does",
    "example": "The Monetary Policy Committees majority decision hinged on the observation that some upside risks to inflation have either reduced or not materialized ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Roll out",
    "meaning": "to offer a new product or service to the public",
    "example": "Driving down Indias national highways could be a much safer experience by the end of this year, with the National Highways Authority of India (NHAI) set to roll out an incident m",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Shot back",
    "meaning": "Return quickly",
    "example": "The Congress shot back with Mr. Gandhi suggesting that the Chief Minister should resign for the controversial deaths of the children in the hospital.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Slipped back",
    "meaning": "to move quietly and cautiously back to someone or something",
    "example": "Lieutenant Governor (L-G) Kiran Bedi on Friday slipped back into her erstwhile role of a cop by riding pillion with her staff on a midnight motorbike inspection of the",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Under fire",
    "meaning": "being criticized",
    "example": "Under fire for the deaths of more than 100 children in the BRD Medical College hospital, Mr. Adityanath launched a week-long cleanliness drive in UP  Swachh Uttar Pradesh, Swaasth",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Fired up",
    "meaning": "to motivate someone; to make someone enthusiastic",
    "example": "I was so fired up with a nationalistic fervour that I whipped out my smartphone and took a video of myself taking the Sankalp se Siddhi (achievement through resolve) pledge.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Whipped out",
    "meaning": "To make or produce something quickly",
    "example": "I was so fired up with a nationalistic fervour that I whipped out my smartphone and took a video of myself taking the Sankalp se Siddhi (achievement through resolve) pledge.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Showed up",
    "meaning": "To cause or allow to be seen; display",
    "example": "The inexperience of two young Gujarat players Udit Kamdar and Fenil Shah showed up at inopportune times and allowed the Grandmaster duo of Swapnil Dhopade and Himanshu Sharma escap",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Lays down",
    "meaning": "to state officially what someone must do or how they must do it, to give up, establish",
    "example": "The EU has laid down tough standards for water quality",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Tumbled out",
    "meaning": "to fall, topple, or drop out of something, arise",
    "example": "Akash Saharan tumbled out first in the trap final in the Junior shotgun World Cup here on Friday.He qualified for the final with the score of 114",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Wriggle out",
    "meaning": "to free oneself from something by turning or twisting the body with sinuous writhing motions",
    "example": "With 13 points, Chaudhari was the best raider in action and his ability to wriggle out of tough situations played a big role in his teams victory",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Squares off",
    "meaning": "to get ready for an argument or a fight",
    "example": "The Tests clinched without much of a strain, India will begin the journey to identify the core of its 2019 World Cup squad when it squares off against a low-on- confidence Sri Lank",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Peg back",
    "meaning": "to prevent an opponent from winning in a game or competition",
    "example": "The underdogs were pegged back by United after that had taken a shock lead.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Blessing in disguise",
    "meaning": "an apparent misfortune that eventually has good results.",
    "example": "Losing that job was a blessing in disguise really.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Draw level",
    "meaning": "to move into a position where you are equal to someone else in a race, game, or competition",
    "example": "Bronze in the 400m proved to be a bittersweet consolation for US track legend Allyson Felix as she drew level with Jamaicans Merlene Ottey and Usain Bolt on having won 14 World Cha",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Stroll through",
    "meaning": "to walk casually through something or some place",
    "example": "Federer, Nadal stroll through Let's stroll through a few shops and see what the prices are like here.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Crashed through",
    "meaning": "to break through something forcefully.",
    "example": "Felix crashed through into bronze in Wednesdays 400m after Bahamas rival and race leader Shaunae Miller-Uibo faltered 20 metres from the finish line.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Edge out",
    "meaning": "to beat someone in something such as a competition or election by a small amount",
    "example": "Earlier , Jaipur Pink Panthers edged out Puneri Paltan( pune)",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Drew first blood",
    "meaning": "the initial advantage gained by one side in any game, contest or competition.",
    "example": "Tamil Thalaivas drew first blood in the first minute as Prapanjan scored with a raid point",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Wash out",
    "meaning": "to fail and be removed from something such as school, to rain on or flood an event so that it must be cancelled",
    "example": "I studied all I could, but I still washed out.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Rip up",
    "meaning": "to tear something into small pieces, o decide that something such as a plan or an agreement is useless and stop using it",
    "example": "Felixs unheralded team-mate Phyllis Francis ripped up the form book to claim a shock gold, with Bahrains Salwa Eid Naser taking silver",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Fit (or fill) the bill",
    "meaning": "be suitable for a particular purpose.",
    "example": "It is never easy to step into the shoes of a genuine all-rounder like Kapil or exude the multi-faceted dimensions that were intrinsic to Dhoni but Kohli & Co. are hoping that Pandy",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hold off",
    "meaning": "to not do something immediately",
    "example": "The 21-year-old former multi-eventer demonstrated all the strength he has acquired from competing as an all-rounder as he led from the first hurdle and was powerful enough to hold ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Step into someone's shoes",
    "meaning": "Take someone's place",
    "example": "It is never easy to step into the shoes of a genuine all-rounder like Kapil or exude the multi-faceted dimensions that were intrinsic to Dhoni but Kohli & Co. are hoping that Pandy",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To pigeon hole",
    "meaning": "to decide that someone or something belongs to a particular type or group, especially without knowing much about them",
    "example": "Pandya is in an unenviable position, his role is one into which previous managements tried to pigeon-hole Ajit Agarkar, Irfan Pathan and more recently Stuart Binny",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Dished out",
    "meaning": "to give something too freely and in large amounts, to give out trouble, scoldings, criticism",
    "example": "The 23-year old from Gujarat, a certainty in Indias limited-over squads, secured a berth in Tests during the current tour of Sri Lanka. At Galle and in Colombo, Pandya dished out ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Bits and pieces",
    "meaning": "small things of different types",
    "example": "These are early days still but the numbers hint that Pandya could be more than a bits-and-pieces player, a species prevalent among Kapils men who won the 1983 World Cup. To top it",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Saw off",
    "meaning": "deadlock or stalemate, a compromise",
    "example": "Anand accepted the offer, saw off the offensive and then pushed a queenside pawn to the seventh rank.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "On the hunt",
    "meaning": "searching",
    "example": "The police are still on the hunt for the escaped convicts",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Tick all the boxes",
    "meaning": "To satisfy or fulfill everything that is necessary or desired.",
    "example": "Virat Kohlis men have ticked most of the boxes, be it runs or wickets, with the lone worry being a few butter-fingers in the close-in cordon.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Burn your fingers",
    "meaning": "to have a bad experience when something such as a relationship or a business deal goes wrong",
    "example": "Many investors burned their fingers on those stocks.",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Jump the gun",
    "meaning": "act before the proper or appropriate time.",
    "example": "We all had to start the race again because Jane jumped the gun",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Cast away",
    "meaning": "wrecked",
    "example": "The boat was cast away by the storm",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Worked up",
    "meaning": "excited",
    "example": "He got worked up just by the mention of her name",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To go at each other hammer and tongs",
    "meaning": "To do something or perform some task with tremendous fervor, determination, energy, or forcefulness. , to do something, especially to argue, with a lot of energy or violence",
    "example": "What started as a minor disagreement has escalated into a heated argument, and the two have been going at it hammer and tongs ever since",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "hard"
  },
  {
    "idiom": "To hold a brief for",
    "meaning": "be retained as counsel for , to argue for",
    "example": "Often counsel holding a brief for another does not read it in the confident expectation that the case would be postponed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "A mares nest",
    "meaning": "a complex or confused situation; a muddle , an illusory discovery.",
    "example": "The involvement of teachers in the scheme of education proves to be a mares nest",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Lay by",
    "meaning": "save for future needs",
    "example": "We should be wise and lay by a considerable amount",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Make out",
    "meaning": "prove , discover , decipher",
    "example": "I cannot make out the Meaning: of this word",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Off the hook",
    "meaning": "no longer in difficulty or trouble",
    "example": "Pinarayi vijaiyan off the hook in SNC- lavalin case(a Canadian company)",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Come down hard on",
    "meaning": "To criticize or punish severely",
    "example": "They're coming down heavily on people for not paying their licence fees.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  }
];
window.idiomsDB = idiomsDB;
