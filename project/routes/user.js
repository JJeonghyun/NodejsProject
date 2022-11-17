const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Cryptojs = require("crypto-js");

const { User } = require("../models/index.js");

router.post("/regist", async (req, res) => {
  try {
    const tempUser = await User.findOne({ where: { userId: req.body.id } });
    if (tempUser) {
      res.send({ overlap: 1 });
      res.status(500);
      return;
    }
    await User.create({
      userId: req.body.id,
      userPw: Cryptojs.SHA256(req.body.pw).toString(),
      userName: req.body.name,
      userYyyy: req.body.yyyy,
      userMm: req.body.mm,
      userDd: req.body.dd,
      userGender: req.body.gender,
      userEmail: req.body.email,
      userPhonenum: req.body.phone,
    });

    res.send({ signupcom: 1 });

    res.end("jjj");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.post("/cookie", function (req, res) {
  res.send(req.cookies);
});

router.post("/login", async (req, res) => {
  try {
    const checkUser = await User.findOne({ where: { userId: req.body.id } });
    if (!checkUser) {
      res.send({ message: "회원가입 되지 않은 ID 입니다." });
      res.status(500);
      return;
    }

    if (checkUser.userPw == Cryptojs.SHA256(req.body.pw).toString()) {
      res.cookie(
        "login",
        jwt.sign(
          {
            id: checkUser.userId,
            name: checkUser.userName,
          },
          process.env.JWT_KEY,
          {
            algorithm: "HS256",
            expiresIn: "30m",
            issuer: "vive",
          }
        )
      );
      res.send({
        name: checkUser.userName,
        logincheck: 1,
      });
      return;
    }
    res.status(500);
    res.send({ message: "잘못된 비밀번호입니다." });
  } catch (error) {
    console.error(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("login");
  res.end();
});
module.exports = router;
