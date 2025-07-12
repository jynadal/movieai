#!/usr/bin/env python3.9
"""
Fichier WSGI pour déploiement cPanel
Placez ce fichier dans votre répertoire public_html sur cPanel
"""
import sys
import os

# IMPORTANT: Modifiez le chemin selon votre configuration cPanel
# Exemple: /home/votre_username/public_html/movieai
sys.path.insert(0, '/home/username/public_html/movieai')

# Définir la variable d'environnement pour les settings de production
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'movieai.settings.prod')

try:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
except ImportError:
    # En cas d'erreur, créer une application WSGI basique pour le debug
    def application(environ, start_response):
        status = '500 Internal Server Error'
        headers = [('Content-type', 'text/plain')]
        start_response(status, headers)
        return [b'Erreur Django: Verifiez la configuration du projet']