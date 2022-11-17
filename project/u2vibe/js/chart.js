const nextElem = document.getElementsByClassName(`carousel-item`)[1];
const prevElem = document.getElementsByClassName(`carousel-item`)[0];
const prev = document.getElementById(`prev-btn`);
const next = document.getElementById(`next-btn`);
const nextGenre = document.getElementsByClassName(`genre`)[1];
const prevGenre = document.getElementsByClassName(`genre`)[0];
const genrePrev = document.getElementById(`genre-prev-btn`);
const genreNext = document.getElementById(`genre-next-btn`);
const myChart = document.getElementsByClassName(`chart-in`)[1];
const chartText = document.getElementsByClassName(`chart-text`)[0];

let userprofileid = document.getElementById("userprofile-id");
let loginbox = document.getElementById("login-box");
let logoutbox = document.getElementById("logout-box");

const playlisthide = document.getElementById("playlist-hide");
const todayhide = document.getElementById("today-hide");
const musicuploadthide = document.getElementById("musicUpload-hide");
const momhide = document.getElementById("mom-hide");

const playController = document.getElementById("play-controller");
const playBtn = document.getElementById("play-btn");
const stopBtn = document.getElementById("stop-btn");
const volumeControl = document.getElementById("volume-control");

let checkNum = 0;

if (document.cookie) {
  let logincheck = document.cookie.split("=")[1].split(".")[1];

  if (logincheck) {
    logoutbox.classList.remove("on");
    loginbox.classList.add("on");
    todayhide.classList.add("on");
    playlisthide.classList.remove("on");
    musicuploadthide.classList.remove("on");
    momhide.classList.add("on");
    myChart.classList.remove("on");
    chartText.classList.remove("on");

    const curuserName = JSON.parse(
      window.atob(document.cookie.split("=")[1].split(".")[1])
    ).id;

    userprofileid.innerText = curuserName;
  }
  document.getElementById("logout-btn").onclick = async function (e) {
    try {
      await axios.get("/api/user/logout");
    } catch (error) {
      console.error(error);
    }
    location.href = "http://localhost:8080/";
  };
}
function removeBtn() {
  if (prevElem.classList == `carousel-item`) {
    next.classList.toggle(`off`);
    return;
  } else {
    prev.classList.toggle(`off`);
  }
}

function genreremoveBtn() {
  genrePrev.classList.toggle(`off`);
  genreNext.classList.toggle(`off`);
}

function musicMove() {
  const elemATitle = document.createElement("a");
  const elemASinger = document.createElement("a");
  const elemImg = document.createElement("img");
  const elemDiv = document.createElement("div");

  elemATitle.setAttribute("href", `../musicInfo`);
  elemASinger.setAttribute("href", `../musicInfo`);
  elemImg.setAttribute("src", `path`);

  elemDiv.append(elemATitle);
  elemDiv.append(elemASinger);
}

window.onload = () => {
  musicMove();
};

let musicList = [];
let imgList = [];

async function listUp() {
  const result = (await axios.get("/api/chart/list")).data;
  result?.data?.forEach((item) => {
    let typeCheck = /mp3|ogg|wma|wav|au|rm|mid|mp4/.test(item);
    if (typeCheck) musicList.push(item);
  });
}
listUp();

