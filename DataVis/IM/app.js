var width = 1900,
    height = 930;

var svg = d3.select("svg")

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

let buttons = [{label: "COVID", class: "covid"}, {label: "REGIONS", class: "regions"}, {label: "RESET", class: "reset"}];
let bColours =  ["#ff00bf", "#ffa328", '#868686'];

const colorCovid = d3.scale.threshold()
    .domain([0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 25000]) //12 Colours
    .range(['#c8ffb5', '#bcf6a5', '#b4ed96', '#b1e289',
        '#b0d77c', '#b2cc70', '#b4c065', '#b8b35b',
        '#bca651', '#c09848', '#c48940', '#d77042',
        '#ce6640', '#c45d3e', '#ba553a', '#af4d37',
        '#a54533', '#9a3d2f', '#8f362b', '#842e27',
        '#7a2723', '#6f2020']);

const colorCovid1 = d3.scale.threshold()
    .domain([0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 25000])
    .range(['#1e8514', '#2d8f10', '#3d9a0c', '#4ca409',
            '#5caf05', '#6bb902', '#7dc304', '#92cd0e',
            '#a6d617', '#badf20', '#cee929', '#e9b137',
            '#e39e1e', '#dc8a04', '#db7207', '#dc5512',
            '#d7351e', '#ba3521', '#9d3425', '#7f3429',
            '#5e342d', '#333333' ]);

regionFlag = false;

cPiemonte = "#fff38e";
cLombardia = "#67ca64";
cLiguria = "#e2b5ff";
cEmilia = '#ca544c';

/*
totPiemonte = totSicilia = totSardegna = totLiguria = totToscana = totEmiglia = totVeneto = totFriuli = 0;
totTrentino = totMarche = totMolise = totUmbria = totLazio = totCalabria = totPuglia = totAbruzzo = totCampania = 0;
totBasilicata = totValle = totLombardia = 0;

array = [[totPiemonte, "Piemonte"], [totSicilia, "Sicilia"],[totSardegna, "Sardegna"], [totLiguria, "Liguria"],
        [totToscana, "Toscana"], [totEmiglia, "Emilia-Romagna"], [totVeneto, "Veneto"], [totFriuli, "Friuli Venezia Giulia"],
        [totTrentino, "Trentino-Alto Adige"], [totMarche, "Marche"], [totMolise, "Molise"], [totUmbria, "Umbria"],
        [totLazio, "Lazio"], [totCalabria, "Calabria"], [totPuglia, "Puglia"], [totAbruzzo, "Abruzzo"],
        [totCampania, "Campania"], [totBasilicata, "Basilicata"], [totValle, "Valle d'Aosta"], [totLombardia, "Lombardia"]];
*/
var total = 0;

