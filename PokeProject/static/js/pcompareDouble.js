/**
 * Created by carmichael on 2017-03-08.
 */

function addPokeOneDouble() {
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

                $("#frontImgDouble").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
                //$("#backImgDouble").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + id + '.png');

                document.getElementById('pokedexDouble').innerHTML = pokemons[0]['id'];
                if (pokemons[0]['is_legendary'] == "TRUE") {
                    document.getElementById('singleLegendDouble').innerHTML = 'Yes';
                } else {
                    document.getElementById('singleLegendDouble').innerHTML = 'No';
                }
                document.getElementById('singleCatchDouble').innerHTML = pokemons[0]['catch_rate'] + '%';
                document.getElementById('singleBStyleDouble').innerHTML = pokemons[0]['body_style'];
                document.getElementById('singleGenDouble').innerHTML = pokemons[0]['generation'];

                document.getElementById('singleGenDouble').innerHTML = pokemons[0]['generation'];

                $("#singleTypeDouble  span").remove();
                addType(pokemons[0]['type_1'], "singleTypeDouble");
                addType(pokemons[0]['type_2'], "singleTypeDouble");


                var data1 = getValuesForReg(pokemons, unwantedFirst);
                var data2 = getValuesForDerived(pokemons, unwantedSecond);


                createDefaultDouble("#dChart", data1);



                document.getElementById("checkNormal").checked = true;
                document.getElementById("checkBarDouble").checked = true;
            },
            failure: function(pokemons) {
                alert('Got an error dude');
            }
            });
        }


}

function addPokeTwoDouble() {
        var selectPoke = document.getElementById("poke2").value;


        if (selectPoke != ""){
            $.ajax({
            type: "GET",
            url: 'ajax/get_single_pokemon/', //the script to call to get data
            data: {"name": selectPoke},
            dataType: 'JSON',                //data format
            success: function(pokemons) {
                console.log(pokemons);
                var unwantedFirst = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                                'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                                'phys_sweeper', 'sp_sweeper', 'wall', 'phys_tank', 'sp_tank'];
                var unwantedSecond = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                                'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                                'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
                var id = pokemons[0]['id'];

                //$("#frontImgDouble").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
                $("#backImgDouble").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');

                document.getElementById('pokedexDouble2').innerHTML = pokemons[0]['id'];
                if (pokemons[0]['is_legendary'] == "TRUE") {
                    document.getElementById('singleLegendDouble2').innerHTML = 'Yes';
                } else {
                    document.getElementById('singleLegendDouble2').innerHTML = 'No';
                }

                document.getElementById('singleCatchDouble2').innerHTML = pokemons[0]['catch_rate'] + '%';
                document.getElementById('singleBStyleDouble2').innerHTML = pokemons[0]['body_style'];
                document.getElementById('singleGenDouble2').innerHTML = pokemons[0]['generation'];

                document.getElementById('singleGenDouble2').innerHTML = pokemons[0]['generation'];

                $("#singleTypeDouble2  span").remove();
                addType(pokemons[0]['type_1'], "singleTypeDouble2");
                addType(pokemons[0]['type_2'], "singleTypeDouble2");


                var data1 = getValuesForReg(pokemons, unwantedFirst);
                var data2 = getValuesForDerived(pokemons, unwantedSecond);


                createDefaultDouble("#dChart2", data1);



                document.getElementById("checkNormal").checked = true;
                document.getElementById("checkBarDouble").checked = true;
            },
            failure: function(pokemons) {
                alert('Got an error dude');
            }
            });
        }

}

createDefaultDouble("#dChart", []);
createDefaultDouble("#dChart2", []);

function createDefaultDouble(id, data){
    // Have default empty table for compare screen
    var dict = [];

    var width = 350, height = 350;
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
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll(".bar").remove();

    //create bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
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
        .call(yAxis)
        .append("text")
        .style("font-size","14px")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");




}