async function imgListUp() {
  const result = (await axios.get("/api/chart/imglist")).data;
  result?.data?.forEach((item) => {
    let typeCheck = /jpg|jpeg|png/.test(item);
    if (typeCheck) imgList.push(item);
  });
}
imgListUp();
function musicPlay(idx) {
  playController.src = `../upload/${musicList[idx]}`;

  playController.play();
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

const slideInnerImg = document.getElementsByClassName("slide-inner-img");
const slideInnerId = document.getElementsByClassName("slide-inner-id");
const slideInnerTitle = document.getElementsByClassName("slide-inner-title");
const slideInnerSinger = document.getElementsByClassName("slide-inner-singer");
const innerImg = document.getElementsByClassName("inner-img");
const slideInnerDiv = document.getElementsByClassName("slide-inner-div");

async function chartOn() {
  const data = (await axios.post("/api/chart/list")).data;

  const innerImg = document.getElementsByClassName(`slide-inner-img`);
  const innerTitle = document.getElementsByClassName(`slide-inner-title`);
  const innerSinger = document.getElementsByClassName(`slide-inner-singer`);
  const innerIdx = document.getElementsByClassName(`slide-inner-id`);

  for (let i = 0; i < data.data.length; i++) {
    innerImg[
      i
    ].innerHTML = `<img src="../upload/${data.data[i].albumImg}" alt="" class="inner-img" />`;
    innerTitle[i].innerText = data.data[i].musicName;
    innerSinger[i].innerText = data.data[i].singer;
    innerIdx[i].innerText = i + 1;
  }
  for (let j = 0; j < data.data.length; j++) {
    innerImg[j].onclick = () => {
      data.data[j].count++;
      axios.post(`/api/chart/count`, {
        count: data.data[j].count,
        id: data.data[j].id,
      });

      document.getElementsByClassName("container")[0].innerHTML = "";
      let imgDiv = document.createElement("div");
      let tempDiv = document.createElement("div");
      let tempImg = document.createElement("img");
      let innerDiv = document.createElement("div");
      let innerSecondDiv = document.createElement("div");
      tempImg.src = `../upload/${data.data[j].albumImg}`;
      playController.src = `../upload/${data.data[j].musicFile}`;
      playController.play();
      tempImg.setAttribute("filter", "none");
      tempImg.setAttribute("width", "50px");
      innerDiv.innerText = data.data[j].musicName;
      innerSecondDiv.innerText = data.data[j].singer;
      tempDiv.append(innerDiv);
      tempDiv.append(innerSecondDiv);

      imgDiv.append(tempImg);

      document.getElementsByClassName("container")[0].append(imgDiv);
      document.getElementsByClassName("container")[0].append(tempDiv);
    };
  }
}
chartOn();
async function userChartOn() {
  const curuserName = JSON.parse(
    window.atob(document.cookie.split("=")[1].split(".")[1])
  ).id;
  const data = (
    await axios.post("/api/chart/userList", {
      userId: curuserName,
    })
  ).data;

  const innerImg = document.getElementsByClassName(`slide-inner-img-user`);
  const innerTitle = document.getElementsByClassName(`slide-inner-title-user`);
  const innerSinger = document.getElementsByClassName(
    `slide-inner-singer-user`
  );
  const innerIdx = document.getElementsByClassName(`slide-inner-id-user`);

  for (let i = 0; i < data.data.length; i++) {
    innerImg[
      i
    ].innerHTML = `<img src="../upload/${data.data[i].albumImg}" alt="" class="inner-img" />`;
    innerTitle[i].innerText = data.data[i].musicName;
    innerSinger[i].innerText = data.data[i].singer;
    innerIdx[i].innerText = i + 1;
  }
  for (let j = 0; j < data.data.length; j++) {
    innerImg[j].onclick = () => {
      data.data[j].count++;

      axios.post(`/api/chart/countUser`, {
        count: data.data[j].count,
        id: data.data[j].id,
      });
      document.getElementsByClassName("container")[0].innerHTML = "";
      let imgDiv = document.createElement("div");
      let tempDiv = document.createElement("div");
      let tempImg = document.createElement("img");
      let innerDiv = document.createElement("div");
      let innerSecondDiv = document.createElement("div");
      tempImg.src = `../upload/${data.data[j].albumImg}`;
      playController.src = `../upload/${data.data[j].musicFile}`;
      playController.play();
      tempImg.setAttribute("filter", "none");
      tempImg.setAttribute("width", "50px");
      innerDiv.innerText = data.data[j].musicName;
      innerSecondDiv.innerText = data.data[j].singer;
      tempDiv.append(innerDiv);
      tempDiv.append(innerSecondDiv);

      imgDiv.append(tempImg);

      document.getElementsByClassName("container")[0].append(imgDiv);
      document.getElementsByClassName("container")[0].append(tempDiv);
    };
  }
}
userChartOn();

async function buttonremove() {
  const data = await axios.post("api/chart/chartNum").data;
}

buttonremove();
