var stimuli = [
  { positive: "happy",  antonym: "unhappy", referent: "person" },
  { positive: "intelligent",  antonym: "unintelligent", referent: "person" },
  { positive: "successful",  antonym: "unsuccessful", referent: "person" },
  { positive: "polite",  antonym: "impolite", referent: "person" }
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
