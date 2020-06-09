/*****************************************
| Game.ts                           
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

import { ItemManager } from "./items/ItemManager";

/**
 * 텍스트 게임 클래스
 */
export class TextGame {
    private _itemManager: ItemManager;
    constructor() {
        this._itemManager = new ItemManager();
    }

    /**
     * 아이템 매니저
     */
    get itemManager() {
        return this._itemManager;
    }
}