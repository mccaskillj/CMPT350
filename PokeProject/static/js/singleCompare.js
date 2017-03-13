/**
 * Created by carmichael on 2017-03-13.
 */
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

drawGraphs("#sChart", "test", inital, 350, 480);
drawGraphs("#sChart2", "test", inital, 350, 480);


function singleLookup() {
        var selectPoke = document.getElementById("tags").value;
        //console.log(selectPoke);


        if (selectPoke != ""){

            d3.selectAll("#test").remove();

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

                drawGraphs("#sChart", "test", data1, 350, 480);
                drawGraphs("#sChart2", "test", data2, 350, 480);



                document.getElementById("checkNormal").checked = true;
                document.getElementById("checkBar").checked = true;
            },
            failure: function(pokemons) {
                alert('Got an error dude');
            }
            });
        }
}

function drawGraphs(id, id2, data, w, h){
    // Have default empty table for compare screen
    var width = w, height = h;
    var margin = {top: 20, right: 20, bottom: 80, left: 40};

    //x and y Scales
    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var yScale = d3.scale.linear()
        .range([height, 0]);

    xScale.domain(data.map(function(d) { return d.stat; }));
    yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

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
        .attr("id", id2)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //create bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .transition()
        .delay(function (d, i) {
            return i / data.length * 2000;   // <-- Where the magic happens
        })
        .duration(1500)
        .attr("class", "bar")
        .attr("fill", "#90caf9")
        .attr("x", function(d) { return xScale(d.stat); })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) { return yScale(d.value); })
        .attr("height", function(d) { return height - yScale(d.value); });

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

}