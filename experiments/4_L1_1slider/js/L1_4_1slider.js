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

  slides.one_slider = slide({
    name : "one_slider",

    trial_num: 1,
    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : _.shuffle(exp.stimuli),

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

      $(".prompt").html("Your friend tells you about their friend: " + stim.name + ".<br>\"<em>" + sentence +
    "</em>\"<br><br>" + promptText)

      this.init_sliders();
      $(".left").html("the most<br>" + stim.antonym + " person")
      $(".right").html("the most<br>" + stim.positive + " person")

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
      exp.data_trials.push(_.extend({
        "trial_type" : "one_slider",
        "response" : exp.sliderPost,
        "trial_num": this.trial_num,
        "rt": this.rt
      }, this.stim));
      this.trial_num++;

    }

  });

  slides.multi_slider = slide({
    name : "multi_slider",
    trial_num: 1,
    present : _.shuffle(exp.stimuli),

    present_handle : function(stim) {
      console.log(exp.stimuli)
      $(".err").hide();
      $(".prompt").empty();
      this.stim = stim;
      this.startTime = Date.now();
      this.sentence_order = _.shuffle(stim);

      // FIX ME: many / few will need a special case
      var promptText = "For each of them, <strong>how " + stim[0].positive + "</strong> do you think they are?"

      $(".prompt").html("Imagine your friend tells you about five friends of theirs.<br> "+promptText);

      this.n_sliders = this.sentence_order.length;
      $(".slider_row").remove();

      for (var i=0; i<this.n_sliders; i++) {
        var single_stim = this.sentence_order[i];
        var sentence =  single_stim.name + " is <strong>" + single_stim.adjective + "</strong>.";

        $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '"><em>"' + sentence + '"</em></td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
        utils.match_row_height("#multi_slider_table", ".slider_target");
      }
      $(".left").html("100\% " + single_stim.antonym)
      $(".right").html("100\% " + single_stim.positive)

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
      for (var i=0; i<this.sentence_order.length; i++) {
        var sentence_item = this.sentence_order[i];
        exp.data_trials.push(_.extend({
          "trial_type" : "interpretation_fiveSliders",
          "response" : exp.sliderPost[i],
          "trial_num": this.trial_num,
          "rt": this.rt,
          "slider_position": i + 1
        }, sentence_item));
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
      var ut_id = "mht-negant-L1-20171214";
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
    "positive", "neg_positive", "antonym", "neg_antonym", "neither_pos_nor_ant"
  ];
  exp.n_stims = 6;
  exp.n_trials = 30;
  exp.stimsForParticipant = _.shuffle(stimuli).slice(0, exp.n_stims);

  // exp.condition = _.sample(["all_four_sliders", "one_by_one"]);
  exp.condition = "one_by_one"
  // exp.structure = ["i0"];
  exp.structure = [];

  var shuffledNames = _.shuffle(characters);
  var expanded_stimuli = [];

  for (j=0; j<stimuli.length; j++){
    var trial = [];
    for (i=0; i<exp.sentence_types.length; i++){
      var st = exp.sentence_types[i];
      var adj = st.slice(0,3) == "neg" ?
                "not " + stimuli[j][st.slice(4)] :
                st.slice(0,3) == "nei" ?
                "neither " + stimuli[j].positive + " nor " +  stimuli[j].antonym :
                stimuli[j][st];

      var stimulus = _.extend(
        {
          sentence_type: st,
          adjective: adj
        }, stimuli[j])

      trial.push(stimulus)
    };
    expanded_stimuli.push(trial)
  }

  exp.stimuli = _.map(_.zip(
    _.shuffle(_.flatten(expanded_stimuli)).slice(0, exp.n_trials), shuffledNames
  ), function(item) {
      return _.defaults(item[0], item[1]);
  });

  // create negation if necessary, add names
  // for (j=0; j<exp.stimsForParticipant.length; j++){
  //   var trial = [];
  //   for (i=0; i<exp.sentence_types.length; i++){
  //     var st = exp.sentence_types[i];
  //     var adj = st.slice(0,3) == "neg" ?
  //               "not " + exp.stimsForParticipant[j][st.slice(4)] :
  //               st.slice(0,3) == "nei" ?
  //               "neither " + exp.stimsForParticipant[j].positive + " nor " +  exp.stimsForParticipant[j].antonym :
  //               exp.stimsForParticipant[j][st];
  //
  //     var character = exp.stimsForParticipant[j].referent == "person" ?
  //       shuffledNames.pop() : "NA"
  //
  //     var stimulus = _.extend(
  //       {
  //         sentence_type: st,
  //         adjective: adj
  //       }, exp.stimsForParticipant[j], character)
  //     trial.push(stimulus)
  //   };
  //   exp.stimuli.push(trial)
  // }

  if (exp.condition  == "all_four_sliders")  {
    exp.structure.push("multi_slider")
  } else {
    exp.structure.push("one_slider")
    // exp.stimuli = _.flatten(exp.stimuli);
  }

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
