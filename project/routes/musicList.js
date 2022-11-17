const router = require("express").Router();

const { MusicList } = require(`../models/index.js`);

router.post(`/list`, async (req, res) => {
  const listUp = await MusicList.findAll({
    where: {
      userId: req.body.userId,
      playList: req.body.playlistName,
    },
  });

  res.send({ data: listUp });
});

router.post(`/delete`, async (req, res) => {
  await MusicList.destroy({
    where: {
      singer: req.body.singer,
      musicName: req.body.musicName,
    },
  });

  res.send(`지웟다`);
});

module.exports = router;
