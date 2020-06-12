/*****************************************
| DataManager.ts                            
| 2020. 06. 12. created by zerosheepmoo  |
******************************************/

import { IItemSet } from "../items/interfaces/IItemSet";
import { ItemTypeMap } from "../items/interfaces/ItemTypeMap";
import { IItemType } from "../items/interfaces/IItemType";

/**
 * 데이터 매니저 클래스
 */
export class DataManager {
    private _itemSet: {[id: string]: IItemSet} = {'default':{}};
    private _itemMap: ItemTypeMap;
    private _currentSet: string = 'default';
    private _multipleItemSetMode: boolean = false;
    private _isLinked: boolean = false;

    // ANCHOR item set

    /**
     * 동시 다중 셋 사용 모드가 아닐 경우, 현재 셋의 아이디
     */
    get currentSet() {
        if (this._multipleItemSetMode === true) {
            return '';
        }
        else {
            return this._currentSet;
        }
    }
    set currentSet(id: string) {
        this._validateItemSet(id);
        if (!this._multipleItemSetMode && this._currentSet !== id) {
            this._currentSet = id;
        }
    }

    /**
     * 동시 다중 셋 사용 모드 활성화 여부
     */
    get multipleItemSetMode() {
        return this._multipleItemSetMode;
    }
    set multipleItemSetMode(value: boolean) {
        if (this._multipleItemSetMode !== value) {
            this._multipleItemSetMode = value;
        }
    }

    /**
     * 전체 아이템 셋 데이터
     */
    get itemSetCollection() {
        return this._itemSet;
    }
    
    /**
     * 아이템 타입 맵
     */
    get itemTypeMap() {
        return this._itemMap;
    }
    set itemTypeMap(typeMap: ItemTypeMap) {
        this._validateChange();
        if (this._itemMap !== typeMap) {
            this._itemMap = typeMap;
            this.clear();
        }
    }

    /**
     * 다른 것과 링크되어있는지의 여부
     * 
     * @remarks
     * 사용자가 임의로 변경하지 말것
     */
    get isLinked() {
        return this._isLinked;
    }
    set isLinked(value: boolean) {
        this._isLinked = value;
    }

    /**
     * 아이템 셋 데이터를 반환한다.
     * 
     * @param id - 아이템 셋 아이디, 설정하지 않으면 현재 프리셋으로 지정된다.
     */
    getItemSet(id: string = this._currentSet) {
        this._validateItemSet(id);
        return this._itemSet[id];
    }

    /**
     * 현재 아이템 셋으로 설정되어 잇는 데이터를 반환한다.
     */
    getCurrentItemSet() {
        return this._itemSet[this._currentSet];
    }

    /**
     * 해당하는 프리셋에 아이템을 추가 등록한다.
     * 
     * @remarks
     * 코드가 겹치면 덮어쓰기 된다.
     * 
     * @param items - 아이템 프리셋 형태의 추가할 아이템
     * @param id - 지정할 아이템 프리셋의 아이디, 설정하지 않을 경우 현재 프리셋으로 지정된다.
     */
    addItems(items: IItemSet, id = this._currentSet) {
        this._validateItemSet(id);
        const itemSet = this._itemSet[id];
        for (let code in items) {
            itemSet[code] = items[code];
        }
    }

    /**
     * 프리셋의 아이템을 제거한다.
     * 
     * @param codeOrName - 아이템 코드 혹은 이름
     * @param id - 지정할 아이템 프리셋의 아이디, 설정하지 않을 경우 현재 프리셋으로 지정된다.
     */
    removeItems(codeOrNames: (number | string) | (number | string)[], id = this._currentSet) {
        this._validateItemSet(id);
        const itemSet = this._itemSet[id];
        if (Array.isArray(codeOrNames)) {
            for (let i = 0, len = codeOrNames.length; i < len; i++) {
                this._removeItem(itemSet, codeOrNames[i]);
            }
        }
        else {
            this._removeItem(itemSet, codeOrNames);
        }
    }

    /**
     * 아이템의 이름을 반환한다.
     * 
     * @param code - 아이템 코드
     * @param id - 지정할 아이템 프리셋의 아이디, 설정하지 않을 경우 현재 프리셋으로 지정된다.
     */
    getItemName(code: number, id = this._currentSet): string {
        this._validateItemSet(id);
        const itemSet = this._itemSet[id];
        if (itemSet[code]) {
            return itemSet[code].name;
        }
        else {
            throw new Error('There is no such item: ' + code + ' in the "' + id + '" set');
        }
    }

    /**
     * 아이템의 코드를 반환한다.
     * 
     * @param name - 아이템 이름
     * @param id - 지정할 아이템 프리셋의 아이디, 설정하지 않을 경우 현재 프리셋으로 지정된다.
     */
    getItemCode(name: string, id = this._currentSet): number {
        this._validateItemSet(id);
        const itemSet = this._itemSet[id];
        for (let code in itemSet) {
            if(itemSet[code].name === name) {
                return Number(code);
            }
        }
        throw new Error('there is no such item: ' + name + ' in the "' + id + '" set');
    }

    /**
     * 아이템의 타입을 반환한다.
     * 
     * @param code - 아이템 코드
     * @param id - 지정할 아이템 프리셋의 아이디, 설정하지 않을 경우 현재 프리셋으로 지정된다.
     */
    getItemType(code: number, id = this._currentSet): IItemType {
        this._validateItemSet(id);
        const itemSet = this._itemSet[id];
        if (itemSet[code]) {
            return itemSet[code].type;
        }
        throw new Error('there is no such item: ' + code + ' in the "' + id + '" set');
    }

    /**
     * 아이템 셋을 등록한다.
     * 
     * @param id - 아이템 셋의 아이디
     * @param itemSet - 아이템 셋
     */
    registerItemSet(id: string, itemSet: IItemSet) {
        this._itemSet[id] = itemSet;
    }

    /**
     * 아이템 셋을 제거한다.
     * 
     * @param id - 아이템 셋의 아이디
     */
    removeItemSet(id: string) {
        delete this._itemSet[id];
    }

    /**
     * 기본 아이템 셋을 설정한다.
     * 
     * @param itemSet - 아이템 셋
     */
    setDefaultItemSet(itemSet: IItemSet) {
        this._itemSet['default'] = itemSet;
    }

    /**
     * 데이터 매니저를 클리어한다.
     */
    clear() {
        this._currentSet = 'default';
        this._multipleItemSetMode = false;
        this._itemSet = {'default': {}};
    }

    ////////// inner method //////////
    private _validateItemSet(id: string) {
        if (!this._itemSet[id]) {
            throw new Error('There is no such ItemSet: ' + id);
        }
    }

    private _validateChange() {
        if (this._isLinked) {
            throw new Error('The DataManager already linked with ItemManager. Set properties before link or unlink and relink');
        }
    }

    private _removeItem(set: IItemSet, cOrN: number | string) {
        let code: number;
        if (typeof cOrN === 'string') {
            code = Number(this.getItemCode(cOrN));
        }
        else {
            code = cOrN;
        }
        delete set[code];
    }

    private _setDefaults(de: { set: IItemSet, map:ItemTypeMap}) {
        this._itemMap = de.map;
        this._itemSet['default'] = de.set;
    }
}