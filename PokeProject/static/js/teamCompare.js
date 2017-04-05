//ID, Name , HP, Type 1, Type 2, x rating
var dataset = [[0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0]];

// var dataset = [[1,"Bulbasaur",40,"Grass","Poison",0],
//     [4,"Charmander",40,"Fire","",0],
//     [6,"Charizard",70,"Fire","Flying",0],
//     [7,"Squirtle",40,"Water","",0],
//     [9,"Blastoise",100,"Water","",0],
//     [644,"Zekrom",100,"Dragon","Electric",0]];

// var datasetright = [[1,"Bulbasaur",40,"Grass","Poison",0],
//     [4,"Charmander",40,"Fire","",0],
//     [6,"Charizard",70,"Fire","Flying",0],
//     [7,"Squirtle",40,"Water","",0],
//     [9,"Blastoise",100,"Water","",0],
//     [644,"Zekrom",100,"Dragon","Electric",0]];

var datasetright = [[0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0],
    [0,"",0,"","",0]];


//Pokemon 1 stats, Pokemon 2 stats, etc
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


//######################################################################################################################
//  Left upper area
//######################################################################################################################

var maingroup = svg.selectAll("g.main")
        .data(dataset)
        .enter()
        .append("g")
        .attr("id",function (d,i) {
            //console.log("leftbox"+i);
            return "leftmain"+i;
        })
        .attr("opacity", function (d) {
            if (d[0] != 0) {
                return 1;
            } else {
                return 0;
            }
        })
        .on("mouseover", function (d, i){
            var currenttype1 = d[3];
            var currenttype2 = d[4];
            //console.log(dataset);
            //console.log(datasetright);
            for (i=0; i < 6 ; i++){
                if (datasetright[i][0] != 0){
                    //console.log(datasetright[i][1]);
                    var curval = typeChart[currenttype1][datasetright[i][3]];
                    curval = curval/2;
                    datasetright[i][5] = curval;
                    //console.log("cur1",curval);
                    if (datasetright[i][4] != ""){
                        var curval2 = typeChart[currenttype1][datasetright[i][4]];
                        curval2 = curval2/2;
                        datasetright[i][5] *= curval2;
                        //console.log("cur2",curval2);
                    }
                    if (currenttype2 != ""){
                        if (datasetright[i][0] != 0) {
                            var curval3 = typeChart[currenttype2][datasetright[i][3]];
                            curval3 = curval3/2;
                            datasetright[i][5] *= curval3;
                            //console.log("cur3",curval3);
                            if (datasetright[i][4] != ""){
                                var curval4 = typeChart[currenttype2][datasetright[i][4]];
                                curval4 = curval4/2;
                                datasetright[i][5] *= curval4;
                                //console.log("cur4",curval4);
                            }
                        }

                    }
                    d3.select("#rightbox"+i).attr("opacity",function (d,i) {
                        if (datasetright[0][0] != 0 && dataset[0][0] == 0){
                            return 0;
                        }else{
                            return 1;
                        }
                    })
                        .select("rect").attr("fill",function(){
                        if (datasetright[i][5] == 4){
                            return "#73d216";
                        }else if (datasetright[i][5] == 2){
                            return "#4e9a06";
                        }else if (datasetright[i][5] == 0.5){
                            return "#a40000";
                        }else if (datasetright[i][5] == 0.25) {
                            return "#7c0000";
                        }else{
                            return "#ffffff";
                        }
                    });
                    d3.select("#rightbox"+i).select("text").text(function () {
                        if (datasetright[i][5] == 0.25){
                            return "¼"+"x"
                        }else if (datasetright[i][5] == 0.5){
                            return "½"+"x"
                        }else {
                            return datasetright[i][5] + "x"
                        }
                    });
                }
            }
        })
        .on("mouseout", function (d, i){
            for (i=0; i < 6 ; i++){
                datasetright[i][5] = 0;
                d3.select("#rightbox"+i).attr("opacity",0)
            }

        })
    ;

