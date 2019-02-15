## Experiments run

- `0_L1`: interpretation, five sliders, 6 trials. $0.50
  - total experiment space: 6 items (cut down from 10)
  - target: 15 responses / item --> n = 18 (2 batches) ==> $9 + 1.8 = $10.80
  - 10/19/17: increase to 45 responses / items --> + n = 36 ==> $18 + 3.6 = 21.60
- `1_S0`: "literal semantics", forced choice task. 15 trials. $0.40
  - total experiment space: positive vs. antonym (2) x 6 points x 6 items (cut down from 10) = 72 unique conditions
  - target: 15 responses / item --> n = 72 (8 batches) ==> $28.8 + 5.76 = $34.56
- `2_L1`: interpretation, one slider at a time,  30 trials. $0.60
  - total experiment space: 6 adjective pairs (same as 0_L1)
  - target: 18 responses / item --> n = 18 (2 batches) ==> $10.80 + 2.16 = $12.96
- `3_L1`: interpretation, one slider at a time,  30 trials. $0.60
  - total experiment space: 12 adjective pairs (6 morphological negation; 6 lexical negation)
  - target: 18 responses / item --> n = 36 (4 batches) ==> $21.6 + 4.32 = $25.92
- `4_L1`: interpretation, one slider at a time,  16 trials. $0.40
  - total experiment space: 20 adjective pairs (10 morphological negation; 10 lexical negation) x 4 forms = 80 items
  - each subject does 16 trials ( 4 / form)
  - target: 24 responses / item --> n = 120 ==> $57.60
- `5_L1`: interpretation, four sliders at a time,  10 trials. $0.70
    - total experiment space: 20 adjective pairs (10 morphological negation; 10 lexical negation)
    - each subject does 10 trials
    - target: 24 responses / item --> n = 50 ==> $42
- `5_L1a`: same as 5_L1, but changed endpoints to "Xest person in the world"
  - otherwise, salient interpretation of endpoints as "Xest person in the group" (of 4)
  - n = 50 ==> $42

## CogSci Experiment Plan

- `6_antonym-elicitation`: Take only morphological negation items, embed them in the same context as the other experiments (“Your friend tells you about a friend of theirs: They say, “John is happy”. “), and have participants generate antonyms (“What is the opposite of “happy”? “).
  - Prediction: We elicit mostly lexical antonyms (e.g., “sad”)… we take the modal 1 or 2 as the “lexical antonym"
  - Pilot: collect n = 18, $0.60 --> 10.8 + 20% = 12.96
- `7_interpretation-1slider`: same as `4_L1`, using the elicited antonyms, together with the morphological antonyms (and their negation). For example: [happy, unhappy, not happy, not unhappy, sad]. Again, participants will only rate one of these for each adjective set.
  - each participant rates 12 individual adjectives (for 1 antonym type)
  - we have 20 sets x 4 forms = 80 individual adjectives (x 2 antonym types)
  - pilot: n = 36: $17.28
  - pilot2 : n = 100; $40 + $8 = $48
  - pilot3 : n = 18 (lexant) + 18 (morphant) = $17.28
  - target 45 ratings per item for a single antonym type: n = 300 (33.3 batches)
    - payment: $0.40 --> $144 (for antonym type 1)
    - total = $288 (for both antonym types)
- `8_interpretation-4slider`: same as `7_interpretation-1slider` but with four sliders at a time
  - between subjects: [..., unhappy, not unhappy] vs. [..., sad, not sad]
  - each participant rates 12 adjective sets
  - we have 20 sets x 2 antonym types = 40 sets
  - pilot: n = 18: $8.64
  - target 45 ratings per set (1 antonym type): n = 75 (8.3 batches)
    - payment: $0.80 --> $72
    - total = $144 (for both antonym types)


## Experiments 2019
- `7_interpretation-1slider-nn`: Same as the morphological antonym version but instead of "not unhappy", participants see "not not happy"
  - added memory_check trial
  - $0.70, pilot n = 36 : 25.2 + 5.04 = 30.24
