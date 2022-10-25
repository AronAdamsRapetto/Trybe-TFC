import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import sequelize from '../database/models';

import { Response } from 'superagent';
import ILeaderBoardResponse from '../interfaces/response/leaderboard';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração das rotas de leaderboards', () => {
  let response: Response;

  describe('Testes da rota GET /leaderboard/home', () => {
    const mock = [
      [
        {
          "name": "Santos",
          "totalPoints": "9",
          "totalGames": 3,
          "totalVictories": "3",
          "totalDraws": "0",
          "totalLosses": "0",
          "goalsFavor": "9",
          "goalsOwn": "3",
          "goalsBalance": "6",
          "efficiency": "100.00"
        },
        {
          "name": "Palmeiras",
          "totalPoints": "7",
          "totalGames": 3,
          "totalVictories": "2",
          "totalDraws": "1",
          "totalLosses": "0",
          "goalsFavor": "10",
          "goalsOwn": "5",
          "goalsBalance": "5",
          "efficiency": "77.78"
        }
      ],
      'xablau'
    ] as [unknown[], unknown];
    
    beforeEach(() => {      
      sinon.stub(sequelize, 'query').resolves(mock)
    });

    afterEach(() => sinon.restore());

    it('Testa se o endpoint /leaderboard/home retorna o leaderboard corretamente', async () => {
      response = await chai.request(app).get('/leaderboard/home');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mock[0]);
    });
  });

  describe('Testes da rota GET /leaderboard/away', () => {
    const mock = [
      [
        {
          "name": "Palmeiras",
          "totalPoints": "6",
          "totalGames": 2,
          "totalVictories": "2",
          "totalDraws": "0",
          "totalLosses": "0",
          "goalsFavor": "7",
          "goalsOwn": "0",
          "goalsBalance": "7",
          "efficiency": "100.00"
        },
        {
          "name": "Corinthians",
          "totalPoints": "6",
          "totalGames": 3,
          "totalVictories": "2",
          "totalDraws": "0",
          "totalLosses": "1",
          "goalsFavor": "6",
          "goalsOwn": "2",
          "goalsBalance": "4",
          "efficiency": "66.67"
        },
      ],
      'xablau'
    ] as [unknown[], unknown];
    
    beforeEach(() => {      
      sinon.stub(sequelize, 'query').resolves(mock)
    });

    afterEach(() => sinon.restore());

    it('Testa se o endpoint /leaderboard/away retorna o leaderboard corretamente', async () => {
      response = await chai.request(app).get('/leaderboard/away');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mock[0]);
    });
  });

  describe('Testes da rota GET /leaderboard', () => {
    const mock = [
      [
        {
          "name": "Palmeiras",
          "totalPoints": "6",
          "totalGames": 2,
          "totalVictories": "2",
          "totalDraws": "0",
          "totalLosses": "0",
          "goalsFavor": "7",
          "goalsOwn": "0",
          "goalsBalance": "7",
          "efficiency": "100.00"
        },
        {
          "name": "Corinthians",
          "totalPoints": "6",
          "totalGames": 3,
          "totalVictories": "2",
          "totalDraws": "0",
          "totalLosses": "1",
          "goalsFavor": "6",
          "goalsOwn": "2",
          "goalsBalance": "4",
          "efficiency": "66.67"
        },
      ],
      'xablau'
    ] as [unknown[], unknown];
    
    beforeEach(() => {      
      sinon.stub(sequelize, 'query').resolves(mock)
    });

    afterEach(() => sinon.restore());

    it('Testa se o endpoint /leaderboard retorna o leaderboard corretamente', async () => {
      response = await chai.request(app).get('/leaderboard');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mock[0]);
    });
  });
})