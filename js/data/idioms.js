/**
 * VocabPro - Idioms & Phrases Database
 * 500 common idioms and phrases for competitive exams
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
  }
];

window.idiomsDB = idiomsDB;
