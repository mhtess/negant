library(dataMaid)
library(tidyverse)


#### read in dataset
d_expt1 <- read_csv("writing/cogsci/data/4_L1_1slider/4_L1_1slider-trials.csv")

###### add metadata using attributes 

## labels -- good when variable names are not self-explanatory
attr(d_expt1$name, "labels") <- "Character name"
attr(d_expt1$positive, "labels") <- "Positive-form"
attr(d_expt1$antonym, "labels") <- "Negative-form"
attr(d_expt1$negation, "labels") <- "Antonym type"
attr(d_expt1$sentence_type, "labels") <- "Adjective type"
attr(d_expt1$adjective, "labels") <- "Target adjective"

## shortDescriptions -- additional details that might come in handy later
attr(d_expt1$name, "shortDescription") <- "Name of the actor described with adjective."
attr(d_expt1$positive, "shortDescription") <- "Positive-form of adjective."
attr(d_expt1$antonym, "shortDescription") <- "Negative-form (antonym) of adjective."
attr(d_expt1$endpoint_high, "shortDescription") <- "Label of upper endpoint of response scale."
attr(d_expt1$endpoint_low, "shortDescription") <- "Label of lower endpoint of response scale."
attr(d_expt1$negation, "shortDescription") <- "Type of antonym (morphological vs. lexical)."
attr(d_expt1$sentence_type, "shortDescription") <- "Type of adjective (positive, negative, negated positive, negated antonym)."
attr(d_expt1$superlative_endpoints, "shortDescription") <- 'Endpoints described with superlative (tallest) vs. "most" + adjective (most tall).'

#### generate the codebook
dataMaid::makeCodebook(d_expt1, 
                       reportTitle = "Codebook for Negated Antonyms Expt. 1 Data File",
                       file = "writing/cogsci/data/expt1_codebook.Rmd",
             replace = TRUE)




d_expt2_single_lex <- read_csv("writing/cogsci/data/7_1slider_lex/7_1slider_lex-trials.csv")

###### add metadata using attributes 

## labels -- good when variable names are not self-explanatory
attr(d_expt2_single_lex$name, "labels") <- "Character name"
attr(d_expt2_single_lex$positive, "labels") <- "Positive-form"
#attr(d_expt2_single_lex$antonym, "labels") <- "Negative-form"
attr(d_expt2_single_lex$antonym_type, "labels") <- "Antonym type"
attr(d_expt2_single_lex$adjective_type, "labels") <- "Adjective type"
attr(d_expt2_single_lex$adjective, "labels") <- "Target adjective"
attr(d_expt2_single_lex$lexant, "labels") <- "Lexical antonym"
attr(d_expt2_single_lex$morphant, "labels") <- "Morphological antonym"
attr(d_expt2_single_lex$trial_type, "labels") <- "Context condition"

## shortDescriptions -- additional details that might come in handy later
attr(d_expt2_single_lex$name, "shortDescription") <- "Name of the actor described with adjective."
attr(d_expt2_single_lex$positive, "shortDescription") <- "Positive-form of adjective."
attr(d_expt2_single_lex$endpoint_high, "shortDescription") <- "Label of upper endpoint of response scale."
attr(d_expt2_single_lex$endpoint_low, "shortDescription") <- "Label of lower endpoint of response scale."
attr(d_expt2_single_lex$adjective_type, "shortDescription") <- "Type of adjective (positive, negative, negated positive, negated antonym)."
attr(d_expt2_single_lex$antonym_type, "shortDescription") <- "Morphological vs. lexical"
attr(d_expt2_single_lex$trial_type, "shortDescription") <- "Single utterance vs. multiple utterances"

#### generate the codebook
dataMaid::makeCodebook(d_expt2_single_lex, 
                       reportTitle = "Codebook for Negated Antonyms Expt. 2 (Single Utterance, Lexical Antonyms) Data File",
                       file = "writing/cogsci/data/expt2_single-lex_codebook.Rmd",
                       replace = TRUE)


d_expt2_single_lex <- read_csv("writing/cogsci/data/7_1slider_morph/7_1slider_morph-trials.csv")

###### add metadata using attributes 

## labels -- good when variable names are not self-explanatory
attr(d_expt2_single_lex$name, "labels") <- "Character name"
attr(d_expt2_single_lex$positive, "labels") <- "Positive-form"
#attr(d_expt2_single_lex$antonym, "labels") <- "Negative-form"
attr(d_expt2_single_lex$antonym_type, "labels") <- "Antonym type"
attr(d_expt2_single_lex$adjective_type, "labels") <- "Adjective type"
attr(d_expt2_single_lex$adjective, "labels") <- "Target adjective"
attr(d_expt2_single_lex$lexant, "labels") <- "Lexical antonym"
attr(d_expt2_single_lex$morphant, "labels") <- "Morphological antonym"
attr(d_expt2_single_lex$trial_type, "labels") <- "Context condition"

