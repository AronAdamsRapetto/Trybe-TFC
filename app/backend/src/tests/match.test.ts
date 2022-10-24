import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes de integração das rotas de match', () => {
  let response: Response;

  describe('Testes da rota /matches', () => {
    const mock = [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 2,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ] as unknown;
    beforeEach(() => {
      sinon.stub(Match, 'findAll').resolves(mock as Match[]);
    });

    afterEach(() => sinon.restore());

    it('Testa se o endpoint GET /matches retorna as partidas corretamente', async () => {
      response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mock);
    });
  });
});