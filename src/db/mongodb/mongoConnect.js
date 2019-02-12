const mongoose = require('mongoose');

const STATUS = {
    0: "Disconectado",
    1: "Conectado",
    2: "Conectando",
    3: "Disconectado"
  };

class MongoDB{
    constructor(connection, schema) {               
        this._schema = schema;
        this._connection = connection;
    };
        //Veriicar se esta conectado
        async isConnected() {
            const state = STATUS[this._connection.readyState];
            if (state === "Conectado") return state;
        
            if (state !== "Conectando") return state;
        
            await new Promise(resolve => setTimeout(resolve, 1000));
        
            return STATUS[this._connection.readyState];
        };

        //Conectar ao banco de dados 
        static connect() {
            try {
                mongoose.connect("mongodb://gadsden:250433@localhost/pessoaTest?authSource=admin&w=1", {
                    useNewUrlParser: true
                });
            } catch (error) {
                throw console.log("Falha na conexão MongoDB", error);
            };

            const connection = mongoose.connection;//PEgar conexão
            connection.once("open", () => console.log("Database  CONECTADO"));

            return connection;
        };

        //Create
};

module.exports = MongoDB;