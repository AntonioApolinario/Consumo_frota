#!/bin/bash
# Script para gerar env.js com configurações de produção
# Uso: ./generate-env.sh https://api.seudominio.com/api/v1

API_URL="${1:-https://api.example.com/api/v1}"
OUTPUT_FILE="dist/painel-combustiveis/browser/env.js"

echo "Gerando env.js com API_URL=$API_URL"

cat > "$OUTPUT_FILE" << EOF
(function(window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = '$API_URL';
})(window);
EOF

echo "✅ Arquivo gerado: $OUTPUT_FILE"
