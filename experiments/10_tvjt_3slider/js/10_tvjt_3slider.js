
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

      $(".prompt").html("Your friend tells you about their friend: " + stim.name + ".<br>\"<strong>" + sentence +
    "</strong>\"<br><br>" + promptText)

      this.init_sliders();

      superlative_endpoints = _.contains(_.keys(stim), "endpoints")

      // left_endpoint = !superlative_endpoints ? "most " + stim.morphant  + "<br>person ": stim.endpoints.low + " person<br>";
      this.left_endpoint = "most " + stim[exp.antonym_type]  + "<br>person ";
      this.right_endpoint = "most " + stim.positive  + "<br>person ";

      $(".left").html("the " +this.left_endpoint +  "in the world")
      $(".right").html("the " + this.right_endpoint +  "in the world")

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

        "endpoint_low": "the " + this.left_endpoint + "in the world",
        "endpoint_high": "the " +this.right_endpoint + "in the world",
        "antonym_type": exp.antonym_type,
        // "superlative_endpoints": 0,//superlative_endpoints ? 1 : 0,
        // "endpoint_low": "the " + (superlative_endpoints ? this.stim.endpoints.low : "most " + this.stim.morphant) + " person in the world",
        // "endpoint_high": "the " + (superlative_endpoints ? this.stim.endpoints.high : "most " + this.stim.positive) + " person in the world",
        "response" : exp.sliderPost,
        "trial_num": this.trial_num,
        "rt": this.rt
      }, _.omit(this.stim, "endpoints")));
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

    slides.tvjt = slide({
	name: "tvjt",
	present: exp.stimuli,
	present_handle: function(stim) {
	    console.log(stim)
	          $(".err").hide();
      $(".prompt").empty();
      this.stim = stim;
	    this.startTime = Date.now();

	     this.n_sliders = this.stim.ratings.length;
	    $(".slider_row").remove();
	    $("#tvjt_table").empty();

      for (var i=0; i<this.n_sliders; i++) {
        var sentence =  "This is how "+this.stim.positive+" "+this.stim.names[i].name + " is.";

        $("#tvjt_table").append('<tr class="slider_row"><td class="sentence" align="center" colspan="4" id="sentence' + i + '">' + sentence + '</td></tr><tr class="slider_display"><td id="left">least '+this.stim.positive+' '+this.stim.referent+' in the world</td><td colspan="2" align="center"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td><td id="right">most '+this.stim.positive+' '+this.stim.referent+' in the world</td></tr><tr class="judgement"><td class="judgement" align="center" colspan="4">'+this.stim.names[i].name+' is '+this.stim.positive+'. <label><input type="radio" name="sentence'+i+'" id="tf" value="True"/>True</label><label><input type="radio" name="sentence'+i+'" id="tf" value="False"/>False</label></td></tr><tr><td height=30px></td></tr>');
          utils.match_row_height("#multi_slider_table", ".slider_target");
      }

      this.init_sliders(this.stim.ratings);
      exp.sliderPost = [];
	},
	 init_sliders : function(ratings) {
      for (var i=0; i<ratings.length; i++) {
          this.make_fixed_slider("#slider" + i, ratings[i]);
      }
    },
	make_fixed_slider: function(label, rating) {
	    $(label).empty();
	    $(label).slider({
		range: "min",
		min: 0,
		max: 1,
		step: 0.01,
		value: rating,
		orientation: "horizontal"
	    });
	    $(label + ' .ui-slider-handle').css({
				"background":"#667D94",
				"border-color": "#001F29"
			});
	    $(label).slider("disable");
	},
	log_responses: function() {
	    var judgements = [];
	    for (i=0; i<this.stim.names.length; i++) {
		judgements.push($('input[name="sentence'+i+'"]:checked').val());
	    }
	    exp.data_trials.push(_.extend(
		{
		    judgements: judgements
		},
		this.stim
	    ));
	},
	button: function() {
	    var unanswered = false;
	    for (i=0; i<this.stim.names.length; i++) {
		if ($('input[name="sentence'+i+'"]:checked').val() == null) {
		    unanswered = true;
		}
	    }
	    if (unanswered) {
		console.log('here');
		$(".err").show();
	    }
	    else {
	    this.log_responses();
		_stream.apply(this);
	    }
	}
    })


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
      var ut_id = "mht-negant-L1-20180121";
      if (UTWorkerLimitReached(ut_id)) {
        $('.slide').empty();
        repeatWorker = true;
        alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
      }
  })();

  exp.stimuli = [];
  exp.catch_trials = [];
    exp.data_trials = [];

    exp.ratings = [0, 0.25, 0.5, 0.75, 1];

    var stimIndex = 0;
    var shuffledNames = _.shuffle(characters);
    var shuffledStims = _.shuffle(stimuli);
    for (i=0; i<shuffledNames.length; i+=3) {
	exp.ratings = _.shuffle(exp.ratings);
	exp.stimuli.push(_.extend(shuffledStims[stimIndex], {
	    names: [shuffledNames[i], shuffledNames[i+1], shuffledNames[i+2]],
	    ratings: [exp.ratings[0], exp.ratings[1], exp.ratings[2]]
	}));
	stimIndex ++;
    }
    console.log(exp.stimuli);

  exp.structure = ["i0", "tvjt", "subj_info", "thanks"];

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
