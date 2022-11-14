# Projeto - TFC
---
## O que foi desenvolvido:

Este projeto foi desenvolvido de forma individual durante o programa de formação da Trybe.
O TFC ou Trybe Futebol Clube é um site informativo sobre partidas e classificações de futebol! Neste projeto, desenvolvi uma API com `TDD` e `POO` dockerizada, utilizando modelagem de dados através do Sequelize, capaz de ser consumida por um front-end já desenvolvido respeitando assim as regras de negócio.

As stacks utilizadas para o desenvolvimento desta aplicação foram:
![Node](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express.js-grey?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Sequelize](https://img.shields.io/badge/-Sequelize-357bbe?style=flat-square&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat-square&logo=docker&logoColor=white)

## Executando o projeto
---
❗Para rodar o projeto com o docker será necessário que além do [docker](https://www.docker.com/), o  [docker-compose](https://github.com/docker/compose) também esteja instalado em sua máquina.

 Vá até a raiz do projeto, caso possua o npm versão 16.14 LTS instalado na sua máquina, execute o seguinte comando no terminal:
```
npm run compose:up
```
Caso contrário digite o comando abaixo:
```
cd app && docker-compose up -d --build
```
Os containers para execução do projeto serão iniciados, após o compose testar a saúde de todos os containers e encerrar os processos, toda a aplicação já estará no ar com front-end, back-end e banco de dados já disponíveis para utilização.

## Explorando a aplicação
---
### Tela de Login
A tela de login serve para fazer o login propriamente dito, o sistema irá consultar as credênciais no banco de dados e em caso de "match" irá realizar o login com os poderes de admin ou não, conforme o registro na base de dados. As duas únicas crendênciais registradas no banco são: 
- `admin@admin.com`, `secret_admin`
- `user@user.com`, `secret_user`

### Tela de Partidas
Dentro da tela de partidas é possível visualizar os jogos e seus resultados, assim como o status da partida, isto é, se a partida já acabou ou está em andamento. Poderá também filtrar as partidas por este status.
Ao um usuário admin realizar o login, será liberada então a funcionalidade de adicionar novas partidas assim como alterar o resultado e status das partidas já registradas.
Você pode testar estas funcionalidade com as seguintes credênciais: `admin@admin.com`, `secret_admin`.

### Tela de Classificação
Na tela de classificação é possível ver a pontuação dos times registrados no banco, podendo acessar a pontuação geral, a pontuação de jogos em casa e de visitantes, nesta tabela contêm informações como pontos, jogos, vitórias, empates, derrotas, gols marcados, gols sofridos e eficiência de cada time.

## Endpoints
---
Para caso queira verificar os retornos da API sem ser pelo front-end, será necessário utilizar alguma ferramenta dedicada a fazer requisições, como por exemplo: [Insomnia](https://insomnia.rest/download), [Postman](https://www.postman.com/) ou a extensão do VScode [Thunder Client](https://www.thunderclient.com/).

Na raiz do projeto existe um arquivo chamado `Insomnia_endpoints.json`, este arquivo contém todos os endpoints da aplicação, sendo necessário apenas importa-lo dentro de uma collection do seu Insomnia.

Abaixo estão os endpoints da aplicação:
Caso não haja mudado a porta de exposição da API, ela estará exposta na porta `3001`. Seguindo a seguinte URL `http://localhost:3001/<endpoint>`


#### Endpoint de login
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| POST | /login | { "email": "email@email.com",	"password": "123456" } | - |
| GET | /login/validate | - | authorization: <TOKEN> |

#### Endpoints de Matches
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| POST | /matches | { "homeTeam": <team_id>, "awayTeam": <team_id>, "homeTeamGoals": x, "awayTeamGoals": y } | authorization: <TOKEN> |
| GET | /matches | - | - |
| GET | /matches?inProgress=<boolean> | - | - |
| PATCH | /matches/:id | { "homeTeamGoals": x, "awayTeamGoals": y } | - |
| PATCH | /matches/:id/finish | - | - |

#### Endpoints de Teams
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| GET | /teams | - | - |
| POST | /teams/:id | - | - |

#### Endpoints de Leaderboard
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| GET | /leaderboard | - | - |
| GET | /leaderboard/home | - | - |
| GET | /leaderboard/away | - | - |

## Executando os testes
---
❗Antes de rodar os testes é necessário que o projeto esteja em execução, para isso siga os passos da seção `Executando o projeto`.

Acesse o container node com o comando a seguir:
```
docker exec -it app_backend sh
```

Execute os testes:
```
npm test
```

Para verificar a cobertura da aplicação execute o seguinte script node com o seguinte comando:
```
npm run test:coverage
```