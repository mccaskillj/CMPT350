/**
 * Created by carmichael on 2017-03-13.
 */

//-----------------------------------------------------/

// Multi

var data = [];

var items = ["Hp", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"];

// Transpose the data into layers
var dataset = d3.layout.stack()(items.map(function(fruit) {
  return data.map(function(d, i) {
    return {x: d.name,
            y: +d[fruit],
            z: items[0]};
  });
}));


var UNIT_LABEL_WIDTH = 100;
var UNIT_LABEL_HEIGHT = 40;
var GUTTER_WIDTH = 40;

var chartContainer = '.chart-container';
var chartLegendContainer = '.chart-legend-container';

var margins = {
    left: UNIT_LABEL_WIDTH,
    bottom: UNIT_LABEL_HEIGHT,
    right: GUTTER_WIDTH
};

var sizes = {
    width: 1060,
    height: 700
};

var widthM = sizes.width - margins.left - margins.right;
var heightM = sizes.height - margins.bottom;


d3.layout.stack()(dataset);

var dataset = dataset.map(function (group) {
    return group.map(function (d) {
        // Invert the x and y values, and y0 becomes x0
        return {
            x: d.y,
            y: d.x,
            x0: d.y0
        };
    });
});

var svgM = d3.select(multiChart)
        .append('svg')
        .attr('width', widthM+100 + margins.left + margins.right)
        .attr('height', heightM + margins.bottom)
    .style('background-color', "#F0F0FF")
        .append('g')
        .attr('transform', 'translate(' + margins.left + ', 0)');

var units = dataset[0].map(function (d) {
        return d.y;
    });

var yScaleM = d3.scale.ordinal()
        .domain(units)
        .rangeRoundBands([0, heightM], .1);

var yAxis = d3.svg.axis()
        .scale(yScaleM)
        .orient('left');

var xMax = d3.max(dataset, function (group) {
        var groupMax = d3.max(group, function (d) {
            return d.x + d.x0;
        });
        return groupMax;
    });

var xScaleM = d3.scale.linear()
        .domain([0, xMax])
        .range([0, widthM]);

var xAxis = d3.svg.axis()
        .scale(xScaleM)
        .orient('bottom');

var colors2 = ["#90caf9", "#92d36e", "#ff5d55", "#fefb64", "#f54378", "#5d4b7e"];

var groups = svgM.selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .attr('class', 'gggg')
        .style('fill', function (d, i) {
        return colors2[i];
    });

groups.selectAll('rect')
        .data(function (d) {return d;})
        .enter()
        .append('rect')
        .attr('class', 'mybars')
        .attr('x', function (d) {
            return xScaleM(d.x0);
        })
        .attr('y', function (d, i) {return yScaleM(d.y);})
        .attr('height', function (d) {return yScaleM.rangeBand();})
        .attr('width', function (d) {return xScaleM(d.x);})
        .on('mouseover', function (d, i) {
            var xPos = parseFloat(d3.select(this).attr('x')) / 2 + widthM / 4 + 50;
            var yPos = parseFloat(d3.select(this).attr('y')) + heightM / 8 + 220;
            d3.select('#tooltip')
                .style('left', xPos + 'px')
                .style('top', yPos + 'px')
                .select('#value')
                .text(d.x);

            d3.select('#tooltip').classed('hidden', false);
        })
        .on('mouseout', function () {
            d3.select('#tooltip').classed('hidden', true);
        });

svgM.append('g')
      .attr("class", "x axis")
    .attr('transform', 'translate(0,' + heightM + ')')
    .call(xAxis);

svgM.append('g')
      .attr("class", "y axis")
    .style("font-size","15px")
    .style("color", "black")
    .call(yAxis);

// Draw legend
var legend = svgM.selectAll(".legend")
                  .data(colors2)
                  .enter().append("g")
                  .attr("class", "legend")
                  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });

legend.append("rect")
      .attr("x", widthM - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) {return colors2.slice()[i];});

legend.append("text")
      .attr("x", widthM + 5)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d, i) {
        switch (i) {
          case 5: return "Speed";
          case 4: return "Sp. Defense";
          case 3: return "Sp. Attack";
          case 2: return "Defense";
          case 1: return "Attack";
          case 0: return "Hp";
        }
      });

