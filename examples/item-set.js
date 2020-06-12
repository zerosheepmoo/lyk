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
    createButton('현재 아이템 셋 확인(콘솔에는 아이템 리스트)', exportItemSet)
    createButton('아이템 셋 바꾸기', regiItemSet);
    createButton('아이템 셋 추가하기', addItemSet);
    createButton('아이템 셋에서 제거하기', removeItemSet);
    createButton('화면 렌더링', renderItems);

}

function renderItems() {
    con.renderItemView();
}

function addItemSet() {
    con.addItemPreset({
        13: {name: '추가된 아이템', type: {'special': true}}
    });
}
function removeItemSet() {
    con.removeItemFromPreset(1);
    con.removeItemFromPreset('빵');
    con.removeItemFromPreset([4,5,6]);
    con.removeItemFromPreset(['고양이귀', '열쇠']);
}

function exportItemSet() {
    let res = JSON.stringify(con.exportItemPreset());
    consoleCheckList();
    alert(res);
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
                type: {story: true, isUnique: true}
            },
            2: {
                name: '레일건',
                type: {equip: true}, 
                startCount: 1, 
                isFixed: true
            },
            3: {
                name: '현자의 돌', 
                type: 'special'
            },
            4: {
                name: '가방', 
                type: {equip: true}
            },
            5: {
                name: '가면', 
                type: {equip: true, consume: true}
            },
            6: {
                name: '핡 식스', 
                type: {consume: true}, 
                maxCount: 4, 
                minCount: 1
            }
        }
        prevPreset = con.exportItemPreset();
        con.registerItemSet(preset);
    }
}


function createButton(t, f) {
    let a = document.getElementById('test');
    let button = document.createElement('button');
    button.textContent = t;
    button.onclick = f;
    a.appendChild(button);
}

function consoleCheckList() {
    console.log(con._itemManager._list)
}
