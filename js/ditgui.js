/**
 * ditgui.js
 * Filipe Romero
 *
 *
 **/
var ditFirstYear  = "2015";
var ditDataSource = "assets/data.tsv";
var ditMapData    = "assets/europe.json";
 
// Stats Data 
var ditDataCode = "Country Code";
var ditDataName = "Country Name";
var ditDataYear = "Year";

// Stats Data - Population
var ditDataPopTotal      = "Population, total";
var ditDataPopF          = "Population, female (% of total)";  
var ditDataPop0to14      = "Population ages 0-14 (% of total)";   
var ditDataPop15to64     = "Population ages 15-64 (% of total)";  
var ditDataPop65         = "Population ages 65 and above (% of total)";  
var ditDataPopGrowth     = "Population growth (annual %)";  
var ditDataPopDeathRate  = "Death rate, crude (per 1,000 people)";
var ditDataPopLifeExpect = "Life expectancy at birth, total (years)";

// Stats Data - Population
var ditDataUnTotal = "Unemployment, total (% of total labor force)";
var ditDataUnYoung = "Unemployment, youth total (% of total labor force ages 15-24)";
var ditDataUnYoungF = "Unemployment, youth female (% of female labor force ages 15-24)";
var ditDataUnLongTerm = "Long-term unemployment (% of total unemployment)";
var ditDataUnLongTermF = "Long-term unemployment, female (% of female unemployment)";
var ditDataUnWithPrimEdu = "Unemployment with primary education (% of total unemployment)";
var ditDataUnWithPrimEduF = "Unemployment with primary education, female (% of female unemployment)";
var ditDataUnWithSecEdu = "Unemployment with secondary education (% of total unemployment)";
var ditDataUnWithSecEduF = "Unemployment with secondary education, female (% of female unemployment)";
var ditDataUnWithTertEdu = "Unemployment with tertiary education (% of total unemployment)";
var ditDataUnWithTertEduF = "Unemployment with tertiary education, female (% of female unemployment)";
var ditDataUnF = "Unemployment, female (% of female labor force)";

var ditDataUnArr = [
ditDataUnTotal        ,
ditDataUnYoung        ,
ditDataUnYoungF       ,
ditDataUnLongTerm     ,
ditDataUnLongTermF    ,
ditDataUnWithPrimEdu  ,
ditDataUnWithPrimEduF ,
ditDataUnWithSecEdu   ,
ditDataUnWithSecEduF  ,
ditDataUnWithTertEdu  ,
ditDataUnWithTertEduF ,
ditDataUnF            
];
 
// loader settings
var opts = {
  lines: 9, // The number of lines to draw
  length: 9, // The length of each line
  width: 5, // The line thickness
  radius: 14, // The radius of the inner circle
  color: '#EE3124', // #rgb or #rrggbb or array of colors
  speed: 1.9, // Rounds per second
  trail: 40, // Afterglow percentage
  className: 'spinner', // The CSS class to assign to the spinner
};

// get Ids for all divs
var ditDivDids = [];
                 /*["#ditwelcome", "#ditsurvey", "#ditinst1", "#ditinst2", "#ditTask1Int1", "#ditTask1Int2",
                  "#dittask1survey", "#dittask2survey", "#ditselfmwl", "#ditthanksbye"];*/
var dit_id;
d3.selectAll(".ditdiv").each(function(){
    dit_id = d3.select(this).attr("id");
    if(dit_id != null && dit_id !='undefined' && dit_id.indexOf("dit") > -1) ditDivDids.push("#" + dit_id);
});

function ditShowDiv(ditDiv) {
    console.log("ditShowDiv");
    console.log("Div: " + ditDiv);
    
    var hide = true;
    for (i = 0; i < ditDivDids.length; i++) {
        var hide = true;
        if (ditDivDids[i] == ditDiv) {hide = false;} else {hide = true;}
        //console.log(ditDivDids[i] +"/"+hide);
        d3.selectAll(ditDivDids[i]).classed("hidden", hide);
    }
    window.scrollTo(0, 0);

}

function ditEmptyContent() {
    d3.select('#ditmain').html(null);
}

function ditShowInstructions() {
    console.log("ditShowInstructions");
    
    if (dit.task == 1 && dit.interface == 1) {
        ditShowDiv("#ditinst1i1");
    }
    else if (dit.task == 1 && dit.interface == 2) {
        ditShowDiv("#ditinst1i2");
    }
    else if (dit.task == 2 && dit.interface == 1) {
        ditShowDiv("#ditinst2i1");
    }
    else if (dit.task == 2 && dit.interface == 2) {
        ditShowDiv("#ditinst2i2");
    }
}