// var boxes = svg.selectAll("rect").data(dataset);
//     boxes.enter()
maingroup
    .append("rect")
    .attr("x", 10)
    .attr("id","leftboxes")
    .attr("y", function (d,i) {
        return ((110*i))
    })
    .attr("width", 450)
    .attr("height", 105)
    .attr("fill", "#bdbec0")
    .attr("stroke",function (d) {
        if (d[0] != 0){
            return typeColor(d[3])
        }else{
            return "black"
        }

    })
    .attr("stroke-width","5")
    .attr("shape-rendering","crispEdges")
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    })

;


// var boxlabels = svg.selectAll("text")
//     .data(dataset);
    //console.log(dataset[0].name);
    // boxlabels.enter()
maingroup
    .append("text")
    .text(function (d) {
        return d[1];
    })
    .attr("id","lefttext")
    .attr("text-anchor","left")
    .attr("x",20)
    .attr("y",function(d,i){
        return ((110*i)+30)
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    })
    .attr("fill", "black");

// var rectback = svg.selectAll('rect.background')
//     .data(dataset);
//     rectback.enter()
maingroup
    .append("rect")
    .attr("id","leftbackrec")
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
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    });

// var rectfront = svg.selectAll('rect.bar')
//     .data(dataset);
//     rectfront.enter()
maingroup
    .append("rect")
    .attr("id","leftfrontrec")
    .classed("bar",true)
    .attr("x",170)
    .attr("y",function(d,i){
        return ((110*i)+55)
    })
    .attr('height', 30)
    .attr("width", function (d) {
        return (d[2]);
    })
    .attr("fill","red")
    .attr("shape-rendering","crispEdges")
    .attr("stroke","black")
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    });

// var circles = svg.selectAll('circle')
//     .data(dataset)
//     .enter()
maingroup
    .append("circle")
    .attr("id","leftcircles")
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
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    });


// var types = svg.selectAll("foreignObject.left")
//     .data(dataset)
//     .enter()
maingroup
    .append("foreignObject")
    .attr('id','fleft')
    .attr("width", 20)
    .attr("height", 5)
    .attr('x',180)
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    })
    .attr("y", function (d,i) {
        return ((110*i)+7)
    })
    .append("xhtml:test1")
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

// var hplabels = svg.selectAll("text.hp")
//     .data(dataset)
//     .enter()
maingroup
    .append("text")
    .text(function (d) {
        return "HP: "+d[2]+"/255";
    })
    .attr('id','hpleft')
    .attr("text-anchor","right")
    .attr("x",325)
    .attr("y",function(d,i){
        return ((110*i)+50)
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    })
    .attr("fill", "black");

for (i=0; i<6; i++){
    $('#imageleft' + (i) + ' image').attr("xlink:href", frontPath + dataset[i][0] + '.png');
}


//######################################################################################################################
//  Left hover squares
//######################################################################################################################


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


//######################################################################################################################
//  Left bar chart
//######################################################################################################################

var margin = {top: 20, right: 0, bottom: 60, left: 40},
        width = 570 - margin.left - margin.right,
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
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-30)")
    .style("text-anchor", "end");

svgbar.append("g")
        .attr("class", "y axis")
        //.attr("transform", "translate(0,0)")
        .call(yAxis);


//######################################################################################################################
//  Right top area
//######################################################################################################################



