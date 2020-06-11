/*****************************************
| Game.ts                           
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

import { ItemManager } from "./items/ItemManager";
import { MainView } from "./dom/MainView";
import { StatusMananger } from "./stats/StatusManager";
import { Controller } from "./controller/Controller";

/**
 * 텍스트 게임 클래스
 */
export class TextGame {
    private _gameView: MainView;
    private _controller: Controller;
    
    constructor(div: HTMLDivElement) {
        this._controller = new Controller(div);
    }

    /**
     * 컨트롤러
     */
    get controller() {
        return this._controller;
    }
}