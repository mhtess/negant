var stimuli = [
  // pilot 1
  { positive: "happy",  antonym: "unhappy", referent: "person", negation: "morphological", endpoints: {low: "unhappiest", high: "happiest"}},

  { positive: "intelligent",  antonym: "unintelligent", referent: "person",  negation: "morphological"},

  { positive: "polite",  antonym: "impolite", referent: "person",  negation: "morphological"},

  { positive: "interesting",  antonym: "uninteresting", referent: "person", negation: "morphological"},

  { positive: "attractive",  antonym: "unattractive", referent: "person", negation: "morphological"},

  { positive: "forgiving",  antonym: "unforgiving", referent: "person", negation: "morphological"},

  // end of initial set
  // 3_L1
  { positive: "successful",  antonym: "unsuccessful", referent: "person",  negation: "morphological"},

  { positive: "honest",  antonym: "dishonest", referent: "person", negation: "morphological"},

  { positive: "educated",  antonym: "uneducated", referent: "person", negation: "morphological"},

  { positive: "tolerant",  antonym: "intolerant", referent: "person",  negation: "morphological"},

  { positive: "friendly",  antonym: "unfriendly", referent: "person", negation: "morphological" },

  { positive: "moral",  antonym: "immoral", referent: "person", negation: "morphological"},

  { positive: "mature",  antonym: "immature", referent: "person", negation: "morphological"},
  // new additions

  { positive: "patriotic",  antonym: "unpatriotic", referent: "person", negation: "morphological"},

  { positive: "reliable",  antonym: "unreliable", referent: "person", negation: "morphological"},
  /// overflow
  { positive: "reasonable",  antonym: "unreasonable", referent: "person", negation: "morphological"},

  { positive: "affectionate",  antonym: "unaffectionate", referent: "person", negation: "morphological"},

  { positive: "ambitious",  antonym: "unambitious", referent: "person", negation: "morphological"},

  { positive: "adventurous",  antonym: "unadventurous", referent: "person", negation: "morphological"},

  { positive: "compassionate",  antonym: "uncompassionate", referent: "person", negation: "morphological"},

  { positive: "courteous",  antonym: "discourteous", referent: "person", negation: "morphological"},

  { positive: "kind",  antonym: "unkind", referent: "person", negation: "morphological"},

  { positive: "generous",  antonym: "ungenerous", referent: "person", negation: "morphological"},

  { positive: "inventive",  antonym: "uninventive", referent: "person", negation: "morphological"},

  { positive: "passionate",  antonym: "dispassionate", referent: "person", negation: "morphological"},

  { positive: "practical",  antonym: "impractical", referent: "person", negation: "morphological"},

  { positive: "rational",  antonym: "irrational", referent: "person", negation: "morphological"},

  { positive: "resourceful",  antonym: "unresourceful", referent: "person", negation: "morphological"},

  { positive: "sincere",  antonym: "insincere", referent: "person", negation: "morphological"},

  { positive: "sympathetic",  antonym: "unsympathetic", referent: "person", negation: "morphological"},

  // lexical antonyms
  // 3_L1
  // { positive: "tall",  antonym: "short", referent: "person", negation: "lexical", endpoints: {low: "shortest", high: "tallest"}},
  // { positive: "rich",  antonym: "poor", referent: "person", negation: "lexical", endpoints: {low: "poorest", high: "richest"}},
  // { positive: "fat",  antonym: "skinny", referent: "person", negation: "lexical", endpoints: {low: "skinniest", high: "fattest"}},

  // { positive: "old",  antonym: "young", referent: "person", negation: "lexical", endpoints: {low: "youngest", high: "oldest"}},
  // { positive: "hard-working",  antonym: "lazy", referent: "person", negation: "lexical"},
  // { positive: "brave",  antonym: "cowardly", referent: "person",  negation: "lexical"},
  //

  // overflow
  // { positive: "beautiful",  antonym: "ugly", referent: "person", negation: "lexical"},
  // { positive: "anxious",  antonym: "calm", referent: "person", negation: "lexical"},
  // { positive: "wise",  antonym: "foolish", referent: "person", negation: "lexical"},
  //
  // { positive: "proud",  antonym: "humble", referent: "person", negation: "lexical"},
  // { positive: "strong",  antonym: "weak", referent: "person", negation: "lexical", endpoints: {low: "weakest", high: "strongest"}},
  // { positive: "loud",  antonym: "quiet", referent: "person", negation: "lexical"}

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
