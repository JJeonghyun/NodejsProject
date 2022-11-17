let addplaylist = document.getElementById("add-playlist");
let inputtitle = document.getElementById("input-title");
let inputcontents = document.getElementById("input-contents");
let logincheck = document.cookie.split("=")[1].split(".")[1];
const userprofileid = document.getElementById("userprofile-id");
const curuserName = JSON.parse(
  window.atob(document.cookie.split("=")[1].split(".")[1])
).id;
const addbtn = document.getElementById("add-btn");
const listimg = document.getElementById("list-img");
const listtitle = document.getElementById("list-title");
const listcontents = document.getElementById("list-contents");
const listboard = document.getElementById("list-board");

if (document.cookie) {
  if (logincheck) {
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

async function makeaddedlist() {
  const data = await axios.post("/api/musicUpload/addedlist", {
    id: curuserName,
  });

  for (let i = 0; i < data.data.info.length; i++) {
    const tempElem = document.createElement("div");
    tempElem.classList.add("addedlist-post");
    tempElem.innerHTML = "";
    tempElem.innerHTML = `
    <div class="list-click">
      <div class="list-img">
          <img src="../../../upload/${data.data.info[i].albumImg}" alt="imsi"/>
          <a href="#">
          <div class="list-hidden">
              <div class="icon-box">
                  <img
                    src="../../assets/img/delbtn.png"
                    alt="dot"
                    class="delete-img"
                    onclick=deleteaddedlist()
                  />
               </div>
          </div>
          </a>
       </div>
        <div class="addedlist-title">${data.data.info[i].musicName}</div>
      </div>
    <div class="addedlist-contents">${data.data.info[i].singer}</div>`;
    listboard.append(tempElem);
  }

  const tempValue = document.querySelectorAll(".delete-img");

  [...tempValue].forEach((item, index) => {
    item.onclick = async (e) => {
      const tempMusictitle =
        e.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling
          .innerText;
      const tempMusiccontents =
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .nextElementSibling.innerText;
      await axios.post("/api/musicUpload/deletelist", {
        id: curuserName,
        name: tempMusictitle,
        singer: tempMusiccontents,
      });
      listboard.innerHTML = "";
      makeaddedlist();
    };
  });
}

makeaddedlist();
