/*****************************************
| ItemManager.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { ItemSet } from "./ItemSet";
import { Item } from "./Item";
import { IItem } from "./interfaces/IItem";
import { IItemSet } from "./interfaces/IItemSet";
import { ItemTypeMap } from "./interfaces/ItemTypeMap";
import { DefaultItemMap, FantasyItems } from "../Preset";
import { clone } from "../utils/Util";

/**
 * 아이템 매니저 클래스
 */
export class ItemManager {
    private _set: ItemSet;
    private _map: ItemTypeMap;
    private _list: {[code: number]: Item};

    constructor() {
        this._set = new ItemSet(FantasyItems);
        this._map = DefaultItemMap;
        this._list = {};
        this.initItems();
    }

    /**
     * 아이템 셋 오브젝트
     */
    get itemSet() {
        return this._set;
    }

    /**
     * 아이템 리스트
     */
    get itemList() {
        return this._list;
    }

    /**
     * 아이템 타입 맵
     */
    get map() {
        return this._map;
    }

    /**
     * 아이템 프리셋을 추가 등록한다.
     * 
     * @param value - 입력을 위한 아이템 셋
     */
    addSet(value: IItemSet) {
        this._set.addItems(value);
        this.initItems();
    }

    /**
     * 아이템을 프리셋에서 제거한다.
     * 
     * @param codeOrNames - 코드 또는 이름
     */
    removeItemFromSet(codeOrNames: (string | number) | (string | number)[]){
        this._set.removeItems(codeOrNames);
        this.initItems();
    }

    /**
     * 아이템 타입 맵을 설정한다. 전부 `false` 로 하는 것을 잊지말것
     * 
     * @param value - 아이템 타입 맵
     */
    setItemMap(value: ItemTypeMap) {
        if(value) {
            this._clear();
            this._map = value;
        }
    }

    /**
     * 아이템들 갯수 초기화
     */
    initItems() {
        this._clearItems();
        const preset = this._set.preset;
        for (let code in preset) {
            const item = this._createItem(Number(code), preset[code]);
            this._list[code] = item;
        }
    }

    /**
     * 아이템 가져오기
     * @param code - 코드
     */
    getItem(code: number) {
        return this._list[code];
    }

    /**
     * 아이템 갯수를 더하거나 뺀다
     * 
     * @param nameOrCode - 이름 또는 코드
     * @param count - 추가할 아이템 갯수, 음수를 입력하면 제거
     */
    addItemNumber(code: number, count: number) {
        if(this._list[code]) {
            this._list[code].count += count;
            return this._list[code].count;
        }
        else {
            throw Error('There is no such item!');
        }
    }

    /**
     * 아이템 프리셋을 등록한다.
     * 
     * @param set - 아이템 프리셋
     */
    registerPreset(set: IItemSet) {
        this._set.registerPreset(set);
        this.initItems();
    }

    /**
     * 현재 등록된 프리셋을 반환한다.
     */
    exportPreset() {
        return clone(this._set.preset, true);
    }

    /**
     * 현재 등록된 타입 맵을 반환한다.
     */
    exportTypeMap() {
        return clone(this._map, true);
    }

    ////////// ANCHOR: inner Method //////////

    /**
     * 아이템을 생성한다.
     * 
     * @param item - 설정용 아이템 인터페이스
     */
    private _createItem(code: number, item: IItem) {
        return new Item(this._map, item.type, code, item.name);
    }

    /**
     * 아이템 리스트와 셋을 클리어
     */
    private _clear() {
        // clear list
        this._clearItems();

        // clear set
        this._clearSet();
    }

    private _clearItems() {
        const list = this._list
        for (let code in list) {
            delete list[code];
        }
    
    }
    private _clearSet() {
        this._set.registerPreset();
    }
}
