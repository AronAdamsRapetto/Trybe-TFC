import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração do login', () => {
  let response: Response;

  describe('Testes da rota /login', () => {  
    beforeEach(async () => {
      sinon.stub(User, "findOne").resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      } as User);
    });
  
    afterEach(() => sinon.restore());
  
    it('Testa se o endpoint POST /login retorna um status 400 ao mandar uma request sem email', async () => {
      response = await chai.request(app).post('/login').send({
          password: 'secret_admin'
        });
  
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
  
    it('Testa se o endpoint POST /login retorna um status 400 ao mandar uma request sem password', async () => {
      response = await chai.request(app).post('/login').send({
          email: 'email@email.com',
        });
  
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
  
    it('Testa se o endpoint POST /login retorna status 401 ao mandar uma request com password inválido', async () => {
      response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: '123456',
        });
  
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  
    it('Testa se o endpoint POST /login retorna status 401 ao mandar uma request com email inválido', async () => {
      sinon.restore();
      sinon.stub(User, "findOne").resolves(null);

      response = await chai.request(app).post('/login').send({
          email: 'admin.com',
          password: 'secret_admin',
        });
  
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  
    it('Testa se o endpoint POST /login retorna status 200 ao mandar uma request correta', async () => {
      response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
    });    
  });

  describe('Testes da rota "/login/validate"', () => {
    it('Testa se o endpoint /login/validate retorna o status 401 ao mandar uma request com token inválido', async () => {
      response = await chai.request(app).get('/login/validate')
        .set('authorization', 'token inválido');
  
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.property('message');
    });
  
    it('Testa se o endpoint /login/validate retorna o status 401 ao mandar uma request sem o token', async () => {
      response = await chai.request(app).get('/login/validate');
  
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Invalid Token!' });
    });
  
    it('Testa se o endpoint /login/validate retorna o status 200 ao mandar uma request com o token correto', async () => {
      sinon.stub(User, "findOne").resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      } as User);

      const login = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
  
      response = await chai.request(app).get('/login/validate')
        .set('authorization', login.body.token);
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ role: 'admin' });

      sinon.restore();
    });
  });
});

