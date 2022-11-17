const router = require("express").Router();

const fs = require("fs");

const { Comment, Music, MusicList } = require("../models/index.js");

let tempImg = "";
let tempmusicName = "";
let tempSinger = "";
let tempalbumName = "";
let tempmusicFile = "";
let tempuserId = "";

router.post("/musicadd", (req, res) => {
  tempuserId = req.body.userId;
  Music.findOne({
    where: { musicName: req.body.musicName, singer: req.body.singer },
  }).then((data) => {
    tempImg = data.albumImg;
    tempmusicName = data.musicName;
    tempSinger = data.singer;
    tempalbumName = data.albumName;
    tempmusicFile = data.musicFile;

    MusicList.create({
      userId: tempuserId,
      playList: "Now Playlist",
      albumImg: tempImg,
      musicName: tempmusicName,
      singer: tempSinger,
      albumName: tempalbumName,
      musicFile: tempmusicFile,
      genre: "1",
    });
  });
});

router.get("/play", async (req, res) => {
  const listUp = await Music.findAll();
  fs.readdir("./upload", (err, data) => {
    res.send({ list: listUp, data: data });
  });
});

router.post("/comment", (req, res) => {
  Comment.create({
    userId: req.body.userId,
    userComment: req.body.comment,
  }).then((data) => {
    res.send({ status: "정상적으로 받아서 보냈음", data: req.body.comment });
  });
});

router.get("/", (req, res) => {
  Comment.findAll({
    order: [["id", "DESC"]],
  }).then((data) => {
    res.send({ list: data });
  });
});

router.post("/delete", (req, res) => {
  Comment.destroy({
    where: {
      userId: req.body.userId,
      userComment: req.body.comment,
    },
  }).then((data) => {
    res.send("잘 삭제해따!!넌 나가라!");
  });
});

module.exports = router;
