#!/bin/bash
# Script para hacer commit con identidad basada en SSH

# Verificar si se pasó un mensaje de commit
if [ $# -eq 0 ]; then
    echo "Uso: git-ident-commit \"Tu mensaje de commit\""
    exit 1
fi

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
    
    echo "Haciendo commit como $NAME <$EMAIL>"
    
    # Configura la identidad temporalmente
    git config user.name "$NAME"
    git config user.email "$EMAIL"
    
    # Añade y realiza el commit
    git add .
    git commit -m "$1"
    COMMIT_STATUS=$?
    
    # Restaura la configuración anterior
    git config --unset user.name
    git config --unset user.email
    
    exit $COMMIT_STATUS
else
    echo "❌ No se pudo detectar el usuario de GitHub. Verifica tu conexión SSH."
    exit 1
fi