/*****************************************
| Game.ts                           
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

import { ItemManager } from "./items/ItemManager";
import { MainView } from "./dom/MainView";
import { StatusMananger } from "./stats/StatusManager";

/**
 * 텍스트 게임 클래스
 */
export class TextGame {
    private _itemManager: ItemManager;
    private _statusManager: StatusMananger;
    private _gameView: MainView;
    
    constructor(div: HTMLDivElement) {
        this._itemManager = new ItemManager();
        this._statusManager = new StatusMananger();
        this._render(div);
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

    private _render(div: HTMLDivElement) {
        this._gameView = new MainView(div, 'lyk-main');
    }
}