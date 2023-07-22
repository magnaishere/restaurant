var nodemailer = require('nodemailer');
const owner = process.env.EMAIL;
//Creamos el objeto de transporte
var mailer = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
});
sendMail = async (email, asunto, message, pantilla) => {
    let body = '';
    switch (pantilla) {
        case "simple":
            body = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;} h1{ font-size: 30px !important;} h2{ font-size: 25px !important;} h3{ font-size: 18px !important;} h4{ font-size: 16px !important;} p, a{font-size: 15px !important;} .claseBoton{ width: 30%; background-color: #fcae3b; border: 2px solid #fcae3b; color: black; padding: 16px 32px; text-align: center; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px; margin: 4px 2px; transition-duration: 0.4s; cursor: pointer;} .claseBoton:hover{ background-color: #000000; color: #ffffff; } .imag{ width: 30px; height: 30px; border-radius: 50%; }.contA{ margin: 0px 5px 0 5px; }.afooter{ color: #ffffff !important; text-decoration: none; font-size: 13px !important; }</style></head><body><div style="width: 100%; background-color: #14080E;"><div style="padding: 20px 10px 20px 10px;"><div style="background-color: #14080E; padding: 10px 0px 10px 0px; width: 100%; text-align: center;"><img src="https://i.ibb.co/HK2cRWD/logo-big.png" alt="" style="width: 200px; height: 120px;"></div><div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;"><h1>${asunto}</h1><p>${message}</p><p>Gracias por tu tiempo.</p></div><div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;"><a href="https://instagram.com/creacionesmaya1111?igshid=YmM0MjE2YWMzOA==" class="contA"><img src="https://i.ibb.co/Q6WBvLw/insta.png" class="imag" /></a><p style="background-color: #14080E; padding: 10px 0px 10px 0px; font-size: 12px !important;">2023 Creaciones Maya</p></div></div></div></body></html>`;
            break;
        case "formulario":
            body = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;} h1{ font-size: 30px !important;} h2{ font-size: 25px !important;} h3{ font-size: 18px !important;} h4{ font-size: 16px !important;} p, a{font-size: 15px !important;} .claseBoton{ width: 30%; background-color: #fcae3b; border: 2px solid #fcae3b; color: black; padding: 16px 32px; text-align: center; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px; margin: 4px 2px; transition-duration: 0.4s; cursor: pointer;} .claseBoton:hover{ background-color: #000000; color: #ffffff; } .imag{ width: 30px; height: 30px; border-radius: 50%; }.contA{ margin: 0px 5px 0 5px; }.afooter{ color: #ffffff !important; text-decoration: none; font-size: 13px !important; }</style></head><body><div style="width: 100%; background-color: #14080E;"><div style="padding: 20px 10px 20px 10px;"><div style="background-color: #14080E; padding: 10px 0px 10px 0px; width: 100%; text-align: center;"><img src="https://i.ibb.co/HK2cRWD/logo-big.png" alt="" style="width: 200px; height: 120px;"></div><div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">${asunto}<br/>${message}</div><div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;"><a href="https://instagram.com/creacionesmaya1111?igshid=YmM0MjE2YWMzOA==" class="contA"><img src="https://i.ibb.co/Q6WBvLw/insta.png" class="imag" /></a><p style="background-color: #14080E; padding: 10px 0px 10px 0px; font-size: 12px !important;">2023 Creaciones Maya</p></div></div></div></body></html>`;
            break;
        default:
            break;
    }
    var mailOptions = {
        from: owner,
        to: email,
        subject: asunto,
        text: message,
        html: body
    };
    const result = await mailer.sendMail(mailOptions);
    return result;
}

module.exports = {
    sendMail
};