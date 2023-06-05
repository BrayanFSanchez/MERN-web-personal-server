const express = require("express");
const NewsLetterController = require("../controllers/newsletter");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/newsletter", NewsLetterController.subscribeEmail);
api.get("/newsletter", [md_auth.asureAuth], NewsLetterController.getEmails);
api.delete(
  "/newsletter/:id",
  [md_auth.asureAuth],
  NewsLetterController.deleteEmail
);

module.exports = api;
