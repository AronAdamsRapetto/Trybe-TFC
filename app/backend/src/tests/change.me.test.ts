import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /login', () => {
  let response: Response;
  let token: 'GVESNBOUVNIOAEVUB124578BCNAKJBVUA'

  beforeEach(async () => {
    sinon.stub(User, "findOne").resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      } as User);

    // sinon.stub(utils, generateToken).returns(token);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  });

  it('Testa se ao mandar uma requisição sem email é retornado um erro 400', async () => {
    response = await chai
       .request(app).post('/login').send({
        password: '123456'
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testa se ao mandar uma requisição sem password é retornado um erro 400', async () => {
    response = await chai
       .request(app).post('/login').send({
        email: 'email@email.com',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testa se ao mandar uma requisição com password inválido retorna status 400', async () => {
    response = await chai
       .request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'a1',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });

  it('Testa se ao mandar uma requisição com email inválido retorna status 400', async () => {
    response = await chai
       .request(app).post('/login').send({
        email: 'admin.com',
        password: 'a1', // preciso descobrir como desencriptar a senha;
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });

  it('Testa se ao mandar uma requisição correta retorna status 200', async () => {
    response = await chai
       .request(app).post('/login').send({
        email: 'email@email.com',
        password: 'a1', // descobrir como desencriptar a senha
      });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ token }); // descomentar o generate token
  });
});

