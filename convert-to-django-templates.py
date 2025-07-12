#!/usr/bin/env python3
"""
Script to convert standalone HTML files to Django templates
Updates asset references from 'assets/' to Django {% static %} tags
"""

import os
import re
import shutil

def convert_html_to_django_template(input_file, output_file):
    """Convert HTML file to Django template with static tags"""
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add {% load static %} at the top after DOCTYPE
    if '{% load static %}' not in content:
        content = re.sub(
            r'(<!DOCTYPE html>\s*<html[^>]*>)',
            r'\1\n{% load static %}',
            content,
            flags=re.IGNORECASE
        )
    
    # Convert CSS links
    content = re.sub(
        r'href=["\']assets/css/([^"\']+)["\']',
        r'href="{% static \'css/\1\' %}"',
        content
    )
    
    # Convert JS scripts
    content = re.sub(
        r'src=["\']assets/js/([^"\']+)["\']',
        r'src="{% static \'js/\1\' %}"',
        content
    )
    
    # Convert images
    content = re.sub(
        r'src=["\']assets/img/([^"\']+)["\']',
        r'src="{% static \'img/\1\' %}"',
        content
    )
    
    # Convert background images in style attributes
    content = re.sub(
        r"url\(['\"]assets/img/([^'\"]+)['\"]\)",
        r"url('{% static 'img/\1' %}')",
        content
    )
    
    # Convert webfonts
    content = re.sub(
        r'href=["\']assets/webfonts/([^"\']+)["\']',
        r'href="{% static \'webfonts/\1\' %}"',
        content
    )
    
    # Convert any other assets
    content = re.sub(
        r'(href|src)=["\']assets/([^"\']+)["\']',
        r'\1="{% static \'\2\' %}"',
        content
    )
    
    # Write the converted content
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Converted {input_file} -> {output_file}")

def move_assets_to_django_static():
    """Move assets folder to Django static directory"""
    source = 'assets'
    destination = 'MovieAI/movieai/static'
    
    if os.path.exists(source):
        if not os.path.exists(destination):
            os.makedirs(destination)
        
        # Copy contents of assets to static
        for item in os.listdir(source):
            src_path = os.path.join(source, item)
            dst_path = os.path.join(destination, item)
            
            if os.path.isdir(src_path):
                if os.path.exists(dst_path):
                    shutil.rmtree(dst_path)
                shutil.copytree(src_path, dst_path)
            else:
                shutil.copy2(src_path, dst_path)
        
        print(f"✅ Moved assets from {source} to {destination}")
    else:
        print(f"❌ Assets folder '{source}' not found")

def create_django_views():
    """Create basic Django views for the converted templates"""
    
    views_content = '''from django.shortcuts import render

def index(request):
    """Landing page view"""
    return render(request, 'landing/index.html')

def index_2(request):
    """Second page view"""  
    return render(request, 'landing/index-2.html')

def contact(request):
    """Contact page view"""
    if request.method == 'POST':
        # Handle contact form submission
        pass
    return render(request, 'landing/contact.html')
'''
    
    views_file = 'MovieAI/movieai/landing/views.py'
    if os.path.exists(views_file):
        print(f"⚠️  Views file already exists: {views_file}")
        print("   Please manually update your views.py with the new view functions")
    else:
        with open(views_file, 'w') as f:
            f.write(views_content)
        print(f"✅ Created Django views: {views_file}")

def create_django_urls():
    """Create URL patterns for the converted templates"""
    
    urls_content = '''from django.urls import path
from . import views

app_name = 'landing'

urlpatterns = [
    path('', views.index, name='index'),
    path('index-2/', views.index_2, name='index-2'),
    path('contact/', views.contact, name='contact'),
]
'''
    
    urls_file = 'MovieAI/movieai/landing/urls.py'
    if os.path.exists(urls_file):
        print(f"⚠️  URLs file already exists: {urls_file}")
        print("   Please manually update your urls.py with the new URL patterns")
    else:
        with open(urls_file, 'w') as f:
            f.write(urls_content)
        print(f"✅ Created Django URLs: {urls_file}")

def main():
    """Main conversion process"""
    print("🔄 Converting HTML files to Django templates...")
    print("=" * 50)
    
    # Step 1: Move assets to Django static
    print("\n📁 Step 1: Moving assets to Django static directory")
    move_assets_to_django_static()
    
    # Step 2: Convert HTML files to templates
    print("\n🔧 Step 2: Converting HTML files to Django templates")
    
    # Create templates directory structure
    templates_dir = 'MovieAI/movieai/landing/templates/landing'
    os.makedirs(templates_dir, exist_ok=True)
    
    # Convert each HTML file
    html_files = [
        ('index.html', f'{templates_dir}/index.html'),
        ('index-2.html', f'{templates_dir}/index-2.html'),
        ('contact.php', f'{templates_dir}/contact.html'),  # Convert PHP to HTML
    ]
    
    for input_file, output_file in html_files:
        if os.path.exists(input_file):
            convert_html_to_django_template(input_file, output_file)
        else:
            print(f"⚠️  File not found: {input_file}")
    
    # Step 3: Create Django views and URLs
    print("\n🎯 Step 3: Creating Django views and URLs")
    create_django_views()
    create_django_urls()
    
    print("\n" + "=" * 50)
    print("✅ Conversion completed!")
    print("\n📋 Next steps:")
    print("1. Review the converted templates in MovieAI/movieai/landing/templates/")
    print("2. Update your main urls.py to include landing URLs")
    print("3. Run: python manage.py collectstatic --settings=movieai.settings.prod")
    print("4. Test locally before deploying to cPanel")
    print("5. Follow the Django cPanel deployment guide")
    
    print("\n⚠️  Manual updates needed:")
    print("- Check converted static file references")
    print("- Update contact form handling if needed")
    print("- Review and test all functionality")

if __name__ == '__main__':
    main()