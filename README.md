# Instruções

## Rodando o projeto

- O projeto pode ser iniciado usando [Docker](https://www.docker.com) na versão 25.0.0 e Docker compose na versão 2.17.3

### Docker Compose
- Para rodar projeto basta rodar o comando: `docker compose up`
- O projeto estará rodando na porta 5000

### Docker 

Se você não tem ou não pode roder o docker compose em sua maquina, você pode seguir os seguintes passos:
- Crie uma rede `docker network create customer-network`
- Crie o container do banco de dados: `docker run -d --name facilita-juridico-db --network customer-network -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres postgres:latest`
- Faça o build da imagem: `docker build -t facilita-juridico-image .`
- Inicie o container da api: `docker run -d --name facilita-juridico-app --network customer-network -p 5000:5000 -e PORT=5000 -e DB=postgres -e DB_USERNAME=postgres -e DB_PASSWORD=postgres -e DB_HOST=facilita-juridico-db -e DB_PORT=5432 -e DB_DATABASE=postgres -v $(pwd)/../:/home/node/app -v node-modules-vol:/home/node/app/node_modules facilita-juridico-image`


## Considerações sobre o algoritmo de calcular rota
 
Foi optado usar um algoritmo baseado no Algoritmo do Vizinho Mais Próximo (Nearest Neighbor Algorithm), porém uma versão mais simples.
A execução do algoritmo se baseia nas seguintes etapas:

- Recebe a origem e as posições (vértices).
- Adiciona o vértice origem no array de resultado.
- Calcula a distância entre da origem e os demais vértices.
- Escolhe o vértice mais próximo à origem e o seleciona como atual origem.
- Verifique se há mais vértices para ser visitado, caso haja volte ao primeiro passo, caso contrário retorne o array de resultados.
