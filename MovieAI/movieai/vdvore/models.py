from django.db import models
from django.utils.text import slugify

# Create your models here.

class Member(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    member_id = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'),('Female', 'Female'), ('others', 'others')])
    joining_date = models.DateField()
    category_member = models.CharField(max_length=100)
    mobile_number = models.CharField(max_length=15)
    email = models.CharField(max_length=100)
    public_number = models.CharField()
    member_picture = models.ImageField(upload_to='vdvore/', blank=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    numbers_of_movies = models.CharField(max_length=50, choices=[('Nothing', 'Nothing'),('< 10', '< 10'),('10 to 30', '10 to 30'), ('30 >', '30 >')])

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.first_name}-{self.last_name}-{self.member_id}")
        super(Member,self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}({self.member_id})"
