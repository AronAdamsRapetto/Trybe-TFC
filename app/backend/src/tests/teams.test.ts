import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('Tesstes de integração das rotas teams', () => {
  let response: Response;

  describe('Testes da rota /teams', () => {
    const mock = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },    
    ];
    beforeEach(() => {
      sinon.stub(Team, 'findAll').resolves(mock as Team[]);
    });

    afterEach(() => sinon.restore());

    it('Testa se o enpoint GET /teams retorna os times corretamente', async () => {
      response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mock);
    });
  });
});