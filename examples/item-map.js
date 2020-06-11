let tg, con;
let prevTypeMap;

document.addEventListener("DOMContentLoaded", function () {
  let tgContainer = document.getElementById("text-game");
  tg = LYK.createTextGame(tgContainer);
  con = tg.controller
  example();
});

function example() {
    console.log('You can test Here!');
    createButton('타입 맵 바꾸기', mapChange);
}

function mapChange() {
    if (prevTypeMap) {
        
    }
    else {
        prevTypeMap = con.exportItemTypeMap;
    }
}


function createButton(t, f) {
    let a = document.getElementById('test');
    let button = document.createElement('button');
    button.textContent = t;
    button.onclick = f;
    a.appendChild(button);
}