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
    createButton('아이템 추가', runAddItemCount);
    createButton('아이템 빼기', runAddItemCount2);
    createButton('새로운 아이템 셋으로 교체하기', regiItemSet);
    createButton('화면 재 렌더링', renderItems);
    createButton('아이템 추가2', runAddItemCount_2);
}

function runAddItemCount() {
    con.addItemCount('총', 1);
    con.addItemCount(2, 3);
}
function runAddItemCount2() {
    con.addItemCount('총', -1);
}

function runAddItemCount_2() {
    con.addItemCount('컴퓨터', 1);
    con.addItemCount(5, 1);
}

function regiItemSet() {
    let preset 
    if (prevPreset) {
        preset = con.exportItemPreset();
        con.registerItemSet(prevPreset);
        prevPreset = preset;
    }
    else {
        preset = {
            1: {
                name: '컴퓨터', 
                type: {story: true}
            },
            2: {
                name: '레일건',
                type: {equip: true}
            },
            3: {
                name: '현자의 돌', 
                type: {special: true}
            },
            4: {
                name: '가방', 
                type: {equip: true}
            },
            5: {
                name: '가면', 
                type: {equip: true}
            },
            6: 
                {name: '핡 식스', 
                type: {consume: true}
            }
        }
        prevPreset = con.exportItemPreset();
        con.registerItemSet(preset);

    }
}

function renderItems() {
    con.renderItemView();
}

function createButton(t, f) {
    let a = document.getElementById('test');
    let button = document.createElement('button');
    button.textContent = t;
    button.onclick = f;
    a.appendChild(button);
}