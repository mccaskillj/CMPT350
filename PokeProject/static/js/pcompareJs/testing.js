/**
 * Created by carmichael on 2017-03-17.
 */
function getValuesForReg(pokemons){
    var dict = [];

    dict.push({
                stat: 'Hp',
                value: pokemons[0]['hp'],
                info: 'Hp'
            });
    dict.push({
                stat: 'Attack',
                value: pokemons[0]['attack'],
                info: 'Attack'
            });
    dict.push({
                stat: 'Sp. Attack',
                value: pokemons[0]['sp_attack'],
                info: 'Sp. Attack'
            });
    dict.push({
                stat: 'Defense',
                value: pokemons[0]['defense'],
                info: 'Defense'
            });
    dict.push({
                stat: 'Sp. Defense',
                value: pokemons[0]['sp_defense'],
                info: 'Sp. Defense'
            });
    dict.push({
                stat: 'Speed',
                value: pokemons[0]['speed'],
                info: 'Speed'
            });
    return dict;
}

function getValuesForDerived(pokemons){
    var dict = [];

    dict.push({
                stat: 'Wall',
                value: pokemons[0]['wall'],
                info: 'Wall'
            });
    dict.push({
                stat: 'Phys. Tank',
                value: pokemons[0]['phys_tank'],
                info: 'Phys. Tank'
            });
    dict.push({
                stat: 'Sp. Tank',
                value: pokemons[0]['sp_tank'],
                info: 'Sp. Tank'
            });
    dict.push({
                stat: 'Phys. Sweeper',
                value: pokemons[0]['phys_sweeper'],
                info: 'Phys. Sweeper'
            });
    dict.push({
                stat: 'Sp. Sweeper',
                value: pokemons[0]['sp_sweeper'],
                info: 'Sp. Sweeper'
            });

    return dict;
}

$("#tags").keyup(function(event){
    if(event.keyCode == 13){
        $("#sb").click();
    }
});


function checkPoke(pokename){
    var poke = 0;

    $.ajax({
         type: "GET",
         url: 'ajax/exists', //the script to call to get data
         data: {"name": pokename},
         dataType: 'JSON',                //data format
         success: function(pokemons) {
            console.log("pokes: ");
             console.log(pokemons);

         },
         failure: function(pokemons) {
             alert('Got an error dude');
         }
     });
    return poke;
}

    var inital = [{
                stat: 'Hp',
                value: 30,
                info: 'Hp: Pokemons Health'
            },{
                stat: 'Attack',
                value: 70,
                info: 'Hp: Pokemons Health'
            },{
                stat: 'Sp. Attack',
                value: 90,
                info: 'Hp: Pokemons Health'
            },{
                stat: 'Defense',
                value: 160,
                info: 'Hp: Pokemons Health'
            },{
                stat: 'Sp. Defense',
                value: 250,
                info: 'Hp: Pokemons Health'
            },{
                stat: 'Speed',
                value: 190,
                info: 'speed'
            }
];