d3.select("#jj")
    .on("click", function() {
        var pokeName = document.getElementById("addPoke").value;
        var elem = document.getElementById('pokeBadges');
        var amount = document.getElementsByClassName('label-success');

        $.ajax({
            type: "GET",
            url: 'ajax/get_single_pokemon/', //the script to call to get data
            data: {"name": pokeName},
            dataType: 'JSON',                //data format
            success: function(pokemons) {
                console.log(pokemons);
                var condition = 1;


                var result = $.grep(data, function(e){ return e.name == pokemons[0].name; });

                if (result.length == 0 && amount.length < 12) {
                    elem.innerHTML += '<span class="label label-success">' + pokeName + '<a name="' + pokeName + '" ' +
                        'class="remove" onclick="remove(this)"> <span class="glyphicon glyphicon-remove-circle" ' +
                        'style="color: white"></span></a></span> ';


                    data.push({
                        name: pokemons[0].name,
                        Hp: String(pokemons[0].hp),
                        Attack: String(pokemons[0].attack),
                        Defense: String(pokemons[0].defense),
                        "Sp. Attack": String(pokemons[0].sp_attack),
                        "Sp. Defense": String(pokemons[0].sp_defense),
                        Speed: (pokemons[0].speed)
                    });

                    // Transpose the data into layers
                    var dataset = d3.layout.stack()(items.map(function (fruit) {
                        return data.map(function (d, i) {
                            return {
                                x: d.name,
                                y: +d[fruit],
                                z: items[0]
                            };
                        });
                    }));

                    d3.layout.stack()(dataset);

                    dataset = dataset.map(function (group) {
                        return group.map(function (d) {
                            // Invert the x and y values, and y0 becomes x0
                            return {
                                x: d.y,
                                y: d.x,
                                x0: d.y0
                            };
                        });
                    });

                    units = dataset[0].map(function (d) {
                        return d.y;
                    });

                    yScaleM = d3.scale.ordinal()
                        .domain(units)
                        .rangeRoundBands([0, heightM], .1);

                    yAxis = d3.svg.axis()
                        .scale(yScaleM)
                        .orient('left');


                    xMax = d3.max(dataset, function (group) {
                        var groupMax = d3.max(group, function (d) {
                            return d.x + d.x0;
                        });
                        return groupMax;
                    });

                    xScaleM = d3.scale.linear()
                        .domain([0, xMax])
                        .range([0, widthM]);

                    xAxis = d3.svg.axis()
                        .scale(xScaleM)
                        .orient('bottom');


                    svgM.selectAll(".gggg").remove();

                    var groupss = svgM.selectAll('#ggggg')
                        .data(dataset)
                        .enter()
                        .append('g')
                        .attr('class', 'gggg')
                        .style('fill', function (d, i) {
                            return colors2[i];
                        });

                    groupss.selectAll('#mybars')
                        .data(function (d) {
                            return d;
                        })
                        .enter()
                        .append('rect')
                        .transition()
                        .delay(function (d, i) {
                            return i / dataset.length * 10;   // <-- Where the magic happens
                        })
                        .duration(1000)
                        .attr('x', function (d) {
                            return xScaleM(d.x0);
                        })
                        .attr('y', function (d, i) {
                            return yScaleM(d.y);
                        })
                        .attr('height', function (d) {
                            return yScaleM.rangeBand();
                        })
                        .attr('width', function (d) {
                            return xScaleM(d.x);
                        })
                    ;

                    svgM.selectAll("g.y.axis")
                        .transition()
                        .delay(function (d, i) {
                            return i / dataset.length * 10;   // <-- Where the magic happens
                        })
                        .duration(1000)
                        .style("font-size", "15px")
                        .style("color", "black")
                        .call(yAxis);

                    svgM.selectAll("g.x.axis")
                        .transition()
                        .delay(function (d, i) {
                            return i / dataset.length * 10;   // <-- Where the magic happens
                        })
                        .duration(1000)
                        .attr('transform', 'translate(0,' + heightM + ')')
                        .call(xAxis);
                }
        },
        failure: function(pokemons) {
            alert('Got an error dude');
        }
        });

    });

function remove(elm){
    var el = elm.parentNode;
    var name = elm.name;
    console.log(name);

    $.grep(data, function(e, i){
        if (e.name == name) {
            console.log(data[i]);
            data.splice( i, 1 );
        }
        });

    // Transpose the data into layers
    var dataset = d3.layout.stack()(items.map(function (fruit) {
        return data.map(function (d, i) {
            return {
                x: d.name,
                y: +d[fruit],
                z: items[0]
            };
        });
    }));

    d3.layout.stack()(dataset);

    dataset = dataset.map(function (group) {
        return group.map(function (d) {
            // Invert the x and y values, and y0 becomes x0
            return {
                x: d.y,
                y: d.x,
                x0: d.y0
            };
        });
    });

    units = dataset[0].map(function (d) {
        return d.y;
    });

    yScaleM = d3.scale.ordinal()
        .domain(units)
        .rangeRoundBands([0, heightM], .1);

    yAxis = d3.svg.axis()
        .scale(yScaleM)
        .orient('left');


    xMax = d3.max(dataset, function (group) {
        var groupMax = d3.max(group, function (d) {
            return d.x + d.x0;
        });
        return groupMax;
    });

    xScaleM = d3.scale.linear()
        .domain([0, xMax])
        .range([0, widthM]);

    xAxis = d3.svg.axis()
        .scale(xScaleM)
        .orient('bottom');


    svgM.selectAll(".gggg").remove();

    var groupss = svgM.selectAll('#ggggg')
        .data(dataset)
        .enter()
        .append('g')
        .attr('class', 'gggg')
        .style('fill', function (d, i) {
            return colors2[i];
        });

    groupss.selectAll('#mybars')
        .data(function (d) {
            return d;
        })
        .enter()
        .append('rect')
        .transition()
        .delay(function (d, i) {
            return i / dataset.length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .attr('x', function (d) {
            return xScaleM(d.x0);
        })
        .attr('y', function (d, i) {
            return yScaleM(d.y);
        })
        .attr('height', function (d) {
            return yScaleM.rangeBand();
        })
        .attr('width', function (d) {
            return xScaleM(d.x);
        })
    ;

    svgM.selectAll("g.y.axis")
        .transition()
        .delay(function (d, i) {
            return i / dataset.length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .style("font-size", "15px")
        .style("color", "black")
        .call(yAxis);

    svgM.selectAll("g.x.axis")
        .transition()
        .delay(function (d, i) {
            return i / dataset.length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .attr('transform', 'translate(0,' + heightM + ')')
        .call(xAxis);


    elm.remove();
    el.remove();
}