function ditStartTask() {
    console.log("ditStartTask");
    
    $('#ditbtnstarttsk1i1').button('loading');
    $('#ditbtnstarttsk1i2').button('loading');
    $('#ditbtnstarttsk2i1').button('loading');
    $('#ditbtnstarttsk2i2').button('loading');
    
    // store start date
    var postResponse = dit.persist.startDate();
    postResponse.done(function(data) {
        console.log("dit.persist.startDate() done");
        console.log(data);
        
        // start collecting user activity    
        dit.tracker.start();
    
        //ditShowDiv("#dittask");
        
        // to change!
        //$("#dittask").append("<p>launch interface " + dit.interface + " for task "+dit.task +"</p>");
        console.log("Task: " + dit.task);
        console.log("Interface: " + dit.interface);
        
        if (dit.task == 1 && dit.interface == 1) {
            ditShowDiv("#ditTask1Int1");
            ditShowTask1Int1();
        }
        else if (dit.task == 1 && dit.interface == 2) {
            ditShowDiv("#ditTask1Int2");
            ditShowTask1Int2();
        }
        else if (dit.task == 2 && dit.interface == 1) {
            ditShowDiv("#ditTask2Int1");
            ditShowTask2Int1();
        }
        else if (dit.task == 2 && dit.interface == 2) {
            ditShowDiv("#ditTask2Int2");
            ditShowTask2Int2();
        }
    });

}

var ditNA = "N/A or Unknown";

// deal with 0 data
function ditCkeckNum(n) {
    if (n == 0) {
        return ditNA
    }
    return n;
}

