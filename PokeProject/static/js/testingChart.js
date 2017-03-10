/**
 * Created by carmichael on 2017-03-09.
 */

$( function() {
    var pokemonNames = [];

    $.ajax({
        type: "GET",
        url: 'ajax/get_pokemon/', //the script to call to get data
        dataType: 'JSON',                //data format
        success: function(pokemons) {
            for(var i = 0; i < pokemons.length; i++) {
                pokemonNames.push(pokemons[i]['name'])
            }

        },
        failure: function(pokemons) {
            alert('Got an error dude');
        }
    });

    $( "#tags" ).autocomplete({
      source: pokemonNames
    });
} );

$('#shinny').on("click",function(){
    var id = document.getElementById('pokedex').innerHTML;
    $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/' + id + '.png');
    $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/' + id + '.png');
});

$('#normal').on("click",function(){
    var id = document.getElementById('pokedex').innerHTML;
    $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
    $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + id + '.png');
});

// Add listener for enter key press
$("#tags").keyup(function(event){
    if(event.keyCode == 13){
        $("#sb").click();
    }
});


function openCity(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function getValuesForReg(pokemons){
    var dict = [];

    dict.push({
                stat: 'Hp',
                value: pokemons[0]['hp']
            });
    dict.push({
                stat: 'Attack',
                value: pokemons[0]['attack']
            });
    dict.push({
                stat: 'Sp. Attack',
                value: pokemons[0]['sp_attack']
            });
    dict.push({
                stat: 'Defense',
                value: pokemons[0]['defense']
            });
    dict.push({
                stat: 'Sp. Defense',
                value: pokemons[0]['sp_defense']
            });
    dict.push({
                stat: 'Speed',
                value: pokemons[0]['speed']
            });
    return dict;
}

function getValuesForDerived(pokemons){
    var dict = [];

    dict.push({
                stat: 'Wall',
                value: pokemons[0]['wall']
            });
    dict.push({
                stat: 'Phys. Tank',
                value: pokemons[0]['phys_tank']
            });
    dict.push({
                stat: 'Sp. Tank',
                value: pokemons[0]['sp_tank']
            });
    dict.push({
                stat: 'Phys. Sweeper',
                value: pokemons[0]['phys_sweeper']
            });
    dict.push({
                stat: 'Sp. Sweeper',
                value: pokemons[0]['sp_sweeper']
            });

    return dict;
}

// below are d3

var inital = [{
                stat: 'Hp',
                value: 0
            },{
                stat: 'Attack',
                value: 0
            },{
                stat: 'Sp. Attack',
                value: 0
            },{
                stat: 'Defense',
                value: 0
            },{
                stat: 'Sp. Defense',
                value: 0
            },{
                stat: 'Speed',
                value: 0
            }
];

test();

function test(id) {
// Have default empty table for compare screen
    var width = 350, height = 480;
    var margin = {top: 20, right: 20, bottom: 80, left: 40};

    //x and y Scales
    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var yScale = d3.scale.linear()
        .range([height, 0]);

    xScale.domain(inital.map(function (d) {
        return d.stat;
    }));
    yScale.domain([0, d3.max(inital, function (d) {
        return d.value;
    })]);

    //x and y Axes
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(10, "%");

    //create svg container
    var svg = d3.select(id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var bar = svg.selectAll(".bar");

    //create bars
    svg.selectAll(".bar")
        .data(inital)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", "#90caf9")
        .attr("x", function (d) {
            return xScale(d.stat);
        })
        .attr("width", xScale.rangeBand())
        .attr("y", function (d) {
            return yScale(d.value);
        })
        .attr("height", function (d) {
            return height - yScale(d.value);
        });

    //drawing the x axis on svg
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .style("font-size", "15px")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");

    //drawing the y axis on svg
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .style("font-size", "14px")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");


    $("#sb").click(function () {

        var selectPoke = document.getElementById("tags").value;
        //console.log(selectPoke);

        if (selectPoke != "") {
            d3.select("#test").remove();

            $.ajax({
                type: "GET",
                url: 'ajax/get_single_pokemon/', //the script to call to get data
                data: {"name": selectPoke},
                dataType: 'JSON',                //data format
                success: function (pokemons) {
                    var unwantedFirst = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                        'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                        'phys_sweeper', 'sp_sweeper', 'wall', 'phys_tank', 'sp_tank'];
                    var unwantedSecond = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                        'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                        'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
                    var id = pokemons[0]['id'];

                    $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
                    $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + id + '.png');

                    var data = getValuesForReg(pokemons, unwantedFirst);
                    var data2 = getValuesForDerived(pokemons, unwantedSecond);

                    console.log(data);

                    // createDefaultGraphs("#sChart", data1);

                    // d3 before


                    xScale.domain(data.map(function (d) {
                        return d.stat;
                    }));
                    yScale.domain([0, d3.max(data, function (d) {
                        return d.value;
                    })]);


                    //create svg container
                    var svg = d3.select("#sChart")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("id", "test")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    //create bars
                    var bar = svg.selectAll("rect")
                        .data(data)
                        .enter()
                        .append("rect")
                        .transition()
                        .delay(function (d, i) {
                            return i / data.length * 1000;   // <-- Where the magic happens
                        })
                        .duration(1000)
                        .ease("bounce")
                        .attr("class", "bar")
                        .attr("fill", "#90caf9")
                        .attr("x", function (d) {
                            return xScale(d.stat);
                        })
                        .attr("width", xScale.rangeBand())
                        .attr("y", function (d) {
                            return yScale(d.value);
                        })
                        .attr("height", function (d) {
                            return height - yScale(d.value);
                        });

                    //drawing the x axis on svg
                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .style("font-size", "15px")
                        .call(xAxis)
                        .selectAll("text")
                        .attr("transform", "rotate(-30)")
                        .style("text-anchor", "end");

                    //drawing the y axis on svg
                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .style("font-size", "14px")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end");


                    // Number two
                    xScale.domain(data2.map(function (d) {
                        return d.stat;
                    }));
                    yScale.domain([0, d3.max(data2, function (d) {
                        return d.value;
                    })]);


                    //create svg container
                    svg = d3.select("#sChart2")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("id", "test")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    //create bars
                    bar = svg.selectAll("rect")
                        .data(data)
                        .enter()
                        .append("rect")
                        .transition()
                        .delay(function (d, i) {
                            return i / data.length * 1000;   // <-- Where the magic happens
                        })
                        .duration(1000)
                        .ease("bounce")
                        .attr("class", "bar")
                        .attr("fill", "#90caf9")
                        .attr("x", function (d) {
                            return xScale(d.stat);
                        })
                        .attr("width", xScale.rangeBand())
                        .attr("y", function (d) {
                            return yScale(d.value);
                        })
                        .attr("height", function (d) {
                            return height - yScale(d.value);
                        });

                    //drawing the x axis on svg
                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .style("font-size", "15px")
                        .call(xAxis)
                        .selectAll("text")
                        .attr("transform", "rotate(-30)")
                        .style("text-anchor", "end");

                    //drawing the y axis on svg
                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .style("font-size", "14px")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end");

                },
                failure: function (pokemons) {
                    alert('Got an error dude');
                }
            });
        }
    });
}