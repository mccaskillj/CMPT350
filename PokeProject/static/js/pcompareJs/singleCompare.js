/**
 * Created by carmichael on 2017-03-13.
 */
var inital = [{
            stat: 'Hp',
            value: 0,
            info: 'Hp: Pokemons Health'
        },{
            stat: 'Attack',
            value: 0,
            info: 'Attack'
        },{
            stat: 'Sp. Attack',
            value: 0,
            info: 'Special Attack'
        },{
            stat: 'Defense',
            value: 0,
            info: 'Defense'
        },{
            stat: 'Sp. Defense',
            value: 0,
            info: 'Special Defense'
        },{
            stat: 'Speed',
            value: 0,
            info: 'Speed'
        }
];

var inital2 = [{
                stat: 'Wall',
                value: 0,
                info: 'Wall = HP + Defense + Sp. Defense'
            },{
                stat: 'Phys. Tank',
                value: 0,
                info: 'Physical Tank = Attack + Defense'
            },{
                stat: 'Sp. Tank',
                value: 0,
                info: 'Special Tank = Sp. Attack + Sp. Defense'
            },{
                stat: 'Phys. Sweeper',
                value: 0,
                info: 'Physical Sweeper = Attack + Speed'
            },{
                stat: 'Sp. Sweeper',
                value: 0,
                info: 'Special Sweeper = Sp. Attack + Speed'
            }
];

var singlePokeData = [];

function checkPoke(pokename){
    var poke = 0;

    $.ajax({
         type: "GET",
         url: 'ajax/exists', //the script to call to get data
         data: {"name": pokename},
         dataType: 'JSON',                //data format
         success: function(pokemons) {
             poke = pokemons['val'];
             return 0;
         },
         failure: function(pokemons) {
             alert('Got an error dude');
             return 1;
         }
     });
}

var width = 450, height = 550;
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
var svg = d3.select("#singleChart")
    .append("svg")
    .attr("id", "singlee")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//create bars for svg 1
svg.selectAll(".bar")
    .data(inital)
    .enter()
    .append("rect")
    .attr("id", "dOne")
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

// create bars for svg 2
// create svg container
yScale.domain([0, 510]);
xScale.domain(inital2.map(function(d) { return d.stat; }));

var svg2 = d3.select("#singleChart2")
    .append("svg")
    .attr("id", "single2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg2.selectAll(".bar")
    .data(inital2)
    .enter()
    .append("rect")
    .attr("id", "d2")
    .attr("class", "bar")
    .attr("fill", "#5b2eef")
    .attr("x", function(d) { return xScale(d.stat); })
    .attr("width", xScale.rangeBand())
    .attr("y", function(d) { return yScale(d.value); })
    .attr("height", function(d) { return height - yScale(d.value); })
    .on("mouseover", function(d) {
            //Get this bar's x/y values, then augment for the tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2 + 550;
            var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2 + 534;
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

                    $("#frontImg").attr('src', frontPath + id + '.png');
                    $("#backImg").attr('src', backPath + id + '.png');

                    document.getElementById('pokedex').innerHTML = pokemons[0]['id'];
                    if (pokemons[0]['is_legendary'] == "TRUE") {
                        document.getElementById('singleLegend').innerHTML = 'Yes';
                    } else {
                        document.getElementById('singleLegend').innerHTML = 'No';
                    }
                    document.getElementById('singleCatch').innerHTML = pokemons[0]['catch_rate'] + '%';
                    document.getElementById('singleBStyle').innerHTML = pokemons[0]['body_style'];
                    document.getElementById('singleGen').innerHTML = pokemons[0]['generation'];

                    document.getElementById('singleGen').innerHTML = pokemons[0]['generation'];

                    $("#singleType  span").remove();
                    addType(pokemons[0]['type_1'], 'singleType');
                    addType(pokemons[0]['type_2'], 'singleType');

                    var data1 = getValuesForReg(pokemons, unwantedFirst);
                    var data2 = getValuesForDerivedOriginal(pokemons, unwantedSecond);

                    singlePokeData = [];
                    singlePokeData.push(data1);
                    singlePokeData.push(data2);

                    redrawGraph(svg, "#dOne", data1, 255, "#90caf9", width, height);
                    redrawGraph(svg2, "#d2", data2, 510, "#5b2eef", width, height);

                    document.getElementById("checkNormal").checked = true;
                    document.getElementById("checkBar").checked = true;
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

// Double
$('#checkBar').change(function(){
    $( "#singlee" ).removeClass('hidden');
    $("#single2").removeClass('hidden');

    d3.selectAll("#mypie").remove();

});

$('#pieRadio').change(function(){
    $("#singlee").addClass('hidden');
    $("#single2").addClass('hidden');


    drawPie(singlePokeData[0], '#singleChart');
    drawPie(singlePokeData[1], '#singleChart2');
});

d3.select('#slider').on('click', function () {

});

$( function() {
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
        create: function() {
            handle.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handle.text( ui.value );

            adjustSingleData(singlePokeData, ui.value);
            adjustSingleData(singlePokeData, ui.value);

            redrawGraph(svg, "#dOne", singlePokeData[2], 255, "#90caf9", width, height);
            redrawGraph(svg2, "#d2", singlePokeData[3], 510, "#5b2eef", width, height);
        }

    });
  } );



function drawPie(data, ID) {
    var margin = {top: 20, right: 20, bottom: 20, left: 20};
    var widthP = 450 - margin.left - margin.right;
    var heightP = widthP+100 - margin.top - margin.bottom;

    var piechartS = d3.select(ID)
        .append('svg')
        .attr('id', "mypie")
        .attr('class', 'temp')
        .attr("width", widthP + margin.left + margin.right+50)
        .attr("height", heightP + margin.top + margin.bottom+50)
        .append("g")
        .attr("transform", "translate(" + ((widthP / 2) + margin.left) + "," + ((heightP / 2) + margin.top) + ")");


    var radius = Math.min(widthP, heightP) / 2;

    var color = d3.scale.ordinal()
        .range(["#90caf9", "#92d36e", "#ff5d55", "#fefb64", "#f54378", "#5d4b7e"]);

    var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius - 80);

    var pie = d3.layout.pie()
        .sort(null)
        .startAngle(1.1 * Math.PI)
        .endAngle(3.1 * Math.PI)
        .value(function (d) {
            return d.value;
        });


    var g = piechartS.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .on("mouseover", function (d, i) {
            //Get this bar's x/y values, then augment for the tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) + 1000;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 133;
            //Update the tooltip position and value
            d3.select("#tooltip2")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(d.value);

            d3.select("#tooltip2")
                .select("#header")
                .text(data[i].info);

            //Show the tooltip
            d3.select("#tooltip2").classed("hidden", false);
        })
        .on("mouseout", function () {

            //Hide the tooltip
            d3.select("#tooltip2").classed("hidden", true);

        });

    g.append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .transition()
        .ease("exp")
        .duration(1000)
        .attrTween("d", tweenPie);

    function tweenPie(b) {
        var i = d3.interpolate({startAngle: 1.1 * Math.PI, endAngle: 1.1 * Math.PI}, b);
        return function (t) {
            return arc(i(t));
        };
    }

    var legendRectSize = 18;
    var legendSpacing = 4;

// Draw legend
    var legend = piechartS.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = -2 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d, i) {
            return data[i].stat;
        });
}
