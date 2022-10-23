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
  
    it('Testa se ao mandar uma requisição sem email é retornado um erro 400', async () => {
      response = await chai.request(app).post('/login').send({
          password: 'secret_admin'
        });
  
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
  
    it('Testa se ao mandar uma requisição sem password é retornado um erro 400', async () => {
      response = await chai.request(app).post('/login').send({
          email: 'email@email.com',
        });
  
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
  
    it('Testa se ao mandar uma requisição com password inválido retorna status 401', async () => {
      response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: '123456',
        });
  
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  
    it('Testa se ao mandar uma requisição com email inválido retorna status 401', async () => {
      sinon.restore();
      sinon.stub(User, "findOne").resolves(null);

      response = await chai.request(app).post('/login').send({
          email: 'admin.com',
          password: 'secret_admin',
        });
  
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  
    it('Testa se ao mandar uma requisição correta retorna status 200', async () => {
      response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
    });    
  });

  describe('Testes da rota "/login/validate"', () => {
    it('Testa se ao validar login com token inválido retorna o erro 401', async () => {
      response = await chai.request(app).get('/login/validate')
        .set('authorization', 'token inválido');
  
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.property('message');
    });
  
    it('Testa se ao validar login sem o token retorna o erro 401', async () => {
      response = await chai.request(app).get('/login/validate');
  
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Invalid Token!' });
    });
  
    it('Testa se é pissível validar login com o token correto', async () => {
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

