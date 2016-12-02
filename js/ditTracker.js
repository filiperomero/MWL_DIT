/**
 * ditTracker.js
 * Filipe Romero
 *
 *
 **/
var ditTracker = (function() {

  var core = {};

  //
  // private variables
  //
  var recording_user_actions = false;
  var mouseClicks = [];
  var keyBoardUse = [];
  var scrolling   = [];
  var mousePos    = [];
  var mousePosPersist    = [];
  var scrollIntervalId;
  var cursorX;
  var cursorY;
  var didScroll = false;
  var scrollEvent;
  var body = document.body;
  var exp_start_time;;

  //
  // private methods
  //
  totalTime = function() {
    return (new Date()).getTime() - exp_start_time.getTime();
  };

  logScrolling = function(event) {
      didScroll   = true;
      scrollEvent = {timeStamp:totalTime(), scrollTop:body.scrollTop};
  }

  logPointerPos = function (event) {
      cursorX = event.pageX;
      cursorY = event.pageY;
  }

  logClicks = function(event) {
         var e = {timeStamp:totalTime(), x:event.clientX, y:event.clientY};
         mouseClicks.push(e);
         console.log("Mouse click! X="+e.x+" Y="+e.y);
  }

  logKeyBoard = function(event) {
         var e = {timeStamp:totalTime(), key:event.key};
         keyBoardUse.push(e);
         console.log("Keyboard used!!!!!! Key="+e.key);
  }
  //
  // public methods
  //
  core.start = function () {
      console.log("START RECORDING USER INTERACTION");

      // reset arrays
      mouseClicks = [];
      keyBoardUse = [];
      scrolling   = [];
      mousePos    = [];
      mousePosPersist    = [];
      // record the start time
      exp_start_time = new Date();
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
          mousePos.push({timeStamp:totalTime(), x:cursorX, y:cursorY});
          console.log("mousePos push 4!" );

          /*
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
          */

      }, 1000); // 1 second
  }

  core.stop = function () {
      recording_user_actions = false;
      console.log("STOP RECORDING USER INTERACTION");
      window.onclick     = null; 
      window.onwheel     = null; 
      window.onkeydown   = null; 
      window.onmousemove = null; 
      clearInterval(scrollIntervalId);
      clearInterval(pointerIntervalId);
  }

  return core;
})();