function ditShowTask1Int1() {
    console.log("ditShowTask1Int1");
    
      function drawTask1Int1(europe) {
        var ditCriteria = ditDataPopGrowth; 
        
        var margin = {top: 50, bottom: 500, left:170, right: 100};
        var width = 1200 - margin.left - margin.right;
        var height = 2000 - margin.top - margin.bottom;

        var years = [];

        for(var i = 1967; i < 2016; i ++) {
            years.push(i);
        }
        
        var options = d3.select("#ditTask1Int1Field")
            .append("select")
            .attr("id", "ditOptions")
            .attr("class", "form-control")
            .selectAll("option")
            .data(years)
            .enter()
            .append("option")
            .text(function(d) {return d;})
            .attr("value", function(d) {return d;})
            ;
          
        d3.select('#ditOptions')
            .on("change", function(d) {
                key = this[this.selectedIndex].value;
                update(key);
        });
        
        var svg = d3.select("#ditTask1Int1").append("svg")
                    .attr("width", width+margin.left+margin.right)
                    .attr("height", height+margin.top+margin.bottom)
                    .attr("class", "base-svg");
                    
        var tooltip = d3.select("#tooltip").classed("hidden", true),
            ditCountrynameTtip       = d3.select("#ditCountryname"),
            ditYearTtip              = d3.select("#ditYear"),
            ditDataPopTotalTtip      = d3.select("#ditDataPopTotal"),
            ditDataPopFTtip          = d3.select("#ditDataPopF"),
            ditDataPop0to14Ttip      = d3.select("#ditDataPop0to14"),
            ditDataPop15to64Ttip     = d3.select("#ditDataPop15to64"),
            ditDataPop65Ttip         = d3.select("#ditDataPop65"),
            ditDataPopGrowthTtip     = d3.select("#ditDataPopGrowth"),
            ditDataPopDeathRateTtip  = d3.select("#ditDataPopDeathRate"),
            ditDataPopLifeExpectTtip = d3.select("#ditDataPopLifeExpect"),
            format = d3.format(" 2.2f");

        svg.on("mousemove", function() {
            // update tooltip position
            //tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
            tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
            return true;
          });

        function update(year) {
            
            svg.selectAll("*").remove();
                        
            var barSvg = svg.append("g")
                        .attr("transform", "translate("+margin.left+","+margin.top+")")
                        .attr("class", "bar-svg");

            var x = barSvg.append("g")
                    .attr("class", "x-axis");
            
            // filter by year
            var filtered = europe.filter(function(d) {
                return d[ditDataYear] === year;
            });
            
            // order by total population
            filtered = filtered.sort(function(a, b) {
                    return +b[ditCriteria] - +a[ditCriteria];
            });
            
            //filtered = filtered.slice(0,40);
            
            gjbrfilt = filtered;            
            
            var xMax = d3.max(filtered, function(d) { return Math.abs(+d[ditCriteria]); } );
            var xMin = 0;//d3.min(filtered, function(d) { return +d[ditCriteria]; } );

            var xScale = d3.scale.linear().range([0, width]).domain([xMin, xMax]);
            var yScale = d3.scale.ordinal().rangeRoundBands([0, height], 1.8,0);
            yScale.domain(filtered.map(function(d) { return d[ditDataCode]; }));
            
            gjbrxscale= xScale;      
            
            var numTicks = 5;
            var xAxis = d3.svg.axis().scale(xScale)
                            .orient("top")
                            .tickSize((-height))
                            .ticks(numTicks)
                            .tickFormat(function(d) { return d + "%"; });
                            ;
                
            d3.select("#ditTask1Int1Title")
                .text("Population growth (annual %) - " + year);
                
            var groups = barSvg.append("g").attr("class", "labels")
                        .selectAll("text")
                        .data(filtered)
                        .enter()
                        .append("g");
                   
            var bars = groups
                        .attr("class", "bars")
                        .append("rect")
                        .attr("width", function(d) { return xScale(Math.abs(+d[ditCriteria])); })
                        .attr("height", height/filtered.length)
                        .attr("x", xScale(xMin))
                        .attr("y", function(d) { return yScale(d[ditDataCode]); })
                        .attr("id", function(d,i) { return "bar"+i; })
                        .style('fill', function(d) { if (+d[ditCriteria] < 0) {return 'Orange';} return 'Green';})
                        ;
            bars
                .on("mouseover", function(d) {
                    var currentGroup = d3.select(this.parentNode);
                    currentGroup.select("rect").style("fill", "brown");
                    currentGroup.select("text").style("font-weight", "bold");
                    tooltip.classed("hidden", false);
                    ditCountrynameTtip.text(ditDataName + ": " + d[ditDataName]);
                    ditYearTtip.text(ditDataYear + ": " + d[ditDataYear]);
                    ditDataPopTotalTtip.text(ditDataPopTotal + ": " + ditCkeckNum(d[ditDataPopTotal]));
                    ditDataPopFTtip.text(ditDataPopF + ": " + ditCkeckNum(d[ditDataPopF]));
                    ditDataPop0to14Ttip.text(ditDataPop0to14 + ": " + ditCkeckNum(d[ditDataPop0to14]));
                    ditDataPop15to64Ttip.text(ditDataPop15to64 + ": " + ditCkeckNum(d[ditDataPop15to64]));
                    ditDataPop65Ttip.text(ditDataPop65 + ": " + ditCkeckNum(d[ditDataPop65]));
                    ditDataPopGrowthTtip.text(ditDataPopGrowth + ": " + ditCkeckNum(d[ditDataPopGrowth]));
                    ditDataPopDeathRateTtip.text(ditDataPopDeathRate + ": " + ditCkeckNum(d[ditDataPopDeathRate]));
                    ditDataPopLifeExpectTtip.text(ditDataPopLifeExpect + ": " + ditCkeckNum(d[ditDataPopLifeExpect]));
                })
                .on("mouseout", function(d) {
                    var currentGroup = d3.select(this.parentNode);
                    currentGroup.select("rect").style("fill", function(d) { if (+d[ditCriteria] < 0) {return 'Orange';} return 'Green'; });
                    currentGroup.select("text").style("font-weight", "normal");
                    tooltip.classed("hidden", true);
                });
                
            // put axis after bar but before text
            x.call(xAxis);
            var grid = xScale.ticks(numTicks);
            barSvg.append("g").attr("class", "grid")
                .selectAll("line")
                .data(grid, function(d) { return d; })
                .enter().append("line")
                    //.attr("y1", margin.bottom)
                    .attr("y1", yScale(filtered[0][ditDataCode]) )
                    .attr("y2", height+margin.bottom)
                    .attr("x1", function(d) { return xScale(d); })
                    .attr("x2", function(d) { return xScale(d); })
                    .attr("stroke", "white")
                    //.attr("opacity", 1)
                    ;
                   
            groups.append("text")
                    .attr("x", "0")
                    .attr("y", function(d) { return yScale(d[ditDataCode]); })
                    .text(function(d) { return d[ditDataName]; })
                    .attr("text-anchor", "end")
                    .attr("dy", ".9em")
                    .attr("dx", "-.32em")
                    .attr("id", function(d,i) { return "label"+i; });
                   
            var texts = groups.append("text")
                    .attr("x", function(d) { return xScale(Math.abs(+d[ditCriteria])); })
                    .attr("y", function(d) { return yScale(d[ditDataCode]); })
                    .text(function(d) {
                        var x = ditCkeckNum(d[ditCriteria]);
                        if (x != ditNA) {
                            x = Math.round(+x * 100) / 100;
                            x = x+"%";
                        }
                        return x;
                     })
                    .attr("text-anchor", "start")
                    .attr("dy", "1.2em")
                    .attr("dx", "0.32em")
                    .attr("id", "precise-value");
           
            texts
                .on("mouseover", function(d) {
                    var currentGroup = d3.select(this.parentNode);
                    currentGroup.select("rect").style("fill", "brown");
                    currentGroup.select("text").style("font-weight", "bold");
                    tooltip.classed("hidden", false);
                    ditCountrynameTtip.text(ditDataName + ": " + d[ditDataName]);
                    ditYearTtip.text(ditDataYear + ": " + d[ditDataYear]);
                    ditDataPopTotalTtip.text(ditDataPopTotal + ": " + ditCkeckNum(d[ditDataPopTotal]));
                    ditDataPopFTtip.text(ditDataPopF + ": " + ditCkeckNum(d[ditDataPopF]));
                    ditDataPop0to14Ttip.text(ditDataPop0to14 + ": " + ditCkeckNum(d[ditDataPop0to14]));
                    ditDataPop15to64Ttip.text(ditDataPop15to64 + ": " + ditCkeckNum(d[ditDataPop15to64]));
                    ditDataPop65Ttip.text(ditDataPop65 + ": " + ditCkeckNum(d[ditDataPop65]));
                    ditDataPopGrowthTtip.text(ditDataPopGrowth + ": " + ditCkeckNum(d[ditDataPopGrowth]));
                    ditDataPopDeathRateTtip.text(ditDataPopDeathRate + ": " + ditCkeckNum(d[ditDataPopDeathRate]));
                    ditDataPopLifeExpectTtip.text(ditDataPopLifeExpect + ": " + ditCkeckNum(d[ditDataPopLifeExpect]));
                })
                .on("mouseout", function() {
                    var currentGroup = d3.select(this.parentNode);
                    currentGroup.select("rect").style("fill", function(d) { if (+d[ditCriteria] < 0) {return 'Orange';} return 'Green'; });
                    currentGroup.select("text").style("font-weight", "normal");
                    tooltip.classed("hidden", true);
                });

        }
        
        update("1967");
        
    };

    //d3.tsv(ditDataSource, drawTask1Int1);
    
    // callback function wrapped for loader in 'init' function
    function init() {

        var target = document.getElementById('ditTask1Int1');
        
        // trigger loader
        var spinner = new Spinner(opts).spin(target);

        // slow the json load intentionally, so we can see it every load
        setTimeout(function() {

            // load json data and trigger callback
            d3.tsv(ditDataSource, function(data) {

                // stop spin.js loader
                spinner.stop();

                // instantiate chart within callback
                drawTask1Int1(data);

            });
        }, 1500);
    } 

    init();
}

