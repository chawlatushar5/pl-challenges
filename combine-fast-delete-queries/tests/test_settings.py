# Minimal settings to run a single Django test-suite app (tests.delete)
# under pytest-django without pulling in Django's own runtests.py harness,
# which dynamically discovers/registers every tests/* subdirectory in the
# full Django checkout. ALWAYS_INSTALLED_APPS below mirrors the list
# runtests.py itself always installs (see tests/runtests.py upstream).
DATABASES = {
    'default': {'ENGINE': 'django.db.backends.sqlite3'},
    'other': {'ENGINE': 'django.db.backends.sqlite3'},
}
SECRET_KEY = 'promptleet-test-secret-key'
USE_TZ = False
# Translation catalogs (.mo/.po) aren't shipped with this challenge's
# trimmed project tree, so disable i18n rather than ship ~15MB of locale data.
USE_I18N = False
INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'django.contrib.sites',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.admin.apps.SimpleAdminConfig',
    'django.contrib.staticfiles',
    'tests.delete',
]
