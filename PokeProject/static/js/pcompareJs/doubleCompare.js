/**
 * Created by carmichael on 2017-03-13.
 */
var doublePokeDataOne = [];
var doublePokeDataTwo = [];

var w = 440, h = 430;
var margin = {top: 20, right: 20, bottom: 80, left: 40};

//x and y Scales
var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, w], .1);

var yScale = d3.scale.linear()
    .range([h, 0]);

xScale.domain(inital.map(function(d) { return d.stat; }));
yScale.domain([0, 255]);

//x and y Axes
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10, "%");

//create svg container
var doublesvg = d3.select("#doubleChart")
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//create bars for svg 1
doublesvg.selectAll(".bar")
    .data(inital)
    .enter()
    .append("rect")
    .attr("id", "double")
    .attr("class", "bar")
    .attr("fill", "#90caf9")
    .attr("x", function(d) { return xScale(d.stat); })
    .attr("width", xScale.rangeBand())
    .attr("y", function(d) { return yScale(d.value); })
    .attr("height", function(d) { return h - yScale(d.value); })
    .on("mouseover", function(d) {
                //Get this bar's x/y values, then augment for the tooltip
                var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
                var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 3 + 934;
                //Update the tooltip position and value
                d3.select("#tooltip2")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d.value);

                d3.select("#tooltip2")
                    .select("#header")
                    .text(d.info);

                //Show the tooltip
                d3.select("#tooltip2").classed("hidden", false);
           })
    .on("mouseout", function() {

                //Hide the tooltip
                d3.select("#tooltip2").classed("hidden", true);

           });

//drawing the x axis on svg
doublesvg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .style("font-size","15px")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-30)")
    .style("text-anchor", "end");

//drawing the y axis on svg
doublesvg.append("g")
    .attr("class", "y axis")
    .style("font-size","15px")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

//On click, update with new data
d3.select("#doubleClick")
    .on("click", function() {

        var selectPoke = document.getElementById("poke1").value;

        $.ajax({
            type: "GET",
            url: 'ajax/get_single_pokemon/', //the script to call to get data
            data: {"name": selectPoke},
            dataType: 'JSON',                //data format
            success: function (pokemons) {
                if (pokemons[0]['exist'] == 0) {
                    var unwantedFirst = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                        'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                        'phys_sweeper', 'sp_sweeper', 'wall', 'phys_tank', 'sp_tank'];
                    var unwantedSecond = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                        'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                        'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];

                    var id = pokemons[0]['id'];

                    $("#frontImgDouble").attr('src', frontPath + id + '.png');

                    document.getElementById('pokedexDouble').innerHTML = pokemons[0]['id'];
                    if (pokemons[0]['is_legendary'] == "TRUE") {
                        document.getElementById('singleLegendDouble').innerHTML = 'Yes';
                    } else {
                        document.getElementById('singleLegendDouble').innerHTML = 'No';
                    }
                    document.getElementById('singleCatchDouble').innerHTML = pokemons[0]['catch_rate'] + '%';
                    document.getElementById('singleBStyleDouble').innerHTML = pokemons[0]['body_style'];
                    document.getElementById('singleGenDouble').innerHTML = pokemons[0]['generation'];
                    document.getElementById('dPoke').innerHTML = selectPoke;

                    $("#singleTypeDouble  span").remove();
                    addType(pokemons[0]['type_1'], "singleTypeDouble");
                    addType(pokemons[0]['type_2'], "singleTypeDouble");

                    var data1 = getValuesForReg(pokemons, unwantedFirst);
                    var data2 = getValuesForDerived(pokemons, unwantedSecond);

                    doublePokeDataOne = [];
                    doublePokeDataOne.push(data1);
                    doublePokeDataOne.push(data2);

                    var xScale = d3.scale.ordinal()
                        .rangeRoundBands([0, w], .1);

                    var yScale = d3.scale.linear()
                        .range([h, 0]);

                    yScale.domain([0, 255]);
                    xScale.domain(doublePokeDataOne[0].map(function (d) {
                        return d.stat;
                    }));

                    //Update all rects

                    doublesvg.selectAll("#double")
                            .data(doublePokeDataOne[0])
                            .transition()
                            .delay(function (d, i) {
                                return i / doublePokeDataOne[0].length * 10;   // <-- Where the magic happens
                            })
                            .duration(1000)
                            .attr("fill", "#90caf9")
                            .attr("x", function (d) {
                                return xScale(d.stat);
                            })
                            .attr("width", xScale.rangeBand())
                            .attr("y", function (d) {
                                return yScale(d.value);
                            })
                            .attr("height", function (d) {
                                return h - yScale(d.value);
                            });

                    document.getElementById("checkNormal").checked = true;
                    document.getElementById("checkBarDouble").checked = true;
                    document.getElementById("checkNormalD").checked = true;
                }
                else{
                    alert("Pokemon Does not exist")
                }
            },
            failure: function (pokemons) {
                alert('Got an error dude');
            }
        });
    });

