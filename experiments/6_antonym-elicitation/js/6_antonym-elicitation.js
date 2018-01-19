
function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      $("#numTrials").html(exp.stimuli.length)
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.antonym_elicitation = slide({
    name: "antonym_elicitation",
    trial_num: 1,
    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : exp.stimuli,

    present_handle : function(stim) {
      $(".err").hide();
      $(".prompt").empty()
      $("#text_response").val('')
      this.stim = stim;
      this.startTime = Date.now();

      var sentence = stim.name + " is " + stim.positive + ".";
      var promptText = "What is the <strong>opposite</strong> of <strong>" + stim.positive + "</strong>?"

      $(".prompt").html("Your friend tells you about their friend: " + stim.name + ".<br>\"<strong>" + sentence +
    "</strong>\"<br><br>" + promptText)
    },
    button : function() {
      response = $("#text_response").val();

      if (response.length == 0) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;

        exp.data_trials.push(_.extend({
          "trial_type" : "antonym_elicitation",
          "response" : response,
          "trial_num": this.trial_num,
          "rt": this.rt
        }, _.omit(this.stim, "endpoints")));
        this.trial_num++;
        _stream.apply(this);
      }
    },
  });


  slides.one_slider = slide({
    name : "one_slider",

    trial_num: 1,
    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : exp.stimuli,

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();
      $(".prompt").empty()
      this.stim = stim;
      this.startTime = Date.now();
      this.referent = _.isArray(referents[stim.referent].head) ?
        _.sample(referents[stim.referent].head) :
        referents[stim.referent].head

      var sentence = stim.name + " is " + stim.adjective + ".";

      // FIX ME: many / few will need a special case
      var promptText = "Where would you place  " + stim.name + " on the following scale?"

      $(".prompt").html("Your friend tells you about their friend: " + stim.name + ".<br>\"<strong>" + sentence +
    "</strong>\"<br><br>" + promptText)

      this.init_sliders();

      superlative_endpoints = _.contains(_.keys(stim), "endpoints")
      left_endpoint = !superlative_endpoints ? "most " + stim.antonym : stim.endpoints.low;
      right_endpoint = !superlative_endpoints ? "most " + stim.positive : stim.endpoints.high;

      $(".left").html("the " +left_endpoint +  " person")
      $(".right").html("the " + right_endpoint +  " person")

      exp.sliderPost = null; //erase current slider value
    },

    button : function() {
      if (exp.sliderPost == null) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses : function() {
      superlative_endpoints = _.contains(_.keys(this.stim), "endpoints")

      exp.data_trials.push(_.extend({
        "trial_type" : "one_slider",
        "superlative_endpoints": superlative_endpoints ? 1 : 0,
        "endpoint_low": superlative_endpoints ? this.stim.endpoints.low : "most " + this.stim.antonym,
        "endpoint_high": superlative_endpoints ? this.stim.endpoints.high : "most " + this.stim.positive,
        "response" : exp.sliderPost,
        "trial_num": this.trial_num,
        "rt": this.rt
      }, _.omit(this.stim, "endpoints")));
      this.trial_num++;

    }

  });

  slides.four_sliders = slide({
    name : "four_sliders",
    trial_num: 1,
    present : exp.stimuli,

    present_handle : function(stim) {

      $(".err").hide();
      $(".prompt").empty();
      this.stim = stim;
      this.startTime = Date.now();
      this.sentence_order = _.shuffle(stim);

      // FIX ME: many / few will need a special case
      var promptText = "For each of them, where would you place them on the following scale?"

      $(".prompt").html("Imagine your friend tells you about four friends of theirs.<br> "+promptText);

      this.n_sliders = this.sentence_order.length;
      $(".slider_row").remove();

      for (var i=0; i<this.n_sliders; i++) {
        var single_stim = this.sentence_order[i];
        var sentence =  single_stim.name + " is <strong>" + single_stim.adjective + "</strong>.";

        $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">"' + sentence + '"</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
        utils.match_row_height("#multi_slider_table", ".slider_target");
      }

      superlative_endpoints = _.contains(_.keys(stim[0]), "endpoints")
      left_endpoint = !superlative_endpoints ? "most " + stim[0].antonym  + "<br>person ": stim[0].endpoints.low + " person<br>";
      right_endpoint = !superlative_endpoints ? "most " + stim[0].positive  + "<br>person ": stim[0].endpoints.high + " person<br>";

      $(".left").html("the " +left_endpoint +  "in the world")
      $(".right").html("the " + right_endpoint +  "in the world")

      // $(".left").html("100\% " + single_stim.antonym)
      // $(".right").html("100\% " + single_stim.positive)

      this.init_sliders(this.sentence_order);
      exp.sliderPost = [];
    },

    button : function() {
      error = false;
      for (var i=0; i<this.n_sliders; i++) {
        if (typeof exp.sliderPost[i] == 'undefined') {
          error = true;
        }
      }

      if (error) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },

    init_sliders : function(sentence_order) {
      for (var i=0; i<sentence_order.length; i++) {
        // var sentence_type = sentence_types[i];
        utils.make_slider("#slider" + i, this.make_slider_callback(i));
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value;
      };
    },
    log_responses : function() {
      superlative_endpoints = _.contains(_.keys(this.stim[0]), "endpoints")

      for (var i=0; i<this.sentence_order.length; i++) {
        var sentence_item = this.sentence_order[i];
        exp.data_trials.push(_.extend({
          "trial_type" : "four_sliders",
          "superlative_endpoints": superlative_endpoints ? 1 : 0,
          "endpoint_low": superlative_endpoints ? this.stim[0].endpoints.low : "most " + this.stim[0].antonym,
          "endpoint_high": superlative_endpoints ? this.stim[0].endpoints.high : "most " + this.stim[0].positive,
          "response" : exp.sliderPost[i],
          "trial_num": this.trial_num,
          "rt": this.rt,
          "slider_position": i + 1
        }, _.omit(sentence_item, "endpoints")));
      }
      this.trial_num++;
    },
  });


  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {

  repeatWorker = false;
  (function(){
      var ut_id = "mht-negant-antelicit-20180119";
      if (UTWorkerLimitReached(ut_id)) {
        $('.slide').empty();
        repeatWorker = true;
        alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
      }
  })();

  exp.stimuli = [];
  exp.catch_trials = [];
  exp.data_trials = [];
  exp.sentence_types = [
    "positive", "neg_positive", "antonym", "neg_antonym" //, "neither_pos_nor_ant"
  ];
  // exp.n_stims = 6;
  exp.n_trials = stimuli.length;
  // exp.stimsForParticipant = _.shuffle(stimuli).slice(0, exp.n_stims);

  // exp.condition = _.sample(["all_four_sliders", "one_by_one"]);
  exp.condition = "antonym_elicitation"
  exp.structure = ["i0", "instructions"];
  // exp.structure = [];

  var shuffledNames = _.shuffle(characters);
  var expanded_stimuli = [];

  // var lexical_items = _.shuffle(_.where(stimuli, {negation: "lexical"})).slice(0, exp.n_trials / 2)
  // // console.log(lexical_items)
  // var morphological_items = _.shuffle(_.where(stimuli, {negation: "morphological"})).slice(0, exp.n_trials / 2)
  //
  // var stimuli_for_subject = _.flatten([lexical_items, morphological_items])
  // console.log(stimuli_for_subject)
  for (j=0; j<exp.n_trials; j++){
    var trial = [];
    var characterName = shuffledNames[j];
    var adjective = stimuli[j];

    var stimulus = _.extend({ }, adjective, characterName)

    expanded_stimuli.push(stimulus)//{trials: trial, negation: stimuli[j].negation})
  }
  // console.log(expanded_stimuli)
  // var lexical_items = _.pluck(_.where(expanded_stimuli, {negation: "lexical"}), "trials")
  // var morphological_items = _.pluck(_.where(expanded_stimuli, {negation: "morphological"}), "trials")

  exp.stimuli = _.shuffle(expanded_stimuli);
  exp.structure.push(exp.condition)
  exp.structure.push("subj_info", "thanks");

  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}

//
