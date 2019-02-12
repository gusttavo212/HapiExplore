const Hapi = require('hapi');

//BD
const MongoDb = require('./src/db/mongodb/mongoConnect')
const PessoaSchema = require('./src/db/mongodb/schema/pessoaSchema')

//Rotas
const PessoaRoute = require('./src/routes/pessoaRoute');

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

function mapRoutes(instance, methods) {    
    return methods.map(method => instance[method]())//Pegar todos os metodos da rota
}

async function startServer() {
    //Abir o Servidor
    try {
        await app.start();
        console.log('Servidor rodando na porta', app.info.port);
       
        const connection = MongoDb.connect();
        const MongoConect = new MongoDb(connection, PessoaSchema)
    
        app.route([        
            ...mapRoutes(new PessoaRoute(MongoConect), PessoaRoute.methods()),//Retorna rotas de heroRoutes             
        ]);
    

        return app;
    } catch (error) {
        throw console.log('Error ao iniciar o server',error)
    }

    //Conectar ao MONGODB  
        
};

module.exports = startServer()