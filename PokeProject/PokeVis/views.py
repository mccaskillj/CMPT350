from django.http import HttpResponse
from django.shortcuts import render
from PokeVis.models import Pokemon
from django.core import serializers
from django.db.models import Q
from PokeVis.poke import Poke
from PokeVis.searchData import SearchData

import json

# Create your views here.
from django.views import generic

'''
class KenView(generic.TemplateView):
    template_name = 'ken.html'
    '''
def KenView(request):
    pokemons = Pokemon.objects.filter(generation='1')
    data = serializers.serialize("json", pokemons)
    colors = ['Green', 'Red', 'Blue', 'White', 'Brown', 'Yellow', 'Purple', 'Pink', 'Grey', 'Black']
    types = ["Fire", "Water", "Grass", "Bug", "Ghost", "Electric", "Fairy", "Dragon", "Poison",
             "Rock", "Steel", "Normal", "Fighting", "Ground", "Psychic"]
    return render(request, 'ken.html', {'file': data, 'color': colors, 'types': types})


class JordanView(generic.TemplateView):
    template_name = 'jordan.html'


class LiamView(generic.TemplateView):
        template_name = 'liam.html'


class GrahamView(generic.TemplateView):
    template_name = 'graham.html'

'''
class SearchView(generic.TemplateView):
    template_name = 'search.html'
'''


def SearchView(request):
    types = ["Fire", "Water", "Grass", "Bug", "Ghost", "Electric", "Fairy", "Dragon", "Poison",
             "Rock", "Steel", "Normal", "Fighting", "Ground", "Psychic"]
    colors = ['Green', 'Red', 'Blue', 'White', 'Brown', 'Yellow', 'Purple', 'Pink', 'Grey', 'Black']
    pokemons = Pokemon.objects.all()
    data = serializers.serialize("json", pokemons)
    return render(request, 'search.html', {'types': types, 'colors': colors, 'pokemon': data})



def OverviewView(request):
    return render(request, 'overview.html', {})


def PcomparisionView(request):
    temp_array = []
    pokemons = Pokemon.objects.all()

    for item in pokemons:
        poke = Poke(item.number, item.total, item.hp, item.attack, item.defense, item.special_attack,
                    item.special_defense, item.speed, item.weight_kg, item.height_m, item.color, item.name)
        temp_array.append(poke)

    return render(request, 'pcomparision.html', {'pokemon': temp_array})


def TcomparisionView(request):
    return render(request, 'tcomparision.html', {})


def BattleView(request):
    return render(request, 'battle.html', {})


def get_filter_options(request):
    temp_array = []
    type_val = request.GET.get('type', None)

    if type_val == 'All Types':
        pokemons = Pokemon.objects.all()
    else:
        pokemons = Pokemon.objects.filter(type_1=type_val)

    for item in pokemons:
        poke = Poke(item.number, item.total, item.hp, item.attack, item.defense, item.special_attack,
                    item.special_defense, item.speed, item.weight_kg, item.height_m, item.color, item.name)
        temp_array.append(poke)

    json_string = json.dumps([ob.__dict__ for ob in temp_array])

    return HttpResponse(json_string, content_type='application/json')


def get_pokemon(request):
    temp_array = []

    pokemons = Pokemon.objects.all()

    for item in pokemons:
        poke = Poke(item.number, item.total, item.hp, item.attack, item.defense, item.special_attack,
                    item.special_defense, item.speed, item.weight_kg, item.height_m, item.color, item.name)
        temp_array.append(poke)

    json_string = json.dumps([ob.__dict__ for ob in temp_array])

    return HttpResponse(json_string, content_type='application/json')


def get_single_pokemon(request):
    temp_array = []
    name_val = request.GET.get('name', None)
    pokemons = Pokemon.objects.filter(name=name_val)

    for item in pokemons:
        poke = Poke(item.number, item.total, item.hp, item.attack, item.defense, item.special_attack,
                    item.special_defense, item.speed, item.weight_kg, item.height_m, item.color, item.name,
                    item.egg_group_1, item.egg_group_2, item.generation, item.catch_rate, item.is_legendary,
                    item.body_style, item.type_1, item.type_2)
        temp_array.append(poke)

    json_string = json.dumps([ob.__dict__ for ob in temp_array])

    return HttpResponse(json_string, content_type='application/json')


