function itemCombination(name1, name2) {

    // 아이템 이름에 해당하는 코드를 찾는다.
    let code1 = dm.getItemCode(name1);
    let code2 = dm.getItemCode(name2);
  
    // model 을 가져온다.
    let firstItem = con.getItemModel(code1);
    let secondItem = con.getItemModel(code2);
  
    // model 에서 갯수를 뺀다
    firstItem.count -= 1;
    secondItem.count -= 1;
    
    // 새로운 아이템의 이름을 만든다.
    let newItemName = firstItem.name + secondItem.name;
  
    // 만약 새로운 아이템의 이름에 해당하는 아이템이 모델에 있다면 그 아이템의 갯수를 1 늘린다.
    let newItemCode = dm.getItemCode(newItemName)
    let resItem = con.getItemModel(newItemCode);
    resItem.count += 1;
  
    // 화면을 재 렌더링 한다.
    con.renderItemView();
  
  }