var maingroupright = svg.selectAll("g.mainright")
        .data(datasetright)
        .enter()
        .append("g")
        .attr("id",function (d,i) {
            return "rightmain"+i;
        })
        .attr("opacity", function (d) {
            if (d[0] != 0) {
                return 1;
            } else {
                return 0;
            }
        })
        .on("mouseover", function (d, i){
            var currenttype1 = d[3];
            var currenttype2 = d[4];
            for (i=0; i < 6 ; i++){
                if (dataset[i][0] != 0){
                    //console.log(dataset[i][1]);
                    var curval = typeChart[currenttype1][dataset[i][3]];
                    curval = curval/2;
                    dataset[i][5] = curval;
                    //console.log("cur1",curval);
                    if (dataset[i][4] != ""){
                        var curval2 = typeChart[currenttype1][dataset[i][4]];
                        curval2 = curval2/2;
                        dataset[i][5] *= curval2;
                        //console.log("cur2",curval2);
                    }
                    if (currenttype2 != ""){
                        if (dataset[i][0] != 0) {
                            var curval3 = typeChart[currenttype2][dataset[i][3]];
                            curval3 = curval3/2;
                            dataset[i][5] *= curval3;
                            //console.log("cur3",curval3);
                            if (dataset[i][4] != ""){
                                var curval4 = typeChart[currenttype2][dataset[i][4]];
                                curval4 = curval4/2;
                                dataset[i][5] *= curval4;
                                //console.log("cur4",curval4);
                            }
                        }

                    }
                    d3.select("#leftbox"+i).attr("opacity",1).select("rect").attr("fill",function(){
                        if (dataset[i][5] == 4){
                            return "#73d216";
                        }else if (dataset[i][5] == 2){
                            return "#4e9a06";
                        }else if (dataset[i][5] == 0.5){
                            return "#a40000";
                        }else if (dataset[i][5] == 0.25) {
                            return "#7c0000";
                        }else{
                            return "#ffffff";
                        }
                    });
                    d3.select("#leftbox"+i).select("text").text(function () {
                        if (dataset[i][5] == 0.25){
                            return "¼"+"x"
                        }else if (dataset[i][5] == 0.5){
                            return "½"+"x"
                        }else {
                            return dataset[i][5] + "x"
                        }
                    });
                }
            }
        })
        .on("mouseout", function (d, i){
            for (i=0; i < 6 ; i++){
                dataset[i][5] = 0;
                d3.select("#leftbox"+i).attr("opacity",0)
            }

        })
    ;

// var boxesright = svg.selectAll("rect.right").data(datasetright);
// boxesright.enter()
maingroupright
    .append("rect")
    .attr("id","rightboxes")
    .attr("x", 724)
    .attr("y", function (d,i) {
        return ((110*i))
    })
    .attr("width", 450)
    .attr("height", 105)
    .attr("fill", "#bdbec0")
    .attr("stroke",function (d) {
        if (d[0] != 0){
            return typeColor(d[3])
        }else{
            return "black"
        }

    })
    .attr("stroke-width","5")
    .attr("shape-rendering","crispEdges")
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    });

// var boxlabelsright = svg.selectAll("text.right")
//     .data(datasetright);
// //console.log(dataset[0].name);
// boxlabelsright.enter()
maingroupright
    .append("text")
    .text(function (d) {
        return d[1];
    })
    .attr("id","righttext")
    .attr("text-anchor","left")
    .attr("x",734)
    .attr("y",function(d,i){
        return ((110*i)+30)
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    })
    .attr("fill", "black");

// var rectbackright = svg.selectAll('rect.backgroundright')
//     .data(datasetright);
// rectbackright.enter()
maingroupright
    .append("rect")
    .attr("id","rightbackrec")
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
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    });

// var rectfrontright = svg.selectAll('rect.barright')
//     .data(datasetright);
// rectfrontright.enter()
maingroupright
    .append("rect")
    .attr("id","rightfrontrec")
    .classed("bar",true)
    .attr("x",884)
    .attr("y",function(d,i){
        return ((110*i)+55)
    })
    .attr('height', 30)
    .attr("width", function (d) {
        return (d[2]);
    })
    .attr("fill","red")
    .attr("shape-rendering","crispEdges")
    .attr("stroke","black")
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    });

// var circlesright = svg.selectAll('circle.right')
//     .data(datasetright)
//     .enter()
maingroupright
    .append("circle")
    .attr("id","rightcircles")
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
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    });

// var typesright = svg.selectAll("foreignObject.right")
//     .data(datasetright)
//     .enter()
maingroupright
    .append("foreignObject")
    .attr('id','fright')
    .attr("width", 20)
    .attr("height", 5)
    .attr('x',894)
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    })
    .attr("y", function (d,i) {
        return ((110*i)+7)
    })
    .append("xhtml:test")
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

