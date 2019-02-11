const Hapi = require('hapi');

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


async function main() {
    try {
        await app.start();
        console.log('Servidor rodando na porta', app.info.port);
    } catch (error) {
        throw console.log('Error ao iniciar o server',error)
    }
    
};

main();