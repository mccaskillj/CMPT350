/**
 * Created by carmichael on 2017-03-06.
 */

function showPokemon() {
        var selectPoke = document.getElementById("tags").value
        console.log(selectPoke)

        $.ajax({
        type: "GET",
        url: 'ajax/get_single_pokemon/', //the script to call to get data
        data: {"name": selectPoke},
        dataType: 'JSON',                //data format
        success: function(pokemons) {
            var dict = [];
            var unwanted = ['color', 'name', 'id', ]

            var id = pokemons[0]['id']

            $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
            $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + id + '.png');

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
            // d3 stuff
            var width = 460,
                height = 300;

            var y = d3.scale.linear()
                .range([height, 0]);

            var chart = d3.select(".singleChart")
                .attr("width", width)
                .attr("height", height);

            d3.json(dict, type, function(error, data) {
                y.domain([0, d3.max(data, function(d) { return d.value; })]);

                var barWidth = width / data.length;

                var bar = chart.selectAll("g")
                  .data(data)
                .enter().append("g")
                  .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

                bar.append("rect")
                  .attr("y", function(d) { return y(d.value); })
                  .attr("height", function(d) { return height - y(d.value); })
                  .attr("width", barWidth - 1);

                bar.append("text")
                  .attr("x", barWidth / 2)
                  .attr("y", function(d) { return y(d.value) + 3; })
                  .attr("dy", ".75em")
                  .text(function(d) { return d.value; });
            });

            function type(d) {
                d.value = +d.value; // coerce to number
                return d;
            }

        },
        failure: function(pokemons) {
            alert('Got an error dude');
        }
    });

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

$( function() {
    var pokemonNames = []

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
} );


$('#shinny').on("click",function(){
    var id = document.getElementById('pokedex').innerHTML;
    console.log(id);
    $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/' + id + '.png');
    $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/' + id + '.png');
});

$('#normal').on("click",function(){
    var id = document.getElementById('pokedex').innerHTML;
    console.log(id);
    $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
    $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + id + '.png');
});