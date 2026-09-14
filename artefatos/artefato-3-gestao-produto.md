# Gestão do Produto (Artefato 3)

## Arquitetura da Informação

- Landing page / README
- Dashboard principal
- Páginas de detalhe por rodovia e por município
- API interna para consultas e endpoints de exportação

## Design arquitetural (resumo)

- Frontend: React + Vite (ou alternativa leve)
- Backend: Node.js + Express (ou Python Flask) para APIs e proxy se necessário
- Banco de dados: SQLite para protótipo, migração para Postgres se necessário
- ETL: Python (pandas) ou scripts Node para limpeza e transformação

## Testes de Integração (exemplos)

- Cenário: Ingestão de CSVs -> transformação -> API retorna métricas consolidadas
- Passos: carregar sample CSV, rodar ETL, executar endpoint /api/metrics e validar payload

