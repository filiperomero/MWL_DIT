/**
 * dit.js
 * Filipe Romero
 *
 *
 **/
var dit = (function() {

  var core = {};

  //
  // public variables
  //
  core.task = 0;
  core.interface = 0;

  //
  // private variables
  //
  var debug = false;
  
  //
  // private methods
  //
  
  //
  // public methods
  //
  core.startDebug = function() {
      debug = true;
  }
  
  core.stopDebug = function() {
      debug = false;
  }
  
  core.isDebugging = function() {
      return debug;
  }
  
  return core;
})();


dit.persist = (function() {

  var module = {};

  //
  // public variables
  //

  //
  // private variables
  //
  var SCROLL_FLAG   = 'S';
  var MOUSE_POS     = 'P';
  var MOUSE_CLICK   = 'C';
  var KEYBOARD      = 'K';
  
  var PERSIST_SIZE = 60; // persist every time and array reaches this size

  
  //
  // private methods
  //
  
  //
  // public methods
  //
  module.getScrollFlag = function() {
      return SCROLL_FLAG;
  }
  module.getMousePosFlag = function() {
      return MOUSE_POS;
  }
  module.getMouseClickFlag = function() {
      return MOUSE_CLICK;
  }
  module.getKeyboardFlag = function() {
      return KEYBOARD;
  }
  
  module.getPersistSize = function() {
      return PERSIST_SIZE;
  }
  
  module.personalData = function(data) {
      
    if (dit.isDebugging()) {console.log("persist personal data to the server");}
    
    var posting = jQuery.ajax({
        type: "POST",
        url:  "php/persist_personal.php",
        data: data, 
         success:function(data) {
            if (dit.isDebugging()) {console.log(data);}
            dit.interface = data.split('/')[1];
         }
    });
    
    return posting;
    
  }
  
  module.selfMWL = function(dataArr) {
      
    if (dit.isDebugging()) {console.log("persist self assessment MWL to the server");}
    if (dit.isDebugging()) {console.log(dataArr);}
    
    var posting = jQuery.ajax({
        type: "POST",
        url:  "php/persist_self_mwl.php",
        data: dataArr, 
         success:function(data) {
            if (dit.isDebugging()) {console.log("self_mwl service success");}
            if (dit.isDebugging()) {console.log(data);}
         }
    });
    
    return posting;
    
  }
  
  module.email = function(dataArr) {
      
    if (dit.isDebugging()) {console.log("persist email to the server");}
    if (dit.isDebugging()) {console.log(dataArr);}
    
    var posting = jQuery.ajax({
        type: "POST",
        url:  "php/persist_email.php",
        data: dataArr, 
         success:function(data) {
            if (dit.isDebugging()) {console.log("email service success");}
            if (dit.isDebugging()) {console.log(data);}
         }
    });
    
    return posting;
    
  }
  
  module.sendTaskSurvey = function(taskNbr, dataArr) {
    if (dit.isDebugging()) {console.log("persist send Task" + taskNbr + " survey to server");}
    if (dit.isDebugging()) {console.log(dataArr);}
      
    var url = "php/";
    if(taskNbr == 1) {
        url = url + "persist_sendTask1Survey.php";
    } else if (taskNbr == 2) {
        url = url + "persist_sendTask2Survey.php";
    } else {
        return "task number not recognized";
    }
    
    var posting = jQuery.ajax({
        type: "POST",
        url:  url,
        data: dataArr, 
        success:function(data) {
          if (dit.isDebugging()) {console.log("sendTaskSurvey service success");}
          if (dit.isDebugging()) {console.log(data);}
        }
    });
    
    return posting;
  }
  
  module.startDate = function(data) {
      
    if (dit.isDebugging()) {console.log("persist startDate to the server");}
    
    var posting = jQuery.ajax({
        type: "POST",
        url:  "php/persist_start_date.php",
        data: data, 
         success:function(data) {
            if (dit.isDebugging()) {console.log(data);}
         }
    });
    
    return posting;
    
  }
  
  module.endDate = function(data) {
      
    if (dit.isDebugging()) {console.log("persist endDate to the server");}
    
    var posting = jQuery.ajax({
        type: "POST",
        url:  "php/persist_end_date.php",
        data: data, 
         success:function(data) {
            if (dit.isDebugging()) {console.log(data);}
         }
    });
    
    return posting;
    
  }
  
  module.activity = function(flag, dataArr) {
      
      var serviceName = (function(f) {
          switch(f) {
            case SCROLL_FLAG:
              return 'php/persist_scrolling.php';
            case MOUSE_POS:
              return 'php/persist_mouse_pos.php';
            case MOUSE_CLICK:
              return 'php/persist_mouse_click.php';
            case KEYBOARD:
              return 'php/persist_keyboard.php';
            default:
              return 'UNAVAILABLE';
          }
      })(flag);
      
      if (dit.isDebugging()) {console.log("persist -> "+serviceName);}
      
      
      //if (serviceName == 'php/persist_mouse_pos.php'){
      if (serviceName !== 'UNAVAILABLE'){
            // persist data to the server
            if (dit.isDebugging()) {console.log("persist activity data to the server: " + serviceName);}
            jQuery.ajax({
                type: "POST",
                url:  serviceName,
                data: {data: JSON.stringify(dataArr)}, 
                 success:function(data) {
                    if (dit.isDebugging()) {console.log(data);}
                 }
            });
      }
  }
  
  return module;
})();

