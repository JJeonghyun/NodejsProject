let userprofileid = document.getElementById("userprofile-id");
let logincheck = document.cookie.split("=")[1].split(".")[1];
let mordaladdbtn = document.getElementById("mordal-add-btn");
const mordalcanclebtn = document.getElementById("mordal-cancle-btn");
const mordalroot = document.getElementById("mordal-root");
const addplaylist = document.getElementById("add-playlist");
const listboard = document.getElementById("list-board");
let mordalinputtitle = document.getElementById("mordal-input-title");
let mordalinputcontents = document.getElementById("mordal-input-contents");
const curuserName = JSON.parse(
  window.atob(document.cookie.split("=")[1].split(".")[1])
).id;

if (logincheck) {
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

mordalinputtitle.oninput = function () {
  mordaladdbtn.classList.add("on");
  if (mordalinputtitle.value == "") mordaladdbtn.classList.remove("on");
};

mordalcanclebtn.addEventListener("click", () => {
  mordalroot.classList.add("on");
});

function listDivCreate() {
  const listPostDiv = document.createElement("div");
  listPostDiv.classList.add("list-post");
  const addPlaylistDiv = document.createElement("div");
  addPlaylistDiv.classList.add("addplaylist-div");
  const listImg = document.createElement("div");

  const imgplayListAdd = document.createElement("img");

  const listTitle = document.createElement("div");
  listTitle.classList.add("list-title");
  const listContentImis = document.createElement("div");
  listContentImis.classList.add("list-contents-imsi");

  imgplayListAdd.src = `../../assets/img/playlistadd.png`;
  imgplayListAdd.setAttribute("alt", "imsi");

  listTitle.innerText = "새 플레이리스트 추가";
  listContentImis.innerText = "1";

  addPlaylistDiv.setAttribute("id", "add-playlist");
  addPlaylistDiv.setAttribute("onclick", "addplayClick()");

  listImg.append(imgplayListAdd);

  addPlaylistDiv.append(listImg);
  addPlaylistDiv.append(listTitle);
  addPlaylistDiv.append(listContentImis);

  listPostDiv.append(addPlaylistDiv);

  listboard.append(listPostDiv);
}
listDivCreate();

function addplayClick() {
  mordalroot.classList.toggle("on");
  mordalinputtitle.value = null;
  mordalinputcontents.value = null;
}

async function makePlaylist() {
  try {
    if (mordalinputtitle.value == "") {
      return;
    }
    const data = await axios.post("/api/playList/addplaylist", {
      id: curuserName,
      name: mordalinputtitle.value,
      info: mordalinputcontents.value,
    });
    console.log(data.data);
    if (data.data.overlap == 1) {
      alert("이미 존재하는 플레이리스트 입니다.");
      return;
    }

    const tempElem = document.createElement("div");
    tempElem.classList.add("list-post");
    tempElem.innerHTML = `<div class="list-click">
     <div class="list-img">
       <img src="../../assets/img/newplaylist.png" alt="newplaylist" />
       <a href="#">
         <div class="list-hidden">
           <div class="icon-box">
             <img
               src="../../assets/img/delbtn.png"
               alt="dot"
             />
           </div>
         </div>
       </a>
     </div>
     <div class="list-title">${mordalinputtitle.value}</div>
     </div>
     <div class="list-contents">0곡</div>`;
    listboard.appendChild(tempElem);
    mordalroot.classList.add("on");
    listboard.innerHTML = "";
    listDivCreate();
    myplaylist();
  } catch (error) {
    console.error(error);
  }
}

async function myplaylist() {
  try {
    const data = await axios.post("/api/playList/myplaylist", {
      id: curuserName,
    });

    for (let i = 0; i < data.data.info.length; i++) {
      const tempElem = document.createElement("div");
      tempElem.classList.add("list-post");
      tempElem.innerHTML = `<div class="list-click">
    <div class="list-img">
      <img src="../../assets/img/newplaylist.png" alt="newplaylist" />
      <a href="#">
        <div class="list-hidden">
          <div class="icon-box">
            <img
              src="../../assets/img/delbtn.png"
              alt="dot"
              class="delete-img"
            />
          </div>
        </div>
      </a>
    </div>
    <div class="list-title">${data.data.info[i].playlistName}</div>
    </div>
    <div class="list-contents">0곡</div>`;

      listboard.append(tempElem);
    }
    const tempClick = document.querySelectorAll(".list-img");
    [...tempClick].forEach((item, index) => {
      item.onclick = async (e) => {
        const tempQuery = e.target.parentNode.nextElementSibling.innerText;
        location.href = `http://localhost:8080/playListIn?${tempQuery}`;
      };
    });

    const titleClick = document.querySelectorAll(".list-title");
    [...titleClick].forEach((item, index) => {
      item.onclick = async (e) => {
        const temptitleQuery = e.target.innerText;
        location.href = `http://localhost:8080/playListIn?${temptitleQuery}`;
      };
    });

    const tempNum = document.querySelectorAll(".delete-img");
    [...tempNum].forEach((item, index) => {
      item.onclick = async (e) => {
        const tempId =
          e.target.parentNode.parentNode.parentNode.parentNode
            .nextElementSibling.innerText;
        await axios.post("/api/playList/delete", {
          title: tempId,
        });
        listboard.innerHTML = "";
        listDivCreate();
        myplaylist();
      };
    });
  } catch (error) {
    console.error(error);
  }
}

myplaylist();
