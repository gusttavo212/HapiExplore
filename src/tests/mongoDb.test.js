const assert = require('assert');
const app = require('../../app');

const MongoDb = require('../db/mongodb/mongoConnect')
const PessoaSchema = require('../db/mongodb/schema/pessoaSchema')

const MOCK_PESSOA_CADASTRAR = {
    name: 'Nome Cadastrar',
    sex: 'Sex Cadastrar',
    empresa: 'Empresa Cadastrar',
    age: '999'
}

const MOCK_PESSOA_DEFAULT = {
    name: 'Nome DEFAULT',
    sex: 'Sex DEFAULT',
    empresa: 'Empresa DEFAULT',
    age: '999'
}

let  MOCK_PESSOA_DEFAULT_ID;
let MongoConect = {};//recebe a connection mongodb
let api = {};//Recebe o server
describe('Suite de testes Servidor', function () {
    this.beforeAll(async () => {
        api = await app;//Conectar ao servidor

        const connection = MongoDb.connect();
        MongoConect = new MongoDb(connection, PessoaSchema)

        const result = await MongoConect.create(MOCK_PESSOA_DEFAULT);
        MOCK_PESSOA_DEFAULT_ID = result._id;
    });
    it('Verificar conexão', async () => {
        const result = await MongoConect.isConnected();
        console.log('Result', result)
        const expected = 'Conectado';

        assert.deepEqual(result, expected)
    });        
    it('Cadastrar/CREATE', async () => {
        const {name, sex, empresa, age} = await MongoConect.create(MOCK_PESSOA_CADASTRAR);
        assert.deepEqual({name, sex, empresa, age}, MOCK_PESSOA_CADASTRAR)
    });
    it('Listar/READ', async ()=> {
        const [{name, sex, empresa, age}] = await MongoConect.read({ name: MOCK_PESSOA_DEFAULT.name})
        const result = {
            name,
            sex,
            empresa,
            age
        }
        assert.deepEqual(result, MOCK_PESSOA_DEFAULT);
    })
})