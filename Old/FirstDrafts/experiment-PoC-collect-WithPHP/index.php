<!doctype html>
<html>
  <head>
    <title>My experiment - Collect Online Data</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
    <script src="jspsych-5.0.3/jspsych.js"></script>
    <script src="jspsych-5.0.3/plugins/jspsych-text.js"></script>
    <script src="jspsych-5.0.3/plugins/jspsych-single-stim.js"></script>
    <script src="jspsych-5.0.3/plugins/jspsych-survey-multi-choice.js"></script>
    <script src="jspsych-5.0.3//plugins/jspsych-survey-likert.js"></script>
    <link href="jspsych-5.0.3/css/jspsych.css" rel="stylesheet" type="text/css"></link>
    <link href="css/style.css" rel="stylesheet" type="text/css"></link>
  <style>
    img {
      width: 300px;
    }
  </style>
  </head>
  <body>
      <div id="jspsych-target"></div>
  </body>

  <script>
  /*************************************************************/
  /* capture interactions*/
  /*************************************************************/

  var recording_user_actions = false;
  var mouseClicks = [];
  var keyBoardUse = [];
  var scrolling   = [];
  var mousePos    = [];
  var mousePosPersist    = [];
  var scrollIntervalId;
  var cursorX;
  var cursorY;

  function logClicks(event) {
         var e = {timeStamp:jsPsych.totalTime(), x:event.clientX, y:event.clientY};
         mouseClicks.push(e);
         console.log("Mouse click! X="+e.x+" Y="+e.y);
  }

  function logKeyBoard(event) {
         var e = {timeStamp:jsPsych.totalTime(), key:event.key};
         keyBoardUse.push(e);
         console.log("Keyboard used!!!!!! Key="+e.key);
  }

  var didScroll = false;
  var scrollEvent;
  var body = document.body;

  function logScrolling(event) {
      didScroll   = true;
      scrollEvent = {timeStamp:jsPsych.totalTime(), scrollTop:body.scrollTop};
  }

  function logPointerPos(event) {
      cursorX = event.pageX;
      cursorY = event.pageY;
  }

  /*************************************************************/
  /*  end capture interactions */
  /*************************************************************/


  /* define welcome message block */
  var welcome_block = {
    tag:  "start_recording", // REMOVE THIS AFTER!!!
    type: "text",
    text: "Welcome to the experiment. Press any key to begin."
  };


  // defining pre experiment questions
  var page_1_questions = ["How old are you?", "Where are you from?"]

  // definiting two different response scales that can be used.
  var page_1_options = ["< 18", "between 18 and 25", "between 26 and 35", "between 36 and 50", "> 50"];
  var page_2_options = ["Africa", "Europe", "Asia", "North America", "South America", "Antarctica", "Australia"];

  var multi_choice_block = {
      type: 'survey-multi-choice',
      questions: page_1_questions,
      options: [page_1_options, page_2_options],  // need one scale for every question on a page
      required: [true, true]   // set whether questions are required
      // horizontal: true  // centres questions and makes options display horizontally
  };

  /* define instructions block */
  var instructions_block = {
    type: "text",
    text: "<p>In this experiment, a circle will appear in the center " +
        "of the screen.</p><p>If the circle is <strong>blue</strong>, " +
        "press the letter F on the keyboard as fast as you can.</p>" +
        "<p>If the circle is <strong>orange</strong>, do not press " +
        "any key.</p>" +
        "<div class='left center-content'><img src='img/blue.png'></img>" +
        "<p class='small'><strong>Press the F key</strong></p></div>" +
        "<div class='right center-content'><img src='img/orange.png'></img>" +
        "<p class='small'><strong>Do not press a key</strong></p></div>" +
        "<p>Press any key to begin.</p>",
    timing_post_trial: 2000
  };

  /* define test block */

  var test_stimuli = [
    {
      stimulus: "img/blue.png",
      data: { response: 'go' }
    },
    {
      stimulus: "img/orange.png",
      data: { response: 'no-go' }
    }
  ];

  var all_trials = jsPsych.randomization.repeat(test_stimuli, 10);

  var post_trial_gap = function() {
    return Math.floor( Math.random() * 1500 ) + 750;
  }

  var test_block = {
    type: "single-stim",
    tag:  "start_recording",
    choices: ['F'],
    timing_response: 1500,
    timing_post_trial: post_trial_gap,
    on_finish: function(data){
      var correct = false;
      if(data.response == 'go' && data.rt > -1){
        correct = true;
      } else if(data.response == 'no-go' && data.rt == -1){
        correct = true;
      }
      jsPsych.data.addDataToLastTrial({correct: correct});
    },
    timeline: all_trials
  };

  /* define debrief block */

  function getSubjectData() {

    var trials = jsPsych.data.getTrialsOfType('single-stim');

    var sum_rt = 0;
    var correct_trial_count = 0;
    var correct_rt_count = 0;
    for (var i = 0; i < trials.length; i++) {
      if (trials[i].correct == true) {
        correct_trial_count++;
        if(trials[i].rt > -1){
          sum_rt += trials[i].rt;
          correct_rt_count++;
        }
      }
    }
    return {
      rt: Math.floor(sum_rt / correct_rt_count),
      accuracy: Math.floor(correct_trial_count / trials.length * 100)
    }
  }

  var debrief_block = {
    type: "text",
    tag:  "stop_recording",
    text: function() {
      var subject_data = getSubjectData();
      return "<p>You responded correctly on "+subject_data.accuracy+"% of "+
      "the trials.</p><p>Your average response time was <strong>" +
      subject_data.rt + "ms</strong>. Press any key to complete the "+
      "experiment. Thank you!</p>";
    }
  };

  // defining groups of questions that will go together.
  var tlx_1_questions = [
  "<strong>1. Mental Demand</strong><br>How much mental and perceptual activity was required (e.g., thinking, deciding, calculating, remembering, looking, searching, etc.)? <br>Was the task easy or demanding, simple or complex, exacting or forgiving?",
  "<strong>2. Physical Demand </strong> <br>How much physical activity was required (e.g., pushing, pulling, turning, controlling, activating, etc.)? <br>Was the task easy or demanding, slow or brisk, slack or strenuous, restful or laborious?",
  "<strong>3. Temporal Demand </strong> <br>How much time pressure did you feel due to the rate or pace at which the tasks or task elements occurred? <br>Was the pace slow and leisurely or rapid and frantic?",
  "<strong>4. Performance </strong> <br>How successful do you think you were in accomplishing the goals of the task? <br>How satisfied were you with your performance in accomplishing these goals?",
  "<strong>5. Effort </strong> <br>How hard did you have to work (mentally and physically) to accomplish your level of performance?",
  "<strong>6. Frustration </strong> <br>How insecure, discouraged, irritated, stressed and annoyed versus secure, gratified, content, relaxed and complacent did you feel during the task?"
  ];


  // defining two different response scales that can be used.
  var tlx_scale_1 = ["Very Low", "Low", "Neutral", "High", "Very High"];

  var tlx_block = {
      type: 'survey-likert',
      questions: tlx_1_questions,
      labels: [tlx_scale_1, tlx_scale_1, tlx_scale_1, tlx_scale_1, tlx_scale_1, tlx_scale_1], // need one scale for every question on a page
  };


  /* create experiment timeline array */
  var timeline = [];
  timeline.push(welcome_block);
  timeline.push(multi_choice_block);
  //timeline.push(instructions_block);
  //timeline.push(test_block);
  timeline.push(debrief_block);
  //timeline.push(tlx_block);

  /* start the experiment */
  jsPsych.init({
    display_element: $('#jspsych-target'),
    timeline: timeline,
    show_progress_bar: true,
    on_trial_start: function () {
        var trial_tag = jsPsych.currentTrial().tag;

        // only start recording with first real trial (intro and instructions should not be included)
        //console.log("on_trial_start "+jsPsych.currentTrial().type);
        //console.log("on_trial_start tag "+jsPsych.currentTrial().tag);
        if (!recording_user_actions && trial_tag === "start_recording") {
              console.log("START RECORDING USER INTERACTION");
              recording_user_actions = true;
              window.onwheel      = logScrolling;
              window.onclick      = logClicks;
              window.onkeydown    = logKeyBoard;
              window.onmousemove  = logPointerPos;

              scrollIntervalId = setInterval(function() {
                  if(didScroll) {
                      didScroll = false;
                      scrolling.push(scrollEvent)
                      console.log('You scrolled');
                  }
              }, 100);

              pointerIntervalId = setInterval(function() {
                  mousePos.push({timeStamp:jsPsych.totalTime(), x:cursorX, y:cursorY});
                  console.log("mousePos push 4!" );

                  if (mousePos.length >= 5) {
                    console.log("mousePos is as big as " + mousePos.length);
                    console.log(JSON.stringify(mousePos));
                    mousePosPersist = mousePos.slice(0); // clone the array
                    console.log("mousePosPersist is as big as " + mousePosPersist.length);
                    console.log(JSON.stringify(mousePosPersist));

                    // persist data do the server
                    console.log("persist data do the server");
                    jQuery.ajax({
                        type: "POST",
                        url: 'php/persist.php',
                        data: {data: JSON.stringify(mousePosPersist)}, 
                         success:function(data) {
                            console.log(data); 
                         }
                    });

                    // reset MousePos
                    console.log("reset MousePos");
                    mousePos = [];
                  }

              }, 1000); // 1 second
        } else if (recording_user_actions && trial_tag === "stop_recording") {
              // Stop User Interaction Tracking
              recording_user_actions = false;
              console.log("STOP RECORDING USER INTERACTION");
              window.onclick = null; 
              window.onwheel = null; 
              clearInterval(scrollIntervalId);
              clearInterval(pointerIntervalId);
        }
    },
    on_finish: function() {
        // Print jsPsych Data
        jsPsych.data.displayData();

        // Print User Interacion Data
        $('#jspsych-data-display').append("<h1>mouseClicks</h1>");
        $('#jspsych-data-display').append(JSON.stringify(mouseClicks));
        $('#jspsych-data-display').append("<h1>scrolling</h1>");
        $('#jspsych-data-display').append(JSON.stringify(scrolling));
        $('#jspsych-data-display').append("<h1>mousePos</h1>");
        $('#jspsych-data-display').append(JSON.stringify(mousePos));
        $('#jspsych-data-display').append("<h1>keyBoardUse</h1>");
        $('#jspsych-data-display').append(JSON.stringify(keyBoardUse));
    }
  }); 
</script>
</html>

