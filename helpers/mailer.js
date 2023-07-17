var nodemailer = require('nodemailer');
const owner = 'luis.aponte80@gmail.com';
//Creamos el objeto de transporte
var mailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: '',
        pass: ''
    }
});
sendMail = (email, asunto, message) => {
    var mailOptions = {
        from: owner,
        to: email,
        subject: asunto,
        text: message
    };
    mailer.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
            console.log('Correo no enviado');
        }
    });
}
module.exports = {
    sendMail
};