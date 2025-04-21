#!/bin/bash
# Script que detecta al usuario de GitHub y hace push con esas credenciales

# Detecta quién está autenticado en GitHub
GITHUB_OUTPUT=$(ssh -T git@github.com 2>&1)

# Extrae el nombre de usuario
if [[ $GITHUB_OUTPUT =~ Hi\ ([^!]+)! ]]; then
    GITHUB_USER="${BASH_REMATCH[1]}"
    
    # Configura Git según el usuario detectado
    case "$GITHUB_USER" in
        "LautaroEmanuelG")
            export GIT_AUTHOR_NAME="Lautaro Emanuel"
            export GIT_AUTHOR_EMAIL="lgonzalez.sag98@gmail.com"
            export GIT_COMMITTER_NAME="Lautaro Emanuel"
            export GIT_COMMITTER_EMAIL="lgonzalez.sag98@gmail.com"
            echo "Usando identidad: Lautaro ($GITHUB_USER)"
            ;;
        "LucasGaro21")  # Reemplaza con el nombre de usuario real de Lucas
            export GIT_AUTHOR_NAME="Lucas"
            export GIT_AUTHOR_EMAIL="lucasg2882@gmail.com"
            export GIT_COMMITTER_NAME="Lucas"
            export GIT_COMMITTER_EMAIL="lucasg2882@gmail.com"
            echo "Usando identidad: Lucas ($GITHUB_USER)"
            ;;
        *)
            echo "⚠️ Usuario GitHub desconocido: $GITHUB_USER"
            echo "Los commits se harán con la configuración actual de Git"
            ;;
    esac
    
    # Ejecuta el push real
    echo "Ejecutando git push..."
    git push "$@"
else
    echo "❌ No se pudo detectar el usuario de GitHub. Verifica tu conexión SSH."
    exit 1
fi