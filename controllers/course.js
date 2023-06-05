const course = require("../models/course");
const Course = require("../models/course");
const image = require("../utils/image");

const createCourse = async (req, res) => {
  const course = new Course(req.body);

  const imagePath = image.getFilePath(req.files.miniature);
  course.miniature = imagePath;

  try {
    const courseStored = await course.save();
    res.status(201).send(courseStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el curso" });
  }
};

const getCourse = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const courses = await Course.paginate({}, options);
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los cursos" });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const courseData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    courseData.miniature = imagePath;
  }

  try {
    await Course.findByIdAndUpdate({ _id: id }, courseData);
    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el curso" });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await Course.findByIdAndDelete(id);
    res.status(200).send({ msg: "Curso eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el curso" });
  }
};

module.exports = { createCourse, getCourse, updateCourse, deleteCourse };
