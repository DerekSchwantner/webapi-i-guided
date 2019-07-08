// import express from 'express'; // ES2015 Modules
const express = require("express"); // CommonJS Modules

const Hubs = require("./data/hubs-model.js"); // <<<<<<<< add this line

const server = express();

server.use(express.json()); // <<<<<<<<<<<<<<<<<<<<<<<<< to parse JSON in POST

server.get("/", (req, res) => {
  res.send("Hello web 20 node edition");
});

// The R in CRUD
server.get("/hubs", function(req, res) {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The C in CRUD
server.post("/hubs", (req, res) => {
  // axios.post(url, data) < data shows up as req.body
  const hubInfo = req.body;
  console.log(hubInfo);

  Hubs.add(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The D in CRUD
server.delete("/hubs/:id", (req, res) => {
  const { id } = req.params;

  Hubs.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "cant find that hub" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));

// install express: npm i express
// add index.js file to the root folder
// to run it: type npm run server
// to test it: go to http://localhost:5000 using a client

// Cannot GET /

// GET is an HTTP method
