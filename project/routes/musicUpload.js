const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");

const { Music } = require("../models/index.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploader = multer({ storage: storage });

router.post("/delete", (req, res) => {
  Music.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: false,
  });
});

router.get("/upload", async (req, res) => {
  const listUp = await Music.findAll();

  fs.readdir("./upload", (err, data) => {
    res.send({ list: listUp, data: data });
  });
});

// router.post("/upload", uploader.single("img"), (req, res) => {
//   res.send("post ok! ");
// });

router.post(
  "/upload",
  uploader.fields([{ name: "file" }, { name: "img" }]),
  async (req, res) => {
    try {
      const tempUpload = await Music.create({
        userId: req.body.id,
        musicName: req.body.musicTitle,
        musicFile: req.files.file[0].filename,
        albumImg: req.files.img[0].filename,
        singer: req.body.singerName,
        albumName: req.body.albumTitle,
        count: 0,
        genre: req.body.formSelect,
      });
      res.send({
        userId: "jjh",
        musicName: req.body.musicTitle,
        musicFile: req.files.file[0].filename,
        albumImg: req.files.img[0].filename,
        singer: req.body.singerName,
        albumName: req.body.albumTitle,
        genre: req.body.formSelect,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/addedlist", async (req, res) => {
  try {
    const tempUpload = await Music.findAll({
      where: { userId: req.body.id },
    });
    res.send({ info: tempUpload });
  } catch (error) {
    console.log(error);
  }
});

router.post("/deletelist", async (req, res) => {
  const tempDelete = await Music.destroy({
    where: {
      userId: req.body.id,
      musicName: req.body.name,
      singer: req.body.singer,
    },
  });
  res.send("삭제완료");
});

module.exports = router;
