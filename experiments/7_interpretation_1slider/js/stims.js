var stimuli = [
  // pilot 1
  { positive: "happy",  morphant: "unhappy", referent: "person", lexant: "sad", endpoints: {low: "most unhappy", high: "happiest"}},

  { positive: "intelligent",  morphant: "unintelligent", referent: "person",  lexant: "stupid"},

  { positive: "polite",  morphant: "impolite", referent: "person",  lexant: "rude"},

  { positive: "interesting",  morphant: "uninteresting", referent: "person", lexant: "boring"},

  { positive: "attractive",  morphant: "unattractive", referent: "person", lexant: "ugly"},

  { positive: "forgiving",  morphant: "unforgiving", referent: "person", lexant: "resentful"},

  // { positive: "successful",  morphant: "unsuccessful", referent: "person",  lexant: "morphological"},

  { positive: "honest",  morphant: "dishonest", referent: "person", lexant: "deceitful"},

  { positive: "educated",  morphant: "uneducated", referent: "person", lexant: "ignorant"},

  { positive: "tolerant",  morphant: "intolerant", referent: "person",  lexant: "bigoted"},

  { positive: "friendly",  morphant: "unfriendly", referent: "person", lexant: "mean" },

  // { positive: "moral",  morphant: "immoral", referent: "person", lexant: "morphological"},

  { positive: "mature",  morphant: "immature", referent: "person", lexant: "childish"},
  // new additions

  { positive: "patriotic",  morphant: "unpatriotic", referent: "person", lexant: "traitorous"},

  { positive: "reliable",  morphant: "unreliable", referent: "person", lexant: "flaky"},
  /// overflow
  // { positive: "reasonable",  morphant: "unreasonable", referent: "person", lexant: "morphological"},

  { positive: "affectionate",  morphant: "unaffectionate", referent: "person", lexant: "cold"},

  { positive: "ambitious",  morphant: "unambitious", referent: "person", lexant: "lazy"},

  // { positive: "adventurous",  morphant: "unadventurous", referent: "person", lexant: "cautious"},

  // { positive: "compassionate",  morphant: "uncompassionate", referent: "person", lexant: "morphological"},

  // { positive: "courteous",  morphant: "discourteous", referent: "person", lexant: "morphological"},

  { positive: "kind",  morphant: "unkind", referent: "person", lexant: "cruel"},

  { positive: "generous",  morphant: "ungenerous", referent: "person", lexant: "stingy"},

  // { positive: "inventive",  morphant: "uninventive", referent: "person", lexant: "morphological"},

  { positive: "passionate",  morphant: "dispassionate", referent: "person", lexant: "apathetic"},

  // { positive: "practical",  morphant: "impractical", referent: "person", lexant: "morphological"},

  // { positive: "rational",  morphant: "irrational", referent: "person", lexant: "morphological"},

  { positive: "resourceful",  morphant: "unresourceful", referent: "person", lexant: "wasteful"},

  { positive: "sincere",  morphant: "insincere", referent: "person", lexant: "fake"},

  // { positive: "sympathetic",  morphant: "unsympathetic", referent: "person", lexant: "morphological"},

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
