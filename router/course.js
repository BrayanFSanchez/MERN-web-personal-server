const express = require("express");
const multiparty = require("connect-multiparty");
const CourseCotroller = require("../controllers/course");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/course" });
const api = express.Router();

api.post(
  "/course",
  [md_auth.asureAuth, md_upload],
  CourseCotroller.createCourse
);

module.exports = api;