// var hplabelsright = svg.selectAll("text.hpright")
//     .data(datasetright)
//     .enter()
maingroupright
    .append("text")
    .text(function (d) {
        return "HP: "+d[2]+"/255";
    })
    .attr('id','hpright')
    .attr("text-anchor","right")
    .attr("x",1039)
    .attr("y",function(d,i){
        return ((110*i)+50)
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("opacity", function (d) {
        if (d[0] != 0) {
            return 1;
        } else {
            return 0;
        }
    })
    .attr("fill", "black");

for (i=0; i<6; i++){
    $('#imageright' + (i) + ' image').attr("xlink:href", frontPath + datasetright[i][0] + '.png');
}

//######################################################################################################################
//  Right hover squares
//######################################################################################################################

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

//######################################################################################################################
//  Right bar chart
//######################################################################################################################

var marginright = {top: 20, right: 50, bottom: 60, left: 0},
        widthright = 570 - marginright.left - marginright.right,
        heightright = 700 - marginright.top - marginright.bottom;

var xright = d3.scale.ordinal()
        .rangeRoundBands([0, widthright], .35);

var yright = d3.scale.linear()
        .rangeRound([heightright, 0]);

var colorright = d3.scale.category10();

var xAxisright = d3.svg.axis()
        .scale(xright)
        .orient("bottom");

var yAxisright = d3.svg.axis()
    .scale(yright)
    .orient("left")
    .ticks(10, "%");

var svgbarright = d3.select('#chartarearight').append('svg').attr('height', heightright + marginright.top + marginright.bottom)
    .attr('width', widthright + marginright.left + marginright.right).append("g")
    .attr("transform", "translate(" + marginright.left + "," + marginright.top + ")");

var datamappedright = ["Hp", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"].map(function (d1,ii) {
    return datasetbarright.map(function (d,i) {
        return {x: items[i], y: d[ii]};
    })
});

var stackright = d3.layout.stack();
stackright(datamappedright);

xright.domain(datamappedright[0].map(function (d) {
    return d.x;
}));

yright.domain([0,
    d3.max(datamappedright[datamappedright.length - 1],
            function (d) { return d.y0 + d.y;})
    ])
  .nice();


var layerright = svgbarright.selectAll(".stack")
        .data(datamappedright)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
            return colorright(i);
        });

layerright.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return xright(d.x);
        })
        .attr("y", function (d) {
            return yright(d.y + d.y0);
        })
        .attr("height", function (d) {
            return yright(d.y0) - yright(d.y + d.y0);
        })
        .attr("width", xright.rangeBand());

svgbarright.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + heightright + ")")
    .call(xAxisright)
    .selectAll("text")
    .attr("transform", "rotate(-30)")
    .style("text-anchor", "end");

svgbarright.append("g")
    .attr("class", "y axis")
    //.attr("transform", "translate(0,0)")
    .call(yAxisright);



