const assert = require('assert');
const app = require('../../app');

const MongoDb = require('../db/mongodb/mongoConnect')
const PessoaSchema = require('../db/mongodb/schema/pessoaSchema')
const Context = require('../db/base/ContextStrategy');

let MongoConect = {};//recebe a connection mongodb
let api = {};//Recebe o server
describe('Suite de testes Servidor', function () {
    this.beforeAll(async () => {
        api = await app;//Conectar ao servidor
        const connection = MongoDb.connect();
        MongoConect = new MongoDb(connection, PessoaSchema)
    });
    it('Verificar conexão', async () => {
        const result = await MongoConect.isConnected();
        console.log('Result', result)
        const expected = 'Conectado';

        assert.deepEqual(result, expected)
    });        
})