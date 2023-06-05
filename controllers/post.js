const Post = require("../models/post");
const image = require("../utils/image");

const createPost = async (req, res) => {
  const post = new Post(req.body);
  post.created_at = new Date();

  const imagePath = image.getFilePath(req.files.miniature);
  post.miniature = imagePath;

  try {
    const postStored = await post.save();
    res.status(201).send(postStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el post" });
  }
};

const getPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: "desc" },
  };

  try {
    const postStored = await Post.paginate({}, options);
    res.status(200).send(postStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los post" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const postData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    postData.miniature = imagePath;
  }

  try {
    await Post.findByIdAndUpdate({ _id: id }, postData);
    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el post" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id);
    res.status(200).send({ msg: "Post eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el post" });
  }
};

const getPost = async (req, res) => {
  const { path } = req.params;

  try {
    const postStored = await Post.findOne({ path });
    if (!postStored) {
      res.status(400).send({ msg: "No se ha encontrado ningún post" });
    } else {
      res.status(200).send(postStored);
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};

module.exports = { createPost, getPosts, updatePost, deletePost, getPost };
