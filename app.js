const Hapi = require('hapi');

const MongoDb = require('./src/db/mongodb/mongoConnect')
const PessoaSchema = require('./src/db/mongodb/schema/pessoaSchema')

//Create server
const app = new Hapi.Server(
    {
        port: 5000,
        routes: {
            //Cors permite o uso da API
            cors: {
                origin: ["*"],
                headers: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type", "CORELATION_ID"],
                credentials: true
            }
          }    
    }
);


async function startServer() {
    //Abir o Servidor
    try {
        await app.start();
        console.log('Servidor rodando na porta', app.info.port);
    
        return app;
    } catch (error) {
        throw console.log('Error ao iniciar o server',error)
    }

    //Conectar ao MONGODB
    const connection = MongoDb.connect();
    const MongoConect = new MongoDb(connection, PessoaSchema)
    
    
};

module.exports = startServer();