function ditShowTask1Int2() {
    console.log("ditShowTask1Int2");
    
    d3.selectAll("#ditTask1Int2FieldGroup").classed("hidden", true);
    
   function draw(europe) {
          
        var tooltip = d3.select("#tooltip").classed("hidden", true),
            ditCountrynameTtip       = d3.select("#ditCountryname"),
            ditYearTtip              = d3.select("#ditYear"),
            ditDataPopTotalTtip      = d3.select("#ditDataPopTotal"),
            ditDataPopFTtip          = d3.select("#ditDataPopF"),
            ditDataPop0to14Ttip      = d3.select("#ditDataPop0to14"),
            ditDataPop15to64Ttip     = d3.select("#ditDataPop15to64"),
            ditDataPop65Ttip         = d3.select("#ditDataPop65"),
            ditDataPopGrowthTtip     = d3.select("#ditDataPopGrowth"),
            ditDataPopDeathRateTtip  = d3.select("#ditDataPopDeathRate"),
            ditDataPopLifeExpectTtip = d3.select("#ditDataPopLifeExpect"),
            format = d3.format(" 2.2f");
      
        var margin = 75,
            width = 1000 - margin,
            height = 650 - margin;
        
        var years = [];

        for(var i = 1967; i < 2016; i ++) {
            years.push(i);
        }

        //create svg for the map
        var svg = d3.select("#ditTask1Int2")
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height + margin);
            
        //create rectangle
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "DeepSkyBlue");
            
        svg.append('g')
           .attr('class', 'map');
            
        svg.on("mousemove", function() {
            // update tooltip position
            //tooltip.style("top", (event.pageY-200)+"px").style("left",(event.pageX+10)+"px");
            tooltip.style("top", (d3.event.pageY-200)+"px").style("left",(d3.event.pageX+10)+"px");
            return true;
          });

        var projection = d3.geo.azimuthalEqualArea().scale(950).translate([262, 1187]).clipAngle(180 - 1e-3).precision(1);
        var path = d3.geo.path().projection(projection);
        
        var countries = topojson.feature(europe, europe.objects.subunits_europe).features;
        
        var map = svg.selectAll('path')
                     .data(countries)
                     .enter()
                     .append('path')
                     .attr('d', path)
                     .attr("class", function(d) {return "ditCountry";})
                     .style('fill', 'DarkSalmon')
                     .style('stroke', 'black')
                     .style('stroke-width', 0.5);

      function plot_points(data) {

            var ditCriteria = ditDataPopGrowth;
            
            //build an array all centroids for each country
            var country_centers = {};
            for (var i = 0; i < countries.length; i++) {
                country_centers[countries[i].properties.SU_A3] = path.centroid(countries[i]);
            }
                        
            // add stats for each country
            countries.forEach(function(d) {
                data.some(function(n) {
                    if(d.properties.SU_A3 == n[ditDataCode]) return d.stats = n;
                });
            });
           
            var population_max = d3.max(data, function(d) {
                return Math.abs(+d[ditCriteria]);
            });
            
            g_population_max = population_max;
            
            var radius = d3.scale.sqrt()
                           .domain([0, population_max])
                           .range([0, 20]);

            function key_func(d) {
                return d[ditDataYear];
            };
               
            function update(year) {
              
              // filter data by year
              var filtered = data.filter(function(d) {
                  return d[ditDataYear] === year;
              });
              
              d3.select("#ditTask1Int2Title")
                  .text("Population growth (annual %) - " + year);
              
              var circles = svg//.select('g[class="bubble"]')
                               .selectAll('circle')
                               .data(filtered, key_func);

              
              circles.exit().remove();
              
              svg.append('g')
                 .attr("class", "bubble")
                 .selectAll("circle")
                 .data(filtered)
                 .enter()
                 .append("circle")
                 //.transition()
                 //.duration(500)
                 .attr("transform", function(d) {return "translate(" + country_centers[d[ditDataCode]] + ")";})
                 .attr('r', function(d) {return radius(Math.abs(+d[ditCriteria]));})
                 .style('fill', function(d) { if (+d[ditCriteria] < 0) {return 'Yellow';} return 'Green';})
                 .style('stroke','black')
                 .style('stroke-width','0.5')
                 .on("mouseover", function(d,i) {
                      d3.select(this).style({'stroke-opacity':1,'stroke':'brown','stroke-width':0.5})
                      tooltip.classed("hidden", false);
                      ditCountrynameTtip.text(ditDataName + ": " + d[ditDataName]);
                      ditYearTtip.text(ditDataYear + ": " + d[ditDataYear]);
                      ditDataPopTotalTtip.text(ditDataPopTotal + ": " + ditCkeckNum(d[ditDataPopTotal]));
                      ditDataPopFTtip.text(ditDataPopF + ": " + ditCkeckNum(d[ditDataPopF]));
                      ditDataPop0to14Ttip.text(ditDataPop0to14 + ": " + ditCkeckNum(d[ditDataPop0to14]));
                      ditDataPop15to64Ttip.text(ditDataPop15to64 + ": " + ditCkeckNum(d[ditDataPop15to64]));
                      ditDataPop65Ttip.text(ditDataPop65 + ": " + ditCkeckNum(d[ditDataPop65]));
                      ditDataPopGrowthTtip.text(ditDataPopGrowth + ": " + ditCkeckNum(d[ditDataPopGrowth]));
                      ditDataPopDeathRateTtip.text(ditDataPopDeathRate + ": " + ditCkeckNum(d[ditDataPopDeathRate]));
                      ditDataPopLifeExpectTtip.text(ditDataPopLifeExpect + ": " + ditCkeckNum(d[ditDataPopLifeExpect]));
                 })
                 .on("mouseout", function(d) {
                    //d3.select(this).style({'stroke':'none'});
                    d3.select(this).style({'stroke':'black'});
                    tooltip.classed("hidden", true);
                 });
            };
            
            // added to move martini - BEGIN
            d3.selectAll("#ditTask1Int2FieldGroup").classed("hidden", false);
        
            var options = d3.select("#ditTask1Int2Field")
                .append("select")
                .attr("id", "ditOptions")
                .attr("class", "form-control")
                .selectAll("option")
                .data(years)
                .enter()
                .append("option")
                .text(function(d) {return d;})
                .attr("value", function(d) {return d;});
            
            d3.select('#ditOptions')
                .on("change", function(d) {
                    key = this[this.selectedIndex].value;
                    update(key);
            });
            
            update("1967");
            
            // added to move martini - END
            
            
            /* Commented to remove martini
            var year_idx = 0;

            var year_interval = setInterval(function() {
            
                update(years[year_idx].toString());

                year_idx = year_idx + 4;

                if(year_idx >= years.length) {
                    clearInterval(year_interval);
                
                    d3.selectAll("#ditTask1Int2FieldGroup").classed("hidden", false);
                
                    var options = d3.select("#ditTask1Int2Field")
                        .append("select")
                        .attr("id", "ditOptions")
                        .attr("class", "form-control")
                        .selectAll("option")
                        .data(years)
                        .enter()
                        .append("option")
                        .text(function(d) {return d;})
                        .attr("value", function(d) {return d;});
                    
                    $('#ditOptions').val(ditFirstYear);
                    
                    d3.select('#ditOptions')
                        .on("change", function(d) {
                            key = this[this.selectedIndex].value;
                            update(key);
                    });
                }
            }, 1500);
            */

      };
      
      d3.tsv(ditDataSource, plot_points);
 
    };

    /*d3.json(ditMapData, function(error, europe) {
                              if (error) return console.error(error);
                              draw(europe);
                        });*/
    // callback function wrapped for loader in 'init' function
    function init() {

        var target = document.getElementById('ditTask1Int2');
        
        // trigger loader
        var spinner = new Spinner(opts).spin(target);

        // slow the json load intentionally, so we can see it every load
        setTimeout(function() {

            // load json data and trigger callback
            d3.json(ditMapData, function(error, data) {
                
                if (error) return console.error(error);
                              
                // stop spin.js loader
                spinner.stop();
                
                // instantiate map within callback
                draw(data);
                        });
        }, 1500);
    } 
    
    init();
}

