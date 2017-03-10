

class Poke:
    id = 0
    total = 0
    hp = 0
    attack = 0
    defense = 0
    sp_attack = 0
    sp_defense = 0
    speed = 0
    weight = 0
    height = 0
    color = ""
    name = ""
    egg_group_1 = ""
    egg_group_2 = ""
    generation = ""
    catch_rate = ""
    is_legendary = ""
    body_style = ""
    type_1 = ""
    type_2 = ""
    url = ""

    # Derived stats
    phys_sweeper = 0    # Physical Sweeper = Attack + Speed
    sp_sweeper = 0      # Special_Sweeper = Sp.Attack + Speed
    wall = 0            # Wall = HP + Defense + Sp. Defense
    phys_tank = 0       # Physical_Tank = Attack + Defense
    sp_tank = 0         # Special_Tank = Sp.Attack + Sp.Defense

    def __init__(self, index="", total="", hp="", attack="", defense="", sp_attack="", sp_defense="", speed="",
                 weight="", height="", color="", name="", egg_group_1="", egg_group_2="", generation="",
                 catch_rate="", is_legendary="", body_style="", type_1="", type_2=""):
        self.id = index
        self.total = total
        self.hp = hp
        self.attack = attack
        self.defense = defense
        self.sp_attack = sp_attack
        self.sp_defense = sp_defense
        self.speed = speed
        self.weight = weight
        self.height = height
        self.color = color
        self.name = name
        self.egg_group_1 = egg_group_1
        self.egg_group_2 = egg_group_2
        self.generation = generation
        self.catch_rate = catch_rate
        self.is_legendary = is_legendary
        self.body_style = body_style
        self.type_1 = type_1
        self.type_2 = type_2
        # Derived data
        self.phys_sweeper = attack + speed
        self.sp_sweeper = sp_attack + speed
        self.wall = hp + defense + sp_defense
        self.phys_tank = attack + defense
        self.sp_tank = sp_attack + sp_defense
        self.url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + str(index) + 'png'

    def __str__(self, *args, **kwargs):
        return super().__str__(*args, **kwargs)
