const SocketSesion = require("../../modelos/socketsesion");
const Usuario = require("../../modelos/usuario");

const crearSesion = async (email, id) => {
    try {
        const user = await Usuario.findOne({ email: email });
        if (user) {
            const ssesion = await SocketSesion.findOne({ user: user._id, loguedOutAt: { $exists: false } });
            if (ssesion) {
                await SocketSesion.findByIdAndUpdate(ssesion._id, { socket: id, lastConnect: Date.now() }, {
                    new: true,
                });
            }else{
                const sesion = new SocketSesion({ user : user._id, socket: id }, { versionKey: false });
                await sesion.save();
            }
            return true;
        } else {
            console.log("usuario: ", email, "No encontrado");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

const cerrarSesion = async (email) => {
    try {
        const user = await Usuario.findOne({ email: email });
        if (user) {
            const ssesion = await SocketSesion.findOne({ user: user._id, loguedOutAt: { $exists: false } });
            if (ssesion) {
                await SocketSesion.findByIdAndUpdate(ssesion._id, { loguedOutAt: Date.now() }, {
                    new: true,
                });
                return true;
            }else{
                return false;
            }
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
    crearSesion,
    cerrarSesion,
};