function ditShowTask2Int1() {
    console.log("ditShowTask2Int1");
    
    function draw(europe) {
            var margin = 75,
                width = 1200 - margin,
                height = 600 - margin;
            
            var svg = d3.select("#ditTask2Int1")
                      .append("svg")
                        .attr("width", width + margin)
                        .attr("height", height + margin);
                        
            function dimpleDoIt(country) {
                     
                     svg.selectAll("*").remove();
                     
                     svg.append('g')
                          .attr('class','chart');
                     
                      // filter by country
                      var filtered = europe.filter(function(d) {
                          return d[ditDataCode] === country;
                      });
                      
                      // remove years without records
                      var filtered = filtered.filter(function(d) {
                          return d[ditDataUnTotal] != 0;
                      });
                      
                      if (filtered.length === 0) {
                          alert("There is no data recorded for the selected country");
                      } else {
                          filtered = filtered.map(function(x) {
                              var y = x;
                              for (i=0;i<ditDataUnArr.length;i++) {
                                  x[ditDataUnArr[i]] = ditCkeckNum(x[ditDataUnArr[i]]);
                              }
                              return y;
                          });
                          
                          var myChart = new dimple.chart(svg, filtered);
                          var x = myChart.addTimeAxis("x", ditDataYear); 
                          myChart.addMeasureAxis("y", ditDataUnTotal);
                          x.dateParseFormat = "%Y";
                          x.tickFormat = "%Y";
                          x.timeInterval = 1;
                          
                          // dimple.chart.setMargins(left, top, right, bottom
                          myChart.setMargins("10%,20px", "10%,20px", "10%,20px","10%,20px"); 
                          
                          myChart.addSeries(null, dimple.plot.line);
                          //myChart.addSeries(null, dimple.plot.scatter);
                          // do not show the unemployment total % since the chart will already show it automatically
                          var extraInfo= ditDataUnArr.slice(0);
                          extraInfo.splice(ditDataUnArr.indexOf(ditDataUnTotal), 1);
                          
                          myChart.addSeries(extraInfo, dimple.plot.scatter);
                          
                          //console.table(filtered);
                          myChart.draw();
                      }
                      
              }

              d3.select('#ditTask2Int1Opts')
                  .on("change", function(d) {
                      key = this[this.selectedIndex].value;
                      dimpleDoIt(key);
              });
              
              dimpleDoIt("ALB");
           
    };
                                
    //d3.tsv(ditDataSource, draw);
    
    // callback function wrapped for loader in 'init' function
    function init() {

        var target = document.getElementById('ditTask2Int1');
        
        // trigger loader
        var spinner = new Spinner(opts).spin(target);

        // slow the json load intentionally, so we can see it every load
        setTimeout(function() {

            // load json data and trigger callback
            d3.tsv(ditDataSource, function(data) {

                // stop spin.js loader
                spinner.stop();

                // instantiate chart within callback
                draw(data);

            });
        }, 1500);
    } 

    init();
    
}

