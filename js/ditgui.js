/**
 * ditgui.js
 * Filipe Romero
 *
 *
 **/
 
function ditEmptyContent() {
    d3.select('#ditmain').html(null);
}

function startTask1(e) {
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
    
    // console.log("start task 1");
    
    var formData = $('#ditform').serializeArray();
    
    // console.log(formData);
    
    // check if all data was filled
    if (formData && formData.length === 5 && formData[2].value !== "") {
        // all data was filled, send to server
        var postResponse = dit.persist.personalData($("#ditform").serialize());
        postResponse.done(function(data) {
            console.log("postResponse.done");
            console.log(data);
        });        
    } else {
       console.log("not filled");
    }
   
   //console.log("has_empty " + has_empty);
   //if ( !has_empty ) { return false; }
    /*
    var preQuestData = $('#ditform').serializeArray();
    
    var preQuestData = {
        gender:      document.querySelector('input[name = "Gender"]:checked').value, //document.getElementById('ditgender').value,
        age:         document.getElementById('ditage').value,
        nationality: document.getElementById('ditgender').value,
        expertise:   document.getElementById('ditnationality').value,
        education:   document.getElementById('diteducation').value
    };
    
    console.log(preQuestData);
    */
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
    }

function prepareTask1() {
    
    // show elements
    d3.selectAll("#ditwelcome").classed("hidden", true);
    d3.selectAll("#ditsurvey").classed("hidden", false);
    
    //d3.selectAll("#dit_start_task").on("click",startTask1);
    
}