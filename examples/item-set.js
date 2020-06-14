let tg, con;
let preset, preset2;

document.addEventListener("DOMContentLoaded", function () {
    let tgContainer = document.getElementById("text-game");
    // 게임생성
    tg = LYK.createTextGame(tgContainer);
    // 데이터 매니저 만들기 (Data 단)
    tg.createDataManager();
    
    dm = tg.dataManager;

    dm.itemTypeMap = {
        consume: false,
        equip: false,
        story: false,
        special: false
    }

    example();    
  });

function example() {
    console.log('You can test Here!');
    createDropdown();
    createButton('현재 아이템 셋들 확인', useitemSetCollection)
    createButton('아이템 셋 등록하기 (새로움)', regiItemSet, 'red');
    createButton('아이템 셋 등록하기2 (새로움2)', regiItemSet2, 'blue');
    createButton('현재 아이템 셋 추가하기', addItemSet);
    createButton('특정 아이템 셋 (새로움) 추가하기2', addItemSet2, 'red');
    createButton('현재 아이템 셋에서 제거하기', removeItemSet, 'red');
    createButton('특정 아이템 셋(default)에서 제거하기2', removeItemSet2);
    // 이후 테스트 필요
    createButton('컨트롤러 만들고 연결하기', creConAndLink, 'purple');
    createButton('현재 아이템 리스트(모델들) 확인', consoleCheckList, 'gray')
    createButton('모델 재구축', modelRebuild, 'green');
    createButton('화면 렌더링', renderItems, 'green');
}

function creConAndLink() {
    // 컨트롤러 만들기
    tg.createController();
    
    // 데이터 매니저와 컨트롤러 연결하기
    tg.linkDataManagerToCon();
    
    // 컨트롤러 con 변수에 저장
    con = tg.controller;
}

function modelRebuild() {
    con.rebuildItemModel();
}

function renderItems() {
    con.renderItemView();
}

function removeItemSet() {
    con.removeItemFromPreset(1);
    con.removeItemFromPreset('빵');
    con.removeItemFromPreset([4,5,6]);
    con.removeItemFromPreset(['고양이귀', '열쇠']);
}

function useitemSetCollection() {
    let res = JSON.stringify(dm.itemSetCollection);
    alert(res);
}

function regiItemSet() {
    if (!preset) {
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
        dm.registerItemSet('새로움', preset);
    }
    
}

function regiItemSet2() {
    if (!preset2) {
        preset2 = {
            1: {
                name: '거머리', 
                type: {special: true, isUnique: true}
            },
            2: {
                name: '손',
                type: {story: true}, 
                startCount: 1, 
                isFixed: true
            },
            3: {
                name: '발', 
                type: 'special'
            }
        }
        dm.registerItemSet('새로움2', preset2);
    }
}


function addItemSet() {
    dm.addItems({
        13: {name: '추가된 아이템', type: {'special': true}}
    });
    console.log('현재 셋에 추가!')
}
function addItemSet2() {
    dm.addItems({
        14: {name: '추가된 아이템 2', type: 'special'}
    }, '새로움')
    console.log('지정한 id: "새로움" 셋에 추가')
}

function removeItemSet() {
    dm.removeItems(1);
    dm.removeItems([2, '레일건']);
    dm.removeItems('가방')
}

function removeItemSet2() {
    dm.removeItems(13, 'default');
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

// set change
function createDropdown() {
    let d = document.createElement('select');

    let o = document.createElement('option');
    o.value = 'default';
    o.textContent = 'default set';

    let o2 = document.createElement('option');
    o2.value = '새로움';
    o2.textContent = '새로움';
    
    let o3 = document.createElement('option');
    o3.value = '새로움2'
    o3.textContent = '새로움2';

    d.appendChild(o)
    d.appendChild(o2)
    d.appendChild(o3)

    d.onchange = function() {
        dm.currentSet = d.value;
        console.log('지금 아이템 셋:');
        console.log(dm.getItemSet());
    }

    document.getElementById('test').appendChild(d);
}

function consoleCheckList() {
    console.log(con._itemManager.singleList);
    console.log(con._itemManager.multiList);
}
