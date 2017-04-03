var dataset = [[0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0]];

var datasetbarleft = [[0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]];

var datasetbartest = [[3,3,50,3,3,3],
    [3,56,4,4,20,3],
    [5,1,4,5,5,5],
    [2,200,2,2000,2,2],
    [6,6,15,6,200,6],
    [7,109,7,7,3,7]];

// var datasetbarleft = [];

var datasetright = [[0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0]];

var datasetbarright = [[0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]];

var advantages = [{"name":"Normal","immunes":["Ghost"],"weaknesses":["Rock","Steel"],"strengths":[]},
{"name":"Fire","immunes":[],"weaknesses":["Fire","Water","Rock","Dragon"],"strengths":["Grass","Ice","Bug","Steel"]},
{"name":"Water","immunes":[],"weaknesses":["Water","Grass","Dragon"],"strengths":["Fire","Ground","Rock"]},
{"name":"Electric","immunes":["Ground"],"weaknesses":["Electric","Grass","Dragon"],"strengths":["Water","Flying"]},
{"name":"Grass","immunes":[],"weaknesses":["Fire","Grass","Poison","Flying","Bug","Dragon","Steel"],"strengths":["Water","Ground","Rock"]},
{"name":"Ice","immunes":[],"weaknesses":["Fire","Water","Ice","Steel"],"strengths":["Grass","Ground","Flying","Dragon"]},
{"name":"Fighting","immunes":["Ghost"],"weaknesses":["Poison","Flying","Psychic","Bug","Fairy"],"strengths":["Normal","Ice","Rock","Dark","Steel"]},
{"name":"Poison","immunes":["Steel"],"weaknesses":["Poison","Ground","Rock","Ghost"],"strengths":["Grass","Fairy"]},
{"name":"Ground","immunes":["Flying"],"weaknesses":["Grass","Bug"],"strengths":["Fire","Electric","Poison","Rock","Steel"]},
{"name":"Flying","immunes":[],"weaknesses":["Electric","Rock","Steel"],"strengths":["Grass","Fighting","Bug"]},
{"name":"Psychic","immunes":["Dark"],"weaknesses":["Psychic","Steel"],"strengths":["Fighting","Poison"]},
{"name":"Bug","immunes":[],"weaknesses":["Fire","Fighting","Poison","Flying","Ghost","Steel","Fairy"],"strengths":["Grass","Psychic","Dark"]},
{"name":"Rock","immunes":[],"weaknesses":["Fighting","Ground","Steel"],"strengths":["Fire","Ice","Flying","Bug"]},
{"name":"Ghost","immunes":["Normal"],"weaknesses":["Dark"],"strengths":["Psychic","Ghost"]},
{"name":"Dragon","immunes":["Fairy"],"weaknesses":["Steel"],"strengths":["Dragon"]},
{"name":"Dark","immunes":[],"weaknesses":["Fighting","Dark","Fairy"],"strengths":["Psychic","Ghost"]},
{"name":"Steel","immunes":[],"weaknesses":["Fire","Water","Electric","Steel"],"strengths":["Ice","Rock","Fairy"]},
{"name":"Fairy","immunes":[],"weaknesses":["Fire","Poison","Steel"],"strengths":["Fighting","Dragon","Dark"]}];

// var testad = [{"Normal":{"immunes":["Ghost"],"weaknesses":["Rock","Steel"],"strengths":[]}},
//              {"Fire":{"immunes":[],"weaknesses":["Fire","Water","Rock","Dragon"],"strengths":["Grass","Ice","Bug","Steel"]}}];


