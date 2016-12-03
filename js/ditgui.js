/**
 * ditgui.js
 * Filipe Romero
 *
 *
 **/
 
function ditEmptyContent() {
    d3.select('#ditmain').html(null);
}

function prepareTask1() {
    ditEmptyContent();
    
    d3.select('#ditmain').html(
        "<p>Please tell us a litlle about yourself before starting the task!</p>" +
        "<label class='radio-inline'><input type='radio' name='optradio'>Option 1</label>" +
        "<div class='row'>" +
        "<button id='dit_task2' type='button' class='btn btn-primary btn-lg pull-right'>Next</button>" +
        "</div>"
        
    );
    
}