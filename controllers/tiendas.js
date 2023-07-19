const Usuario = require("../modelos/usuario");
// const Producto = require("../modelos/producto");
const Tienda = require("../modelos/tienda");
const { ObjectId } = require("mongoose").Types;

const crearTienda = async (req, res) => {
  const { description, user } = req.body;
  const usuarioDB = await Usuario.findById(user);
  if (!usuarioDB) {
    return res.json({
      ok: false,
      code: 7,
    });
  }
  const tiendaDB = await Tienda.findOne({ admin: usuarioDB._id });
  if (tiendaDB) {
    return res.json({
      ok: false,
      code: 8,
    });
  }
  const store = new Tienda({ description : description, admin: usuarioDB._id }, { versionKey: false });
  await store.save();
  const exit = await store.toJSON();
  res.json({
    ok: true,
    store: exit
  });  
};

const actualizarTienda = async (req, res) => {
  const id = req.params.id;
  const tiendaDB = await Tienda.findById(id);
  if (!tiendaDB) {
    return res.json({
      ok: false,
      code: 4,
    });
  }
  const { title, description, banner, logo, socials } = req.body;
  if (title) {
    tiendaDB.title = title;
  }
  if (description) {
    tiendaDB.description = description;
  }
  if (banner) {
    tiendaDB.banner = banner;
  }
  if (logo) {
    tiendaDB.logo = logo;
  }
  if (socials) {
    tiendaDB.socials = socials;
  }
  if (socials) {
    tiendaDB.socials = socials;
  }
  await tiendaDB.save();
  const exit = await tiendaDB.toJSON();
  res.json({
    ok: true,
    store: exit
  });   
};

const desactivarTienda = async (req, res) => {
  const id = req.params.id;
  const tiendaDB = await Tienda.findById(id);
  if (!tiendaDB) {
    return res.json({
      ok: false,
      code: 4,
    });
  }
  tiendaDB.active = false;
  await tiendaDB.save();
  res.json({
    ok: true
  });   
};

const activarTienda = async (req, res) => {
  const id = req.params.id;
  const tiendaDB = await Tienda.findById(id);
  if (!tiendaDB) {
    return res.json({
      ok: false,
      code: 4,
    });
  }
  tiendaDB.active = true;
  await tiendaDB.save();
  res.json({
    ok: true
  });   
};

const obtenerMiTienda = async (req, res) => {
  const id = req.params.id;
  const usuarioDB = await Usuario.findById(id);
  if (!usuarioDB) {
    return res.json({
      ok: false,
      code: 7,
    });
  }
  const tiendaDB = await Tienda.findOne({ admin : usuarioDB._id });
  if (!tiendaDB) {
    return res.json({
      ok: false,
      code: 12,
    });
  }
  res.json({
    ok: true,
    store: await tiendaDB.toJSON()
  });   
};

module.exports = {
  crearTienda,
  actualizarTienda,
  desactivarTienda,
  activarTienda,
  obtenerMiTienda
};
