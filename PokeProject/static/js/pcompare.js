/**
 * Created by carmichael on 2017-03-06.
 */

function showPokemon() {
        var selectPoke = document.getElementById("tags").value;
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

                $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
                $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + id + '.png');

                document.getElementById('pokedex').innerHTML = pokemons[0]['id'];
                document.getElementById('singleLegend').innerHTML = pokemons[0]['is_legendary'];
                document.getElementById('singleCatch').innerHTML = pokemons[0]['catch_rate'] + '%';
                document.getElementById('singleBStyle').innerHTML = pokemons[0]['body_style'];
                document.getElementById('singleGen').innerHTML = pokemons[0]['generation'];

                document.getElementById('singleGen').innerHTML = pokemons[0]['generation'];

                $("#singleType  span").remove();
                addType(pokemons[0]['type_1']);
                addType(pokemons[0]['type_2']);


                for (var key in pokemons[0]) {
                    var value = pokemons[0][key];
                    // Use `key` and `value`
                    if (unwantedFirst.includes(key) != true) {
                        dict.push({
                            stat: key,
                            value: value
                        });
                    }
                }

                var data1 = seperateValues(pokemons, unwantedFirst);
                var data2 = seperateValues(pokemons, unwantedSecond);
                seperateValues(pokemons, unwantedSecond);

                $("#singleChart  svg").remove();
                createDefaultGraphs("#singleChart", data1);
                $("#singleChart2  svg").remove();
                createDefaultGraphs("#singleChart2", data2);

                document.getElementById("checkNormal").checked = true;
                document.getElementById("checkBar").checked = true;
            },
            failure: function(pokemons) {
                alert('Got an error dude');
            }
            });
        }

}

function seperateValues(pokemons, unwanted){
    var dict = [];
    for (var key in pokemons[0]) {
        var value = pokemons[0][key];
        // Use `key` and `value`
        if (unwanted.includes(key) != true) {
            dict.push({
                stat: key,
                value: value
            });
        }
    }
    return dict
}

function addType(type){

    var elem = document.getElementById('singleType');


    switch(type) {
        case 'Fire':
            elem.innerHTML += '<span class="badge fireBadge">Fire</span>';
            break;
        case 'Water':
            elem.innerHTML += '<span class="badge waterBadge">Water</span>';
            break;
        case 'Grass':
            elem.innerHTML += '<span class="badge grassBadge">Grass</span>';
            break;
        case 'Fighting':
            elem.innerHTML += '<span class="badge fightingBadge">Fighting</span>';
            break;
        case 'Steel':
            elem.innerHTML += '<span class="badge steelBadge">Steel</span>';
            break;
        case 'Electric':
            elem.innerHTML += '<span class="badge electricBadge">Electric</span>';
            break;
        case 'Ice':
            elem.innerHTML += '<span class="badge iceBadge">Ice</span>';
            break;
        case 'Normal':
            elem.innerHTML += '<span class="badge normalBadge">Normal</span>';
            break;
        case 'Bug':
            elem.innerHTML += '<span class="badge bugBadge">Bug</span>';
            break;
        case 'Dragon':
            elem.innerHTML += '<span class="badge dragonBadge">Dragon</span>';
            break;
        case 'Psychic':
            elem.innerHTML += '<span class="badge psychicBadge">Psychic</span>';
            break;
        case 'Ghost':
            elem.innerHTML += '<span class="badge ghostBadge">Ghost</span>';
            break;
        case 'Poison':
            elem.innerHTML += '<span class="badge poisonBadge">Poison</span>';
            break;
        case 'Fariy':
            elem.innerHTML += '<span class="badge fariyBadge">Fairy</span>';
            break;
        case 'Dark':
            elem.innerHTML += '<span class="badge darkBadge">Dark</span>';
            break;
        case 'Rock':
            elem.innerHTML += '<span class="badge rockBadge">Rock</span>';
            break;
        default:
            break;
    }
}


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


function addB(){
    var pokeName = document.getElementById("addPoke").value;
    var elem = document.getElementById('pokeBadges');
    var amount = document.getElementsByClassName('label-success');

    if (amount.length < 12) {
        elem.innerHTML += '<span class="label label-success">' + pokeName + '<a name="' + pokeName + '" class="remove" onclick="remove(this)"> <span class="glyphicon glyphicon-remove-circle" style="color: white"></span></a></span> ';
    }
}

function remove(elm){
    var el = elm.parentNode;
    var name = elm.name;
    console.log(name);
    elm.remove();
    el.remove();
}

// Default states
// Multi
var dict = [];

var width = 880, height = 680;
var margin = {top: 20, right: 20, bottom: 30, left: 80};

//x and y Scales
var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var yScale = d3.scale.linear()
    .range([height, 0]);

xScale.domain(dict.map(function(d) { return d.stat; }));
yScale.domain([0, d3.max(dict, function(d) { return d.value; })]);

//x and y Axes
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10, "%");

//create svg container
var svg = d3.select("#multiChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//create bars
svg.selectAll(".bar")
    .data(dict)
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
    .style("font-size","13px")
    .call(xAxis);

//drawing the y axis on svg
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("font-size","13px")
    .style("text-anchor", "end");


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

    $( "#poke1" ).autocomplete({
      source: pokemonNames
    });

    $( "#poke2" ).autocomplete({
      source: pokemonNames
    });

    $( "#addPoke" ).autocomplete({
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

createDefaultGraphs("#singleChart", []);
createDefaultGraphs("#singleChart2", []);

function createDefaultGraphs(id, data){
    // Have default empty table for compare screen
    var dict = [];

    var width = 350, height = 480;
    var margin = {top: 20, right: 20, bottom: 60, left: 40};

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
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
        .style("font-size","13px")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");

    //drawing the y axis on svg
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("font-size","13px")
        .style("text-anchor", "end");
}
