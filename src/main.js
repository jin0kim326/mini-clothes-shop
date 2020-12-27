/*

데이터와 html요소가 섞여있는것은 좋지 않음.
동적으로 무엇을 처리할때는 데이터와 ui적요소를 섞어놓는건은 좋지않다!!

javascript에서는 배열을 이용해서 데이터를 보관하는 경우도 있으나...
자바스크립트는 어플리케이션의 비지니스 로직을 담당하는곳 => 코드가 있는곳

코드와 데이터가 같이 있는것도 좋지않음.
그래서 데이터는 데이터를 보관할 수 있는 장소에 보관하는것이 best
ex) database, backend 등

이 프로젝트에는 백앤드가 없으므로 파일에 보관
*/

// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const container = document.querySelector(".items"); //container요소를 정의 => .items라는 컨테이너를 html설정

  container.innerHTML = items.map((item) => createHTMLString(item)).join("");

  //innerHTML : container요소 안에 html을 추가함

  // map : 한가지의 배열형태에서 다른형태의 배열로 변환하는것
  // join : 문자열의 배열을 하나의 문자열로 병합
  // 받아온 items 오브젝트를 li문자열 배열로 변환한다음 그것들을 하나의 문자열로 만들어서 innerHTML에 추가
}

// li태그가 들어있는 html문자열로 만드는 함수
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}"/>
        <span>${item.gender}, ${item.size}</span>
     </li>
    `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  displayItems(filtered);
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons"); // 이벤트위임  : 하나하나에 이벤트리스너를 반복해서 등록하는것보다 버튼들이 담겨져있는 컨테이너에 등록하는것이 효율적
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}
//main 로직
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
/*
    아이템들을 동적으로 받아와서 프로미스가 리턴이되면
    프로미스가 성공적으로 전달해주면 전달해준 아이템을 이용해서 display:보여주고
    eventListener을 이용해서 정렬해줌
*/