//create svg container
var doublesvg2 = d3.select("#doubleChart2")
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//create bars for svg 1
doublesvg2.selectAll(".bar")
    .data(inital)
    .enter()
    .append("rect")
    .attr("id", "double2")
    .attr("class", "bar")
    .attr("fill", "#90caf9")
    .attr("x", function(d) { return xScale(d.stat); })
    .attr("width", xScale.rangeBand())
    .attr("y", function(d) { return yScale(d.value); })
    .attr("height", function(d) { return h - yScale(d.value); })
    .on("mouseover", function(d) {
                //Get this bar's x/y values, then augment for the tooltip
                var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2 + 350;
                var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + 934;
                //Update the tooltip position and value
                d3.select("#tooltip2")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d.value);

                d3.select("#tooltip2")
                    .select("#header")
                    .text(d.info);

                //Show the tooltip
                d3.select("#tooltip2").classed("hidden", false);
           })
    .on("mouseout", function() {

                //Hide the tooltip
                d3.select("#tooltip2").classed("hidden", true);

           });

//drawing the x axis on svg
doublesvg2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .style("font-size","15px")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-30)")
    .style("text-anchor", "end");

//drawing the y axis on svg
doublesvg2.append("g")
    .attr("class", "y axis")
    .style("font-size","15px")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

//On click, update with new data
d3.select("#doubleClick2")
    .on("click", function() {

        var selectPoke = document.getElementById("poke2").value;

            $.ajax({
                type: "GET",
                url: 'ajax/get_single_pokemon/', //the script to call to get data
                data: {"name": selectPoke},
                dataType: 'JSON',                //data format
                success: function (pokemons) {
                    if (pokemons[0]['exist'] == 0) {
                        var unwantedFirst = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                            'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                            'phys_sweeper', 'sp_sweeper', 'wall', 'phys_tank', 'sp_tank'];
                        var unwantedSecond = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                            'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                            'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];

                        var id = pokemons[0]['id'];

                        $("#frontImgDouble2").attr('src', frontPath + id + '.png');

                        document.getElementById('pokedexDouble2').innerHTML = pokemons[0]['id'];
                        if (pokemons[0]['is_legendary'] == "TRUE") {
                            document.getElementById('singleLegendDouble2').innerHTML = 'Yes';
                        } else {
                            document.getElementById('singleLegendDouble2').innerHTML = 'No';
                        }

                        document.getElementById('singleCatchDouble2').innerHTML = pokemons[0]['catch_rate'] + '%';
                        document.getElementById('singleBStyleDouble2').innerHTML = pokemons[0]['body_style'];
                        document.getElementById('singleGenDouble2').innerHTML = pokemons[0]['generation'];

                        document.getElementById('dPoke2').innerHTML = selectPoke;

                        $("#singleTypeDouble2  span").remove();
                        addType(pokemons[0]['type_1'], "singleTypeDouble2");
                        addType(pokemons[0]['type_2'], "singleTypeDouble2");


                        var data1 = getValuesForReg(pokemons, unwantedFirst);
                        var data2 = getValuesForDerived(pokemons, unwantedSecond);

                        doublePokeDataTwo = [];
                        doublePokeDataTwo.push(data1);
                        doublePokeDataTwo.push(data2);


                        var xScale = d3.scale.ordinal()
                            .rangeRoundBands([0, w], .1);

                        var yScale = d3.scale.linear()
                            .range([h, 0]);

                        yScale.domain([0, 255]);
                        xScale.domain(doublePokeDataTwo[0].map(function (d) {
                            return d.stat;
                        }));

                        //Update all rects

                        doublesvg2.selectAll("#double2")
                            .data(doublePokeDataTwo[0])
                            .transition()
                            .delay(function (d, i) {
                                return i / doublePokeDataTwo[0].length * 10;   // <-- Where the magic happens
                            })
                            .duration(1000)
                            .attr("fill", "#90caf9")
                            .attr("x", function (d) {
                                return xScale(d.stat);
                            })
                            .attr("width", xScale.rangeBand())
                            .attr("y", function (d) {
                                return yScale(d.value);
                            })
                            .attr("height", function (d) {
                                return h - yScale(d.value);
                            });

                        document.getElementById("checkNormal").checked = true;
                        document.getElementById("checkBarDouble").checked = true;
                        document.getElementById("checkNormalD").checked = true;
                    }
                    else {
                        alert("Pokemon Does not exist")
                    }
                },
                failure: function (pokemons) {
                    alert('Got an error dude');
                }
            });
    });

