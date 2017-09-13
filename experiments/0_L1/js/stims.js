var stimuli = [
  { positive: "happy",  antonym: "unhappy", referent: "person", noun: "level of happiness"},
  { positive: "intelligent",  antonym: "unintelligent", referent: "person", noun:  "level of intelligence"},
  { positive: "successful",  antonym: "unsuccessful", referent: "person", noun:  "level of successfulness" },
  { positive: "polite",  antonym: "impolite", referent: "person", noun:  "level of politeness"},
  { positive: "honest",  antonym: "dishonest", referent: "person", noun:  "level of honesty"},
  { positive: "interesting",  antonym: "uninteresting", referent: "person", noun:  "level of interestingness"},
  { positive: "attractive",  antonym: "unattractive", referent: "person", noun:  "level of attractiveness"},
  { positive: "educated",  antonym: "uneducated", referent: "person", noun:  "level of education"},
  { positive: "forgiving",  antonym: "unforgiving", referent: "person", noun:  "level of forgivingness"},
  { positive: "tolerant",  antonym: "intolerant", referent: "person", noun:  "level of tolerance"}
  // { positive: "likely",  antonym: "unlikely", referent: "event_ref" },
  // { positive: "common",  antonym: "uncommon", referent: "event_ref" },
  // { positive: "frequent",  antonym: "infrequent", referent: "event_ref" }
  // { positive: "many",  antonym: "few", referent: "objects" }
]

var referents = {
  person: {head: ["He is", "She is"], object: "person"},
  event_ref: {head : ["It is"], object: "thing"},
  objects: {head: "There are", object: "things"}
}

var semanticPoints = [0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9];
