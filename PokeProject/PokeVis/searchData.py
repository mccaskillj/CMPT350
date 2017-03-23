
class SearchData:
    id = 0
    stat = 0
    weight = 0
    height = 0
    name = ""
    total = 0
    hp = 0
    attack = 0
    defense = 0
    sp_attack = 0
    sp_defense = 0
    speed = 0
    type_1 = ""
    type_2 = ""

    def __init__(self, index="", weight="", height="", name="", total="", hp="", attack="", defense="",
                 sp_attack="", sp_defense="", speed="", type_1="", type2=""):
        self.id = index
        self.weight = weight
        self.height = height
        self.name = name
        self.total = total
        self.hp = hp
        self.attack = attack
        self.defense = defense
        self.sp_attack = sp_attack
        self.sp_defense = sp_defense
        self.speed = speed
        self.type_1 = type_1
        self.type_2 = type2

    def __str__(self, *args, **kwargs):
        return super().__str__(*args, **kwargs)