$('#normalStatus').on("click",function(){
    xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

    yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10, "%");

    xScale = d3.scale.ordinal()
        .rangeRoundBands([0, w], .1);

    yScale = d3.scale.linear()
        .range([h, 0]);

    yScale.domain([0, 255]);
    xScale.domain(doublePokeDataOne[0].map(function(d) { return d.stat; }));

    //Update all rects

    doublesvg.selectAll("#double")
        .data(doublePokeDataOne[0])
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataOne[0].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .attr("fill", "#90caf9")
        .attr("x", function (d) {
            return xScale(d.stat);
        })
        .attr("width", xScale.rangeBand())
        .attr("y", function (d) {
            return yScale(d.value);
        })
        .attr("height", function (d) {
            return h - yScale(d.value);
        });
    doublesvg.selectAll("g.y.axis")
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataOne[0].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .call(yAxis);

    doublesvg.selectAll("g.x.axis")
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataOne[0].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");

    // Pokemon 2
    xScale = d3.scale.ordinal()
        .rangeRoundBands([0, w], .1);

    yScale = d3.scale.linear()
        .range([h, 0]);

    yScale.domain([0, 255]);
    xScale.domain(doublePokeDataTwo[0].map(function(d) { return d.stat; }));

    //Update all rects

    doublesvg2.selectAll("#double2")
        .data(doublePokeDataTwo[0])
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataTwo[0].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .attr("fill", "#90caf9")
        .attr("x", function (d) {
            return xScale(d.stat);
        })
        .attr("width", xScale.rangeBand())
        .attr("y", function (d) {
            return yScale(d.value);
        })
        .attr("height", function (d) {
            return h - yScale(d.value);
        });
    doublesvg2.selectAll("g.y.axis")
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataTwo[0].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .call(yAxis);

    doublesvg2.selectAll("g.x.axis")
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataTwo[0].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");


});

$('#dreivedStatus').on("click",function(){
    xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

    yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10, "%");

    xScale = d3.scale.ordinal()
        .rangeRoundBands([0, w], .1);

    yScale = d3.scale.linear()
        .range([h, 0]);

    yScale.domain([0, 500]);
    xScale.domain(doublePokeDataOne[1].map(function(d) { return d.stat; }));

    //Update all rects

    doublesvg.selectAll("#double")
        .data(doublePokeDataOne[1])
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataOne[1].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .attr("fill", "#5b2eef")
        .attr("x", function (d) {
            return xScale(d.stat);
        })
        .attr("width", xScale.rangeBand())
        .attr("y", function (d) {
            return yScale(d.value);
        })
        .attr("height", function (d) {
            return h - yScale(d.value);
        });
    doublesvg.selectAll("g.y.axis")
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataOne[1].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .call(yAxis);

    doublesvg.selectAll("g.x.axis")
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataOne[1].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");


    // Pokemon 2

    yScale.domain([0, 500]);
    xScale.domain(doublePokeDataTwo[1].map(function(d) { return d.stat; }));

    //Update all rects

    doublesvg2.selectAll("#double2")
        .data(doublePokeDataTwo[1])
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataTwo[1].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .attr("fill", "#5b2eef")
        .attr("x", function (d) {
            return xScale(d.stat);
        })
        .attr("width", xScale.rangeBand())
        .attr("y", function (d) {
            return yScale(d.value);
        })
        .attr("height", function (d) {
            return h - yScale(d.value);
        });

    doublesvg2.selectAll("g.y.axis")
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataTwo[1].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .call(yAxis);

    doublesvg2.selectAll("g.x.axis")
        .transition()
        .delay(function (d, i) {
            return i / doublePokeDataTwo[1].length * 10;   // <-- Where the magic happens
        })
        .duration(1000)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");
});
