function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
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

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : _.shuffle(exp.stimuli),

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();
      $(".prompt").empty()
      this.stim = stim;

      this.referent = _.isArray(referents[stim.referent].head) ?
        _.sample(referents[stim.referent].head) :
        referents[stim.referent].head

      var sentence = stim.name + " is " + stim.adjective + ".";

      // FIX ME: many / few will need a special case
      var promptText = "How " + stim.positive + " do you think the " + stim.name + " is?"

      $(".prompt").html("Your friend tells you about their new friend: " + stim.name + ".<br>\"<em>" + sentence +
    "</em>\"<br><br>" + promptText)

      this.init_sliders();
      $(".left").html("100\% " + stim.antonym)
      $(".right").html("100\% " + stim.positive)

      exp.sliderPost = null; //erase current slider value
    },

    button : function() {
      if (exp.sliderPost == null) {
        $(".err").show();
      } else {
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
      exp.data_trials.push({
        "trial_type" : "one_slider",
        "response" : exp.sliderPost
      });
    }
  });

  slides.multi_slider = slide({
    name : "multi_slider",

    present : _.shuffle(exp.stimuli),

    present_handle : function(stim) {
      $(".err").hide();
      $(".prompt").empty();
      this.stim = stim;

      this.sentence_types = _.shuffle(exp.sentence_types);

      // this.referent = _.isArray(referents[stim.referent].head) ?
        // _.sample(referents[stim.referent].head) :
        // referents[stim.referent].head

      var sentences = {
        positive: this.name + " is " + stim.positive + ".",
        negative: this.name + " is not " + stim.positive + ".",
        antonym: this.name + " is " + stim.antonym + ".",
        negAntonym: this.name + " is not " + stim.antonym + "."
      };


      // FIX ME: many / few will need a special case
      var promptText = "For each of them, how " + stim.positive + " do you think " + stim.name + " is?"

      $(".prompt").html("Imagine your friend tells you each of the following about their new friend: " + stim.name + ".<br> "+promptText);


      this.n_sliders = this.sentence_types.length;
      $(".slider_row").remove();
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        var sentence = sentences[sentence_type];
        $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
        utils.match_row_height("#multi_slider_table", ".slider_target");
      }
      $(".left").html("100\% " + stim.antonym)
      $(".right").html("100\% " + stim.positive)

      this.init_sliders(this.sentence_types);
      exp.sliderPost = [];
    },

    button : function() {
      if (exp.sliderPost.length < this.n_sliders) {
        $(".err").show();
      } else {
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },

    init_sliders : function(sentence_types) {
      for (var i=0; i<sentence_types.length; i++) {
        var sentence_type = sentence_types[i];
        utils.make_slider("#slider" + i, this.make_slider_callback(i));
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value;
      };
    },
    log_responses : function() {
      for (var i=0; i<this.sentence_types.length; i++) {
        var sentence_type = this.sentence_types[i];
        exp.data_trials.push({
          "trial_type" : "multi_slider",
          "sentence_type" : sentence_type,
          "response" : exp.sliderPost[i]
        });
      }
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
  exp.stimuli = [];
  exp.catch_trials = [];
  exp.data_trials = [];
  exp.sentence_types = [
    "positive", "neg_positive", "antonym", "neg_antonym"
  ];

  exp.condition = _.sample(["all_four_sliders", "one_by_one"]);

  exp.condition = "all_four_sliders"
  // exp.structure = ["i0", "instructions"];
  exp.structure = [];

  var shuffledNames = _.shuffle(characters);

  if (exp.condition  == "all_four_sliders")  {
    // add character names to each stimulus
    exp.stimuli = _.map(_.zip(shuffledNames, stimuli),
      function(x){return _.extend(x[0], x[1])}
    )
    exp.structure.push("multi_slider")

  } else {
    // create negation if necessary, add names
    for (j=0; j<stimuli.length; j++){
      for (i=0; i<exp.sentence_types.length; i++){
        var st = exp.sentence_types[i];
        var adj = st.slice(0,3) == "neg" ?
                  "not " + stimuli[j][st.slice(4)] :
                  stimuli[j][st];

        var character = stimuli[j].referent == "person" ?
          shuffledNames.pop() : "NA"

        exp.stimuli.push(_.extend(
          stimuli[j], character, {
            sentence_type: st,
            adjective: adj,
          }))

      };
    }

    exp.structure.push("one_slider")
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