function ditShowTask2Int2() {
    var divtask = "#ditTask2Int2";
    
    console.log("ditShowTask2Int2");
    
    function tabulate(data) {
        
        // get years
        var years = [];

        for(var i = 1980; i < 2015; i ++) {
            years.push(i);
        }
                                
        /* most year do not have data
        var years = [];
        data.forEach(function(d) {
            if (years.indexOf(d[ditDataYear]) === -1) {
                years.push(d[ditDataYear]);
            } 
        });
        */
        
        // build select for years
        var options = d3.select(divtask + "Field")
            .append("select")
            .attr("id", "ditOptions")
            .attr("class", "form-control")
            .selectAll("option")
            .data(years)
            .enter()
            .append("option")
            .text(function(d) {return d;})
            .attr("value", function(d) {return d;})
            ;
          
        d3.select('#ditOptions')
            .on("change", function(d) {
                key = this[this.selectedIndex].value;
                update(key);
        });
        
        // get columns names
        var columns = ditDataUnArr.slice(0);
        columns.unshift(ditDataName);
        /*var columns = Object.keys(data[0]);

        // remove some columns
        var removeColumns = [ditDataName,ditDataYear];
        removeColumns.forEach(function(d) {
            columns.splice(columns.indexOf(d), 1);
        });
        //columns.splice(columns.indexOf(ditDataName), 1);
        //columns.splice(columns.indexOf(ditDataYear), 1);
        */

        var divTable = d3.select("#ditTask2Int2")
                      .append("div")
                      .attr("class", "table-responsive");
        
        var table = //d3.select("#ditTask2Int2")
                    divTable
                      .append("table")
                      //.attr("width","100%")
                      //.attr("table-layout","auto")
                      .attr("class", "table table-hover table-striped table-bordered table-condensed"),
            thead = table.append("thead"),
            tbody = table.append("tbody");
        
        // append the header row
        thead.append("tr")
             .selectAll("th")
             .data(columns)
             .enter()
             .append("th")
             .text(function(column) { return column;});
        
        function update (year) {
            tbody.selectAll("*").remove();
            
            d3.select(divtask + "Title")
                .text("Unemployment for " + year);
            
            // filter data by year
            var filtered = data.filter(function(d) {
                                return d[ditDataYear] === year;
                           });
            
            // handle no info tuples
            filtered = filtered.map(function(x) {
                var y = x;
                for (i=0;i<ditDataUnArr.length;i++) {
                    x[ditDataUnArr[i]] = ditCkeckNum(x[ditDataUnArr[i]]);
                }
                return y;
            });
            
            // order by country
            filtered.sort(function(a,b) {
                 var compA = a[ditDataName].toUpperCase();
                 var compB = b[ditDataName].toUpperCase();
                 return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
            });

            // create a row for each object in the data
            var rows = tbody.selectAll("tr")
                            .data(filtered)
                            .enter()
                            .append("tr");
            
            // create a cell in each row for each column
            var cells = rows.selectAll("td")
                            .data(function(row) {
                                return columns.map(function(column) {
                                    return {column: column, value: row[column]};
                                });
                            })
                            .enter()
                            .append("td")
                            .attr("style", "font-family: Courier")
                            .html(function(d) {return d.value;});
        
            return table;
        }
        
        update("1980");
    };
    
    /* Use D3 to load the data file */
    /*d3.tsv(ditDataSource, function(error, data) {
        if (error) return console.error(error);
        tabulate(data);
    });*/
    // callback function wrapped for loader in 'init' function
    function init() {

        var target = document.getElementById('ditTask2Int2');
        
        // trigger loader
        var spinner = new Spinner(opts).spin(target);

        // slow the json load intentionally, so we can see it every load
        setTimeout(function() {

            // load json data and trigger callback
    d3.tsv(ditDataSource, function(error, data) {
        if (error) return console.error(error);
                
                // stop spin.js loader
                spinner.stop();

                // instantiate table within callback
        tabulate(data);
    });
        }, 1500);
    } 

    init();
}