dit.tracker = (function() {

  var module = {};

  //
  // public variables
  //  

  //
  // private variables
  //
  var recording_user_actions = false;
  var mouseClicks = [];
  var keyBoardUse = [];
  var scrolling   = [];
  var mousePos    = [];
  
  // clone arrays to use in the persist mechanism
  var mouseClicksPersist = [];
  var keyBoardUsePersist = [];
  var scrollingPersist   = [];
  var mousePosPersist    = [];
  
  var scrollIntervalId;
  var cursorX;
  var cursorY;
  var didScroll = false;
  var scrollEvent;
  var body = document.body;
  var exp_start_time;
  
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
         var e = {
             timeStamp:   totalTime(), 
             x:           event.clientX, 
             y:           event.clientY, 
             vizElement:  (event.srcElement||event.target).outerHTML.substr(0,100)
         };
         mouseClicks.push(e);
         if (dit.isDebugging()) {console.log("Mouse click! X="+e.x+" Y="+e.y);}
         
         if (mouseClicks.length >= dit.persist.getPersistSize()) {
                if (dit.isDebugging()) {console.log("mouseClicks reach max size and is going to be persisted");}
                mouseClicksPersist = mouseClicks.slice(0); // clone the array
                dit.persist.activity(dit.persist.getMouseClickFlag(), mouseClicksPersist);
                if (dit.isDebugging()) {console.log("reset mouseClicks");}; // reset
                mouseClicks = [];
         }
  }

  logKeyBoard = function(event) {
         var e = {timeStamp:totalTime(), keyPressed:event.key};
         keyBoardUse.push(e);
         if (dit.isDebugging()) {console.log("Keyboard used!!!!!! Key="+e.keyPressed)}
         
         if (keyBoardUse.length >= dit.persist.getPersistSize()) {
                if (dit.isDebugging()) {console.log("keyBoardUse reach max size and is going to be persisted");}
                keyBoardUsePersist = keyBoardUse.slice(0); // clone the array
                dit.persist.activity(dit.persist.getKeyboardFlag(), keyBoardUsePersist);
                if (dit.isDebugging()) {console.log("reset keyBoardUse");}; // reset
                keyBoardUse = [];
         }
  }

  //
  // public methods
  //
  module.start = function () {
      if (dit.isDebugging()) {console.log("START RECORDING USER INTERACTION");}

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
              scrolling.push(scrollEvent);
              if (dit.isDebugging()) {console.log("You scrolled!");}
              
              if (scrolling.length >= dit.persist.getPersistSize()) {
                    if (dit.isDebugging()) {console.log("scrolling reach max size and is going to be persisted");}
                    scrollingPersist = scrolling.slice(0); // clone the array
                    dit.persist.activity(dit.persist.getScrollFlag(), scrollingPersist);
                    if (dit.isDebugging()) {console.log("reset scrolling");}; // reset
                    scrolling = [];
              }
              
          }
      }, 100);
        
      pointerIntervalId = setInterval(function() {
          mousePos.push({timeStamp: totalTime(),
                         xPos:      cursorX, 
                         yPos:      cursorY,
                         yHeight:   window.innerHeight,
                         xWidth:    window.innerWidth
                         });
          
          if (dit.isDebugging()) {console.log("mouse position recorded!");}

          if (mousePos.length >= dit.persist.getPersistSize()) {
            
                if (dit.isDebugging()) {
                    console.log("mousePos is as big as " + mousePos.length);
                    //console.log(JSON.stringify(mousePos));
                }
                
                // clone the array
                mousePosPersist = mousePos.slice(0); 
                
                if (dit.isDebugging()) {
                    console.log("mousePosPersist is as big as " + mousePosPersist.length);
                    //console.log(JSON.stringify(mousePosPersist));
                }
                
                dit.persist.activity(dit.persist.getMousePosFlag(), mousePosPersist);

                // reset MousePos
                if (dit.isDebugging()) {console.log("reset MousePos");};
                mousePos = [];
          }

      }, 1000); // 1 second
  }

  module.stop = function () {
      recording_user_actions = false;
      if (dit.isDebugging()) {console.log("STOP RECORDING USER INTERACTION");}
      window.onclick     = null; 
      window.onwheel     = null; 
      window.onkeydown   = null; 
      window.onmousemove = null; 
      clearInterval(scrollIntervalId);
      clearInterval(pointerIntervalId);
      
      if (dit.isDebugging()) {console.log("persist remaining data");}
      // persist remaining data
      dit.persist.activity(dit.persist.getScrollFlag(), scrolling);
      dit.persist.activity(dit.persist.getMousePosFlag(), mousePos);
      dit.persist.activity(dit.persist.getMouseClickFlag(), mouseClicks);
      dit.persist.activity(dit.persist.getKeyboardFlag(), keyBoardUse);
  
  }

  return module;
})();