var items = ["Hp", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"];

var w = 1224;
var h = 800;
var w2 = 612;
var h2 = 700;
var datapos = 0;
var dataposright = 0;
var datapostable = 0;
var datapostableright = 0;

var svg = d3.select('#maindiv').append('svg').attr('height', h).attr('width', w);

var boxes = svg.selectAll("rect").data(dataset);
    boxes.enter()
        .append("rect")
        .attr("x", 10)
        .attr("y", function (d,i) {
            return ((110*i))
        })
        .attr("width", 450)
        .attr("height", 105)
        .attr("fill", "#bdbec0")
        .attr("stroke","black")
        .attr("shape-rendering","crispEdges")
        .attr("opacity", 0)
        .on("mouseover", function (d, i){
        //d3.select(this).attr("opacity",0);
            //var curselect = d3.select(this);
            //console.log(d[3],d[4]);
            var currenttype1 = d[3];
            var currenttype2 = d[4];
            adhelper(currenttype1,currenttype2);
            //d3.select("#rightbox1").attr("opacity",1);
            $.each(advantages,function (key,value) {
                //console.log(value.name);
            })
        })
        ;

curpoke = [];

function adhelper(type1,type2) {
    var immunelist = [];
    //console.log($.inArray("Normal",advantages));
    // for (var i = 0; i<18; i++){
    //     if (advantages[i]["name"] == type1 || advantages[i]["name"] == type2){
    //         curpoke=({
    //             immunes: advantages[i]["immunes"],
    //             weaknesses: advantages[i]["weaknesses"],
    //             strengths: advantages[i]["strengths"]
    //         })
    //
    //     }
    // }
    // console.log(curpoke);


}

var boxlabels = svg.selectAll("text")
    .data(dataset);
    //console.log(dataset[0].name);
    boxlabels.enter()
        .append("text")
        // .text(function (d) {
        //     //console.log("Pokemans:", d.name);
        //     return d.name;
        // })
        .attr("text-anchor","left")
        .attr("x",20)
        .attr("y",function(d,i){
            return ((110*i)+30)
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "24px")
        .attr("opacity",0)
        .attr("fill", "black");

var rectback = svg.selectAll('rect.background')
    .data(dataset);
    rectback.enter()
    .append("rect")
    .classed("background",true)
    .attr("x",170)
    .attr("y",function(d,i){
        return ((110*i)+55)
    })
    .attr('height', 30)
    .attr("width", 255)
    .attr("fill","white")
    .attr("shape-rendering","crispEdges")
    .attr("stroke","black")
    .attr("opacity",0);

var rectfront = svg.selectAll('rect.bar')
    .data(dataset);
    rectfront.enter()
    .append("rect")
    .classed("bar",true)
    .attr("x",170)
    .attr("y",function(d,i){
        return ((110*i)+55)
    })
    .attr('height', 30)
    .attr("width", 0)
    .attr("fill","red")
    .attr("shape-rendering","crispEdges")
    .attr("stroke","black")
    .attr("opacity",0);

var circles = svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx",70)
    .attr("cy",function(d,i){
        return ((110*i)+70)
    })
    .attr("r",40)
    .style("fill",function (d,i) {
        //console.log(i);
        return 'url(#imageleft' +i+')';
    })
    .attr("stroke-width",0)
    //.attr("stroke","black")
    .attr("opacity",1);


var types = svg.selectAll("foreignObject.left")
    .data(dataset)
    .enter()
    .append("foreignObject")
    .attr('id','fleft')
    .attr("width", 20)
    .attr("height", 5)
    .attr('x',180)
    .attr("opacity",1)
    .attr("y", function (d,i) {
        return ((110*i)+7)
    })
    .append("xhtml:test1")
    .html('');

var hplabels = svg.selectAll("text.hp")
    .data(dataset)
    .enter()
    .append("text")
    .attr("text-anchor","right")
    .attr("x",325)
    .attr("y",function(d,i){
        return ((110*i)+50)
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("opacity",0)
    .attr("fill", "black");


var advantagegroup = svg.selectAll("g.adavantage")
    .data(dataset)
    .enter()
    .append("g")
    .attr("id",function (d,i) {
            //console.log("leftbox"+i);
            return "leftbox"+i;
        })
    .attr("opacity", 0);

advantagegroup.append("rect")
        .attr("x", 470)
        .attr("y", function (d,i) {
            //console.log('Here');
            return ((110*i))
        })
        .attr("width", 105)
        .attr("height", 105)
        .attr("fill", "#bdbec0")
        .attr("stroke","black")
        .attr("shape-rendering","crispEdges");


advantagegroup.append("text")
    .text("1x")
    .attr("text-anchor","middle")
    .attr("x", 522.5)
    .attr("y", function (d,i) {
            //console.log('Here');
            return ((110*i)+70)
        })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "50px")
    .attr("font-weight","bold")
    .attr("fill", "black");


var margin = {top: 20, right: 50, bottom: 30, left: 40},
        width = 612 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .35);

var y = d3.scale.linear()
        .rangeRound([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var svgbar = d3.select('#chartarea').append('svg').attr('height', height + margin.top + margin.bottom).attr('width', width + margin.left + margin.right).append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var datamapped=["Hp", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"].map(function(key,i){
//     return datasetbarleft.map(function(d,j){
//         return {x: items[i], y: d[key] };
//     })
// });

console.log(datamapped);

var datamapped = ["Hp", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"].map(function (d1,ii) {
    return datasetbarleft.map(function (d,i) {
        return {x: items[i], y: d[ii]};
    })
});

var stack = d3.layout.stack();
stack(datamapped);

x.domain(datamapped[0].map(function (d) {
    return d.x;
}));

y.domain([0,
    d3.max(datamapped[datamapped.length - 1],
            function (d) { return d.y0 + d.y;})
    ])
  .nice();


var layer = svgbar.selectAll(".stack")
        .data(datamapped)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
            return color(i);
        });

layer.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("y", function (d) {
            return y(d.y + d.y0);
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y + d.y0);
        })
        .attr("width", x.rangeBand());

svgbar.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

svgbar.append("g")
        .attr("class", "y axis")
        //.attr("transform", "translate(0,0)")
        .call(yAxis);

//
//###################################################################
//###################################################################
//

var boxesright = svg.selectAll("rect.right").data(datasetright);
boxesright.enter()
    .append("rect")
    .attr("x", 724)
    .attr("y", function (d,i) {
        //console.log('Here');
        return ((110*i))
    })
    .attr("width", 450)
    .attr("height", 105)
    .attr("fill", "#bdbec0")
    .attr("stroke","black")
    .attr("shape-rendering","crispEdges")
    .attr("opacity", 0);

var boxlabelsright = svg.selectAll("text.right")
    .data(datasetright);
//console.log(dataset[0].name);
boxlabelsright.enter()
    .append("text")
    // .text(function (d) {
    //     //console.log("Pokemans:", d.name);
    //     return d.name;
    // })
    .attr("text-anchor","left")
    .attr("x",734)
    .attr("y",function(d,i){
        return ((110*i)+30)
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .attr("opacity",0)
    .attr("fill", "black");

var rectbackright = svg.selectAll('rect.backgroundright')
    .data(datasetright);
rectbackright.enter()
    .append("rect")
    .classed("background",true)
    .attr("x",884)
    .attr("y",function(d,i){
        return ((110*i)+55)
    })
    .attr('height', 30)
    .attr("width", 255)
    .attr("fill","white")
    .attr("shape-rendering","crispEdges")
    .attr("stroke","black")
    .attr("opacity",0);

var rectfrontright = svg.selectAll('rect.barright')
    .data(datasetright);
rectfrontright.enter()
    .append("rect")
    .classed("bar",true)
    .attr("x",884)
    .attr("y",function(d,i){
        return ((110*i)+55)
    })
    .attr('height', 30)
    .attr("width", 0)
    .attr("fill","red")
    .attr("shape-rendering","crispEdges")
    .attr("stroke","black")
    .attr("opacity",0);

var circlesright = svg.selectAll('circle.right')
    .data(datasetright)
    .enter()
    .append("circle")
    .attr("cx",784)
    .attr("cy",function(d,i){
        return ((110*i)+70)
    })
    .attr("r",40)
    .style("fill",function (d,i) {
        //console.log(i);
        return 'url(#imageright' +i+')';
    })
    .attr("stroke-width",0)
    //.attr("stroke","black")
    .attr("opacity",1);

var typesright = svg.selectAll("foreignObject.right")
    .data(datasetright)
    .enter()
    .append("foreignObject")
    .attr("width", 20)
    .attr("height", 5)
    .attr('x',894)
    .attr("opacity",1)
    .attr("y", function (d,i) {
        return ((110*i)+7)
    })
    .append("xhtml:test")
    .html('');

var hplabelsright = svg.selectAll("text.hpright")
    .data(datasetright)
    .enter()
    .append("text")
    .attr("text-anchor","right")
    .attr("x",1039)
    .attr("y",function(d,i){
        return ((110*i)+50)
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("opacity",0)
    .attr("fill", "black");

var advantagegroupright = svg.selectAll("g.adavantageright")
    .data(datasetright)
    .enter()
    .append("g")
    .attr("id",function (d,i) {
            //console.log("rightbox"+i);
            return "rightbox"+i;
        })
    .attr("opacity", 0);

advantagegroupright.append("rect")
        .attr("x", 609)
        .attr("y", function (d,i) {
            //console.log('Here');
            return ((110*i))
        })
        .attr("width", 105)
        .attr("height", 105)
        .attr("fill", "#bdbec0")
        .attr("stroke","black")
        .attr("shape-rendering","crispEdges");


advantagegroupright.append("text")
    .text("1x")
    .attr("text-anchor","middle")
    .attr("x", 661.5)
    .attr("y", function (d,i) {
            //console.log('Here');
            return ((110*i)+70)
        })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "50px")
    .attr("font-weight","bold")
    .attr("fill", "black");


d3.select("#addbuttonleft").on("click",function () {
    var pokeName = document.getElementById("pokeinput").value;
    console.log("left button");
    if (datapos < 6) {
        $.ajax({
            type: "GET",
            url: 'ajax/get_single_pokemon/', //the script to call to get data
            data: {"name": pokeName},
            dataType: 'JSON',                //data format
            success: function (pokemons) {

                dataset[datapos][0] = pokemons[0].id;
                dataset[datapos][1] = pokemons[0].name;
                dataset[datapos][2] = pokemons[0].hp;
                dataset[datapos][3] = pokemons[0].type_1;
                dataset[datapos][4] = pokemons[0].type_2;
                datasetbarleft[0][datapos] = pokemons[0].hp;
                datasetbarleft[1][datapos] = pokemons[0].attack;
                datasetbarleft[2][datapos] = pokemons[0].defense;
                datasetbarleft[3][datapos] = pokemons[0].sp_attack;
                datasetbarleft[4][datapos] = pokemons[0].sp_defense;
                datasetbarleft[5][datapos] = pokemons[0].speed;
                // datasetbarleft.push({
                //         Hp: pokemons[0].hp,
                //         Attack: pokemons[0].attack,
                //         Defense: pokemons[0].defense,
                //         "Sp. Attack": pokemons[0].sp_attack,
                //         "Sp. Defense": pokemons[0].sp_defense,
                //         Speed: pokemons[0].speed
                //     });
                datapos++;
                console.log(datasetbarleft);
                boxes.transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                    if (d[0] != 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                    })
                    .attr("stroke",function (d) {
                        return typeColor(d[3])
                    })
                    .attr("stroke-width","5");
                boxlabels.text(function (d) {
                    //console.log("Pokemon:", d[1]);
                    return d[1];
                    })
                    .transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                rectback.transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                    if (d[0] != 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                rectfront.transition()
                    .duration(1000)
                    .attr("width", function (d) {
                        return (d[2]);
                    })
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                // svg.selectAll("foreignObject").attr("opacity",function (d) {
                //         if (d[0] != 0) {
                //             return 1;
                //         } else {
                //             return 0;
                //         }
                //     });

                types.attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                    .html(function (d) {
                        if (d[3] == ''){
                            return '';
                        }
                        else if (d[4] == ''){
                            return addType(d[3])+'<br>';
                        }else{
                            return addType(d[3])+'<br>'+addType(d[4]);
                        }
                    });

                hplabels.text(function (d) {
                    return "HP: "+d[2]+"/255";
                    })
                    .transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                $('#imageleft' + (datapos-1) + ' image').attr("xlink:href", frontPath + dataset[datapos-1][0] + '.png');


                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .35);

                var y = d3.scale.linear()
                    .rangeRound([height, 0]);

                var color = d3.scale.category10();

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(10, "%");


                var datamapped = ["Hp", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"].map(function (d1,ii) {
                    return datasetbarleft.map(function (d,i) {
                        return {x: items[i], y: d[ii]};
                    })
                });

                // var datamapped = ["Hp", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"].map(function (d1,ii) {
                //     return datasetbarleft.map(function (d,i) {
                //         console.log("d[ii]: ",d[ii], "datapos-1: ",datapos-1, "i: ",i,"datasetbarleft[datapos-1+ii][i]: ", datasetbarleft[datapos-1+ii][i]);
                //         return {x: items[i], y: datasetbarleft[datapos-1+ii][i]};
                //     })
                // });

                var stack = d3.layout.stack();
                stack(datamapped);

                console.log(datamapped);

                x.domain(datamapped[0].map(function (d) {
                    return d.x;
                }));

                y.domain([0,
                    d3.max(datamapped[datamapped.length - 1],
                        function (d) { return d.y0 + d.y;})
                ])
                    .nice();

                svgbar.selectAll(".stack").remove();

                var layer = svgbar.selectAll(".stack")
                    .data(datamapped)
                    .enter().append("g")
                    .attr("class", "stack")
                    .style("fill", function (d, i) {
                        return color(i);
                    });

                layer.selectAll("rect")
                    .data(function (d) {
                        return d;
                    })
                    .enter().append("rect")
                    .transition()
                    .delay(function (d, i) {
                        return i / 6 * 10;   // <-- Where the magic happens
                    })
                    .duration(1000)
                    .attr("x", function (d) {
                        return x(d.x);
                    })
                    .attr("y", function (d) {
                        return y(d.y + d.y0);
                    })
                    .attr("height", function (d) {
                        return y(d.y0) - y(d.y + d.y0);
                    })
                    .attr("width", x.rangeBand());

                svgbar.selectAll("g.x.axis")
                        .transition()
                        .delay(function (d, i) {
                            return i / 6 * 10;   // <-- Where the magic happens
                        })
                        .duration(1000)
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svgbar.selectAll("g.y.axis")
                    .transition()
                        .delay(function (d, i) {
                            return i / 6 * 10;   // <-- Where the magic happens
                        })
                        .duration(1000)
                    .attr("transform", "translate(0,0)")
                    .call(yAxis);

            }

        });
    }else{
        alert("You have reach the maximum limit to your pokemon");

    }

});


d3.select("#addbuttonright").on("click",function () {
    var pokeName = document.getElementById("pokeinput").value;
    console.log("right button");
    if (dataposright < 6) {
        $.ajax({
            type: "GET",
            url: 'ajax/get_single_pokemon/', //the script to call to get data
            data: {"name": pokeName},
            dataType: 'JSON',                //data format
            success: function (pokemons) {
                datasetright[dataposright][0] = pokemons[0].id;
                datasetright[dataposright][1] = pokemons[0].name;
                datasetright[dataposright][2] = pokemons[0].hp;
                datasetright[dataposright][3] = pokemons[0].type_1;
                datasetright[dataposright][4] = pokemons[0].type_2;

                datasetbarright[dataposright][0] = pokemons[0].hp;
                datasetbarright[dataposright][1] = pokemons[0].attack;
                datasetbarright[dataposright][2] = pokemons[0].defense;
                datasetbarright[dataposright][3] = pokemons[0].sp_attack;
                datasetbarright[dataposright][4] = pokemons[0].sp_defense;
                datasetbarright[dataposright][5] = pokemons[0].speed;
                dataposright++;
                //console.log(dataset);
                boxesright.transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                    .attr("stroke",function (d) {
                        return typeColor(d[3])
                    })
                    .attr("stroke-width","5");
                boxlabelsright.text(function (d) {
                    //console.log("Pokemon:", d[1]);
                    return d[1];
                })
                    .transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                rectbackright.transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                rectfrontright.transition()
                    .duration(1000)
                    .attr("width", function (d) {
                        return (d[2]);
                    })
                    .attr("opacity", 1);

                typesright
                    .html(function (d) {
                        if (d[3] == ''){
                            return '';
                        }
                        else if (d[4] == ''){
                            return addType(d[3])+'<br>';
                        }else{
                            return addType(d[3])+'<br>'+addType(d[4]);
                        }
                    });
                hplabelsright.text(function (d) {
                    return "HP: "+d[2]+"/255";
                    })
                    .transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                $('#imageright' + (dataposright-1) + ' image').attr("xlink:href", frontPath + datasetright[dataposright-1][0] + '.png');

            }
        });
    }else{
        alert("You have reach the maximum limit to your pokemon")

    }

});




// $("#tags").keyup(function(event){
//     if(event.keyCode == 13){
//         $("#sb").click();
//     }
// });

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

    $( "#pokeinput" ).autocomplete({
      source: pokemonNames
    });

});



