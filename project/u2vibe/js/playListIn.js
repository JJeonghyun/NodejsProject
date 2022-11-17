let logoutbox = document.getElementById("logout-box");
const playlisthide = document.getElementById("playlist-hide");
const todayhide = document.getElementById("today-hide");
const musicuploadthide = document.getElementById("musicUpload-hide");
const momhide = document.getElementById("mom-hide");
const volumeControl = document.getElementById("volume-control");
const playBtn = document.getElementById("play-btn");
const stopBtn = document.getElementById("stop-btn");

const album = `BORN_PINK`;
const userprofileid = document.getElementById("userprofile-id");
const playController = document.getElementById("play-controller");

const curuserName = JSON.parse(
  window.atob(document.cookie.split("=")[1].split(".")[1])
).id;
if (document.cookie) {
  let logincheck = document.cookie.split("=")[1].split(".")[1];

  if (logincheck) {
    logoutbox.classList.remove("on");

    const curuserName = JSON.parse(
      window.atob(document.cookie.split("=")[1].split(".")[1])
    ).id;

    userprofileid.innerText = curuserName;
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

async function makePlayInList() {
  try {
    const listData = (
      await axios.post(`/api/musiclist/list`, {
        userId: curuserName,
        playlistName: decodeURI(window.location.search.split("?")[1]),
      })
    ).data;
    const container = document.getElementById(`play-list-container`);

    for (let i = 0; i < listData.data.length; i++) {
      let addList = document.createElement(`div`);
      addList.innerHTML = `<div class="play-list-contents-outter"><div class="play-list-contents-add">
      <div class="play-list-inner-contents"><div><input type="checkbox"></div><div class="play-img-div">
          <img src = "../upload/${listData.data[i].albumImg}" class="play-List-img-file" ></div><div class="music-name">${listData.data[i].musicName}</div></div>
      <div class="singer-name">${listData.data[i].singer}</div>
      <div class="album-name">${listData.data[i].albumName}</div>
      <div ><button class="del-btn">삭제</button></div></div></div>`;
      container.append(addList);
      document.getElementsByClassName(`play-img-div`)[i].onclick = () => {
        document.getElementsByClassName("container")[0].innerHTML = "";
        let imgDiv = document.createElement("div");
        let tempDiv = document.createElement("div");
        let tempImg = document.createElement("img");
        let innerDiv = document.createElement("div");
        let innerSecondDiv = document.createElement("div");
        tempImg.src =
          document.getElementsByClassName(`play-List-img-file`)[i].src;
        tempImg.setAttribute("filter", "none");
        tempImg.setAttribute("width", "50px");
        innerDiv.innerText = listData.data[i].musicName;
        innerSecondDiv.innerText = listData.data[i].singer;
        playController.src = `../upload/${listData.data[i].musicFile}`;
        playController.play();
        tempDiv.append(innerDiv);
        tempDiv.append(innerSecondDiv);
        imgDiv.append(tempImg);
        document.getElementsByClassName("container")[0].append(imgDiv);
        document.getElementsByClassName("container")[0].append(tempDiv);
      };
    }
  } catch (err) {
    console.error(err);
  }
  const test1 = document.getElementsByClassName(`del-btn`);

  function delFunc() {
    for (let i = 0; i < test1.length; i++) {
      test1[i].onclick = () => {
        axios.post(`/api/playList/delete`, {
          singer: document.getElementsByClassName(`singer-name`)[i].innerText,
          musicName: document.getElementsByClassName(`music-name`)[i].innerText,
        }).data;
        document
          .getElementsByClassName(`play-list-contents-outter`)
          [i].remove();
        delFunc();
      };
    }
  }
  delFunc();
}
makePlayInList();

async function playListInfo() {
  const data = await axios.post(`/api/playlist/list`, {
    userId: curuserName,
    playlistName: decodeURI(window.location.search.split("?")[1]),
  });
  const playListPage = document.getElementsByClassName(`play-list-page`)[0];
  const playListHeader = document.createElement(`div`);
  const playListHeaderImg = document.createElement(`div`);
  const playListInfo = document.createElement(`div`);
  const playListInfoDiv = document.createElement(`div`);
  const playListName = document.createElement(`h1`);
  const playListContents = document.createElement(`h4`);
  const playListBtnBox = document.createElement(`div`);

  playListPage.prepend(playListHeader);
  playListHeader.append(playListHeaderImg);
  playListHeader.append(playListInfo);
  playListInfo.append(playListInfoDiv);
  playListInfoDiv.append(playListName);
  playListInfoDiv.append(playListContents);
  playListInfo.append(playListBtnBox);
  playListHeader.classList.add(`play-list-header`);
  playListHeaderImg.innerHTML = `<img src="${
    document.getElementsByClassName(`play-List-img-file`)[0].src
  }" alt="" style="width: 240px" />`;
  playListInfo.classList.add(`play-list-info`);
  playListName.innerText = `${data.data.playlistName}`;
  playListContents.innerText = `${data.data.playlistInfo}`;
}

playListInfo();
function musicPlay(idx) {
  playController.src = `../upload/${musicList[idx]}`;
  playController.play();
}
