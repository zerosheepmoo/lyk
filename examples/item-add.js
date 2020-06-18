// TODO 테스트 만들기

let tg, con, dm;
let prevPreset;

document.addEventListener("DOMContentLoaded", function () {
  let tgContainer = document.getElementById("text-game");
  tg = LYK.createTextGame(tgContainer);
  tg.createDataManager();
  dm = tg.dataManager;
  dm.itemTypeMap = {
    consume: false,
    equip: false,
    story: false,
    special: false
  }
  let preset = {
    1: {
      name: '컴퓨터',
      type: { story: true}
    },
    2: {
      name: '레일건',
      type: { equip: true },
      startCount: 1,
      isFixed: true
    },
    3: {
      name: '현자의 돌',
      type: 'special'
    },
    4: {
      name: '가방',
      type: { equip: true }
    },
    5: {
      name: '가면',
      type: { equip: true, consume: true }
    },
    6: {
      name: '총',
      type: { consume: true },
      maxCount: 4,
      minCount: 1
    }
  }
  dm.setDefaultItemSet(preset);
  tg.createController('text-game');
  tg.linkDataManagerToCon();
  con = tg.controller
  example();
});

function example() {
  console.log('You can test Here!');
  createButton('아이템 구축!', runAddItemCount);
  createButton('아이템 파기!', runAddItemCount2);
  // createButton('새로운 아이템 셋으로 교체!', regiItemSet);
  // createButton('화면 재 렌더링', rednerItems);
  createButton('아이템 구축2!', runAddItemCount_2);
  createButton('갯수고정!', fixedCountTest);
  createButton('갯수고정해제!!!!', fixedCountTest2);
}

function runAddItemCount() {
  con.addItemCount('총', 1);
  con.addItemCount(2, 3);
}
function runAddItemCount2() {
  con.addItemCount('총', -1);
}

function runAddItemCount_2() {
  con.addItemCount('총`', 1);
}

function fixedCountTest() {
  let gun = con.getItemModel(6);
  gun.isFixedCount = true
}

function fixedCountTest2() {
  let gun = con.getItemModel(6);
  gun.isFixedCount = false
}

function renbuildItemModel() {
  con.renderItemView();
}

//; util 펑션
function createButton(t, f) {
  let a = document.getElementById('test');
  let button = document.createElement('button');
  button.textContent = t;
  button.onclick = f
  a.appendChild(button);
}

