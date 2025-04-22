#!/bin/bash
# Script para hacer push con identidad basada en SSH

# Detecta quién está autenticado en GitHub
GITHUB_OUTPUT=$(ssh -T git@github.com 2>&1)

# Extrae el nombre de usuario
if [[ $GITHUB_OUTPUT =~ Hi\ ([^!]+)! ]]; then
    GITHUB_USER="${BASH_REMATCH[1]}"
    
    # Configura Git para este comando específicamente
    case "$GITHUB_USER" in
        "LautaroEmanuelG")
            NAME="Lautaro"
            EMAIL="lgonzalez.sag98@gmail.com"
            ;;
        "LucasGaro21")  # Reemplaza con el nombre real
            NAME="Lucas"
            EMAIL="lucasg2882@gmail.com"
            ;;
        *)
            echo "⚠️ Usuario GitHub desconocido: $GITHUB_USER"
            exit 1
            ;;
    esac
    
    echo "Haciendo push como $NAME <$EMAIL>"
    
    # Configura la identidad temporalmente
    git config user.name "$NAME"
    git config user.email "$EMAIL"
    
    # Realiza el push
    git push "$@"
    PUSH_STATUS=$?
    
    # Restaura la configuración anterior
    git config --unset user.name
    git config --unset user.email
    
    exit $PUSH_STATUS
else
    echo "❌ No se pudo detectar el usuario de GitHub. Verifica tu conexión SSH."
    exit 1
fi