# Projeto - TFC - EM CONSTRUÇÃO
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

Caso possua o npm versão 16.14 LTS instalado na sua máquina, digite o seguinte comando na raiz do projeto:
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
⚠️ Em desenvolvimento ⚠️

## Endpoints
---
Os endpoints de verbo http `GET` podem ser executados através do navegador, porém, para poder explorar o funcionamento dos demais enpoints será necessário utilizar alguma ferramenta dedicada a fazer requisições, como por exemplo: [Insomnia](https://insomnia.rest/download), [Postman](https://www.postman.com/) ou a extensão do VScode [Thunder Client](https://www.thunderclient.com/).

Na raiz do projeto existe um arquivo chamado `Insomnia_endpoints.json`, este arquivo contém todos os endpoints da aplicação, sendo necessário apenas importa-lo dentro de uma collection do seu Insomnia.

Abaixo estão os endpoints da aplicação:
Caso não haja mudado a porta de exposição da API, ela estará exposta na porta `3000`. Seguindo a seguinte URL `http://localhost:3000/<endpoint>`


#### Endpoint de login
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| POST | /login | { "email": "email@email.com",	"password": "123456" } | - |

#### Endpoints de user
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| POST | /user | { "displayName": "xablau", "email": "email@email.com", "password": "123456", "image": http://image.com/image_url } | - |
| GET | /user | - | authorization: <TOKEN> |
| GET | /user/:id | - | authorization: <TOKEN> |
| DELETE | /user/me | - | authorization: <TOKEN> |

#### Endpoints de categories
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| GET | /categories | - | authorization: <TOKEN> |
| POST | /categories | { "name": "TypeScript" } | authorization: <TOKEN> |

#### Endpoints de posts
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| GET | /post | - | authorization: <TOKEN> |
| GET | /post/:id | - | authorization: <TOKEN> |
| GET | /post/search?q=<busca> | - | authorization: <TOKEN> |
| POST | /post | { "title": "TP é o melhor", "content": "conteúdo", "categoryIds": [] } | authorization: <TOKEN> |
| PUT | /post/:id | { "title": "titulo", "content": "conteúdo" } | authorization: <TOKEN> |
| DELETE | /post/:id | - | authorization: <TOKEN> |

## Executando os testes
---
⚠️ Em desenvolvimento ⚠️