from django.contrib import admin
from .models import Member

# Register your models here.

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display =('first_name', 'last_name', 'member_id', 'gender', 'joining_date', 'category_member', 'mobile_number', 'email', 'public_number', 'numbers_of_movies')
    search_fields =('first_name', 'last_name', 'member_id', 'category_member', 'public_number', 'numbers_of_movies')
    list_filter =('gender', 'joining_date', 'category_member', 'numbers_of_movies')
    readonly_fields = ('member_picture',) # Optional: makes the image field read-only