## shortDescriptions -- additional details that might come in handy later
attr(d_expt2_single_lex$name, "shortDescription") <- "Name of the actor described with adjective."
attr(d_expt2_single_lex$positive, "shortDescription") <- "Positive-form of adjective."
attr(d_expt2_single_lex$endpoint_high, "shortDescription") <- "Label of upper endpoint of response scale."
attr(d_expt2_single_lex$endpoint_low, "shortDescription") <- "Label of lower endpoint of response scale."
attr(d_expt2_single_lex$adjective_type, "shortDescription") <- "Type of adjective (positive, negative, negated positive, negated antonym)."
attr(d_expt2_single_lex$antonym_type, "shortDescription") <- "Morphological vs. lexical"
attr(d_expt2_single_lex$trial_type, "shortDescription") <- "Single utterance vs. multiple utterances"

#### generate the codebook
dataMaid::makeCodebook(d_expt2_single_lex, 
                       reportTitle = "Codebook for Negated Antonyms Expt. 2 (Single Utterance, Morphological Antonyms) Data File",
                       file = "writing/cogsci/data/expt2_single-morph_codebook.Rmd",
                       replace = TRUE)


d_expt2_single_lex <- read_csv("writing/cogsci/data/8_4slider_lex/8_4slider_lex-trials.csv")

###### add metadata using attributes 

## labels -- good when variable names are not self-explanatory
attr(d_expt2_single_lex$name, "labels") <- "Character name"
attr(d_expt2_single_lex$positive, "labels") <- "Positive-form"
#attr(d_expt2_single_lex$antonym, "labels") <- "Negative-form"
attr(d_expt2_single_lex$antonym_type, "labels") <- "Antonym type"
attr(d_expt2_single_lex$adjective_type, "labels") <- "Adjective type"
attr(d_expt2_single_lex$adjective, "labels") <- "Target adjective"
attr(d_expt2_single_lex$lexant, "labels") <- "Lexical antonym"
attr(d_expt2_single_lex$morphant, "labels") <- "Morphological antonym"
attr(d_expt2_single_lex$trial_type, "labels") <- "Context condition"

## shortDescriptions -- additional details that might come in handy later
attr(d_expt2_single_lex$name, "shortDescription") <- "Name of the actor described with adjective."
attr(d_expt2_single_lex$positive, "shortDescription") <- "Positive-form of adjective."
attr(d_expt2_single_lex$endpoint_high, "shortDescription") <- "Label of upper endpoint of response scale."
attr(d_expt2_single_lex$endpoint_low, "shortDescription") <- "Label of lower endpoint of response scale."
attr(d_expt2_single_lex$adjective_type, "shortDescription") <- "Type of adjective (positive, negative, negated positive, negated antonym)."
attr(d_expt2_single_lex$antonym_type, "shortDescription") <- "Morphological vs. lexical"
attr(d_expt2_single_lex$trial_type, "shortDescription") <- "Single utterance vs. multiple utterances"

#### generate the codebook
dataMaid::makeCodebook(d_expt2_single_lex, 
                       reportTitle = "Codebook for Negated Antonyms Expt. 2 (Multiple Utterance, Lexical Antonyms) Data File",
                       file = "writing/cogsci/data/expt2_single-morph_codebook.Rmd",
                       replace = TRUE)

d_expt2_single_lex <- read_csv("writing/cogsci/data/8_4slider_morph/8_4slider_morph-trials.csv")

###### add metadata using attributes 

## labels -- good when variable names are not self-explanatory
attr(d_expt2_single_lex$name, "labels") <- "Character name"
attr(d_expt2_single_lex$positive, "labels") <- "Positive-form"
#attr(d_expt2_single_lex$antonym, "labels") <- "Negative-form"
attr(d_expt2_single_lex$antonym_type, "labels") <- "Antonym type"
attr(d_expt2_single_lex$adjective_type, "labels") <- "Adjective type"
attr(d_expt2_single_lex$adjective, "labels") <- "Target adjective"
attr(d_expt2_single_lex$lexant, "labels") <- "Lexical antonym"
attr(d_expt2_single_lex$morphant, "labels") <- "Morphological antonym"
attr(d_expt2_single_lex$trial_type, "labels") <- "Context condition"

## shortDescriptions -- additional details that might come in handy later
attr(d_expt2_single_lex$name, "shortDescription") <- "Name of the actor described with adjective."
attr(d_expt2_single_lex$positive, "shortDescription") <- "Positive-form of adjective."
attr(d_expt2_single_lex$endpoint_high, "shortDescription") <- "Label of upper endpoint of response scale."
attr(d_expt2_single_lex$endpoint_low, "shortDescription") <- "Label of lower endpoint of response scale."
attr(d_expt2_single_lex$adjective_type, "shortDescription") <- "Type of adjective (positive, negative, negated positive, negated antonym)."
attr(d_expt2_single_lex$antonym_type, "shortDescription") <- "Morphological vs. lexical"
attr(d_expt2_single_lex$trial_type, "shortDescription") <- "Single utterance vs. multiple utterances"

#### generate the codebook
dataMaid::makeCodebook(d_expt2_single_lex, 
                       reportTitle = "Codebook for Negated Antonyms Expt. 2 (Multiple Utterance, Morphological Antonyms) Data File",
                       file = "writing/cogsci/data/expt2_single-morph_codebook.Rmd",
                       replace = TRUE)