def get_filtered_pokemon(request):
    temp_array = []
    pokemons = []
    new = []

    gen_val = request.GET.get('gen', None)
    type_val = request.GET.get('type', None)
    color_val = request.GET.get('color', None)
    weight_val = request.GET.get('weight', None)
    height_val = request.GET.get('height', None)
    hp_val = request.GET.get('hp', None)
    attack_val = request.GET.get('attack', None)
    defense_val = request.GET.get('defense', None)
    sp_attack_val = request.GET.get('sp_attack', None)
    sp_defense_val = request.GET.get('sp_defense', None)
    speed_val = request.GET.get('speed', None)
    radio = request.GET.get('radio', None)
    print(gen_val)

    pokemons = Pokemon.objects.all()

    if gen_val != "All Generations":
        temp = gen_val.split(" ")
        new = pokemons.filter(generation=temp[1])
        print("Gen: ", new.count())
    else:
        new = pokemons
    if type_val != "All Types":
        new = new.filter(Q(type_1=type_val) | Q(type_2=type_val))
        print("type: ",new.count())
    if color_val != "All Colors":
        new = new.filter(color=color_val)
        print("color: ",new.count())

    # Weight
    temp = weight_val.split(" - ")
    new = new.filter(Q(weight_kg__gte=int(temp[0])) & Q(weight_kg__lte=temp[1]))

    # Height
    temp = height_val.split(" - ")
    new = new.filter(Q(height_m__gte=int(temp[0])) & Q(height_m__lte=temp[1]))

    # Hp
    temp = hp_val.split(" - ")
    new = new.filter(Q(hp__gte=int(temp[0])) & Q(hp__lte=temp[1]))

    # Attack
    temp = attack_val.split(" - ")
    new = new.filter(Q(attack__gte=int(temp[0])) & Q(attack__lte=temp[1]))

    # Defense
    temp = defense_val.split(" - ")
    new = new.filter(Q(defense__gte=int(temp[0])) & Q(defense__lte=temp[1]))

    # Sp Attack
    temp = sp_attack_val.split(" - ")
    new = new.filter(Q(special_attack__gte=int(temp[0])) & Q(special_attack__lte=temp[1]))

    # Sp Defense
    temp = sp_defense_val.split(" - ")
    new = new.filter(Q(special_defense__gte=int(temp[0])) & Q(special_defense__lte=temp[1]))

    # Speed
    temp = speed_val.split(" - ")
    new = new.filter(Q(speed__gte=int(temp[0])) & Q(speed__lte=temp[1]))

    print("hp: ", new.count())

    # Passing back data: what ever radio button is selected -> stat value. name, pokedex, height, weight

    for item in new:
        if radio == "total":
            poke = SearchData(item.number, item.total, item.weight_kg, item.height_m, item.name)
        elif radio == "hp":
            poke = SearchData(item.number, item.hp, item.weight_kg, item.height_m, item.name)
        elif radio == "attack":
            poke = SearchData(item.number, item.attack, item.weight_kg, item.height_m, item.name)
        elif radio == "defense":
            poke = SearchData(item.number, item.defense, item.weight_kg, item.height_m, item.name)
        elif radio == "sp_attack":
            poke = SearchData(item.number, item.special_attack, item.weight_kg, item.height_m, item.name)
        elif radio == "sp_defense":
            poke = SearchData(item.number, item.special_defense, item.weight_kg, item.height_m, item.name)
        temp_array.append(poke)

    json_string = json.dumps([ob.__dict__ for ob in temp_array])

    return HttpResponse(json_string, content_type='application/json')


