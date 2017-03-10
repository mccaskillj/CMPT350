from django.db import models

# Create your models here.


class Pokemon(models.Model):
    number = models.IntegerField(default=0)
    name = models.CharField(max_length=100)
    type_1 = models.CharField(max_length=50)
    type_2 = models.CharField(max_length=50)
    total = models.CharField(max_length=50)
    hp = models.IntegerField(default=0)
    attack = models.IntegerField(default=0)
    defense = models.IntegerField(default=0)
    special_attack = models.IntegerField(default=0)
    special_defense = models.IntegerField(default=0)
    speed = models.IntegerField(default=0)
    generation = models.IntegerField(default=0)
    is_legendary = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    has_gender = models.CharField(max_length=50)
    pr_male = models.CharField(max_length=50)
    egg_group_1 = models.CharField(max_length=50)
    egg_group_2 = models.CharField(max_length=50)
    has_mega_evolution = models.CharField(max_length=50)
    height_m = models.FloatField(default=0.0)
    weight_kg = models.FloatField(default=0.0)
    catch_rate = models.IntegerField(default=0)
    body_style = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Type(models.Model):
    type = models.CharField(max_length=25)
    zero_damage = models.CharField(max_length=150)
    normal = models.CharField(max_length=150)
    two_times = models.CharField(max_length=150)
    half_damage = models.CharField(max_length=150)

    def __str__(self):
        return self.name
