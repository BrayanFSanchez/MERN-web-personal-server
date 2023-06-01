const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: false,
    // password,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  try {
    const userStorage = await user.save();
    res.status(200).send(userStorage);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el usuario" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La constraseña es obligatorio" });

  const emailLowerCase = email.toLowerCase();

  try {
    const userStore = await User.findOne({ email: emailLowerCase });

    bcrypt.compare(password, userStore.password, (bcryptError, check) => {
      if (bcryptError) {
        res.status(500).send({ msg: "Error del servidor" });
      } else if (!check) {
        res.status(400).send({ msg: "Contraseña incorrecta" });
      } else if (!userStore.active) {
        res.status(401).send({ msg: "Usuario no autorizado o no activo" });
      } else {
        res.status(200).send({
          access: jwt.createAccessToken(userStore),
          refresh: jwt.createRefreshToken(userStore),
        });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) res.status(400).send({ msg: "Token requerido" });

    const { user_id } = jwt.decoded(token);

    const userStorage = await User.findOne({ _id: user_id });
    res.status(200).send({ accessToken: jwt.createAccessToken(userStorage) });
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};

module.exports = { register, login, refreshAccessToken };
