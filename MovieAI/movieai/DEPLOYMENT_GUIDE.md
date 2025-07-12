# Django Static Files Deployment Guide for cPanel

## Problème résolu ✅
Les fichiers statiques (CSS, JS, images) n'étaient pas servis correctement sur votre site www.vid30.fr

## Corrections apportées

### 1. Configuration Django mise à jour

#### settings.py et settings.prod.py
- ✅ Ajout de `STATICFILES_DIRS` pour indiquer à Django où trouver les fichiers statiques
- ✅ Configuration des `STATICFILES_FINDERS` en production
- ✅ Amélioration de la configuration `STATIC_ROOT`

#### urls.py
- ✅ Ajout de la gestion des fichiers statiques et médias pour développement et production

### 2. Fichier .htaccess créé
- ✅ Configuration pour servir les fichiers statiques directement
- ✅ Gestion des types MIME appropriés
- ✅ Cache headers pour améliorer les performances

## Étapes de déploiement sur cPanel

### 1. Collecter les fichiers statiques
Avant de déployer, exécutez cette commande dans votre environnement de développement :

```bash
cd MovieAI/movieai
python manage.py collectstatic --settings=movieai.settings.prod
```

### 2. Structure de déploiement recommandée
Organisez votre projet comme suit sur cPanel :

```
public_html/
├── .htaccess
├── index.py (votre fichier WSGI pour cPanel)
├── movieai/ (votre projet Django)
├── staticfiles/ (dossier généré par collectstatic)
└── media/ (pour les uploads utilisateurs)
```

### 3. Configuration cPanel

#### A. Variables d'environnement
Créez un fichier `.env` dans le répertoire racine de votre projet avec :

```env
SECRET_KEY=votre-clef-secrete-super-longue-et-complexe
DEBUG=False
ALLOWED_HOSTS=vid30.fr,www.vid30.fr
```

#### B. Fichier index.py pour cPanel
Créez un fichier `index.py` dans public_html :

```python
#!/usr/bin/env python3.9
import sys
import os

# Ajoutez le chemin vers votre projet
sys.path.insert(0, '/home/username/public_html/movieai')

# Définir la variable d'environnement pour les settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'movieai.settings.prod')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

### 4. Vérifications post-déploiement

#### A. Testez les URLs statiques
- ✅ https://www.vid30.fr/static/css/[votre-fichier].css
- ✅ https://www.vid30.fr/static/js/[votre-fichier].js
- ✅ https://www.vid30.fr/static/img/[votre-image].png

#### B. Vérifiez les templates
Assurez-vous que vos templates utilisent :
```django
{% load static %}
<link rel="stylesheet" href="{% static 'css/style.css' %}">
<script src="{% static 'js/script.js' %}"></script>
<img src="{% static 'img/logo.png' %}" alt="Logo">
```

## Commandes utiles

### Collecte des fichiers statiques
```bash
python manage.py collectstatic --settings=movieai.settings.prod --noinput
```

### Test en local avec les settings de production
```bash
python manage.py runserver --settings=movieai.settings.prod
```

### Vérification de la configuration
```bash
python manage.py check --settings=movieai.settings.prod
```

## Dépannage courant

### Si les fichiers CSS/JS ne se chargent toujours pas :

1. **Vérifiez les permissions** sur cPanel :
   - Dossier `staticfiles` : 755
   - Fichiers CSS/JS : 644

2. **Vérifiez la console du navigateur** (F12) pour les erreurs 404/403

3. **Testez l'accès direct** aux fichiers statiques dans l'URL

4. **Vérifiez le chemin dans vos templates** :
   ```django
   <!-- Correct -->
   {% load static %}
   <link rel="stylesheet" href="{% static 'css/style.css' %}">
   
   <!-- Incorrect -->
   <link rel="stylesheet" href="/static/css/style.css">
   ```

## Support
Si vous rencontrez des problèmes :
1. Vérifiez les logs d'erreur dans cPanel
2. Testez en local avec DEBUG=True
3. Utilisez les outils de développement du navigateur (F12)

## Fichiers modifiés dans cette correction
- ✅ `movieai/settings.py`
- ✅ `movieai/settings.prod.py`
- ✅ `movieai/urls.py`
- ✅ `.htaccess` (nouveau)
- ✅ `DEPLOYMENT_GUIDE.md` (nouveau)

Votre problème de fichiers statiques devrait maintenant être résolu ! 🎉