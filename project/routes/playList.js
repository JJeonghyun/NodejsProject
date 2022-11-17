const router = require("express").Router();

const { PlayList } = require(`../models/index.js`);

router.post(`/list`, async (req, res) => {
  const playlistData = await PlayList.findOne({
    where: {
      userId: req.body.userId,
      playlistName: req.body.playlistName,
    },
  });
  res.send(playlistData);
});

router.post("/addplaylist", async (req, res) => {
  try {
    const tempPlaylist = await PlayList.findOne({
      where: { playlistName: req.body.name, userId: req.body.id },
    });
    if (tempPlaylist) {
      res.send({ overlap: 1 });
      res.status(501);
      return;
    }
    await PlayList.create({
      userId: req.body.id,
      playlistName: req.body.name,
      playlistInfo: req.body.info,
    });
    res.send({ addplaylistcom: 1 });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.post("/myplaylist", async (req, res) => {
  try {
    const tempUserid = await PlayList.findAll({
      where: { userId: req.body.id },
    });
    console.log(req.bdoy);
    res.send({ info: tempUserid });
  } catch (error) {
    res.status(503);
    res.send(error);
  }
});

router.post("/delete", async (req, res) => {
  const deleteElem = await PlayList.destroy({
    where: {
      playlistName: req.body.title,
    },
  });
  res.send("삭제완료");
});

module.exports = router;
