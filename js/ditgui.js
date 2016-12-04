/**
 * ditgui.js
 * Filipe Romero
 *
 *
 **/
 
function ditEmptyContent() {
    d3.select('#ditmain').html(null);
}

function startTask(e) {
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
    
    // console.log("start task 1");
    
    var formData = $('#ditform').serializeArray();

    // check if all data was filled
    if (formData && formData.length === 5 && formData[2].value !== "") {
        // all data was filled, send to server
        var data = $("#ditform").serialize();
        data += "&tasktype=" + dit.task;
    console.log("#######################");
    console.log(data);
        var postResponse = dit.persist.personalData(data);
        postResponse.done(function(data) {
            console.log("postResponse.done");
            console.log(data);
        });        
    } else {
       console.log("not filled");
    }
   
}

function prepareTask(task) {
    dit.task = task;
    d3.selectAll("#ditwelcome").classed("hidden", true);
    d3.selectAll("#ditsurvey").classed("hidden", false);

}