function ditEndTask() {
    console.log("ditEndTask");
    
    $('#ditbtnendtask1i1').button('loading');
    $('#ditbtnendtask1i2').button('loading');
    $('#ditbtnendtask2i1').button('loading');
    $('#ditbtnendtask2i2').button('loading');
    
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
    
    $('#ditbtnsrv').button('loading');
    // console.log("start task 1");
    
    var formData = $('#ditformprequest').serializeArray();

    // check if all data was filled
    if (formData.length === 9 && formData[2].value !== "") {
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
       console.log(" ditformprequest not filled");
       $('#ditbtnsrv').button('reset');
    }
   
}

function ditPrepareTask(task) {
    console.log("ditPrepareTask");
    $('#ditbtntask1').button('loading');
    $('#ditbtntask2').button('loading');
    dit.task = task;
    ditShowDiv("#ditsurvey");
}

function ditSubmitPostSurvey(e, formID) {
    console.log("ditSubmitPostSurvey");
    e.preventDefault(); // avoid to execute the actual submit of the form.
    
    $('#ditbtnsrvtask1').button('loading');
    $('#ditbtnsrvtask2').button('loading');

    var formData = $(formID).serializeArray();
    
    // check if all data was filled
    //if ((dit.task == 1 && formData.length === 1 && formData[0].value !== "") || (dit.task == 2 && formData.length === 2)) {
if ((dit.task == 1 && formData.length === 2) || (dit.task == 2 && formData.length === 2)) {    
    // all data was filled, send to server
        var data = $(formID).serialize();
        
        var postResponse;
        postResponse = dit.persist.sendTaskSurvey(dit.task, data);
        postResponse.done(function(data) {
            console.log("postResponse.done");
            console.log(data);
            ditStartSelfMWL();
        });
    } else {
       console.log(formID + "form not filled or completed");
       $('#ditbtnsrvtask1').button('reset');
       $('#ditbtnsrvtask2').button('reset');
    }
}

