let tg, dm, con;
let preset;

document.addEventListener("DOMContentLoaded", function () {
  let tgContainer = document.getElementById("text-game");
  // 게임생성
  tg = LYK.createTextGame(tgContainer);
  // 데이터 매니저 만들기 (Data 단)
  tg.createDataManager();
  // 데이터 매니저 설정하기
  tg.setDefaults();
  // 컨트롤러 만들기
  tg.createController();
  // 데이터 매니저와 컨트롤러 연결하기
  tg.linkDataManagerToCon();

  dm = tg.dataManager;
  con = tg.controller;

  example();
});

function example() {
    console.log('You can test Here!');
    createButton('아이템 추가', runAddItemCount);
    createButton('아이템 빼기', runAddItemCount2);
    createButton('새로운 아이템 셋으로 교체하기', regiItemSet, 'red');
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
    if (!preset) {
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
        dm.registerItemSet('새로움', preset);
    }
    if (dm.currentSet === 'default') {
        dm.currentSet = '새로움';
    }
    else if(dm.currentSet === '새로움') {
        dm.currentSet = 'default';
    }
    con.rebuildItemModel();
}

function renderItems() {
    con.renderItemView();
}

function createButton(t, f, c) {
    let a = document.getElementById('test');
    let button = document.createElement('button');
    button.textContent = t;
    button.onclick = f;
    if (c) {
        button.style.color = c;
    }
    a.appendChild(button);
}