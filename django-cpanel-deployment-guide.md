# Django cPanel Deployment Guide - www.vid30.fr

## Issue Identified
You have a **Django project** but appear to have deployed standalone HTML files instead of the Django application. The CSS, JS, and images aren't loading because Django's static file system isn't configured properly for production on cPanel.

## Current Project Structure
```
MovieAI/movieai/
├── manage.py
├── movieai/
│   ├── settings.py
│   ├── settings.prod.py
│   ├── urls.py
│   └── wsgi.py
├── core/ (Django app)
├── landing/ (Django app)
├── vdvore/ (Django app)
├── static/ (Development static files)
├── staticfiles/ (Collected static files)
├── templates/
└── requirements.txt
```

**Problem:** The HTML files in the root directory (`index.html`, `index-2.html`) are NOT Django templates and reference `assets/` which doesn't exist in the Django static system.

## Django cPanel Deployment Steps

### Step 1: Prepare Django for Production

#### 1.1 Update Production Settings
Edit `MovieAI/movieai/movieai/settings.prod.py`:

```python
from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# Security
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
DEBUG = False
ALLOWED_HOSTS = ['vid30.fr', 'www.vid30.fr']

# Apps
INSTALLED_APPS = [
    'core.apps.CoreConfig',
    'landing.apps.LandingConfig', 
    'vdvore.apps.VdvoreConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this for static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'movieai.urls'

# Database (for cPanel, usually MySQL)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '3306'),
    }
}

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Additional static files directories (if any)
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Security settings for production
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
```

#### 1.2 Update Requirements
Add to `requirements.txt`:
```
whitenoise>=6.6.0
python-dotenv>=1.0.0
mysqlclient>=2.2.0
```

### Step 2: Prepare Static Files

#### 2.1 Move Template Assets to Django Static
Since you have assets in the root directory, they need to be moved into Django's static system:

```bash
# Copy assets to Django static directory
cp -r assets/ MovieAI/movieai/static/
```

#### 2.2 Collect Static Files
Run Django's collectstatic command:
```bash
cd MovieAI/movieai/
python manage.py collectstatic --settings=movieai.settings.prod
```

### Step 3: Convert HTML to Django Templates

#### 3.1 Move HTML Files to Templates
```bash
# Move HTML files to Django templates
mv index.html MovieAI/movieai/landing/templates/landing/index.html
mv index-2.html MovieAI/movieai/landing/templates/landing/index-2.html
```

#### 3.2 Update Template Asset References
In your Django templates, change:
```html
<!-- From: -->
<link rel="stylesheet" href="assets/css/main.css">
<img src="assets/img/hero/01.jpg" alt="img">

<!-- To: -->
{% load static %}
<link rel="stylesheet" href="{% static 'css/main.css' %}">
<img src="{% static 'img/hero/01.jpg' %}" alt="img">
```

#### 3.3 Create Django Views
In `landing/views.py`:
```python
from django.shortcuts import render

def index(request):
    return render(request, 'landing/index.html')

def index_2(request):
    return render(request, 'landing/index-2.html')
```

#### 3.4 Update URLs
In `landing/urls.py`:
```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('index-2/', views.index_2, name='index-2'),
]
```

### Step 4: cPanel Deployment

#### 4.1 Upload Files via File Manager or FTP
Upload the entire `MovieAI/movieai/` directory to your cPanel account:
```
public_html/
└── movieai/  (your Django project)
    ├── manage.py
    ├── movieai/
    ├── core/
    ├── landing/
    ├── vdvore/
    ├── static/
    ├── staticfiles/
    ├── templates/
    └── requirements.txt
```

#### 4.2 Create Python App in cPanel
1. Log into cPanel
2. Go to "Python App" or "Setup Python App"
3. Create new Python application:
   - **Python version**: 3.8+ (latest available)
   - **Application root**: `/movieai`
   - **Application URL**: Your domain (vid30.fr)
   - **Application startup file**: `movieai/wsgi.py`
   - **Application Entry point**: `application`

#### 4.3 Install Dependencies
In cPanel Python App terminal:
```bash
pip install -r requirements.txt
```

#### 4.4 Set Environment Variables
In cPanel Python App, add environment variables:
```
SECRET_KEY=your-django-secret-key-here
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DJANGO_SETTINGS_MODULE=movieai.settings.prod
```

#### 4.5 Configure WSGI
Edit the WSGI configuration file in cPanel:
```python
import os
import sys

# Add your project directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'movieai.settings.prod')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

### Step 5: Database and Static Files Setup

#### 5.1 Run Migrations
```bash
python manage.py migrate --settings=movieai.settings.prod
```

#### 5.2 Collect Static Files on Server
```bash
python manage.py collectstatic --noinput --settings=movieai.settings.prod
```

#### 5.3 Create Static Files Alias in cPanel
In cPanel, create a subdomain or alias:
- **Static URL**: `/static/`
- **Document Root**: `/public_html/movieai/staticfiles/`

### Step 6: Troubleshooting Static Files

#### 6.1 Check Static Files URL
Verify these URLs work:
- `https://www.vid30.fr/static/css/main.css`
- `https://www.vid30.fr/static/js/main.js`
- `https://www.vid30.fr/static/img/hero/01.jpg`

#### 6.2 Alternative: Use WhiteNoise
If cPanel doesn't serve static files properly, WhiteNoise (already added to settings) will serve them through Django:

```python
# In settings.prod.py, ensure this is added:
MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
    # ... other middleware
]

# Optional: Enable compression
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

### Step 7: Testing and Verification

#### 7.1 Test Django App
Visit `https://www.vid30.fr` and verify:
- ✅ Django application loads
- ✅ CSS styling appears correctly
- ✅ JavaScript functionality works
- ✅ Images display properly
- ✅ No 404 errors in browser console

#### 7.2 Django Admin Test
Visit `https://www.vid30.fr/admin/` to ensure Django is working.

## Common cPanel Django Issues

### Issue: Static Files 404
**Solution**: 
- Run `collectstatic` command
- Check static files alias in cPanel
- Verify WhiteNoise is installed and configured

### Issue: Django App Not Starting
**Solution**:
- Check WSGI configuration
- Verify Python version compatibility
- Check error logs in cPanel

### Issue: Database Connection Error
**Solution**:
- Verify database credentials in environment variables
- Check database permissions in cPanel

### Issue: Template Not Found
**Solution**:
- Verify templates are in correct Django app structure
- Check TEMPLATES setting in Django

## Quick Migration Checklist

### Before Deployment:
- [ ] Move HTML files to Django templates
- [ ] Update asset references to use `{% static %}` tags
- [ ] Configure production settings
- [ ] Test locally with production settings
- [ ] Run collectstatic locally

### After Deployment:
- [ ] Upload Django project to correct directory
- [ ] Configure Python app in cPanel
- [ ] Set environment variables
- [ ] Install requirements
- [ ] Run migrations
- [ ] Run collectstatic
- [ ] Configure static files serving
- [ ] Test all functionality

## Expected Result
After proper Django deployment:
- ✅ Django application serves your website
- ✅ Static files (CSS, JS, images) load correctly via Django's static system
- ✅ URLs work through Django's URL routing
- ✅ Templates render with proper styling
- ✅ Database integration works (if using models)