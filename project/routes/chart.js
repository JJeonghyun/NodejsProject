const router = require("express").Router();
const fs = require("fs");

router.get("/list", async (req, res) => {
  fs.readdir("./upload", (err, data) => {
    console.log("data : ", data);
    res.send({ data: data });
  });
});

router.get("/imglist", async (req, res) => {
  fs.readdir("./upload", (err, data) => {
    console.log("data : ", data);
    res.send({ data: data });
  });
});

const { Music } = require("../models/index.js");

router.post(`/list`, async (req, res) => {
  const chartUp = await Music.findAll({
    order: [["count", "DESC"]],
  });
  res.send({ data: chartUp });
});

router.post(`/userList`, async (req, res) => {
  const userChartOn = await Music.findAll({
    order: [["count", "DESC"]],
    where: {
      userId: req.body.userId,
    },
  });
  res.send({ data: userChartOn });
});

router.post(`/count`, async (req, res) => {
  await Music.update(
    { count: req.body.count },
    {
      where: {
        id: req.body.id,
      },
    }
  );

  res.send(`잘되네`);
});
router.post(`/countUser`, async (req, res) => {
  await Music.update(
    { count: req.body.count },
    {
      where: {
        id: req.body.id,
      },
    }
  );

  res.send(`잘되네`);
});

router.post(`/chartNum`, async (req, res) => {
  const chartNum = await Music.findAll();
  res.send({ data: chartNum });
});

module.exports = router;
