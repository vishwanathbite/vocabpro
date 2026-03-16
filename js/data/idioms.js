/**
 * VocabPro - Idioms & Phrases Database
 * 1116 common idioms and phrases for competitive exams
 * Each entry: idiom, meaning, example, exam relevance, category
 */
const idiomsDB = [
  {
    "idiom": "Sweeping Statement",
    "meaning": "Thoughtless statement",
    "example": "The situation reminded everyone of the idiom 'sweeping statement'.",
    "usage": "Used to express: thoughtless statement",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "All At Sea",
    "meaning": "Puzzled",
    "example": "The situation reminded everyone of the idiom 'all at sea'.",
    "usage": "Used to express: puzzled",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Enough Rope",
    "meaning": "Enough freedom for action",
    "example": "The situation reminded everyone of the idiom 'enough rope'.",
    "usage": "Used to express: enough freedom for action",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "By Fits And Start",
    "meaning": "Irregularly",
    "example": "The situation reminded everyone of the idiom 'by fits and start'.",
    "usage": "Used to express: irregularly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Fell Foul Of",
    "meaning": "Got into trouble with",
    "example": "The situation reminded everyone of the idiom 'fell foul of'.",
    "usage": "Used to express: got into trouble with",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Token Strike",
    "meaning": "Short strike held as warning",
    "example": "The situation reminded everyone of the idiom 'token strike'.",
    "usage": "Used to express: short strike held as warning",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Face The Music",
    "meaning": "Get reprimanded",
    "example": "The situation reminded everyone of the idiom 'face the music'.",
    "usage": "Used to express: get reprimanded",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Look Down Upon",
    "meaning": "Hate intensely",
    "example": "The situation reminded everyone of the idiom 'look down upon'.",
    "usage": "Used to express: hate intensely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Flogging A Dead Horse",
    "meaning": "Wasting time in useless effort",
    "example": "The situation reminded everyone of the idiom 'flogging a dead horse'.",
    "usage": "Used to express: wasting time in useless effort",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Under A Cloud",
    "meaning": "Under suspicion",
    "example": "The situation reminded everyone of the idiom 'under a cloud'.",
    "usage": "Used to express: under suspicion",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Played Havoc",
    "meaning": "Caused destruction",
    "example": "The situation reminded everyone of the idiom 'played havoc'.",
    "usage": "Used to express: caused destruction",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "No Love Lost Between",
    "meaning": "Not on good terms",
    "example": "The situation reminded everyone of the idiom 'no love lost between'.",
    "usage": "Used to express: not on good terms",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Fair And Square",
    "meaning": "Honest",
    "example": "The situation reminded everyone of the idiom 'fair and square'.",
    "usage": "Used to express: honest",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A White Elephant",
    "meaning": "Costly or troublesome possession",
    "example": "The situation reminded everyone of the idiom 'a white elephant'.",
    "usage": "Used to express: costly or troublesome possession",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Out And Out",
    "meaning": "Totally",
    "example": "The situation reminded everyone of the idiom 'out and out'.",
    "usage": "Used to express: totally",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Cuff",
    "meaning": "On credit",
    "example": "The situation reminded everyone of the idiom 'on the cuff'.",
    "usage": "Used to express: on credit",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Does Not Hold Water",
    "meaning": "Cannot be believed",
    "example": "The situation reminded everyone of the idiom 'does not hold water'.",
    "usage": "Used to express: cannot be believed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "A Wild Goose Chase",
    "meaning": "Futile search",
    "example": "The situation reminded everyone of the idiom 'a wild goose chase'.",
    "usage": "Used to express: futile search",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "In A Tight Corner",
    "meaning": "In a difficult situation",
    "example": "The situation reminded everyone of the idiom 'in a tight corner'.",
    "usage": "Used to express: in a difficult situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Green Thumb",
    "meaning": "To have a natural interest",
    "example": "The situation reminded everyone of the idiom 'green thumb'.",
    "usage": "Used to express: to have a natural interest",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Going Places",
    "meaning": "Talented and successful",
    "example": "The situation reminded everyone of the idiom 'going places'.",
    "usage": "Used to express: talented and successful",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "In Cold Blood",
    "meaning": "A murder done with intention",
    "example": "The situation reminded everyone of the idiom 'in cold blood'.",
    "usage": "Used to express: a murder done with intention",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Off And On",
    "meaning": "Occasionally",
    "example": "The situation reminded everyone of the idiom 'off and on'.",
    "usage": "Used to express: occasionally",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hard And Fast",
    "meaning": "Strict",
    "example": "The situation reminded everyone of the idiom 'hard and fast'.",
    "usage": "Used to express: strict",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Took To Heels",
    "meaning": "Run away in fear",
    "example": "The situation reminded everyone of the idiom 'took to heels'.",
    "usage": "Used to express: run away in fear",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep Up",
    "meaning": "To keep in touch",
    "example": "The situation reminded everyone of the idiom 'to keep up'.",
    "usage": "Used to express: to keep in touch",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make A Clean Breast",
    "meaning": "Confess without reserve",
    "example": "The situation reminded everyone of the idiom 'make a clean breast'.",
    "usage": "Used to express: confess without reserve",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Heads Will Roll",
    "meaning": "Transfers will take place",
    "example": "The situation reminded everyone of the idiom 'heads will roll'.",
    "usage": "Used to express: transfers will take place",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Make No Bones About",
    "meaning": "Do not have any hesitation in",
    "example": "The situation reminded everyone of the idiom 'make no bones about'.",
    "usage": "Used to express: do not have any hesitation in",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Take After",
    "meaning": "Resembles",
    "example": "The situation reminded everyone of the idiom 'take after'.",
    "usage": "Used to express: resembles",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Stave Off",
    "meaning": "Postpone",
    "example": "The situation reminded everyone of the idiom 'to stave off'.",
    "usage": "Used to express: postpone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Give A Piece Of Mind",
    "meaning": "To reprimand",
    "example": "The situation reminded everyone of the idiom 'to give a piece of mind'.",
    "usage": "Used to express: to reprimand",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Rest On Laurels",
    "meaning": "To be complacent",
    "example": "The situation reminded everyone of the idiom 'rest on laurels'.",
    "usage": "Used to express: to be complacent",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pay Through Nose",
    "meaning": "Pay an extremely high price",
    "example": "The situation reminded everyone of the idiom 'pay through nose'.",
    "usage": "Used to express: pay an extremely high price",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Draw On Fancy",
    "meaning": "Use imagination",
    "example": "The situation reminded everyone of the idiom 'draw on fancy'.",
    "usage": "Used to express: use imagination",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn An Honest Living",
    "meaning": "Make an legitimate living",
    "example": "The situation reminded everyone of the idiom 'turn an honest living'.",
    "usage": "Used to express: make an legitimate living",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Give The Game Away",
    "meaning": "Give out the secret",
    "example": "The situation reminded everyone of the idiom 'give the game away'.",
    "usage": "Used to express: give out the secret",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Cheek By Jowl",
    "meaning": "Very near",
    "example": "The situation reminded everyone of the idiom 'cheek by jowl'.",
    "usage": "Used to express: very near",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Give In",
    "meaning": "Yield",
    "example": "The situation reminded everyone of the idiom 'give in'.",
    "usage": "Used to express: yield",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Run Riot",
    "meaning": "Act without restraint",
    "example": "The situation reminded everyone of the idiom 'run riot'.",
    "usage": "Used to express: act without restraint",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Go Through Fire And Water",
    "meaning": "Undergo any risk",
    "example": "The situation reminded everyone of the idiom 'go through fire and water'.",
    "usage": "Used to express: undergo any risk",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Talking Through Hat",
    "meaning": "Talking nonsense",
    "example": "The situation reminded everyone of the idiom 'talking through hat'.",
    "usage": "Used to express: talking nonsense",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Put Up With",
    "meaning": "Tolerate",
    "example": "The situation reminded everyone of the idiom 'put up with'.",
    "usage": "Used to express: tolerate",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "By Fits And Starts",
    "meaning": "Irregularly",
    "example": "The situation reminded everyone of the idiom 'by fits and starts'.",
    "usage": "Used to express: irregularly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Reading Between The Lines",
    "meaning": "Understanding the hidden",
    "example": "The situation reminded everyone of the idiom 'reading between the lines'.",
    "usage": "Used to express: understanding the hidden",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get The Sack",
    "meaning": "Dismissed from",
    "example": "The situation reminded everyone of the idiom 'get the sack'.",
    "usage": "Used to express: dismissed from",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pros And Cons",
    "meaning": "Considering all the facts",
    "example": "The situation reminded everyone of the idiom 'pros and cons'.",
    "usage": "Used to express: considering all the facts",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By Leaps And Bounds",
    "meaning": "Very Quickly",
    "example": "The situation reminded everyone of the idiom 'by leaps and bounds'.",
    "usage": "Used to express: very quickly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "In The Good Books",
    "meaning": "In favour with boss",
    "example": "The situation reminded everyone of the idiom 'in the good books'.",
    "usage": "Used to express: in favour with boss",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Long Run",
    "meaning": "Ultimately",
    "example": "The situation reminded everyone of the idiom 'in the long run'.",
    "usage": "Used to express: ultimately",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn A Deaf Ear",
    "meaning": "Disregard / Ignore / Refuse",
    "example": "The situation reminded everyone of the idiom 'turn a deaf ear'.",
    "usage": "Used to express: disregard / ignore / refuse",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Fight Tooth And",
    "meaning": "NAIL",
    "example": "The situation reminded everyone of the idiom 'to fight tooth and'.",
    "usage": "Used to express: nail",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "The Green-Eyed",
    "meaning": "Used as a way of talking about",
    "example": "The situation reminded everyone of the idiom 'the green-eyed'.",
    "usage": "Used to express: used as a way of talking about",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Set The Record",
    "meaning": "STRAIGHT",
    "example": "The situation reminded everyone of the idiom 'set the record'.",
    "usage": "Used to express: straight",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Good Samaritan",
    "meaning": "Helpful person",
    "example": "The situation reminded everyone of the idiom 'good samaritan'.",
    "usage": "Used to express: helpful person",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Bad Blood",
    "meaning": "Angry feeling",
    "example": "The situation reminded everyone of the idiom 'bad blood'.",
    "usage": "Used to express: angry feeling",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Go To The Whole Hog",
    "meaning": "To do it completely",
    "example": "The situation reminded everyone of the idiom 'to go to the whole hog'.",
    "usage": "Used to express: to do it completely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Lay Out",
    "meaning": "Spend",
    "example": "The situation reminded everyone of the idiom 'lay out'.",
    "usage": "Used to express: spend",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Laying Off",
    "meaning": "Dismissal from jobs",
    "example": "The situation reminded everyone of the idiom 'laying off'.",
    "usage": "Used to express: dismissal from jobs",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Spilling The Beans",
    "meaning": "Revealing the information indiscreetly",
    "example": "The situation reminded everyone of the idiom 'spilling the beans'.",
    "usage": "Used to express: revealing the information indiscreetly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Carry Out",
    "meaning": "Execute",
    "example": "The situation reminded everyone of the idiom 'carry out'.",
    "usage": "Used to express: execute",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Went To The Winds",
    "meaning": "Dissipated/ To be utterly lost",
    "example": "The situation reminded everyone of the idiom 'went to the winds'.",
    "usage": "Used to express: dissipated/ to be utterly lost",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Ins And Outs",
    "meaning": "Full details",
    "example": "The situation reminded everyone of the idiom 'ins and outs'.",
    "usage": "Used to express: full details",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Fed Up",
    "meaning": "Annoyed",
    "example": "The situation reminded everyone of the idiom 'fed up'.",
    "usage": "Used to express: annoyed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Sharp Practices",
    "meaning": "Dishonest means",
    "example": "The situation reminded everyone of the idiom 'sharp practices'.",
    "usage": "Used to express: dishonest means",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "In High Spirits",
    "meaning": "Full of hope and enthusiasm",
    "example": "The situation reminded everyone of the idiom 'in high spirits'.",
    "usage": "Used to express: full of hope and enthusiasm",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Shake In Shoes",
    "meaning": "Tremble with fear",
    "example": "The situation reminded everyone of the idiom 'shake in shoes'.",
    "usage": "Used to express: tremble with fear",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Fits And Starts",
    "meaning": "Not regularly",
    "example": "The situation reminded everyone of the idiom 'fits and starts'.",
    "usage": "Used to express: not regularly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Close Shave",
    "meaning": "Narrow escape",
    "example": "The situation reminded everyone of the idiom 'close shave'.",
    "usage": "Used to express: narrow escape",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Take With A Grain Of",
    "meaning": "SALT",
    "example": "The situation reminded everyone of the idiom 'take with a grain of'.",
    "usage": "Used to express: salt",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Eat A Humble Pie",
    "meaning": "To apologize",
    "example": "The situation reminded everyone of the idiom 'to eat a humble pie'.",
    "usage": "Used to express: to apologize",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Give The Devil His Due",
    "meaning": "To give encouragement even to",
    "example": "The situation reminded everyone of the idiom 'to give the devil his due'.",
    "usage": "Used to express: to give encouragement even to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "hard"
  },
  {
    "idiom": "Reading Between The",
    "meaning": "LINES",
    "example": "The situation reminded everyone of the idiom 'reading between the'.",
    "usage": "Used to express: lines",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "An Open Book",
    "meaning": "One that hold no secrets",
    "example": "The situation reminded everyone of the idiom 'an open book'.",
    "usage": "Used to express: one that hold no secrets",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "An Axe To Grind",
    "meaning": "A private interest to serve",
    "example": "The situation reminded everyone of the idiom 'an axe to grind'.",
    "usage": "Used to express: a private interest to serve",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Stand-Offish",
    "meaning": "Indifferent",
    "example": "The situation reminded everyone of the idiom 'stand-offish'.",
    "usage": "Used to express: indifferent",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Sowing Wild Oats",
    "meaning": "Irresponsible pleasure seeking",
    "example": "The situation reminded everyone of the idiom 'sowing wild oats'.",
    "usage": "Used to express: irresponsible pleasure seeking",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Of No Avail",
    "meaning": "Useless",
    "example": "The situation reminded everyone of the idiom 'of no avail'.",
    "usage": "Used to express: useless",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Bolt From The Blue",
    "meaning": "Something unexpected and",
    "example": "The situation reminded everyone of the idiom 'a bolt from the blue'.",
    "usage": "Used to express: something unexpected and",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Verge Of",
    "meaning": "On the brink of",
    "example": "The situation reminded everyone of the idiom 'on the verge of'.",
    "usage": "Used to express: on the brink of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Sore Point",
    "meaning": "Something which hurts",
    "example": "The situation reminded everyone of the idiom 'a sore point'.",
    "usage": "Used to express: something which hurts",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Rise Like A Phoenix",
    "meaning": "FROM THE ASHES",
    "example": "The situation reminded everyone of the idiom 'rise like a phoenix'.",
    "usage": "Used to express: from the ashes",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep Under Wraps",
    "meaning": "Secret",
    "example": "The situation reminded everyone of the idiom 'to keep under wraps'.",
    "usage": "Used to express: secret",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Fair- Weather Friend",
    "meaning": "A friend that deserts in",
    "example": "The situation reminded everyone of the idiom 'fair- weather friend'.",
    "usage": "Used to express: a friend that deserts in",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Emerge Out Of Thin Air",
    "meaning": "Appear Suddenly",
    "example": "The situation reminded everyone of the idiom 'emerge out of thin air'.",
    "usage": "Used to express: appear suddenly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cut No Ice",
    "meaning": "Have no influence",
    "example": "The situation reminded everyone of the idiom 'cut no ice'.",
    "usage": "Used to express: have no influence",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Bring To Light",
    "meaning": "Introduce for discussion",
    "example": "The situation reminded everyone of the idiom 'bring to light'.",
    "usage": "Used to express: introduce for discussion",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cannot Hold A Candle",
    "meaning": "TO",
    "example": "The situation reminded everyone of the idiom 'cannot hold a candle'.",
    "usage": "Used to express: to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take Into Account",
    "meaning": "To consider",
    "example": "The situation reminded everyone of the idiom 'to take into account'.",
    "usage": "Used to express: to consider",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Blow Over",
    "meaning": "Pass off",
    "example": "The situation reminded everyone of the idiom 'blow over'.",
    "usage": "Used to express: pass off",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Run Into",
    "meaning": "Incurred / To experience",
    "example": "Fourth seed Sindhu could face Hong Kongs Ngan Yi Cheung, seeded 13, for a place in the quarterfinals where she could run into fifth seed Sun Yu.",
    "usage": "Used to express: incurred / to experience",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Blue-Eyed Boys",
    "meaning": "Favorites",
    "example": "The situation reminded everyone of the idiom 'blue-eyed boys'.",
    "usage": "Used to express: favorites",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Dropping Names",
    "meaning": "Hinting at high connections/ To",
    "example": "The situation reminded everyone of the idiom 'dropping names'.",
    "usage": "Used to express: hinting at high connections/ to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Red Letter Day",
    "meaning": "An important day",
    "example": "The situation reminded everyone of the idiom 'a red letter day'.",
    "usage": "Used to express: an important day",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Bone To Pick",
    "meaning": "Cause of quarrel/ Bone of",
    "example": "The situation reminded everyone of the idiom 'bone to pick'.",
    "usage": "Used to express: cause of quarrel/ bone of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Struck A Chill To The",
    "meaning": "HEART",
    "example": "The situation reminded everyone of the idiom 'struck a chill to the'.",
    "usage": "Used to express: heart",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "End In A Fiasco",
    "meaning": "A total or utter failure",
    "example": "The situation reminded everyone of the idiom 'end in a fiasco'.",
    "usage": "Used to express: a total or utter failure",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Fall Back",
    "meaning": "To turn or move back",
    "example": "The situation reminded everyone of the idiom 'fall back'.",
    "usage": "Used to express: to turn or move back",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "High And Dry",
    "meaning": "Neglected / To leave someone",
    "example": "The situation reminded everyone of the idiom 'high and dry'.",
    "usage": "Used to express: neglected / to leave someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Take For Granted",
    "meaning": "To accept readily / To pre-",
    "example": "The situation reminded everyone of the idiom 'take for granted'.",
    "usage": "Used to express: to accept readily / to pre-",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Mince Matters",
    "meaning": "To confuse issues/ to mix facts",
    "example": "The situation reminded everyone of the idiom 'mince matters'.",
    "usage": "Used to express: to confuse issues/ to mix facts",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Currying Favour With",
    "meaning": "Ingratiating / Trying too hard to",
    "example": "The situation reminded everyone of the idiom 'currying favour with'.",
    "usage": "Used to express: ingratiating / trying too hard to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Strom In A Tea Cup",
    "meaning": "Commotion (angry/worry) over a",
    "example": "The situation reminded everyone of the idiom 'strom in a tea cup'.",
    "usage": "Used to express: commotion (angry/worry) over a",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "The Man In The Street",
    "meaning": "An ordinary man (common",
    "example": "The situation reminded everyone of the idiom 'the man in the street'.",
    "usage": "Used to express: an ordinary man (common",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Fight To The Bitter End",
    "meaning": "To fight a losing battle",
    "example": "The situation reminded everyone of the idiom 'fight to the bitter end'.",
    "usage": "Used to express: to fight a losing battle",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Throw Down A Glove",
    "meaning": "To accept defeat",
    "example": "The situation reminded everyone of the idiom 'throw down a glove'.",
    "usage": "Used to express: to accept defeat",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Read Between The Lines",
    "meaning": "Understanding the hidden",
    "example": "The situation reminded everyone of the idiom 'read between the lines'.",
    "usage": "Used to express: understanding the hidden",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Let The Cat Out Of The",
    "meaning": "BAG",
    "example": "The situation reminded everyone of the idiom 'let the cat out of the'.",
    "usage": "Used to express: bag",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "To Have Too Many Iron",
    "meaning": "IN THE FIRE",
    "example": "The situation reminded everyone of the idiom 'to have too many iron'.",
    "usage": "Used to express: in the fire",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Fall Through",
    "meaning": "To fail",
    "example": "The situation reminded everyone of the idiom 'fall through'.",
    "usage": "Used to express: to fail",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "To Smell A Rat",
    "meaning": "To suspect a trick",
    "example": "The situation reminded everyone of the idiom 'to smell a rat'.",
    "usage": "Used to express: to suspect a trick",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Have The Last Laugh",
    "meaning": "To be victorious at the end of",
    "example": "The situation reminded everyone of the idiom 'have the last laugh'.",
    "usage": "Used to express: to be victorious at the end of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Red Letter Day",
    "meaning": "Happy and significant day",
    "example": "The situation reminded everyone of the idiom 'red letter day'.",
    "usage": "Used to express: happy and significant day",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "To Blaze A Trail",
    "meaning": "To lead the way as a pioneer",
    "example": "The situation reminded everyone of the idiom 'to blaze a trail'.",
    "usage": "Used to express: to lead the way as a pioneer",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Steer Clear Of",
    "meaning": "Avoid",
    "example": "The situation reminded everyone of the idiom 'to steer clear of'.",
    "usage": "Used to express: avoid",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Run Across",
    "meaning": "To meet by chance",
    "example": "The situation reminded everyone of the idiom 'to run across'.",
    "usage": "Used to express: to meet by chance",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Dark Horse",
    "meaning": "An unforeseen competitor",
    "example": "The situation reminded everyone of the idiom 'a dark horse'.",
    "usage": "Used to express: an unforeseen competitor",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Got The Sack",
    "meaning": "Dismissed from service",
    "example": "The situation reminded everyone of the idiom 'got the sack'.",
    "usage": "Used to express: dismissed from service",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Herculean Task",
    "meaning": "A work requiring very",
    "example": "The situation reminded everyone of the idiom 'herculean task'.",
    "usage": "Used to express: a work requiring very",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Helter-Skelter",
    "meaning": "In disorderly haste",
    "example": "The situation reminded everyone of the idiom 'helter-skelter'.",
    "usage": "Used to express: in disorderly haste",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Go To The Winds",
    "meaning": "Disappear",
    "example": "The situation reminded everyone of the idiom 'go to the winds'.",
    "usage": "Used to express: disappear",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Make Ducks And Drakes",
    "meaning": "OF",
    "example": "The situation reminded everyone of the idiom 'make ducks and drakes'.",
    "usage": "Used to express: of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Level",
    "meaning": "Honest and sincere",
    "example": "The situation reminded everyone of the idiom 'on the level'.",
    "usage": "Used to express: honest and sincere",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Done For",
    "meaning": "Ruined",
    "example": "The situation reminded everyone of the idiom 'done for'.",
    "usage": "Used to express: ruined",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To End In Smoke",
    "meaning": "To come to nothing, no",
    "example": "The situation reminded everyone of the idiom 'to end in smoke'.",
    "usage": "Used to express: to come to nothing, no",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Turn A Deaf Ear",
    "meaning": "To be indifferent",
    "example": "The situation reminded everyone of the idiom 'to turn a deaf ear'.",
    "usage": "Used to express: to be indifferent",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Run One Down",
    "meaning": "To disparage someone",
    "example": "The situation reminded everyone of the idiom 'to run one down'.",
    "usage": "Used to express: to disparage someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Face The Music",
    "meaning": "To bear the consequences",
    "example": "The situation reminded everyone of the idiom 'to face the music'.",
    "usage": "Used to express: to bear the consequences",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Take Someone To",
    "meaning": "TASK",
    "example": "The situation reminded everyone of the idiom 'to take someone to'.",
    "usage": "Used to express: task",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "At Stake",
    "meaning": "In danger/ that can be lost",
    "example": "The situation reminded everyone of the idiom 'at stake'.",
    "usage": "Used to express: in danger/ that can be lost",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Play To The Gallery",
    "meaning": "To behave in an",
    "example": "The situation reminded everyone of the idiom 'to play to the gallery'.",
    "usage": "Used to express: to behave in an",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Read Between The",
    "meaning": "Understand the hidden",
    "example": "The situation reminded everyone of the idiom 'read between the'.",
    "usage": "Used to express: understand the hidden",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sitting On The Fence",
    "meaning": "Hesitating which side to",
    "example": "The situation reminded everyone of the idiom 'sitting on the fence'.",
    "usage": "Used to express: hesitating which side to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Man In The Street",
    "meaning": "An ordinary person ",
    "example": "The situation reminded everyone of the idiom 'a man in the street'.",
    "usage": "Used to express: an ordinary person /",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Blood Running Cold",
    "meaning": "Become very frightened",
    "example": "The situation reminded everyone of the idiom 'blood running cold'.",
    "usage": "Used to express: become very frightened",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Playing To The Gallery",
    "meaning": "Befooling the common man",
    "example": "The situation reminded everyone of the idiom 'playing to the gallery'.",
    "usage": "Used to express: befooling the common man",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have Not A Leg To",
    "meaning": "STAND ON",
    "example": "The situation reminded everyone of the idiom 'to have not a leg to'.",
    "usage": "Used to express: stand on",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Lay Down Arms",
    "meaning": "To surrender",
    "example": "The situation reminded everyone of the idiom 'lay down arms'.",
    "usage": "Used to express: to surrender",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Making Hay While The",
    "meaning": "SUN SHINES",
    "example": "The situation reminded everyone of the idiom 'making hay while the'.",
    "usage": "Used to express: sun shines",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Bear With",
    "meaning": "Support / To be patient",
    "example": "The situation reminded everyone of the idiom 'bear with'.",
    "usage": "Used to express: support / to be patient",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Give Vent To",
    "meaning": "To emphasize or to express",
    "example": "The situation reminded everyone of the idiom 'give vent to'.",
    "usage": "Used to express: to emphasize or to express",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Bone Of Contention",
    "meaning": "Matter of dispute",
    "example": "The situation reminded everyone of the idiom 'bone of contention'.",
    "usage": "Used to express: matter of dispute",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Stand On Own Feet",
    "meaning": "To be independent",
    "example": "The situation reminded everyone of the idiom 'stand on own feet'.",
    "usage": "Used to express: to be independent",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Over Head And Ears",
    "meaning": "Completely",
    "example": "The situation reminded everyone of the idiom 'over head and ears'.",
    "usage": "Used to express: completely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Call It A Day",
    "meaning": "To conclude proceedings",
    "example": "The situation reminded everyone of the idiom 'to call it a day'.",
    "usage": "Used to express: to conclude proceedings",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put Up With",
    "meaning": "To tolerate",
    "example": "The situation reminded everyone of the idiom 'to put up with'.",
    "usage": "Used to express: to tolerate",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take To Hearts",
    "meaning": "Deeply affected by",
    "example": "The situation reminded everyone of the idiom 'to take to hearts'.",
    "usage": "Used to express: deeply affected by",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Move Heaven And",
    "meaning": "EARTH",
    "example": "The situation reminded everyone of the idiom 'to move heaven and'.",
    "usage": "Used to express: earth",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take Someone For A",
    "meaning": "To deceive (cheat) someone",
    "example": "The situation reminded everyone of the idiom 'to take someone for a'.",
    "usage": "Used to express: to deceive (cheat) someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "A Damp Squib",
    "meaning": "A disappointing result",
    "example": "The situation reminded everyone of the idiom 'a damp squib'.",
    "usage": "Used to express: a disappointing result",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Bite The Dust",
    "meaning": "To be defeated",
    "example": "The situation reminded everyone of the idiom 'to bite the dust'.",
    "usage": "Used to express: to be defeated",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "To Be All At Sea",
    "meaning": "Lost and confused",
    "example": "The situation reminded everyone of the idiom 'to be all at sea'.",
    "usage": "Used to express: lost and confused",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Cold Comfort",
    "meaning": "Slight satisfaction",
    "example": "The situation reminded everyone of the idiom 'cold comfort'.",
    "usage": "Used to express: slight satisfaction",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "To Die In Harness",
    "meaning": "To die while in service",
    "example": "The situation reminded everyone of the idiom 'to die in harness'.",
    "usage": "Used to express: to die while in service",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Show A Clean Pair Of",
    "meaning": "HEELS",
    "example": "The situation reminded everyone of the idiom 'to show a clean pair of'.",
    "usage": "Used to express: heels",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "To Strain Every Nerve",
    "meaning": "To make utmost efforts",
    "example": "The situation reminded everyone of the idiom 'to strain every nerve'.",
    "usage": "Used to express: to make utmost efforts",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "A Bolt Form The Blue",
    "meaning": "Unexpected problem",
    "example": "The situation reminded everyone of the idiom 'a bolt form the blue'.",
    "usage": "Used to express: unexpected problem",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Sailing In The Same",
    "meaning": "BOAT",
    "example": "The situation reminded everyone of the idiom 'sailing in the same'.",
    "usage": "Used to express: boat",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Gift Of The Gab",
    "meaning": "Ability to speak well",
    "example": "The situation reminded everyone of the idiom 'gift of the gab'.",
    "usage": "Used to express: ability to speak well",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep The Wolf From",
    "meaning": "THE DOOR",
    "example": "The situation reminded everyone of the idiom 'to keep the wolf from'.",
    "usage": "Used to express: the door",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Soft Option",
    "meaning": "Easy and agreeable option",
    "example": "The situation reminded everyone of the idiom 'soft option'.",
    "usage": "Used to express: easy and agreeable option",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Little Gush Of",
    "meaning": "GRATITUDE",
    "example": "The situation reminded everyone of the idiom 'a little gush of'.",
    "usage": "Used to express: gratitude",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Lose Ground",
    "meaning": "To become less popular",
    "example": "The situation reminded everyone of the idiom 'to lose ground'.",
    "usage": "Used to express: to become less popular",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "To Fall Back On",
    "meaning": "To use or do something else",
    "example": "The situation reminded everyone of the idiom 'to fall back on'.",
    "usage": "Used to express: to use or do something else",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Wear And Tear",
    "meaning": "Damage",
    "example": "The visitors dominance has been overwhelming against a host that is still searching for the right combination and ideal performance while also resembling the walking-wounded, losi",
    "usage": "Used to express: damage",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Add Fuel To The Fire",
    "meaning": "To cause additional anger",
    "example": "The situation reminded everyone of the idiom 'to add fuel to the fire'.",
    "usage": "Used to express: to cause additional anger",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "hard"
  },
  {
    "idiom": "Hand In Glove",
    "meaning": "In close relationship",
    "example": "The situation reminded everyone of the idiom 'hand in glove'.",
    "usage": "Used to express: in close relationship",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Make A Mountain Of",
    "meaning": "A MOLEHILL",
    "example": "The situation reminded everyone of the idiom 'to make a mountain of'.",
    "usage": "Used to express: a molehill",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Maiden Speech",
    "meaning": "First speech",
    "example": "The situation reminded everyone of the idiom 'maiden speech'.",
    "usage": "Used to express: first speech",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "At The Eleventh Hour",
    "meaning": "At the very last moment",
    "example": "Millions of companies in India are still not ready to file their first returns under the new Goods and Services Tax (GST) ahead of an Aug. 20 deadline, a top official told Reuters,",
    "usage": "Used to express: at the very last moment",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Cope With",
    "meaning": "To face and deal with",
    "example": "The situation reminded everyone of the idiom 'cope with'.",
    "usage": "Used to express: to face and deal with",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Go A Long Way Towards",
    "meaning": "DOING SOMETHING",
    "example": "The situation reminded everyone of the idiom 'go a long way towards'.",
    "usage": "Used to express: doing something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Standstill",
    "meaning": "Complete halt",
    "example": "The situation reminded everyone of the idiom 'standstill'.",
    "usage": "Used to express: complete halt",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cross Swords",
    "meaning": "Disagree",
    "example": "The situation reminded everyone of the idiom 'cross swords'.",
    "usage": "Used to express: disagree",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Pore Over",
    "meaning": "Go through",
    "example": "The situation reminded everyone of the idiom 'pore over'.",
    "usage": "Used to express: go through",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Make Both Ends Meet",
    "meaning": "To live a lavish life",
    "example": "The situation reminded everyone of the idiom 'make both ends meet'.",
    "usage": "Used to express: to live a lavish life",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Run Down",
    "meaning": "Criticise",
    "example": "The situation reminded everyone of the idiom 'run down'.",
    "usage": "Used to express: criticise",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Leave In The Lurch",
    "meaning": "Abandon in the",
    "example": "The situation reminded everyone of the idiom 'leave in the lurch'.",
    "usage": "Used to express: abandon in the",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Caught Red Handed",
    "meaning": "At the time of committing",
    "example": "The situation reminded everyone of the idiom 'caught red handed'.",
    "usage": "Used to express: at the time of committing",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Brink Of",
    "meaning": "On the point of",
    "example": "The situation reminded everyone of the idiom 'on the brink of'.",
    "usage": "Used to express: on the point of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Go Down The Drain",
    "meaning": "Lose forever",
    "example": "The situation reminded everyone of the idiom 'go down the drain'.",
    "usage": "Used to express: lose forever",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "A Close Shave",
    "meaning": "Narrow escape from danger",
    "example": "The situation reminded everyone of the idiom 'a close shave'.",
    "usage": "Used to express: narrow escape from danger",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Cool As A Cucumber",
    "meaning": "Not nervous or emotional",
    "example": "The situation reminded everyone of the idiom 'cool as a cucumber'.",
    "usage": "Used to express: not nervous or emotional",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Scapegoat",
    "meaning": "A person who is blamed for",
    "example": "The situation reminded everyone of the idiom 'scapegoat'.",
    "usage": "Used to express: a person who is blamed for",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "Wears Heart On Sleeves",
    "meaning": "Express feelings openly",
    "example": "The situation reminded everyone of the idiom 'wears heart on sleeves'.",
    "usage": "Used to express: express feelings openly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Pay Off Old Scores",
    "meaning": "To refund old dues",
    "example": "from his attitude it is cl, ar that he wants to pay off old scores",
    "usage": "Used to express: to refund old dues",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "Man Of Letters",
    "meaning": "Proficient in literary arts",
    "example": "The situation reminded everyone of the idiom 'man of letters'.",
    "usage": "Used to express: proficient in literary arts",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn Down",
    "meaning": "Refuse",
    "example": "How could you turn down such a fantastic job?",
    "usage": "Used to express: refuse",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "On Good Terms",
    "meaning": "Agree with someone",
    "example": "The situation reminded everyone of the idiom 'on good terms'.",
    "usage": "Used to express: agree with someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Measure Up",
    "meaning": "Reach the level",
    "example": "The situation reminded everyone of the idiom 'measure up'.",
    "usage": "Used to express: reach the level",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Doctor The Accounts",
    "meaning": "To manipulate the accounts",
    "example": "The situation reminded everyone of the idiom 'doctor the accounts'.",
    "usage": "Used to express: to manipulate the accounts",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Dark Horse",
    "meaning": "An unexpected winner",
    "example": "The situation reminded everyone of the idiom 'dark horse'.",
    "usage": "Used to express: an unexpected winner",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "In The Red",
    "meaning": "Losing money/ To owe money",
    "example": "The situation reminded everyone of the idiom 'in the red'.",
    "usage": "Used to express: losing money/ to owe money",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "In Lieu Of",
    "meaning": "Despite of",
    "example": "The situation reminded everyone of the idiom 'in lieu of'.",
    "usage": "Used to express: despite of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Beat About The Bush",
    "meaning": "Speak in a round-about",
    "example": "The situation reminded everyone of the idiom 'beat about the bush'.",
    "usage": "Used to express: speak in a round-about",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Bring About",
    "meaning": "Cause",
    "example": "The situation reminded everyone of the idiom 'bring about'.",
    "usage": "Used to express: cause",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pull Up",
    "meaning": "Reprimand",
    "example": "The situation reminded everyone of the idiom 'pull up'.",
    "usage": "Used to express: reprimand",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "At Sixes And Seven",
    "meaning": "In disorder or confusion",
    "example": "The situation reminded everyone of the idiom 'at sixes and seven'.",
    "usage": "Used to express: in disorder or confusion",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Lose Head",
    "meaning": "Panic",
    "example": "The situation reminded everyone of the idiom 'lose head'.",
    "usage": "Used to express: panic",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Take To Task",
    "meaning": "To criticize severely / To",
    "example": "The situation reminded everyone of the idiom 'take to task'.",
    "usage": "Used to express: to criticize severely / to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sit In Judgement",
    "meaning": "comment on someone )",
    "example": "The situation reminded everyone of the idiom 'sit in judgement'.",
    "usage": "Used to express: comment on someone )",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cry Over Spilt Milk",
    "meaning": "Cry over irreparable loss",
    "example": "The situation reminded everyone of the idiom 'cry over spilt milk'.",
    "usage": "Used to express: cry over irreparable loss",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Grease Palms",
    "meaning": "To bribe someone",
    "example": "The situation reminded everyone of the idiom 'grease palms'.",
    "usage": "Used to express: to bribe someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Carrot And Stick",
    "meaning": "Reward and punishment",
    "example": "The situation reminded everyone of the idiom 'carrot and stick'.",
    "usage": "Used to express: reward and punishment",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Cut Teeth",
    "meaning": "To gain experience of",
    "example": "The situation reminded everyone of the idiom 'to cut teeth'.",
    "usage": "Used to express: to gain experience of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Close The Book",
    "meaning": "Stop working on something",
    "example": "The situation reminded everyone of the idiom 'close the book'.",
    "usage": "Used to express: stop working on something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "In Fits And Starts",
    "meaning": "Irregularly",
    "example": "The situation reminded everyone of the idiom 'in fits and starts'.",
    "usage": "Used to express: irregularly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Run In The Same Groove",
    "meaning": "Advance in harmony",
    "example": "The situation reminded everyone of the idiom 'run in the same groove'.",
    "usage": "Used to express: advance in harmony",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep Your Head",
    "meaning": "Remain calm",
    "example": "The situation reminded everyone of the idiom 'keep your head'.",
    "usage": "Used to express: remain calm",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Pull Strings",
    "meaning": "Use personal influence",
    "example": "The situation reminded everyone of the idiom 'pull strings'.",
    "usage": "Used to express: use personal influence",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pot Luck Dinner",
    "meaning": "Dinner where somebody",
    "example": "The situation reminded everyone of the idiom 'pot luck dinner'.",
    "usage": "Used to express: dinner where somebody",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Hit Below The Belt",
    "meaning": "To attack unfairly",
    "example": "The situation reminded everyone of the idiom 'to hit below the belt'.",
    "usage": "Used to express: to attack unfairly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sought After",
    "meaning": "Wanted by many people",
    "example": "The situation reminded everyone of the idiom 'sought after'.",
    "usage": "Used to express: wanted by many people",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Build Castles In The Air",
    "meaning": "Daydreaming",
    "example": "The situation reminded everyone of the idiom 'build castles in the air'.",
    "usage": "Used to express: daydreaming",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Spur Of The",
    "meaning": "MOMENT",
    "example": "The situation reminded everyone of the idiom 'on the spur of the'.",
    "usage": "Used to express: moment",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Explore Every",
    "meaning": "AVENUE",
    "example": "The situation reminded everyone of the idiom 'to explore every'.",
    "usage": "Used to express: avenue",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By Fair Or Foul Means",
    "meaning": "In honest or dishonest way",
    "example": "The situation reminded everyone of the idiom 'by fair or foul means'.",
    "usage": "Used to express: in honest or dishonest way",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Status Quo",
    "meaning": "As it is / Unchanged position",
    "example": "The situation reminded everyone of the idiom 'status quo'.",
    "usage": "Used to express: as it is / unchanged position",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Burn Candle At Both",
    "meaning": "ENDS",
    "example": "The situation reminded everyone of the idiom 'to burn candle at both'.",
    "usage": "Used to express: ends",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Hit The Jackpot",
    "meaning": "To make money quickly",
    "example": "The situation reminded everyone of the idiom 'to hit the jackpot'.",
    "usage": "Used to express: to make money quickly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "To Bring To Light",
    "meaning": "To reveal",
    "example": "The situation reminded everyone of the idiom 'to bring to light'.",
    "usage": "Used to express: to reveal",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Go Scot-Free",
    "meaning": "To escape without",
    "example": "The situation reminded everyone of the idiom 'go scot-free'.",
    "usage": "Used to express: to escape without",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Shed Crocodile",
    "meaning": "TEARS",
    "example": "The situation reminded everyone of the idiom 'to shed crocodile'.",
    "usage": "Used to express: tears",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Miss The Bus",
    "meaning": "To miss an opportunity",
    "example": "The situation reminded everyone of the idiom 'to miss the bus'.",
    "usage": "Used to express: to miss an opportunity",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Call Spade A Spade",
    "meaning": "To be frank",
    "example": "The situation reminded everyone of the idiom 'to call spade a spade'.",
    "usage": "Used to express: to be frank",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Fight Tooth And Nail",
    "meaning": "To fight heroically, in very",
    "example": "The situation reminded everyone of the idiom 'to fight tooth and nail'.",
    "usage": "Used to express: to fight heroically, in very",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Birds Of Same Feather",
    "meaning": "Persons of same character",
    "example": "The situation reminded everyone of the idiom 'birds of same feather'.",
    "usage": "Used to express: persons of same character",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Take Exception",
    "meaning": "To object over something",
    "example": "The situation reminded everyone of the idiom 'take exception'.",
    "usage": "Used to express: to object over something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "High Handed",
    "meaning": "Using authority in an",
    "example": "The situation reminded everyone of the idiom 'high handed'.",
    "usage": "Used to express: using authority in an",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Fall Short",
    "meaning": "Fail to meet expectation",
    "example": "The situation reminded everyone of the idiom 'fall short'.",
    "usage": "Used to express: fail to meet expectation/",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Heart To Heart Talk",
    "meaning": "Frank talk",
    "example": "The situation reminded everyone of the idiom 'heart to heart talk'.",
    "usage": "Used to express: frank talk",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Take Cue From",
    "meaning": "To copy what someone",
    "example": "The situation reminded everyone of the idiom 'take cue from'.",
    "usage": "Used to express: to copy what someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Call For",
    "meaning": "To ask",
    "example": "The situation reminded everyone of the idiom 'call for'.",
    "usage": "Used to express: to ask",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Out Of The Question",
    "meaning": "Undesirable/ Not worth",
    "example": "The situation reminded everyone of the idiom 'out of the question'.",
    "usage": "Used to express: undesirable/ not worth",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "End Up In Smoke",
    "meaning": "Come to nothing / Useless",
    "example": "The situation reminded everyone of the idiom 'end up in smoke'.",
    "usage": "Used to express: come to nothing / useless",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Spread Like Fire",
    "meaning": "Spread rapidly",
    "example": "The situation reminded everyone of the idiom 'spread like fire'.",
    "usage": "Used to express: spread rapidly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Dropping Like Flies",
    "meaning": "Collapsing in large numbers",
    "example": "The situation reminded everyone of the idiom 'dropping like flies'.",
    "usage": "Used to express: collapsing in large numbers",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Rat Race",
    "meaning": "Fierce competition for power",
    "example": "The situation reminded everyone of the idiom 'rat race'.",
    "usage": "Used to express: fierce competition for power",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Hard Nut To Crack",
    "meaning": "Difficult task",
    "example": "The situation reminded everyone of the idiom 'hard nut to crack'.",
    "usage": "Used to express: difficult task",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "See Eye To Eye",
    "meaning": "To think in the same way",
    "example": "The situation reminded everyone of the idiom 'see eye to eye'.",
    "usage": "Used to express: to think in the same way",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Put Across",
    "meaning": "To communicate your ideas,",
    "example": "The situation reminded everyone of the idiom 'put across'.",
    "usage": "Used to express: to communicate your ideas,",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "To Have Second",
    "meaning": "THOUGHTS",
    "example": "The situation reminded everyone of the idiom 'to have second'.",
    "usage": "Used to express: thoughts",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Not My Cup Of Tea",
    "meaning": "Not what somebody likes or",
    "example": "The situation reminded everyone of the idiom 'not my cup of tea'.",
    "usage": "Used to express: not what somebody likes or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Break The Ice",
    "meaning": "To start a conversation",
    "example": "The situation reminded everyone of the idiom 'to break the ice'.",
    "usage": "Used to express: to start a conversation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "To Add Fuel To Fire",
    "meaning": "To worsen the matter / To",
    "example": "The situation reminded everyone of the idiom 'to add fuel to fire'.",
    "usage": "Used to express: to worsen the matter / to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Feel Like A Fish Out",
    "meaning": "OF WATER",
    "example": "The situation reminded everyone of the idiom 'to feel like a fish out'.",
    "usage": "Used to express: of water",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "Give A Hand With",
    "meaning": "To help with something",
    "example": "The situation reminded everyone of the idiom 'give a hand with'.",
    "usage": "Used to express: to help with something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Take To Heart",
    "meaning": "To be very upset by",
    "example": "The situation reminded everyone of the idiom 'take to heart'.",
    "usage": "Used to express: to be very upset by",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Had Better",
    "meaning": "Used for telling somebody",
    "example": "The situation reminded everyone of the idiom 'had better'.",
    "usage": "Used to express: used for telling somebody",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Strike A Bargain",
    "meaning": "To negotiate a deal",
    "example": "The situation reminded everyone of the idiom 'strike a bargain'.",
    "usage": "Used to express: to negotiate a deal",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Point Blank",
    "meaning": "Very definite and direct",
    "example": "The situation reminded everyone of the idiom 'point blank'.",
    "usage": "Used to express: very definite and direct",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Kicking Heels",
    "meaning": "To be relaxed and enjoy ",
    "example": "The situation reminded everyone of the idiom 'kicking heels'.",
    "usage": "Used to express: to be relaxed and enjoy /",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "End In Smoke",
    "meaning": "Come to nothing",
    "example": "The situation reminded everyone of the idiom 'end in smoke'.",
    "usage": "Used to express: come to nothing",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Die In Harness",
    "meaning": "Die in service/ Die while",
    "example": "The situation reminded everyone of the idiom 'die in harness'.",
    "usage": "Used to express: die in service/ die while",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Horns Of",
    "meaning": "DILEMMA",
    "example": "The situation reminded everyone of the idiom 'on the horns of'.",
    "usage": "Used to express: dilemma",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Send Packing",
    "meaning": "To tell somebody firmly or",
    "example": "The situation reminded everyone of the idiom 'send packing'.",
    "usage": "Used to express: to tell somebody firmly or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Kick Up A Row",
    "meaning": "Make a great fuss / To",
    "example": "The situation reminded everyone of the idiom 'kick up a row'.",
    "usage": "Used to express: make a great fuss / to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Wet Behind The Ears",
    "meaning": "Young and without",
    "example": "The situation reminded everyone of the idiom 'wet behind the ears'.",
    "usage": "Used to express: young and without",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Talk Someone Over",
    "meaning": "To convince over",
    "example": "The situation reminded everyone of the idiom 'to talk someone over'.",
    "usage": "Used to express: to convince over",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Wear Heart On Sleeves",
    "meaning": "Express emotions freely",
    "example": "The situation reminded everyone of the idiom 'wear heart on sleeves'.",
    "usage": "Used to express: express emotions freely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Bury The Hatchet",
    "meaning": "To make peace / To stop being",
    "example": "AIADMK factions bury the hatchet",
    "usage": "Used to express: to make peace / to stop being",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Once In A Blue Moon",
    "meaning": "Rarely",
    "example": "The situation reminded everyone of the idiom 'once in a blue moon'.",
    "usage": "Used to express: rarely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Through Thick And Thin",
    "meaning": "Under all circumstances",
    "example": "The situation reminded everyone of the idiom 'through thick and thin'.",
    "usage": "Used to express: under all circumstances",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Come To Grief",
    "meaning": "To suffer",
    "example": "The situation reminded everyone of the idiom 'come to grief'.",
    "usage": "Used to express: to suffer",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "No Hard And Fast Rules",
    "meaning": "Easy regulation",
    "example": "The situation reminded everyone of the idiom 'no hard and fast rules'.",
    "usage": "Used to express: easy regulation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Live From Hand To",
    "meaning": "MOUTH",
    "example": "The situation reminded everyone of the idiom 'live from hand to'.",
    "usage": "Used to express: mouth",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Hail From",
    "meaning": "To come from",
    "example": "The situation reminded everyone of the idiom 'to hail from'.",
    "usage": "Used to express: to come from",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put An End To",
    "meaning": "Stop",
    "example": "The situation reminded everyone of the idiom 'to put an end to'.",
    "usage": "Used to express: stop",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn Up",
    "meaning": "To appear",
    "example": "The situation reminded everyone of the idiom 'turn up'.",
    "usage": "Used to express: to appear",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Die Hard",
    "meaning": "Unwilling to change",
    "example": "The situation reminded everyone of the idiom 'die hard'.",
    "usage": "Used to express: unwilling to change",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Pass Away",
    "meaning": "Die",
    "example": "The situation reminded everyone of the idiom 'to pass away'.",
    "usage": "Used to express: die",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Carry Weight",
    "meaning": "Be important / Important",
    "example": "The situation reminded everyone of the idiom 'carry weight'.",
    "usage": "Used to express: be important / important",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Fall Flat",
    "meaning": "Fail to amuse people / Fail to",
    "example": "The situation reminded everyone of the idiom 'fall flat'.",
    "usage": "Used to express: fail to amuse people / fail to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Under The Thumb Of",
    "meaning": "Under the control of",
    "example": "The situation reminded everyone of the idiom 'under the thumb of'.",
    "usage": "Used to express: under the control of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Get Wind",
    "meaning": "Come to know about",
    "example": "The situation reminded everyone of the idiom 'to get wind'.",
    "usage": "Used to express: come to know about",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Part And Parcel",
    "meaning": "An essential part of",
    "example": "The situation reminded everyone of the idiom 'part and parcel'.",
    "usage": "Used to express: an essential part of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Give Vent To",
    "meaning": "To express a feeling,",
    "example": "The situation reminded everyone of the idiom 'to give vent to'.",
    "usage": "Used to express: to express a feeling,",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Stand By",
    "meaning": "To help / Support somebody",
    "example": "The situation reminded everyone of the idiom 'stand by'.",
    "usage": "Used to express: to help / support somebody",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "In Black And White",
    "meaning": "In writing",
    "example": "The situation reminded everyone of the idiom 'in black and white'.",
    "usage": "Used to express: in writing",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "At A Loss",
    "meaning": "Unable / Not knowing about",
    "example": "The situation reminded everyone of the idiom 'at a loss'.",
    "usage": "Used to express: unable / not knowing about",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Lame Excuse",
    "meaning": "Unsatisfactory explanation",
    "example": "The situation reminded everyone of the idiom 'lame excuse'.",
    "usage": "Used to express: unsatisfactory explanation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Hard Nut To Crack",
    "meaning": "A difficult problem or",
    "example": "The situation reminded everyone of the idiom 'a hard nut to crack'.",
    "usage": "Used to express: a difficult problem or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "For Better Or Worse",
    "meaning": "Always / In every condition",
    "example": "The situation reminded everyone of the idiom 'for better or worse'.",
    "usage": "Used to express: always / in every condition",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In A Nutshell",
    "meaning": "Brief",
    "example": "The situation reminded everyone of the idiom 'in a nutshell'.",
    "usage": "Used to express: brief",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Shot In The Dark",
    "meaning": "An attempt to guess",
    "example": "The situation reminded everyone of the idiom 'a shot in the dark'.",
    "usage": "Used to express: an attempt to guess",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Water Under The Bridge",
    "meaning": "Something that happened in",
    "example": "The situation reminded everyone of the idiom 'water under the bridge'.",
    "usage": "Used to express: something that happened in",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Stick To Guns",
    "meaning": "Hold on to original decisions",
    "example": "The situation reminded everyone of the idiom 'stick to guns'.",
    "usage": "Used to express: hold on to original decisions",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Out Of Hand",
    "meaning": "Out of control, at once,",
    "example": "The situation reminded everyone of the idiom 'out of hand'.",
    "usage": "Used to express: out of control, at once,",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "The Salt Of The Earth",
    "meaning": "Very good and honest/ Kind",
    "example": "The situation reminded everyone of the idiom 'the salt of the earth'.",
    "usage": "Used to express: very good and honest/ kind",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Looking Forward To",
    "meaning": "To expect something or",
    "example": "The situation reminded everyone of the idiom 'looking forward to'.",
    "usage": "Used to express: to expect something or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Slip Off",
    "meaning": "Leave quietly",
    "example": "The situation reminded everyone of the idiom 'slip off'.",
    "usage": "Used to express: leave quietly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Get On Well",
    "meaning": "Have a friendly relationship",
    "example": "The situation reminded everyone of the idiom 'get on well'.",
    "usage": "Used to express: have a friendly relationship",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In A Pickle",
    "meaning": "In an embarrassing or",
    "example": "The situation reminded everyone of the idiom 'in a pickle'.",
    "usage": "Used to express: in an embarrassing or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "As Hard As Nail",
    "meaning": "Emotionless / To show no",
    "example": "The situation reminded everyone of the idiom 'as hard as nail'.",
    "usage": "Used to express: emotionless / to show no",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Allow A Free Hand",
    "meaning": "Complete liberty",
    "example": "The situation reminded everyone of the idiom 'allow a free hand'.",
    "usage": "Used to express: complete liberty",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Lays Out",
    "meaning": "To spend money",
    "example": "The situation reminded everyone of the idiom 'lays out'.",
    "usage": "Used to express: to spend money",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "Break Down",
    "meaning": "To lose control of your",
    "example": "The situation reminded everyone of the idiom 'break down'.",
    "usage": "Used to express: to lose control of your",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Weal And Woe",
    "meaning": "Ups and downs",
    "example": "The situation reminded everyone of the idiom 'weal and woe'.",
    "usage": "Used to express: ups and downs",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Iron Will",
    "meaning": "Strong determination",
    "example": "The situation reminded everyone of the idiom 'iron will'.",
    "usage": "Used to express: strong determination",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Take To Task",
    "meaning": "Punish",
    "example": "The situation reminded everyone of the idiom 'to take to task'.",
    "usage": "Used to express: punish",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Rack And Ruin",
    "meaning": "Ransacked",
    "example": "The situation reminded everyone of the idiom 'rack and ruin'.",
    "usage": "Used to express: ransacked",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Rides The High Horse",
    "meaning": "Feel superior",
    "example": "The situation reminded everyone of the idiom 'rides the high horse'.",
    "usage": "Used to express: feel superior",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "See Through",
    "meaning": "Detect / To realize the truth",
    "example": "The situation reminded everyone of the idiom 'see through'.",
    "usage": "Used to express: detect / to realize the truth",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Break Up",
    "meaning": "Disband itself / The breaking",
    "example": "The situation reminded everyone of the idiom 'break up'.",
    "usage": "Used to express: disband itself / the breaking",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Bull In A China Shop",
    "meaning": "A clumsy person",
    "example": "The situation reminded everyone of the idiom 'bull in a china shop'.",
    "usage": "Used to express: a clumsy person",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Change Colours",
    "meaning": "To turn pale",
    "example": "The situation reminded everyone of the idiom 'change colours'.",
    "usage": "Used to express: to turn pale",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Spick And Span",
    "meaning": "Neat and clean / Tidy",
    "example": "She keeps her house spick and span",
    "usage": "Used to express: neat and clean / tidy",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Wide Off The Mark",
    "meaning": "Irrelevant / Not accurate ",
    "example": "The situation reminded everyone of the idiom 'wide off the mark'.",
    "usage": "Used to express: irrelevant / not accurate /",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Out Of The World",
    "meaning": "Extraordinary",
    "example": "The situation reminded everyone of the idiom 'out of the world'.",
    "usage": "Used to express: extraordinary",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sweep Under The Carpet",
    "meaning": "To hide something",
    "example": "The situation reminded everyone of the idiom 'sweep under the carpet'.",
    "usage": "Used to express: to hide something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By Leaps And Bound",
    "meaning": "Very rapidly",
    "example": "The situation reminded everyone of the idiom 'by leaps and bound'.",
    "usage": "Used to express: very rapidly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Toe The Line",
    "meaning": "To follow the lead / To follow",
    "example": "The situation reminded everyone of the idiom 'to toe the line'.",
    "usage": "Used to express: to follow the lead / to follow",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Take Hat Off",
    "meaning": "Encourage / To admire",
    "example": "The situation reminded everyone of the idiom 'take hat off'.",
    "usage": "Used to express: encourage / to admire",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Null And Void",
    "meaning": "Empty",
    "example": "The situation reminded everyone of the idiom 'null and void'.",
    "usage": "Used to express: empty",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Break The Ice",
    "meaning": "Initiate a talk",
    "example": "The situation reminded everyone of the idiom 'break the ice'.",
    "usage": "Used to express: initiate a talk",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Keep The Wolf From The",
    "meaning": "DOOR",
    "example": "The situation reminded everyone of the idiom 'keep the wolf from the'.",
    "usage": "Used to express: door",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Fish In Troubled Water",
    "meaning": "To make a profit out of",
    "example": "The situation reminded everyone of the idiom 'fish in troubled water'.",
    "usage": "Used to express: to make a profit out of",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Look Into",
    "meaning": "To investigate",
    "example": "The situation reminded everyone of the idiom 'look into'.",
    "usage": "Used to express: to investigate",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Smell The Rat",
    "meaning": "Suspect that something is",
    "example": "The situation reminded everyone of the idiom 'smell the rat'.",
    "usage": "Used to express: suspect that something is",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Let The Grass Grow",
    "meaning": "UNDER THE FEET",
    "example": "The situation reminded everyone of the idiom 'let the grass grow'.",
    "usage": "Used to express: under the feet",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Apple Of Discord",
    "meaning": "Cause of animosity",
    "example": "The situation reminded everyone of the idiom 'apple of discord'.",
    "usage": "Used to express: cause of animosity",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Fish Out Of Water",
    "meaning": "In uncomfortable situation",
    "example": "The situation reminded everyone of the idiom 'a fish out of water'.",
    "usage": "Used to express: in uncomfortable situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Out Of Wits",
    "meaning": "Greatly confused",
    "example": "The situation reminded everyone of the idiom 'out of wits'.",
    "usage": "Used to express: greatly confused",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Call Spade A Spade",
    "meaning": "To speak in a straightforward",
    "example": "The situation reminded everyone of the idiom 'call spade a spade'.",
    "usage": "Used to express: to speak in a straightforward",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "To Play Second Fiddle",
    "meaning": "Take a subordinate role",
    "example": "The situation reminded everyone of the idiom 'to play second fiddle'.",
    "usage": "Used to express: take a subordinate role",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Casting Pearl Before",
    "meaning": "SWINE",
    "example": "The situation reminded everyone of the idiom 'casting pearl before'.",
    "usage": "Used to express: swine",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Putting The Cart",
    "meaning": "BEFORE THE HORSE",
    "example": "The situation reminded everyone of the idiom 'putting the cart'.",
    "usage": "Used to express: before the horse",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Not Fit To Hold Candle",
    "meaning": "Not so good as somebody or",
    "example": "The situation reminded everyone of the idiom 'not fit to hold candle'.",
    "usage": "Used to express: not so good as somebody or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Egg Someone On",
    "meaning": "To encourage somebody to do",
    "example": "The situation reminded everyone of the idiom 'egg someone on'.",
    "usage": "Used to express: to encourage somebody to do",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "For Good",
    "meaning": "Permanently",
    "example": "The situation reminded everyone of the idiom 'for good'.",
    "usage": "Used to express: permanently",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Take A Leap In The Dark",
    "meaning": "To take risk",
    "example": "The situation reminded everyone of the idiom 'take a leap in the dark'.",
    "usage": "Used to express: to take risk",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Cut The Guardian Knot",
    "meaning": "Remove difficulty / To solve",
    "example": "The situation reminded everyone of the idiom 'cut the guardian knot'.",
    "usage": "Used to express: remove difficulty / to solve",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Cakewalk",
    "meaning": "An easy achievement",
    "example": "The situation reminded everyone of the idiom 'a cakewalk'.",
    "usage": "Used to express: an easy achievement",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Not To Look A Gift",
    "meaning": "HORSE IN THE MOUTH",
    "example": "The situation reminded everyone of the idiom 'not to look a gift'.",
    "usage": "Used to express: horse in the mouth",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Man Of Straw",
    "meaning": "A man of no substance",
    "example": "The situation reminded everyone of the idiom 'man of straw'.",
    "usage": "Used to express: a man of no substance",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Born With A Silver",
    "meaning": "SPOON",
    "example": "The situation reminded everyone of the idiom 'born with a silver'.",
    "usage": "Used to express: spoon",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Let Sleeping Dogs Lie",
    "meaning": "Not to bring up an old",
    "example": "The situation reminded everyone of the idiom 'let sleeping dogs lie'.",
    "usage": "Used to express: not to bring up an old",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "A Month Of Sundays",
    "meaning": "A long time",
    "example": "The situation reminded everyone of the idiom 'a month of sundays'.",
    "usage": "Used to express: a long time",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "A Closed Book",
    "meaning": "A mystery",
    "example": "The situation reminded everyone of the idiom 'a closed book'.",
    "usage": "Used to express: a mystery",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "In Apple Pie Order",
    "meaning": "In perfect order",
    "example": "The situation reminded everyone of the idiom 'in apple pie order'.",
    "usage": "Used to express: in perfect order",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Through Thick And",
    "meaning": "THIN",
    "example": "The situation reminded everyone of the idiom 'through thick and'.",
    "usage": "Used to express: thin",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Live-Wire",
    "meaning": "A person who is lively or",
    "example": "The situation reminded everyone of the idiom 'live-wire'.",
    "usage": "Used to express: a person who is lively or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Feel Blue",
    "meaning": "In trouble / depressed",
    "example": "The situation reminded everyone of the idiom 'feel blue'.",
    "usage": "Used to express: in trouble / depressed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Above Board",
    "meaning": "Legal and honest",
    "example": "The situation reminded everyone of the idiom 'above board'.",
    "usage": "Used to express: legal and honest",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Pour Cats And Dogs",
    "meaning": "Rain heavily",
    "example": "The situation reminded everyone of the idiom 'pour cats and dogs'.",
    "usage": "Used to express: rain heavily",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Iron Fist",
    "meaning": "To treat people in severe",
    "example": "The situation reminded everyone of the idiom 'iron fist'.",
    "usage": "Used to express: to treat people in severe",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Time And Again",
    "meaning": "Always",
    "example": "The situation reminded everyone of the idiom 'time and again'.",
    "usage": "Used to express: always",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Eat Humble Pie",
    "meaning": "To say or show that you are",
    "example": "The situation reminded everyone of the idiom 'eat humble pie'.",
    "usage": "Used to express: to say or show that you are",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Rule The Roost",
    "meaning": "Exercise authority / To be the",
    "example": "The situation reminded everyone of the idiom 'rule the roost'.",
    "usage": "Used to express: exercise authority / to be the",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Have Something Up",
    "meaning": "YOUR SLEEVE",
    "example": "The situation reminded everyone of the idiom 'have something up'.",
    "usage": "Used to express: your sleeve",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Make Things Done",
    "meaning": "To manage",
    "example": "The situation reminded everyone of the idiom 'to make things done'.",
    "usage": "Used to express: to manage",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Chicken Out",
    "meaning": "Withdraw / To decide not to do",
    "example": "The situation reminded everyone of the idiom 'chicken out'.",
    "usage": "Used to express: withdraw / to decide not to do",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Ice Braking",
    "meaning": "Starting a conversation",
    "example": "The situation reminded everyone of the idiom 'ice braking'.",
    "usage": "Used to express: starting a conversation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Bad Hats",
    "meaning": "People of bad character",
    "example": "The situation reminded everyone of the idiom 'bad hats'.",
    "usage": "Used to express: people of bad character",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Give And Take",
    "meaning": "Adjustment / Willingness in",
    "example": "The situation reminded everyone of the idiom 'give and take'.",
    "usage": "Used to express: adjustment / willingness in",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get Down To Business",
    "meaning": "To begin work seriously",
    "example": "The situation reminded everyone of the idiom 'get down to business'.",
    "usage": "Used to express: to begin work seriously",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Go About",
    "meaning": "Go around / To continue to do something",
    "example": "The situation reminded everyone of the idiom 'go about'.",
    "usage": "Used to express: go around / to continue to do something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Picking Up Holes In",
    "meaning": "Finding out faults with something",
    "example": "The situation reminded everyone of the idiom 'picking up holes in'.",
    "usage": "Used to express: finding out faults with something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Cast A Die",
    "meaning": "To take a decision",
    "example": "The situation reminded everyone of the idiom 'to cast a die'.",
    "usage": "Used to express: to take a decision",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "The Gift Of The Gab",
    "meaning": "Ability to speak well",
    "example": "The situation reminded everyone of the idiom 'the gift of the gab'.",
    "usage": "Used to express: ability to speak well",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Cordon Off",
    "meaning": "Isolate / To stop people from",
    "example": "The situation reminded everyone of the idiom 'cordon off'.",
    "usage": "Used to express: isolate / to stop people from",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Keep An Open House",
    "meaning": "Welcome all members",
    "example": "The situation reminded everyone of the idiom 'keep an open house'.",
    "usage": "Used to express: welcome all members",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pick On",
    "meaning": "Warn severely",
    "example": "The situation reminded everyone of the idiom 'pick on'.",
    "usage": "Used to express: warn severely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Fight Tooth And Nail",
    "meaning": "Fight with strength and fury",
    "example": "The situation reminded everyone of the idiom 'fight tooth and nail'.",
    "usage": "Used to express: fight with strength and fury",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Teething Problems",
    "meaning": "Difficulties at the start",
    "example": "The situation reminded everyone of the idiom 'teething problems'.",
    "usage": "Used to express: difficulties at the start",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Get Into Hot Water",
    "meaning": "To get into trouble",
    "example": "The situation reminded everyone of the idiom 'to get into hot water'.",
    "usage": "Used to express: to get into trouble",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Plain Sailing",
    "meaning": "Very easy",
    "example": "The situation reminded everyone of the idiom 'plain sailing'.",
    "usage": "Used to express: very easy",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Cut One Short",
    "meaning": "To criticize",
    "example": "The situation reminded everyone of the idiom 'to cut one short'.",
    "usage": "Used to express: to criticize",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Show The White Flag",
    "meaning": "To surrender",
    "example": "The situation reminded everyone of the idiom 'show the white flag'.",
    "usage": "Used to express: to surrender",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "A Cut Above",
    "meaning": "Rather superior to",
    "example": "The situation reminded everyone of the idiom 'a cut above'.",
    "usage": "Used to express: rather superior to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Foam At The Mouth",
    "meaning": "Angry",
    "example": "The situation reminded everyone of the idiom 'foam at the mouth'.",
    "usage": "Used to express: angry",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep Wolf Away From The",
    "meaning": "DOOR",
    "example": "The situation reminded everyone of the idiom 'keep wolf away from the'.",
    "usage": "Used to express: door",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Pin Money",
    "meaning": "Additional money",
    "example": "The situation reminded everyone of the idiom 'pin money'.",
    "usage": "Used to express: additional money",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "The Alpha And Omega",
    "meaning": "Beginning and end",
    "example": "The situation reminded everyone of the idiom 'the alpha and omega'.",
    "usage": "Used to express: beginning and end",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Salt Of The Earth",
    "meaning": "Good, honest and ideal",
    "example": "The situation reminded everyone of the idiom 'salt of the earth'.",
    "usage": "Used to express: good, honest and ideal",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Bring The House Down",
    "meaning": "Make the audience applaud",
    "example": "The situation reminded everyone of the idiom 'bring the house down'.",
    "usage": "Used to express: make the audience applaud",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Gerrymandering Way",
    "meaning": "In a manipulative and unfair way",
    "example": "The situation reminded everyone of the idiom 'gerrymandering way'.",
    "usage": "Used to express: in a manipulative and unfair way",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Strain Every Nerve",
    "meaning": "Make all efforts / Try all tricks",
    "example": "The situation reminded everyone of the idiom 'strain every nerve'.",
    "usage": "Used to express: make all efforts / try all tricks",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Down In The Dumps",
    "meaning": "Sad and depressed",
    "example": "The situation reminded everyone of the idiom 'down in the dumps'.",
    "usage": "Used to express: sad and depressed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "All Moonshine",
    "meaning": "Superficial",
    "example": "The situation reminded everyone of the idiom 'all moonshine'.",
    "usage": "Used to express: superficial",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Wild Goose Chase",
    "meaning": "A foolish and useless enterprise",
    "example": "The situation reminded everyone of the idiom 'wild goose chase'.",
    "usage": "Used to express: a foolish and useless enterprise",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Swan Song",
    "meaning": "Last prayer (at funeral or farewell)",
    "example": "The situation reminded everyone of the idiom 'swan song'.",
    "usage": "Used to express: last prayer (at funeral or farewell)",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "By The Skin Of Teeth",
    "meaning": "By the narrowest margin",
    "example": "The situation reminded everyone of the idiom 'by the skin of teeth'.",
    "usage": "Used to express: by the narrowest margin",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep Up With",
    "meaning": "Go at equal pace",
    "example": "The situation reminded everyone of the idiom 'keep up with'.",
    "usage": "Used to express: go at equal pace",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Flies Off At A Tangent",
    "meaning": "Start discussing something irrelevant",
    "example": "The situation reminded everyone of the idiom 'flies off at a tangent'.",
    "usage": "Used to express: start discussing something irrelevant",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Batten Down The",
    "meaning": "HATCHES",
    "example": "The situation reminded everyone of the idiom 'batten down the'.",
    "usage": "Used to express: hatches",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "All Might And Main",
    "meaning": "With full force",
    "example": "The situation reminded everyone of the idiom 'all might and main'.",
    "usage": "Used to express: with full force",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Red Herrings",
    "meaning": "Clues intended to distract or mislead / An",
    "example": "The situation reminded everyone of the idiom 'red herrings'.",
    "usage": "Used to express: clues intended to distract or mislead / an",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "hard"
  },
  {
    "idiom": "White Elephant",
    "meaning": "A costly but useless possession",
    "example": "The situation reminded everyone of the idiom 'white elephant'.",
    "usage": "Used to express: a costly but useless possession",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Look Sharp",
    "meaning": "Pay attention",
    "example": "The situation reminded everyone of the idiom 'look sharp'.",
    "usage": "Used to express: pay attention",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "Big Draw",
    "meaning": "Huge attraction",
    "example": "The situation reminded everyone of the idiom 'big draw'.",
    "usage": "Used to express: huge attraction",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Bear Down",
    "meaning": "To move quickly towards",
    "example": "The situation reminded everyone of the idiom 'bear down'.",
    "usage": "Used to express: to move quickly towards",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "At A Stretch",
    "meaning": "Continuously",
    "example": "The situation reminded everyone of the idiom 'at a stretch'.",
    "usage": "Used to express: continuously",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Know Beans About",
    "meaning": "SOMETHING",
    "example": "The situation reminded everyone of the idiom 'know beans about'.",
    "usage": "Used to express: something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Know The Ropes",
    "meaning": "Learn the procedures",
    "example": "The situation reminded everyone of the idiom 'know the ropes'.",
    "usage": "Used to express: learn the procedures",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Barking Up The Wrong",
    "meaning": "TREE",
    "example": "The situation reminded everyone of the idiom 'barking up the wrong'.",
    "usage": "Used to express: tree",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Swim",
    "meaning": "Well informed and up-to-date",
    "example": "The situation reminded everyone of the idiom 'in the swim'.",
    "usage": "Used to express: well informed and up-to-date",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Rub Up The Wrong Way",
    "meaning": "To irk or irritate someone",
    "example": "The situation reminded everyone of the idiom 'rub up the wrong way'.",
    "usage": "Used to express: to irk or irritate someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Add Fuel To The Fire",
    "meaning": "Worsen the situation",
    "example": "The situation reminded everyone of the idiom 'add fuel to the fire'.",
    "usage": "Used to express: worsen the situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Loop",
    "meaning": "Informed regularly",
    "example": "The situation reminded everyone of the idiom 'in the loop'.",
    "usage": "Used to express: informed regularly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Black Out",
    "meaning": "Lost consciousness",
    "example": "The situation reminded everyone of the idiom 'black out'.",
    "usage": "Used to express: lost consciousness",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Cut And Dry Method",
    "meaning": "Specific",
    "example": "The situation reminded everyone of the idiom 'cut and dry method'.",
    "usage": "Used to express: specific",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Back To The Drawing",
    "meaning": "BOARD",
    "example": "The situation reminded everyone of the idiom 'back to the drawing'.",
    "usage": "Used to express: board",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Air",
    "meaning": "Certain / Able to be firmly relied on to",
    "example": "The situation reminded everyone of the idiom 'in the air'.",
    "usage": "Used to express: certain / able to be firmly relied on to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "On The Same Page",
    "meaning": "Thinks in a similar way",
    "example": "The situation reminded everyone of the idiom 'on the same page'.",
    "usage": "Used to express: thinks in a similar way",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Pull No Punch",
    "meaning": "Speaks frankly",
    "example": "The situation reminded everyone of the idiom 'pull no punch'.",
    "usage": "Used to express: speaks frankly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Stand / Hold Your",
    "meaning": "GROUND",
    "example": "The situation reminded everyone of the idiom 'stand / hold your'.",
    "usage": "Used to express: ground",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Put Your Feet Down",
    "meaning": "Take a firm stand / To be very strict in opposing what somebody",
    "example": "The situation reminded everyone of the idiom 'put your feet down'.",
    "usage": "Used to express: take a firm stand / to be very strict in opposing what somebody",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Read Between The Line",
    "meaning": "To understand the inner meaning",
    "example": "The situation reminded everyone of the idiom 'read between the line'.",
    "usage": "Used to express: to understand the inner meaning",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To The Letter",
    "meaning": "Paying attention to every detail / Doing or",
    "example": "The situation reminded everyone of the idiom 'to the letter'.",
    "usage": "Used to express: paying attention to every detail / doing or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "In Dutch",
    "meaning": "In trouble",
    "example": "The situation reminded everyone of the idiom 'in dutch'.",
    "usage": "Used to express: in trouble",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Come To Light",
    "meaning": "Been revealed / To become known to",
    "example": "The situation reminded everyone of the idiom 'come to light'.",
    "usage": "Used to express: been revealed / to become known to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Around The Clock",
    "meaning": "Day and night",
    "example": "The situation reminded everyone of the idiom 'around the clock'.",
    "usage": "Used to express: day and night",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Balloon Goes Up",
    "meaning": "The situation turns unpleasant or serious",
    "example": "The situation reminded everyone of the idiom 'balloon goes up'.",
    "usage": "Used to express: the situation turns unpleasant or serious",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Watching Grass Grow",
    "meaning": "Very boring",
    "example": "The situation reminded everyone of the idiom 'watching grass grow'.",
    "usage": "Used to express: very boring",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Beyond The Pale",
    "meaning": "Outside commonly accepted standards",
    "example": "The situation reminded everyone of the idiom 'beyond the pale'.",
    "usage": "Used to express: outside commonly accepted standards",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Took After",
    "meaning": "Similar to / to look or behave like an older",
    "example": "The situation reminded everyone of the idiom 'took after'.",
    "usage": "Used to express: similar to / to look or behave like an older",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cool About Working",
    "meaning": "Not tense about working / Reading to",
    "example": "The situation reminded everyone of the idiom 'cool about working'.",
    "usage": "Used to express: not tense about working / reading to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Salad Days",
    "meaning": "Adolescence",
    "example": "The situation reminded everyone of the idiom 'salad days'.",
    "usage": "Used to express: adolescence",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "All Ears",
    "meaning": "Attentive",
    "example": "The situation reminded everyone of the idiom 'all ears'.",
    "usage": "Used to express: attentive",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Hold Water",
    "meaning": "With logical backing / To stand up to",
    "example": "The situation reminded everyone of the idiom 'hold water'.",
    "usage": "Used to express: with logical backing / to stand up to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Other Fish To Fry",
    "meaning": "Some important work to attend to",
    "example": "The situation reminded everyone of the idiom 'other fish to fry'.",
    "usage": "Used to express: some important work to attend to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Tell In A Nut Shell",
    "meaning": "In a brief manner / Summarize",
    "example": "The situation reminded everyone of the idiom 'to tell in a nut shell'.",
    "usage": "Used to express: in a brief manner / summarize",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "hard"
  },
  {
    "idiom": "A Close-Fisted Person",
    "meaning": "A miser",
    "example": "The situation reminded everyone of the idiom 'a close-fisted person'.",
    "usage": "Used to express: a miser",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "To Gather Roses Only",
    "meaning": "To seek all enjoyments of life",
    "example": "The situation reminded everyone of the idiom 'to gather roses only'.",
    "usage": "Used to express: to seek all enjoyments of life",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "A Black Sheep",
    "meaning": "A person with bad reputation",
    "example": "The situation reminded everyone of the idiom 'a black sheep'.",
    "usage": "Used to express: a person with bad reputation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "To Grease The Palm",
    "meaning": "To bribe",
    "example": "The situation reminded everyone of the idiom 'to grease the palm'.",
    "usage": "Used to express: to bribe",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "An About Turn",
    "meaning": "Complete change of opinion or situation",
    "example": "The situation reminded everyone of the idiom 'an about turn'.",
    "usage": "Used to express: complete change of opinion or situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make A Mockery",
    "meaning": "To make something seem ridiculous or",
    "example": "The situation reminded everyone of the idiom 'make a mockery'.",
    "usage": "Used to express: to make something seem ridiculous or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Eat Like A Horse",
    "meaning": "Eat a lot",
    "example": "The situation reminded everyone of the idiom 'eat like a horse'.",
    "usage": "Used to express: eat a lot",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Go To The Dogs",
    "meaning": "To be ruined",
    "example": "The situation reminded everyone of the idiom 'go to the dogs'.",
    "usage": "Used to express: to be ruined",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Pay On The Nail",
    "meaning": "Pay promptly / Payment without delay",
    "example": "The situation reminded everyone of the idiom 'pay on the nail'.",
    "usage": "Used to express: pay promptly / payment without delay",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "At Draggers Drawn",
    "meaning": "Enmity",
    "example": "The situation reminded everyone of the idiom 'at draggers drawn'.",
    "usage": "Used to express: enmity",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Break In",
    "meaning": "Force entry to a building",
    "example": "The situation reminded everyone of the idiom 'break in'.",
    "usage": "Used to express: force entry to a building",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Carve Out A Niche",
    "meaning": "To work harder in order to have",
    "example": "The situation reminded everyone of the idiom 'to carve out a niche'.",
    "usage": "Used to express: to work harder in order to have",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Second Thoughts",
    "meaning": "Reconsidering the original idea",
    "example": "The situation reminded everyone of the idiom 'second thoughts'.",
    "usage": "Used to express: reconsidering the original idea",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Average Out",
    "meaning": "Balance",
    "example": "The situation reminded everyone of the idiom 'average out'.",
    "usage": "Used to express: balance",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Floored",
    "meaning": "To surprise or confuse",
    "example": "The situation reminded everyone of the idiom 'floored'.",
    "usage": "Used to express: to surprise or confuse",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Give Way",
    "meaning": "Collapse",
    "example": "The situation reminded everyone of the idiom 'give way'.",
    "usage": "Used to express: collapse",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Tall Tales",
    "meaning": "Boasting",
    "example": "The situation reminded everyone of the idiom 'tall tales'.",
    "usage": "Used to express: boasting",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Backseat Driver",
    "meaning": "A person who gives unwanted advice",
    "example": "The situation reminded everyone of the idiom 'backseat driver'.",
    "usage": "Used to express: a person who gives unwanted advice",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "At Random",
    "meaning": "Without any aim or target",
    "example": "The situation reminded everyone of the idiom 'at random'.",
    "usage": "Used to express: without any aim or target",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Break Off",
    "meaning": "Suddenly stop",
    "example": "The situation reminded everyone of the idiom 'break off'.",
    "usage": "Used to express: suddenly stop",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Go Haywire",
    "meaning": "Become out of control",
    "example": "The situation reminded everyone of the idiom 'go haywire'.",
    "usage": "Used to express: become out of control",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Latch Onto",
    "meaning": "To promote",
    "example": "The situation reminded everyone of the idiom 'to latch onto'.",
    "usage": "Used to express: to promote",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Fight Shy Of",
    "meaning": "To avoid someone/ something",
    "example": "The situation reminded everyone of the idiom 'fight shy of'.",
    "usage": "Used to express: to avoid someone/ something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cock And Bull Story",
    "meaning": "Absurd an unbelievable story",
    "example": "The situation reminded everyone of the idiom 'cock and bull story'.",
    "usage": "Used to express: absurd an unbelievable story",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Be Down To Earth",
    "meaning": "To be realistic",
    "example": "The situation reminded everyone of the idiom 'to be down to earth'.",
    "usage": "Used to express: to be realistic",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Nick Of Time",
    "meaning": "Just in time",
    "example": "The situation reminded everyone of the idiom 'in the nick of time'.",
    "usage": "Used to express: just in time",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Shun Evil Company",
    "meaning": "To avoid or give up bad company",
    "example": "The situation reminded everyone of the idiom 'to shun evil company'.",
    "usage": "Used to express: to avoid or give up bad company",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Seamy Side",
    "meaning": "Unpleasant and immoral",
    "example": "The situation reminded everyone of the idiom 'seamy side'.",
    "usage": "Used to express: unpleasant and immoral",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "A Sacred Cow",
    "meaning": "A person never to be criticized",
    "example": "The situation reminded everyone of the idiom 'a sacred cow'.",
    "usage": "Used to express: a person never to be criticized",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Sail In The Same Boat",
    "meaning": "To be in same situation",
    "example": "The situation reminded everyone of the idiom 'sail in the same boat'.",
    "usage": "Used to express: to be in same situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Take The Bull By The",
    "meaning": "HORNS",
    "example": "The situation reminded everyone of the idiom 'take the bull by the'.",
    "usage": "Used to express: horns",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Shed Crocodile Tears",
    "meaning": "To pretend to be sympathetic",
    "example": "The situation reminded everyone of the idiom 'shed crocodile tears'.",
    "usage": "Used to express: to pretend to be sympathetic",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Be In A Quandary",
    "meaning": "In a confusing situation",
    "example": "The situation reminded everyone of the idiom 'to be in a quandary'.",
    "usage": "Used to express: in a confusing situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Take French Leave",
    "meaning": "Absenting oneself without permission",
    "example": "The situation reminded everyone of the idiom 'take french leave'.",
    "usage": "Used to express: absenting oneself without permission",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put In A Nutshell",
    "meaning": "To state something very concisely",
    "example": "The situation reminded everyone of the idiom 'to put in a nutshell'.",
    "usage": "Used to express: to state something very concisely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "The Genomes Of Zurich",
    "meaning": "A slang term for Swiss bankers",
    "example": "The situation reminded everyone of the idiom 'the genomes of zurich'.",
    "usage": "Used to express: a slang term for swiss bankers",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "In Two Minds",
    "meaning": "To be undecided",
    "example": "The situation reminded everyone of the idiom 'in two minds'.",
    "usage": "Used to express: to be undecided",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Put Something By",
    "meaning": "To save money for a particular purpose",
    "example": "The situation reminded everyone of the idiom 'put something by'.",
    "usage": "Used to express: to save money for a particular purpose",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "On Cloud Nine",
    "meaning": "Extremely happy",
    "example": "The situation reminded everyone of the idiom 'on cloud nine'.",
    "usage": "Used to express: extremely happy",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "The Jury Is Out",
    "meaning": "No decision has been reached",
    "example": "The situation reminded everyone of the idiom 'the jury is out'.",
    "usage": "Used to express: no decision has been reached",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Have A Finger In Every",
    "meaning": "PIE",
    "example": "The situation reminded everyone of the idiom 'have a finger in every'.",
    "usage": "Used to express: pie",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take After",
    "meaning": "To resemble an older member of family",
    "example": "The situation reminded everyone of the idiom 'to take after'.",
    "usage": "Used to express: to resemble an older member of family",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Flying Visit",
    "meaning": "Very short visit",
    "example": "The situation reminded everyone of the idiom 'flying visit'.",
    "usage": "Used to express: very short visit",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Telling Upon",
    "meaning": "Showing effectively / Having strong effect",
    "example": "The situation reminded everyone of the idiom 'telling upon'.",
    "usage": "Used to express: showing effectively / having strong effect",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Kith And Kin",
    "meaning": "Relatives",
    "example": "The situation reminded everyone of the idiom 'kith and kin'.",
    "usage": "Used to express: relatives",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Take Fancy",
    "meaning": "To attract or please somebody",
    "example": "The situation reminded everyone of the idiom 'take fancy'.",
    "usage": "Used to express: to attract or please somebody",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Snake In The Grass",
    "meaning": "A hidden enemy",
    "example": "The situation reminded everyone of the idiom 'snake in the grass'.",
    "usage": "Used to express: a hidden enemy",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Make A Mountain Of A",
    "meaning": "MOLE HILL",
    "example": "The situation reminded everyone of the idiom 'make a mountain of a'.",
    "usage": "Used to express: mole hill",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Spill The Beans",
    "meaning": "Reveal the secret information",
    "example": "The situation reminded everyone of the idiom 'spill the beans'.",
    "usage": "Used to express: reveal the secret information",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Make Amends For",
    "meaning": "Compensate the loss",
    "example": "The situation reminded everyone of the idiom 'make amends for'.",
    "usage": "Used to express: compensate the loss",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Leave High And Dry",
    "meaning": "In a difficult situation without help or",
    "example": "The situation reminded everyone of the idiom 'leave high and dry'.",
    "usage": "Used to express: in a difficult situation without help or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make Believe",
    "meaning": "To pretend that something is true",
    "example": "The situation reminded everyone of the idiom 'make believe'.",
    "usage": "Used to express: to pretend that something is true",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Keep A Level Head",
    "meaning": "To remain calm and sensible in a difficult",
    "example": "The situation reminded everyone of the idiom 'keep a level head'.",
    "usage": "Used to express: to remain calm and sensible in a difficult",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Under The Weather",
    "meaning": "Sick",
    "example": "The situation reminded everyone of the idiom 'under the weather'.",
    "usage": "Used to express: sick",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "At Loggerheads",
    "meaning": "In strong disagreement",
    "example": "The situation reminded everyone of the idiom 'at loggerheads'.",
    "usage": "Used to express: in strong disagreement",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Go Dutch",
    "meaning": "Divide the cost",
    "example": "The situation reminded everyone of the idiom 'go dutch'.",
    "usage": "Used to express: divide the cost",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "Alma Mater",
    "meaning": "Institution where one got education",
    "example": "The situation reminded everyone of the idiom 'alma mater'.",
    "usage": "Used to express: institution where one got education",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "A Closefisted Man",
    "meaning": "A miser",
    "example": "The situation reminded everyone of the idiom 'a closefisted man'.",
    "usage": "Used to express: a miser",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "As Daft As A Brush",
    "meaning": "Very silly",
    "example": "The situation reminded everyone of the idiom 'as daft as a brush'.",
    "usage": "Used to express: very silly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Rise With The Lark",
    "meaning": "Get up early / To get out of bed very early",
    "example": "The situation reminded everyone of the idiom 'rise with the lark'.",
    "usage": "Used to express: get up early / to get out of bed very early",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Make A Beeline",
    "meaning": "Rush / To go straight towards something",
    "example": "The situation reminded everyone of the idiom 'make a beeline'.",
    "usage": "Used to express: rush / to go straight towards something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "A Man Of Letters",
    "meaning": "A literary person",
    "example": "The situation reminded everyone of the idiom 'a man of letters'.",
    "usage": "Used to express: a literary person",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Horse Sense",
    "meaning": "Basic common sense",
    "example": "The situation reminded everyone of the idiom 'horse sense'.",
    "usage": "Used to express: basic common sense",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Shot In The Arm",
    "meaning": "Something that gives encouragement",
    "example": "Fresh investment would provide the shot in the arm that this industry so badly needs",
    "usage": "Used to express: something that gives encouragement",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Catch Time By The",
    "meaning": "FORELOCK",
    "example": "The situation reminded everyone of the idiom 'catch time by the'.",
    "usage": "Used to express: forelock",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Get On Nerves",
    "meaning": "Annoying",
    "example": "The situation reminded everyone of the idiom 'get on nerves'.",
    "usage": "Used to express: annoying",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Clean Hands",
    "meaning": "Innocent",
    "example": "The situation reminded everyone of the idiom 'clean hands'.",
    "usage": "Used to express: innocent",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "A Golden Mean",
    "meaning": "Middle course between two extremes",
    "example": "The situation reminded everyone of the idiom 'a golden mean'.",
    "usage": "Used to express: middle course between two extremes",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Vexed Question",
    "meaning": "Controversial issue",
    "example": "The situation reminded everyone of the idiom 'vexed question'.",
    "usage": "Used to express: controversial issue",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Keep The Wolf Away From",
    "meaning": "THE DOOR",
    "example": "The situation reminded everyone of the idiom 'keep the wolf away from'.",
    "usage": "Used to express: the door",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Out Of Sorts",
    "meaning": "Ill or sick / Upset",
    "example": "The situation reminded everyone of the idiom 'out of sorts'.",
    "usage": "Used to express: ill or sick / upset",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Gut Feeling",
    "meaning": "Strong instinct (based on feelings and",
    "example": "The situation reminded everyone of the idiom 'gut feeling'.",
    "usage": "Used to express: strong instinct (based on feelings and",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "easy"
  },
  {
    "idiom": "Finish With Something",
    "meaning": "Be through / To have something at the",
    "example": "The situation reminded everyone of the idiom 'finish with something'.",
    "usage": "Used to express: be through / to have something at the",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Close Fisted Man",
    "meaning": "Miser",
    "example": "The situation reminded everyone of the idiom 'a close fisted man'.",
    "usage": "Used to express: miser",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "To Set The Thames On",
    "meaning": "FIRE",
    "example": "The situation reminded everyone of the idiom 'to set the thames on'.",
    "usage": "Used to express: fire",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Play Ducks And Drakes",
    "meaning": "Spend lavishly / To waste or squander",
    "example": "The situation reminded everyone of the idiom 'play ducks and drakes'.",
    "usage": "Used to express: spend lavishly / to waste or squander",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Be Taken Aback",
    "meaning": "Shocked or surprised",
    "example": "The situation reminded everyone of the idiom 'be taken aback'.",
    "usage": "Used to express: shocked or surprised",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
{
    "idiom": "Lay It On Thick",
    "meaning": "An exaggeration / To talk about somebody",
    "example": "The examiner used 'lay it on thick' in the sentence to test students.",
    "usage": "Used to express: an exaggeration / to talk about somebody",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Win Laurels",
    "meaning": "To earn great prestige",
    "example": "The two, who have won many laurels for the country by winning medals in the Commonwealth, Asian and World championships, exhorted the students to focus on physical fitness.",
    "usage": "Used to express: to earn great prestige",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Soup",
    "meaning": "To be in trouble",
    "example": "The examiner used 'in the soup' in the sentence to test students.",
    "usage": "Used to express: to be in trouble",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Draw The Line",
    "meaning": "To set a limit",
    "example": "The examiner used 'draw the line' in the sentence to test students.",
    "usage": "Used to express: to set a limit",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Bee Hive",
    "meaning": "A busy place",
    "example": "The examiner used 'a bee hive' in the sentence to test students.",
    "usage": "Used to express: a busy place",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Cut The Gordian Knot",
    "meaning": "To perform a difficult task",
    "example": "The examiner used 'to cut the gordian knot' in the sentence to test students.",
    "usage": "Used to express: to perform a difficult task",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Take A French Leave",
    "meaning": "Being absent without permission",
    "example": "The examiner used 'take a french leave' in the sentence to test students.",
    "usage": "Used to express: being absent without permission",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Arm-Chair Critic",
    "meaning": "A person who give advice based on theory",
    "example": "The examiner used 'arm-chair critic' in the sentence to test students.",
    "usage": "Used to express: a person who give advice based on theory",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "A Chip Of The Old Block",
    "meaning": "An experienced old man",
    "example": "The examiner used 'a chip of the old block' in the sentence to test students.",
    "usage": "Used to express: an experienced old man",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Feather Your Nest",
    "meaning": "To make yourself richer, especially by",
    "example": "The examiner used 'feather your nest' in the sentence to test students.",
    "usage": "Used to express: to make yourself richer, especially by",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "Throw Up Cards",
    "meaning": "To give in / To blow away the plan",
    "example": "The examiner used 'throw up cards' in the sentence to test students.",
    "usage": "Used to express: to give in / to blow away the plan",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Vote With Your Feet",
    "meaning": "Showing your disapproval",
    "example": "The examiner used 'vote with your feet' in the sentence to test students.",
    "usage": "Used to express: showing your disapproval",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Dog In A Manger",
    "meaning": "A selfish person",
    "example": "The examiner used 'dog in a manger' in the sentence to test students.",
    "usage": "Used to express: a selfish person",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Chapter And Verse",
    "meaning": "Providing minutes details",
    "example": "The examiner used 'chapter and verse' in the sentence to test students.",
    "usage": "Used to express: providing minutes details",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Bring Down The House",
    "meaning": "Amuse the audience greatly / To make",
    "example": "The examiner used 'bring down the house' in the sentence to test students.",
    "usage": "Used to express: amuse the audience greatly / to make",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Give A Wide Berth To",
    "meaning": "To stay away from or avoid someone",
    "example": "The examiner used 'give a wide berth to' in the sentence to test students.",
    "usage": "Used to express: to stay away from or avoid someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Beside The Mark",
    "meaning": "Irrelevant / Not to be accurate",
    "example": "The examiner used 'beside the mark' in the sentence to test students.",
    "usage": "Used to express: irrelevant / not to be accurate",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Give Away",
    "meaning": "To distribute something",
    "example": "The examiner used 'give away' in the sentence to test students.",
    "usage": "Used to express: to distribute something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Show A Clean A Pair Of",
    "meaning": "HEELS",
    "example": "The examiner used 'show a clean a pair of' in the sentence to test students.",
    "usage": "Used to express: heels",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Up To The Mark",
    "meaning": "According to the required standard",
    "example": "The examiner used 'up to the mark' in the sentence to test students.",
    "usage": "Used to express: according to the required standard",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Sit On The Fence",
    "meaning": "To avoid becoming involved in deciding or",
    "example": "The examiner used 'sit on the fence' in the sentence to test students.",
    "usage": "Used to express: to avoid becoming involved in deciding or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Shake Off",
    "meaning": "Forget / To get away from somebody who",
    "example": "The examiner used 'shake off' in the sentence to test students.",
    "usage": "Used to express: forget / to get away from somebody who",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pull A Long Face",
    "meaning": "Look dejected / An unhappy or",
    "example": "The examiner used 'pull a long face' in the sentence to test students.",
    "usage": "Used to express: look dejected / an unhappy or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cat-Nap",
    "meaning": "Short sleep",
    "example": "The examiner used 'cat-nap' in the sentence to test students.",
    "usage": "Used to express: short sleep",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "To Pull A Long Face",
    "meaning": "Look sad",
    "example": "The examiner used 'to pull a long face' in the sentence to test students.",
    "usage": "Used to express: look sad",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Fit Like A Glove",
    "meaning": "Perfectly",
    "example": "The examiner used 'fit like a glove' in the sentence to test students.",
    "usage": "Used to express: perfectly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Gate Crasher",
    "meaning": "Uninvited guest",
    "example": "The examiner used 'gate crasher' in the sentence to test students.",
    "usage": "Used to express: uninvited guest",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Angle",
    "meaning": "To fish",
    "example": "The examiner used 'to angle' in the sentence to test students.",
    "usage": "Used to express: to fish",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "For All Intents And",
    "meaning": "PURPOSES",
    "example": "The examiner used 'for all intents and' in the sentence to test students.",
    "usage": "Used to express: purposes",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Running",
    "meaning": "Has good prospects in competition",
    "example": "The examiner used 'in the running' in the sentence to test students.",
    "usage": "Used to express: has good prospects in competition",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make Room",
    "meaning": "Make space",
    "example": "The examiner used 'make room' in the sentence to test students.",
    "usage": "Used to express: make space",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Beggar Description",
    "meaning": "Cannot be described",
    "example": "The examiner used 'beggar description' in the sentence to test students.",
    "usage": "Used to express: cannot be described",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Hope Against Hope",
    "meaning": "Nurture an impossible hope",
    "example": "The examiner used 'hope against hope' in the sentence to test students.",
    "usage": "Used to express: nurture an impossible hope",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "For Keeps",
    "meaning": "Forever",
    "example": "The examiner used 'for keeps' in the sentence to test students.",
    "usage": "Used to express: forever",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Paled Into",
    "meaning": "INSIGNIFICANCE",
    "example": "The examiner used 'paled into' in the sentence to test students.",
    "usage": "Used to express: insignificance",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "With One Voice",
    "meaning": "Unanimously",
    "example": "The examiner used 'with one voice' in the sentence to test students.",
    "usage": "Used to express: unanimously",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Make It Light",
    "meaning": "Treat lightly",
    "example": "The examiner used 'make it light' in the sentence to test students.",
    "usage": "Used to express: treat lightly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Every Inch A Gentleman",
    "meaning": "Entirely",
    "example": "The examiner used 'every inch a gentleman' in the sentence to test students.",
    "usage": "Used to express: entirely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Catch A Tartar",
    "meaning": "A rough, violent, troublesome person",
    "example": "The examiner used 'catch a tartar' in the sentence to test students.",
    "usage": "Used to express: a rough, violent, troublesome person",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take To Heart",
    "meaning": "To be greatly affected",
    "example": "The examiner used 'to take to heart' in the sentence to test students.",
    "usage": "Used to express: to be greatly affected",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "All Moon Shine",
    "meaning": "Far from reality",
    "example": "The examiner used 'all moon shine' in the sentence to test students.",
    "usage": "Used to express: far from reality",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Call On",
    "meaning": "Pay a visit",
    "example": "The examiner used 'call on' in the sentence to test students.",
    "usage": "Used to express: pay a visit",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "Fish Out Of Water",
    "meaning": "An uncomfortable position",
    "example": "The examiner used 'fish out of water' in the sentence to test students.",
    "usage": "Used to express: an uncomfortable position",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Be Down With",
    "meaning": "Suffering from",
    "example": "The examiner used 'be down with' in the sentence to test students.",
    "usage": "Used to express: suffering from",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Fair-Weather Friend",
    "meaning": "Supports only when easy and convenient",
    "example": "The examiner used 'fair-weather friend' in the sentence to test students.",
    "usage": "Used to express: supports only when easy and convenient",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Pull Together",
    "meaning": "Work harmoniously",
    "example": "The examiner used 'pull together' in the sentence to test students.",
    "usage": "Used to express: work harmoniously",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Bury The Hatchet",
    "meaning": "To make peace",
    "example": "The examiner used 'to bury the hatchet' in the sentence to test students.",
    "usage": "Used to express: to make peace",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Selling Like Hot Cakes",
    "meaning": "To have a very good sale",
    "example": "The examiner used 'selling like hot cakes' in the sentence to test students.",
    "usage": "Used to express: to have a very good sale",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Scot Free",
    "meaning": "Unpunished",
    "example": "The examiner used 'scot free' in the sentence to test students.",
    "usage": "Used to express: unpunished",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Give Oneself Airs",
    "meaning": "Behave arrogantly",
    "example": "The examiner used 'to give oneself airs' in the sentence to test students.",
    "usage": "Used to express: behave arrogantly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Eat Humble Pie",
    "meaning": "To yield under humiliating circumstances",
    "example": "The examiner used 'to eat humble pie' in the sentence to test students.",
    "usage": "Used to express: to yield under humiliating circumstances",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Spill The Beans",
    "meaning": "To reveal a secret",
    "example": "The examiner used 'to spill the beans' in the sentence to test students.",
    "usage": "Used to express: to reveal a secret",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Drive Home",
    "meaning": "Emphasise",
    "example": "The examiner used 'drive home' in the sentence to test students.",
    "usage": "Used to express: emphasise",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Left Hand Compliment",
    "meaning": "An ambiguous compliment",
    "example": "The examiner used 'a left hand compliment' in the sentence to test students.",
    "usage": "Used to express: an ambiguous compliment",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cut A Sorry Figure",
    "meaning": "Make a poor impression",
    "example": "The examiner used 'cut a sorry figure' in the sentence to test students.",
    "usage": "Used to express: make a poor impression",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "To Get Cold Feet",
    "meaning": "Fear",
    "example": "The examiner used 'to get cold feet' in the sentence to test students.",
    "usage": "Used to express: fear",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "On Tenterhooks",
    "meaning": "In suspense and anxiety",
    "example": "The examiner used 'on tenterhooks' in the sentence to test students.",
    "usage": "Used to express: in suspense and anxiety",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Cuckoo In The Nest",
    "meaning": "An unwelcomed intruder",
    "example": "The examiner used 'a cuckoo in the nest' in the sentence to test students.",
    "usage": "Used to express: an unwelcomed intruder",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A House Of Cards",
    "meaning": "An insecure scheme",
    "example": "The examiner used 'a house of cards' in the sentence to test students.",
    "usage": "Used to express: an insecure scheme",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Old Head On Young",
    "meaning": "SHOULDER",
    "example": "The examiner used 'old head on young' in the sentence to test students.",
    "usage": "Used to express: shoulder",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Hard Of Hearing",
    "meaning": "To be deaf",
    "example": "The examiner used 'hard of hearing' in the sentence to test students.",
    "usage": "Used to express: to be deaf",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Burn Your Boats",
    "meaning": "Do something that makes it impossible to",
    "example": "The examiner used 'burn your boats' in the sentence to test students.",
    "usage": "Used to express: do something that makes it impossible to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Dressing-Down",
    "meaning": "To give scolding",
    "example": "The examiner used 'dressing-down' in the sentence to test students.",
    "usage": "Used to express: to give scolding",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Throw Cold Water",
    "meaning": "Discourage",
    "example": "The examiner used 'throw cold water' in the sentence to test students.",
    "usage": "Used to express: discourage",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Butt In",
    "meaning": "Interrupt",
    "example": "The examiner used 'butt in' in the sentence to test students.",
    "usage": "Used to express: interrupt",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Couch Potato",
    "meaning": "A person who prefers to watch television",
    "example": "The examiner used 'couch potato' in the sentence to test students.",
    "usage": "Used to express: a person who prefers to watch television",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Carry The Ball",
    "meaning": "Be in charge",
    "example": "The examiner used 'carry the ball' in the sentence to test students.",
    "usage": "Used to express: be in charge",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cap In Hand",
    "meaning": "In a respectful manner",
    "example": "The examiner used 'cap in hand' in the sentence to test students.",
    "usage": "Used to express: in a respectful manner",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Blues",
    "meaning": "Cheerless and depressed",
    "example": "The examiner used 'in the blues' in the sentence to test students.",
    "usage": "Used to express: cheerless and depressed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "At Sea",
    "meaning": "Confused",
    "example": "The examiner used 'at sea' in the sentence to test students.",
    "usage": "Used to express: confused",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Straw In The Wind",
    "meaning": "An indication of what might happen",
    "example": "The examiner used 'straw in the wind' in the sentence to test students.",
    "usage": "Used to express: an indication of what might happen",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Curry Favours",
    "meaning": "Seek favourable attention",
    "example": "The examiner used 'curry favours' in the sentence to test students.",
    "usage": "Used to express: seek favourable attention",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Call In Question",
    "meaning": "Challenge",
    "example": "The examiner used 'call in question' in the sentence to test students.",
    "usage": "Used to express: challenge",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Put Up The Shutters",
    "meaning": "Go out of business",
    "example": "The examiner used 'put up the shutters' in the sentence to test students.",
    "usage": "Used to express: go out of business",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Drop In A Bucket",
    "meaning": "A very insignificant amount",
    "example": "The examiner used 'a drop in a bucket' in the sentence to test students.",
    "usage": "Used to express: a very insignificant amount",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Draw A Blank",
    "meaning": "Find no favour",
    "example": "The examiner used 'draw a blank' in the sentence to test students.",
    "usage": "Used to express: find no favour",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep In Abeyance",
    "meaning": "In a state of suspension",
    "example": "The examiner used 'to keep in abeyance' in the sentence to test students.",
    "usage": "Used to express: in a state of suspension",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Be In A Fix",
    "meaning": "In a difficult situation",
    "example": "The examiner used 'to be in a fix' in the sentence to test students.",
    "usage": "Used to express: in a difficult situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Evening Of Life",
    "meaning": "Old age",
    "example": "The examiner used 'evening of life' in the sentence to test students.",
    "usage": "Used to express: old age",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Cock And Bull Stories",
    "meaning": "Absurd and unlikely stories",
    "example": "The examiner used 'cock and bull stories' in the sentence to test students.",
    "usage": "Used to express: absurd and unlikely stories",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "A Live Wire",
    "meaning": "Lively and active",
    "example": "The examiner used 'a live wire' in the sentence to test students.",
    "usage": "Used to express: lively and active",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Capital Punishment",
    "meaning": "Death sentence",
    "example": "The examiner used 'capital punishment' in the sentence to test students.",
    "usage": "Used to express: death sentence",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Leaps And Bounds",
    "meaning": "Rapidly",
    "example": "The examiner used 'leaps and bounds' in the sentence to test students.",
    "usage": "Used to express: rapidly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Leave No Stone",
    "meaning": "UNTURNED",
    "example": "The examiner used 'leave no stone' in the sentence to test students.",
    "usage": "Used to express: unturned",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Bear In Mind",
    "meaning": "Remembe",
    "example": "The examiner used 'bear in mind' in the sentence to test students.",
    "usage": "Used to express: remembe",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Nip In The Bud",
    "meaning": "To stop something in the starting",
    "example": "The examiner used 'to nip in the bud' in the sentence to test students.",
    "usage": "Used to express: to stop something in the starting",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hold Up",
    "meaning": "Delay",
    "example": "The examiner used 'hold up' in the sentence to test students.",
    "usage": "Used to express: delay",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Play Fast And Loose",
    "meaning": "To act in an unreliable way",
    "example": "The examiner used 'to play fast and loose' in the sentence to test students.",
    "usage": "Used to express: to act in an unreliable way",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pull A Fast One",
    "meaning": "Play a trick",
    "example": "The examiner used 'pull a fast one' in the sentence to test students.",
    "usage": "Used to express: play a trick",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Grease The Palm",
    "meaning": "To bribe",
    "example": "The examiner used 'grease the palm' in the sentence to test students.",
    "usage": "Used to express: to bribe",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn-Turtle",
    "meaning": "Complete over-turn of a situation",
    "example": "The examiner used 'turn-turtle' in the sentence to test students.",
    "usage": "Used to express: complete over-turn of a situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Gentleman At Large",
    "meaning": "A man without a job",
    "example": "The examiner used 'a gentleman at large' in the sentence to test students.",
    "usage": "Used to express: a man without a job",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Lose Face",
    "meaning": "Become embarrassed",
    "example": "The examiner used 'lose face' in the sentence to test students.",
    "usage": "Used to express: become embarrassed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Build Castle In The Air",
    "meaning": "Day dreaming",
    "example": "The examiner used 'build castle in the air' in the sentence to test students.",
    "usage": "Used to express: day dreaming",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Fall Back On",
    "meaning": "Resort to something",
    "example": "The examiner used 'fall back on' in the sentence to test students.",
    "usage": "Used to express: resort to something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Go To Rack And Ruin",
    "meaning": "Get into a bad condition",
    "example": "The examiner used 'go to rack and ruin' in the sentence to test students.",
    "usage": "Used to express: get into a bad condition",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Bite The Dust",
    "meaning": "Suffer a defeat",
    "example": "The examiner used 'bite the dust' in the sentence to test students.",
    "usage": "Used to express: suffer a defeat",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "The Seamy Side",
    "meaning": "Unpleasant aspect",
    "example": "The examiner used 'the seamy side' in the sentence to test students.",
    "usage": "Used to express: unpleasant aspect",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Too Many Chiefs And Not",
    "meaning": "ENOUGH INDIANS",
    "example": "The examiner used 'too many chiefs and not' in the sentence to test students.",
    "usage": "Used to express: enough indians",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Throw In The Towel",
    "meaning": "Acknowledge defeat",
    "example": "The examiner used 'throw in the towel' in the sentence to test students.",
    "usage": "Used to express: acknowledge defeat",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "A Storm In A Teacup",
    "meaning": "Big fuss over a small matter",
    "example": "The examiner used 'a storm in a teacup' in the sentence to test students.",
    "usage": "Used to express: big fuss over a small matter",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Blue-Blooded",
    "meaning": "Of noble birth",
    "example": "The examiner used 'blue-blooded' in the sentence to test students.",
    "usage": "Used to express: of noble birth",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Do A Roaring Trade",
    "meaning": "Highly successful",
    "example": "The examiner used 'do a roaring trade' in the sentence to test students.",
    "usage": "Used to express: highly successful",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep Body And Soul",
    "meaning": "TOGETHER",
    "example": "The examiner used 'keep body and soul' in the sentence to test students.",
    "usage": "Used to express: together",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Will-O-The-Wisp",
    "meaning": "Unreal Imagining",
    "example": "The examiner used 'will-o-the-wisp' in the sentence to test students.",
    "usage": "Used to express: unreal imagining",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cloak-And-Dagger",
    "meaning": "An activity that involves mystery and",
    "example": "The examiner used 'cloak-and-dagger' in the sentence to test students.",
    "usage": "Used to express: an activity that involves mystery and",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Palm Off",
    "meaning": "To dispose off with the intent to deceive",
    "example": "The examiner used 'palm off' in the sentence to test students.",
    "usage": "Used to express: to dispose off with the intent to deceive",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "From Stem To Stern",
    "meaning": "All the way from the front of a ship to",
    "example": "The examiner used 'from stem to stern' in the sentence to test students.",
    "usage": "Used to express: all the way from the front of a ship to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Over-Egg The Pudding",
    "meaning": "Add unnecessary details to make",
    "example": "The examiner used 'over-egg the pudding' in the sentence to test students.",
    "usage": "Used to express: add unnecessary details to make",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn Over A New Leaf",
    "meaning": "Change ones behavior for the better",
    "example": "The examiner used 'turn over a new leaf' in the sentence to test students.",
    "usage": "Used to express: change ones behavior for the better",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Take Up The Hatchet",
    "meaning": "Prepare for or go to war",
    "example": "The examiner used 'take up the hatchet' in the sentence to test students.",
    "usage": "Used to express: prepare for or go to war",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "At Loose Ends",
    "meaning": "In an uncertain situation",
    "example": "The examiner used 'at loose ends' in the sentence to test students.",
    "usage": "Used to express: in an uncertain situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "With Might And Main",
    "meaning": "With full force",
    "example": "The examiner used 'with might and main' in the sentence to test students.",
    "usage": "Used to express: with full force",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cut Short",
    "meaning": "Interrupt",
    "example": "The examiner used 'cut short' in the sentence to test students.",
    "usage": "Used to express: interrupt",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Laughing Stock",
    "meaning": "An object of laughter",
    "example": "The examiner used 'a laughing stock' in the sentence to test students.",
    "usage": "Used to express: an object of laughter",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Have A Foot In The Grave",
    "meaning": "Be close to death",
    "example": "The examiner used 'have a foot in the grave' in the sentence to test students.",
    "usage": "Used to express: be close to death",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "hard"
  },
  {
    "idiom": "A Hornet'S Nest",
    "meaning": "An unpleasant situation",
    "example": "The examiner used 'a hornet's nest' in the sentence to test students.",
    "usage": "Used to express: an unpleasant situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Roll Out The Carpet",
    "meaning": "To give a grand party",
    "example": "The examiner used 'to roll out the carpet' in the sentence to test students.",
    "usage": "Used to express: to give a grand party",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have An Axe To Grind",
    "meaning": "To have a selfish end to serve",
    "example": "The examiner used 'to have an axe to grind' in the sentence to test students.",
    "usage": "Used to express: to have a selfish end to serve",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "God'S Acre",
    "meaning": "A cemetery besides Church",
    "example": "The examiner used 'god's acre' in the sentence to test students.",
    "usage": "Used to express: a cemetery besides church",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Wrangle Over An Ass",
    "meaning": "SHADOW",
    "example": "The examiner used 'wrangle over an ass' in the sentence to test students.",
    "usage": "Used to express: shadow",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put One'S Hand To",
    "meaning": "PLOUGH",
    "example": "The examiner used 'to put one's hand to' in the sentence to test students.",
    "usage": "Used to express: plough",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Pick Holes",
    "meaning": "To criticize someone",
    "example": "The examiner used 'to pick holes' in the sentence to test students.",
    "usage": "Used to express: to criticize someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Swept Under The Rug",
    "meaning": "Concealed from others",
    "example": "The examiner used 'swept under the rug' in the sentence to test students.",
    "usage": "Used to express: concealed from others",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "With A Fine-Tooth Comb",
    "meaning": "Carefully",
    "example": "The examiner used 'with a fine-tooth comb' in the sentence to test students.",
    "usage": "Used to express: carefully",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Stave Off",
    "meaning": "Delay",
    "example": "The examiner used 'stave off' in the sentence to test students.",
    "usage": "Used to express: delay",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Full Of Beans",
    "meaning": "Energetic",
    "example": "The examiner used 'full of beans' in the sentence to test students.",
    "usage": "Used to express: energetic",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "At Sixes And Sevens",
    "meaning": "Confused",
    "example": "The examiner used 'at sixes and sevens' in the sentence to test students.",
    "usage": "Used to express: confused",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Dog Eat Dog",
    "meaning": "Ruthlessly competitive",
    "example": "The examiner used 'dog eat dog' in the sentence to test students.",
    "usage": "Used to express: ruthlessly competitive",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Fits And Start",
    "meaning": "Unsteady",
    "example": "The examiner used 'fits and start' in the sentence to test students.",
    "usage": "Used to express: unsteady",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In Harness",
    "meaning": "In office",
    "example": "The examiner used 'in harness' in the sentence to test students.",
    "usage": "Used to express: in office",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Between Horns Of",
    "meaning": "DILEMMA",
    "example": "The examiner used 'between horns of' in the sentence to test students.",
    "usage": "Used to express: dilemma",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Red Tape",
    "meaning": "Official procedures causing delay",
    "example": "The examiner used 'red tape' in the sentence to test students.",
    "usage": "Used to express: official procedures causing delay",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Square Peg In A Round",
    "meaning": "HOLE",
    "example": "The examiner used 'square peg in a round' in the sentence to test students.",
    "usage": "Used to express: hole",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Eat One'S Own Words",
    "meaning": "Forced to retract one's own statement",
    "example": "The examiner used 'to eat one's own words' in the sentence to test students.",
    "usage": "Used to express: forced to retract one's own statement",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Steal Someone'S Thunder",
    "meaning": "To take credit of something someone",
    "example": "The examiner used 'steal someone's thunder' in the sentence to test students.",
    "usage": "Used to express: to take credit of something someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Going Against The Grain",
    "meaning": "Doing things differently from what one",
    "example": "The examiner used 'going against the grain' in the sentence to test students.",
    "usage": "Used to express: doing things differently from what one",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Pull A Rabbit Out Of A Hat",
    "meaning": "To do something unexpected",
    "example": "The examiner used 'pull a rabbit out of a hat' in the sentence to test students.",
    "usage": "Used to express: to do something unexpected",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Let The Chips Fall",
    "meaning": "WHEREVER THEY MAY",
    "example": "The examiner used 'let the chips fall' in the sentence to test students.",
    "usage": "Used to express: wherever they may",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Whole Bag Of Tricks",
    "meaning": "Make use of all the possibilities or",
    "example": "The examiner used 'whole bag of tricks' in the sentence to test students.",
    "usage": "Used to express: make use of all the possibilities or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn A Blind Eye",
    "meaning": "To ignore situation, facts or reality",
    "example": "The examiner used 'turn a blind eye' in the sentence to test students.",
    "usage": "Used to express: to ignore situation, facts or reality",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Make A Long Story Short",
    "meaning": "To be precise and avoid giving the",
    "example": "The examiner used 'make a long story short' in the sentence to test students.",
    "usage": "Used to express: to be precise and avoid giving the",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Kill Two Birds With One",
    "meaning": "STONE",
    "example": "The examiner used 'to kill two birds with one' in the sentence to test students.",
    "usage": "Used to express: stone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "Pound The Pavement",
    "meaning": "Hunt for a job on the street",
    "example": "The examiner used 'pound the pavement' in the sentence to test students.",
    "usage": "Used to express: hunt for a job on the street",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "To Stick To One'S Guns",
    "meaning": "To be faithful to a cause",
    "example": "The examiner used 'to stick to one's guns' in the sentence to test students.",
    "usage": "Used to express: to be faithful to a cause",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Whole Nine Yards",
    "meaning": "Everything",
    "example": "The examiner used 'whole nine yards' in the sentence to test students.",
    "usage": "Used to express: everything",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Bite One'S Lips",
    "meaning": "To get angry",
    "example": "The examiner used 'to bite one's lips' in the sentence to test students.",
    "usage": "Used to express: to get angry",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Zero Tolerance",
    "meaning": "Non-acceptance of antisocial behavior",
    "example": "The examiner used 'zero tolerance' in the sentence to test students.",
    "usage": "Used to express: non-acceptance of antisocial behavior",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Variety Is The Spice Of Life",
    "meaning": "New experiences make life more",
    "example": "The examiner used 'variety is the spice of life' in the sentence to test students.",
    "usage": "Used to express: new experiences make life more",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "hard"
  },
  {
    "idiom": "Scotfree",
    "meaning": "Without suffering any punishment",
    "example": "The examiner used 'scotfree' in the sentence to test students.",
    "usage": "Used to express: without suffering any punishment",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Tongue In Cheek",
    "meaning": "In an insincere way",
    "example": "The examiner used 'tongue in cheek' in the sentence to test students.",
    "usage": "Used to express: in an insincere way",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Wear Your Heart On Your",
    "meaning": "SLEEVE",
    "example": "The examiner used 'wear your heart on your' in the sentence to test students.",
    "usage": "Used to express: sleeve",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "A Slap On The Wrist",
    "meaning": "A mild punishment",
    "example": "The examiner used 'a slap on the wrist' in the sentence to test students.",
    "usage": "Used to express: a mild punishment",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Action Speaks Louder",
    "meaning": "THAN WORDS",
    "example": "The examiner used 'action speaks louder' in the sentence to test students.",
    "usage": "Used to express: than words",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "A Blessing In Disguise",
    "meaning": "A misfortune that eventually has good",
    "example": "The examiner used 'a blessing in disguise' in the sentence to test students.",
    "usage": "Used to express: a misfortune that eventually has good",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Against The Clock",
    "meaning": "To do a job fast to finish it before a",
    "example": "The examiner used 'against the clock' in the sentence to test students.",
    "usage": "Used to express: to do a job fast to finish it before a",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "A Dime A Dozen",
    "meaning": "Very common and of particular value",
    "example": "The examiner used 'a dime a dozen' in the sentence to test students.",
    "usage": "Used to express: very common and of particular value",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Drop In The Bucket",
    "meaning": "A very small amount compared with",
    "example": "The examiner used 'a drop in the bucket' in the sentence to test students.",
    "usage": "Used to express: a very small amount compared with",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Practice Makes A Man",
    "meaning": "PERFECT",
    "example": "The examiner used 'practice makes a man' in the sentence to test students.",
    "usage": "Used to express: perfect",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Pull The Plug",
    "meaning": "Prevent something from continuing",
    "example": "The examiner used 'pull the plug' in the sentence to test students.",
    "usage": "Used to express: prevent something from continuing",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "New Kid On The Block",
    "meaning": "A new comer",
    "example": "The examiner used 'new kid on the block' in the sentence to test students.",
    "usage": "Used to express: a new comer",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Hot Potato",
    "meaning": "A controversial situation which is",
    "example": "The examiner used 'a hot potato' in the sentence to test students.",
    "usage": "Used to express: a controversial situation which is",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Wag The Dog",
    "meaning": "To divert attention from something of",
    "example": "The examiner used 'wag the dog' in the sentence to test students.",
    "usage": "Used to express: to divert attention from something of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Tie The Knot",
    "meaning": "To get married",
    "example": "The examiner used 'tie the knot' in the sentence to test students.",
    "usage": "Used to express: to get married",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "The Ball Is In Your Court",
    "meaning": "It is up to you to make the next move",
    "example": "The examiner used 'the ball is in your court' in the sentence to test students.",
    "usage": "Used to express: it is up to you to make the next move",
    "exam": ["SSC", "Banking", "UPSC", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "To Bite Off More Than One",
    "meaning": "CAN CHEW",
    "example": "The examiner used 'to bite off more than one' in the sentence to test students.",
    "usage": "Used to express: can chew",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "To Bite The Bullet",
    "meaning": "To do or to accept something difficult",
    "example": "The examiner used 'to bite the bullet' in the sentence to test students.",
    "usage": "Used to express: to do or to accept something difficult",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "To Make A Long Story",
    "meaning": "SHORT",
    "example": "The examiner used 'to make a long story' in the sentence to test students.",
    "usage": "Used to express: short",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Steal Someone'S",
    "meaning": "THUNDER",
    "example": "The examiner used 'to steal someone's' in the sentence to test students.",
    "usage": "Used to express: thunder",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Rise And Shine",
    "meaning": "An expression used when waking",
    "example": "The examiner used 'rise and shine' in the sentence to test students.",
    "usage": "Used to express: an expression used when waking",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Raining Cats And Dogs",
    "meaning": "It is raining unusually hard",
    "example": "The examiner used 'raining cats and dogs' in the sentence to test students.",
    "usage": "Used to express: it is raining unusually hard",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Run Out Of Steam",
    "meaning": "To lose impetus or enthusiasm",
    "example": "The examiner used 'run out of steam' in the sentence to test students.",
    "usage": "Used to express: to lose impetus or enthusiasm",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Saved By The Bell",
    "meaning": "Saved at the last moment",
    "example": "The examiner used 'saved by the bell' in the sentence to test students.",
    "usage": "Used to express: saved at the last moment",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Smell A Rat",
    "meaning": "To begin to suspect trickery or deception",
    "example": "The examiner used 'smell a rat' in the sentence to test students.",
    "usage": "Used to express: to begin to suspect trickery or deception",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Sixth Sense",
    "meaning": "An intuitive power of perception",
    "example": "The examiner used 'sixth sense' in the sentence to test students.",
    "usage": "Used to express: an intuitive power of perception",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Rome Was Not Built In A",
    "meaning": "DAY",
    "example": "The examiner used 'rome was not built in a' in the sentence to test students.",
    "usage": "Used to express: day",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "hard"
  },
  {
    "idiom": "Rule Of Thumb",
    "meaning": "A broadly accurate guide based on",
    "example": "The examiner used 'rule of thumb' in the sentence to test students.",
    "usage": "Used to express: a broadly accurate guide based on",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Up A Blind Alley",
    "meaning": "Following a course of action that is",
    "example": "The examiner used 'up a blind alley' in the sentence to test students.",
    "usage": "Used to express: following a course of action that is",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Familiarity Breeds",
    "meaning": "CONTEMPT",
    "example": "The examiner used 'familiarity breeds' in the sentence to test students.",
    "usage": "Used to express: contempt",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Don'T Put All Eggs In One",
    "meaning": "BASKET",
    "example": "The examiner used 'don't put all eggs in one' in the sentence to test students.",
    "usage": "Used to express: basket",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Thumb One'S Nose",
    "meaning": "To express scorn",
    "example": "The examiner used 'thumb one's nose' in the sentence to test students.",
    "usage": "Used to express: to express scorn",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put The Cat Among The",
    "meaning": "PIGEONS",
    "example": "The examiner used 'to put the cat among the' in the sentence to test students.",
    "usage": "Used to express: pigeons",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "To Shoot The Breeze",
    "meaning": "To have a casual conversation",
    "example": "The examiner used 'to shoot the breeze' in the sentence to test students.",
    "usage": "Used to express: to have a casual conversation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "The Best Of Both Worlds",
    "meaning": "The benefits of widely differing",
    "example": "The examiner used 'the best of both worlds' in the sentence to test students.",
    "usage": "Used to express: the benefits of widely differing",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Take The Cake",
    "meaning": "To degrade",
    "example": "The examiner used 'to take the cake' in the sentence to test students.",
    "usage": "Used to express: to degrade",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Sleep With The Fishes",
    "meaning": "To be dead",
    "example": "The examiner used 'to sleep with the fishes' in the sentence to test students.",
    "usage": "Used to express: to be dead",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Shooting Fish In A Barrel",
    "meaning": "Ridiculously easy task",
    "example": "The examiner used 'shooting fish in a barrel' in the sentence to test students.",
    "usage": "Used to express: ridiculously easy task",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Ignorance Is Bliss",
    "meaning": "Sometimes it is better for you if you do",
    "example": "The examiner used 'ignorance is bliss' in the sentence to test students.",
    "usage": "Used to express: sometimes it is better for you if you do",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Have A Blast",
    "meaning": "To have a lot of fun",
    "example": "The examiner used 'have a blast' in the sentence to test students.",
    "usage": "Used to express: to have a lot of fun",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By The Skin Of One'S Teeth",
    "meaning": "A very narrow margin",
    "example": "The examiner used 'by the skin of one's teeth' in the sentence to test students.",
    "usage": "Used to express: a very narrow margin",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Crocodile Tears",
    "meaning": "Expressions of sorrow that are insincere",
    "example": "The examiner used 'crocodile tears' in the sentence to test students.",
    "usage": "Used to express: expressions of sorrow that are insincere",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Chink In One'S Armour",
    "meaning": "An area of vulnerability",
    "example": "The examiner used 'chink in one's armour' in the sentence to test students.",
    "usage": "Used to express: an area of vulnerability",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Beauty Is In The Eye Of The",
    "meaning": "BEHOLDER",
    "example": "The examiner used 'beauty is in the eye of the' in the sentence to test students.",
    "usage": "Used to express: beholder",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Necessity Is The Mother Of",
    "meaning": "INVENTION",
    "example": "The examiner used 'necessity is the mother of' in the sentence to test students.",
    "usage": "Used to express: invention",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By The Seat Of One'S Pants",
    "meaning": "To do it using only one's own experience",
    "example": "The examiner used 'by the seat of one's pants' in the sentence to test students.",
    "usage": "Used to express: to do it using only one's own experience",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "hard"
  },
  {
    "idiom": "Discretion Is The Greater",
    "meaning": "PART OF VALOUR",
    "example": "The examiner used 'discretion is the greater' in the sentence to test students.",
    "usage": "Used to express: part of valour",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Too Many Cooks Spoil The",
    "meaning": "BROTH",
    "example": "The examiner used 'too many cooks spoil the' in the sentence to test students.",
    "usage": "Used to express: broth",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Spin One'S Wheels",
    "meaning": "To waste one's time",
    "example": "The examiner used 'to spin one's wheels' in the sentence to test students.",
    "usage": "Used to express: to waste one's time",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Be Pushing Up Daisies",
    "meaning": "To be dead and buried",
    "example": "The examiner used 'to be pushing up daisies' in the sentence to test students.",
    "usage": "Used to express: to be dead and buried",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Pull Or Twist Out Of",
    "meaning": "SHAPE",
    "example": "The examiner used 'to pull or twist out of' in the sentence to test students.",
    "usage": "Used to express: shape",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "To Jump Ship",
    "meaning": "To leave an organization",
    "example": "The examiner used 'to jump ship' in the sentence to test students.",
    "usage": "Used to express: to leave an organization",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Kick The Bucket",
    "meaning": "To die",
    "example": "The examiner used 'to kick the bucket' in the sentence to test students.",
    "usage": "Used to express: to die",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "X Marks The Spot",
    "meaning": "The exact location",
    "example": "The examiner used 'x marks the spot' in the sentence to test students.",
    "usage": "Used to express: the exact location",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "You Can Say That Again",
    "meaning": "To express agreement",
    "example": "The examiner used 'you can say that again' in the sentence to test students.",
    "usage": "Used to express: to express agreement",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "The Elephant In The Room",
    "meaning": "An obvious problem that no one wants",
    "example": "The examiner used 'the elephant in the room' in the sentence to test students.",
    "usage": "Used to express: an obvious problem that no one wants",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Make From Scratch",
    "meaning": "To do something from the beginning",
    "example": "The examiner used 'to make from scratch' in the sentence to test students.",
    "usage": "Used to express: to do something from the beginning",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "All Good Things Must Come",
    "meaning": "TO AN END",
    "example": "The examiner used 'all good things must come' in the sentence to test students.",
    "usage": "Used to express: to an end",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Barking Up The Wrong Tree",
    "meaning": "To be pursuing a misguided line of",
    "example": "The examiner used 'barking up the wrong tree' in the sentence to test students.",
    "usage": "Used to express: to be pursuing a misguided line of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Back To The Drawing Board",
    "meaning": "An idea has been unsuccessful and that",
    "example": "The examiner used 'back to the drawing board' in the sentence to test students.",
    "usage": "Used to express: an idea has been unsuccessful and that",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Blood Is Thicker Than",
    "meaning": "WATER",
    "example": "The examiner used 'blood is thicker than' in the sentence to test students.",
    "usage": "Used to express: water",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "A Fool And His Money Are",
    "meaning": "EASILY PARTED",
    "example": "The examiner used 'a fool and his money are' in the sentence to test students.",
    "usage": "Used to express: easily parted",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "hard"
  },
  {
    "idiom": "All Bark And No Bite",
    "meaning": "To be full of big talk but lacking action",
    "example": "The examiner used 'all bark and no bite' in the sentence to test students.",
    "usage": "Used to express: to be full of big talk but lacking action",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Back To Square One",
    "meaning": "To be back to where one started, with",
    "example": "The examiner used 'back to square one' in the sentence to test students.",
    "usage": "Used to express: to be back to where one started, with",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "An Arm And A Leg",
    "meaning": "A large, possibly exorbitant, amount of",
    "example": "The examiner used 'an arm and a leg' in the sentence to test students.",
    "usage": "Used to express: a large, possibly exorbitant, amount of",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "All In The Same Boat",
    "meaning": "To be in the same unpleasant situation",
    "example": "The examiner used 'all in the same boat' in the sentence to test students.",
    "usage": "Used to express: to be in the same unpleasant situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "All Greek To Me",
    "meaning": "Saying that one does not understand",
    "example": "The examiner used 'all greek to me' in the sentence to test students.",
    "usage": "Used to express: saying that one does not understand",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "At The Drop Of A Hat",
    "meaning": "Without hesitation or good reason",
    "example": "The examiner used 'at the drop of a hat' in the sentence to test students.",
    "usage": "Used to express: without hesitation or good reason",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Apple Of My Eye",
    "meaning": "Someone that one cherishes above all",
    "example": "The examiner used 'apple of my eye' in the sentence to test students.",
    "usage": "Used to express: someone that one cherishes above all",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "No Man Is An Island",
    "meaning": "No one is self-sufficient, everyone relies",
    "example": "The examiner used 'no man is an island' in the sentence to test students.",
    "usage": "Used to express: no one is self-sufficient, everyone relies",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "The Squeaky Wheel Gets",
    "meaning": "THE GREASE",
    "example": "The examiner used 'the squeaky wheel gets' in the sentence to test students.",
    "usage": "Used to express: the grease",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Beat A Dead Horse",
    "meaning": "To revive interest in a hopeless issue",
    "example": "The examiner used 'to beat a dead horse' in the sentence to test students.",
    "usage": "Used to express: to revive interest in a hopeless issue",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Beating Around The Bush",
    "meaning": "To avoid getting to the point of an issue",
    "example": "The examiner used 'beating around the bush' in the sentence to test students.",
    "usage": "Used to express: to avoid getting to the point of an issue",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "To Bite Off More Than You",
    "meaning": "CAN CHEW",
    "example": "The examiner used 'to bite off more than you' in the sentence to test students.",
    "usage": "Used to express: can chew",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "To Bite Your Tongue",
    "meaning": "To make a desperate effort to avoid",
    "example": "The examiner used 'to bite your tongue' in the sentence to test students.",
    "usage": "Used to express: to make a desperate effort to avoid",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Birds Of A Feather Flock",
    "meaning": "TOGETHER",
    "example": "The examiner used 'birds of a feather flock' in the sentence to test students.",
    "usage": "Used to express: together",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Beggars Can'T Be Choosers",
    "meaning": "People with no other options must be",
    "example": "The examiner used 'beggars can't be choosers' in the sentence to test students.",
    "usage": "Used to express: people with no other options must be",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Chip On His Shoulder",
    "meaning": "Holding a grudge or grievance that",
    "example": "The examiner used 'to chip on his shoulder' in the sentence to test students.",
    "usage": "Used to express: holding a grudge or grievance that",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Chew Someone Out",
    "meaning": "Reprimand someone severely",
    "example": "The examiner used 'to chew someone out' in the sentence to test students.",
    "usage": "Used to express: reprimand someone severely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Feeding Frenzy",
    "meaning": "An episode of frantic competition for",
    "example": "The examiner used 'feeding frenzy' in the sentence to test students.",
    "usage": "Used to express: an episode of frantic competition for",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Excuse My French",
    "meaning": "To apologize for swearing",
    "example": "The examiner used 'excuse my french' in the sentence to test students.",
    "usage": "Used to express: to apologize for swearing",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Dry Run",
    "meaning": "A rehearsal of a performance before the",
    "example": "The examiner used 'dry run' in the sentence to test students.",
    "usage": "Used to express: a rehearsal of a performance before the",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Cross Your Fingers",
    "meaning": "To hope that things will happen in the",
    "example": "The examiner used 'to cross your fingers' in the sentence to test students.",
    "usage": "Used to express: to hope that things will happen in the",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Crack Someone Up",
    "meaning": "To make someone laugh",
    "example": "The examiner used 'to crack someone up' in the sentence to test students.",
    "usage": "Used to express: to make someone laugh",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Down To The Wire",
    "meaning": "To denote a situation whose outcome is",
    "example": "The examiner used 'down to the wire' in the sentence to test students.",
    "usage": "Used to express: to denote a situation whose outcome is",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Drink Like A Fish",
    "meaning": "To drink excessive amounts of alcohol",
    "example": "The examiner used 'to drink like a fish' in the sentence to test students.",
    "usage": "Used to express: to drink excessive amounts of alcohol",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Buy A Lemon",
    "meaning": "To purchase a vehicle that constantly",
    "example": "The examiner used 'to buy a lemon' in the sentence to test students.",
    "usage": "Used to express: to purchase a vehicle that constantly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Cast Iron Stomach",
    "meaning": "To be able to eat or drink anything",
    "example": "The examiner used 'to cast iron stomach' in the sentence to test students.",
    "usage": "Used to express: to be able to eat or drink anything",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Ethnic Cleansing",
    "meaning": "The mass killing of members of one",
    "example": "The examiner used 'ethnic cleansing' in the sentence to test students.",
    "usage": "Used to express: the mass killing of members of one",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Every Cloud Has A Silver",
    "meaning": "LINING",
    "example": "The examiner used 'every cloud has a silver' in the sentence to test students.",
    "usage": "Used to express: lining",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Dead Ringer",
    "meaning": "A candidate fraudulently substituted for",
    "example": "The examiner used 'dead ringer' in the sentence to test students.",
    "usage": "Used to express: a candidate fraudulently substituted for",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Flea Market",
    "meaning": "A street market selling second-hand",
    "example": "The examiner used 'flea market' in the sentence to test students.",
    "usage": "Used to express: a street market selling second-hand",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Flesh And Blood",
    "meaning": "A person's physical body and their",
    "example": "The examiner used 'flesh and blood' in the sentence to test students.",
    "usage": "Used to express: a person's physical body and their",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Go For Broke",
    "meaning": "To risk everything in an all-out effort",
    "example": "The examiner used 'to go for broke' in the sentence to test students.",
    "usage": "Used to express: to risk everything in an all-out effort",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Go The Extra Mile",
    "meaning": "To make a special effort to achieve",
    "example": "The examiner used 'to go the extra mile' in the sentence to test students.",
    "usage": "Used to express: to make a special effort to achieve",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Fixed In One'S Ways",
    "meaning": "Not wanting to change how one does",
    "example": "The examiner used 'fixed in one's ways' in the sentence to test students.",
    "usage": "Used to express: not wanting to change how one does",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Flash In The Pan",
    "meaning": "A thing or person whose sudden but",
    "example": "The examiner used 'flash in the pan' in the sentence to test students.",
    "usage": "Used to express: a thing or person whose sudden but",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Foam At The Mouth",
    "meaning": "To be very angry",
    "example": "The examiner used 'to foam at the mouth' in the sentence to test students.",
    "usage": "Used to express: to be very angry",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Fuddy-Duddy",
    "meaning": "A person who is very old-fashioned and",
    "example": "The examiner used 'fuddy-duddy' in the sentence to test students.",
    "usage": "Used to express: a person who is very old-fashioned and",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Great Minds Think Alike",
    "meaning": "It is said when two people have the",
    "example": "The examiner used 'great minds think alike' in the sentence to test students.",
    "usage": "Used to express: it is said when two people have the",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "To Go Down Like A Lad",
    "meaning": "BALLOON",
    "example": "The examiner used 'to go down like a lad' in the sentence to test students.",
    "usage": "Used to express: balloon",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Graveyard Shift",
    "meaning": "A work shift that runs through the",
    "example": "The examiner used 'graveyard shift' in the sentence to test students.",
    "usage": "Used to express: a work shift that runs through the",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Get Over It",
    "meaning": "To accept something that happened in",
    "example": "The examiner used 'to get over it' in the sentence to test students.",
    "usage": "Used to express: to accept something that happened in",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Get Up On The Wrong",
    "meaning": "SIDE OF THE BED",
    "example": "The examiner used 'to get up on the wrong' in the sentence to test students.",
    "usage": "Used to express: side of the bed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "To Burn The Midnight Oil",
    "meaning": "To read or work late into the night",
    "example": "The examiner used 'to burn the midnight oil' in the sentence to test students.",
    "usage": "Used to express: to read or work late into the night",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Lose One'S Head",
    "meaning": "To become confused or overly emotional",
    "example": "The examiner used 'to lose one's head' in the sentence to test students.",
    "usage": "Used to express: to become confused or overly emotional",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Head Over Heels",
    "meaning": "To be madly in love",
    "example": "The examiner used 'head over heels' in the sentence to test students.",
    "usage": "Used to express: to be madly in love",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "At Iron Will",
    "meaning": "A firm option",
    "example": "The examiner used 'at iron will' in the sentence to test students.",
    "usage": "Used to express: a firm option",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get Into Soup",
    "meaning": "To make things difficult",
    "example": "The examiner used 'get into soup' in the sentence to test students.",
    "usage": "Used to express: to make things difficult",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Haul Over The Coals",
    "meaning": "To scold",
    "example": "The examiner used 'haul over the coals' in the sentence to test students.",
    "usage": "Used to express: to scold",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Carry The Day",
    "meaning": "To succeed",
    "example": "The examiner used 'to carry the day' in the sentence to test students.",
    "usage": "Used to express: to succeed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Go Over",
    "meaning": "Review",
    "example": "The examiner used 'go over' in the sentence to test students.",
    "usage": "Used to express: review",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Swelled Head",
    "meaning": "Pride",
    "example": "The examiner used 'swelled head' in the sentence to test students.",
    "usage": "Used to express: pride",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Sow The Dragon'S Teeth",
    "meaning": "To take some action",
    "example": "The examiner used 'to sow the dragon's teeth' in the sentence to test students.",
    "usage": "Used to express: to take some action",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get Ground",
    "meaning": "Avoid",
    "example": "The examiner used 'get ground' in the sentence to test students.",
    "usage": "Used to express: avoid",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Cudgel One'S Brain",
    "meaning": "To think hard",
    "example": "The examiner used 'to cudgel one's brain' in the sentence to test students.",
    "usage": "Used to express: to think hard",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Broke Priscian'S Head",
    "meaning": "To use bad grammar",
    "example": "The examiner used 'broke priscian's head' in the sentence to test students.",
    "usage": "Used to express: to use bad grammar",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Cry In The Wilderness",
    "meaning": "Unpopular opinion",
    "example": "The examiner used 'cry in the wilderness' in the sentence to test students.",
    "usage": "Used to express: unpopular opinion",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Bolt From The Blue",
    "meaning": "A sudden calamity",
    "example": "The examiner used 'bolt from the blue' in the sentence to test students.",
    "usage": "Used to express: a sudden calamity",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "A Snake In The Grass",
    "meaning": "A treacherous person",
    "example": "The examiner used 'a snake in the grass' in the sentence to test students.",
    "usage": "Used to express: a treacherous person",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "At Variance With",
    "meaning": "In opposite",
    "example": "The examiner used 'at variance with' in the sentence to test students.",
    "usage": "Used to express: in opposite",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In Deep Water",
    "meaning": "In great difficulty",
    "example": "The examiner used 'in deep water' in the sentence to test students.",
    "usage": "Used to express: in great difficulty",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Egg",
    "meaning": "In an early stage",
    "example": "The examiner used 'in the egg' in the sentence to test students.",
    "usage": "Used to express: in an early stage",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cut In On",
    "meaning": "Interrupt",
    "example": "The examiner used 'cut in on' in the sentence to test students.",
    "usage": "Used to express: interrupt",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Give Up Ghost",
    "meaning": "To die",
    "example": "The examiner used 'give up ghost' in the sentence to test students.",
    "usage": "Used to express: to die",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "By Fair Means Or Foul",
    "meaning": "By any means",
    "example": "The examiner used 'by fair means or foul' in the sentence to test students.",
    "usage": "Used to express: by any means",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sword Of Damocles",
    "meaning": "Imminent danger",
    "example": "The examiner used 'sword of damocles' in the sentence to test students.",
    "usage": "Used to express: imminent danger",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "hard"
  },
  {
    "idiom": "Out Of Elbows",
    "meaning": "Poor",
    "example": "The examiner used 'out of elbows' in the sentence to test students.",
    "usage": "Used to express: poor",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Pandora'S Box",
    "meaning": "A prolific source of trouble",
    "example": "The examiner used 'pandora's box' in the sentence to test students.",
    "usage": "Used to express: a prolific source of trouble",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "A Nignog",
    "meaning": "A fool",
    "example": "The examiner used 'a nignog' in the sentence to test students.",
    "usage": "Used to express: a fool",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Faint Hearted",
    "meaning": "Timid",
    "example": "The examiner used 'faint hearted' in the sentence to test students.",
    "usage": "Used to express: timid",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "To Lead Astray",
    "meaning": "To misguide",
    "example": "The examiner used 'to lead astray' in the sentence to test students.",
    "usage": "Used to express: to misguide",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Make A Pile",
    "meaning": "To make a lot of money",
    "example": "The examiner used 'to make a pile' in the sentence to test students.",
    "usage": "Used to express: to make a lot of money",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "Back Out Of",
    "meaning": "Withdraw",
    "example": "The examiner used 'back out of' in the sentence to test students.",
    "usage": "Used to express: withdraw",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Throw Over",
    "meaning": "Reject",
    "example": "The examiner used 'throw over' in the sentence to test students.",
    "usage": "Used to express: reject",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Chicken Hearted",
    "meaning": "Timid",
    "example": "The examiner used 'chicken hearted' in the sentence to test students.",
    "usage": "Used to express: timid",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Down And Out",
    "meaning": "Without money",
    "example": "The examiner used 'down and out' in the sentence to test students.",
    "usage": "Used to express: without money",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "High And Low",
    "meaning": "Everywhere",
    "example": "The examiner used 'high and low' in the sentence to test students.",
    "usage": "Used to express: everywhere",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Damsel In Distress",
    "meaning": "A helpless woman",
    "example": "The examiner used 'a damsel in distress' in the sentence to test students.",
    "usage": "Used to express: a helpless woman",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "God'S Ape",
    "meaning": "A born fool",
    "example": "The examiner used 'god's ape' in the sentence to test students.",
    "usage": "Used to express: a born fool",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Lion'S Mouth",
    "meaning": "A dangerous situation",
    "example": "The examiner used 'lion's mouth' in the sentence to test students.",
    "usage": "Used to express: a dangerous situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "A Stiff-Necked Person",
    "meaning": "An obstinate person",
    "example": "The examiner used 'a stiff-necked person' in the sentence to test students.",
    "usage": "Used to express: an obstinate person",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cross Out",
    "meaning": "Eliminate",
    "example": "The examiner used 'cross out' in the sentence to test students.",
    "usage": "Used to express: eliminate",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Make Away With",
    "meaning": "To remove",
    "example": "The examiner used 'make away with' in the sentence to test students.",
    "usage": "Used to express: to remove",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put One Out Of",
    "meaning": "COUNTENANCE",
    "example": "The examiner used 'to put one out of' in the sentence to test students.",
    "usage": "Used to express: countenance",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In Vogue",
    "meaning": "Popular",
    "example": "The examiner used 'in vogue' in the sentence to test students.",
    "usage": "Used to express: popular",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "In A Fix",
    "meaning": "In a puzzling state",
    "example": "The examiner used 'in a fix' in the sentence to test students.",
    "usage": "Used to express: in a puzzling state",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Hammer Out",
    "meaning": "To plan",
    "example": "The examiner used 'to hammer out' in the sentence to test students.",
    "usage": "Used to express: to plan",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A Mare'S Nest",
    "meaning": "A rumour",
    "example": "The examiner used 'a mare's nest' in the sentence to test students.",
    "usage": "Used to express: a rumour",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Stand For",
    "meaning": "Represent",
    "example": "The examiner used 'stand for' in the sentence to test students.",
    "usage": "Used to express: represent",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A Cock And Bull Story",
    "meaning": "An imaginary story",
    "example": "The examiner used 'a cock and bull story' in the sentence to test students.",
    "usage": "Used to express: an imaginary story",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Black Ox",
    "meaning": "Misfortune",
    "example": "The examiner used 'black ox' in the sentence to test students.",
    "usage": "Used to express: misfortune",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Broke A Lance With",
    "meaning": "To argue against",
    "example": "The examiner used 'broke a lance with' in the sentence to test students.",
    "usage": "Used to express: to argue against",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Cry Wolf",
    "meaning": "To raise a false alarm",
    "example": "The examiner used 'cry wolf' in the sentence to test students.",
    "usage": "Used to express: to raise a false alarm",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Broke Reed",
    "meaning": "Support that failed",
    "example": "The examiner used 'broke reed' in the sentence to test students.",
    "usage": "Used to express: support that failed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Bear Up With",
    "meaning": "Endure",
    "example": "The examiner used 'bear up with' in the sentence to test students.",
    "usage": "Used to express: endure",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Creature Comforts",
    "meaning": "Luxuries",
    "example": "The examiner used 'creature comforts' in the sentence to test students.",
    "usage": "Used to express: luxuries",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Clear The Decks",
    "meaning": "To remove obstructions",
    "example": "The examiner used 'to clear the decks' in the sentence to test students.",
    "usage": "Used to express: to remove obstructions",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Cut The Crackle",
    "meaning": "To stop talking and start",
    "example": "The politicians in India needs to cut the crackle for the benefit of the masses.",
    "usage": "Used to express: to stop talking and start",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "In The Offing",
    "meaning": "Appear soon",
    "example": "The examiner used 'in the offing' in the sentence to test students.",
    "usage": "Used to express: appear soon",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Wolf In Sheep Clothing",
    "meaning": "Hypocrite",
    "example": "The examiner used 'wolf in sheep clothing' in the sentence to test students.",
    "usage": "Used to express: hypocrite",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Heads With Roll",
    "meaning": "Dismissed or forced to resign",
    "example": "The examiner used 'heads with roll' in the sentence to test students.",
    "usage": "Used to express: dismissed or forced to resign",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "A Green Horn",
    "meaning": "An experienced person",
    "example": "The examiner used 'a green horn' in the sentence to test students.",
    "usage": "Used to express: an experienced person",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "To Paddle One'S Own Canoe",
    "meaning": "Manage independently",
    "example": "The examiner used 'to paddle one's own canoe' in the sentence to test students.",
    "usage": "Used to express: manage independently",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep The Pot",
    "meaning": "To keep controversy alive",
    "example": "The examiner used 'to keep the pot' in the sentence to test students.",
    "usage": "Used to express: to keep controversy alive",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Beat The Air",
    "meaning": "To make the efforts that are useless",
    "example": "The examiner used 'to beat the air' in the sentence to test students.",
    "usage": "Used to express: to make the efforts that are useless",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Threw A Sapper",
    "meaning": "Sabotage",
    "example": "The examiner used 'threw a sapper' in the sentence to test students.",
    "usage": "Used to express: sabotage",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "A Rift In The Lute",
    "meaning": "Brought about disharmony",
    "example": "The examiner used 'a rift in the lute' in the sentence to test students.",
    "usage": "Used to express: brought about disharmony",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Cushy Job",
    "meaning": "Financially comfortable job",
    "example": "The examiner used 'cushy job' in the sentence to test students.",
    "usage": "Used to express: financially comfortable job",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Sum And Substance",
    "meaning": "Summary",
    "example": "The examiner used 'sum and substance' in the sentence to test students.",
    "usage": "Used to express: summary",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Weigh Anchor",
    "meaning": "Prepare to sail again",
    "example": "The examiner used 'weigh anchor' in the sentence to test students.",
    "usage": "Used to express: prepare to sail again",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Seize The Nettle",
    "meaning": "Dealt firmly",
    "example": "The examiner used 'seize the nettle' in the sentence to test students.",
    "usage": "Used to express: dealt firmly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Keep The Wolf From The",
    "meaning": "DOOR",
    "example": "The examiner used 'to keep the wolf from the' in the sentence to test students.",
    "usage": "Used to express: door",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "Mealymouthed",
    "meaning": "Softspoken",
    "example": "The examiner used 'mealymouthed' in the sentence to test students.",
    "usage": "Used to express: softspoken",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Spin One'S Wheels",
    "meaning": "Expel much effort for little or no gain",
    "example": "The examiner used 'spin one's wheels' in the sentence to test students.",
    "usage": "Used to express: expel much effort for little or no gain",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Put One'S Foot Down",
    "meaning": "Adopt a firm policy when faced with",
    "example": "The examiner used 'put one's foot down' in the sentence to test students.",
    "usage": "Used to express: adopt a firm policy when faced with",
    "exam": ["SSC", "Banking", "UPSC", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Whistle In The Dark",
    "meaning": "Pretend to be unafraid",
    "example": "The examiner used 'whistle in the dark' in the sentence to test students.",
    "usage": "Used to express: pretend to be unafraid",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "The Alpha And The Omega",
    "meaning": "The beginning and the end",
    "example": "The examiner used 'the alpha and the omega' in the sentence to test students.",
    "usage": "Used to express: the beginning and the end",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Throw Up The Sponge",
    "meaning": "To surrender",
    "example": "The examiner used 'throw up the sponge' in the sentence to test students.",
    "usage": "Used to express: to surrender",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Put A Spoke In One'S",
    "meaning": "WHEEL",
    "example": "The examiner used 'to put a spoke in one's' in the sentence to test students.",
    "usage": "Used to express: wheel",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "A Moot Point",
    "meaning": "Disputed",
    "example": "The examiner used 'a moot point' in the sentence to test students.",
    "usage": "Used to express: disputed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Draw The Longbow",
    "meaning": "To exaggerate",
    "example": "The examiner used 'to draw the longbow' in the sentence to test students.",
    "usage": "Used to express: to exaggerate",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "All Agog",
    "meaning": "Amazed",
    "example": "The examiner used 'all agog' in the sentence to test students.",
    "usage": "Used to express: amazed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Not To Mince Matters",
    "meaning": "To speak out politely",
    "example": "The examiner used 'not to mince matters' in the sentence to test students.",
    "usage": "Used to express: to speak out politely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Kick The Bucket",
    "meaning": "To die",
    "example": "The examiner used 'kick the bucket' in the sentence to test students.",
    "usage": "Used to express: to die",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Willothe Wisp",
    "meaning": "Something that is impossible to get or",
    "example": "The examiner used 'willothe wisp' in the sentence to test students.",
    "usage": "Used to express: something that is impossible to get or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To Go Through Fire And",
    "meaning": "WATER",
    "example": "The examiner used 'to go through fire and' in the sentence to test students.",
    "usage": "Used to express: water",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Ended In A Fiasco",
    "meaning": "A complete failure",
    "example": "The examiner used 'ended in a fiasco' in the sentence to test students.",
    "usage": "Used to express: a complete failure",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Sow Wild Oats",
    "meaning": "To waste time by doing foolish things in",
    "example": "The examiner used 'sow wild oats' in the sentence to test students.",
    "usage": "Used to express: to waste time by doing foolish things in",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Live From Hand To Mouth",
    "meaning": "To have enough money to live on and",
    "example": "The examiner used 'live from hand to mouth' in the sentence to test students.",
    "usage": "Used to express: to have enough money to live on and",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Pillar To Post",
    "meaning": "One place to another",
    "example": "The examiner used 'pillar to post' in the sentence to test students.",
    "usage": "Used to express: one place to another",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hobson'S Choice",
    "meaning": "No real choice at all",
    "example": "The examiner used 'hobson's choice' in the sentence to test students.",
    "usage": "Used to express: no real choice at all",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "hard"
  },
  {
    "idiom": "Adam'S Ale",
    "meaning": "Water",
    "example": "The examiner used 'adam's ale' in the sentence to test students.",
    "usage": "Used to express: water",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "At One'S Wits End",
    "meaning": "To get puzzled",
    "example": "The examiner used 'at one's wits end' in the sentence to test students.",
    "usage": "Used to express: to get puzzled",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Steal A March",
    "meaning": "To outshine",
    "example": "The examiner used 'to steal a march' in the sentence to test students.",
    "usage": "Used to express: to outshine",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In A Jiffy",
    "meaning": "Something that is done very quickly",
    "example": "The examiner used 'in a jiffy' in the sentence to test students.",
    "usage": "Used to express: something that is done very quickly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "The Thin End Of The",
    "meaning": "Start of harmful development",
    "example": "The examiner used 'the thin end of the' in the sentence to test students.",
    "usage": "Used to express: start of harmful development",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Accept The Gauntlet",
    "meaning": "To accept challenge",
    "example": "The examiner used 'to accept the gauntlet' in the sentence to test students.",
    "usage": "Used to express: to accept challenge",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Wrangle Over An Ass'S",
    "meaning": "SHADOW",
    "example": "The examiner used 'to wrangle over an ass's' in the sentence to test students.",
    "usage": "Used to express: shadow",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make One'S Flesh Creep",
    "meaning": "To frighten someone",
    "example": "The examiner used 'make one's flesh creep' in the sentence to test students.",
    "usage": "Used to express: to frighten someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Damp Squib",
    "meaning": "Complete failure",
    "example": "The examiner used 'damp squib' in the sentence to test students.",
    "usage": "Used to express: complete failure",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Bear The Palm",
    "meaning": "To win",
    "example": "The examiner used 'bear the palm' in the sentence to test students.",
    "usage": "Used to express: to win",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have A Finger In Every",
    "meaning": "PIE",
    "example": "The examiner used 'to have a finger in every' in the sentence to test students.",
    "usage": "Used to express: pie",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "To Make Up One'S Mind",
    "meaning": "To make a decision / decide",
    "example": "The examiner used 'to make up one's mind' in the sentence to test students.",
    "usage": "Used to express: to make a decision / decide",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Hit The Nail On The",
    "meaning": "HEAD",
    "example": "The examiner used 'to hit the nail on the' in the sentence to test students.",
    "usage": "Used to express: head",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "On Thin Ice",
    "meaning": "In a precarious or risky situation",
    "example": "The examiner used 'on thin ice' in the sentence to test students.",
    "usage": "Used to express: in a precarious or risky situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have A Sigh Of Relief",
    "meaning": "To suddenly feel very happy because",
    "example": "The examiner used 'to have a sigh of relief' in the sentence to test students.",
    "usage": "Used to express: to suddenly feel very happy because",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "hard"
  },
  {
    "idiom": "To Be On Cloud Nine",
    "meaning": "To extremely happy",
    "example": "Was Helen pleased about getting that job?' 'Pleased? She was on cloud nine!",
    "usage": "Used to express: to extremely happy",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have Something On The",
    "meaning": "BRAIN",
    "example": "The examiner used 'to have something on the' in the sentence to test students.",
    "usage": "Used to express: brain",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Not One'S Cup Of Tea",
    "meaning": "Not one's choice or preference",
    "example": "The examiner used 'not one's cup of tea' in the sentence to test students.",
    "usage": "Used to express: not one's choice or preference",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "In Bad Taste",
    "meaning": "Not suitable or offensive",
    "example": "The examiner used 'in bad taste' in the sentence to test students.",
    "usage": "Used to express: not suitable or offensive",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Have At One'S",
    "meaning": "FINGERTIPS",
    "example": "The examiner used 'to have at one's' in the sentence to test students.",
    "usage": "Used to express: fingertips",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Not Have A Clue",
    "meaning": "To not know about something",
    "example": "The examiner used 'to not have a clue' in the sentence to test students.",
    "usage": "Used to express: to not know about something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Out Of Date",
    "meaning": "Old fashioned",
    "example": "The examiner used 'out of date' in the sentence to test students.",
    "usage": "Used to express: old fashioned",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "It Goes Without Saying",
    "meaning": "Something which is implied to be",
    "example": "The examiner used 'it goes without saying' in the sentence to test students.",
    "usage": "Used to express: something which is implied to be",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "To Let Someone Off",
    "meaning": "To leave someone in his present state",
    "example": "The examiner used 'to let someone off' in the sentence to test students.",
    "usage": "Used to express: to leave someone in his present state",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Call It A Day",
    "meaning": "To declare the end of a task",
    "example": "The examiner used 'call it a day' in the sentence to test students.",
    "usage": "Used to express: to declare the end of a task",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Ball Is In Your Court",
    "meaning": "It is up to you to make the next decision",
    "example": "The examiner used 'ball is in your court' in the sentence to test students.",
    "usage": "Used to express: it is up to you to make the next decision",
    "exam": ["SSC", "Banking", "UPSC", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Best Of Both Worlds",
    "meaning": "A situation wherein someone has the",
    "example": "The examiner used 'best of both worlds' in the sentence to test students.",
    "usage": "Used to express: a situation wherein someone has the",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Give Somebody A Ring",
    "meaning": "Call someone on the telephone",
    "example": "The examiner used 'give somebody a ring' in the sentence to test students.",
    "usage": "Used to express: call someone on the telephone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Leave No Stone Unturned",
    "meaning": "Try every possible course of action in",
    "example": "Ahead of its return to the IPL in , Chennai Super Kings is leaving no stone unturned to get its campaign back on the track. One of the key reasons for its success in the first eigh",
    "usage": "Used to express: try every possible course of action in",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get The Message",
    "meaning": "Understand what is implied by a",
    "example": "The examiner used 'get the message' in the sentence to test students.",
    "usage": "Used to express: understand what is implied by a",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep At Bay",
    "meaning": "To control something and prevent it",
    "example": "Refreshed with a days rest thanks to the inclement weather, Virat Kohli reiterated that his men will keep complacency at bay while playing the third and final Test against Sri Lan",
    "usage": "Used to express: to control something and prevent it",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Go Off The Air",
    "meaning": "To stop broadcasting a radio or TV",
    "example": "The examiner used 'to go off the air' in the sentence to test students.",
    "usage": "Used to express: to stop broadcasting a radio or tv",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Make A Fuss About",
    "meaning": "An excessive display of attention or",
    "example": "The examiner used 'to make a fuss about' in the sentence to test students.",
    "usage": "Used to express: an excessive display of attention or",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To Go To Somebody'S Head",
    "meaning": "To make someone dizzy or slightly",
    "example": "The examiner used 'to go to somebody's head' in the sentence to test students.",
    "usage": "Used to express: to make someone dizzy or slightly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To Make Amends",
    "meaning": "To compensate",
    "example": "The examiner used 'to make amends' in the sentence to test students.",
    "usage": "Used to express: to compensate",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Get On The Nerves",
    "meaning": "To be an irritant",
    "example": "The examiner used 'get on the nerves' in the sentence to test students.",
    "usage": "Used to express: to be an irritant",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep Under One'S Hat",
    "meaning": "To keep something a secret",
    "example": "The examiner used 'keep under one's hat' in the sentence to test students.",
    "usage": "Used to express: to keep something a secret",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Go For A Song Sold",
    "meaning": "Cheaply",
    "example": "The examiner used 'go for a song sold' in the sentence to test students.",
    "usage": "Used to express: cheaply",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make An Ass Out Of",
    "meaning": "Cause someone or oneself to look foolish",
    "example": "The examiner used 'make an ass out of' in the sentence to test students.",
    "usage": "Used to express: cause someone or oneself to look foolish",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Achilles' Heel",
    "meaning": "A fatal weakness in spite of overall",
    "example": "The examiner used 'achilles' heel' in the sentence to test students.",
    "usage": "Used to express: a fatal weakness in spite of overall",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Beat Around The Bush",
    "meaning": "To treat a topic, but omit its main",
    "example": "The examiner used 'beat around the bush' in the sentence to test students.",
    "usage": "Used to express: to treat a topic, but omit its main",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Gnash Your Teeth",
    "meaning": "Express rage",
    "example": "The examiner used 'gnash your teeth' in the sentence to test students.",
    "usage": "Used to express: express rage",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Let Something Slip",
    "meaning": "THROUGH ONE'S",
    "example": "The examiner used 'let something slip' in the sentence to test students.",
    "usage": "Used to express: through one's",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Get Up On The Wrong Side",
    "meaning": "OF THE BED",
    "example": "The examiner used 'get up on the wrong side' in the sentence to test students.",
    "usage": "Used to express: of the bed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Learn By Heart",
    "meaning": "To memorize something",
    "example": "The examiner used 'learn by heart' in the sentence to test students.",
    "usage": "Used to express: to memorize something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Beat A Dead Horse",
    "meaning": "To uselessly dwell on a subject far",
    "example": "The examiner used 'beat a dead horse' in the sentence to test students.",
    "usage": "Used to express: to uselessly dwell on a subject far",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Decked up",
    "meaning": "put on special clothes to appear particularly appealing and attractive",
    "example": "When the consultation began in the evening, the mausoleum of former Chief Minister Jayalalithaa on the Marina was decked up with flowers",
    "usage": "Used to express: put on special clothes to appear particularly appealing and attractive",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Doing the rounds",
    "meaning": "to be passed from one person to another",
    "example": "Since morning, the talk doing the rounds was that Mr. Panneerselvam would come out with a statement on the merger after Chief Minister Edappadi K. Palaniswami on Thursday announced",
    "usage": "Used to express: to be passed from one person to another",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Put off",
    "meaning": "an evasive reply, to delay doing something, especially because you do not want to do it",
    "example": "The strong stand taken by leaders, including former Minister K.P. Munusamy, was said to have prompted Mr. Panneerselvam to put off a decision on the merger. Mr. Munusamy was not ",
    "usage": "Used to express: an evasive reply, to delay doing something, especially because you do not want t",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Takes a beating",
    "meaning": "to be damaged because of performing badly or being criticized",
    "example": "Vishal Sikka quits as Infosys CEO, shares take a beating",
    "usage": "Used to express: to be damaged because of performing badly or being criticized",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn up/on the heat",
    "meaning": "to use force to persuade someone to do something; to increase the pressure on someone to do something",
    "example": "Management is turning the heat up to increase production. The teacher really turned up the heat on the students by saying that everyone would be punished if the real culprit was no",
    "usage": "Used to express: to use force to persuade someone to do something; to increase the pressure on so",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "medium"
  },
  {
    "idiom": "Rip apart",
    "meaning": "to destroy something completely",
    "example": "The nine judge bench of the supreme court on Thursday ripped apart its own",
    "usage": "Used to express: to destroy something completely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Step down",
    "meaning": "withdraw or resign from an important position or office",
    "example": "R. Seshasayee, chairman of the board decided to step down from the board, Infosys said in a release.",
    "usage": "Used to express: withdraw or resign from an important position or office",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Strikes a blow",
    "meaning": "to do something to help or to support an idea, movement, or group , to do something to harm or oppose an idea, movement, or group",
    "example": "The supreme court judgment strikes a blow on the unbridled encroachment and surveillance by the state and its agencies in the life of the common man",
    "usage": "Used to express: to do something to help or to support an idea, movement, or group , to do someth",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Hold on",
    "meaning": "wait; stop , endure in difficult circumstances.",
    "example": "The result helped UP hold on to the top spot in Zone B but, in a group where the difference between the top and bottom-placed sides is just 16 points, it would be a fragile lead",
    "usage": "Used to express: wait; stop , endure in difficult circumstances.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pull through",
    "meaning": "get through an illness or other dangerous or difficult situation",
    "example": "Second seed Harinder Pal was in a lot of trouble after a sluggish start against Aditya Jagtap, but regained the surety of his touch to pull through in four games.",
    "usage": "Used to express: get through an illness or other dangerous or difficult situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pumped up",
    "meaning": "to fill with enthusiasm or excitement, to fill with or as if with air",
    "example": "I like the fast court. I am pretty happy and pumped up to play the semifinal, said Kush.",
    "usage": "Used to express: to fill with enthusiasm or excitement, to fill with or as if with air",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "12: Leave no stone unturned",
    "meaning": "to do everything possible in order to achieve or find something",
    "example": "Ahead of its return to the IPL in 2018, Chennai Super Kings is leaving no stone unturned to get its campaign back on the track. One of the key reasons for its success in the first ",
    "usage": "Used to express: to do everything possible in order to achieve or find something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Rope in",
    "meaning": "you mean that someone persuaded you to help them do that task",
    "example": "For 2018, the intentions remains the same with the team intending to rope in former coach Stephen Fleming",
    "usage": "Used to express: you mean that someone persuaded you to help them do that task",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "snuffed out",
    "meaning": "to make something end quickly, especially by using force",
    "example": "It was the governments most brutal attempt to snuff out the rebellion.",
    "usage": "Used to express: to make something end quickly, especially by using force",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "knock out",
    "meaning": "to make someone leave a competition by defeating them",
    "example": "Denis Shapovalov makes his glee known after knocking out top seed Rafael Nadal.",
    "usage": "Used to express: to make someone leave a competition by defeating them",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "crash out",
    "meaning": "to be badly defeated so that you have to leave a competition",
    "example": "Davinder Singh became the first Indian to qualify for the javelin final even as his more fancied compatriot Neeraj Chopra crashed out in the qualification round.",
    "usage": "Used to express: to be badly defeated so that you have to leave a competition",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "lay in tatters",
    "meaning": "damaged beyond repair",
    "example": "Wayde van Niekerks dreams of emulating legend Michael Johnsons 200-400m world double lay in tatters on Thursday as Turkeys 9/1 outsider Ramil Guliyev edged the 200m final",
    "usage": "Used to express: damaged beyond repair",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Turn in",
    "meaning": "Hand in, submit",
    "example": "Ramil Guliyev turned it on when it mattered most tostun pre-race favorite Wayde Van Niekerk In the 200 m",
    "usage": "Used to express: hand in, submit",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "sweat something out",
    "meaning": "to anxiously wait for something, to get rid of something in one's body by sweating.",
    "example": "With team selection imminent, Dhoni and Suresh Raina, who last played an ODI for India in October 2015, sweated it out on Friday. sent in my application and now I have to sweat out",
    "usage": "Used to express: to anxiously wait for something, to get rid of something in one's body by sweati",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "tone down",
    "meaning": "altered so as to be less extreme or intense.",
    "example": "The ground is surrounded by cloud-enveloped mountains and acres of verdant green. The last-named shade was however toned down on the pitch with the ground-staff scrubbing away the ",
    "usage": "Used to express: altered so as to be less extreme or intense.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "scrub away",
    "meaning": "to clean something away by rubbing.",
    "example": "The ground is surrounded by cloud-enveloped mountains and acres of verdant green. The last-named shade was however toned down on the pitch with the ground-staff scrubbing away the ",
    "usage": "Used to express: to clean something away by rubbing.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "tick all the boxes :",
    "meaning": "To satisfy or fulfill everything that is necessary or desired.",
    "example": "Virat Kohlis men have ticked most of the boxes, be it runs or wickets, with the lone worry being a few butter-fingers in the close-in cordon.",
    "usage": "Used to express: to satisfy or fulfill everything that is necessary or desired.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "butter-fingers",
    "meaning": "Someone who is clumsy and often drops things or else fails to catch something",
    "example": "Virat Kohlis men have ticked most of the boxes, be it runs or wickets, with the lone worry being a few butter-fingers in the close-in cordon.",
    "usage": "Used to express: someone who is clumsy and often drops things or else fails to catch something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "lose ground",
    "meaning": "to fall behind someone or something, become less successful",
    "example": "Equity benchmark indices lost ground for the fifth consecutive day on Friday as weak domestic corporate numbers along with global negativity on account of geopolitical tensions dam",
    "usage": "Used to express: to fall behind someone or something, become less successful",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "stem the tide",
    "meaning": "to stop something from increasing",
    "example": "This law may stem the tide of pollution of our beautiful river from the factories built along its banks.",
    "usage": "Used to express: to stop something from increasing",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hinge on",
    "meaning": "to be determined or decided by (something): to depend on (something)",
    "example": "Roelant Oltmans continuation as the hockey head coach hinges on the clarity and quality of his plans for Indias hectic season ahead",
    "usage": "Used to express: to be determined or decided by (something): to depend on (something)",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Make or break",
    "meaning": "Cause either total success or total ruin,",
    "example": "The recent Europe tour was expected to be the make-or-break outing for the Dutchman and a final decision will be taken when the Hockey India panel, formed to evaluate the teams pe",
    "usage": "Used to express: cause either total success or total ruin,",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Step up",
    "meaning": "to make something go or run faster, increase,",
    "example": "What he has done so far is appreciated but there is now need to step up to another level, compete and win against the top-four.",
    "usage": "Used to express: to make something go or run faster, increase,",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "In the scheme of things",
    "meaning": "the way things are organized or happen in a particular situation, or the way someone wants them to be organized:",
    "example": "He insisted that R. Ashwin, despite playing only 15 ODI matches since the 2015 World Cup, is very much in the scheme of things",
    "usage": "Used to express: the way things are organized or happen in a particular situation, or the way som",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Back up",
    "meaning": "one that serves as a substitute or support",
    "example": "Looking ahead to the 2019 World Cup, we will need to have back up options for every bowler that we have.",
    "usage": "Used to express: one that serves as a substitute or support",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Bestowed on",
    "meaning": "to give something to someone; to present something to someone",
    "example": "Knighthoods had been bestowed on West Indian cricketers like confetti",
    "usage": "Used to express: to give something to someone; to present something to someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cross the line",
    "meaning": "to change from being acceptable to being unacceptable, to do something wrong",
    "example": "Chasing a target of 224, India-A took",
    "usage": "Used to express: to change from being acceptable to being unacceptable, to do something wrong",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pulled off",
    "meaning": "to succeed in doing something that is difficult",
    "example": "In the biggest upset in the section, Frances Brice Leverdez pulled off the first shock by defeating second seed Lee Chong Wei 21-19, 22-24, 21-17 in 75 minutes and perhaps end Lee",
    "usage": "Used to express: to succeed in doing something that is difficult",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Bow out",
    "meaning": "withdraw or retire from an activity or role.",
    "example": "India top mixed doubles pair of Pranaav Jerry Chopra and N. Sikki Reddy, also seeded 15th, defeated Indo-Malaysian combo of Prajakta Sawant and Yogendran Khrishnan 21-12, 21-",
    "usage": "Used to express: withdraw or retire from an activity or role.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cast out",
    "meaning": "to force someone or something to leave a place",
    "example": "The minority verdict said social evils such as sati, infanticide, and devadasi system were cast out by way of legislation and not by judicial orders.",
    "usage": "Used to express: to force someone or something to leave a place",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Every cloud has a silver lining",
    "meaning": "Good things come after bad things",
    "example": "It seems that if you're big, rich and powerful enough, every cloud has a silver lining.",
    "usage": "Used to express: good things come after bad things",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "hard"
  },
  {
    "idiom": "Take a stand",
    "meaning": "Adopt a firm position about an issue",
    "example": "To smoothen the process of merger of the two AIADMK factions, the camp led by chief minister Edapadi k. Palaniswami is expected to take a stand against AIADMK (AMMA) interim genera",
    "usage": "Used to express: adopt a firm position about an issue",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Blew the lid off",
    "meaning": "to make public something that was previously not known or was hidden",
    "example": "Former DIG of Prisons D. Roopa, who blew the lid off the special treatment meted out to prisoners, including Sasikala submitted the footage taken from the CCTV recording of the cen",
    "usage": "Used to express: to make public something that was previously not known or was hidden",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Run over",
    "meaning": "to hit someone or something with a vehicle and drive over them, to practise what you are going to say in a speech, performance etc",
    "example": "Senior Railway Ministry officials told that welding work was underway near the Khatauli railway station in Uttar Pradesh, leaving a portion of the track without rails when the Utka",
    "usage": "Used to express: to hit someone or something with a vehicle and drive over them, to practise what",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "Gearing up",
    "meaning": "to prepare yourself, or to prepare something for an activity or event.",
    "example": "With the home-stretch in sight, the leading contenders headed by Swapnil Dhopade are gearing up for a powerful finish in the National Challengers chess championship here.",
    "usage": "Used to express: to prepare yourself, or to prepare something for an activity or event.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Pinned back",
    "meaning": "to hold something back by pinning",
    "example": "The 26-year-old Spaniard struck the winner with less than three minutes",
    "usage": "Used to express: to hold something back by pinning",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Part ways",
    "meaning": "to leave each other, to depart from someone",
    "example": "After failing to defend their Los Cabos title last month. Purav Raja and Divji Sharan fell 15 places each in the ATP rankings and the pair decided to part ways heading to the US OP",
    "usage": "Used to express: to leave each other, to depart from someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Hogging the limelight",
    "meaning": "making oneself the center of attention to the exclusion of others",
    "example": "Over the past few years, the Indian presence in the mens singles has been growing steadily. Initially, women players hogged the limelight due to Saina Nehwal and P.V. Sindhu winni",
    "usage": "Used to express: making oneself the center of attention to the exclusion of others",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Drowning out",
    "meaning": "to make it impossible to hear something",
    "example": "The hyper-charged crowds were only too happy to comply and shouted back, Bharat Mata ki Jai, drowning out the Pakistani attack",
    "usage": "Used to express: to make it impossible to hear something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Wind down",
    "meaning": "gradually lose power",
    "example": "Seventy years after 1947, its time to wind down the choreographed hostility at the India-Pakistan border",
    "usage": "Used to express: gradually lose power",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "To feel under the weather",
    "meaning": "to not feel well",
    "example": "Im really feeling under the weather today; I have a terrible cold and fever",
    "usage": "Used to express: to not feel well",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "easy"
  },
  {
    "idiom": "Eked out",
    "meaning": "to make (a supply) last, to add to (something insufficient), esp with effort",
    "example": "GM Harika eked out a draw against GM Stupak Kirill from Belarus Many workers can only eke out their redundancy money for about 10 weeks.",
    "usage": "Used to express: to make (a supply) last, to add to (something insufficient), esp with effort",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Signed off",
    "meaning": "To announce the end of a communication; conclude.",
    "example": "Vishwanathan Anand signed off with a loss, that resulted in Sergey Karjakins lone victory, and finished tied eighth with Garry Kasparov",
    "usage": "Used to express: to announce the end of a communication; conclude.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Bring up the rear",
    "meaning": "to move along behind everyone else; to be at the end of the line.",
    "example": "Having brought up the rear in the 10 player event, Anand and Kasparov will be keen to gain ground when the action shifts to 18 round blitz.",
    "usage": "Used to express: to move along behind everyone else; to be at the end of the line.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Gain ground",
    "meaning": "to become more successful, popular, or accepted",
    "example": "Having brought up the rear in the 10 player event, Anand and kasporav will be keen to gain ground when the action shifts to 18 round blitz.",
    "usage": "Used to express: to become more successful, popular, or accepted",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Put up a brave front",
    "meaning": "to act confidently in a difficult situation",
    "example": "When the National Anthem played, Rashmi Rathore put up a brave front. shed",
    "usage": "Used to express: to act confidently in a difficult situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pent-up",
    "meaning": "unable to be expressed or released, closely confined or held back.",
    "example": "Ceremony over, she deserted the podium, heading for the closest corner. Pent- up grief gave way to a torrent of tears.",
    "usage": "Used to express: unable to be expressed or released, closely confined or held back.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Tie up (the) loose ends",
    "meaning": "to deal with the last few things that have to be done before you can finish something",
    "example": "Weve just got a few loose ends to tie up and then the report will be ready.",
    "usage": "Used to express: to deal with the last few things that have to be done before you can finish some",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Shore up",
    "meaning": "to support or help",
    "example": "NPA resolution would necessitate a higher recapitalization of these banks  MR.PATEL said the government and the RBI are in dialogue to prepare a set of measures to enable state-r",
    "usage": "Used to express: to support or help",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Run out",
    "meaning": "be used up.",
    "example": "Just a year after Rio hosted the Olympics, its crime rate has spiralled out of control, and its top politicians have landed in jail cells for corruption",
    "usage": "Used to express: be used up.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Spilled over",
    "meaning": "reach a point at which it can no longer be controlled or contained, to spread to other areas",
    "example": "Rios poor have been bearing the brunt of gang wars for decades. But in the year since the 2016 Games, robberies, murders, kidnappings and gun battles have spilled over onto the st",
    "usage": "Used to express: reach a point at which it can no longer be controlled or contained, to spread to",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cut down",
    "meaning": "reduce, do less of something bad",
    "example": "The troops may stay over till 2018 if their guns fail to cut down the surging violence",
    "usage": "Used to express: reduce, do less of something bad",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Playing out",
    "meaning": "happen, take place, develop in a particular way",
    "example": "As the world is hooked on the Game of Thrones season seven, Pakistan continues to experience its own power games, which have been playing out, in one way or the other, since the ea",
    "usage": "Used to express: happen, take place, develop in a particular way",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To take off",
    "meaning": "To embark on rapid activity, development, or growth, to begin",
    "example": "the Higher Education Financing Agency (HEFA) is set to take off soon, with the Ministry of Human Resource Development (MHRD) asking Centrally funded higher education institutions t",
    "usage": "Used to express: to embark on rapid activity, development, or growth, to begin",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Close on the heels",
    "meaning": "happening soon after another event, following close behind someone or something",
    "example": "Her remarks came hard on the heels of a statement by the President.",
    "usage": "Used to express: happening soon after another event, following close behind someone or something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Chalk out",
    "meaning": "to explain something carefully to someone, as if one were talking about a chalk drawing.",
    "example": "Directing status quo in the matter till August 22, which is also the next date of hearing, the apex court ordered the Medical Council of India (MCI) and the State government to cha",
    "usage": "Used to express: to explain something carefully to someone, as if one were talking about a chalk ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Mow someone or something down",
    "meaning": "to violently cause someone or something to fall.",
    "example": "The car skidded along the side of the road and mowed down several mailboxes before coming to a stop",
    "usage": "Used to express: to violently cause someone or something to fall.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Plough into someone/something",
    "meaning": "to crash into someone or something with force, especially because you are moving or driving too quickly or in a careless or uncontrolled way",
    "example": "On Thursday afternoon, Oukabir and his associates drove a van along Barcelonas crowded Las Ramblas thoroughfare, ploughing into tourists leaving 13 dead and more than 100 injured.",
    "usage": "Used to express: to crash into someone or something with force, especially because you are moving",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Wearing off",
    "meaning": "lose effectiveness or intensity.",
    "example": "With the impact of the slowdown on the citys residential market wearing off, inventory levels are now gradually decreasing",
    "usage": "Used to express: lose effectiveness or intensity.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Have/take a crack at something",
    "meaning": "to try something",
    "example": "He didn't win the tennis championships, but he plans to have another crack at it next year. I would love to have another crack at the pro game, says Staffordshire's, Sam Kelsall",
    "usage": "Used to express: to try something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Brushed aside",
    "meaning": "to refuse to accept that something is important or true",
    "example": "PCB has announced that it would serve Umar Akmal with a show cause notice even as head coach Mickey Arthur brushed aside the allegations leveled against him by the middle order bat",
    "usage": "Used to express: to refuse to accept that something is important or true",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Knockout",
    "meaning": "defeat",
    "example": "Conor Mc Gregor believes he will knock out Floyd Mayweather inside two rounds but is ready for all scenarios when the two fighters clash in their eagerly anticipated",
    "usage": "Used to express: defeat",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Picked up",
    "meaning": "become better; improve, to come down with",
    "example": "Tests carried out on Thursday morning confirm that the Uruguayan has a distension in the posterior articular capsule in his right knew picked up in the second half of the Clasico i",
    "usage": "Used to express: become better; improve, to come down with",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Ruled out",
    "meaning": "to prevent, disqualify, overrule, or cancel someone or something",
    "example": "Juventus on Thursday ruled key defender Giorgio Chiellini out of the Champions League final against Barcelona after he suffered a muscle tear in training",
    "usage": "Used to express: to prevent, disqualify, overrule, or cancel someone or something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Hit the right note",
    "meaning": "if something you say or do hits the right note, it is suitable and has a good effect",
    "example": "It was an optional session where Dhoni, Kedar Jadhav, Manish Pandey, Shardul Thakur, Yuzvendra Chahal and Jasprit Bumrah looked like hitting the right notes ahead of what will be t",
    "usage": "Used to express: if something you say or do hits the right note, it is suitable and has a good ef",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Fend off",
    "meaning": "prevent the occurrence of; prevent from happening;",
    "example": "The spotlight, though, was on the 36-year-old Dhoni, who now has to fend off questions about his future with alarming regularity.",
    "usage": "Used to express: prevent the occurrence of; prevent from happening;",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Pale shadow",
    "meaning": "Less impressive or not as good as before or when compared with someone or something similar",
    "example": "Yet, there is no denying that the former skipper has looked a pale shadow of his past glorious self on many occasions, the last of which was in the West Indies recently, when he sc",
    "usage": "Used to express: less impressive or not as good as before or when compared with someone or someth",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Dig in",
    "meaning": "to prepare yourself for a difficult situation",
    "example": "Both sides are digging in for a long and bitter dispute.",
    "usage": "Used to express: to prepare yourself for a difficult situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To burst the bubble",
    "meaning": "to disabuse someone of a false notion or rationalization that has grown comfortable",
    "example": "Daniel Craig's comments came just hours after he told a radio station; Id hate to burst the bubble, but no decision has been made at the moment",
    "usage": "Used to express: to disabuse someone of a false notion or rationalization that has grown comforta",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "On the run",
    "meaning": "trying to avoid being captured",
    "example": "A third woman came forward on Tuesday to accuse Roman Polanski of sexual assault when she was a minor, four decades after he went on the run for raping another girl",
    "usage": "Used to express: trying to avoid being captured",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Put on airs",
    "meaning": "Pretend to be better than one is",
    "example": "He didnt have to put on airs. He was the nicest guy.",
    "usage": "Used to express: pretend to be better than one is",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A bolt out of the blue.",
    "meaning": "a sudden unexpected event",
    "example": "Bill's dropping his life insurance was a bolt from the blue for his wife",
    "usage": "Used to express: a sudden unexpected event",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "hard"
  },
  {
    "idiom": "Don't look a gift horse in the mouth",
    "meaning": "dont be ungrateful when you receive a gift",
    "example": "I know the car is not in great condition, but you shouldn't look a gift horse in the mouth.",
    "usage": "Used to express: dont be ungrateful when you receive a gift",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "hard"
  },
  {
    "idiom": "Shoots up",
    "meaning": "to increase very quickly in size or amount",
    "example": "Some athletes are suspected of shooting up steroids to improve their strength.",
    "usage": "Used to express: to increase very quickly in size or amount",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Wrapped up",
    "meaning": "involved with someone or something",
    "example": "She is all wrapped up with her husband and his problems",
    "usage": "Used to express: involved with someone or something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Keeps his nerves/ holds his nerves",
    "meaning": "you remain calm and determined in a difficult situation",
    "example": "Justin Thomas keeps his nerve, wins PGA championship",
    "usage": "Used to express: you remain calm and determined in a difficult situation",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "Has an edge",
    "meaning": "to have an advantage, enjoy a superior or winning position",
    "example": "The new Renault has the edge on other similar models - it's larger and cheaper.",
    "usage": "Used to express: to have an advantage, enjoy a superior or winning position",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Set down",
    "meaning": "to consider something in a particular way, o write something on a piece of paper so that it will not be forgotten and can be looked at later",
    "example": "Its often a lot of work to set your thoughts down on paper.",
    "usage": "Used to express: to consider something in a particular way, o write something on a piece of paper",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "In the pink",
    "meaning": "very healthy",
    "example": "He recovered completely from his surgery and has been in the pink ever since",
    "usage": "Used to express: very healthy",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pulled up",
    "meaning": "come to a halt. increase the altitude",
    "example": "A van pulled up outside the cottage with six men inside",
    "usage": "Used to express: come to a halt. increase the altitude",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To run hot",
    "meaning": "be ahead of ones shcedule",
    "example": "Sundar is running hot in his cricket career",
    "usage": "Used to express: be ahead of ones shcedule",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Roar to life",
    "meaning": "to begin working",
    "example": "He puts his foot on the accelerator and the innings roars to life",
    "usage": "Used to express: to begin working",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Sketched out",
    "meaning": "to give a short description of something, containing few details:",
    "example": "In his shortest Independence Day address yet, Prime Minister Narendra Modi on Tuesday sketched out the broad contours of his idea of a New India as one that was free of communali",
    "usage": "Used to express: to give a short description of something, containing few details:",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Blacked out",
    "meaning": "to suppress by censorship",
    "example": "The CPI(M) said on Tuesday that Tripura Chief Minister Manik Sarkars Independence Day speech was blacked out by Doordarshan and All India Radio",
    "usage": "Used to express: to suppress by censorship",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Trampling on",
    "meaning": "to crush someone or something underfoot, To tread heavily or destructively on something",
    "example": "The children trampled on the flowers",
    "usage": "Used to express: to crush someone or something underfoot, to tread heavily or destructively on so",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Give up",
    "meaning": "to stop doing something that you do regularly",
    "example": "The Union home ministry is set to give up its power to impose the disturbed",
    "usage": "Used to express: to stop doing something that you do regularly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Trickle in",
    "meaning": "to come into something or a place, a few at a time",
    "example": "More people trickled in, almost all of them in their sixties and seventies. Bulbul Sen, a retired school teacher and joint secretary of the Samity, said without the governments su",
    "usage": "Used to express: to come into something or a place, a few at a time",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Ring in",
    "meaning": "(ring in something), to ring bells to celebrate something, especially the new year",
    "example": "Janamastmi was rung in with religious fervor in Maharastra on Tuesday.",
    "usage": "Used to express: (ring in something), to ring bells to celebrate something, especially the new ye",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "To fan the flames",
    "meaning": "make something more intense; to make a situation worse",
    "example": "The riot fanned the flames of racial hatred even more.",
    "usage": "Used to express: make something more intense; to make a situation worse",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Cruise around in something",
    "meaning": "to drive or ride around in something",
    "example": "Would you like to cruise around in a car like that?",
    "usage": "Used to express: to drive or ride around in something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Chips in",
    "meaning": "to add something to someone elses conversation , To contribute to something being undertaken by a group, such as a task or collection",
    "example": "Athisyaraj chips in with a four wicket haul as the side eases past super gillies",
    "usage": "Used to express: to add something to someone elses conversation , to contribute to something bei",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Tighten the screws",
    "meaning": "exert strong pressure on someone.",
    "example": "Washington contained and struck to tighten the screws on the Super Gillies batting and then waded into the attack for the quickest half century in TNPL",
    "usage": "Used to express: exert strong pressure on someone.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Set the tone",
    "meaning": "to establish a particular mood or character for something",
    "example": "The lanky Wahingtons Blitzkrieg shut out the opposition.To the super gillie's attack, he must have seemed a force of nature.Washington blasted paceman for three successive sixes i",
    "usage": "Used to express: to establish a particular mood or character for something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "Shut out",
    "meaning": "to not allow someone to enter a particular place, if you shut something out, you stop yourself from seeing it, hearing it, or thinking about it",
    "example": "The lanky Wahingtons Blitzkrieg shut out the opposition.To the super gillie's attack, he must have seemed a force of nature.Washington blasted paceman for three successive sixes i",
    "usage": "Used to express: to not allow someone to enter a particular place, if you shut something out, you",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Racked up",
    "meaning": "to get a large number or amount of something",
    "example": "Mr. Trump deleted his retweet on Tuesday after about five minutes, but not before the message sent to his 35 million followers racked up a big response.",
    "usage": "Used to express: to get a large number or amount of something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A penny for your thoughts",
    "meaning": "A way of asking what someone is thinking",
    "example": "For several minutes they sat silently, then finally she looked at him and said, A penny for your thoughts, Walter'",
    "usage": "Used to express: a way of asking what someone is thinking",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "To keep ones head above water",
    "meaning": "avoid succumbing to difficulties, typically debt.",
    "example": "The business is in trouble, but we are just about keeping our heads above water.",
    "usage": "Used to express: avoid succumbing to difficulties, typically debt.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "A clarion call",
    "meaning": "a strong and clear request for people to do something",
    "example": "In 1942, the clarion call was  Karenge ya marenge  (Do or Die)  today it is  Karenge aur kar ke rahenge  (We will do and accomplish). These five years are about Sankalp se sid",
    "usage": "Used to express: a strong and clear request for people to do something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Against the odds",
    "meaning": "despite many difficulties",
    "example": "Congress president Sonia Gandhis political secretary Ahmed Patel may have won a high-stakes Rajya Sabha battle against great odds, but the mystery about the one extra vote that pr",
    "usage": "Used to express: despite many difficulties",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Pitched against someone",
    "meaning": "to make someone fight or compete against someone else",
    "example": "Mr. Patel received a total of 44 votes to win the prestigious fight that saw him pitched against BJPs Amit Shah, known for his election and political strategies.",
    "usage": "Used to express: to make someone fight or compete against someone else",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Teeming down",
    "meaning": "to rain very heavily",
    "example": "Its been teeming down all day.",
    "usage": "Used to express: to rain very heavily",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Send someone to glory",
    "meaning": "to kill someone, to officiate at the burial services for someone",
    "example": "The preacher sent him to glory amidst the sobs of six or seven former fans.",
    "usage": "Used to express: to kill someone, to officiate at the burial services for someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Tees off",
    "meaning": "to start the first hole in a game of golf, to begin [doing anything]; to be the first one to start something, (to tee someone off )",
    "example": "Jordan Spieth and Rory McIlroy make their bids for golfing history when the 99th PGA Championship tees off Thursday at Quail Hollow with heavy rain and storms forecast.",
    "usage": "Used to express: to start the first hole in a game of golf, to begin [doing anything]; to be the ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Claw back",
    "meaning": "to get something again that you had lost such as power, especially gradually and with difficulty",
    "example": "Schwartzman claws back from the brink",
    "usage": "Used to express: to get something again that you had lost such as power, especially gradually and",
    "exam": ["SSC", "Banking", "UPSC", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Tune up",
    "meaning": "to prepare for something",
    "example": "Croatias Vekic powered to a 6-3, 6-4 victory, to the disappointment of a partisan crowd whose support couldnt lift Bouchard. She was broken six times by Vekic, 21, who is in the ",
    "usage": "Used to express: to prepare for something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Shoot off",
    "meaning": "to write and send a message quickly",
    "example": "My daughter will shoot off an e-mail before shell sit down and write a letter.",
    "usage": "Used to express: to write and send a message quickly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Crunch up",
    "meaning": "to break someone or something up into piece",
    "example": "Yet he gave an assurance that the huge IT back end that is designed to crunch up to 3 billion invoices a month and calculate companies taxes would be stable, even if there is a la",
    "usage": "Used to express: to break someone or something up into piece",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "A chip off the old block",
    "meaning": "someone who resembles their parent in character or appearance",
    "example": "Meher has a very little patience-a chip off the old block.",
    "usage": "Used to express: someone who resembles their parent in character or appearance",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "To throw up the sponge/throw in the towel",
    "meaning": "to stop trying to do something because you know that you cannot succeed",
    "example": "Three of the original five candidates have now thrown in the towel.",
    "usage": "Used to express: to stop trying to do something because you know that you cannot succeed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Cry down",
    "meaning": "to belittle; disparage, to silence by making a greater noise",
    "example": "Men of dissolute lives cry down religion because they would not be under the restraints",
    "usage": "Used to express: to belittle; disparage, to silence by making a greater noise",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "easy"
  },
  {
    "idiom": "Take on",
    "meaning": "become very upset, fight against someone",
    "example": "After a delay in counting, the Election commission announced the names of the winners, while the fourth candidate Balwantsinh Rajput of the BJP, who resigned as Congress leader to ",
    "usage": "Used to express: become very upset, fight against someone",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Tightrope walk",
    "meaning": "to be in a situation where one must be very cautious.",
    "example": "After a delay in counting, the Election commission announced the names of the winners, while the fourth candidate Balwantsinh Rajput of the BJP, who resigned as Congress leader to ",
    "usage": "Used to express: to be in a situation where one must be very cautious.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Passed himself off",
    "meaning": "pretend to be",
    "example": "He passed himself off as a great and rich man",
    "usage": "Used to express: pretend to be",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Ramp up",
    "meaning": "to increase the amount or size of something",
    "example": "The maker of iconic products like the iPhone and the Mac is looking at a multi pronged strategy to ramp up its presence in one of the fastest growing markets in the world.",
    "usage": "Used to express: to increase the amount or size of something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Scaling up",
    "meaning": "to make something larger in size, amount etc than it used to be",
    "example": "This includes scaling up its manufacturing, developing localized features on its OS, setting up self-owned retail outlets and creating an ecosystem for developers to shift from and",
    "usage": "Used to express: to make something larger in size, amount etc than it used to be",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Narrowing down",
    "meaning": "to reduce the number of possibilities or choices",
    "example": "In this case, for the first time, we were able to identify some key papers and documents. we also spoke to the banks, gathered CCTV footage and collected bank",
    "usage": "Used to express: to reduce the number of possibilities or choices",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Roped in",
    "meaning": "to persuade to take part in some activity or to trick or entice into some activity",
    "example": "Despite the smashing success of the show elsewhere, and actor Kamal Haasan being roped in, there were doubts over whether a show that depends on surveillance and an intrusion on pr",
    "usage": "Used to express: to persuade to take part in some activity or to trick or entice into some activi",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Notched up",
    "meaning": "to win something, or to achieve something",
    "example": "Jones, who notched up 3631 runs in 52 Tests at",
    "usage": "Used to express: to win something, or to achieve something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Held off",
    "meaning": "to stop an opponent from starting to win or lead",
    "example": "In a fantastic race that erupted on the final lap, Kipyegon held off all-comers, including double-hunting Semenya, down the home straight to clock 4min",
    "usage": "Used to express: to stop an opponent from starting to win or lead",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Bear the brunt of",
    "meaning": "to receive the worst part of something unpleasant or harmful, such as an attack",
    "example": "Young people are bearing the brunt of unemployment",
    "usage": "Used to express: to receive the worst part of something unpleasant or harmful, such as an attack",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Hush up",
    "meaning": "to keep something a secret; to try to stop a rumour from spreading.",
    "example": "Centre attempting to hush up incident , alleges Congress There was some financial scandal involving one of the ministers but it was all hushed up.",
    "usage": "Used to express: to keep something a secret; to try to stop a rumour from spreading.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "easy"
  },
  {
    "idiom": "To keep its flock together",
    "meaning": "to gather together in great numbers.",
    "example": "Gujarat MLAs , who were flown to Bengaluru 10 days ago s part of the partys desperate move to keep its flock together amid several defections .returned to Gujarat",
    "usage": "Used to express: to gather together in great numbers.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "In the dock",
    "meaning": "On trial or under intense scrutiny. Example : Under attack fro diluting the case of alleged stalking and attempted kidnap of a young woman on Friday night by Vikas Barala , son of the Haryana state BJP president Subahsh barala and his Ashish , the Chandigarh police on Monday fount itself again in the dock after it was reported that CCTV footage from at least five locations was missing as the cameras were non-functional.",
    "example": "The examiner used 'in the dock' in the sentence to test students.",
    "usage": "Used to express: on trial or under intense scrutiny. example : under attack fro diluting the case",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Hover over",
    "meaning": "to stay close to someone or something, waiting, ready to advise or interfere. Example :Please don't hover over me, watching what I am doing. I have to hover over this project or someone will mess it up.",
    "example": "The examiner used 'hover over' in the sentence to test students.",
    "usage": "Used to express: to stay close to someone or something, waiting, ready to advise or interfere. ex",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Brought up",
    "meaning": "to start discussing a subject",
    "example": "Mr. Sonowal brought up the idea when he called on the president on Saturday.",
    "usage": "Used to express: to start discussing a subject",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Call on someone",
    "meaning": "to visit someone, usually for a short time ,",
    "example": "Mr. Sonowal brought up the idea when he called on the president on Saturday",
    "usage": "Used to express: to visit someone, usually for a short time ,",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Beat someone down",
    "meaning": "to defeat or demoralize someone. Example :Samir Singh got to within 36 km of his goal of running 10000km I n100 days when pain and exhaustion beat him down",
    "example": "The examiner used 'beat someone down' in the sentence to test students.",
    "usage": "Used to express: to defeat or demoralize someone. example :samir singh got to within 36 km of his",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Keep/ have your tail up",
    "meaning": "If someone has their tail up, they are optimistic and expect to be successful.",
    "example": "The Indian team keeps their tail up for the upcoming match",
    "usage": "Used to express: if someone has their tail up, they are optimistic and expect to be successful.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Boxed into a corner",
    "meaning": "To create a predicament or unpleasant situation for oneself whereby there are no or very few favourable solutions or outcomes Example : This is not the first time that Jadeja has found himself boxed into a corner.",
    "example": "The examiner used 'boxed into a corner' in the sentence to test students.",
    "usage": "Used to express: to create a predicament or unpleasant situation for oneself whereby there are no",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Map out",
    "meaning": ": to decide in detail how something will be done",
    "example": "He was plagued by Gstro-intestinal infections and contracted viral fever but has run",
    "usage": "Used to express: : to decide in detail how something will be done",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "whisked away",
    "meaning": "To escort, conduct, or carry someone or something swiftly and quietly away",
    "example": "The bodyguards whisked away the politician after the speech.",
    "usage": "Used to express: to escort, conduct, or carry someone or something swiftly and quietly away",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "spot on",
    "meaning": "Exactly right; perfectly accurate",
    "example": "Drag flick specialist Diwakar Ram, who had put up a sterling show throughout the tournament was spot on in the final too",
    "usage": "Used to express: exactly right; perfectly accurate",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "play / cry / sing hearts out",
    "meaning": "to do something with vigour or intensity.",
    "example": "both teams played their hearts out in an entertaining contest",
    "usage": "Used to express: to do something with vigour or intensity.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "hard"
  },
  {
    "idiom": "4: with tail between legs",
    "meaning": "Appearing frightened or cowardly",
    "example": "The frightened dog ran away with its tail between its legs when the bigger dog growled.",
    "usage": "Used to express: appearing frightened or cowardly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "in the thick of things",
    "meaning": "to be very involved at the busiest or most active stage of a situation or activity",
    "example": "A fierce debate ensued and he found himself in the thick of it.",
    "usage": "Used to express: to be very involved at the busiest or most active stage of a situation or activi",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Taste of your own medicine",
    "meaning": "you do something bad to someone that they have done to you to teach them a lesson.",
    "example": "John, who is often rude and abrupt with people, was devastated when the teacher treated him rudely. He doesn't like having a dose of his own medicine.",
    "usage": "Used to express: you do something bad to someone that they have done to you to teach them a lesso",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "A fair crack of the whip",
    "meaning": "an equal chance to do something",
    "example": "In India all the students should be given a fair crack of the whip.",
    "usage": "Used to express: an equal chance to do something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "cutting loose",
    "meaning": "to behave in an uncontrolled, wild way",
    "example": "Don't be too hard on them - they're just kids and they need to cut loose sometimes.",
    "usage": "Used to express: to behave in an uncontrolled, wild way",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Wiped out",
    "meaning": "to kill someone , a decisive defeat , to clean completely by wiping:",
    "example": "Malawi on Thursday celebrated successful conclusion of a two year project moving 520 sedated elephants by truck to a reserve where the animals had been nearly wiped out They wiped ",
    "usage": "Used to express: to kill someone , a decisive defeat , to clean completely by wiping:",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Calls off",
    "meaning": "to decide that something will not happen , cancel",
    "example": "Example : Following appeals by film-makers and producers , the Film Employees Federation of South india (FEFSI) on Thursday called off its strike",
    "usage": "Used to express: to decide that something will not happen , cancel",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "boss someone around",
    "meaning": "To tell one what to do",
    "example": "Stop bossing me around. I'm not your employee. Captain Smith bosses around the whole crew. That's his job",
    "usage": "Used to express: to tell one what to do",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "Run up",
    "meaning": "to raise or hoist something, such as a flag , to cause something to go higher, such as the price of stocks or commodities",
    "example": "Example : In the Run up to the implementation of GST , we did expect many challenges including an impact on trade pipeline inventory",
    "usage": "Used to express: to raise or hoist something, such as a flag , to cause something to go higher, s",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "easy"
  },
  {
    "idiom": "To live in clover",
    "meaning": "Meaning : having good fortune; in a very good situation, especially financially",
    "example": "If I get this contract, I'll be in clover for the rest of my life.",
    "usage": "Used to express: meaning : having good fortune; in a very good situation, especially financially",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "medium"
  },
  {
    "idiom": "to be in two minds",
    "meaning": "Meaning : to be unable to decide about something:",
    "example": "Im in two minds about accepting the job",
    "usage": "Used to express: meaning : to be unable to decide about something:",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "to talk shop",
    "meaning": "to talk about work when not working",
    "example": "Two New York Yankee pitchers will be there to sign autographs and talk shop with fans.",
    "usage": "Used to express: to talk about work when not working",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "to make the grade",
    "meaning": "to be satisfactory; to be what is expected.",
    "example": "He wanted to get into medical school but he failed to make the grade.",
    "usage": "Used to express: to be satisfactory; to be what is expected.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "picking holes",
    "meaning": "to find mistakes in something someone has done or said, to show that it is not good or not correct",
    "example": "He is always picking holes in every project",
    "usage": "Used to express: to find mistakes in something someone has done or said, to show that it is not g",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "with tail between legs",
    "meaning": "Appearing frightened or cowardly",
    "example": "The frightened dog ran away with its tail between its legs when the bigger dog growled.",
    "usage": "Used to express: appearing frightened or cowardly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Buck the odds",
    "meaning": "To buck the odds means to go against the odds. Despite the odds not being in your favour, you still won.",
    "example": "Given the manner she has been bucking the odds, nothing seems impossible for the brave Jyotika far far away from the glitz-laden metros.",
    "usage": "Used to express: to buck the odds means to go against the odds. despite the odds not being in you",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Break through",
    "meaning": "If you break through, you achieve success even though there are difficulties and obstacles.",
    "example": "Indeed , the shy Jyothika has a heart larger than her small frame.Given her background and modest means, she has been breaking through barriers.",
    "usage": "Used to express: if you break through, you achieve success even though there are difficulties and",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Zero in on",
    "meaning": "to direct all your attention to one thing , If you zero in a weapon, you aim it directly at something you want to hit:",
    "example": "This was not the first time . he had come to meet his wife on two occasions earlier, and he followed the same pattern and time .It was easy for the police to zero in on him. Said",
    "usage": "Used to express: to direct all your attention to one thing , if you zero in a weapon, you aim it ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Holed up",
    "meaning": "to take shelter somewhere , to hide somewhere.",
    "example": "Soldiers seen at the house at Hakripora in Pluwara district ,where the militants were holed up, on Tuesday. The robbers were holed up in a deserted warehouse.",
    "usage": "Used to express: to take shelter somewhere , to hide somewhere.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Live something down",
    "meaning": "to make people forget that you made a big mistake or did something very embarrassing in the past:",
    "example": "Having mishandled NEET is one failure that the Tamilnadu government will struggle to live down",
    "usage": "Used to express: to make people forget that you made a big mistake or did something very embarras",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Music to the ears",
    "meaning": "a welcome sound to someone; news that someone is pleased to hear",
    "example": "The winter session of 2016 hit a low point of 16%.It is shameful.Taxation bills, as significant as Aadhaar , were passed within two weeks without being referred toa commitmee he s",
    "usage": "Used to express: a welcome sound to someone; news that someone is pleased to hear",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Lavish something on someone",
    "meaning": "to give someone a lot, or too much, of something such as money, presents, or attention:",
    "example": "MR.Trump lavished praise on Gen.Kelly after he was sworn in , but that may not necessarily guarantee anything in the long term.",
    "usage": "Used to express: to give someone a lot, or too much, of something such as money, presents, or att",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "money",
    "difficulty": "medium"
  },
  {
    "idiom": "Wound up",
    "meaning": "brought to a state of great tension",
    "example": "A former India captain ,who served the squad as its team director just a year bach , Shastri steps into the shoes of Anil kumble , whose manner of exit showed the BCCI and Skipper ",
    "usage": "Used to express: brought to a state of great tension",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Step into someones shoes",
    "meaning": "to take on a particular role or task that someone else has been doing",
    "example": "A former India captain ,who served the squad as its team director just a year bach , Shastri steps into the shoes of Anil kumble , whose manner of exit showed the BCCI and Skipper ",
    "usage": "Used to express: to take on a particular role or task that someone else has been doing",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Served up",
    "meaning": "to offer something",
    "example": "Serena Williams served up a rallying cry for equal pay for black women , decrying that they would have to work on average eight months longer to earn the same",
    "usage": "Used to express: to offer something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Chip on ones shoulder",
    "meaning": "an angry attitude from someone who feels unfairly treated:",
    "example": "Shes not going to make any friends if she walks around with a chip on her shoulder like that.",
    "usage": "Used to express: an angry attitude from someone who feels unfairly treated:",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Steal The Show",
    "meaning": "attracts the most attention and praise.",
    "example": "Falcons TTCS Wu Yang, who stole the show on the final night of the inaugural Ultimate Table tennis league on Sunday, walked away with the biggest individual purse of Rs.",
    "usage": "Used to express: attracts the most attention and praise.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Walk All Over Someone",
    "meaning": "to treat someone badly by always making them do what you want them to do",
    "example": "If you don't want to work at the weekend, say so - don't let the boss walk all over you.",
    "usage": "Used to express: to treat someone badly by always making them do what you want them to do",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Make The Cut",
    "meaning": "To survive an elimination when a team or group is being chosen",
    "example": "By his own admission, Jeev Mikha Singh has not had a great 2017, h e has made the cut only four times from 13 appearances on the Asian and European Tours, his best finish a tied 22",
    "usage": "Used to express: to survive an elimination when a team or group is being chosen",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Bring / Ring The Curtain Down",
    "meaning": "to bring something to an end; to declare something to be at an end",
    "example": "Caeleb Dressel brought the curtain down on the World championships with a historic seventh medal here on Sunday, equaling the record of swim legend Michael Phelps.",
    "usage": "Used to express: to bring something to an end; to declare something to be at an end",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "hard"
  },
  {
    "idiom": "Make A Splash",
    "meaning": "to get a lot of public attention",
    "example": "Now she's made a splash in the American television show 'Civil Wars'.",
    "usage": "Used to express: to get a lot of public attention",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Spruced Up",
    "meaning": "to improve the appearance of someone or something, Make neat and trim,",
    "example": "The Karnataka Golf Association has undergone much work to be ready for this weeks TAKE SOLUTIONS MASTERS, the first Asian Tour event at the venue since the Indian open in",
    "usage": "Used to express: to improve the appearance of someone or something, make neat and trim,",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Shunted Out",
    "meaning": "to move (someone or something) to a different and usually less important or noticeable place or position.",
    "example": "Daniel Ricciardo blasted Red Bull teammate Max Verstappen for amateur diving on Sunday after the Dutch teenager shunted him out of the Hungarian GP on the opening lap.",
    "usage": "Used to express: to move (someone or something) to a different and usually less important or noti",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Taking Its Toll",
    "meaning": "to cause harm or suffering",
    "example": "A little more than a year after the alleged Russian effort to interfere in the US. Presidential election came to light, the diplomatic fallout an unravelling of the relationship b",
    "usage": "Used to express: to cause harm or suffering",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Mended His Ways",
    "meaning": "to improve your behaviour after you have been behaving badly for a long time",
    "example": ": Appearing before a Bench led by Justice Dipak Mishra, Attorney General K.K.Venugopal highlighted that Mr.khan had not mended his ways even after rendering an apology to the supre",
    "usage": "Used to express: to improve your behaviour after you have been behaving badly for a long time",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Back to drawing board",
    "meaning": "Revising something (such as a plan) from the beginning, typically after it has failed",
    "example": "Having triggered an avalanche of litigation across the country, the prevention of Cruelty to animal (regulation of livestock market) rules of 2017, which ban the sale of cattle in ",
    "usage": "Used to express: revising something (such as a plan) from the beginning, typically after it has f",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Lash out",
    "meaning": "to suddenly attack someone or something physically or criticize him, her, or it in an angry way",
    "example": "After the incident, Mr.Gandhi lashed out on twitter at the BJP govt. in the state and at the centre, saying he would not be deterred by stones or black flags.",
    "usage": "Used to express: to suddenly attack someone or something physically or criticize him, her, or it ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "emotion",
    "difficulty": "easy"
  },
  {
    "idiom": "Ratcheting up",
    "meaning": "To cause something to increase in increments",
    "example": "Ratcheting up the political temperature, TTV Dhinakaran, deputy general secretary of the All India Anna Dravida Munnetra Kazhagam (amma), announced his plan to tour the state and a",
    "usage": "Used to express: to cause something to increase in increments",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "easy"
  },
  {
    "idiom": "Hunt down",
    "meaning": "to try to find a particular thing or person",
    "example": "The summer postcard campaign by the European policy agency, Europol , was unveiled on Friday on its EU most wanted website as part of its ongoing initiative to hunt down Europes m",
    "usage": "Used to express: to try to find a particular thing or person",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Hang up",
    "meaning": "To disconnect a phone call, o give up on someone or something; to quit dealing with someone or something.",
    "example": "Usain Bolt insists he will hang up his running spike after the world championships in London.",
    "usage": "Used to express: to disconnect a phone call, o give up on someone or something; to quit dealing w",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "stack up (against something)",
    "meaning": "to compare with something else , To make sense; add up",
    "example": "We wondered how London restaurants stacked up against Atlanta's. The story he gave the police was full of contradictionsit just didn't stack up.",
    "usage": "Used to express: to compare with something else , to make sense; add up",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Raise the bar",
    "meaning": "to make a task a little more difficult, To raise the standards of quality that are expected of or required for something",
    "example": "Now free and confident Anna after winning maiden Asian 400 m gold at Bhubaneshwar, Ana could raise the bar in London",
    "usage": "Used to express: to make a task a little more difficult, to raise the standards of quality that a",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Playing second fiddle to someone",
    "meaning": "To play a supporting or minor role in relation to someone else",
    "example": "He also denied that he had tired out of playing second fiddle to Lionel Messi at",
    "usage": "Used to express: to play a supporting or minor role in relation to someone else",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Miss the cut",
    "meaning": "(golf)to achieve a greater score after the first two rounds of a strokeplay tournament than that required to play in the remaining two rounds",
    "example": "He arrives here after having missed the cut at the Irish and scottish opens , but then he was in similarly wretched form before the secured the Indian open in March",
    "usage": "Used to express: (golf)to achieve a greater score after the first two rounds of a strokeplay tour",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Rule out",
    "meaning": "to stop considering something as a possibility",
    "example": "Mr.Tillerson did not rule out a military strike against North Korea in remarks that were overall not strident at the state department",
    "usage": "Used to express: to stop considering something as a possibility",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Cut to the size",
    "meaning": "to make someone or something less important or detailed",
    "example": "Has Digvijaya Singh been cut to size?",
    "usage": "Used to express: to make someone or something less important or detailed",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Scrape through",
    "meaning": "to move through something, scraping or rubbing the sides, to get by something just barely; to pass a test just barely.",
    "example": "The car, going at a very high speed, scraped through the tunnel. It just managed to scrape through Alice passed the test, but she just scraped through it. I just scraped through my",
    "usage": "Used to express: to move through something, scraping or rubbing the sides, to get by something ju",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "knock on the door of",
    "meaning": "to be very close to achieving",
    "example": "The Income  tax raids on the premises of Energy Minister D.K.Shivakumar and his close aides have sent shock waves among leaders of the ruling congress in Karnataka, with apprehens",
    "usage": "Used to express: to be very close to achieving",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "medium"
  },
  {
    "idiom": "Pulled out",
    "meaning": "withdraw from an undertaking.",
    "example": ": While the Jaiprakash Associates led consortium, including IBM and Israels tower semiconductor, had pulled out in March last year, things were not moving ahead for the consortium",
    "usage": "Used to express: withdraw from an undertaking.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "On a knifes edge",
    "meaning": "if a person or organization is on a knife-edge, they are in a difficult situation and are worried about what will happen in the future",
    "example": "She's been living on a knife-edge since her ex-husband was released from prison last month. The theatre is on a financial knife-edge and must sell 75% of its seats every night to s",
    "usage": "Used to express: if a person or organization is on a knife-edge, they are in a difficult situatio",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hinged on",
    "meaning": "to depend on someone or something; to depend on what someone or something does",
    "example": "The Monetary Policy Committees majority decision hinged on the observation that some upside risks to inflation have either reduced or not materialized ",
    "usage": "Used to express: to depend on someone or something; to depend on what someone or something does",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Roll out",
    "meaning": "to offer a new product or service to the public",
    "example": "Driving down Indias national highways could be a much safer experience by the end of this year, with the National Highways Authority of India (NHAI) set to roll out an incident m",
    "usage": "Used to express: to offer a new product or service to the public",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Shot back",
    "meaning": "Return quickly",
    "example": "The Congress shot back with Mr. Gandhi suggesting that the Chief Minister should resign for the controversial deaths of the children in the hospital.",
    "usage": "Used to express: return quickly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Slipped back",
    "meaning": "to move quietly and cautiously back to someone or something",
    "example": "Lieutenant Governor (L-G) Kiran Bedi on Friday slipped back into her erstwhile role of a cop by riding pillion with her staff on a midnight motorbike inspection of the",
    "usage": "Used to express: to move quietly and cautiously back to someone or something",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Under fire",
    "meaning": "being criticized",
    "example": "Under fire for the deaths of more than 100 children in the BRD Medical College hospital, Mr. Adityanath launched a week-long cleanliness drive in UP  Swachh Uttar Pradesh, Swaasth",
    "usage": "Used to express: being criticized",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Fired up",
    "meaning": "to motivate someone; to make someone enthusiastic",
    "example": "I was so fired up with a nationalistic fervour that I whipped out my smartphone and took a video of myself taking the Sankalp se Siddhi (achievement through resolve) pledge.",
    "usage": "Used to express: to motivate someone; to make someone enthusiastic",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "easy"
  },
  {
    "idiom": "Whipped out",
    "meaning": "To make or produce something quickly",
    "example": "I was so fired up with a nationalistic fervour that I whipped out my smartphone and took a video of myself taking the Sankalp se Siddhi (achievement through resolve) pledge.",
    "usage": "Used to express: to make or produce something quickly",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Showed up",
    "meaning": "To cause or allow to be seen; display",
    "example": "The inexperience of two young Gujarat players Udit Kamdar and Fenil Shah showed up at inopportune times and allowed the Grandmaster duo of Swapnil Dhopade and Himanshu Sharma escap",
    "usage": "Used to express: to cause or allow to be seen; display",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Lays down",
    "meaning": "to state officially what someone must do or how they must do it, to give up, establish",
    "example": "The EU has laid down tough standards for water quality",
    "usage": "Used to express: to state officially what someone must do or how they must do it, to give up, est",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Tumbled out",
    "meaning": "to fall, topple, or drop out of something, arise",
    "example": "Akash Saharan tumbled out first in the trap final in the Junior shotgun World Cup here on Friday.He qualified for the final with the score of 114",
    "usage": "Used to express: to fall, topple, or drop out of something, arise",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Wriggle out",
    "meaning": "to free oneself from something by turning or twisting the body with sinuous writhing motions",
    "example": "With 13 points, Chaudhari was the best raider in action and his ability to wriggle out of tough situations played a big role in his teams victory",
    "usage": "Used to express: to free oneself from something by turning or twisting the body with sinuous writ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Squares off",
    "meaning": "to get ready for an argument or a fight",
    "example": "The Tests clinched without much of a strain, India will begin the journey to identify the core of its 2019 World Cup squad when it squares off against a low-on- confidence Sri Lank",
    "usage": "Used to express: to get ready for an argument or a fight",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Peg back",
    "meaning": "to prevent an opponent from winning in a game or competition",
    "example": "The underdogs were pegged back by United after that had taken a shock lead.",
    "usage": "Used to express: to prevent an opponent from winning in a game or competition",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Blessing in disguise",
    "meaning": "an apparent misfortune that eventually has good results.",
    "example": "Losing that job was a blessing in disguise really.",
    "usage": "Used to express: an apparent misfortune that eventually has good results.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Draw level",
    "meaning": "to move into a position where you are equal to someone else in a race, game, or competition",
    "example": "Bronze in the 400m proved to be a bittersweet consolation for US track legend Allyson Felix as she drew level with Jamaicans Merlene Ottey and Usain Bolt on having won 14 World Cha",
    "usage": "Used to express: to move into a position where you are equal to someone else in a race, game, or ",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Stroll through",
    "meaning": "to walk casually through something or some place",
    "example": "Federer, Nadal stroll through Let's stroll through a few shops and see what the prices are like here.",
    "usage": "Used to express: to walk casually through something or some place",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Crashed through",
    "meaning": "to break through something forcefully.",
    "example": "Felix crashed through into bronze in Wednesdays 400m after Bahamas rival and race leader Shaunae Miller-Uibo faltered 20 metres from the finish line.",
    "usage": "Used to express: to break through something forcefully.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Edge out",
    "meaning": "to beat someone in something such as a competition or election by a small amount",
    "example": "Earlier , Jaipur Pink Panthers edged out Puneri Paltan( pune)",
    "usage": "Used to express: to beat someone in something such as a competition or election by a small amount",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Drew first blood",
    "meaning": "the initial advantage gained by one side in any game, contest or competition.",
    "example": "Tamil Thalaivas drew first blood in the first minute as Prapanjan scored with a raid point",
    "usage": "Used to express: the initial advantage gained by one side in any game, contest or competition.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Wash out",
    "meaning": "to fail and be removed from something such as school, to rain on or flood an event so that it must be cancelled",
    "example": "I studied all I could, but I still washed out.",
    "usage": "Used to express: to fail and be removed from something such as school, to rain on or flood an eve",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "success",
    "difficulty": "easy"
  },
  {
    "idiom": "Rip up",
    "meaning": "to tear something into small pieces, o decide that something such as a plan or an agreement is useless and stop using it",
    "example": "Felixs unheralded team-mate Phyllis Francis ripped up the form book to claim a shock gold, with Bahrains Salwa Eid Naser taking silver",
    "usage": "Used to express: to tear something into small pieces, o decide that something such as a plan or a",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "easy"
  },
  {
    "idiom": "Fit (or fill) the bill",
    "meaning": "be suitable for a particular purpose.",
    "example": "It is never easy to step into the shoes of a genuine all-rounder like Kapil or exude the multi-faceted dimensions that were intrinsic to Dhoni but Kohli & Co. are hoping that Pandy",
    "usage": "Used to express: be suitable for a particular purpose.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Hold off",
    "meaning": "to not do something immediately",
    "example": "The 21-year-old former multi-eventer demonstrated all the strength he has acquired from competing as an all-rounder as he led from the first hurdle and was powerful enough to hold ",
    "usage": "Used to express: to not do something immediately",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Step into someone's shoes",
    "meaning": "Take someone's place",
    "example": "It is never easy to step into the shoes of a genuine all-rounder like Kapil or exude the multi-faceted dimensions that were intrinsic to Dhoni but Kohli & Co. are hoping that Pandy",
    "usage": "Used to express: take someone's place",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "To pigeon hole",
    "meaning": "to decide that someone or something belongs to a particular type or group, especially without knowing much about them",
    "example": "Pandya is in an unenviable position, his role is one into which previous managements tried to pigeon-hole Ajit Agarkar, Irfan Pathan and more recently Stuart Binny",
    "usage": "Used to express: to decide that someone or something belongs to a particular type or group, espec",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Dished out",
    "meaning": "to give something too freely and in large amounts, to give out trouble, scoldings, criticism",
    "example": "The 23-year old from Gujarat, a certainty in Indias limited-over squads, secured a berth in Tests during the current tour of Sri Lanka. At Galle and in Colombo, Pandya dished out ",
    "usage": "Used to express: to give something too freely and in large amounts, to give out trouble, scolding",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "nature",
    "difficulty": "easy"
  },
  {
    "idiom": "Bits and pieces",
    "meaning": "small things of different types",
    "example": "These are early days still but the numbers hint that Pandya could be more than a bits-and-pieces player, a species prevalent among Kapils men who won the 1983 World Cup. To top it",
    "usage": "Used to express: small things of different types",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Saw off",
    "meaning": "deadlock or stalemate, a compromise",
    "example": "Anand accepted the offer, saw off the offensive and then pushed a queenside pawn to the seventh rank.",
    "usage": "Used to express: deadlock or stalemate, a compromise",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "On the hunt",
    "meaning": "searching",
    "example": "The police are still on the hunt for the escaped convicts",
    "usage": "Used to express: searching",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "body",
    "difficulty": "medium"
  },
  {
    "idiom": "Tick all the boxes",
    "meaning": "To satisfy or fulfill everything that is necessary or desired.",
    "example": "Virat Kohlis men have ticked most of the boxes, be it runs or wickets, with the lone worry being a few butter-fingers in the close-in cordon.",
    "usage": "Used to express: to satisfy or fulfill everything that is necessary or desired.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "color",
    "difficulty": "medium"
  },
  {
    "idiom": "Burn your fingers",
    "meaning": "to have a bad experience when something such as a relationship or a business deal goes wrong",
    "example": "Many investors burned their fingers on those stocks.",
    "usage": "Used to express: to have a bad experience when something such as a relationship or a business dea",
    "exam": ["SSC", "Banking", "CAT", "Railways"],
    "category": "animal",
    "difficulty": "medium"
  },
  {
    "idiom": "Jump the gun",
    "meaning": "act before the proper or appropriate time.",
    "example": "We all had to start the race again because Jane jumped the gun",
    "usage": "Used to express: act before the proper or appropriate time.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "time",
    "difficulty": "medium"
  },
  {
    "idiom": "Cast away",
    "meaning": "wrecked",
    "example": "The boat was cast away by the storm",
    "usage": "Used to express: wrecked",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Worked up",
    "meaning": "excited",
    "example": "He got worked up just by the mention of her name",
    "usage": "Used to express: excited",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "To go at each other hammer and tongs",
    "meaning": "To do something or perform some task with tremendous fervor, determination, energy, or forcefulness. , to do something, especially to argue, with a lot of energy or violence",
    "example": "What started as a minor disagreement has escalated into a heated argument, and the two have been going at it hammer and tongs ever since",
    "usage": "Used to express: to do something or perform some task with tremendous fervor, determination, ener",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "hard"
  },
  {
    "idiom": "To hold a brief for",
    "meaning": "be retained as counsel for , to argue for",
    "example": "Often counsel holding a brief for another does not read it in the confident expectation that the case would be postponed",
    "usage": "Used to express: be retained as counsel for , to argue for",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "communication",
    "difficulty": "medium"
  },
  {
    "idiom": "A mares nest",
    "meaning": "a complex or confused situation; a muddle , an illusory discovery.",
    "example": "The involvement of teachers in the scheme of education proves to be a mares nest",
    "usage": "Used to express: a complex or confused situation; a muddle , an illusory discovery.",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Lay by",
    "meaning": "save for future needs",
    "example": "We should be wise and lay by a considerable amount",
    "usage": "Used to express: save for future needs",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Make out",
    "meaning": "prove , discover , decipher",
    "example": "I cannot make out the Meaning: of this word",
    "usage": "Used to express: prove , discover , decipher",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "easy"
  },
  {
    "idiom": "Off the hook",
    "meaning": "no longer in difficulty or trouble",
    "example": "Pinarayi vijaiyan off the hook in SNC- lavalin case(a Canadian company)",
    "usage": "Used to express: no longer in difficulty or trouble",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  },
  {
    "idiom": "Come down hard on",
    "meaning": "To criticize or punish severely",
    "example": "They're coming down heavily on people for not paying their licence fees.",
    "usage": "Used to express: to criticize or punish severely",
    "exam": ["SSC", "Banking", "Railways"],
    "category": "general",
    "difficulty": "medium"
  }
];
window.idiomsDB = idiomsDB;
