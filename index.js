const mongoose = require("mongoose");
require("dotenv").config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const API_VERSION = process.env.API_VERSION;
const IP_SERVER = process.env.IP_SERVER;
// const {
//   DB_USER,
//   DB_PASSWORD,
//   DB_HOST,
//   IP_SERVER,
//   API_VERSION,
// } = require("./constants");
const app = require("./app");

const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3977;

async function connectToDatabase() {
  try {
    const db = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb se conectó a:", db.connection.host);
    app.listen(PORT, () => {
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    });
  } catch (err) {
    console.log(err);
  }
}

connectToDatabase();
