
const Notificacion = require("../../modelos/notificacion");
const Usuario = require("../../modelos/usuario");

const getNotifications = async (email) => {
    try {
        const user = await Usuario.findOne({ email: email });
        if (user) {
            const notifications = await Notificacion.find({ user: user._id }).sort({ date: -1 });
            let notifys = [];
            return Promise.all(
                await notifications.map((noti) => {
                    return new Promise((resolve0, _) => {
                        resolve0(noti.toJSON());
                    }).then((noti0) => {
                        notifys.unshift(noti0);
                    });
                })
            ).then(async () => {
                return notifys;
            });
        } else {
            console.log("usuario: ", email, "No encontrado");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

const marcarLeidas = async (email) => {
    try {
        const user = await Usuario.findOne({ email: email });
        if (user) {
            await Notificacion.updateMany({ user: user._id }, {
                $set: { status: 'readed' },
            });
            return true
        } else {
            console.log("usuario: ", email, "No encontrado");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    getNotifications,
    marcarLeidas,
};
