from django.core.management.base import BaseCommand, CommandError
from clothes.models import Clothes, Size, User

class Command(BaseCommand):
    help = 'match customized data to user'

    def handle(self, *args, **options):
        User.recommended.through.objects.all().delete()
        for user in User.objects.all():
            user_length = int(user.length)
            user_waist = int(user.waist_size)
            user_thigh = int(user.thigh_size)
            user_calf = int(user.calf_size)
            for size in Size.objects.all():
                waist_diff = size.waist_size - user_waist
                if waist_diff >= 3.0 or waist_diff < -1.0:
                    continue
                length_diff = user_length - size.length
                if length_diff <= 0:
                    continue

                thigh_diff = size.thigh_size - user_thigh
                if not thigh_diff >= 1.0:
                    continue
                
                calf_diff = size.calf_size - user_calf
                if not calf_diff >= 1.0:
                    continue
                user.recommended.add(size)
            #print(user.nickname, user.recommended.values())
        self.stdout.write(self.style.SUCCESS('Successfully updated customization'))