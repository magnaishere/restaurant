const mongoose = require('mongoose');
const dbConnection = async() =>{
    try {
        // cadena de conexion a base de datos
        // await mongoose.connect('mongodb://127.0.0.1:27017/restaurant',{
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // }); 
        await mongoose.connect(process.env.DB_CNN,{
                useNewUrlParser: true,
                useUnifiedTopology: true
        }); 
        console.log('DB Online');     
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD, ver Logs');
    }
}

module.exports ={
    dbConnection
}