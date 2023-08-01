const Categoria = require("../modelos/categoria");
// const Producto = require("../modelos/producto");
const Tienda = require("../modelos/tienda");
const { ObjectId } = require("mongoose").Types;

const getAll = async (id) => {
  const catsDB = await Categoria.find({ store: id });
  let exitCats = [];
  for (const cat of catsDB) {
    const categ = await cat.toJSON();
    exitCats.unshift(categ);
  }
  return exitCats;
}

const getTodasCategorias = async (req, res) => {
  const id = req.params.id;
  const tiendaDB = await Tienda.findById(id);
  if (!tiendaDB) {
    return res.json({
      ok: false,
      code: 4,
    });
  }
  const cats = await getAll(tiendaDB._id);
  res.json({
    ok: true,
    categories: cats
  });  
};

const crearCategoria = async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const tiendaDB = await Tienda.findById(id);
  if (!tiendaDB) {
    return res.json({
      ok: false,
      code: 4,
    });
  }
  const categoriaDB = await Categoria.findOne({ title, store: tiendaDB._id });
  if (!categoriaDB) {
    const cat = new Categoria({ title : title, store: tiendaDB._id }, { versionKey: false });
    await cat.save();
    const cats = await getAll(tiendaDB._id);
    res.json({
      ok: true,
      categories: cats
    });  
  } else {
    res.json({
      ok: false,
      code: 5,
    });
  }
};

const actualizarCategoria = async (req, res) => {
  const id = req.params.id;
  const cat = req.params.cat;
  const { title } = req.body;
  const tiendaDB = await Tienda.findById(id);
  if (!tiendaDB) {
    return res.json({
      ok: false,
      code: 4,
    });
  }
  const categoriaDB = await Categoria.findById(cat);
  if (!categoriaDB) {
    return res.json({
      ok: false,
      code: 6,
    });
  }
  if (!categoriaDB.store.equals(new ObjectId(id))) {
    return res.json({
      ok: false,
      code: 4,
    });
  }
  const categoria2DB = await Categoria.findOne({ title });
  if (!categoria2DB) {
    categoriaDB.title = title;
    await categoriaDB.save();
    const cats = await getAll(tiendaDB._id);
    res.json({
      ok: true,
      categories: cats
    });  
  } else {
    res.json({
      ok: false,
      code: 5,
    });
  }
  
};

const eliminarCategoria = async (req, res) => {
  const id = req.params.id;
  const cat = req.params.cat;
  const tiendaDB = await Tienda.findById(id);
  if (!tiendaDB) {
    return res.json({
      ok: false,
      code: 4,
    });
  }
  const categoriaDB = await Categoria.findById(cat);
  if (!categoriaDB) {
    return res.json({
      ok: false,
      code: 6,
    });
  }
  // const productosDB = await Producto.find({ category : categoriaDB._id  });
  // if (productosDB.length!=0) {
  //   for (const produc of productosDB) {
  //     produc.category = null;
  //     await produc.save();
  //   }
  // }
  await Categoria.findByIdAndDelete(cat);
  const cats = await getAll(tiendaDB._id);
  res.json({
    ok: true,
    categories: cats
  });
};

module.exports = {
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  getTodasCategorias,
};
