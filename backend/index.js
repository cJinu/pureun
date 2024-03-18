// import express from 'express';
// import http from 'http';
// import {Server} from "socket.io";
// import siofu from 'socketio-file-upload';
// import path from 'path';
// import mysql2 from 'mysql2';
// import dbconfig from './dbconfig.js';
// import fs from "fs"

const express = require("express");
const http = require("http");
const Server = require("socket.io").Server;
const siofu = require("socketio-file-upload");
const mysql2 = require("mysql2");
const dbconfig = require("./dbconfig.js");
const fs = require("fs");

const app = express().use(siofu.router);
const server = http.createServer(app);
const io = new Server(server);
const connection = mysql2.createConnection(dbconfig);

const makeFoler = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

makeFoler(__dirname + "/uploads");

/* db 연결 테스트
connection.connect();
connection.query('SELECT * FROM calender_code', (error, rows, fields) => {
    if(error) throw error;
    console.log('User Info is: ', rows);
});
connection.end();
*/

io.on("connection", (socket) => {
  const uploader = new siofu();
  uploader.dir = __dirname + `/uploads`;
  const ip = socket.request.connection.remoteAddress;
  console.log(`ip주소 받아오기 ${ip}`);
  console.log(socket.handshake.time);
  uploader.listen(socket);

  uploader.on("saved", (event) => {
    console.log("File saved:", event.file.name);
    socket.emit("msg", event.file.name);
  });

  socket.on("insertSql", (array) => {
    // console.log(array[0], array[1]);
    let sql = `INSERT INTO calender_code VALUES (?, ?)`;
    let selectSql = "SELECT * FROM calender_code";
    connection.execute(sql, array, (err, rows, fields) => {
      if (err) socket.emit("error", "에러가 발생했습니다.");
      else
        connection.query(selectSql, (rows) => {
          console.log(rows);
        });
    });
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + `/index.html`);
});

server.listen(3000, () => {
  console.log("Server is Running on *:3000");
});