function ditStartSelfMWL() {
    console.log("ditStartSelfMWL");
    ditShowDiv("#ditselfmwl");
}

function ditBye(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    console.log("ditBye");
    
    $('#ditbtnselfmwl').button('loading');
    
    var formData = $('#ditformselfmwl').serializeArray();
    
    // check if all data was filled
    if (formData.length === 21) {
        // all data was filled, send to server
        var data = $("#ditformselfmwl").serialize();

        var postResponse = dit.persist.selfMWL(data);
        postResponse.done(function(data) {
            console.log("postResponse.done dit.persist.selfMWL");
            console.log(data);
            ditShowDiv("#ditthanksbye");
        });        
    } else {
       console.log("ditformselfmwl not filled");
       $('#ditbtnselfmwl').button('reset');
    }
}

function ditFinish(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    console.log("ditFinish");
    $('#ditbtnend').button('loading');

    var formData = $('#ditformend').serializeArray();
    
    //console.log(formData);
    
    if (formData[0].value !== ""){
        var postResponse = dit.persist.email($('#ditformend').serialize());
        
        postResponse.done(function(data) {
            //console.log(" dit.persist.email postResponse.done");
            //console.log(data);
            //window.location.replace("http://filipe.lucalongo.eu/");
            window.location.href = "index.html";
        }); 
    } else {
        //window.location.replace("http://filipe.lucalongo.eu/");
        window.location.href = "index.html";
    }
    
    
}
