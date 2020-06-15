/*****************************************
| Game.ts                           
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

import { ItemManager } from "./items/ItemManager";
import { MainView } from "./dom/MainView";
import { StatusMananger } from "./stats/StatusManager";
import { Controller } from "./controller/Controller";
import { DataManager } from "./data/DataManager";
import { FantasyItems, DefaultItemMap } from "./Preset";
import { AlreadyExistView, NotAutoMode, NotSpecifyError } from "./utils/Errors";

/**
 * 텍스트 게임 클래스
 */
export class TextGame {
    private _gameView: MainView;
    private _dataManager: DataManager;
    private _controller: Controller;
    private _defaultStore = {
        set: FantasyItems,
        map: DefaultItemMap
    }
    private _dom: HTMLDivElement;
    private _auto: boolean = true;

    constructor(div: HTMLDivElement) {
        this._dom = div;
    }

    get auto() {
        return this._auto;
    }
    set auto(value: boolean) {
        if (this._auto !== value) {
            this._auto = value;
        }
    }

    /**
     * 컨트롤러
     */
    get controller() {
        return this._controller;
    }

    /**
     * 데이터 매니저
     */
    get dataManager() {
        return this._dataManager;
    }

    get mainView() {
        return this._gameView;
    }

    /**
     * 데이터 매니저 생성
     */
    createDataManager() {
        this._dataManager = new DataManager();
    }
    
    /**
     * 컨트롤러 생성
     */
    createController(eleId?: string) {

        if (this._auto && !this._gameView) {
            if(eleId) {
                this._createView(eleId);
            }
            else {
                throw NotSpecifyError;
            }
        }
        else if (this._auto){
            throw AlreadyExistView;
        }
        else if (!this._gameView) {
            throw NotAutoMode;
        }
        this._controller = new Controller(this._gameView);
    }

    createGameView(eleId: string, styleName?: string, auto: boolean = true) {
        if (this._auto || this._gameView) {
            this._createView(eleId, styleName, auto);
        }
    }

    private _createView(eleId: string, styleName?: string, auto: boolean = true) {
        this._gameView = new MainView(eleId, auto, styleName);
    }

    /**
     * 데이터 매니저 연결하기
     */
    linkDataManagerToCon() {
        if (this._dataManager && this._controller) {
            this._controller['_linkDataManager'](this._dataManager);
        }
    }

    /**
     * 데이터 매니저 연결끊기
     */
    unlinkDataManager() {
        if (this._dataManager && this._controller) {
            this._controller['_unlinkDataManager']();
        }
    }

    /**
     * 게임엔진에서 디폴트로 설정된 아이템 맵과 셋을 설정하기
     */
    setDefaults() {
        this._dataManager['_setDefaults'](this._defaultStore)
    }
}