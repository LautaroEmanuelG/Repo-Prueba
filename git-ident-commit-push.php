#!/bin/bash
# Script para hacer commit y push con identidad basada en SSH

# Verificar si se pasó un mensaje de commit
if [ $# -eq 0 ]; then
    echo "Uso: git-ident-commit-push \"Tu mensaje de commit\""
    exit 1
fi

# Ejecuta el script de commit
git-ident-commit "$1"

if [ $? -ne 0 ]; then
    echo "Error al hacer commit"
    exit 1
fi

# Si el commit fue exitoso, ejecuta el script de push
git-ident-push

if [ $? -ne 0 ]; then
    echo "Error al hacer push"
    exit 1
fi

echo "✅ Commit y push realizados correctamente"