//######################################################################################################################
//  Left button
//######################################################################################################################

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
                // datasetbarleft[datapos][0] = pokemons[0].hp;
                // datasetbarleft[datapos][1] = pokemons[0].attack;
                // datasetbarleft[datapos][2] = pokemons[0].defense;
                // datasetbarleft[datapos][3] = pokemons[0].sp_attack;
                // datasetbarleft[datapos][4] = pokemons[0].sp_defense;
                // datasetbarleft[datapos][5] = pokemons[0].speed;
                // datasetbarleft.push({
                //         Hp: pokemons[0].hp,
                //         Attack: pokemons[0].attack,
                //         Defense: pokemons[0].defense,
                //         "Sp. Attack": pokemons[0].sp_attack,
                //         "Sp. Defense": pokemons[0].sp_defense,
                //         Speed: pokemons[0].speed
                //     });
                datapos++;
                //console.log(datasetbarleft);
                //boxes
                maingroup.transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                maingroup.select("#leftboxes")
                    .transition()
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
                // boxlabels
                maingroup.select("#lefttext")
                    .text(function (d) {
                    //console.log("Pokemon:", d[1]);
                    return d[1];
                    })
                    .transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        console.log(d[0]);
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                //rectback
                maingroup.select("#leftbackrec")
                    .transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                    if (d[0] != 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                //rectfront
                maingroup.select("#leftfrontrec")
                    .transition()
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

                maingroup.select("#leftcircles")
                    .transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                //types
                maingroup.select("#fleft")
                    .attr("opacity", function (d) {
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

                //hplabels
                maingroup.select("#hpleft")
                    .text(function (d) {
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
                //For loop to load from other page
                $('#imageleft' + (datapos-1) + ' image')
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                    .attr("xlink:href", frontPath + dataset[datapos-1][0] + '.png');


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

//######################################################################################################################
//  Right button
//######################################################################################################################

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

                // datasetbarright[dataposright][0] = pokemons[0].hp;
                // datasetbarright[dataposright][1] = pokemons[0].attack;
                // datasetbarright[dataposright][2] = pokemons[0].defense;
                // datasetbarright[dataposright][3] = pokemons[0].sp_attack;
                // datasetbarright[dataposright][4] = pokemons[0].sp_defense;
                // datasetbarright[dataposright][5] = pokemons[0].speed;

                datasetbarright[0][dataposright] = pokemons[0].hp;
                datasetbarright[1][dataposright] = pokemons[0].attack;
                datasetbarright[2][dataposright] = pokemons[0].defense;
                datasetbarright[3][dataposright] = pokemons[0].sp_attack;
                datasetbarright[4][dataposright] = pokemons[0].sp_defense;
                datasetbarright[5][dataposright] = pokemons[0].speed;

                dataposright++;


                maingroupright.transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                //console.log(dataset);
                //boxesright
                maingroupright.select("#rightboxes")
                    .transition()
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
                //boxlabelsright
                maingroupright.select("#righttext")
                    .text(function (d) {
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

                //rectbackright
                maingroupright.select("#rightbackrec")
                    .transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                maingroupright.select("#rightfrontrec")
                    .transition()
                    .duration(1000)
                    .attr("width", function (d) {
                        return (d[2]);
                    })
                    .attr("opacity", 1);

                maingroupright.select('#rightcircles')
                    .transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                //typesright
                maingroupright.select("#fright")
                    .attr("opacity", function (d) {
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
                //hplabelsright
                maingroupright.select("#hpright")
                    .text(function (d) {
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

                $('#imageright' + (dataposright-1) + ' image')
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                    .attr("xlink:href", frontPath + datasetright[dataposright-1][0] + '.png');

                var xright = d3.scale.ordinal()
                    .rangeRoundBands([0, widthright], .35);

                var yright = d3.scale.linear()
                    .rangeRound([heightright, 0]);

                var colorright = d3.scale.category10();

                var xAxisright = d3.svg.axis()
                    .scale(xright)
                    .orient("bottom");

                var yAxisright = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(10, "%");


                var datamappedright = ["Hp", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"].map(function (d1,ii) {
                    return datasetbarright.map(function (d,i) {
                        return {x: items[i], y: d[ii]};
                    })
                });

                // var datamapped = ["Hp", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"].map(function (d1,ii) {
                //     return datasetbarleft.map(function (d,i) {
                //         console.log("d[ii]: ",d[ii], "datapos-1: ",datapos-1, "i: ",i,"datasetbarleft[datapos-1+ii][i]: ", datasetbarleft[datapos-1+ii][i]);
                //         return {x: items[i], y: datasetbarleft[datapos-1+ii][i]};
                //     })
                // });

                var stackright = d3.layout.stack();
                stackright(datamappedright);

                console.log(datamappedright);

                xright.domain(datamappedright[0].map(function (d) {
                    return d.x;
                }));

                yright.domain([0,
                    d3.max(datamappedright[datamappedright.length - 1],
                        function (d) { return d.y0 + d.y;})
                ])
                    .nice();

                svgbarright.selectAll(".stack").remove();

                var layerright = svgbarright.selectAll(".stack")
                    .data(datamappedright)
                    .enter().append("g")
                    .attr("class", "stack")
                    .style("fill", function (d, i) {
                        return colorright(i);
                    });

                layerright.selectAll("rect")
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
                        return xright(d.x);
                    })
                    .attr("y", function (d) {
                        return yright(d.y + d.y0);
                    })
                    .attr("height", function (d) {
                        return yright(d.y0) - yright(d.y + d.y0);
                    })
                    .attr("width", xright.rangeBand());

                svgbarright.selectAll("g.x.axis")
                        .transition()
                        .delay(function (d, i) {
                            return i / 6 * 10;   // <-- Where the magic happens
                        })
                        .duration(1000)
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svgbarright.selectAll("g.y.axis")
                    .transition()
                        .delay(function (d, i) {
                            return i / 6 * 10;   // <-- Where the magic happens
                        })
                        .duration(1000)
                    .attr("transform", "translate(0,0)")
                    .call(yAxisright);

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

//######################################################################################################################
//  Autofill pokemon
//######################################################################################################################

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



