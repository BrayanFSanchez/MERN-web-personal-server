const Menu = require("../models/menu");

const createMenu = async (req, res) => {
  const menu = new Menu(req.body);

  try {
    const menuStored = await menu.save();
    res.status(200).send(menuStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el menu" });
  }
};

const getMenus = async (req, res) => {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await Menu.find().sort({ order: "asc" });
  } else {
    response = await Menu.find({ active }).sort({ order: "asc" });
  }

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado ningun menu" });
  } else {
    res.status(200).send(response);
  }
};

const updateMenu = async (req, res) => {
  const { id } = req.params;
  const menuData = req.body;

  try {
    await Menu.findByIdAndUpdate({ _id: id }, menuData);
    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el menú" });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    await Menu.findByIdAndDelete(id);
    res.status(200).send({ msg: "Menú eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el menú" });
  }
};

module.exports = { createMenu, getMenus, updateMenu, deleteMenu };
