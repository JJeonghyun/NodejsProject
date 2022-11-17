const playController = document.getElementById("play-controller");
const volumeControl = document.getElementById("volume-control");
const playBtn = document.getElementById("play-btn");
const stopBtn = document.getElementById("stop-btn");
let userprofileid = document.getElementById("userprofile-id");
let logoutbtn = document.getElementById("logout-btn");

let logincheck = document.cookie.split("=")[1].split(".")[1];

let loginbox = document.getElementById("login-box");
let logoutbox = document.getElementById("logout-box");

const playlisthide = document.getElementById("playlist-hide");
const todayhide = document.getElementById("today-hide");

if (logincheck && window.location.href == "http://localhost:8080/") {
  location.href = "http://localhost:8080/signedin/";
}
if (logincheck) {
  const curuserName = JSON.parse(
    window.atob(document.cookie.split("=")[1].split(".")[1])
  ).id;

  userprofileid.innerText = curuserName;
}
playBtn.onclick = () => {
  playController.play();
};
stopBtn.onclick = () => {
  playController.pause();
};

volumeControl.addEventListener("change", (e) => {
  playController.volume = this.value / 10;
});

document.getElementById("logout-btn").onclick = async function (e) {
  console.log("로그아웃");
  try {
    await axios.get("/api/user/logout");
  } catch (error) {
    console.error(error);
  }
  location.href = "http://localhost:8080/";
};

async function listUp() {
  const result = (await axios.get("/api/upload/upload")).data;
}
