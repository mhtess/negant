var stimuli = [
  // pilot 1
  // { positive: "happy",  antonym: "unhappy", referent: "person", negation: "morphological"},
  // { positive: "intelligent",  antonym: "unintelligent", referent: "person",  negation: "morphological"},
  // { positive: "polite",  antonym: "impolite", referent: "person",  negation: "morphological"},
  // { positive: "interesting",  antonym: "uninteresting", referent: "person", negation: "morphological"},
  // { positive: "attractive",  antonym: "unattractive", referent: "person", negation: "morphological"},
  // { positive: "forgiving",  antonym: "unforgiving", referent: "person", negation: "morphological"},
  // end of initial set

  // 3_L1
  { positive: "successful",  antonym: "unsuccessful", referent: "person",  negation: "morphological"},
  { positive: "honest",  antonym: "dishonest", referent: "person", negation: "morphological"},
  { positive: "educated",  antonym: "uneducated", referent: "person", negation: "morphological"},
  { positive: "tolerant",  antonym: "intolerant", referent: "person",  negation: "morphological"},
  { positive: "friendly",  antonym: "unfriendly", referent: "person", negation: "morphological"},
  { positive: "moral",  antonym: "immoral", referent: "person", negation: "morphological"},
  //

  /// overflow
  // { positive: "sane",  antonym: "insane", referent: "person", negation: "morphological"},
  // { positive: "reasonable",  antonym: "unreasonable", referent: "person", negation: "morphological"},

  // lexical antonyms
  // 3_L1
  { positive: "tall",  antonym: "short", referent: "person", negation: "lexical"},
  { positive: "rich",  antonym: "poor", referent: "person", negation: "lexical"},
  { positive: "fat",  antonym: "skinny", referent: "person", negation: "lexical"},
  { positive: "old",  antonym: "young", referent: "person", negation: "lexical"},
  { positive: "hard-working",  antonym: "lazy", referent: "person", negation: "lexical"},
  { positive: "brave",  antonym: "cowardly", referent: "person", negation: "lexical"}
  //

  // overflow
  // { positive: "aggressive",  antonym: "peaceful", referent: "person", negation: "lexical"},
  // { positive: "anxious",  antonym: "calm", referent: "person", negation: "lexical"},

  // stage level?
  // { positive: "drunk",  antonym: "sober", referent: "person"},
  // { positive: "warm",  antonym: "cold", referent: "person"},


  // is it going to rain?
  // { positive: "likely",  antonym: "unlikely", referent: "event_ref" },
  // { positive: "probable",  antonym: "improbable", referent: "event_ref" },
  // { positive: "common",  antonym: "uncommon", referent: "event_ref" },
  // { positive: "frequently",  antonym: "infrequently", referent: "event_ref" },
  // { positive: "many",  antonym: "few", referent: "objects" }
]

var referents = {
  person: {head: ["He is", "She is"], object: "person"},
  event_ref: {head : ["It is"], object: "thing"},
  objects: {head: "There are", object: "things"}
}

var semanticPoints = [
  0.1,
  0.3,
  0.4,
  // 0.5,
  0.6,
  0.7,
  0.9
];
