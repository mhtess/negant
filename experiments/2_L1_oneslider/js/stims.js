var stimuli = [
  // pilot 1
  { positive: "happy",  antonym: "unhappy", referent: "person", noun: "level of happiness"},
  { positive: "intelligent",  antonym: "unintelligent", referent: "person", noun:  "level of intelligence"},
  { positive: "polite",  antonym: "impolite", referent: "person", noun:  "level of politeness"},
  { positive: "interesting",  antonym: "uninteresting", referent: "person", noun:  "level of interestingness"},
  { positive: "attractive",  antonym: "unattractive", referent: "person", noun:  "level of attractiveness"},
  { positive: "forgiving",  antonym: "unforgiving", referent: "person", noun:  "level of forgivingness"}
  // end of initial set

  // { positive: "successful",  antonym: "unsuccessful", referent: "person", noun:  "level of successfulness" },
  // { positive: "honest",  antonym: "dishonest", referent: "person", noun:  "level of honesty"},
  // { positive: "educated",  antonym: "uneducated", referent: "person", noun:  "level of education"},
  // { positive: "tolerant",  antonym: "intolerant", referent: "person", noun:  "level of tolerance"},
  // { positive: "friendly",  antonym: "unfriendly", referent: "person"},
  //
  // { positive: "moral",  antonym: "immoral", referent: "person"},
  // { positive: "sane",  antonym: "insane", referent: "person"},
  // { positive: "reasonable",  antonym: "unreasonable", referent: "person"},
  // { positive: "tall",  antonym: "short", referent: "person"},
  // { positive: "rich",  antonym: "poor", referent: "person"},
  // { positive: "fat",  antonym: "skinny", referent: "person"},
  // { positive: "old",  antonym: "young", referent: "person"},
  // { positive: "hard-working",  antonym: "lazy", referent: "person"},
  // { positive: "brave",  antonym: "cowardly", referent: "person"},
  // { positive: "aggressive",  antonym: "peaceful", referent: "person"},
  // { positive: "anxious",  antonym: "calm", referent: "person"},

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
