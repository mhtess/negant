library(tidyverse)
library(brms)
library(tidybayes)

d.full <- read_csv("writing/journal/data/expt2/expt2-trials.csv")
d.full.comments <- read_csv("writing/journal/data/expt2/expt2-subject_information.csv")

d.full.nativeEnglish <- d.full.comments %>% 
  select(workerid ,language) %>% 
  mutate(englishNative = grepl("eng", tolower(language)))

d.full.natEng <- left_join(
  d.full, 
  d.full.nativeEnglish
) %>%
  filter(englishNative) %>%  #Remove participants who do not self-report English as native language
  group_by(workerid) %>%
  mutate(meanRating = mean(response), sdRating = sd(response)) %>%
  ungroup() %>%
  rowwise() %>%
  mutate(normalizedResponse = (response - meanRating) / sdRating) %>%
  mutate(
    adjective_type = as.character(adjective_type),
    #Code antonyms (morpholoigical & lexical) as antonyms (rather than two distinct categories)
    adjective_type_rescaled = ifelse( 
      adjective_type %in% c("lexant", "morphant"), "antonym", 
      ifelse( 
        adjective_type %in% c("neg_lexant", "neg_morphant"), "neg_antonym",
        adjective_type)
    ),
    adjective_type_rescaled = factor(adjective_type_rescaled,
                                     levels = c("antonym",
                                                "neg_positive",
                                                "neg_antonym",
                                                "positive")),
    antonym_type = factor(antonym_type, levels = c("morphant", "lexant")),
    condition = factor(condition, levels = c("implicit", "explicit")),
    item = ifelse(antonym_type == "lexant",
                  paste(lexant, "--", positive, sep = ""),
                  paste(morphant, "--", positive, sep = "")),
    antonym = ifelse(antonym_type == "lexant", 
                     as.character(lexant), 
                     as.character(morphant))
  ) %>%
  group_by(workerid, antonym_type, adjective_type) %>%
  arrange(trial_num) %>%
  mutate(presentation_num = ave(adjective_type==adjective_type, 
                                adjective_type, FUN=cumsum)) %>%
  ungroup() %>%
  rowwise() %>%
  mutate(splitHalf = ifelse(trial_num <= 8, "first", "second")) %>% 
  select(-item) %>% 
  rename(item = positive,
         adj_type = adjective_type_rescaled) %>% 
  mutate(
    antonym_type = factor(antonym_type, levels = c( "morphant", "lexant"))
  )

d.full.natEng.rescaled <- d.full.natEng %>% 
  mutate(
    antonym_type = factor(antonym_type, levels = c("lexant", "morphant"))
  )

my.forward.diff = matrix(c(
  3/4, -1/4, -1/4, -1/4, 
  1/2, 1/2, -1/2, -1/2, 
  1/4, 1/4, 1/4, -3/4), 
  ncol = 3)

contrasts(d.full.natEng$adj_type) = my.forward.diff
contrasts(d.full.natEng.rescaled$adj_type) = my.forward.diff

rs1.helmert.implicit.brm.morph <- brm(
  response ~ antonym_type * adj_type + 
    (1 + adj_type + antonym_type + antonym_type:adj_type || workerid) + 
    (1 + adj_type + antonym_type + antonym_type:adj_type || item),
  data = d.full.natEng %>% filter(condition == "implicit"),
  iter = 10000, chain = 4, cores = 4,
  control = list(adapt_delta = 0.9)
)

rs1.helmert.implicit.brm.morph.summary <- summary(rs1.helmert.implicit.brm.morph)

save(rs1.helmert.implicit.brm.morph.summary, 
          file ="~/projects/negant/writing/journal/cached_results/brm_raw_antTypeXadjType_implicitCond_10kX4_morph_summary.RData")


d.full.natEng.rescaled %>%
  mutate(condition = factor(condition, levels = c("explicit", "implicit"))) %>% 
  filter(antonym_type == "morphant") -> d.full.natEng.rescaled.morphant

contrasts(d.full.natEng.rescaled.morphant$condition)

## testing for interaction within morphological
rs2.brm.helmert.norm.morph <- brm(
  response ~ condition * adj_type + 
    (1 + adj_type + condition + adj_type:condition || workerid) + 
    (1 + adj_type + condition + adj_type:condition || item),
  data = d.full.natEng.rescaled.morphant,
    iter = 10000, chain = 4, cores = 4,
    control = list(adapt_delta = 0.9)
)

rs2.brm.helmert.norm.morph.summary <- summary(rs2.brm.helmert.norm.morph)

save(rs2.brm.helmert.norm.morph.summary, 
     file ="~/projects/negant/writing/journal/cached_results/brm_raw_antTypeXcond_implicitCond_10kX4_summary.RData")


# 3 hours to run
rs1.helmert.implicit.brm.morph.zoib <- brm(
  response ~ antonym_type * adj_type + 
    (1 + adj_type + antonym_type + antonym_type:adj_type || workerid) + 
    (1 + adj_type + antonym_type + antonym_type:adj_type || item),
  data = d.full.natEng %>% filter(condition == "implicit"),
  iter = 10000, chain = 4, cores = 4,
  family = zero_one_inflated_beta(),
  control = list(adapt_delta = 0.9)
)

rs1.helmert.implicit.brm.morph.zoib.summary <- summary(rs1.helmert.implicit.brm.morph.zoib)

save(rs1.helmert.implicit.brm.morph.zoib.summary, 
     file ="~/projects/negant/writing/journal/cached_results/brm_raw_zoib_antTypeXadjType_implicitCond_10kX4_morph_summary.RData")



d.full.natEng %>% filter(condition == "implicit") %>%
  modelr::data_grid(antonym_type, adj_type) %>%
  add_predicted_draws(rs1.helmert.implicit.brm.morph.zoib, 
                      re_formula  = NA) %>%
  ggplot(aes(x = .prediction, y = adj_type)) +
  facet_wrap(~antonym_type)+
  ggdist::stat_slab(alpha = 1)+
  ggdist::stat_slab(data = d.full.natEng %>% filter(condition == "implicit"),
                  aes( x = response, y = adj_type), inherit.aes = F, fill = 'red', 
                  alpha = 0.3, slab_type = "histogram")



d.full.natEng %>% filter(condition == "implicit") %>%
  modelr::data_grid(antonym_type, adj_type) %>%
  add_predicted_draws(rs1.helmert.implicit.brm.morph, 
                      re_formula  = NA) %>%
  filter(.prediction < 1 && .prediction > 0) %>%
  ggplot(aes(x = .prediction, y = adj_type)) +
  facet_wrap(~antonym_type)+
  ggdist::stat_slab(alpha = 1)+
  ggdist::stat_slab(data = d.full.natEng %>% filter(condition == "implicit"),
                    aes( x = response, y = adj_type), inherit.aes = F, fill = 'red', 
                    alpha = 0.3, slab_type = "histogram")+
  xlim(0, 1)


