const lyrics = document.getElementsByClassName("lyrics-text");
const lyricsBtn = document.getElementsByClassName("lyrics-btn");
const lyricsoffBtn = document.getElementsByClassName("lyricsoff-btn");
const albumList = document.getElementsByClassName("album-list");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const playleftBtn = document.getElementById("playleft-btn");
const playrightBtn = document.getElementById("playright-btn");
const playList = document.getElementsByClassName("playList-line");
const musicPlayBtn = document.getElementById("musicplay-btn");
const musicAddBtn = document.getElementById("musicadd-btn");
const playController = document.getElementById("play-controller");
const volumeControl = document.getElementById("volume-control");
const playBtn = document.getElementById("play-btn");
const stopBtn = document.getElementById("stop-btn");

let userprofileid = document.getElementById("userprofile-id");
let loginbox = document.getElementById("login-box");
let logoutbox = document.getElementById("logout-box");
const playlisthide = document.getElementById("playlist-hide");
const todayhide = document.getElementById("today-hide");
const musicuploadthide = document.getElementById("musicUpload-hide");
const momhide = document.getElementById("mom-hide");

const userName = document.getElementById("user-name");
const commentBtn = document.getElementById("comment-btn");
const commentText = document.getElementById("comment");
const commentList = document.getElementById("comment-list");
const commentLength = document.getElementById("comment-length");

commentText.onkeyup = (e) => {
  commentLength.innerText = `(${commentText.value.length} / 400)`;
};

let userNameElem = "";
if (document.cookie) {
  let logincheck = document.cookie.split("=")[1].split(".")[1];

  if (logincheck) {
    logoutbox.classList.remove("on");
    loginbox.classList.add("on");
    todayhide.classList.add("on");
    playlisthide.classList.remove("on");
    musicuploadthide.classList.remove("on");
    momhide.classList.add("on");

    const curuserName = JSON.parse(
      window.atob(document.cookie.split("=")[1].split(".")[1])
    ).id;

    userprofileid.innerText = curuserName;
    userNameElem = curuserName;
  }
  document.getElementById("logout-btn").onclick = async function (e) {
    console.log("로그아웃");
    try {
      await axios.get("/api/user/logout");
    } catch (error) {
      console.error(error);
    }
    location.href = "http://localhost:8080/";
  };
}

playBtn.onclick = () => {
  playController.play();
};
stopBtn.onclick = () => {
  playController.pause();
};

volumeControl.addEventListener("change", (e) => {
  playController.volume = e.target.value / 10;
});

lyricsBtn[0].onclick = () => {
  lyrics[0].classList.toggle("on");
  lyricsBtn[0].classList.toggle("on");
  lyricsoffBtn[0].classList.toggle("on");
};

lyricsoffBtn[0].onclick = () => {
  lyrics[0].classList.toggle("on");
  lyricsBtn[0].classList.toggle("on");
  lyricsoffBtn[0].classList.toggle("on");
};

rightBtn.addEventListener("click", function () {
  albumList[0].classList.add("slide-motion-right");
  albumList[0].classList.remove("slide-motion-left");
});

leftBtn.addEventListener("click", function () {
  albumList[0].classList.add("slide-motion-left");
  albumList[0].classList.remove("slide-motion-right");
});

playrightBtn.onclick = () => {
  playList[0].classList.add("slide-motion-right");
  playList[0].classList.remove("slide-motion-left");
};

playleftBtn.onclick = () => {
  playList[0].classList.add("slide-motion-left");
  playList[0].classList.remove("slide-motion-right");
};
//
let checkNum = 0;
async function listUp() {
  const result = (await axios.get("/api/musicInfo/play")).data;
  result?.list?.forEach((item) => {
    musicPlayBtn.onclick = () => {
      checkNum++;
      if (checkNum > 1) {
        return;
      }
      const imgDiv = document.createElement("div");
      const tempDiv = document.createElement("div");
      const tempImg = document.createElement("img");

      const innerDiv = document.createElement("div");
      const innerSecondDiv = document.createElement("div");

      tempImg.src = `../upload/${item.albumImg}`;
      playController.src = `../upload/${item.musicFile}`;
      playController.play();

      tempImg.setAttribute("filter", "none");
      tempImg.setAttribute("width", "50px");

      innerDiv.innerText = item.musicName;
      innerSecondDiv.innerText = item.singer;

      tempDiv.append(innerDiv);
      tempDiv.append(innerSecondDiv);

      imgDiv.append(tempImg);

      document.getElementsByClassName("container")[0].append(imgDiv);
      document.getElementsByClassName("container")[0].append(tempDiv);
    };
  });
}

listUp();

const musicNameInfo = document.getElementById("music-name");
const singerInfo = document.getElementById("singer-name");

musicAddBtn.onclick = () => {
  axios
    .post("/api/musicInfo/musicadd", {
      userId: userNameElem,
      musicName: musicNameInfo.innerText,
      singer: singerInfo.innerText,
    })
    .then((data) => {
      alert("현재 재생목록에 추가되었습니다.");
    });
};

function commentSaveload() {
  commentList.innerHTML = "";
  axios.get("/api/musicInfo").then((data) => {
    data.data?.list?.forEach((item, index) => {
      const mainDiv = document.createElement("div");
      const userDiv = document.createElement("div");
      const idP = document.createElement("p");
      const dateDiv = document.createElement("div");
      const dateP = document.createElement("p");
      const tempDiv = document.createElement("div");
      const textP = document.createElement("p");
      const btnBox = document.createElement("div");
      const deleteBtn = document.createElement("button");
      const line = document.createElement("hr");

      idP.innerText = item.userId;
      dateP.innerText = new Date(item.createdAt).toLocaleString();
      textP.innerText = item.userComment;
      deleteBtn.innerText = "삭제";

      deleteBtn.style.borderRadius = "10px";
      deleteBtn.style.fontSize = "12px";
      deleteBtn.style.backgroundColor = "gray";
      deleteBtn.style.color = "white";
      dateP.style.color = "gray";
      dateP.style.fontSize = "13px";
      textP.classList.add("item-comment");

      userDiv.append(idP);
      dateDiv.append(dateP);
      tempDiv.append(textP);
      btnBox.append(deleteBtn);
      mainDiv.append(userDiv);
      mainDiv.append(dateDiv);
      mainDiv.append(tempDiv);
      mainDiv.append(btnBox);
      mainDiv.append(line);
      commentList.append(mainDiv);

      deleteBtn.onclick = async () => {
        const resultDel = await axios.post("/api/musicInfo/delete", {
          userId: userNameElem,
          comment:
            document.getElementsByClassName("item-comment")[index].innerText,
        });
        commentSaveload();
      };
    });
    document.getElementById(
      "comment-num"
    ).innerText = `${commentList.children.length}개의 감상평`;
  });
}

commentSaveload();

userName.innerText = `${userNameElem}님`;
userName.style.marginLeft = "40px";
commentList.style.marginTop = "40px";
commentList.style.marginBottom = "100px";

commentBtn.onclick = () => {
  if (!commentText.value) return alert("댓글 내용을 입력해주세요.");
  try {
    axios
      .post("/api/musicInfo/comment", {
        userId: userNameElem,
        comment: commentText.value,
      })
      .then((data) => {
        commentSaveload();
      });
    commentText.value = "";
    commentLength.innerText = "(0 / 400)";

    document.getElementById(
      "comment-num"
    ).innerText = `${commentList.children.length}개의 감상평`;
  } catch (err) {
    console.error(err);
  }
};
