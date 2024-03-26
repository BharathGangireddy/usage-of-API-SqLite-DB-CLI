const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite"); // return promise object so it is asynchronous

const app = express();

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
const initializeDBAndSerer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server is running......");
    });
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndSerer();

app.get("/books/", async (request, response) => {
  const getBooks = `
    SELECT * FROM book WHERE rating > 4
  `;
  const booksArray = await db.all(getBooks);
  response.send(booksArray);
});