d3.json("./limits_IT_provinces.topo.json", function(error, topology) {
    d3.csv("covid1.csv", function(data1) {
        for (var i = 0; i < data1.length; i++) {
            //console.log(data1[i].codice_regione);
            var temp = parseInt(data1[i].totale_casi, 10);
            total += temp;
        }
/*
        for (var j = 0; j < array.length; j++) {
            if (j === 0)
                regionTotal(data1, j);
            if (j === 1)
                regionTotal(data1, j);
            if (j === 2)
                regionTotal(data1, j);
            if (j === 3)
                regionTotal(data1, j);
            if (j === 4)
                regionTotal(data1, j);
            if (j === 5)
                regionTotal(data1, j);
            if (j === 6)
                regionTotal(data1, j);
            if (j === 7)
                regionTotal(data1, j);
            if (j === 8)
                regionTotal(data1, j);
            if (j === 9)
                regionTotal(data1, j);
            if (j === 10)
                regionTotal(data1, j);
            if (j === 11)
                regionTotal(data1, j);
            if (j === 12)
                regionTotal(data1, j);
            if (j === 13)
                regionTotal(data1, j);
            if (j === 14)
                regionTotal(data1, j);
            if (j === 15)
                regionTotal(data1, j);
            if (j === 16)
                regionTotal(data1, j);
            if (j === 17)
                regionTotal(data1, j);
            if (j === 18)
                regionTotal(data1, j);
            if (j === 19)
                regionTotal(data1, j);
        }
*/

/*
        console.log("Casi Piemonte: " + array[0])
        console.log("Casi Sicilia: " + array[1])
        console.log("Casi Sardegna: " + array[2])
        console.log("Casi Liguria: " + array[3])
        console.log("Casi Toscana: " + array[4])
        console.log("Casi Emiglia: " + array[5])
        console.log("Casi Veneto: " + array[6])
        console.log("Casi Friuli: " + array[7])
*/
        document.getElementById("total").innerHTML = "Total COVID-19 cases: " + total;
    });


    function regionTotal(data1, j){
        for (var n = 0; n < data1.length; n++) {
            //console.log("regione: " + data1[n].nome_regione + " provincia: " + data1[n].nome_provincia +  " tot casi: " + data1[n].totale_casi)
            //console.log(data1[i].codice_regione);
            if (data1[n].nome_regione === array[j][1]) {
                //console.log("passed check: " + data1[n].nome_regione)
                var temp1 = parseInt(data1[n].totale_casi, 10)
                array[j][0] += temp1;
            }
        }
    }

    if (error) throw error;

    //console.log("topojson", topology);
    var geojson = topojson.feature(topology, topology.objects.provinces);
    //console.log("geojson", geojson);

    //console.log(geojson.features)
    projection = d3.geo.mercator().translate([width/3, height*3.73]).scale(width*1.95);
    var path = d3.geo.path().projection(projection);

    svg.selectAll('.button')
        .data(buttons)
        .enter()
        .append('rect')
        .attr('class', d => 'button-'+d.class)
        .attr('x', 30)
        .attr('y', (d, i) => {
            return (i*50) + 700;
        })
        .attr('height', 40)
        .attr('width', 150)
        .attr('rx', 6)
        .attr('ry', 6)
        .style("stroke", "black")
        .style("stroke-width", 2)
        .style('cursor', 'pointer')
        .style("fill", (d, i) => {
            return bColours[i];
        })
        .on('click', (d, i) => {
            filterMap(d, i);
        });

    svg.selectAll('.button')
        .data(buttons)
        .enter()
        .append('text')
        .attr('x', 40)
        .attr('y', (d, i) => {
            return (i*50) + 725;
        })
        .attr("font-size", '22px')
        .style("font-weight", "bold")
        .style('cursor', 'pointer')
        .style('justify-content', 'center')
        .style('align-items', 'center')
        .text(d => d.label);


    svg.selectAll("path")
        .data(geojson.features)
        .enter().append("path")
        .attr("class", d => "province-" + d.properties.prov_name + "-region-" + d.properties.reg_name)
        .attr("d", path)  // Added center and rotate here
        .style("opacity", 1)
        .style('stroke', "#000000")
        .on("mouseover", function(d) {
            if(regionFlag){
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("opacity", 1)
                    .style('stroke-width', 4)
                    .style('stroke', "#000000");
            }
            else {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("opacity", 1)
                    .style('stroke-width', 4)
                    .style('stroke', "#f8fff7");
            }
            div.transition()
            .duration(200)
            .style("opacity", .9);
            div	.html("Province: " + d.properties.prov_name + "<br/>"  + "Region : " + d.properties.reg_name + "<br/>" + "Province Cases: " + d.properties.covid + "<br/>" + "Region Cases: " + d.properties.covid_region)
                .style("color", "white")
            .style("left", (d3.event.pageX + 60) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
        .on("mouseout", function(d) {
            svg.selectAll('path')
                .transition()
                .duration(100)
                .style("opacity", (d) => {
                    return 1;
                })
                .style('stroke-width', 0.4)
                .style('stroke', "#000000");

            div.transition()
                .duration(300)
                .style("opacity", 0);
        });


    function filterMap(button, index) {
        if (button.class === "covid"){
            regionFlag = false;
            svg.selectAll("path").style('fill', (d) => { return colorCovid(d.properties.covid); });
        }
        if (button.class === "reset"){
            svg.selectAll("path").style('fill', (d) => { return bColours[2]; });
            regionFlag = false;
            }

        if (button.class === "regions")
            svg.selectAll("path").style('fill', (d) => {
                regionFlag = true;
                // Green
                if(d.properties.reg_name === "Lombardia" ||
                    d.properties.reg_name === "Friuli-Venezia Giulia" ||
                    d.properties.reg_name === "Marche" ||
                    d.properties.reg_name === "Sardegna" ||
                    d.properties.reg_name === "Campania") return cLombardia;

                // Purple
                if(d.properties.reg_name === "Liguria" ||
                    d.properties.reg_name === "Valle d'Aosta" ||
                    d.properties.reg_name === "Trentino-Alto Adige" ||
                    d.properties.reg_name === "Umbria" ||
                    d.properties.reg_name === "Molise" ||
                    d.properties.reg_name === "Calabria") return cLiguria ;

                // Yellow
                if(d.properties.reg_name === "Piemonte" ||
                    d.properties.reg_name === "Veneto" ||
                    d.properties.reg_name === "Toscana" ||
                    d.properties.reg_name === "Abruzzo" ||
                    d.properties.reg_name === "Puglia") return cPiemonte;

                // Red
                if(d.properties.reg_name === "Emilia-Romagna" ||
                    d.properties.reg_name === "Lazio" ||
                    d.properties.reg_name === "Sicilia" ||
                    d.properties.reg_name === "Basilicata") return cEmilia;
                });
    }


    // draw legend Happiness
    var legend = svg.selectAll(".legend")
        .data(colorCovid.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(-1800," + i * 12 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
        .attr("x", width - 20)
        .attr("y", 350)
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", colorCovid);

    // draw legend text
    legend.append("text").attr("class", "text1")
        .attr("x", width-28)
        .attr("y", 346)
        .attr("dy", ".65em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})

    //legend title happiness
    var legendTitle = svg.append("text").attr("class", "text2")
        .attr("x", 200)
        .attr("y", 320)
        .attr("dy", ".95em")
        .style("text-anchor", "end")
        .text("COVID Cases By Province");
});



