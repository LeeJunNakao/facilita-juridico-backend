# Instruções

## Rodando o projeto

- O projeto pode ser iniciado usando [Docker](https://www.docker.com)
- Para rodar projeto basta rodar o comando: `docker compose up`
- O projeto estará rodando na porta 5000

## Considerações sobre o algoritmo de calcular rota

Foi optado usar um algoritmo baseado no Algoritmo do Vizinho Mais Próximo (Nearest Neighbor Algorithm), porém uma versão mais simples.
A execução do algoritmo se baseia nas seguintes etapas:

- Recebe a origem e as posições (vértices).
- Adiciona o vértice origem no array de resultado.
- Calcula a distância entre da origem e os demais vértices.
- Escolhe o vértice mais próximo à origem e o seleciona como atual origem.
- Verifique se há mais vértices para ser visitado, caso haja volte ao primeiro passo, caso contrário retorne o array de resultados.
