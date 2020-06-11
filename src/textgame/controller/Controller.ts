/*****************************************
| Controller.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { ItemManager } from "../items/ItemManager";
import { MainView } from "../dom/MainView";
import { StatusMananger } from "../stats/StatusManager";
import { SignExp, InnerExp, ExpParser } from "../utils/Parser";
import { SectionType } from "../Type";
import { IItemSet } from "../items/interfaces/IItemSet";

/**
 * 컨트롤러 클래스
 */
export class Controller {
    private _itemManager: ItemManager;
    private _statusManager: StatusMananger;
    private _gameView: MainView;
    private _signExp: SignExp = {
        plus: '+',
        minus: '-',
        multiple: 'x',
        division: '/'
    };
    private _templates = {
        item: `{{name}}{{multiple}}{{count}}`
    }
    
    constructor(div: HTMLDivElement) {
        this._itemManager = new ItemManager();
        this._statusManager = new StatusMananger();
        this._gameView = new MainView(div, 'lyk-main');
    }

    // ANCHOR items

    /**
     * 현재 등록된 프리셋을 반환한다.
     */
    exportItemPreset() {
        return this._itemManager.exportPreset();
    }

    /**
     * 현재 등록된 타입 맵을 반환한다.
     */
    exportItemTypeMap() {
        return this._itemManager.exportTypeMap();
    }

    /**
     * 아이템 프리셋을 등록한다.
     * 
     * @remarks
     * 등록한 프리셋만이 게임에서 데이터로 쓰인다.
     * 게임 진행 도중에 특별히 프리셋이 바뀌었을 경우 화면에 강제로 렌더링을 해야
     * 바뀐 아이템들이 표시된다.
     * 
     * @param set - 아이템 프리셋
     */
    registerItemSet(set: IItemSet) {
        this._itemManager.registerPreset(set);
    }

    /**
     * 아이템 갯수를 더하거나 뺀다.
     * 
     * @param nameOrCode - 해당 아이템의 이름 또는 코드
     * @param count - 더하거나 뺄 아이템 갯수, 음수 입력시 빠짐.
     */
    addItemCount(nameOrCode: string | number, count: number) {
        // data
        let code;
        code = typeof nameOrCode === 'string' ? this._itemManager.itemSet.getItemCode(nameOrCode): nameOrCode;
        let prevNum = this._itemManager.getItem(code).count;
        let num = this._itemManager.addItemNumber(code, count);
        let name = this._itemManager.itemSet.getItemName(code);
        // view
        if (prevNum !== num) {
            this._setItemInnerHTML(name, code, num);
        }
    }

    // ANCHOR View
    /**
     * 아이템 목록을 강제로 렌더링한다.
     * 
     */
    renderItemView(section: SectionType) {
        // 아이템 목록 초기화
        this._gameView.itemTab.removeAllChilds();
        const itemList = this._itemManager.itemList;
        for (let code in itemList) {
            const name = itemList[code].name;
            const count = itemList[code].count;
            if (count) {
                this._setItemInnerHTML(name, Number(code), count);
            }
        }
    }


    /**
     * item의 innerhtml 을 설정한다.
     * 
     * @param name - 이름
     * @param code - 코드
     * @param count - 갯수
     */
    private _setItemInnerHTML(name: string, code: number, count: number) {
        let itemTab = this._gameView.itemTab;
        let innerExp: InnerExp = {
            name: name,
            code: String(code),
            itemCount: String(count)
        }
        let template = this._templates.item

        // 없으면 추가 있으면 innerHTML 변경
        let item = itemTab.findChild(code);
        if (item && typeof item !== 'number') {
            if (count === 0) {
                itemTab.removeChild(code);
            }
            else {
                item.setInnerHTML(template, innerExp, this._signExp);
            }
        }
        else {
            this._gameView.itemTab.addChild(SectionType.ITEM, code, template, innerExp, this._signExp);
        }
    }


}