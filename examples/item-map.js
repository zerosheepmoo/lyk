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
    createButton('현재 타입 맵 확인', exportTypeMap);
    createButton('타입 맵 바꾸기', mapChange);
}

function exportTypeMap() {
    alert(JSON.stringify(con.exportItemTypeMap()));
    console.log(con._itemManager._set.preset);
    console.log(con._itemManager._list);
}

function mapChange() {
    if (prevTypeMap) {
        let map = con.exportItemTypeMap();
        con.setItemTypeMap(prevTypeMap);
        prevTypeMap = map;
    }
    else {
        prevTypeMap = con.exportItemTypeMap();
        const map = {
            consume: false,
            equip: false,
            special: false,
            story: false,
            another: false
        }
        con.setItemTypeMap(map);
    }
}


function createButton(t, f) {
    let a = document.getElementById('test');
    let button = document.createElement('button');
    button.textContent = t;
    button.onclick = f;
    a.appendChild(button);
}