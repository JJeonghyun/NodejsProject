const album = `i_love`;
const songName = `Nxde`;
const singerName = `(여자)아이들`;
const albumName = `I love`;
const ListName = `아이브가좋아요`;
const ListContents = `아이고야~~~~~`;

function playListInfo() {
  const playListPage = document.getElementsByClassName(`play-list-page`)[0];
  const playListHeader = document.createElement(`div`);
  const playListHeaderImg = document.createElement(`div`);
  const playListInfo = document.createElement(`div`);
  const playListInfoDiv = document.createElement(`div`);
  const playListName = document.createElement(`h1`);
  const playListContents = document.createElement(`h4`);
  const playListBtnBox = document.createElement(`div`);
  const playListPlayBtn = document.createElement(`button`);
  const playListRandomPlayBtn = document.createElement(`button`);

  playListPage.prepend(playListHeader);
  playListHeader.append(playListHeaderImg);
  playListHeader.append(playListInfo);
  playListInfo.append(playListInfoDiv);
  playListInfoDiv.append(playListName);
  playListInfoDiv.append(playListContents);
  playListInfo.append(playListBtnBox);
  playListBtnBox.append(playListPlayBtn);
  playListBtnBox.append(playListRandomPlayBtn);
  playListHeader.classList.add(`play-list-header`);
  playListHeaderImg.innerHTML = `<img src="../assets/img/${album}.jpg" alt="" style="width: 240px" />`;
  playListInfo.classList.add(`play-list-info`);
  playListName.innerText = `${ListName}`;
  playListContents.innerText = `${ListContents}`;
  playListPlayBtn.classList.add(`start-btn`);
  playListRandomPlayBtn.classList.add(`random-start-btn`);
  playListPlayBtn.innerText = `재생`;
  playListRandomPlayBtn.innerText = `랜덤 재생`;
}
playListInfo();
function makePlayList() {
  const container = document.getElementById(`play-list-container`);
  const contentsOutterDiv = document.createElement(`div`);
  const contentsAddDiv = document.createElement(`div`);
  const playListInnerContentsDiv = document.createElement(`div`);
  const checkBoxDiv = document.createElement(`div`);
  const albumImgDiv = document.createElement(`div`);
  const songNameDiv = document.createElement(`div`);
  const singerNameDiv = document.createElement(`div`);
  const albumNameDiv = document.createElement(`div`);
  const delBtnDiv = document.createElement(`div`);
  console.log(album);
  contentsOutterDiv.classList.add(`play-list-contents-outter`);
  contentsAddDiv.classList.add(`play-list-contents-add`);
  playListInnerContentsDiv.classList.add(`play-list-inner-contents`);
  contentsOutterDiv.append(contentsAddDiv);
  contentsAddDiv.append(playListInnerContentsDiv);
  contentsAddDiv.append(singerNameDiv);
  contentsAddDiv.append(albumNameDiv);
  contentsAddDiv.append(delBtnDiv);
  playListInnerContentsDiv.append(checkBoxDiv);
  playListInnerContentsDiv.append(albumImgDiv);
  playListInnerContentsDiv.append(songNameDiv);
  container.append(contentsOutterDiv);
  singerNameDiv.classList.add(`singer-name`);
  albumNameDiv.classList.add(`album-name`);
  delBtnDiv.classList.add(`del-btn`);
  checkBoxDiv.innerHTML = `<input type="checkbox">`;
  albumImgDiv.innerHTML = `<img src="../assets/img/${album}.jpg" alt=""/>`;
  songNameDiv.innerText = `${songName}`;
  singerNameDiv.innerText = `${singerName}`;
  albumNameDiv.innerText = `${albumName}`;
  delBtnDiv.innerHTML = `<button>삭제123413213</button>`;
}

document.getElementsByClassName(`start-btn`)[0].onclick = () => {
  makePlayList();
};
