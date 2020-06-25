
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

  slides.botcaptcha  = slide({
    name: "botcaptcha",
    // amount of trials to enter correct response
    trial: 0,
    start: function(){
      $("#fail").hide()
      // define possible speaker and listener names
      // fun fact: 10 most popular names for boys and girls
      var speaker = _.shuffle(["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"])[0];
      var listener = _.shuffle(["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Margaret"])[0];

      var story = speaker + ' says to ' + listener + ': "It\'s a beautiful day, isn\'t it?"'

      $("#story").html(story)
      $("#question").html("Who is " + speaker + " talking to?" +
    "<br><strong>Note: please type your answer in lower-case.")

      // don't allow enter press in text field
      $('#listener-response').keypress(function(event) {
          if (event.keyCode == 13) {
              event.preventDefault();
          }
      });

      // don't show any error message
      $("#error").hide();
      $("#error_incorrect").hide();
      $("#error_2more").hide();
      $("#error_1more").hide();
      this.listener = listener, this.speaker = speaker
    },
    button:  function() {
        response = $("#listener-response").val().replace(" ","");

        // response correct
        // if (this.listener.toLowerCase() == response.toLowerCase()) {
        if (this.listener.toLowerCase() == response) {
            // exp.catch_trials.botresponse = $("#listener-response").val();
            exp.go();

        // response false
        } else {
            this.trial = this.trial + 1;
            $("#error_incorrect").show();
            if (this.trial == 1) {
                $("#error_2more").show();
            } else if (this.trial == 2) {
                $("#error_2more").hide();
                $("#error_1more").show();
            } else {
                $("#error_incorrect").hide();
                $("#error_1more").hide();
                $("#next").hide();
                $('#quest-response').css("opacity", "0.2");
                $('#listener-response').prop("disabled", true);
                $("#error").show();
                $("#fail").show()

            };
        };
      }

      //$("#next").on("click",);
      //}
  })


    slides.memory_check = slide({
      name : "memory_check",
      start: function() {
      $(".err").hide()
      // console.log(exp.memory_properties)

       this.tested_properties = _.map(exp.memory_properties, function(x){
         var item = _.shuffle(x)
         return  item[0].name + " is " + item[0].adjective
       })
       // console.log(this.tested_properties)


       this.catch_properties = [
         "Steve is short",
         "Casey is studious",
         "Jamar is not unexpected",
         "Louis is athletic",
         "Michael is nerdy"
       ]

       this.check_properties = _.shuffle(_.flatten([this.tested_properties, this.catch_properties]))

       // clear the former content of a given <div id="memory_checkboxes"></div>
       document.getElementById('memory_checkboxes').innerHTML = '';

  	for (i=0;i<this.check_properties.length;i++){
         // create the necessary elements
         var label= document.createElement("label");
         var description = document.createTextNode(this.check_properties[i]);
         var checkbox = document.createElement("input");

         checkbox.type = "checkbox";    // make the element a checkbox
         checkbox.name = "slct1";      // give it a name we can check on the server side
         checkbox.value = this.check_properties[i];         // make its value "pair"

         label.appendChild(checkbox);   // add the box to the element
         label.appendChild(description);// add the description to the element

         // add the label element to your div
         document.getElementById('memory_checkboxes').appendChild(label);
         document.getElementById('memory_checkboxes').appendChild(document.createElement("br"));

       }
     },
      button : function() {
        // if ($("#explanation").val() == "") {
          // $(".err").show()
        // } else {
          var checked_options = new Array();
          var unchecked_options = new Array();

          $.each($("input[name='slct1']:checked"), function() {
            checked_options.push($(this).val());
          });

          $.each($("input[name='slct1']:not(:checked)"), function() {
            unchecked_options.push($(this).val());
          });

          for (i=0;i<this.check_properties.length;i++){
            var p = this.check_properties[i];
            var tested_on = this.tested_properties.indexOf(p) > -1 ? 1 : 0;
            var response = checked_options.indexOf(p) > -1 ? 1 : 0;
            exp.catch_trials.push({
              condition: "memory_check",
              check_index: i,
              property: p,
              tested_on: tested_on,
              response: response,
              correct: (tested_on == response) ? 1 : 0
            })
          }

          // exp.catch_trials.push({
          //   condition: "explanation",
          //   check_index: -1,
          //   property: $("#explanation").val(),
          //   tested_on: -1,
          //   response: -1,
          //   correct: -1
          // })

          exp.go(); //use exp.go() if and only if there is no "present" data.
        // }

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
      console.log(stim)
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

  slides.multi_slider = slide({
    name : "multi_slider",
    trial_num: 1,
    present : exp.stimuli,

    present_handle : function(stim) {

      $(".err").hide();
      $(".prompt").empty();
      this.stim = stim;
      console.log(stim)
      this.startTime = Date.now();
      this.sentence_order = _.shuffle(stim);
      this.n_sliders = this.sentence_order.length;

      // FIX ME: many / few will need a special case
      var promptText = "For each of them, where would you place them on the following scale?"

      $(".prompt").html("Imagine your friend tells you about "+ this.n_sliders +" friends of theirs.<br> "+promptText);

      $(".slider_row").remove();
      $(".slider_center_target").remove();
      for (var i=0; i<this.n_sliders; i++) {

        var single_stim = this.sentence_order[i];
        var sentence =  single_stim.name + " is <strong>" + single_stim.adjective + "</strong>.";
        $("#sentence" + i).remove();
        $("#multi_slider_table").append('<tr id="sentence' + i + '"><td class="slider_center_target">"' + sentence + '"</td></tr><tr class="slider_row"><td colspan="2" class="multiSliderSlider"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td>');

        // $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">"' + sentence + '"</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
        utils.match_row_height("#multi_slider_table", ".slider_target");
      }

      superlative_endpoints = _.contains(_.keys(stim[0]), "endpoints")
      this.left_endpoint = "most " + stim[0][exp.antonym_type]  + "<br>person ";
      this.right_endpoint = "most " + stim[0].positive  + "<br>person ";

      $(".left").html("the " + this.left_endpoint +  "in the world")
      $(".right").html("the " + this.right_endpoint +  "in the world")

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
          "antonym_type": exp.antonym_type,
          // "superlative_endpoints": superlative_endpoints ? 1 : 0,
          // "endpoint_low": superlative_endpoints ? this.stim[0].endpoints.low : "most " + this.stim[0].antonym,
          // "endpoint_high": superlative_endpoints ? this.stim[0].endpoints.high : "most " + this.stim[0].positive,
          "endpoint_low": "the " + this.left_endpoint + "in the world",
          "endpoint_high": "the " +this.right_endpoint + "in the world",

          // "endpoint_low": "the " + (superlative_endpoints ? this.stim[0].endpoints.low : "most " + this.stim[0].morphant) + " person in the world",
          // "endpoint_high": "the " + (superlative_endpoints ? this.stim[0].endpoints.high : "most " + this.stim[0].positive) + " person in the world",

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
      var ut_id = "mht-negant-L1-20190809";
      if (UTWorkerLimitReached(ut_id)) {
        $('.slide').empty();
        repeatWorker = true;
        alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
      }
  })();

  exp.stimuli = [];
  exp.catch_trials = [];
  exp.data_trials = [];
  // exp.antonym_type = _.sample(["morphant", "lexant"])
  exp.antonym_type = "morphant";

  exp.adjective_type = [
    "positive", "neg_positive", "antonym", "neg_neg_positive", "neg_antonym" //, "neither_pos_nor_ant"
  ];
  // exp.n_stims = 6;
  exp.n_trials = 8;
  // exp.stimsForParticipant = _.shuffle(stimuli).slice(0, exp.n_stims);

  // exp.condition = _.sample(["all_four_sliders", "one_by_one"]);
  exp.condition = "all_four_sliders"
  exp.structure = ["i0", "botcaptcha"];
  // exp.structure = [];
  // console.log(_.unique(characters).length)
  var shuffledNames = _.shuffle(characters);
  var expanded_stimuli = [];

  // var lexical_items = _.shuffle(_.where(stimuli, {negation: "lexical"})).slice(0, exp.n_trials / 2)
  // console.log(lexical_items)
  // var morphological_items = _.shuffle(_.where(stimuli, {negation: "morphological"})).slice(0, exp.n_trials / 2)

  // var stimuli_for_subject = _.flatten([lexical_items, morphological_items])
  // console.log(stimuli_for_subject)
  var shuffled_stimuli = _.shuffle(stimuli).slice(0, exp.n_trials);

  for (j=0; j<exp.n_trials; j++){
    var trial = [];
    for (i=0; i<exp.adjective_type.length; i++){
      var characterName = shuffledNames.pop();
      // console.log(characterName)
      var st = exp.adjective_type[i];
      var isNegation = (st.slice(0,3) == "neg")
      var isNegNeg = (st.slice(4, 7) == "neg")
      var isAntonym = (st.indexOf("antonym") > -1)

      var adj = isNegation ?
          isNegNeg ?  "not " +  "not " + shuffled_stimuli[j][
            (isAntonym ? exp.antonym_type : "positive")
          ] : "not " + shuffled_stimuli[j][
                  (isAntonym ? exp.antonym_type : "positive")
                ] : shuffled_stimuli[j][
                  (isAntonym ? exp.antonym_type : "positive")
                ];
      var adjType = isAntonym ? st.replace("antonym", exp.antonym_type) : st
      var stimulus = _.extend(
        {
          adjective_type: adjType,
          adjective: adj
        }, shuffled_stimuli[j], characterName)

      trial.push(stimulus)
    };
    expanded_stimuli.push(trial)//{trials: trial, negation: stimuli[j].negation})
  }
  // console.log(expanded_stimuli)
  // var lexical_items = _.pluck(_.where(expanded_stimuli, {negation: "lexical"}), "trials")
  // var morphological_items = _.pluck(_.where(expanded_stimuli, {negation: "morphological"}), "trials")

  exp.stimuli = expanded_stimuli
  exp.memory_properties = _.shuffle(expanded_stimuli).slice(0, 5)

  // console.log(exp.stimuli)

  // _.flatten([
  //   _.shuffle(lexical_items).slice(0, exp.n_trials / 2),
  //   _.shuffle(morphological_items).slice(0, exp.n_trials / 2)
  // ], true)
  //
  // for (j=0; j<2; j++){
  //   var adj_trials = (j == 0) ? morphological_items : lexical_items
  //   var shuffled_adj_trials = _.shuffle(adj_trials);
  //
  //   // for each adj type (morph, lex), participants see 2 instances of each sentence_type
  //   var sentence_types_per_adjType = _.flatten([exp.sentence_types, exp.sentence_types]);
  //
  //   // loop over 8 stimuli
  //   for (i=0; i<(exp.n_trials / 2); i++){
  //     var item = _.where(shuffled_adj_trials[i], {sentence_type: sentence_types_per_adjType[i]})[0]
  //     var extended_item = _.extend(item, shuffledNames.pop())
  //     exp.stimuli.push(extended_item)
  //   }
  // }
  // console.log(exp.stimuli)
  // exp.stimuli = _.shuffle(exp.stimuli)

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

  exp.structure.push("memory_check", "subj_info", "thanks");

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
