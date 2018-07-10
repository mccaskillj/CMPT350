from django.core.management import BaseCommand, call_command


class Command(BaseCommand):
    def handle(self, *args, **options):
        call_command('migrate', '', verbosity=1)
        call_command('loaddata', 'initial_data', verbosity=1)
        call_command('loaddata', 'pokemon', verbosity=1)
        call_command('loaddata', 'types', verbosity=1)