def get_data(request):
    pokemonDictionary = {"name": "Pokemon"}
    tempGendict = []
    type = set()
    size = 1000

    for i in range(1, 7):
        pokelist = Pokemon.objects.filter(generation=str(i))
        for j in pokelist:
            type.add(j.type_1)
        tempTypeArray = []
        for ty in type:
            refinedlist = Pokemon.objects.filter(generation=str(i), type_1=ty)
            temp = []
            for k in refinedlist:
                temp.append({"name": k.name, "size": size})
            tempTypeArray.append({"name": ty, "children": temp})

        tempGendict.append({"name": "Generation " + str(i), "children": tempTypeArray})

        type.clear()

    pokemonDictionary["children"] = tempGendict

    json_string = json.dumps(pokemonDictionary)

    print(json_string)

    jsonFlare = {
 "name": "flare",
 "children": [
  {
   "name": "analytics",
   "children": [
    {
     "name": "cluster",
     "children": [
      {"name": "AgglomerativeCluster", "size": 3938},
      {"name": "CommunityStructure", "size": 3812},
      {"name": "HierarchicalCluster", "size": 6714},
      {"name": "MergeEdge", "size": 743}
     ]
    },
    {
     "name": "graph",
     "children": [
      {"name": "BetweennessCentrality", "size": 3534},
      {"name": "LinkDistance", "size": 5731},
      {"name": "MaxFlowMinCut", "size": 7840},
      {"name": "ShortestPaths", "size": 5914},
      {"name": "SpanningTree", "size": 3416}
     ]
    },
    {
     "name": "optimization",
     "children": [
      {"name": "AspectRatioBanker", "size": 7074}
     ]
    }
   ]
  },
  {
   "name": "animate",
   "children": [
    {"name": "Easing", "size": 17010},
    {"name": "FunctionSequence", "size": 5842},
    {
     "name": "interpolate",
     "children": [
      {"name": "ArrayInterpolator", "size": 1983},
      {"name": "ColorInterpolator", "size": 2047},
      {"name": "DateInterpolator", "size": 1375},
      {"name": "Interpolator", "size": 8746},
      {"name": "MatrixInterpolator", "size": 2202},
      {"name": "NumberInterpolator", "size": 1382},
      {"name": "ObjectInterpolator", "size": 1629},
      {"name": "PointInterpolator", "size": 1675},
      {"name": "RectangleInterpolator", "size": 2042}
     ]
    },
    {"name": "ISchedulable", "size": 1041},
    {"name": "Parallel", "size": 5176},
    {"name": "Pause", "size": 449},
    {"name": "Scheduler", "size": 5593},
    {"name": "Sequence", "size": 5534},
    {"name": "Transition", "size": 9201},
    {"name": "Transitioner", "size": 19975},
    {"name": "TransitionEvent", "size": 1116},
    {"name": "Tween", "size": 6006}
   ]
  },
  {
   "name": "data",
   "children": [
    {
     "name": "converters",
     "children": [
      {"name": "Converters", "size": 721},
      {"name": "DelimitedTextConverter", "size": 4294},
      {"name": "GraphMLConverter", "size": 9800},
      {"name": "IDataConverter", "size": 1314},
      {"name": "JSONConverter", "size": 2220}
     ]
    },
    {"name": "DataField", "size": 1759},
    {"name": "DataSchema", "size": 2165},
    {"name": "DataSet", "size": 586},
    {"name": "DataSource", "size": 3331},
    {"name": "DataTable", "size": 772},
    {"name": "DataUtil", "size": 3322}
   ]
  },
  {
   "name": "display",
   "children": [
    {"name": "DirtySprite", "size": 8833},
    {"name": "LineSprite", "size": 1732},
    {"name": "RectSprite", "size": 3623},
    {"name": "TextSprite", "size": 10066}
   ]
  },
  {
   "name": "flex",
   "children": [
    {"name": "FlareVis", "size": 4116}
   ]
  },
  {
   "name": "physics",
   "children": [
    {"name": "DragForce", "size": 1082},
    {"name": "GravityForce", "size": 1336},
    {"name": "IForce", "size": 319},
    {"name": "NBodyForce", "size": 10498},
    {"name": "Particle", "size": 2822},
    {"name": "Simulation", "size": 9983},
    {"name": "Spring", "size": 2213},
    {"name": "SpringForce", "size": 1681}
   ]
  },
  {
   "name": "query",
   "children": [
    {"name": "AggregateExpression", "size": 1616},
    {"name": "And", "size": 1027},
    {"name": "Arithmetic", "size": 3891},
    {"name": "Average", "size": 891},
    {"name": "BinaryExpression", "size": 2893},
    {"name": "Comparison", "size": 5103},
    {"name": "CompositeExpression", "size": 3677},
    {"name": "Count", "size": 781},
    {"name": "DateUtil", "size": 4141},
    {"name": "Distinct", "size": 933},
    {"name": "Expression", "size": 5130},
    {"name": "ExpressionIterator", "size": 3617},
    {"name": "Fn", "size": 3240},
    {"name": "If", "size": 2732},
    {"name": "IsA", "size": 2039},
    {"name": "Literal", "size": 1214},
    {"name": "Match", "size": 3748},
    {"name": "Maximum", "size": 843},
    {
     "name": "methods",
     "children": [
      {"name": "add", "size": 593},
      {"name": "and", "size": 330},
      {"name": "average", "size": 287},
      {"name": "count", "size": 277},
      {"name": "distinct", "size": 292},
      {"name": "div", "size": 595},
      {"name": "eq", "size": 594},
      {"name": "fn", "size": 460},
      {"name": "gt", "size": 603},
      {"name": "gte", "size": 625},
      {"name": "iff", "size": 748},
      {"name": "isa", "size": 461},
      {"name": "lt", "size": 597},
      {"name": "lte", "size": 619},
      {"name": "max", "size": 283},
      {"name": "min", "size": 283},
      {"name": "mod", "size": 591},
      {"name": "mul", "size": 603},
      {"name": "neq", "size": 599},
      {"name": "not", "size": 386},
      {"name": "or", "size": 323},
      {"name": "orderby", "size": 307},
      {"name": "range", "size": 772},
      {"name": "select", "size": 296},
      {"name": "stddev", "size": 363},
      {"name": "sub", "size": 600},
      {"name": "sum", "size": 280},
      {"name": "update", "size": 307},
      {"name": "variance", "size": 335},
      {"name": "where", "size": 299},
      {"name": "xor", "size": 354},
      {"name": "_", "size": 264}
     ]
    },
    {"name": "Minimum", "size": 843},
    {"name": "Not", "size": 1554},
    {"name": "Or", "size": 970},
    {"name": "Query", "size": 13896},
    {"name": "Range", "size": 1594},
    {"name": "StringUtil", "size": 4130},
    {"name": "Sum", "size": 791},
    {"name": "Variable", "size": 1124},
    {"name": "Variance", "size": 1876},
    {"name": "Xor", "size": 1101}
   ]
  },
  {
   "name": "scale",
   "children": [
    {"name": "IScaleMap", "size": 2105},
    {"name": "LinearScale", "size": 1316},
    {"name": "LogScale", "size": 3151},
    {"name": "OrdinalScale", "size": 3770},
    {"name": "QuantileScale", "size": 2435},
    {"name": "QuantitativeScale", "size": 4839},
    {"name": "RootScale", "size": 1756},
    {"name": "Scale", "size": 4268},
    {"name": "ScaleType", "size": 1821},
    {"name": "TimeScale", "size": 5833}
   ]
  },
  {
   "name": "util",
   "children": [
    {"name": "Arrays", "size": 8258},
    {"name": "Colors", "size": 10001},
    {"name": "Dates", "size": 8217},
    {"name": "Displays", "size": 12555},
    {"name": "Filter", "size": 2324},
    {"name": "Geometry", "size": 10993},
    {
     "name": "heap",
     "children": [
      {"name": "FibonacciHeap", "size": 9354},
      {"name": "HeapNode", "size": 1233}
     ]
    },
    {"name": "IEvaluable", "size": 335},
    {"name": "IPredicate", "size": 383},
    {"name": "IValueProxy", "size": 874},
    {
     "name": "math",
     "children": [
      {"name": "DenseMatrix", "size": 3165},
      {"name": "IMatrix", "size": 2815},
      {"name": "SparseMatrix", "size": 3366}
     ]
    },
    {"name": "Maths", "size": 17705},
    {"name": "Orientation", "size": 1486},
    {
     "name": "palette",
     "children": [
      {"name": "ColorPalette", "size": 6367},
      {"name": "Palette", "size": 1229},
      {"name": "ShapePalette", "size": 2059},
      {"name": "SizePalette", "size": 2291}
     ]
    },
    {"name": "Property", "size": 5559},
    {"name": "Shapes", "size": 19118},
    {"name": "Sort", "size": 6887},
    {"name": "Stats", "size": 6557},
    {"name": "Strings", "size": 22026}
   ]
  },
  {
   "name": "vis",
   "children": [
    {
     "name": "axis",
     "children": [
      {"name": "Axes", "size": 1302},
      {"name": "Axis", "size": 24593},
      {"name": "AxisGridLine", "size": 652},
      {"name": "AxisLabel", "size": 636},
      {"name": "CartesianAxes", "size": 6703}
     ]
    },
    {
     "name": "controls",
     "children": [
      {"name": "AnchorControl", "size": 2138},
      {"name": "ClickControl", "size": 3824},
      {"name": "Control", "size": 1353},
      {"name": "ControlList", "size": 4665},
      {"name": "DragControl", "size": 2649},
      {"name": "ExpandControl", "size": 2832},
      {"name": "HoverControl", "size": 4896},
      {"name": "IControl", "size": 763},
      {"name": "PanZoomControl", "size": 5222},
      {"name": "SelectionControl", "size": 7862},
      {"name": "TooltipControl", "size": 8435}
     ]
    },
    {
     "name": "data",
     "children": [
      {"name": "Data", "size": 20544},
      {"name": "DataList", "size": 19788},
      {"name": "DataSprite", "size": 10349},
      {"name": "EdgeSprite", "size": 3301},
      {"name": "NodeSprite", "size": 19382},
      {
       "name": "render",
       "children": [
        {"name": "ArrowType", "size": 698},
        {"name": "EdgeRenderer", "size": 5569},
        {"name": "IRenderer", "size": 353},
        {"name": "ShapeRenderer", "size": 2247}
       ]
      },
      {"name": "ScaleBinding", "size": 11275},
      {"name": "Tree", "size": 7147},
      {"name": "TreeBuilder", "size": 9930}
     ]
    },
    {
     "name": "events",
     "children": [
      {"name": "DataEvent", "size": 2313},
      {"name": "SelectionEvent", "size": 1880},
      {"name": "TooltipEvent", "size": 1701},
      {"name": "VisualizationEvent", "size": 1117}
     ]
    },
    {
     "name": "legend",
     "children": [
      {"name": "Legend", "size": 20859},
      {"name": "LegendItem", "size": 4614},
      {"name": "LegendRange", "size": 10530}
     ]
    },
    {
     "name": "operator",
     "children": [
      {
       "name": "distortion",
       "children": [
        {"name": "BifocalDistortion", "size": 4461},
        {"name": "Distortion", "size": 6314},
        {"name": "FisheyeDistortion", "size": 3444}
       ]
      },
      {
       "name": "encoder",
       "children": [
        {"name": "ColorEncoder", "size": 3179},
        {"name": "Encoder", "size": 4060},
        {"name": "PropertyEncoder", "size": 4138},
        {"name": "ShapeEncoder", "size": 1690},
        {"name": "SizeEncoder", "size": 1830}
       ]
      },
      {
       "name": "filter",
       "children": [
        {"name": "FisheyeTreeFilter", "size": 5219},
        {"name": "GraphDistanceFilter", "size": 3165},
        {"name": "VisibilityFilter", "size": 3509}
       ]
      },
      {"name": "IOperator", "size": 1286},
      {
       "name": "label",
       "children": [
        {"name": "Labeler", "size": 9956},
        {"name": "RadialLabeler", "size": 3899},
        {"name": "StackedAreaLabeler", "size": 3202}
       ]
      },
      {
       "name": "layout",
       "children": [
        {"name": "AxisLayout", "size": 6725},
        {"name": "BundledEdgeRouter", "size": 3727},
        {"name": "CircleLayout", "size": 9317},
        {"name": "CirclePackingLayout", "size": 12003},
        {"name": "DendrogramLayout", "size": 4853},
        {"name": "ForceDirectedLayout", "size": 8411},
        {"name": "IcicleTreeLayout", "size": 4864},
        {"name": "IndentedTreeLayout", "size": 3174},
        {"name": "Layout", "size": 7881},
        {"name": "NodeLinkTreeLayout", "size": 12870},
        {"name": "PieLayout", "size": 2728},
        {"name": "RadialTreeLayout", "size": 12348},
        {"name": "RandomLayout", "size": 870},
        {"name": "StackedAreaLayout", "size": 9121},
        {"name": "TreeMapLayout", "size": 9191}
       ]
      },
      {"name": "Operator", "size": 2490},
      {"name": "OperatorList", "size": 5248},
      {"name": "OperatorSequence", "size": 4190},
      {"name": "OperatorSwitch", "size": 2581},
      {"name": "SortOperator", "size": 2023}
     ]
    },
    {"name": "Visualization", "size": 16540}
   ]
  }
 ]
}

    json_string2 = json.dumps(jsonFlare)
    #return HttpResponse(json_string, content_type='application/json')
    return HttpResponse(json_string2, content_type='application/json')