var inital2 = [{
                stat: 'Wall',
                value: 0
            },{
                stat: 'Phys. Tank',
                value: 0
            },{
                stat: 'Sp. Tank',
                value: 0
            },{
                stat: 'Phys. Sweeper',
                value: 0
            },{
                stat: 'Sp. Sweeper',
                value: 0
            }
];

    var width = 350, height = 480;
    var margin = {top: 20, right: 20, bottom: 80, left: 40};

    //x and y Scales
    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var yScale = d3.scale.linear()
        .range([height, 0]);

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
    var svg = d3.select("#svg1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    //create bars for svg 1
    svg.selectAll(".bar")
        .data(inital)
        .enter()
        .append("rect")
        .attr("id", "d1")
        .attr("class", "bar")
        .attr("fill", "#90caf9")
        .attr("x", function(d) { return xScale(d.stat); })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) { return yScale(d.value); })
        .attr("height", function(d) { return height - yScale(d.value); })
        .on("mouseover", function(d) {
					//Get this bar's x/y values, then augment for the tooltip
					var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
					var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2 + 534;
					//Update the tooltip position and value
					d3.select("#tooltip")
						.style("left", xPosition + "px")
						.style("top", yPosition + "px")
						.select("#value")
						.text(d.value);

					d3.select("#tooltip")
                        .select("#header")
                        .text(d.info);

					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);
			   })
        .on("mouseout", function() {

					//Hide the tooltip
					d3.select("#tooltip").classed("hidden", true);

			   });

    //drawing the x axis on svg
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .style("font-size","15px")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");

    //drawing the y axis on svg
    svg.append("g")
        .attr("class", "y axis")
        .style("font-size","15px")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    // svg 2
    xScale.domain(inital2.map(function(d) { return d.stat; }));

    //create svg container
    var svg2 = d3.select("#svg2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //create bars for
    svg2.selectAll(".bar")
        .data(inital2)
        .enter()
        .append("rect")
        .attr("id", "d2")
        .attr("class", "bar")
        .attr("fill", "#90caf9")
        .attr("x", function(d) { return xScale(d.stat); })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) { return yScale(d.value); })
        .attr("height", function(d) { return height - yScale(d.value); })
        .on("mouseover", function(d) {
					//Get this bar's x/y values, then augment for the tooltip
					var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2 +550;
					var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2 + 534;
					//Update the tooltip position and value
					d3.select("#tooltip")
						.style("left", xPosition + "px")
						.style("top", yPosition + "px")
						.select("#value")
						.text(d.value);

					d3.select("#tooltip")
                        .select("#header")
                        .text(d.info);

					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);
			   })
        .on("mouseout", function() {

					//Hide the tooltip
					d3.select("#tooltip").classed("hidden", true);

			   });

    //drawing the x axis on svg
    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .style("font-size","15px")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");

    //drawing the y axis on svg
    svg2.append("g")
        .attr("class", "y axis")
        .style("font-size","15px")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");


    //On click, update with new data
    d3.select("#sb")
        .on("click", function() {

            var selectPoke = document.getElementById("tags").value;

            if (checkPoke(selectPoke) == 0) {
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

                        document.getElementById('pokedex').innerHTML = pokemons[0]['id'];
                        document.getElementById('singleLegend').innerHTML = pokemons[0]['is_legendary'];
                        document.getElementById('singleCatch').innerHTML = pokemons[0]['catch_rate'] + '%';
                        document.getElementById('singleBStyle').innerHTML = pokemons[0]['body_style'];
                        document.getElementById('singleGen').innerHTML = pokemons[0]['generation'];

                        document.getElementById('singleGen').innerHTML = pokemons[0]['generation'];

                        $("#singleType  span").remove();
                        addType(pokemons[0]['type_1'], 'singleType');
                        addType(pokemons[0]['type_2'], 'singleType');


                        var data1 = getValuesForReg(pokemons, unwantedFirst);
                        var data2 = getValuesForDerived(pokemons, unwantedSecond);

                        console.log(data1);
                        console.log(data2);

                        yScale.domain([0, 255]);
                        xScale.domain(data1.map(function(d) { return d.stat; }));

                        //Update all rects
                        svg.selectAll("#d1")
                            .data(data1)
                            .transition()
                            .delay(function (d, i) {
                                return i / data1.length * 10;   // <-- Where the magic happens
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
                                return height - yScale(d.value);
                            });

                        xScale.domain(data2.map(function(d) { return d.stat; }));

                        //Update all rects
                        svg2.selectAll("#d2")
                            .data(data2)
                            .transition()
                            .delay(function (d, i) {
                                return i / data2.length * 10;   // <-- Where the magic happens
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
                                return height - yScale(d.value);
                            });

                        document.getElementById("checkNormal").checked = true;
                        document.getElementById("checkBar").checked = true;

                    },
                    failure: function (pokemons) {
                        alert('Got an error dude');
                    }
                });
            }
        });