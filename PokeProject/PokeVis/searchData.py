
class SearchData:
    id = 0
    stat = 0
    weight = 0
    height = 0
    name = ""

    def __init__(self, index="", stat="", weight="", height="", name=""):
        self.id = index
        self.stat = int(stat)
        self.weight = weight
        self.height = height
        self.name = name

    def __str__(self, *args, **kwargs):
        return super().__str__(*args, **kwargs)
