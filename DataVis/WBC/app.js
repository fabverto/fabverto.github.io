let bPoints = [{x:0,y:40}, {x:40,y:80}, {x:80,y:40}, {x:40,y:0}];
var makeBallon = d3.line()
	.curve(d3.curveBasisClosed)
	.x(function(d) { return d.x * 1.1 })
    .y(function(d) { return d.y * 1.1 });

colours = ["#ff6356", "#ffffb3", "#bebada", "#95ff68",
			"#b991ff"];


window.onload = function() {
	setupChart();
}

colorCovid = "#ff0023"


let buttons = [{label: "Asia", class: "asia"}, {label: "Europe", class: "europe"},
				{label: "Africa", class: "africa"}, {label: "Americas", class: "america"},
				{label: "Oceania", class: "oceania"}, {label: "Reset", class: "reset"}];

bColours =  ["#8dd3c7", "#ffa328", '#bebada', '#fb8072',
	'#80b1d3', '#ff97d2'];

function setupChart(){
  d3.csv("./covidFinal.csv").then((data) => {
		let svg = d3.select('svg');
		let width = document.body.clientWidth; // get width in pixels
		let height = +svg.attr('height');
		let centerX = width / 2;
		let centerY = height / 2.2;
		let strength = 0.1;
		let scaleColor = d3.scaleOrdinal(d3.schemeSet3);
		// use pack to calculate radius of the circles
		let pack = d3.pack()
			.size([width, height])
			.padding(1);


		let forceCollide = d3.forceCollide(d => 50);
		// use the force
		let simulation = d3.forceSimulation()
			.force('charge', d3.forceManyBody())
			.force('collide', forceCollide)
			.force('x', d3.forceX(centerX).strength(strength))
			.force('y', d3.forceY(centerY).strength(strength));

		let root = d3.hierarchy({ children: data })
			.sum(d => d.value);
		// we use pack() to automatically calculate radius conveniently only
		// and get only the leaves
		let nodes = pack(root).leaves().map(node => {
			const data = node.data;
			return {
				x: centerX * 20, // magnify start position to have transition to center movement
				y: centerY * 20,
				r: 0, // for tweening
				radius: node.r, //original radius
				id: data.iso_code + '.' + (data.Country),
				cat: data.Continent,
				name: data.Country,
				value: data.total_cases,
				death: data.total_deaths
		}});


	  svg.selectAll('.button')
		  .data(buttons)
		  .enter()
		  .append('rect')
		  .attr('class', d => 'button-'+d.class)
		  .attr('x', (d, i) => {
			  return (i*200) + 400;})
		  .attr('y', 50)
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
		  .attr('x', (d, i) => {
			  return (i*200) + 470;})
		  .attr('y', 75)
		  .attr("font-size", '22px')
		  .style("font-weight", "bold")
		  .style('cursor', 'pointer')
		  .style('justify-content', 'center')
		  .style('align-items', 'center')
		  .text(d => d.label);



		simulation.nodes(nodes).on('tick', ticked);

		let node = svg.selectAll('.node')
			.data(nodes)
			.enter().append('g')
			.attr("class", function(d) {
				let lol = 'node ' + d.cat
				return lol})
			.call(d3.drag()
				.on('start', (d) => {
					if (!d3.event.active) simulation.alphaTarget(1).restart();
					d.fx = d.x;
					d.fy = d.y;
				})
				.on('drag', (d) => {
					d.fx = d3.event.x;
					d.fy = d3.event.y;
				})
				.on('end', (d) => {
					if (!d3.event.active) simulation.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				}));

/*
			 node.append('path')
				 .attr('d', (d) => {
				console.log(d.value)
				return makeBallon(bPoints)
			})


			.attr('fill', d => scaleColor(d.cat))
			.transition().duration(1700).ease(d3.easeElasticOut)
				.tween('circleIn', (d) => {
					let i = d3.interpolateNumber(0, d.value * 5.5);
					return (t) => {
						d.r = i(t);
						simulation.force('collide', forceCollide);
					}
				});
*/


		  node.append("circle")
		  	.attr("r", function(d) {
		  		let lol = d.value
			  return lol})
			  .attr("class", function(d) {
				  let lol = d.cat
				  return lol})
				.style("fill", d => scaleColor(d.cat));


			 node.append('text')
				.text(d => d.name)
				.style("font-size", d => {if (d.value < 100) return "14"
				else if (d.value <= 2000)
					return "16";
				else if (d.value > 2000 && d.value <= 10000)
					return "20";
				else if (d.value > 10000 && d.value < 100000)
					return "24"
				else
					return "32"})
				 .style("font-weight", "bold")
				.style("text-anchor", "middle")
			 	.attr("dy", ".3em")
				 .attr("dx", ".3em")
				.attr('fill', (d) => {
				//console.log(scaleColor(d.cat));
				return 'black';
			});

		node.append('title')
			.text(d => (d.name + '\n' + "Covid Cases: " + d.value + '\n' +"Covid Deaths: " + d.death))
		let legendColors = d3.legendColor()
			.scale(scaleColor)
			.shape('circle');
		let legend = svg.append('g')
			.classed('legend-color', true)
			.attr('text-anchor', 'start')
			.attr('transform','translate(30,30)')
			.style('font-size','30px')
			.call(legendColors);
		let chartScale = d3.scaleOrdinal()
  			.domain(['More COVID Cases', 'Less COVID Cases'])
  			.range([60, 20] )
		let legendSize = d3.legendSize()
			.scale(chartScale)
			.shape('circle')
			.shapePadding(20)
			.labelAlign('end');
		let legend2 = svg.append('g')
			.classed('legend-size', true)
			.attr('text-anchor', 'start')
			.attr('transform', 'translate('+(width-300)+', 20)')
			.style('font-size', '22px')
			.style("font-weight", "bold")
			.call(legendSize);


		function ticked() {
			node.attr('transform', d => `translate(${d.x},${d.y})`)
				.select('circle')
					.attr('r', d => {
						lol = Math.sqrt(Math.sqrt(d.value) * 40)
						return lol
					});
		}

	  function filterMap(button, index) {

		  if (button.class === "asia") {
			  svg.selectAll(".node").each(function () {
				  d3.select(this).style("visibility", "visible")
			  })
			  //svg.selectAll(".node").filter(".Africa, .Europe, .Oceania, .Americas").remove();
			  svg.selectAll(".node").filter(".Africa, .Europe, .Oceania, .Americas").each(function () {
				  d3.select(this).style("visibility", "hidden")
			  })


			  // svg.selectAll(".node").filter(".Africa, .Europe, .Oceania, .Americas").style.display = "none";

			  /*
			  svg.selectAll(".node circle").style('opacity', (d) => {
				  if (d.cat === "Asia") return 1;
				  else return 0;
			  });
			  svg.selectAll(".node text").style('opacity', (d) => {
				  if (d.cat === "Asia") return 1;
				  else return 0;
			  });
		  	 */
		  }
		  if (button.class === "europe") {
				  svg.selectAll(".node").each(function () {
				  	console.log("yo")
					  d3.select(this).style("visibility", "visible")
				  })

				  //svg.selectAll(".node").filter(".Africa, .Asia, .Oceania, .Americas").remove();
				  svg.selectAll(".node").filter(".Africa, .Asia, .Oceania, .Americas").each(function () {
					  d3.select(this).style("visibility", "hidden")
				  })

			//  svg.selectAll(".node").filter(".Africa, .Asia, .Oceania, .Americas").remove();
		  	/*
			  svg.selectAll(".node circle").style('opacity', (d) => {
				  if (d.cat === "Europe") return 1;
				  else return 0;
			  });
			  svg.selectAll(".node text").style('opacity', (d) => {
				  if (d.cat === "Europe") return 1;
				  else return 0;
			  });

		  	 */
		  }
		  if (button.class === "africa") {
				  svg.selectAll(".node").each(function () {
					  d3.select(this).style("visibility", "visible")
				  })
				  //svg.selectAll(".node").filter(".Asia, .Europe, .Oceania, .Americas").remove();
				  svg.selectAll(".node").filter(".Asia, .Europe, .Oceania, .Americas").each(function () {
					  d3.select(this).style("visibility", "hidden")
				  })

			 // svg.selectAll(".node").filter(".Asia, .Europe, .Oceania, .Americas").remove();
		  	/*
			  svg.selectAll(".node circle").style('opacity', (d) => {
				  if (d.cat === "Africa") return 1;
				  else return 0;
			  });
			  svg.selectAll(".node text").style('opacity', (d) => {
				  if (d.cat === "Africa") return 1;
				  else return 0;
			  });

		  	 */
		  }
		  if (button.class === "america") {
				  svg.selectAll(".node").each(function () {
					  d3.select(this).style("visibility", "visible")
				  })
				  //svg.selectAll(".node").filter(".Africa, .Europe, .Oceania, .Asia").remove();
				  svg.selectAll(".node").filter(".Africa, .Europe, .Oceania, .Asia").each(function () {
					  d3.select(this).style("visibility", "hidden")
				  })

			 // svg.selectAll(".node").filter(".Africa, .Europe, .Oceania, .Asia").remove();
		  	/*
			  svg.selectAll(".node circle").style('opacity', (d) => {
				  if (d.cat === "Americas") return 1;
				  else return 0;
			  });
			  svg.selectAll(".node text").style('opacity', (d) => {
				  if (d.cat === "Americas") return 1;
				  else return 0;
			  });

		  	 */
		  }
		  if (button.class === "oceania") {
				  svg.selectAll(".node").each(function () {
					  d3.select(this).style("visibility", "visible")
				  })
				  //svg.selectAll(".node").filter(".Africa, .Europe, .Asia, .Americas").remove();
				  svg.selectAll(".node").filter(".Africa, .Europe, .Asia, .Americas").each(function () {
					  d3.select(this).style("visibility", "hidden")
				  })

			//  svg.selectAll(".node").filter(".Africa, .Europe, .Asia, .Americas").remove();
		  	/*
			  svg.selectAll(".node circle").style('opacity', (d) => {
				  if (d.cat === "Oceania") return 1;
				  else return 0;
			  });
			  svg.selectAll(".node text").style('opacity', (d) => {
				  if (d.cat === "Oceania") return 1;
				  else return 0;
			  });

		  	 */
		  }

		  if (button.class === "reset") {
			  svg.selectAll(".node").each(function () {
				  d3.select(this).style("visibility", "visible")
			  })
		  	/*
			  svg.selectAll(".node circle").style('opacity', (d) => {
				  return 1;
			  });
			  svg.selectAll(".node text").style('opacity', (d) => {
				  return 1;
			  });
		  	 */
		  	//svg.selectAll("*").remove();
		  	//setupChart()
		  }
	  }
	});
}
