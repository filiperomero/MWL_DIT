/**
 * ditgui.js
 * Filipe Romero
 *
 *
 **/

var ditDivDids = ["#ditwelcome", "#ditsurvey", "#ditinst1", "#ditinst2", "#dittask", 
                  "#dittask1survey", "#dittask2survey", "#ditselfmwl", "#ditthanksbye"];

function ditShowDiv(ditDiv) {
    var hide = true;
    
    for (i = 0; i < ditDivDids.length; i++) {
        var hide = true;
        if (ditDivDids[i] == ditDiv) {hide = false;} else {hide = true;}
        //console.log(ditDivDids[i] +"/"+hide);
        d3.selectAll(ditDivDids[i]).classed("hidden", hide);
    }

}

function ditEmptyContent() {
    d3.select('#ditmain').html(null);
}

function ditShowInstructions() {
    console.log("ditShowInstructions");
    if (dit.task == 1) {
        ditShowDiv("#ditinst1");
    } else if (dit.task == 2) {
        ditShowDiv("#ditinst2");
    }
}

function ditStartTask() {
    console.log("ditStartTask");
    
    // store start date
    var postResponse = dit.persist.startDate();
    postResponse.done(function(data) {
        console.log("dit.persist.startDate() done");
        console.log(data);
        
        // start collecting user activity    
        dit.tracker.start();
    
        ditShowDiv("#dittask");
        
        // to change!
        $("#dittask").append("<p>launch interface " + dit.interface + " for task "+dit.task +"</p>");
        
    });

}

function ditEndTask() {
    console.log("ditEndTask");
    
    // stop collecting user activity    
    dit.tracker.stop();
    
    // store end date
    var postResponse = dit.persist.endDate();
    postResponse.done(function(data) {
        console.log("dit.persist.endDate() done");
        console.log(data);
    
        if (dit.task == 1) {
            ditShowDiv("#dittask1survey");
        } else if (dit.task == 2) {
            ditShowDiv("#dittask2survey");
        }
        
    });
    

}


function ditInitTask(e) {
    console.log("ditInitTask");
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
    
    // console.log("start task 1");
    
    var formData = $('#ditformprequest').serializeArray();

    // check if all data was filled
    if (formData.length === 5 && formData[2].value !== "") {
        // all data was filled, send to server
        var data = $("#ditformprequest").serialize();
        data += "&tasktype=" + dit.task;

        var postResponse = dit.persist.personalData(data);
        postResponse.done(function(data) {
            console.log("postResponse.done");
            console.log(data);
            ditShowInstructions();
            
        });        
    } else {
       console.log("not filled");
    }
   
}

function ditPrepareTask(task) {
    console.log("ditPrepareTask");
    dit.task = task;
    ditShowDiv("#ditsurvey");
}

function ditStartSelfMWL() {
    console.log("ditStartSelfMWL");
    ditShowDiv("#ditselfmwl");
}

function ditBye(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    console.log("ditBye");
    
    var formData = $('#ditformselfmwl').serializeArray();
    
    // check if all data was filled
    if (formData.length === 6) {
        // all data was filled, send to server
        var data = $("#ditformselfmwl").serialize();

        var postResponse = dit.persist.selfMWL(data);
        postResponse.done(function(data) {
            console.log("postResponse.done dit.persist.selfMWL");
            console.log(data);
            ditShowDiv("#ditthanksbye");
            
        });        
    } else {
       console.log("not filled");
    }
}

function ditFinish(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    console.log("ditFinish");

    var formData = $('#ditformend').serializeArray();
    console.log(formData);
    if (formData[0].value !== ""){
        var postResponse = dit.persist.email($('#ditformend').serialize());
        
        /*
        postResponse.done(function(data) {
            console.log(" dit.persist.email postResponse.done");
            console.log(data);
        }); 
        */        
    }
    
    window.location.replace("http://filipe.lucalongo.eu/");
}





