let tg, con;

document.addEventListener("DOMContentLoaded", function () {
  let tgContainer = document.getElementById("text-game");
  tg = LYK.createTextGame(tgContainer);
  con = tg.controller
  example();
});

function example() {
    console.log('You can test Here!');
    createButton('아이템 추가', runAddItemCount);
    createButton('아이템 빼기', runAddItemCount2);
}

function runAddItemCount() {
    con.addItemCount('총', 1);
    con.addItemCount('빵', 3);
}
function runAddItemCount2() {
    con.addItemCount('총', -1);
}

function createButton(t, f) {
    let a = document.getElementById('test');
    let button = document.createElement('button');
    button.textContent = t;
    button.onclick = f;
    a.appendChild(button);
}