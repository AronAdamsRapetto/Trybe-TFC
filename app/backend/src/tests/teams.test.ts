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

  describe('Testes da rota GET /teams:id', () => {
    const mock = {
      "id": 5,
      "teamName": "Cruzeiro"
    };
    beforeEach(() => {
      sinon.stub(Team, 'findByPk').resolves(mock as Team);
    });

    afterEach(() => sinon.restore());

    it('Testa se o endpoint GET /teams/:id retorna um status 404 ao mandar uma request com um id que não existe', async () => {
      sinon.restore();
      sinon.stub(Team, 'findByPk').resolves(null);

      response = await chai.request(app).get('/teams/999');

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Team not found!' });
    });

    it('Testa se o endpoint GET /teams/:id retorna um time ao mandar uma request com um id existente', async () => {
      response = await chai.request(app).get('/teams/5');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mock);
    });
  });
});