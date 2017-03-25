/**
 * Created by carmichael on 2017-03-13.
 */
function addPokeOneMU() {
    var selectPoke = document.getElementById("poke1").value;
        console.log(selectPoke);

        if (selectPoke != ""){
            $.ajax({
            type: "GET",
            url: 'ajax/get_single_pokemon/', //the script to call to get data
            data: {"name": selectPoke},
            dataType: 'JSON',                //data format
            success: function(pokemons) {
                var unwantedFirst = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                                'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                                'phys_sweeper', 'sp_sweeper', 'wall', 'phys_tank', 'sp_tank'];
                var unwantedSecond = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                                'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                                'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
                var id = pokemons[0]['id'];




            },
            failure: function(pokemons) {
                alert('Got an error dude');
            }
            });
        }
}

function addB(){
    var pokeName = document.getElementById("addPoke").value;
    var elem = document.getElementById('pokeBadges');
    var amount = document.getElementsByClassName('label-success');

    if (amount.length < 12) {
        elem.innerHTML += '<span class="label label-success">' + pokeName + '<a name="' + pokeName + '" class="remove" onclick="remove(this)"> <span class="glyphicon glyphicon-remove-circle" style="color: white"></span></a></span> ';

        $.ajax({
            type: "GET",
            url: 'ajax/get_single_pokemon/', //the script to call to get data
            data: {"name": pokeName},
            dataType: 'JSON',                //data format
            success: function(pokemons) {
                console.log(pokemons);


                var regData = getValuesForReg(pokemons);
                var derivedData = getValuesForDerived(pokemons);

                console.log(regData);
                console.log(derivedData);

                var dataset = [];

                dict.push({
                    data: { name: "Charmander",
                            hp: 0,
                            attack: 1,
                            sp_attack: 2,
                            defense: 3,
                            sp_defense: 4,
                            speed: 5
                    }
                });

                // dataset = [{
                //             data: [{
                //                 month: 'Aug',
                //                 count: 123
                //             }, {
                //                 month: 'Sep',
                //                 count: 234
                //             }, {
                //                 month: 'Oct',
                //                 count: 345
                //             }],
                //             name: 'Series #1'
                //         }, {
                //             data: [{
                //                 month: 'Aug',
                //                 count: 235
                //             }, {
                //                 month: 'Sep',
                //                 count: 267
                //             }, {
                //                 month: 'Oct',
                //                 count: 573
                //             }],
                //             name: 'Series #2'
                //         }


            },
            failure: function(pokemons) {
                alert('Got an error dude');
            }
            });
    }
}

function remove(elm){
    var el = elm.parentNode;
    var name = elm.name;
    console.log(name);
    elm.remove();
    el.remove();
}

//-----------------------------------------------------/

// Multi
var data = [
  { name: "Charmander", Hp: "4", Attack: "10", Defense: "15", "Sp. Attack": "9", "Sp. Defense": "6", Speed: "4" },
  { name: "Weedle",     Hp: "7", Attack: "12", Defense: "18", "Sp. Attack": "9", "Sp. Defense": "4", Speed: "8" },
  { name: "Wigglytuff", Hp: "3", Attack: "05", Defense: "20", "Sp. Attack": "8", "Sp. Defense": "2", Speed: "2" },
  { name: "Meowth",     Hp: "1", Attack: "01", Defense: "15", "Sp. Attack": "5", "Sp. Defense": "4", Speed: "9" },
  { name: "Growlithe",  Hp: "8", Attack: "02", Defense: "10", "Sp. Attack": "4", "Sp. Defense": "2", Speed: "5" },
  { name: "Graveler",   Hp: "9", Attack: "03", Defense: "12", "Sp. Attack": "6", "Sp. Defense": "3", Speed: "6" },
  { name: "Tranquill",  Hp: "5", Attack: "04", Defense: "15", "Sp. Attack": "8", "Sp. Defense": "1", Speed: "3" },
  { name: "Golduck",    Hp: "7", Attack: "06", Defense: "11", "Sp. Attack": "9", "Sp. Defense": "4", Speed: "7" },
  { name: "Krabby",     Hp: "4", Attack: "10", Defense: "13", "Sp. Attack": "9", "Sp. Defense": "5", Speed: "3" },
  { name: "Pidgeot",    Hp: "10",Attack: "16", Defense: "19", "Sp. Attack": "6", "Sp. Defense": "9", Speed: "5" },
  { name: "Pikachu",    Hp: "2", Attack: "19", Defense: "17", "Sp. Attack": "5", "Sp. Defense": "7", Speed: "4" },
    { name: "Paras",    Hp: "6", Attack: "22", Defense: "18", "Sp. Attack": "6", "Sp. Defense": "3", Speed: "3" },
    { name: "Blastoise",    Hp: "8", Attack: "14", Defense: "16", "Sp. Attack": "2", "Sp. Defense": "5", Speed: "6" },
    { name: "Sandshrew",    Hp: "4", Attack: "11", Defense: "13", "Sp. Attack": "9", "Sp. Defense": "2", Speed: "8" }
];

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
        .style('fill', function (d, i) {
        return colors2[i];
    });

groups.selectAll('rect')
        .data(function (d) {return d;})
        .enter()
        .append('rect')
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

        console.log("hi");
        data.push({ name: "Swoobat",    Hp: "7", Attack: "3", Defense: "9", "Sp. Attack": "4", "Sp. Defense": "7", Speed: "3" });			 			 		//Add new number to array

        // Transpose the data into layers
        var dataset = d3.layout.stack()(items.map(function(fruit) {
          return data.map(function(d, i) {
            return {x: d.name,
                    y: +d[fruit],
                    z: items[0]};
          });
        }));

        d3.layout.stack()(dataset);

        console.log(dataset);
        xMax = d3.max(dataset, function (group) {
                var groupMax = d3.max(group, function (d) {
                    return d.x + d.x0;
                });
                return groupMax;
            });

        groups = svgM.selectAll('g')
                        .data(dataset)
                        .enter()
                        .append('g')
                        .style('fill', function (d, i) {
                        return colors2[i];
                    });

        groups.selectAll('rect')
                .data(function (d) {return d;})
                .enter()
                .append('rect')
                .attr('x', function (d) {
                    return xScale(d.x0);
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



        console.log("bye");


    });