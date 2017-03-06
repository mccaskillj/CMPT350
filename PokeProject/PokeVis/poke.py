

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

    def __init__(self, index="", total="", hp="", attack="", defense="", sp_attack="", sp_defense="", speed="",
                 weight="", height="", color="", name="", egg_group_1="", egg_group_2="", generation="",
                 catch_rate="", is_legendary="", body_style=""):
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

    def __str__(self, *args, **kwargs):
        return super().__str__(*args, **kwargs)