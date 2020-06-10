/*****************************************
| Controller.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { ItemManager } from "../items/ItemManager";
import { MainView } from "../dom/MainView";
import { StatusMananger } from "../stats/StatusManager";
import { SignExp, InnerExp, ExpParser } from "../utils/Parser";
import { SectionType } from "../Type";

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
     * 
     * 아이템 갯수를 빼거나 더한다.
     * 
     */
    addItemNumber(nameOrCode: string | number, count: number) {
        let itemTab = this._gameView.itemTab;
        // data
        let code;
        code = typeof nameOrCode === 'string' ? this._itemManager.itemSet.getItemCode(nameOrCode): nameOrCode;
        let num = this._itemManager.addItemNumber(code, count);

        // view
        let name = this._itemManager.itemSet.getItemName(code);
        let innerExp: InnerExp = {
            name: name,
            code: String(code),
            itemCount: String(num)
        }
        let template = this._templates.item
        
        // 없으면 추가 있으면 innerHTML 변경
        let item = itemTab.findChild(code);
        if (item && typeof item !== 'number') {
            if (num === 0) {
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


    /**
     * 아이템 매니저
     */
    get itemManager() {
        return this._itemManager;
    }

    /**
     * 스테이터스 매니저
     */
    get statusManager() {
        return this._statusManager;
    }

}