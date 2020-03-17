var margin, svg;
var headers, layers;
var x, y;
var colours;
var yAxis, xAxis;
var groups, rect;
var legend, hoverData, legendTitle;


// Creating values for width, height and margins of svg box
margin = {top: 100, right: 150, bottom: 100, left: 100};
width = 1400 - margin.left - margin.right,
    height = 840 - margin.top - margin.bottom;

//defining the colours that will be used for the different sections of the bar graph
// red for apples, blue for water, yellow for eggs, and grey for milk
colours = ["#ef494d", "#7070d2", "#f2ec63", "#a4a5a0"];

//-------------------------------------------------------------------------------------------------------
// Creating svg box with specific dimensions
svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//-------------------------------------------------------------------------------------------------------
//loading data from csv file using d3'sstack layout. x contains country names, while y contains prices
d3.csv("Book2.csv", function (data){
    headers = ["Milk","Eggs","Water","Apples"];
    layers = d3.layout.stack()(headers.map(function(numbers) {
        return data.map(function(d) {
            return {x: d.Country, y: +d[numbers]};
        });
    }));

    //defining domain and range for x
    x = d3.scale.ordinal()
        .domain(layers[0].map(function(d) { return d.x; }))
        .rangeRoundBands([10, width-30], 0.1);


    //defining domain and range for y
    y = d3.scale.linear()
        .domain([0, d3.max(layers, function(d) {  return d3.max(d, function(d) { return  d.y+6; });  })])
        .range([height, 0]);


//-------------------------------------------------------------------------------------------------------
    // defining and drawing  y axes
    yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(15)
        .tickSize(- width+45, 100, 5)
        .tickPadding(15)
        .tickFormat( function(d) { return d } );

    // defining and drawing  x axes
    xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.Country);

//-------------------------------------------------------------------------------------------------------
    // positioning of y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("font-size", "20px")
        .attr("transform", "translate(2)")
        .call(yAxis);

    //positioning of x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("font-size", "20px")
        .attr("transform", "translate(-13," + height + ")")
        .call(xAxis);


    //-------------------------------------------------------------------------------------------------------
    //x axis label
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("font-size", "22px")
        .attr("font-weight", "bold")
        .attr("x", width + 20)
        .attr("y", height + 60)
        .text("Countries");

    //y axis label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("font-size", "22px")
        .attr("font-weight", "bold")
        .attr("x", width-1070)
        .attr("y", -20)
        .attr("dy", ".1em")
        .text("Cost of Product");


//-------------------------------------------------------------------------------------------------------
// Create groups for each series
    groups = svg.selectAll("g.cost")
        .data(layers)
        .enter().append("g")
        .attr("class", "costIndex")
        .style("fill", function(d, i) { return colours[i]; });

    //add rectangle to each group, calculate the start of the rectangle by subtracting the value of the lower rectangle
    rect = groups.selectAll("rect").data(function(d) { return d; }).enter().append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .attr("width", x.rangeBand() - 10)
        .on("mouseover", function() { hoverData.style("display", null); })
        .on("mouseout", function() { hoverData.style("display", "none"); })
        .on("mousemove", function(d) {
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            hoverData.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            hoverData.select("text").text(d.y.toFixed(3));

        });


// Draw legend
    legend = svg.selectAll(".legend")
        .append('text')
        .text('Legend Title')
        .attr('y', legend - 20)
        .data(colours)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(60," + i * 35 + ")"; })
        .text("Legend");

//-------------------------------------------------------------------------------------------------------
//legend title
    legendTitle = svg.select(".legend")
        .append('text')
        .attr("x", width - 20)
        .attr("y", -20)
        .attr("font-size", "22px")
        .attr("font-weight", "bold")
        .text("Items");


//create the small coloured rectangles for the legend
    legend.append("rect")
        .attr("x", width - 20)
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", function(d, i) {return colours.slice().reverse()[i];});


// create text for legend rectangle
    legend.append("text")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr("font-size", "18px")
        .style("text-anchor", "start")
        .text(function(d, i){
            if(i==0) return "Milk";
            if(i==1) return "Eggs";
            if(i==2) return "Water";
            if(i==3) return "Apples";
        });


//-------------------------------------------------------------------------------------------------------
//hovering data display
    hoverData = svg.append("g")
        .attr("class", "hoverData")
        .style("display", "none");
//text on the hovering
    hoverData.append("text")
        .attr("x", 10)
        .attr("dy", "1em")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .style("text-anchor", "middle");

});
