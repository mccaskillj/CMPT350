

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

    def __init__(self, index="", total="", hp="", attack="", defense="", sp_attack="", sp_defense="", speed="",
                 weight="", height="", color="", name=""):
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

    def __str__(self, *args, **kwargs):
        return super().__str__(*args, **kwargs)