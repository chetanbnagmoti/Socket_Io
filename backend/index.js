const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

//Normarrly HTML send
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

//Html file send then
app.get("/index", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.rooms); // Set { <socket.id> }
  socket.join("room1");
  console.log(socket.rooms); 
  // join the room named 'some room'
  socket.join("some room");

  // broadcast to all connected clients in the room
  io.to("some room").emit("hello", "world");

  // broadcast to all connected clients except those in the room
  io.except("some room").emit("hello", "world");

  // leave the room
  socket.leave("some room");
  //Event fire Here :-Using On
  socket.on("chat message", (msg) => {
    //send the message to everyone, including the sender.
    socket.emit("hello", "world");
    //Broadcasting :-
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });

  socket.on("hello1", (arg1, arg2, arg3) => {
    console.log(arg1); // 1
    console.log(arg2); // '2'
    console.log(arg3); // { 3: '4', 5: <Buffer 06> }
  });

  socket.on("request", (arg1, arg2, callback) => {
    console.log(arg1); // { foo: 'bar' }
    console.log(arg2); // 'baz'
    callback({
      status: "ok",
    });
  });

  socket.onAny((eventName, ...args) => {
    console.log(eventName); // 'hello'
    console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
  });

  socket.onAnyOutgoing((eventName, ...args) => {
    console.log(eventName); // 'hello'
    console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
  });

  //Broadcasting :-

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(8000, () => {
  console.log("server running at http://localhost:8000");
});
