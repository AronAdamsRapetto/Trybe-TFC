import * as sinon from "sinon";
import * as chai from "chai";
import { app } from "../app";
import Match from "../database/models/MatchModel";
import Team from "../database/models/TeamModel";
import User from "../database/models/UserModel";

import { Response } from "superagent";
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { expect } = chai;

describe("Testes de integração das rotas de match", () => {
  let response: Response;

  describe("Testes da rota /matches", () => {
    const mock = [
      {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
          teamName: "São Paulo",
        },
        teamAway: {
          teamName: "Grêmio",
        },
      },
      {
        id: 2,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 9,
        awayTeamGoals: 0,
        inProgress: true,
        teamHome: {
          teamName: "São Paulo",
        },
        teamAway: {
          teamName: "Internacional",
        },
      },
    ] as unknown;

    beforeEach(() => {
      sinon.stub(Match, "findAll").resolves(mock as Match[]);
    });

    afterEach(() => sinon.restore());

    it("Testa se o endpoint GET /matches retorna as partidas corretamente", async () => {
      response = await chai.request(app).get("/matches");

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mock);
    });
  });

  describe("Testes da rota GET /matches?inProgress", () => {
    const mockInProgress = [
      {
        id: 2,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 9,
        awayTeamGoals: 0,
        inProgress: true,
        teamHome: {
          teamName: "São Paulo",
        },
        teamAway: {
          teamName: "Internacional",
        },
      },
    ] as unknown;

    const mockFinished = [
      {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
          teamName: "São Paulo",
        },
        teamAway: {
          teamName: "Grêmio",
        },
      },
    ] as unknown;

    afterEach(() => sinon.restore());

    it("Testa se o endpoint GET /matches?inProgress=true retorna as partidas em progresso", async () => {
      sinon.stub(Match, "findAll").resolves(mockInProgress as Match[]);

      response = await chai.request(app).get("/matches?inProgress=true");

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockInProgress);
    });

    it("Testa se o endpoint GET /matches?inProgress=false retorna as partidas finalizadas", async () => {
      sinon.stub(Match, "findAll").resolves(mockFinished as Match[]);

      response = await chai.request(app).get("/matches?inProgress=false");

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockFinished);
    });
  });

  describe("Testes da rota POST /matches", () => {
    const mock = {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    } as unknown;

    let login: Response;

    beforeEach(async () => {      
      sinon.stub(User, "findOne").resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      } as User);
      
      login = await chai.request(app).post("/login").send({
        email: "admin@admin.com",
        password: "secret_admin",
      });

      sinon.stub(Match, "create").resolves(mock as Match);
    });

    afterEach(() => sinon.restore());

    it("Testa se o endpoint POST /matches retorna um status 401 um jogo com token inválido", async () => {
      response = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 16,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        })
        .set("authorization", "invalid");

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({
        message: "Token must be a valid token",
      });
    });

    it("Testa se o endpoint POST /matches retorna um status 404 se tentar cadastrar um partida com time que não existe", async () => {
      const mock = [
        {
          "id": 1,
          "teamName": "Avaí/Kindermann"
        },
       ] as unknown;

      sinon.stub(Team, "findAll").resolves(mock as Team[]);
      response = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 999,
          awayTeam: 1,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        }).set("authorization", login.body.token);

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({
        message: "There is no team with such id!",
      });
    });

    it("Testa se o endpoint POST /matches retorna um status 422 se tentar cadastrar um partida com times iguais", async () => {
      response = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 8,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        })
        .set("authorization", login.body.token);

      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({
        message: "It is not possible to create a match with two equal teams",
      });
    });

    it("Testa se o endpoint POST /matches cadastra uma partida corretamente", async () => {
      response = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 16,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        })
        .set("authorization", login.body.token);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({
        awayTeam: 8,
        awayTeamGoals: 2,
        homeTeam: 16,
        homeTeamGoals: 2,
        id: 1,
        inProgress: true,
      });
    });
  });

  describe('Testes da rota PATCH /matches/:id/finish', () => {    
    beforeEach(() => {
      const mock = [1, {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: true,
      }] as unknown

      sinon.stub(Match, 'update').resolves(mock as [number, Match[]]);
    });

    afterEach(() => sinon.restore());

    it('Testa se o endpoint PATCH /matcher/:id/finish retorna um status 404 ao passa id que não existe', async () => {
      sinon.restore();
      const failMock = [0, null] as unknown
      sinon.stub(Match, 'update').resolves(failMock as [number, Match[]]);

      response = await chai.request(app).patch('/matches/99/finish');

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
    });

    it('Testa se o endpoint PATCH /matcher/:id/finish altera a partida com sucesso', async () => {
     response = await chai.request(app).patch('/matches/99/finish');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });

  // PATCH /matches/:id/finish
  // O jogo deve existir no bando de dados
  // Deve ser possível finalizar um jogo

  // PATCH /matches/:id
  // A partida deve existir no banco de dados
  // Não deve ser possível atualizar partidas já finalizadas
  // Deve ser possível atualiar partidas em andamento
});
