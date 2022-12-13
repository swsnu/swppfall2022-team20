from django.core.management.base import BaseCommand, CommandError
from clothes.models import Size, User

class Command(BaseCommand):
    help = 'match customized clothes to user'

    def handle(self, *args, **options):
        User.recommended.through.objects.all().delete()
        for user in User.objects.all():
            user_length = int(user.length)
            user_waist = int(user.waist_size)
            user_thigh = int(user.thigh_size)
            user_calf = int(user.calf_size)
            for size in Size.objects.all():
                print(size.waist_size)
                print(size.id)
                try:
                    waist_diff = int(size.waist_size) - user_waist
                    if waist_diff >= 3.0 or waist_diff < -1.0:
                        continue
                    length_diff = user_length - int(size.length)
                    if length_diff <= 0:
                        continue

                    thigh_diff = size.thigh_size - user_thigh
                    if not thigh_diff >= 1.0:
                        continue
                    
                    calf_diff = size.calf_size - user_calf
                    if not calf_diff >= 1.0:
                        continue
                except:
                    continue
                user.recommended.add(size)
            print(user.nickname, user.recommended.values())
        self.stdout.write(self.style.SUCCESS('Successfully matched clothes'))