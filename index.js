const express = require("express");
const { Deta } = require("deta");
const upload = require("express-fileupload");

const app = express();

app.use(upload());

const deta = Deta("c0fgekps_vySAdiw5eCdmB4TXqo6dCS5a7BEJBoiT");
const profile = deta.Drive("profile_image");
const cover = deta.Drive("cover_image");

app.get("/", (req, res) => {
  res.send(
    "Thank you, mkabir_ for letting me know about Deta. Hope to hear you"
  );
});

app.get("/profile", (req, res) => {
  try {
    res.send(`
  <form action="/profile" enctype="multipart/form-data" method="post">

    <p>Change your Profile Photo</p>

    <input type="file" name="file">
    <input type="submit" value="Upload">
  </form>`);
  } catch (err) {
    console.log(err);
  }
});

app.get("/cover", (req, res) => {
  try {
    res.send(`
  <form action="/cover" enctype="multipart/form-data" method="post">

    <p>Change your Cover Photo</p>

    <input type="file" name="file">
    <input type="submit" value="Upload">
  </form>`);
  } catch (err) {
    console.log(err);
  }
});

app.post("/profile", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send("Bad request: missing some required values");
    }
    const name = req.files.file.name;
    const contents = req.files.file.data;
    const img = await profile.put(name, { data: contents });

    res.status(200).send(`${img} Profile Photo Upload success!!!`);
  } catch (err) {
    console.log(err);
  }
});

app.post("/cover", async (req, res) => {
  try {
    const file = req.files;
    if (!file) {
      return res.status(400).send("Bad request: missing some required values");
    }

    const name = file.file.name;
    const contents = file.file.data;
    const img = await cover.put(name, { data: contents });

    res.status(200).send(`${img} Cover Photo Upload success!!!`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