function addType(type){
    switch(type) {
        case 'Fire':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge fireBadge">Fire</span>';
            break;
        case 'Water':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge waterBadge">Water</span>';
            break;
        case 'Grass':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge grassBadge">Grass</span>';
            break;
        case 'Fighting':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge fightingBadge">Fighting</span>';
            break;
        case 'Steel':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge steelBadge">Steel</span>';
            break;
        case 'Electric':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge electricBadge">Electric</span>';
            break;
        case 'Ice':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge iceBadge">Ice</span>';
            break;
        case 'Normal':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge normalBadge">Normal</span>';
            break;
        case 'Bug':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge bugBadge">Bug</span>';
            break;
        case 'Dragon':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge dragonBadge">Dragon</span>';
            break;
        case 'Psychic':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge psychicBadge">Psychic</span>';
            break;
        case 'Ghost':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge ghostBadge">Ghost</span>';
            break;
        case 'Poison':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge poisonBadge">Poison</span>';
            break;
        case 'Fairy':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge fairyBadge">Fairy</span>';
            break;
        case 'Dark':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge darkBadge">Dark</span>';
            break;
        case 'Rock':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge rockBadge">Rock</span>';
            break;
        case 'Ground':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge groundBadge">Ground</span>';
            break;
        case 'Flying':
            return '<span style="width: auto; height: 20px;font-size: 10pt" class="badge flyingBadge">Flying</span>';
            break;
        default:
            break;
    }
}


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



