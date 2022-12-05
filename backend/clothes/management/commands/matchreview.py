from django.core.management.base import BaseCommand, CommandError
from clothes.models import Size, User, Review

class Command(BaseCommand):
    help = 'match customized review to user'

    def handle(self, *args, **options):
        Review.recommended_user.through.objects.all().delete()
        for user in User.objects.all():
            user_length = int(user.length)
            user_waist = int(user.waist_size)
            user_thigh = int(user.thigh_size)
            user_calf = int(user.calf_size)
            for review in Review.objects.all():
                if user == review.uploaded_user:
                    continue
                reviewed_user_length = int(review.uploaded_user.length)
                reviewed_user_waist = int(review.uploaded_user.waist_size)
                reviewed_user_thigh = int(review.uploaded_user.thigh_size)
                reviewed_user_calf = int(review.uploaded_user.calf_size)

                length_diff = abs(user_length - reviewed_user_length)
                if not length_diff <= 2:
                    continue

                waist_diff = abs(user_waist - reviewed_user_waist)
                if not waist_diff <= 2:
                    continue
                
                thigh_diff = abs(user_thigh - reviewed_user_thigh)
                if not thigh_diff <= 2:
                    continue
                
                calf_diff = abs(user_calf - reviewed_user_calf)
                if not calf_diff <= 2:
                    continue

                review.recommended_user.add(user)
            #print(user.nickname, review.recommended_user.values())
        self.stdout.write(self.style.SUCCESS('Successfully matched reviews'))