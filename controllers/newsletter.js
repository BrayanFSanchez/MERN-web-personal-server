const NewsLetter = require("../models/newsletter");

const subscribeEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) res.status(400).send({ msg: "Email obligatorio" });

  const newsletter = new NewsLetter({
    email: email.toLowerCase(),
  });

  try {
    await newsletter.save();
    res.status(200).send({ msg: "Email registrado" });
  } catch (error) {
    res.status(400).send({ msg: "El email ya esta registrado" });
  }
};

const getEmails = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const emailsStored = await NewsLetter.paginate({}, options);
    res.status(200).send(emailsStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los emails" });
  }
};

const deleteEmail = async (req, res) => {
  const { id } = req.params;

  try {
    await NewsLetter.findByIdAndDelete(id);
    res.status(200).send({ msg: "Eliminación correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el registro" });
  }
};

module.exports = {
  subscribeEmail,
  getEmails,
  deleteEmail,
};
