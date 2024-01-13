"use strict";
const mysql = require("mysql2/promise");
require('dotenv').config();

function displayWarningMessage(warning) {
  switch (warning.Code) {
    case 1007:
      console.log(`Skipping Database Creation --> ${warning.Message}`);
      break;
    case 1050:
      console.log(`Skipping Table Creation --> ${warning.Message}`);
      break;
  }
}

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
}

async function makeDatabase(connection) {
  const [result, _] = await connection.query(
    "CREATE DATABASE IF NOT EXISTS csc317db;"
  );
  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Database!");
  }
}

async function makeUsersTable(connection) {
  const [result, _] = await connection.query(`
    CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.users  (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      email VARCHAR(128) NOT NULL,
      password VARCHAR(255) NULL,
      username VARCHAR(64) NULL,
      createdAt DATETIME NULL DEFAULT current_timestamp,
      updatedAt DATETIME NULL DEFAULT current_timestamp,
      PRIMARY KEY (id),
      UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
      UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE
    )
    ENGINE = InnoDB
  `);

  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Users Table!");
  }
}

async function makePostsTable(connection) {
  const [result, _] = await connection.query(`
    CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.posts (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      createdAt DATETIME NOT NULL DEFAULT current_timestamp,
      text TEXT NOT NULL,
      fk_authorId INT UNSIGNED NOT NULL,
      updatedAt DATETIME NULL DEFAULT current_timestamp,
      fk_postId INT UNSIGNED NOT NULL,
      PRIMARY KEY (id),
      UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
      INDEX fk_comment_author_idx (fk_authorId ASC) VISIBLE,
      INDEX fk_postId_idx (fk_postId ASC) VISIBLE,
      CONSTRAINT fk_comment_author
        FOREIGN KEY (fk_authorId)
        REFERENCES ${process.env.DB_NAME}.users (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT fk_postId
        FOREIGN KEY (fk_postId)
        REFERENCES ${process.env.DB_NAME}.posts (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    )
    ENGINE = InnoDB
  `);

  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Posts Table!");
  }
}

async function makeCommentsTable(connection) {
  const [result, _] = await connection.query(`
    CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.comments (
      id INT NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT current_timestamp,
      text TEXT NOT NULL,
      fk_authorId INT UNSIGNED NOT NULL,
      updatedAt DATETIME NULL DEFAULT current_timestamp,
      fk_postId INT UNSIGNED NOT NULL,
      PRIMARY KEY (id),
      INDEX fk_comment_author_idx (fk_authorId ASC) VISIBLE,
      INDEX fk_postId_idx (fk_postId ASC) VISIBLE,
      CONSTRAINT fk_comment_author
        FOREIGN KEY (fk_authorId)
        REFERENCES ${process.env.DB_NAME}.users (id),
      CONSTRAINT fk_postId
        FOREIGN KEY (fk_postId)
        REFERENCES ${process.env.DB_NAME}.posts (id)
    )
    ENGINE = InnoDB
  `);

  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Comments Table!");
  }
}

(async function main() {
  let connection = null;
  try {
    connection = await getConnection();
    await makeDatabase(connection);
    await connection.query("USE csc317db");
    await makeUsersTable(connection);
    await makePostsTable(connection);
    await makeCommentsTable(connection);
    connection.close();
    return;
  } catch (error) {
    console.error(error);
    if (connection != null) {
      connection.close();
    }
  }
})();

// Finally submitting it 
//final term project was a good learning experience
// Thank you :)
