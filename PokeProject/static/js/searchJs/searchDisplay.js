var w = 969;
var h = 628;
var r = 40;
var h1 = r+20;
var h5 = h - h1;
var h3 = h/2;
var hi = (h3-h1)/2;
var h4 = h3+hi;
var h2 = h1+hi;
var w1 = h1;
var w5 = w/2;
var w9 = w-w1;
var wi = (w5-w1)/2;
var w3 = w1 + wi;
var w7 = w5 + wi;
wi = (w3-w1)/2;
var w2 = w1 + wi;
var w4 = w3 + wi;
var w6 = w5 + wi;
var w8 = w7 + wi;

var dragging = false;

var locations = [
    [w5,h3],
    [w2,h2],
    [w8,h4],
    [w8,h2],
    [w2,h4],
    [w5,h1],
    [w5,h5],
    [w4,h2],
    [w6,h4],
    [w6,h2],
    [w4,h4],
    [w3,h1],
    [w7,h5],
    [w7,h1],
    [w3,h5],
    [w3,h3],
    [w7,h3],
    [w1,h1],
    [w9,h5],
    [w9,h1],
    [w1,h5],
    [w1,h3],
    [w9,h3]]

//[0=xvalue, 1=yvalue, 2=radius, 3=pokedex, 4=name, 5=height, 6=weight, 7=total, 8=hp, 9=attack, 10=defense,
// 11=sp_atk, 12=sp_def, 13=speed, 14=type_1, 15=type_2]
var dataset = [
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [0,0,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [],
    0];

var teamP = (w/2 - 360)/4;

var teams = [
    [teamP+60,110,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [2*teamP+180,110,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [3*teamP+300,110,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [teamP+60,250,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [2*teamP+180,250,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [3*teamP+300,250,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [w/2+teamP+60,110,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [w/2+2*teamP+180,110,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [w/2+3*teamP+300,110,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [w/2+teamP+60,250,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [w/2+2*teamP+180,250,0,0,"",0,0,0,0,0,0,0,0,0,"",""],
    [w/2+3*teamP+300,250,0,0,"",0,0,0,0,0,0,0,0,0,"",""]
    ];

var teamPos = [0,6];

var dest;

for (var i = 0; i<23; i++){
    dataset[i][0] = locations[i][0];
    dataset[i][1] = locations[i][1];
}

var offset = d3.scale.linear()
    .range([-2,30]);

var rScale =  d3.scale.linear()
    .range([25,60]);

function minmax(dataset,col) {
    var cnt = 0;
    while(dataset[cnt][col] == 0 && cnt < 23){
        cnt = cnt + 1;
    }
    if (cnt == 23){
        return [0,0];
    }
    var min = dataset[cnt][col];
    var max = dataset[cnt][col];
    for (var i = 1; i<23; i++){
        if (dataset[i][col] != 0) {
            if (dataset[i][col] < min){
                min = dataset[i][col];
            }
            if (dataset[i][col] > max){
                max = dataset[i][col];
            }
        }
    }
    return [min,max];
}

function statPos() {
    var value = document.querySelector('input[name = "optradio"]:checked').value;
    if (value == "total"){
        return 7;
    }
    if (value == "hp"){
        return 8;
    }
    if (value == "attack"){
        return 9;
    }
    if (value == "defense"){
        return 10;
    }
    if (value == "sp_attack"){
        return 11;
    }
    if (value == "sp_defense"){
        return 12;
    }
    if (value == "speed"){
        return 13;
    }
    return -1;
}

var drag = d3.behavior.drag()
    .on('dragstart',function(){
        dragging = true;
        d3.select("#tooltipS").classed("hidden", true);
    })
    .on("drag", dragmove)
    .on('dragend',function () {
        dragging = false;
        var x = parseFloat(d3.select(this).attr("cx"));
        var y = parseFloat(d3.select(this).attr("cy"));
        var xPosition = x+275+parseFloat(d3.select(this).attr("r"));
        var yPosition = y-15;

        if (x>w || x<0 || y > h || y < 0){
            d3.select(this)
                .attr("cx",function (d) {
                    var pos = dataset[24];
                    if (pos < dataset[23].length) {
                        d[3] = dataset[23][pos].id;
                        d[4] = dataset[23][pos].name;
                        d[5] = dataset[23][pos].height;
                        d[6] = dataset[23][pos].weight;
                        d[7] = dataset[23][pos].total;
                        d[8] = dataset[23][pos].hp;
                        d[9] = dataset[23][pos].attack;
                        d[10] = dataset[23][pos].defense;
                        d[11] = dataset[23][pos].sp_attack;
                        d[12] = dataset[23][pos].sp_defense;
                        d[13] = dataset[23][pos].speed;
                        d[14] = dataset[23][pos].type_1;
                        d[15] = dataset[23][pos].type_2;
                    } else {
                        d[3] = 0;
                        d[4] = "";
                        d[5] = 0;
                        d[6] = 0;
                        d[7] = 0;
                        d[8] = 0;
                        d[9] = 0;
                        d[10] = 0;
                        d[11] = 0;
                        d[12] = 0;
                        d[13] = 0;
                        d[14] = "";
                        d[15] = "";
                    }
                    dataset[24] = dataset[24] + 1;
                    return d[0];
                })
                .attr("cy", function (d, i) {
                    return d[1];
                });

            var xVal = parseFloat(d3.select(this).attr("cx"));
            var yVal = parseFloat(d3.select(this).attr("cy"));
            var dataPos;
            for (var i = 0; i < 23; i++){
                if (xVal == dataset[i][0] && yVal == dataset[i][1]){
                    dataPos = i;
                }
            }

            var stat = statPos();

            var mm = minmax(dataset,stat);

            rScale.domain(mm);
            offset.domain(mm);

            for (var i = 0; i<23; i++){
                if (dataset[i][stat] != 0){
                    if (mm[0] == mm[1]){
                        dataset[i][2] = 60;
                    } else {
                        dataset[i][2] = rScale(dataset[i][stat]);
                    }
                } else {
                    dataset[i][2]=0
                }
            }
            for (var i = 0; i<23; i++) {
                $('#image' + i + ' image')
                    .attr('y', function () {
                        if (mm[0] == mm[1]) {
                            return 30;
                        } else {
                            return offset(dataset[i][stat]);
                        }
                    })
                    .attr('x', function () {
                        if (mm[0] == mm[1]) {
                            return 30;
                        } else {
                            return offset(dataset[i][stat]);
                        }
                    });
                if (i==dataPos) {
                    $('#image' + i + ' image')
                        .attr('xlink:href', frontPath + dataset[i][3] + '.png');
                }
            }
            svg.selectAll("circle")
                .attr('r', function (d) {
                    return d[2];
                })
                .attr("stroke", function (d) {
                    return typeColor(d[14]);
                });

            return;
        }

        //Update the tooltip position and value
        d3.select("#tooltipS")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px");
        d3.select("#tooltipS").classed("hidden", false);
    });

function dragmove(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

var url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';

var generation = document.getElementById("genBody").value;
var type = document.getElementById("typeBody").value;
var color = document.getElementById("colorBody").value;
var weight = "0 - 952";
var height = "0 - 14";
var hp = "0 - 255";
var attack = "0 - 165";
var defense = "0 - 230";
var sp_attack = "0 - 154";
var sp_defense = "0 - 230";
var speed = "0 - 160";
var radio = document.querySelector('input[name = "optradio"]:checked').value;

var svg = d3.select('#mydiv').append('svg').attr('height', h).attr('width', w);
var svg2 = d3.select('#mydiv').append('svg').attr('height', 330).attr('width', w);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr('cx',function (d) {
        return d[0];
    })
    .attr('cy',function (d) {
        return d[1];
    })
    .style('fill', function (d,i) {
        return 'url(#image'+i+')';
    })
    .attr('stroke','black')
    .attr('stroke-width', 3)
    .on("mouseover",function (d,i) {
        dest = i;
        if (!dragging) {
            //Get this bar's x/y values, then augment for the tooltip
            var xPosition = parseFloat(d3.select(this).attr("cx"))+275+parseFloat(d3.select(this).attr("r"));
            var yPosition = parseFloat(d3.select(this).attr("cy"))-15;
            //Update the tooltip position and value
            d3.select("#tooltipS")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#name")
                .text("#"+ d[3] + " " +d[4]);

            d3.select("#tooltipS")
                .select("#height")
                .text(d[5]);

            d3.select("#tooltipS")
                .select("#weight")
                .text(d[6]);

            d3.select("#tooltipS")
                .select("#hp")
                .text(d[8]);

            d3.select("#tooltipS")
                .select("#attack")
                .text(d[9]);

            d3.select("#tooltipS")
                .select("#defense")
                .text(d[10]);

            d3.select("#tooltipS")
                .select("#sp_attack")
                .text(d[11]);

            d3.select("#tooltipS")
                .select("#sp_defense")
                .text(d[12]);

            d3.select("#tooltipS")
                .select("#speed")
                .text(d[13]);

            d3.select("#tooltipS")
                .select("#type")
                .text(function () {
                    if (d[15] != ""){
                        return d[14]+"/"+d[15];
                    } else {
                        return d[14];
                    }
                });

            //Show the tooltip
            d3.select("#tooltipS").classed("hidden", false);
        }
    })
    .on("mouseout", function () {
        if (!dragging) {
            //Hide the tooltip
            d3.select("#tooltipS").classed("hidden", true);
        }
    })
    .call(drag)
    .on("click", function (d) {
        var xPosition = parseFloat(d3.select(this).attr("cx"))+25;
        var yPosition = parseFloat(d3.select(this).attr("cy"))-70;
        //Update the tooltip position and value
        d3.select("#popupS")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")

        //Show the tooltip
        d3.select("#popupS").classed("hidden", false);

        d3.select("#pokename")
            .text("#"+d[3] + " " + d[4])

        datasetP[0] = d[8];
        datasetP[1] = d[9];
        datasetP[2] = d[10];
        datasetP[3] = d[11];
        datasetP[4] = d[12];
        datasetP[5] = d[13];

        d3.select('#pokePie').remove();

        //Create SVG element
        svgP = d3.select("#test")
                    .append("svg")
                    .attr("width", wP)
                    .attr("height", hP)
                    .attr("id", "pokePie");

        //Set up groups
        arcs = svgP.selectAll("g.arc")
                      .data(pie(datasetP))
                      .enter()
                      .append("g")
                      .attr("class", "arc")
                      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        //Draw arc paths
        arcs.append("path")
            .attr("fill", function(d, i) {
                return colorP(i);
            })
            .attr("d", arc);

        //Labels
        arcs.append("text")
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function(d) {
                return d.value;
            });

        $("#popupImage image").attr('xlink:href', frontPath + d[3] + '.png');

        $("#typeBoxes  span").remove();
        $("#typeBoxes br").remove();

        addType(d[14], 'typeBoxes');
        addType(d[15], 'typeBoxes');
    });

svg2.selectAll("rect")
    .data([0,1])
    .enter()
    .append("rect")
    .attr('x',function (d) {
        return d * (w/2);
    })
    .attr('y', 0)
    .attr('height', 330)
    .attr('width', w/2)
    .style('stroke-width',6)
    .style('stroke', 'black')
    .style('fill', 'white');

svg2.selectAll("circle")
    .data(teams)
    .enter()
    .append("circle")
    .attr('cx', function (d) {
        return d[0];
    })
    .attr('cy', function (d) {
        return d[1];
    })
    .attr('r',60)
    .style('stroke', 'black')
    .style('fill', function (d,i) {
        return 'url(#team'+i+')';
    })
    .on("click", function (d,i) {
        d3.select("#tooltipS").classed("hidden", true);
        if(d[3] != 0) {
            d[3] = 0;
            d[4] = "";
            d[5] = 0;
            d[6] = 0;
            d[7] = 0;
            d[8] = 0;
            d[9] = 0;
            d[10] = 0;
            d[11] = 0;
            d[12] = 0;
            d[13] = 0;
            d[14] = "";
            d[15] = "";

            shiftAll();

            if (d[14] != ""){
                d3.select("#tooltipS").classed("hidden", false);
                d3.select("#tooltipS")
                    .select("#name")
                    .text("#"+ d[3] + " " +d[4]);

                d3.select("#tooltipS")
                    .select("#height")
                    .text(d[5]);

                d3.select("#tooltipS")
                    .select("#weight")
                    .text(d[6]);

                d3.select("#tooltipS")
                    .select("#hp")
                    .text(d[8]);

                d3.select("#tooltipS")
                    .select("#attack")
                    .text(d[9]);

                d3.select("#tooltipS")
                    .select("#defense")
                    .text(d[10]);

                d3.select("#tooltipS")
                    .select("#sp_attack")
                    .text(d[11]);

                d3.select("#tooltipS")
                    .select("#sp_defense")
                    .text(d[12]);

                d3.select("#tooltipS")
                    .select("#speed")
                    .text(d[13]);

                d3.select("#tooltipS")
                    .select("#type")
                    .text(function () {
                        if (d[15] != ""){
                            return d[14]+"/"+d[15];
                        } else {
                            return d[14];
                        }
                    });
            }

            if (i < 6) {
                teamPos[0] = teamPos[0] - 1;
            } else {
                teamPos[1] = teamPos[1] - 1;
            }

            for (var j = 0; j < 12; j++) {
                if (teams[j][3] != 0) {
                    console.log("#team" + j + " image");
                    $("#team" + j + " image").attr('xlink:href', frontPath + teams[j][3] + '.png');
                } else {
                    $("#team" + j + " image").attr('xlink:href', '');
                }
            }

            svg2.selectAll("circle")
                .attr("stroke-width", function (d) {
                    if (d[14] != ""){
                        return 3;
                    } else {
                        return 1;
                    }
                })
                .style("stroke",function (d) {
                    if (d[14] != ""){
                        return typeColor(d[14]);
                    } else {
                        return typeColor("Dark");
                    }
                });
        }
    })
    .on("mouseover",function (d) {
        //Get this bar's x/y values, then augment for the tooltip
        var xPosition = parseFloat(d3.select(this).attr("cx"))+275+60;
        var yPosition = parseFloat(d3.select(this).attr("cy"))+560;
        //Update the tooltip position and value
        d3.select("#tooltipS")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .select("#name")
            .text("#"+ d[3] + " " +d[4]);

        d3.select("#tooltipS")
            .select("#height")
            .text(d[5]);

        d3.select("#tooltipS")
            .select("#weight")
            .text(d[6]);

        d3.select("#tooltipS")
            .select("#hp")
            .text(d[8]);

        d3.select("#tooltipS")
            .select("#attack")
            .text(d[9]);

        d3.select("#tooltipS")
            .select("#defense")
            .text(d[10]);

        d3.select("#tooltipS")
            .select("#sp_attack")
            .text(d[11]);

        d3.select("#tooltipS")
            .select("#sp_defense")
            .text(d[12]);

        d3.select("#tooltipS")
            .select("#speed")
            .text(d[13]);

        d3.select("#tooltipS")
            .select("#type")
            .text(function () {
                if (d[15] != ""){
                    return d[14]+"/"+d[15];
                } else {
                    return d[14];
                }
            });

        //Show the tooltip
        if (d[14] != "") {
            d3.select("#tooltipS").classed("hidden", false);
        }
    })
    .on("mouseout", function () {
        d3.select("#tooltipS").classed("hidden", true);
    });

function shiftAll() {
    for (var i =0;i<5;i++){
        slide(i);
        slide(6+i);
    }
}

function slide(pos) {
    if (teams[pos][4] == "" && teams[pos+1][4] != "") {
        for (var i = 3; i < 16; i++)
            teams[pos][i] = teams[pos + 1][i];
        teams[pos+1][3] = 0;
        teams[pos+1][4] = "";
        teams[pos+1][5] = 0;
        teams[pos+1][6] = 0;
        teams[pos+1][7] = 0;
        teams[pos+1][8] = 0;
        teams[pos+1][9] = 0;
        teams[pos+1][10] = 0;
        teams[pos+1][11] = 0;
        teams[pos+1][12] = 0;
        teams[pos+1][13] = 0;
        teams[pos+1][14] = "";
        teams[pos+1][15] = "";
    }
}

svg2.selectAll("text")
    .data(["Team 1","Team 2"])
    .enter()
    .append("text")
    .attr('x', function (d,i) {
        return i*w/2 + w/4 - 50;
    })
    .attr('y',30)
    .text(function (d) {
        return d;
    })
    .style("font-size","20pt")
    .style("font-weight", "bold");

$.ajax({
    type: "GET",
    url: 'ajax/get_filtered_pokemon/', //the script to call to get data
    data: {"gen": generation, "type":type, "color": color, "weight": weight, "height": height, "hp": hp,
        "attack": attack, "defense": defense, "sp_attack": sp_attack, "sp_defense": sp_defense, "speed": speed,
    "radio": radio},
    dataType: 'json',                //data format
success: function(pokemons) {
    console.log(pokemons);
    dataset[23] = pokemons;
    var pos = 0;
    for (var i = 0 ; i < 23; i++){
        //[0=xvalue, 1=yvalue, 2=radius, 3=pokedex, 4=name, 5=height, 6=weight, 7=total, 8=hp, 9=attack, 10=defense,
// 11=sp_atk, 12=sp_def, 13=speed, 14=type_1, 15=type_2]
        if (pos<pokemons.length) {
            dataset[i][3] = pokemons[i].id;
            dataset[i][4] = pokemons[i].name;
            dataset[i][5] = pokemons[i].height;
            dataset[i][6] = pokemons[i].weight;
            dataset[i][7] = pokemons[i].total;
            dataset[i][8] = pokemons[i].hp;
            dataset[i][9] = pokemons[i].attack;
            dataset[i][10] = pokemons[i].defense;
            dataset[i][11] = pokemons[i].sp_attack;
            dataset[i][12] = pokemons[i].sp_defense;
            dataset[i][13] = pokemons[i].speed;
            dataset[i][14] = pokemons[i].type_1;
            dataset[i][15] = pokemons[i].type_2;
        } else {
            dataset[i][3] = 0;
            dataset[i][4] = "";
            dataset[i][5] = 0;
            dataset[i][6] = 0;
            dataset[i][7] = 0;
            dataset[i][8] = 0;
            dataset[i][9] = 0;
            dataset[i][10] = 0;
            dataset[i][11] = 0;
            dataset[i][12] = 0;
            dataset[i][13] = 0;
            dataset[i][14] = "";
            dataset[i][15] = "";
        }
        pos++;
    }
    dataset[24] = pos;

    rScale.domain(minmax(dataset,7));
    offset.domain(minmax(dataset,7));

    for (i = 0; i < 23; i++) {
        $('#image' + i + ' image').attr('y', offset(dataset[i][7]))
            .attr('x', offset(dataset[i][7]))
            .attr('xlink:href', frontPath + dataset[i][3] + '.png');
    }
    svg.selectAll("circle")
            .attr('r', function (d) {
                if (d[7] != 0) {
                    return rScale(d[7]);
                } else {
                    return d[7];
                }
            })
            .attr("stroke", function (d) {
                return typeColor(d[14]);
            });
},
failure: function(pokemons) {
    alert('Got an error dude');
}
});

function radioUpdater(dataset,svg,rScale,offset) {
    var pos = statPos();
    rScale.domain(minmax(dataset, pos));
    offset.domain(minmax(dataset, pos));

    for (i = 0; i < 23; i++) {

        $('#image' + i + ' image').attr('y', offset(dataset[i][pos]))
            .attr('x', offset(dataset[i][pos]))
    }
    svg.selectAll("circle")
        .attr('r', function (d) {
            if (d[pos] != 0) {
                return rScale(d[pos]);
            } else {
                return d[pos];
            }
        });
    return dataset;
}


function updater(dataset,svg,rScale,offset) {

    var generation = document.getElementById("genBody").value;
    var type = document.getElementById("typeBody").value;
    var color = document.getElementById("colorBody").value;
    var weight = document.getElementById("amountW").value;
    var height = document.getElementById("amountH").value;
    var hp = document.getElementById("amountHP").value;
    var attack = document.getElementById("amountA").value;
    var defense = document.getElementById("amountD").value;
    var sp_attack = document.getElementById("amountSA").value;
    var sp_defense = document.getElementById("amountSD").value;
    var speed = document.getElementById("amountSP").value;
    var radio = document.querySelector('input[name = "optradio"]:checked').value;

    $.ajax({
        type: "GET",
        url: 'ajax/get_filtered_pokemon/', //the script to call to get data
        data: {"gen": generation, "type":type, "color": color, "weight": weight, "height": height, "hp": hp,
            "attack": attack, "defense": defense, "sp_attack": sp_attack, "sp_defense": sp_defense, "speed": speed,
        "radio": radio},
        dataType: 'json',                //data format
    success: function(pokemons) {
        dataset[23]=pokemons;
        var pos = 0;
        for (var i = 0 ; i < 23; i++){
           if (pos<pokemons.length) {
               dataset[i][0] = locations[i][0];
               dataset[i][1] = locations[i][1];
                dataset[i][3] = pokemons[i].id;
                dataset[i][4] = pokemons[i].name;
                dataset[i][5] = pokemons[i].height;
                dataset[i][6] = pokemons[i].weight;
                dataset[i][7] = pokemons[i].total;
                dataset[i][8] = pokemons[i].hp;
                dataset[i][9] = pokemons[i].attack;
                dataset[i][10] = pokemons[i].defense;
                dataset[i][11] = pokemons[i].sp_attack;
                dataset[i][12] = pokemons[i].sp_defense;
                dataset[i][13] = pokemons[i].speed;
                dataset[i][14] = pokemons[i].type_1;
                dataset[i][15] = pokemons[i].type_2;
           } else {
               dataset[i][0] = locations[i][0];
               dataset[i][1] = locations[i][1];
                dataset[i][3] = 0;
                dataset[i][4] = "";
                dataset[i][5] = 0;
                dataset[i][6] = 0;
                dataset[i][7] = 0;
                dataset[i][8] = 0;
                dataset[i][9] = 0;
                dataset[i][10] = 0;
                dataset[i][11] = 0;
                dataset[i][12] = 0;
                dataset[i][13] = 0;
                dataset[i][14] = "";
                dataset[i][15] = "";
            }
            pos++;
        }
        dataset[24]=pos;

        var stat = statPos();

        rScale.domain(minmax(dataset,stat));
        offset.domain(minmax(dataset,stat));

        for (i = 0; i < 23; i++) {
            $('#image' + i + ' image').attr('y', offset(dataset[i][stat]))
                .attr('x', offset(dataset[i][stat]))
                //.attr('xlink:href', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + dataset[i][2] + '.png');
                .attr('xlink:href', frontPath + dataset[i][3] + '.png');
        }
        svg.selectAll("circle")
            .attr('r', function (d) {
                if (d[stat] != 0) {
                    return rScale(d[stat]);
                } else {
                    return d[stat];
                }
            })
            .attr('cx',function (d) {
                return d[0];
            })
            .attr('cy', function (d) {
                return d[1];
            })
            .attr("stroke", function (d) {
                return typeColor(d[14]);
            });


    },
    failure: function(pokemons) {
        alert('Got an error dude');
    }
    });
    return dataset;
}

d3.select('#genBody').on('change', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#typeBody').on('change', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#colorBody').on('change', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range2').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range3').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range4').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range5').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range6').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range7').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range8').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#StatRadio').on('change', function () {
    radioUpdater(dataset,svg,rScale,offset);
});

d3.select('#popupS').on('click',function () {
    d3.select("#popupS").classed("hidden", true);
});

d3.select('#mydiv').on('mouseover', function () {
    d3.select("#popupS").classed("hidden",true);
});

d3.select('#one').on('mouseover', function () {
    d3.select("#popupS").classed("hidden",true);
});

d3.select('#two').on('mouseover', function () {
    d3.select("#popupS").classed("hidden",true);
});

d3.select('#baseWindow').on('mouseover', function () {
    d3.select("#popupS").classed("hidden",true);
});

d3.select('#navbar').on('mouseover', function () {
    d3.select("#popupS").classed("hidden",true);
});

d3.select('#compareT').on('click',function () {
    console.log("clicked");
})

d3.select('#buttonTeam1').on('click', function () {
    if (teamPos[0]<6){
        for(var i = 2;i<16;i++){
            teams[teamPos[0]][i] = dataset[dest][i];
        }
        for (var j = 0;j<6;j++){
            if (teams[j][3] != 0) {
                $("#team" + j + " image").attr('xlink:href', frontPath + teams[j][3] + '.png');
            } else {
                $("#team" + j + " image").attr('xlink:href','');
            }
        }
        teamPos[0]=teamPos[0] + 1;

        svg2.selectAll("circle")
            .attr("stroke-width", function (d) {
                if (d[14] != ""){
                    return 3;
                } else {
                    return 1;
                }
            })
            .style("stroke", function (d) {
                if (d[14] != ""){
                    return typeColor(d[14]);
                } else {
                    return typeColor("Dark");
                }
            });
    }
});

d3.select('#buttonTeam2').on('click', function () {
    if (teamPos[1]<12){
        for(var i = 2;i<16;i++){
            teams[teamPos[1]][i] = dataset[dest][i];
        }
        for (var j = 6;j<12;j++){
            if (teams[j][3] != 0) {
                $("#team" + j + " image").attr('xlink:href', frontPath + teams[j][3] + '.png');
            } else {
                $("#team" + j + " image").attr('xlink:href','');
            }
        }
        teamPos[1]=teamPos[1] + 1;

        svg2.selectAll("circle")
            .attr("stroke-width", function (d) {
                if (d[14] != ""){
                    return 3;
                } else {
                    return 1;
                }
            })
            .style("stroke", function (d) {
                if (d[14] != ""){
                    return typeColor(d[14]);
                } else {
                    return typeColor("Dark");
                }
            });
    }
});

//Width and height
var wP = 200;
var hP = 200;

var datasetP = [ 5, 10, 20, 45, 6, 25 ];

var outerRadius = wP / 2;
var innerRadius = wP / 4;
var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

var pie = d3.layout.pie();

//Easy colors accessible via a 10-step ordinal scale
var colorP = d3.scale.category10();

//Create SVG element
var svgP = d3.select("#test")
            .append("svg")
            .attr("width", wP)
            .attr("height", hP)
            .attr("id", "pokePie");

//Set up groups
var arcs = svgP.selectAll("g.arc")
              .data(pie(datasetP))
              .enter()
              .append("g")
              .attr("class", "arc")
              .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

//Draw arc paths
arcs.append("path")
    .attr("fill", function(d, i) {
        return colorP(i);
    })
    .attr("d", arc);

//Labels
arcs.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
        return d.value;
    });

var svgLeg = d3.select("#legend")
                .append("svg")
                .attr("width", 100)
                .attr("height", 200);

svgLeg.selectAll("rect")
    .data([0,1,2,3,4,5])
    .enter()
    .append("rect")
    .attr("height", 15)
    .attr("width", 15)
    .attr("fill", function (d) {
        return colorP(d);
    })
    .attr("y", function (d) {
        return d * 20;
    });

svgLeg.selectAll("text")
    .data(["HP","Attack","Defense","Sp. Attack","Sp. Defense","Speed"])
    .enter()
    .append("text")
    .attr("y", function (d,i) {
        return i * 20 +13;
    })
    .attr("x", 20)
    .text(function (d) {
        return d;
    });

var svgCircle = d3.select("#circleimage")
        .append("svg")
        .attr("width", 100)
        .attr("height", 100);

svgCircle.append("circle")
        .attr("r", wP/4)
        .attr("cx", 50)
        .attr("cy", 50)
        .style('fill', function (d,i) {
            return 'url(#popupImage)';
        })
        .attr("stroke", "black");

function typeColor(type) {
    if (type == "Grass")
        return "#6cb649";

    if (type == "Fire")
        return "#ff5d55";

    if (type == "Water")
        return "#5382ea";

    if (type == "Fighting")
        return "#a02a26";

    if (type == "Steel")
        return "#a7a8be";

    if (type == "Electric")
        return "#f2c735";

    if (type == "Ice")
        return "#84cfcf";

    if (type == "Normal")
        return "#99986a";

    if (type == "Bug")
        return "#95a22c";

    if (type == "Dragon")
        return "#5b2eef";

    if (type == "Psychic")
        return "#f54378";

    if (type == "Ghost")
        return "#5d4b7e";

    if (type == "Poison")
        return "#933f93";

    if (type == "Fairy")
        return "#e287e2";

    if (type == "Dark")
        return "#5d483d";

    if (type == "Rock")
        return "#a48f3a";

    if (type == "Ground")
        return "#d9b34a";

    if (type == "Flying")
        return "#9d88db";
}

function addType(type, id){

    var elem = document.getElementById(id);
    elem.innerHTML += '<br>';
    switch(type) {
        case 'Fire':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge fireBadge">Fire</span>';
            break;
        case 'Water':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge waterBadge">Water</span>';
            break;
        case 'Grass':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge grassBadge">Grass</span>';
            break;
        case 'Fighting':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge fightingBadge">Fighting</span>';
            break;
        case 'Steel':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge steelBadge">Steel</span>';
            break;
        case 'Electric':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge electricBadge">Electric</span>';
            break;
        case 'Ice':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge iceBadge">Ice</span>';
            break;
        case 'Normal':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge normalBadge">Normal</span>';
            break;
        case 'Bug':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge bugBadge">Bug</span>';
            break;
        case 'Dragon':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge dragonBadge">Dragon</span>';
            break;
        case 'Psychic':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge psychicBadge">Psychic</span>';
            break;
        case 'Ghost':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge ghostBadge">Ghost</span>';
            break;
        case 'Poison':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge poisonBadge">Poison</span>';
            break;
        case 'Fairy':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge fairyBadge">Fairy</span>';
            break;
        case 'Dark':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge darkBadge">Dark</span>';
            break;
        case 'Rock':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge rockBadge">Rock</span>';
            break;
        case 'Ground':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge groundBadge">Ground</span>';
            break;
        case 'Flying':
            elem.innerHTML += '<span style="width: auto; height: 20px;font-size: 12pt" class="badge flyingBadge">Flying</span>';
            break;
        default:
            break;
    }
}