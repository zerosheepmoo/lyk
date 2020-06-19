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
      name: '의문의 편지',
      type: { story: true}
    },
    2: {
      name: '물',
      type: { consume: true },
      startCount: 3,
      maxCount: 10
    },
    3: {
      name: '총',
      type: 'special'
    },
    4: {
      name: '통조림',
      type: { equip: true }
    },
    5: {
      name: '붕대',
      type: { equip: true, consume: true }
    },
    6: {
      name: '몽둥이',
      type: { equip: true },
      minCount: 1,
      isFixedCount: true
    }
  }
  dm.setDefaultItemSet(preset);
  tg.createController('text-game');
  tg.linkDataManagerToCon();
  con = tg.controller;
  example();
});

function example() {
  console.log('You can test Here!');
  createButton('아이템 구축!', runAddItemCount);
  createButton('아이템 파기!', runAddItemCountMinus);
  createButton('아이템 구축2!', runAddItemCount2);
  createButton('아이템 파기2!', runAddItemCountMinus2);
  createButton('갯수고정!', fixedCountTest);
  createButton('갯수고정해제!!!!', fixedCountTest2);
  createButton('특정아이템 랜덤 갯수', rItemCount);
}

function runAddItemCount() {
  con.addItemCount(2, 1);
}
function runAddItemCountMinus() {
  con.addItemCount(2, -1);
}

function runAddItemCount2() {
  con.addItemCount(6, 1);
}

function runAddItemCountMinus2() {
  con.addItemCount(6, -1);
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

function rItemCount() {
  con.setItemCount(4, random())
}

function random() {
  const num = Date.now() % 8;
  if (num < 4) {
    return 1;
  }
  else if (num < 6) {
    return 2;
  }
  else if (num < 7) {
    return 3;
  }
  else {
    return 0;
  }
}

//; util 펑션
function createButton(t, f) {
  let a = document.getElementById('test');
  let button = document.createElement('button');
  button.textContent = t;
  button.onclick = f
  a.appendChild(button);
}

