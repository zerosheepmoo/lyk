// TODO 테스트 만들기

let tg, con;
let prevPreset;

document.addEventListener("DOMContentLoaded", function () {
  let tgContainer = document.getElementById("text-game");
  tg = LYK.createTextGame(tgContainer);
  con = tg.controller
  example();
});

function example() {
    console.log('You can test Here!');
}

// util 펑션
function createButton(t, f) {
    let a = document.getElementById('test');
    let button = document.createElement('button');
    button.textContent = t;
    button.onclick = f;
    a.appendChild(button);
}